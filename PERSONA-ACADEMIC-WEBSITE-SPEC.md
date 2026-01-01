# Persona 3 × Persona 5 雙風格學術網站 - 完整開發規格書

> 本文件為 Claude Code CLI 開發用完整規格書
> 目標：打造一個融合 P3 深藍神秘感與 P5 紅黑叛逆風格的學術個人網站

---

## 📋 專案概述

### 基本資訊
- **專案名稱**: Nubo's Academic Portfolio
- **部署目標**: GitHub Pages (orientonubo.github.io)
- **現有 Repo**: https://github.com/OrientoNubo/orientonubo.github.io
- **框架**: Astro 5.x
- **樣式**: Tailwind CSS + 自訂 SCSS
- **動畫**: GSAP + CSS Keyframes

### 設計目標
1. **雙主題系統**: 一鍵切換 P3（藍）/ P5（紅）/ Velvet Room 模式
2. **學術功能完整**: Publications、Projects、Blog、CV 等頁面
3. **Markdown 優先**: 日常更新只需編輯 Markdown 檔案
4. **效能優異**: Lighthouse 90+ 分
5. **響應式設計**: 完美支援 Desktop / Tablet / Mobile

---

## 🎨 設計系統

### Persona 3 配色方案

```css
/* P3 Theme Colors */
--p3-primary: #00bbfa;        /* 主要青色 */
--p3-primary-light: #79d7fd;  /* 亮青色 */
--p3-secondary: #001736;      /* 深藍背景 */
--p3-secondary-alt: #00183e;  /* 次深藍 */
--p3-accent: #ffc54a;         /* 金色強調 */
--p3-dark-hour: #1a4a3a;      /* Dark Hour 綠 */
--p3-text: #ffffff;           /* 白色文字 */
--p3-text-muted: #a0c4e8;     /* 柔和文字 */
```

### Persona 5 配色方案

```css
/* P5 Theme Colors */
--p5-primary: #ff0022;        /* 熱血紅 */
--p5-secondary: #000000;      /* 純黑 */
--p5-accent: #1cfeff;         /* 青色高光 */
--p5-bg: #ffffff;             /* 純白背景 */
--p5-text: #000000;           /* 黑色文字 */
--p5-text-light: #ffffff;     /* 白色文字（用於深色背景）*/
```

### Velvet Room 配色方案

```css
/* Velvet Room Theme Colors */
--velvet-primary: #3a5ba0;    /* 絲絨藍 */
--velvet-secondary: #1a1a2e;  /* 深紫黑 */
--velvet-accent: #c9a227;     /* 金色 */
--velvet-bg: #0f0f1a;         /* 極深背景 */
--velvet-text: #e0e0e0;       /* 淺灰文字 */
```

### 字體選擇

```css
/* Fonts */
--font-heading: 'Montserrat', sans-serif;  /* 標題 - 適合兩種風格 */
--font-body: 'Inter', sans-serif;          /* 內文 - 可讀性佳 */
--font-code: 'JetBrains Mono', monospace;  /* 程式碼 */
--font-p5-display: 'P5 Hatty', sans-serif; /* P5 風格標題（可選）*/
```

---

## 📁 完整專案結構

