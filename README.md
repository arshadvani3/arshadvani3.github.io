# Portfolio — Arsh Advani

Personal portfolio site. Single-page, dark, React + inline Babel, no build step.

## File layout

```
portfolio-site/
├── index.html          ← page shell, all CSS, design tokens, SEO/OG meta
├── app.jsx             ← all content + components (the file you'll edit most)
├── tweaks-panel.jsx    ← in-page tweak controls (accent color, cursor, grain)
├── favicon.svg         ← AA monogram browser-tab icon
├── og.png              ← 1200×630 link-preview image (og:image / twitter:image)
├── resume.pdf          ← linked from nav CTA + hero button
└── README.md
```

There is **no build step**. `index.html` loads React + Babel-standalone from a CDN and transpiles `app.jsx` in the browser. To work on it locally, you can just `open index.html`, but some browsers block `fetch` of local `.jsx` files via `file://` — easiest is:

```bash
cd portfolio-site
python3 -m http.server 8080
# → http://localhost:8080/
```

…or `npx serve .`, or any other static server.

## Hosting

Any static host works — there's nothing to compile.

- **GitHub Pages**: push the folder to a repo, Settings → Pages → deploy from `main` / root. Visit `https://<you>.github.io/<repo>/`.
- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or connect the repo. No build command, publish directory = repo root.
- **Custom domain**: point a CNAME at your host of choice.

> **Production note.** The in-browser Babel transpile costs ~200 ms on first load. If you want it snappier, pre-compile `app.jsx` and `tweaks-panel.jsx` to plain JS once (`npx babel app.jsx -o app.js --presets=@babel/preset-react`) and swap the `<script type="text/babel" src="…jsx">` tags for `<script src="…js">`. Optional — the current setup is perfectly fine for a personal site. React itself already loads as the production build.

**Link previews.** `index.html` carries OpenGraph/Twitter meta pointing at `https://arshadvani3.github.io/` and `og.png`. If the site ever moves to a custom domain, update the `og:url`, `og:image`, `twitter:image`, and `canonical` URLs in the `<head>`.

## Editing with Claude Code

Open the folder in Claude Code and point it at the file(s) below. All content is in plain JS arrays at the top of `app.jsx` — no JSX rewiring needed for copy changes.

### Where to edit what

| What you want to change | File | Where |
|---|---|---|
| Hero headline ("Hi, I'm Arsh…") | `app.jsx` | `function Hero()` (~line 253) |
| About copy | `app.jsx` | `function About()` (~line 320) |
| Nav items | `app.jsx` | `const NAV` (~line 21) |
| Skills chips | `app.jsx` | `const SKILLS` (~line 29) |
| Work experience entries | `app.jsx` | `const EXPERIENCE` (~line 37) |
| Project cards | `app.jsx` | `const PROJECTS` (~line 60) |
| Education entries | `app.jsx` | `const EDUCATION` (~line 87) |
| Contact section copy + email | `app.jsx` | `function Contact()` (~line 474) |
| Footer | `app.jsx` | `function Footer()` (~line 535) |
| Resume PDF | `resume.pdf` | replace the file at the project root |
| Logo monogram (the "AA" SVG) | `app.jsx` | inside `function Header()` (~line 213), the `<svg className="logo-mark">` |
| Colors / type / spacing | `index.html` | `:root { … }` block at the top of `<style>` |
| Default accent + tweak defaults | `app.jsx` | `TWEAK_DEFAULTS` (line 5) and `ACCENTS` (line 11) |

### Suggested prompts for Claude Code

- "In `app.jsx`, rewrite the AgentMesh description in `PROJECTS` to the following: …"
- "Add a new project entry to `PROJECTS` in `app.jsx` with title 'X', tags […], desc '…', link 'https://…', and use `art: 'art-2'`."
- "Change the default accent in `TWEAK_DEFAULTS` to `cyan` and update the matching `--accent*` fallbacks in `index.html`."
- "Replace the hero headline `<h1>` in `function Hero()` with three new lines: …"

### Design tokens (quick reference)

Defined as CSS custom properties in `index.html`:

- Background scale: `--bg`, `--bg-alt`, `--bg-card`
- Foreground scale: `--fg`, `--fg-2`, `--fg-3`, `--fg-4`
- Lines/borders: `--line`, `--line-2`, `--line-hi`
- Accent (overridden by JS based on tweak): `--accent`, `--accent-2`, `--accent-soft`, `--accent-glow`, `--accent-ring`
- Type: `--font-display` (Syne), `--font-body` (Inter), `--font-mono` (JetBrains Mono)
- Motion: `--t-fast` (180ms), `--t-norm` (320ms), `--t-slow` (600ms)
- Radii: `--radius-pill`, `--radius`, `--radius-lg`

### Tweaks panel

The little "Tweaks" panel on the page lets you preview different accents (amber / indigo / cyan / emerald / rose), toggle the custom cursor, and toggle the film-grain overlay. State persists across reloads. To change the **default** (what visitors see), edit the `TWEAK_DEFAULTS` block in `app.jsx`.

## Notes

- Fonts load from Google Fonts (Syne, Inter, JetBrains Mono). No license action needed for personal use.
- The contact form is currently a stub — it shows a success message but doesn't actually send. To wire it up, point the `onSubmit` in `function Contact()` at Formspree, Resend, a Netlify form, or your own endpoint.
- The custom cursor is disabled automatically on touch / small screens.
