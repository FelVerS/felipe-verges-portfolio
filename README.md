# Felipe Verges Suarez - Portfolio

A fast, accessible and dependency-free personal portfolio for Felipe Verges Suarez, an
Industrial Engineer and Data Engineer based in Barcelona.

## Highlights

- Semantic, responsive HTML
- Accessible mobile navigation and keyboard support
- Progressive reveal animations with reduced-motion support
- SEO metadata, structured data, sitemap and social sharing card
- Automated validation and GitHub Pages deployment
- No framework, package dependencies or client-side tracking

## Local development

Run any static HTTP server from the project root. For example:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173>.

## Validation

The project uses Node.js built-in tools, so no dependency installation is required:

```powershell
node --check src/js/main.js
node --test scripts/validate.mjs
```

## Deployment

Every push to `main` runs validation and deploys the repository to GitHub Pages through
the workflow in `.github/workflows/pages.yml`.

The production site is expected at:

<https://felvers.github.io/felipe-verges-portfolio/>

## Project structure

```text
.
|-- .github/workflows/pages.yml
|-- assets/
|-- scripts/validate.mjs
|-- src/
|   |-- js/
|   `-- styles/
|-- 404.html
|-- index.html
|-- robots.txt
|-- sitemap.xml
`-- site.webmanifest
```

## Privacy

The website uses no analytics, cookies or third-party scripts. Contact is handled through
standard email and LinkedIn links.