```
orientonubo.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自動部署
├── public/
│   ├── favicon.svg                 # 網站圖示
│   ├── papers/                     # PDF 論文檔案
│   │   └── *.pdf
│   ├── images/
│   │   ├── profile.jpg             # 個人照片
│   │   ├── projects/               # 專案圖片
│   │   └── blog/                   # 部落格圖片
│   └── fonts/
│       └── P5Hatty.woff2           # P5 風格字體（可選）
├── src/
│   ├── content/
│   │   ├── config.ts               # Content Collections 設定
│   │   ├── publications/           # 論文 Markdown
│   │   │   ├── cvpr2025.md
│   │   │   └── wacv2024.md
│   │   ├── projects/               # 專案 Markdown
│   │   │   ├── 3dgs-slam.md
│   │   │   └── visual-localization.md
│   │   └── blog/                   # 部落格文章
│   │       └── *.md
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ThemeToggle.astro
│   │   │   ├── Card.astro
│   │   │   ├── Button.astro
│   │   │   ├── SocialLinks.astro
│   │   │   └── SEO.astro
│   │   ├── p3/
│   │   │   ├── WaterBackground.astro
│   │   │   ├── Bubbles.astro
│   │   │   ├── CausticsOverlay.astro
│   │   │   ├── P3Card.astro
│   │   │   └── P3Button.astro
│   │   ├── p5/
│   │   │   ├── SkewedBackground.astro
│   │   │   ├── FlickerSelector.astro
│   │   │   ├── P5Card.astro
│   │   │   ├── P5Button.astro
│   │   │   └── SlideTransition.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── News.astro
│   │   │   ├── Publications.astro
│   │   │   ├── Projects.astro
│   │   │   ├── Honors.astro
│   │   │   ├── Education.astro
│   │   │   └── Services.astro
│   │   └── blog/
│   │       ├── PostCard.astro
│   │       └── PostList.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro        # 基礎佈局（含主題系統）
│   │   ├── PageLayout.astro        # 頁面佈局
│   │   └── BlogLayout.astro        # 部落格文章佈局
│   ├── pages/
│   │   ├── index.astro             # 首頁（單頁式）
│   │   ├── publications.astro      # 論文列表頁
│   │   ├── projects.astro          # 專案列表頁
│   │   ├── blog/
│   │   │   ├── index.astro         # 部落格列表
│   │   │   └── [...slug].astro     # 部落格文章動態路由
│   │   ├── cv.astro                # CV 頁面
│   │   └── 404.astro               # 404 頁面
│   ├── styles/
│   │   ├── global.css              # 全域樣式
│   │   ├── themes/
│   │   │   ├── variables.css       # CSS 變數定義
│   │   │   ├── p3-theme.css        # P3 專屬樣式
│   │   │   ├── p5-theme.css        # P5 專屬樣式
│   │   │   └── velvet-theme.css    # Velvet Room 樣式
│   │   └── animations/
│   │       ├── p3-animations.css   # P3 動畫
│   │       └── p5-animations.css   # P5 動畫
│   ├── scripts/
│   │   ├── theme-toggle.ts         # 主題切換邏輯
│   │   ├── p5-animations.ts        # P5 GSAP 動畫
│   │   └── p3-effects.ts           # P3 效果
│   └── utils/
│       └── helpers.ts              # 工具函數
├── astro.config.mjs                # Astro 設定
├── tailwind.config.mjs             # Tailwind 設定
├── tsconfig.json                   # TypeScript 設定
├── package.json
└── README.md
```

---

## 🔧 核心檔案實現

### 1. astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://orientonubo.github.io',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
  },
});
```

### 2. tailwind.config.mjs

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // P3 Colors
        'p3-primary': '#00bbfa',
        'p3-primary-light': '#79d7fd',
        'p3-secondary': '#001736',
        'p3-secondary-alt': '#00183e',
        'p3-accent': '#ffc54a',
        // P5 Colors
        'p5-primary': '#ff0022',
        'p5-secondary': '#000000',
        'p5-accent': '#1cfeff',
        // Velvet Colors
        'velvet-primary': '#3a5ba0',
        'velvet-secondary': '#1a1a2e',
        'velvet-accent': '#c9a227',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-skew': 'slide-in-skew 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0.5)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 187, 250, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 187, 250, 0.6)' },
        },
        'slide-in-skew': {
          '0%': { transform: 'translateX(-100px) skewX(-15deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(-5deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

### 3. src/content/config.ts

```typescript
import { defineCollection, z } from 'astro:content';

const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['conference', 'journal', 'preprint']).default('conference'),
    pdf: z.string().optional(),
    code: z.string().optional(),
    project: z.string().optional(),
    video: z.string().optional(),
    arxiv: z.string().optional(),
    doi: z.string().optional(),
    bibtex: z.string().optional(),
    image: z.string().optional(),
    highlight: z.boolean().default(false),
    abstract: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    paper: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  publications: publicationsCollection,
  projects: projectsCollection,
  blog: blogCollection,
};
```

### 4. src/styles/themes/variables.css

```css
/* ============================================
   Persona Theme System - CSS Variables
   ============================================ */

:root {
  /* === Default: P5 Theme === */
  --color-primary: #ff0022;
  --color-primary-rgb: 255, 0, 34;
  --color-secondary: #000000;
  --color-accent: #1cfeff;
  --color-bg: #ffffff;
  --color-bg-alt: #f5f5f5;
  --color-text: #000000;
  --color-text-muted: #666666;
  --color-border: #e0e0e0;
  
  /* Geometry */
  --skew-angle: -5deg;
  --border-radius: 0;
  --card-shadow: 8px 8px 0 var(--color-primary);
  --card-shadow-hover: 12px 12px 0 var(--color-primary);
  
  /* Animation */
  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
  
  /* Typography */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
}

