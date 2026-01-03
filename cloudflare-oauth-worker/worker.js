// GitHub OAuth Proxy for Sveltia/Decap CMS
// Deploy this to Cloudflare Workers

const CLIENT_ID = 'Ov23li9H4zTDXFyD2g9i';
// You'll need to add CLIENT_SECRET as an environment variable in Cloudflare

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Route: /auth - Redirect to GitHub OAuth
    if (url.pathname === '/auth') {
      const scope = url.searchParams.get('scope') || 'repo,user';
      const redirectUri = `${url.origin}/callback`;

      const authUrl = new URL(GITHUB_AUTHORIZE_URL);
      authUrl.searchParams.set('client_id', CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', scope);

      return Response.redirect(authUrl.toString(), 302);
    }

    // Route: /callback - Handle GitHub OAuth callback
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      try {
        // Exchange code for access token
        const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: env.CLIENT_SECRET,
            code: code,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
          return new Response(`Error: ${tokenData.error_description}`, { status: 400 });
        }

        // Return HTML that posts the token back to the opener window
        const html = `
<!DOCTYPE html>
<html>
<head>
  <title>OAuth Callback</title>
</head>
<body>
  <script>
    (function() {
      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify(tokenData)}',
          e.origin
        );
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
  <p>Authorizing...</p>
</body>
</html>`;

        return new Response(html, {
          headers: { 'Content-Type': 'text/html' },
        });

      } catch (error) {
        return new Response(`OAuth Error: ${error.message}`, { status: 500 });
      }
    }

    // Default response
    return new Response('GitHub OAuth Proxy for CMS. Use /auth to start.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
