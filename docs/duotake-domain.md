# DuoTake custom domain

`https://duotake.app` is a static site built from this repository and served
by Cloudflare. It shares its content with the portfolio pages under
`/apps/duotake/`, so one change updates both sites.

## How it is built

- Content (texts, screenshots, FAQ, SEO) lives in `src/core/apps/duotake.ts`.
- Legal texts live in `src/components/app/duotake/` (`PrivacyPolicyEn.astro`,
  `TermsOfUsePtBr.astro`, ...).
- `DuoTakeAppPage.astro` and `DuoTakeLegalPage.astro` render that content for a
  given `site`:
  - `portfolio`: routes `/apps/duotake/...` and `/pt-br/apps/duotake/...` in
    `src/pages`, with the portfolio header and footer.
  - `standalone`: routes `/`, `/pt-br/`, `/terms-of-use/`, `/privacy-policy/`
    and their `pt-br` versions in `sites/duotake/pages`, with only a Home link
    and no social links (`duoTakeSiteChrome`).
- `astro.config.duotake.mjs` builds `sites/duotake` into `dist-duotake/`, with
  its own `robots.txt`, `sitemap.xml` and `404.html`.

The header, footer and language button are configured through `Layout.astro`
props (`navigationItems`, `showSocialLinks`, `alternateLanguageHref`), so no
HTML is rewritten at request time.

## Commands

```sh
npm run dev:duotake      # http://localhost:4322
npm run build:duotake    # dist-duotake/
npx wrangler deploy --config wrangler.duotake.jsonc
```

## Deploy

The `deploy-duotake` job in `.github/workflows/deploy.yml` builds and deploys
on every push to `main`, alongside the GitHub Pages deploy. It needs these
repository secrets:

- `CLOUDFLARE_API_TOKEN`: token with the "Edit Cloudflare Workers" template,
  scoped to the account and the `duotake.app` zone.
- `CLOUDFLARE_ACCOUNT_ID`.

`wrangler.duotake.jsonc` keeps the Worker name `duotake-domain` and the routes
`duotake.app/*` and `www.duotake.app/*`, and serves `dist-duotake/` as static
assets. Roll back with:

```sh
npx wrangler rollback --config wrangler.duotake.jsonc
```

## Indexing

`duotake.app` is the canonical domain for DuoTake. The portfolio pages
`/apps/duotake/` and `/pt-br/apps/duotake/` declare `https://duotake.app/` and
`https://duotake.app/pt-br/` as canonical and are left out of the portfolio
sitemap. The app sitemap lists only `/` and `/pt-br/`; the legal pages are
`noindex`.

`cloudflare/duotake-domain-worker.js` runs before the assets only to keep a
single indexable URL per page, answering with `301`:

- `http://` to `https://`, and `www.duotake.app` to `duotake.app`.
- Paths without a trailing slash (`/privacy-policy`) to the slash version.
- Old portfolio paths on the app domain (`/apps/duotake/...`) to the clean path.
- Other portfolio sections (`/apps/...`, `/resume/...`) to the same path on
  `https://adrianosouzacosta.com.br`.

Anything else is served from `dist-duotake/`, with `404.html` for unknown pages.