/* === P3 Theme === */
[data-theme="p3"] {
  --color-primary: #00bbfa;
  --color-primary-rgb: 0, 187, 250;
  --color-secondary: #001736;
  --color-accent: #ffc54a;
  --color-bg: #00183e;
  --color-bg-alt: #001736;
  --color-text: #ffffff;
  --color-text-muted: #a0c4e8;
  --color-border: rgba(0, 187, 250, 0.3);
  
  /* Geometry */
  --skew-angle: 0deg;
  --border-radius: 12px;
  --card-shadow: 0 4px 20px rgba(0, 187, 250, 0.2);
  --card-shadow-hover: 0 8px 30px rgba(0, 187, 250, 0.4);
}

/* === Velvet Room Theme === */
[data-theme="velvet"] {
  --color-primary: #3a5ba0;
  --color-primary-rgb: 58, 91, 160;
  --color-secondary: #1a1a2e;
  --color-accent: #c9a227;
  --color-bg: #0f0f1a;
  --color-bg-alt: #1a1a2e;
  --color-text: #e0e0e0;
  --color-text-muted: #888888;
  --color-border: rgba(201, 162, 39, 0.3);
  
  /* Geometry */
  --skew-angle: -2deg;
  --border-radius: 8px;
  --card-shadow: 0 4px 20px rgba(58, 91, 160, 0.3);
  --card-shadow-hover: 0 8px 30px rgba(201, 162, 39, 0.4);
}

/* === Theme Transition === */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color var(--transition-slow), 
              color var(--transition-slow);
}
```

### 5. src/styles/animations/p3-animations.css

```css
/* ============================================
   Persona 3 Animations - Water & Bubbles
   ============================================ */

/* Water Wave Background */
.p3-water-bg {
  position: relative;
  background: linear-gradient(
    180deg,
    var(--color-secondary) 0%,
    var(--color-bg) 50%,
    var(--color-primary) 100%
  );
  overflow: hidden;
}

.p3-water-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(0, 187, 250, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(121, 215, 253, 0.1) 0%, transparent 50%);
  animation: water-shift 10s ease-in-out infinite;
}

@keyframes water-shift {
  0%, 100% {
    transform: translateX(0) translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateX(-30px) translateY(20px);
    opacity: 0.8;
  }
}

/* Floating Animation */
.p3-float {
  animation: p3-float 6s ease-in-out infinite;
}

@keyframes p3-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  75% {
    transform: translateY(5px) rotate(-1deg);
  }
}

/* Bubble Effect */
.p3-bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(121, 215, 253, 0.8),
    rgba(0, 187, 250, 0.3)
  );
  animation: bubble-rise linear infinite;
}

@keyframes bubble-rise {
  0% {
    transform: translateY(100vh) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-50px) scale(1);
    opacity: 0;
  }
}

/* Caustics Overlay */
.p3-caustics {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: 0.3;
  animation: caustics-move 8s linear infinite;
  pointer-events: none;
}

@keyframes caustics-move {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, -20px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Glow Effect */
.p3-glow {
  box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
  animation: p3-pulse-glow 3s ease-in-out infinite;
}

@keyframes p3-pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(var(--color-primary-rgb), 0.6);
  }
}

/* Text Shimmer */
.p3-text-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-text) 0%,
    var(--color-primary) 50%,
    var(--color-text) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}
```

### 6. src/styles/animations/p5-animations.css

```css
/* ============================================
   Persona 5 Animations - Skew & Flicker
   ============================================ */

/* Skewed Card */
.p5-skew {
  transform: skewX(var(--skew-angle));
}

.p5-skew-content {
  transform: skewX(calc(var(--skew-angle) * -1));
}

/* Slide In Animation */
.p5-slide-in {
  animation: p5-slide-in 0.4s ease-out forwards;
}

.p5-slide-in-delay-1 { animation-delay: 0.1s; }
.p5-slide-in-delay-2 { animation-delay: 0.2s; }
.p5-slide-in-delay-3 { animation-delay: 0.3s; }

@keyframes p5-slide-in {
  0% {
    transform: translateX(-100px) skewX(-15deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) skewX(var(--skew-angle));
    opacity: 1;
  }
}

/* Slide In from Right */
.p5-slide-in-right {
  animation: p5-slide-in-right 0.4s ease-out forwards;
}

@keyframes p5-slide-in-right {
  0% {
    transform: translateX(100px) skewX(15deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) skewX(var(--skew-angle));
    opacity: 1;
  }
}

/* Aggressive Hover */
.p5-hover-lift {
  transition: transform var(--transition-fast), 
              box-shadow var(--transition-fast);
}

