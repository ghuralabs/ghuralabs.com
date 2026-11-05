# ghuralabs.com

The website for Ghura Labs, a small studio in Ontario, Canada, making apps and
games. It is one static page that lists the studio's products (currently
[Chalkalong](https://chalkalong.com)) and a contact address.

There is no framework or build step: just HTML, CSS, images and one tiny
script (`year.js`) that keeps the footer year current.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `styles.css` | All styles, with light and dark themes (colors are CSS custom properties at the top) |
| `year.js` | Sets the footer year; the page works fine without it |
| `legal.html` | Legal page at `/legal`: links to each product's terms and privacy policy, plus this site's own privacy note |
| `404.html` | Not-found page (Cloudflare Pages serves it automatically) |
| `assets/` | Product icons and screenshots (cached for a year, see below) |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Icons (the .ico is a 16/32/48px fallback for older browsers) |
| `og-image.png` | 1200x630 social sharing image |
| `_headers` | Cloudflare Pages security and cache headers |
| `robots.txt`, `sitemap.xml` | For search engines |

## Preview locally

From the repo root, run either:

```sh
python3 -m http.server 8000     # then open http://localhost:8000
npx serve .                     # then open the URL it prints
```

These don't apply `_headers` or Cloudflare's extensionless URLs, so open the
legal page at `/legal.html` locally (it lives at `/legal` in production). Also, the Content-Security-Policy is only active on
Cloudflare. To test with it locally, use `npx wrangler pages dev .`.

## Add a product

Products are plain HTML in `index.html`, inside `<ul class="products">`.
Copy the whole `<li class="product">...</li>` block, paste it after the last one,
and change:

- the icon (`assets/<name>-icon.png`, square, at least 168px) and the screenshot
  (`assets/<name>-*.jpg` plus an optional `.webp`; keep it under ~150 KB, for
  example `cwebp -q 78 in.jpg -o out.webp`)
- the name, the tagline, the 1 to 2 sentence description and the screenshot's alt text
- the status: `<span class="status status--live">Live</span>` or
  `<span class="status status--dev">In development</span>`
- the link URL and the link text

Once the product is released, also add a row for it in `legal.html` (copy the
Chalkalong `<li class="legal-product">` block) linking to its terms and privacy policy.

Writing guidelines: no em dashes in visible text.

Files in `/assets/` are cached for a year as immutable, so **give a changed image
a new filename** (for example `chalkalong-lesson-2.jpg`) rather than overwriting it.

The footer year updates itself via `year.js` (the year in the HTML is only a
fallback for when JavaScript is off).

## Deploy

The site deploys on Cloudflare Pages from the `main` branch:

- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`

Every push to `main` goes live. Other branches get preview URLs.
