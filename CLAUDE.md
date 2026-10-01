# Atlas — règles pour toute modification de ce dépôt

Site www.rtlmaroc.com (RTL Maroc – Round Trip Logistics). Push sur `main` = mise en ligne Netlify en ~1 min.

1. Toujours `git pull` avant de modifier : plusieurs conversations peuvent publier.
2. Ne jamais proposer de modifier le DNS (MX, SPF, DKIM, vérification Google, serveurs de noms) : ce sont les e-mails @rtlmaroc.com.
3. Contacts, prix, délais, mentions légales : montrer une capture et attendre l'accord explicite avant de publier.
4. Tout texte se modifie dans les 6 langues (fr, es, pt, it, en, ar). Le français fait foi.
5. Garder le design « Nuit » (fond sombre, rouge #E03A2F, Barlow Condensed fin).
6. Aucun secret (mot de passe, clé, donnée client) dans ce dépôt : il est public.
7. Vérifier le rendu (Playwright, 1280 px et 390 px, FR et AR) avant chaque push ; en cas de problème après publication : `git revert` + push.
8. Images modifiées : incrémenter le `?v=` dans index.html pour contourner le cache navigateur.
9. Pages dédiées `/groupage-italie-maroc/`, `/groupage-espagne-maroc/`, `/groupage-portugal-maroc/` : générées depuis index.html par `tools/pages/build.mjs` (Netlify le lance à chaque publication ; dossiers non versionnés). Lancer `node tools/pages/build.mjs` avant de vérifier en local. Ne pas les modifier à la main.
