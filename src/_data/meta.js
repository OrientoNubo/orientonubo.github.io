/* Build-time metadata available to all templates as `meta`. */
const now = new Date();
module.exports = {
  year: now.getUTCFullYear(),
  buildDate: now.toISOString().slice(0, 10),
};
