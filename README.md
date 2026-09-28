# Site web RTL Maroc — Round Trip Logistics

Site vitrine de www.rtlmaroc.com (design « Nuit », 6 langues : FR, ES, PT, IT, EN, AR).

- `index.html` : tout le site (contenu, styles, traductions, formulaire de devis WhatsApp/e-mail)
- `images/` : logo, symbole, badge « 8 ans », photos flotte
- `netlify.toml` : hébergement Netlify (en-têtes, cache)
- `robots.txt`, `sitemap.xml` : référencement

Chaque modification poussée sur la branche `main` est publiée automatiquement par Netlify.

## Règle DNS (eNom via Google Workspace)
Ne jamais modifier les enregistrements MX, SPF, DKIM ni les serveurs de noms : ils font fonctionner la messagerie @rtlmaroc.com.
Le site n'utilise que : `www` (CNAME → site Netlify) et `@` (A → 75.2.60.5, load balancer Netlify).
