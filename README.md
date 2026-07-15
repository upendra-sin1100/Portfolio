# 🚀 Upendra Singh Tomar — Personal Portfolio

A dark, motion-driven single-page portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion** — live at [up-feed.vercel.app](https://up-feed.vercel.app).

## ✨ Features

- **🎨 Dark theme with neon accents** — purple, cyan, and pink gradients over a near-black (`#050508`) background
- **🌌 Ambient background system** — animated gradient orbs + a connected particle canvas, both fully disabled for users with `prefers-reduced-motion` set
- **🖱️ Custom cursor** — a two-layer dot + trailing ring that expands on hover over interactive elements (auto-disabled on touch devices)
- **⌘ Command palette** — press `Cmd/Ctrl + K` to fuzzy-search navigation and actions (jump to a section, download the résumé, open LinkedIn), fully keyboard-navigable
- **📊 Scroll progress bar** + **scroll-spy navbar** that highlights the active section as you scroll
- **⚡ Scroll-triggered reveals** on every section via Framer Motion's `whileInView`
- **📱 Fully responsive**, down to a mobile hamburger menu
- **♿ Accessible** — semantic HTML, ARIA labels on icon-only buttons, visible focus states, and motion that respects OS-level reduced-motion preferences

## 📋 Sections

1. **Hero** — name, a typewriter line cycling through what he actually builds ("machine learning models," "deep learning pipelines," …), a short pitch, résumé download, and social links (GitHub, LinkedIn, email)
2. **About** — bio, categorized skills (Languages & Frameworks / ML & DL / Tools & Platforms), and a few real project stats
3. **Experience** — an honest timeline: B.Tech in Data Science at the Institute of Technology of Management (2023–2027), plus theater performance with RGPV University at Central Zone AIU (2023–2025)
4. **Certifications** — wired up and ready for real certifications; shows relevant coursework in the meantime rather than an empty section
5. **Projects** — three shipped projects, each linking to a live demo:
   - **Disease X Command Center** — real-time hospital triage dashboard (Streamlit, PostgreSQL, Supabase)
   - **Resume Analyzer with Unsupervised Learning** — MiniBatch K-Means + TF-IDF classifier trained on 78,670 resumes, with a keyword-based fallback (Python, Streamlit, Scikit-Learn)
   - **UpFeed — News Aggregator** — live multi-source news app (React.js, GNews API, NewsAPI, Vercel)
6. **Publications** — two published papers:
   - *Data-Driven Sustainability in Pharmaceutical Logistics* — IIP Series, Vol. 6
   - *Inverse Design: Generative AI for Carbon Capture Materials (MOFs)* — IJAMRED
7. **Contact** — email, phone, location, and social links, plus a scroll-to-top button available site-wide

## 🛠️ Tech Stack

- **React** — UI framework
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — page-load, scroll, and hover animations
- Native smooth scrolling + a scroll-spy `IntersectionObserver`-style listener for nav highlighting (no routing or scroll library dependency)

## 📦 Installation

```bash
cd portfolio
npm install
```

## 🚀 Getting Started

```bash
npm run dev
```

The dev server URL will be printed in your terminal (Vite defaults to `http://localhost:5173` unless your `vite.config.js` overrides the port).

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── certificates/
│       └── Upendra Singh Tomar Resume.pdf   # served for the résumé download buttons
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Hero section + typewriter + socials
│   │   ├── About.jsx           # Bio, skills, stats
│   │   ├── Experience.jsx      # Education & involvement timeline
│   │   ├── Certifications.jsx  # Certifications (+ coursework fallback)
│   │   ├── Projects.jsx        # Featured projects
│   │   ├── Publications.jsx    # Research papers
│   │   └── Footer.jsx          # Contact section
│   ├── App.jsx                 # Layout, navbar, command palette, background systems
│   ├── index.css                # Global styles, custom utility classes (gradient-text, neon-*, container-custom)
│   └── main.jsx                 # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Color Palette

- **Background:** `#050508`
- **Purple:** `#7c3aed` → `#a855f7`
- **Cyan:** `#06b6d4`
- **Pink:** `#ec4899`
- **Violet accent (ambient orbs):** `#8b5cf6`
- Applied mainly through the `gradient-text`, `neon-purple`, `neon-cyan`, and `neon-pink` utility classes defined in `index.css`

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px – 1024px
- **Desktop:** > 1024px

## 🔧 Customization

- **Personal info:** edit the content near the top of each file in `src/components/` — most data lives in a plain array or object (e.g. `PROJECTS` in `Projects.jsx`, `SKILLS` in `About.jsx`) so updates don't require touching JSX.
- **Certifications:** add entries to the `CERTIFICATIONS` array in `Certifications.jsx` — the empty-state coursework view disappears automatically once the array isn't empty.
- **Publication links:** `Publications.jsx` currently points to `#` for both papers — swap in the real DOI/journal URLs when available.
- **Colors:** adjust the custom utility classes in `index.css` and/or the `tailwind.config.js` theme.

## 📧 Contact

- **Email:** upendratomar1100@gmail.com
- **Phone:** +91 887-123-2117
- **LinkedIn:** [Upendra Singh Tomar](https://www.linkedin.com/in/upendra-singh-tomar-222a41312/)
- **GitHub:** [upendra-sin1100](https://github.com/upendra-sin1100)

---

Crafted by Upendra Singh Tomar 🚀