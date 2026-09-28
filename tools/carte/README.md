# Carte des flux

Génère `images/carte-flux.svg` (pays desservis aux couleurs de leur drapeau + flèches des flux).

    cd tools/carte && npm i d3-geo topojson-client world-atlas@2
    node build.mjs ../../images/carte-flux.svg

Villes, flux (`FLOWS` : main = lignes régulières RTL, part = réseau partenaires) et pays (`FLAGS`) se modifient en tête de `build.mjs`.
Le Maroc est dessiné avec son Sahara, sans frontière intérieure.
