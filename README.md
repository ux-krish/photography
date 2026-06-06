# Krishnendu Dutta — Nature Photography Portfolio

A cinematic, high-end photography portfolio for **Krishnendu Dutta**, a nature & wildlife photographer. Built with vanilla HTML, CSS & JavaScript, animated with **GSAP + ScrollTrigger** and smooth-scrolled with **Lenis**.

![Status](https://img.shields.io/badge/Status-Production%20Ready-c8a96a?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-0a0a0a?style=flat-square)
![Animation](https://img.shields.io/badge/Animation-GSAP%20%2B%20ScrollTrigger-88c0d0?style=flat-square)

---

## ✨ Highlights

- **Custom preloader** with animated counter (0–100%) and progress bar
- **Custom cursor** with hover/view states (mix-blend-mode, magnetic on CTAs)
- **Smooth scroll** via Lenis (1.2s ease, no jank)
- **Parallax hero** — background image, floating accent photos, content layer
- **Word-by-word text reveal** powered by GSAP ScrollTrigger
- **Horizontal pin section** — scroll-driven expedition showcase
- **Bento-style gallery** with category filters and 3D mouse-tilt
- **Animated number counters** (350+ expeditions, 42 countries, etc.)
- **Infinite marquee** of services & expertise
- **Magnetic buttons** with elastic reset
- **Cinematic typography** — Playfair Display, Cormorant Garamond, Manrope
- **Full responsive** — mobile, tablet, ultrawide
- **Performance** — lazy-loaded images, preconnect hints, GPU-accelerated transforms
- **Accessibility** — reduced-motion media query, semantic HTML, aria labels

---

## 📂 Project Structure

```
myphotography/
├── index.html        # Single-page markup
├── css/
│   └── style.css     # Premium design system
├── js/
│   └── main.js       # GSAP orchestrator + interactions
└── README.md
```

---

## 🚀 Getting Started

No build step required. Open `index.html` directly in a modern browser, or run a tiny static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

---

## 🎬 Animation Inventory

| Effect | Trigger | Plugin |
|---|---|---|
| Hero text mask reveal | On load | GSAP timeline |
| Hero parallax | Scroll | ScrollTrigger scrub |
| Word-by-word title reveal | Scroll | ScrollTrigger |
| Card stagger reveal | Scroll | ScrollTrigger |
| Image scale-in on reveal | Scroll | ScrollTrigger |
| Horizontal pin section | Scroll | ScrollTrigger pin + scrub |
| Stats counter | Scroll into view | GSAP ticker |
| 3D mouse-tilt (gallery) | Mouse | GSAP |
| Magnetic CTAs | Mouse | GSAP elastic |
| Custom cursor | Mouse | GSAP quickTo |
| Smooth scroll | Wheel/touch | Lenis |
| Preloader | DOM ready | GSAP timeline |
| Mobile menu | Click | CSS transitions |
| Filter gallery | Click | GSAP fromTo |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Surface | `#111111`, `#161616` |
| Ink | `#f3efe6` |
| Accent (gold) | `#c8a96a` |
| Display font | Playfair Display |
| Body font | Manrope |
| Italic accent | Cormorant Garamond |
| Easing | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Container | `1440px` max |

---

## 📷 Replacing Images

All imagery is sourced from Unsplash (high-resolution, free to use). To swap with your own:

1. Open `index.html`
2. Search for `https://images.unsplash.com/...` (Cmd/Ctrl + F)
3. Replace with your hosted URLs (recommended: WebP, ≥1600w for hero, ≥800w for cards)

---

## 🛠 Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flex, clamp() for fluid type
- **Vanilla JS** — zero framework dependencies
- **GSAP 3.12** — animations & ScrollTrigger
- **Lenis** — smooth scroll
- **Google Fonts** — Playfair Display, Manrope, Cormorant Garamond

---

## 📱 Responsive Breakpoints

| Width | Behavior |
|---|---|
| `≥ 1440px` | Full cinematic layout |
| `1100–1439px` | Slight density adjustment |
| `900–1099px` | 2-column services, condensed spacing |
| `600–899px` | Single-column, mobile nav |
| `< 600px` | Stacked, fluid type |

---

## ♿ Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)
- `aria-label` on nav and toggle button
- Keyboard-focusable form controls
- `prefers-reduced-motion` support
- Color contrast ≥ AA on text
- Custom cursor disabled under 1024px (touch / small screens)

---

## 📄 License & Credits

- Imagery: [Unsplash](https://unsplash.com) photographers (free to use)
- Fonts: [Google Fonts](https://fonts.google.com)
- Animation: [GSAP](https://greensock.com) (free for non-commercial)
- Smooth scroll: [Lenis](https://github.com/studio-freight/lenis)

Designed & developed as a portfolio template for **Krishnendu Dutta**.

---

> *"I don't just take photographs. I listen to the wind, wait for the light, and frame a feeling."*
> — Krishnendu Dutta
