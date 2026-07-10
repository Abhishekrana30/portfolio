# Abhishek Rana — Portfolio

A personal portfolio site (Home / About / Skills / Projects / Academics / Contact), built with plain HTML, CSS and JavaScript — no framework, no build step.

## Files
- `index.html` — all page content
- `style.css` — all styling
- `script.js` — mobile menu + active nav-link highlighting
- `assets/profile.jpeg` — profile photo

## Run it locally
Just open `index.html` in a browser, or serve it:
```bash
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Deploy for free with GitHub Pages
1. Push this folder to a GitHub repo (see main chat for full git steps).
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main`, folder `/root`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Things you may want to edit
- `index.html` → LinkedIn link is a placeholder `#`, add your real URL in the two spots with `aria-label="LinkedIn"`.
- Swap `assets/profile.jpeg` for a different photo any time (keep the same filename, or update the `src` in `index.html`).
- CGPA/education text is in the `#academics` section.