.p5-hover-lift:hover {
  transform: skewX(var(--skew-angle)) translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

/* Clip Path Shapes */
.p5-clip-card {
  clip-path: polygon(5% 0, 100% 2%, 95% 100%, 0 98%);
}

.p5-clip-button {
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
}

.p5-clip-header {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

/* Flicker Effect (for hover states) */
.p5-flicker {
  position: relative;
}

.p5-flicker::before,
.p5-flicker::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: polygon(
    10% 0%, 90% 5%, 95% 100%, 5% 95%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s;
}

.p5-flicker::before {
  background: var(--color-primary);
  transform: translate(-2px, -2px);
}

.p5-flicker::after {
  background: var(--color-accent);
  transform: translate(2px, 2px);
  mix-blend-mode: screen;
}

.p5-flicker:hover::before,
.p5-flicker:hover::after {
  opacity: 0.5;
  animation: flicker 0.15s steps(2) infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* Striped Background */
.p5-stripes {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 10px,
    rgba(var(--color-primary-rgb), 0.1) 10px,
    rgba(var(--color-primary-rgb), 0.1) 20px
  );
}

/* Bold Text Shadow */
.p5-text-shadow {
  text-shadow: 
    3px 3px 0 var(--color-primary),
    -1px -1px 0 var(--color-secondary);
}

/* Shake on Hover */
.p5-shake:hover {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0) skewX(var(--skew-angle)); }
  25% { transform: translateX(-5px) skewX(calc(var(--skew-angle) - 2deg)); }
  75% { transform: translateX(5px) skewX(calc(var(--skew-angle) + 2deg)); }
}
```

### 7. src/styles/global.css

```css
/* ============================================
   Global Styles
   ============================================ */

@import './themes/variables.css';
@import './animations/p3-animations.css';
@import './animations/p5-animations.css';

/* Reset & Base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  line-height: 1.6;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color var(--transition-slow),
              color var(--transition-slow);
  overflow-x: hidden;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
}

/* Links */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent);
}

/* Selection */
::selection {
  background: var(--color-primary);
  color: var(--color-bg);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-alt);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section */
.section {
  padding: 80px 0;
}

/* Card Base */
.card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--card-shadow);
  transform: skewX(var(--skew-angle));
  transition: transform var(--transition-fast),
              box-shadow var(--transition-fast);
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
}

.card-content {
  transform: skewX(calc(var(--skew-angle) * -1));
}

/* Button Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-family: var(--font-heading);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--color-primary);
  color: var(--color-bg);
  border: none;
  cursor: pointer;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
  transition: all var(--transition-fast);
}

.btn:hover {
  background: var(--color-secondary);
  color: var(--color-text);
  transform: scale(1.05);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-bg);
}

/* Theme Transition Overlay */
.theme-transitioning::before {
  content: '';
  position: fixed;
  inset: 0;
  background: var(--color-primary);
  z-index: 9999;
  animation: theme-flash 0.3s ease-out forwards;
}

@keyframes theme-flash {
  0% { opacity: 0.8; }
  100% { opacity: 0; pointer-events: none; }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧩 核心組件實現

### 8. src/layouts/BaseLayout.astro

```astro
---
import '../styles/global.css';
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
import SEO from '../components/common/SEO.astro';
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&family=JetBrains+Mono&display=swap" rel="stylesheet" />
    
    <SEO title={title} description={description} image={image} />
    <ViewTransitions />
  </head>
  <body>
    <!-- Theme Background Layer -->
    <div class="fixed inset-0 -z-10 transition-all duration-500" id="theme-bg">
      <!-- P3 Bubbles Container (hidden by default) -->
      <div class="bubbles-container hidden" id="p3-bubbles"></div>
    </div>
    
    <Header />
    
    <main>
      <slot />
    </main>
    
    <Footer />
    
    <!-- Theme System Script -->
    <script>
      // Initialize theme from localStorage or default to 'p5'
      const savedTheme = localStorage.getItem('persona-theme') || 'p5';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Handle View Transitions
      document.addEventListener('astro:page-load', () => {
        const theme = localStorage.getItem('persona-theme') || 'p5';
        document.documentElement.setAttribute('data-theme', theme);
        initThemeEffects(theme);
      });
      
      function initThemeEffects(theme) {
        const bubbles = document.getElementById('p3-bubbles');
        if (theme === 'p3') {
          bubbles?.classList.remove('hidden');
          createBubbles();
        } else {
          bubbles?.classList.add('hidden');
        }
      }
      
      function createBubbles() {
        const container = document.getElementById('p3-bubbles');
        if (!container) return;
        container.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
          const bubble = document.createElement('div');
          bubble.className = 'p3-bubble';
          bubble.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${10 + Math.random() * 30}px;
            height: ${10 + Math.random() * 30}px;
            animation-duration: ${6 + Math.random() * 8}s;
            animation-delay: ${Math.random() * 5}s;
          `;
          container.appendChild(bubble);
        }
      }
      
      initThemeEffects(savedTheme);
    </script>
  </body>
