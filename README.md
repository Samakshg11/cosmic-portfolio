# 🌌 Cosmic Portfolio Engine

An interactive solar system portfolio — butter-smooth, zero dependencies, 60 FPS target.

---

## 🚀 Quick Start

```bash
# Option 1: Open directly (Chrome/Firefox)
open index.html

# Option 2: Serve locally (recommended for full module support)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

No build step. No npm install. Just open and go.

---

## 🎮 Controls

| Action              | Mouse / Keyboard       | Touch               |
|---------------------|------------------------|---------------------|
| Pan                 | Drag                   | 1-finger drag       |
| Zoom                | Scroll wheel           | Pinch               |
| Open planet panel   | Click planet           | Tap planet          |
| Close panel         | ✕ button / Escape      | Tap ✕               |
| Reset view          | R key / ⌂ button       | ⌂ button            |
| Auto Tour           | T key / ▶ button       | ▶ button            |
| Speed boost         | ⚡ button              | ⚡ button            |
| Quick jump          | Left nav dots          | Left nav dots       |

---

## 🪐 Planets

| Planet   | Section         | Color   |
|----------|-----------------|---------|
| AETHER   | About Me        | Purple  |
| FORGE    | Skills & Stack  | Teal    |
| ATLAS    | Featured Work   | Gold    |
| KRONOS   | Work History    | Red     |
| NEXUS    | Open Source     | Blue    |
| LYRA     | Blog & Writing  | Lilac   |
| PIXEL    | Design Work     | Orange  |
| BEACON   | Contact         | Green   |

---

## ✏️ Customization

### Change your info
Edit the `PLANETS` array in `index.html` (look for `/* ════ PLANET DATA ════ */`).

Each planet has:
```js
{
  id:       'about',           // unique ID
  name:     'AETHER',          // display name (all-caps)
  subtitle: 'About Me',        // section subtitle
  radius:   170,               // orbit radius (px in world space)
  size:     38,                // planet diameter (px)
  speed:    1.0,               // orbit speed multiplier
  phase:    0.4,               // starting angle (radians)
  tilt:     0.14,              // vertical squish (0.08–0.18)
  color:    '#7b6fff',         // accent color (used for glow + minimap)
  gradient: 'radial-gradient(...)' // planet surface gradient
  content:  () => `...html...` // lazy content builder (function!)
}
```

### Change accent colors
Edit CSS variables at the top of `styles/main.css`:
```css
:root {
  --accent: #7b6fff;   /* main accent */
  --gold:   #ffd47e;   /* warm highlight */
  --teal:   #52e3c2;   /* cool highlight */
}
```

### Adjust orbit speed
```js
this.orbitSpeed = 0.00008;   // default (slow, elegant)
// Fast mode multiplier is 4x (set in _bindUI)
```

---

## ⚡ Performance Architecture

| Feature              | Implementation                                          |
|----------------------|---------------------------------------------------------|
| Stars                | Canvas (single drawImage per frame from offscreen)      |
| Orbits               | `sin/cos` math — no physics engine                     |
| Zoom/Pan             | CSS `transform: translate() scale()` — GPU composited  |
| Inertia              | Simple velocity × friction (2 multiplications/frame)   |
| Labels               | CSS class toggle at zoom threshold (no JS per label)   |
| Content              | Lazy — HTML strings built only on click                |
| Layout thrashing     | Zero — all reads happen before writes                  |
| Event listeners      | `passive: true` on all scroll/touch events             |
| `will-change`        | Only on `#world` (the main zoom container)             |
| DOM node count       | ~80 total (8 planets × 5 nodes + UI)                  |

---

## 📁 File Structure

```
cosmic-portfolio/
├── index.html               ← Main app (self-contained)
├── styles/
│   └── main.css             ← All styles + CSS variables
├── engine/
│   ├── viewport.js          ← Zoom/pan engine (reference)
│   ├── starfield.js         ← Star renderer (reference)
│   └── orbits.js            ← Orbit math (reference)
├── components/
│   ├── panel.js             ← Panel component (reference)
│   ├── minimap.js           ← Minimap renderer (reference)
│   └── planets-data.js      ← Planet configs (reference)
└── README.md
```

> **Note:** All engine code is inlined in `index.html` for zero-dependency operation.
> The `/engine` and `/components` files are reference/modular versions for when
> you want to extend with a build tool (Vite, etc.).

---

## 🔧 Extending

### Add a new planet
1. Add an entry to the `PLANETS` array in `index.html`
2. Choose a radius that doesn't clash with existing orbits
3. Write your `content()` function returning an HTML string

### Add background music
```js
// Add to CosmicApp._bindUI(), triggered on first interaction
const audio = new Audio('assets/ambient.mp3');
audio.loop = true; audio.volume = 0.12;
document.addEventListener('click', () => audio.play(), { once: true });
```

### Export as Electron app
```bash
npm init -y
npm install electron --save-dev
# Create main.js pointing to index.html
npx electron .
```

---

## 📄 License

MIT — use freely, customize fully, launch into orbit. 🚀
