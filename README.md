# ghuralabs.com

The website for Ghura Labs, a small studio in Ontario, Canada, making apps and
games. It is one static page that lists the studio's products (currently
[Chalkalong](https://chalkalong.com)) and a contact address.

There is no framework, build step or JavaScript: just HTML, CSS and images.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `styles.css` | All styles, with light and dark themes (colors are CSS custom properties at the top) |
| `404.html` | Not-found page (Cloudflare Pages serves it automatically) |
| `assets/` | Product icons and screenshots (cached for a year, see below) |
| `favicon.svg`, `apple-touch-icon.png` | Icons |
| `og-image.png` | 1200x630 social sharing image |
| `_headers` | Cloudflare Pages security and cache headers |
| `robots.txt`, `sitemap.xml` | For search engines |

## Preview locally

From the repo root, run either:

```sh
python3 -m http.server 8000     # then open http://localhost:8000
npx serve .                     # then open the URL it prints
```

These don't apply `_headers`, so the Content-Security-Policy is only active on
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

Writing guidelines: no em dashes in visible text.

Files in `/assets/` are cached for a year as immutable, so **give a changed image
a new filename** (for example `chalkalong-lesson-2.jpg`) rather than overwriting it.

Each January, update the year in the footer of `index.html`.

## Deploy

The site deploys on Cloudflare Pages from the `main` branch:

- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`

Every push to `main` goes live. Other branches get preview URLs.
