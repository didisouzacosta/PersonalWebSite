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

It also rewrites internal links, canonical URLs, Open Graph URLs, `robots.txt`,
and `sitemap.xml` so navigation remains under `duotake.app`.