</html>

<style>
  .bubbles-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
</style>
```

### 9. src/components/common/Header.astro

```astro
---
import ThemeToggle from './ThemeToggle.astro';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Publications', href: '/#publications' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
];
---

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="header">
  <div class="container">
    <nav class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-2xl font-bold font-heading tracking-tight">
          <span class="text-[var(--color-primary)]">N</span>ubo
        </span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <a 
            href={item.href} 
            class="nav-link relative font-medium text-sm uppercase tracking-wider
                   hover:text-[var(--color-primary)] transition-colors"
            style={`animation-delay: ${index * 0.1}s`}
          >
            {item.label}
            <span class="nav-underline"></span>
          </a>
        ))}
        <ThemeToggle />
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2" id="mobile-menu-btn" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  </div>
  
  <!-- Mobile Menu -->
  <div class="mobile-menu hidden md:hidden" id="mobile-menu">
    <div class="container py-4 space-y-4">
      {navItems.map((item) => (
        <a href={item.href} class="block py-2 font-medium uppercase tracking-wider">
          {item.label}
        </a>
      ))}
      <div class="pt-4">
        <ThemeToggle />
      </div>
    </div>
  </div>
</header>

<style>
  header {
    background: rgba(var(--color-bg), 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-border);
  }
  
  .nav-underline {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width 0.3s ease;
  }
  
  .nav-link:hover .nav-underline {
    width: 100%;
  }
  
  .mobile-menu {
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
  }
  
  /* P5 Theme: Skewed underline */
  [data-theme="p5"] .nav-underline {
    transform: skewX(-15deg);
  }
</style>

<script>
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
  
  // Close mobile menu on navigation
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
  
  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      header?.classList.add('shadow-lg');
    } else {
      header?.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
  });
</script>
```

### 10. src/components/common/ThemeToggle.astro

```astro
---
// Theme Toggle Component
---

<div class="theme-toggle flex items-center gap-1 p-1 rounded-full bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
  <button 
    data-theme-btn="p5" 
    class="theme-btn p5-btn"
    title="Persona 5 - Take Your Heart"
    aria-label="Switch to Persona 5 theme"
  >
    <span class="icon">🎭</span>
  </button>
  <button 
    data-theme-btn="p3" 
    class="theme-btn p3-btn"
    title="Persona 3 - Memento Mori"
    aria-label="Switch to Persona 3 theme"
  >
    <span class="icon">🌙</span>
  </button>
  <button 
    data-theme-btn="velvet" 
    class="theme-btn velvet-btn"
    title="Velvet Room"
    aria-label="Switch to Velvet Room theme"
  >
    <span class="icon">🦋</span>
  </button>
</div>

<style>
  .theme-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    background: transparent;
    transition: all 0.2s ease;
  }
  
  .theme-btn:hover {
    transform: scale(1.1);
  }
  
  .theme-btn.active {
    transform: scale(1.15);
  }
  
  .p5-btn.active {
    background: #ff0022;
    box-shadow: 0 0 12px rgba(255, 0, 34, 0.5);
  }
  
  .p3-btn.active {
    background: #00bbfa;
    box-shadow: 0 0 12px rgba(0, 187, 250, 0.5);
  }
  
  .velvet-btn.active {
    background: #3a5ba0;
    box-shadow: 0 0 12px rgba(58, 91, 160, 0.5);
  }
</style>

<script>
  function initThemeToggle() {
    const buttons = document.querySelectorAll('[data-theme-btn]');
    const root = document.documentElement;
    
    // Get current theme
    const currentTheme = root.getAttribute('data-theme') || 'p5';
    
    // Set active state
    buttons.forEach(btn => {
      if (btn.dataset.themeBtn === currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Add click handlers
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.themeBtn;
        
        // Update theme
        root.setAttribute('data-theme', theme);
        localStorage.setItem('persona-theme', theme);
        
        // Update active states
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Trigger transition animation
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
        }, 300);
        
        // Update background effects
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
      });
    });
  }
  
  // Initialize on page load
  document.addEventListener('astro:page-load', initThemeToggle);
  initThemeToggle();
</script>
```

### 11. src/components/common/Card.astro

```astro
---
interface Props {
  class?: string;
  href?: string;
  target?: string;
}

const { class: className = '', href, target } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag 
  href={href}
  target={target}
  class:list={[
    'card block',
    className
  ]}
>
  <div class="card-content">
    <slot />
  </div>
</Tag>

