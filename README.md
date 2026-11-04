# Chabi.lol

A personal portfolio for Mmasechaba Francesca Seopa, Technical Systems Analyst in Johannesburg. It includes live projects, professional case studies, experience, education and contact details.

## Run locally

Serve the static site from this directory.

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/. There is no install or build step. The projects, navigation and disclosures also work with JavaScript disabled. JavaScript adds a flower welcome, subtle section animations and an optional portfolio guide. The welcome plays once per tab session and can be skipped with Enter portfolio or Escape. Select Replay welcome on the home page to watch it again, or use `?intro=1` to preview the entrance on arrival. Reduced-motion preferences show a still flower and name.

## Files

- `index.html` holds page content and project links.
- `styles.css` controls the layout, colours and type.
- `script.js` handles the welcome, motion preferences, background guide and direct links to disclosures.
- `assets/` includes original vector illustrations and self-hosted Newsreader fonts. The font licence is included in `assets/fonts/`.

The repository root is ready to serve on GitHub Pages. All asset references are relative, so the site can also run under a project subpath.
