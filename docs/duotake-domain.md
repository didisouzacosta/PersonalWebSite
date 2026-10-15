# DuoTake custom domain

`duotake.app` currently returns a Cloudflare `301` redirect to
`https://adrianosouzacosta.com.br/apps/duotake/`. That redirect happens before
Astro or GitHub Pages can render the page, so it cannot be fixed only with page
markup.

Use `cloudflare/duotake-domain-worker.js` to keep the app domain in the browser
address bar while serving the existing Astro pages from the portfolio site.

## Cloudflare setup

1. In Cloudflare, remove or disable the redirect rule/page rule that sends
   `duotake.app` and `www.duotake.app` to
   `https://adrianosouzacosta.com.br/apps/duotake/`.
2. Publish the Worker with:

   ```sh
   npx wrangler deploy --config wrangler.duotake.jsonc
   ```

3. Keep both Worker routes enabled:

   - `duotake.app/*`
   - `www.duotake.app/*`

The Worker maps:

- `https://duotake.app/` to `/apps/duotake/`
- `https://duotake.app/pt-br/` to `/pt-br/apps/duotake/`
- `https://duotake.app/terms-of-use/` to `/apps/duotake/terms-of-use/`
- `https://duotake.app/privacy-policy/` to `/apps/duotake/privacy-policy/`
- `https://duotake.app/pt-br/terms-of-use/` to `/pt-br/apps/duotake/terms-of-use/`
- `https://duotake.app/pt-br/privacy-policy/` to `/pt-br/apps/duotake/privacy-policy/`

It also rewrites internal links, canonical URLs, Open Graph URLs, `robots.txt`,
and `sitemap.xml` so navigation remains under `duotake.app`.

## Indexing

`duotake.app` is the canonical domain for DuoTake. The portfolio pages
`/apps/duotake/` and `/pt-br/apps/duotake/` declare `https://duotake.app/` and
`https://duotake.app/pt-br/` as canonical and are left out of the portfolio
sitemap.

To keep a single indexable URL per page, the Worker answers with `301`:

- `http://` to `https://`, and `www.duotake.app` to `duotake.app`.
- Clean paths without a trailing slash (`/privacy-policy`) to the slash version.
- Portfolio paths on the app domain (`/apps/duotake/...`) to the clean path.
- Any other page (`/resume/`, `/apps/kuborush/`, ...) to the same path on
  `https://adrianosouzacosta.com.br`, so the portfolio is not duplicated under
  `duotake.app`. Assets (`/_astro/*` and files with an extension) are still
  proxied.

The app sitemap lists only `/` and `/pt-br/`; the legal pages are `noindex`.