<style>
  .card {
    position: relative;
    background: var(--color-bg-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 24px;
    transform: skewX(var(--skew-angle));
    transition: 
      transform var(--transition-fast),
      box-shadow var(--transition-fast),
      border-color var(--transition-fast);
  }
  
  .card:hover {
    transform: skewX(var(--skew-angle)) translateY(-4px);
    border-color: var(--color-primary);
  }
  
  /* P5 Theme */
  [data-theme="p5"] .card {
    box-shadow: var(--card-shadow);
  }
  
  [data-theme="p5"] .card:hover {
    box-shadow: var(--card-shadow-hover);
  }
  
  /* P3 Theme */
  [data-theme="p3"] .card {
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-bg-alt) 100%);
    box-shadow: var(--card-shadow);
  }
  
  [data-theme="p3"] .card:hover {
    box-shadow: var(--card-shadow-hover);
  }
  
  /* Velvet Theme */
  [data-theme="velvet"] .card {
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-bg-alt) 100%);
    border-color: var(--color-accent);
  }
  
  .card-content {
    transform: skewX(calc(var(--skew-angle) * -1));
  }
</style>
```

---

## 📄 頁面實現

### 12. src/pages/index.astro（首頁）

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import About from '../components/sections/About.astro';
import News from '../components/sections/News.astro';
import Publications from '../components/sections/Publications.astro';
import Projects from '../components/sections/Projects.astro';
import Honors from '../components/sections/Honors.astro';
import Education from '../components/sections/Education.astro';
import Services from '../components/sections/Services.astro';
---

<BaseLayout 
  title="Nubo | Computer Vision Researcher"
  description="PhD Researcher at NTUST specializing in 3D Gaussian Splatting, NeRF, and Visual Localization"
>
  <Hero />
  <About />
  <News />
  <Publications />
  <Projects />
  <Honors />
  <Education />
  <Services />
</BaseLayout>
```

### 13. src/components/sections/Hero.astro

```astro
---
const socialLinks = [
  { icon: 'github', url: 'https://github.com/OrientoNubo', label: 'GitHub' },
  { icon: 'scholar', url: '#', label: 'Google Scholar' },
  { icon: 'linkedin', url: '#', label: 'LinkedIn' },
  { icon: 'email', url: 'mailto:your@email.com', label: 'Email' },
];
---

<section class="hero relative min-h-screen flex items-center overflow-hidden">
  <!-- Background Effects -->
  <div class="absolute inset-0 -z-10">
    <div class="hero-bg-gradient"></div>
    <div class="hero-pattern"></div>
  </div>
  
  <div class="container relative z-10">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="hero-content">
        <p class="text-[var(--color-primary)] font-medium mb-4 tracking-wider uppercase hero-subtitle">
          Computer Vision Researcher
        </p>
        <h1 class="text-5xl md:text-7xl font-bold font-heading mb-6 hero-title">
          <span class="block">Hi, I'm</span>
          <span class="text-[var(--color-primary)] hero-name">Nubo</span>
        </h1>
        <p class="text-lg text-[var(--color-text-muted)] mb-8 max-w-lg hero-desc">
          PhD Researcher at National Taiwan University of Science and Technology, 
          specializing in <strong>3D Gaussian Splatting</strong>, <strong>NeRF</strong>, 
          and <strong>Visual Localization</strong>.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 mb-8">
          <a href="#publications" class="btn">
            View Publications
          </a>
          <a href="#projects" class="btn btn-outline">
            Explore Projects
          </a>
        </div>
        
        <!-- Social Links -->
        <div class="flex gap-4">
          {socialLinks.map(link => (
            <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link w-10 h-10 flex items-center justify-center rounded-full
                     border border-[var(--color-border)] hover:border-[var(--color-primary)]
                     hover:bg-[var(--color-primary)] hover:text-white transition-all"
              aria-label={link.label}
            >
              <span class="text-lg">{link.icon === 'github' ? '🐙' : link.icon === 'scholar' ? '📚' : link.icon === 'linkedin' ? '💼' : '✉️'}</span>
            </a>
          ))}
        </div>
      </div>
      
      <!-- Profile Image -->
      <div class="hero-image flex justify-center">
        <div class="relative">
          <div class="profile-frame w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden
                      border-4 border-[var(--color-primary)]">
            <img 
              src="/images/profile.jpg" 
              alt="Nubo"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-[var(--color-accent)] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
    <a href="#about" class="scroll-indicator flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
      <span class="text-sm">Scroll</span>
      <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  </div>
</section>

<style>
  .hero-bg-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 70% 30%,
      rgba(var(--color-primary-rgb), 0.15) 0%,
      transparent 50%
    );
  }
  
  .hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E");
  }
  
  /* P5 Theme specific */
  [data-theme="p5"] .hero-title {
    text-shadow: 4px 4px 0 var(--color-primary);
  }
  
  [data-theme="p5"] .profile-frame {
    transform: rotate(-5deg);
    box-shadow: 8px 8px 0 var(--color-secondary);
  }
  
  /* P3 Theme specific */
  [data-theme="p3"] .hero-bg-gradient {
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 187, 250, 0.2) 0%,
      transparent 60%
    );
  }
  
  [data-theme="p3"] .profile-frame {
    box-shadow: 0 0 40px rgba(0, 187, 250, 0.4);
    animation: p3-glow 3s ease-in-out infinite;
  }
  
  @keyframes p3-glow {
    0%, 100% { box-shadow: 0 0 40px rgba(0, 187, 250, 0.4); }
    50% { box-shadow: 0 0 60px rgba(0, 187, 250, 0.6); }
  }
  
  /* Animations */
  .hero-subtitle { animation: fadeInUp 0.6s ease-out 0.2s both; }
  .hero-title { animation: fadeInUp 0.6s ease-out 0.4s both; }
  .hero-desc { animation: fadeInUp 0.6s ease-out 0.6s both; }
  .hero-image { animation: fadeInUp 0.6s ease-out 0.8s both; }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

### 14. src/components/sections/Publications.astro

```astro
---
import { getCollection } from 'astro:content';
import Card from '../common/Card.astro';

const publications = await getCollection('publications');
const sortedPubs = publications.sort((a, b) => b.data.year - a.data.year);
---

<section id="publications" class="section">
  <div class="container">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold font-heading mb-4">
        <span class="text-[var(--color-primary)]">//</span> Publications
      </h2>
      <p class="text-[var(--color-text-muted)] max-w-2xl mx-auto">
        Selected research papers in computer vision, 3D reconstruction, and visual localization.
      </p>
    </div>
    
    <!-- Publications Grid -->
    <div class="space-y-6">
      {sortedPubs.map((pub, index) => (
        <article 
          class="pub-card"
          style={`animation-delay: ${index * 0.1}s`}
        >
          <Card class={pub.data.highlight ? 'border-[var(--color-primary)]' : ''}>
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Thumbnail -->
              {pub.data.image && (
                <div class="pub-image w-full md:w-48 h-32 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={pub.data.image} 
                    alt={pub.data.title}
                    class="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4 mb-2">
                  <h3 class="text-lg font-bold leading-tight">
                    {pub.data.title}
                  </h3>
                  {pub.data.highlight && (
                    <span class="px-2 py-1 text-xs font-bold bg-[var(--color-primary)] text-white rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                <p class="text-sm text-[var(--color-text-muted)] mb-2">
                  {pub.data.authors.join(', ')}
                </p>
                
                <p class="text-sm mb-4">
                  <span class="font-medium text-[var(--color-primary)]">{pub.data.venue}</span>
                  <span class="text-[var(--color-text-muted)]"> · {pub.data.year}</span>
                </p>
                
                <!-- Links -->
                <div class="flex flex-wrap gap-2">
                  {pub.data.pdf && (
                    <a href={pub.data.pdf} target="_blank" class="pub-link">
                      📄 Paper
                    </a>
                  )}
                  {pub.data.code && (
                    <a href={pub.data.code} target="_blank" class="pub-link">
                      💻 Code
                    </a>
                  )}
                  {pub.data.project && (
                    <a href={pub.data.project} target="_blank" class="pub-link">
                      🌐 Project
                    </a>
                  )}
                  {pub.data.video && (
                    <a href={pub.data.video} target="_blank" class="pub-link">
                      🎬 Video
                    </a>
                  )}
                  {pub.data.arxiv && (
                    <a href={pub.data.arxiv} target="_blank" class="pub-link">
                      📝 arXiv
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </article>
      ))}
    </div>
    
    <!-- View All Link -->
    <div class="text-center mt-8">
      <a href="/publications" class="btn btn-outline">
        View All Publications →
      </a>
    </div>
  </div>
</section>

<style>
  .pub-card {
    animation: fadeInUp 0.5s ease-out both;
  }
  
  .pub-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .pub-link:hover {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px) skewX(var(--skew-angle));
    }
    to {
      opacity: 1;
      transform: translateY(0) skewX(var(--skew-angle));
    }
  }
</style>
```

---

## 📦 Content 範例

### 15. src/content/publications/example.md

```markdown
---
title: "Training-Free Metric-Scale Visual Localization"
authors:
  - "Nubo (Your Name)"
  - "Co-author Name"
  - "Advisor Name"
venue: "IJCV 2025"
year: 2025
type: "journal"
pdf: "/papers/ijcv2025.pdf"
code: "https://github.com/OrientoNubo/visual-loc"
project: "https://project-page.com"
arxiv: "https://arxiv.org/abs/xxxx.xxxxx"
image: "/images/projects/visual-loc.jpg"
highlight: true
abstract: "We present a novel training-free approach to metric-scale visual localization..."
bibtex: |
  @article{nubo2025visualloc,
    title={Training-Free Metric-Scale Visual Localization},
    author={Nubo and Co-author and Advisor},
    journal={International Journal of Computer Vision},
    year={2025}
  }
---

## Abstract

We present a novel training-free approach to metric-scale visual localization...

## Key Contributions

1. First contribution point
2. Second contribution point
3. Third contribution point
```

### 16. src/content/projects/example.md

```markdown
---
title: "Streaming 3D Gaussian Splatting"
description: "Real-time 3D reconstruction with memory-efficient streaming pipeline"
date: 2024-06-01
image: "/images/projects/streaming-3dgs.jpg"
tags:
  - "3D Gaussian Splatting"
  - "Real-time Reconstruction"
  - "CUDA"
github: "https://github.com/OrientoNubo/streaming-3dgs"
demo: "https://demo.example.com"
featured: true
status: "active"
---

## Overview

This project implements a streaming pipeline for 3D Gaussian Splatting...

## Features

- Real-time reconstruction
- Memory-efficient streaming
- CUDA-accelerated rendering
```

---

## 🚀 GitHub Actions 部署

### 17. .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📋 開發步驟 Checklist

### Phase 1: 專案初始化
- [ ] 建立 Astro 專案
- [ ] 安裝依賴（Tailwind, GSAP, MDX）
- [ ] 設定 TypeScript
- [ ] 建立資料夾結構
- [ ] 設定 GitHub Actions

### Phase 2: 主題系統
- [ ] 建立 CSS 變數檔案
- [ ] 實現 P5 主題樣式
- [ ] 實現 P3 主題樣式
- [ ] 實現 Velvet Room 主題
- [ ] 建立 ThemeToggle 組件
- [ ] 測試主題切換動畫

### Phase 3: P5 風格組件
- [ ] 斜角卡片組件
- [ ] P5 風格按鈕
- [ ] 滑入動畫
- [ ] 閃爍選擇器效果
- [ ] 斜條紋背景

### Phase 4: P3 風格組件
- [ ] 水波背景
- [ ] 氣泡動畫
- [ ] 焦散光紋效果
- [ ] 發光效果
- [ ] 飄動動畫

### Phase 5: 頁面開發
- [ ] Header / Footer
- [ ] Hero Section
- [ ] About Section
- [ ] News Section
- [ ] Publications Section
- [ ] Projects Section
- [ ] Honors Section
- [ ] Education Section
- [ ] Services Section
- [ ] Blog 列表頁
- [ ] Blog 文章頁
- [ ] CV 頁面
- [ ] 404 頁面

### Phase 6: 內容整合
- [ ] 設定 Content Collections
- [ ] 遷移現有論文資料
- [ ] 遷移現有專案資料
- [ ] 建立範例部落格文章

### Phase 7: 優化與部署
- [ ] 響應式設計調整
- [ ] Lighthouse 效能優化
- [ ] SEO meta 標籤
- [ ] Open Graph 圖片
- [ ] 部署到 GitHub Pages
- [ ] 測試所有功能

---

## 🎯 快速開始指令

```bash
# 1. Clone 現有 repo（或建立新專案）
git clone https://github.com/OrientoNubo/orientonubo.github.io.git
cd orientonubo.github.io

# 2. 初始化 Astro（如果是全新開始）
npm create astro@latest . -- --template minimal

# 3. 安裝依賴
npm install @astrojs/tailwind @astrojs/mdx @astrojs/sitemap
npm install gsap
npm install -D @tailwindcss/typography

# 4. 開發模式
npm run dev

# 5. 建構
npm run build

# 6. 預覽建構結果
npm run preview
```

---

## 📝 維護指南

### 新增論文
```bash
# 在 src/content/publications/ 建立新 .md 檔案
touch src/content/publications/new-paper.md
# 編輯檔案，填入 frontmatter 和內容
```

### 新增部落格文章
```bash
# 在 src/content/blog/ 建立新 .md 檔案
touch src/content/blog/$(date +%Y-%m-%d)-article-title.md
```

### 新增專案
```bash
touch src/content/projects/project-name.md
```

### 部署
```bash
git add .
git commit -m "Update content"
git push origin main
# GitHub Actions 會自動部署
```

---

## 🦋 祝開發順利！

**P3 的深藍寧靜** 代表學術深度  
**P5 的紅黑叛逆** 代表創新精神

這個網站將成為學術圈最酷的存在！🎭🌙
