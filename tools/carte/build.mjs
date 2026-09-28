// Génère images/carte-flux.svg : carte Maroc–Europe, pays desservis aux couleurs de leur drapeau, flèches des flux RTL.
import fs from "fs";
import * as d3 from "d3-geo";
import * as topo from "topojson-client";

const world = JSON.parse(fs.readFileSync(new URL("./node_modules/world-atlas/countries-50m.json", import.meta.url)));
const geoms = world.objects.countries.geometries;
const byId = id => geoms.filter(g => +g.id === +id);
const feat = ids => topo.merge(world, ids.flatMap(byId));

const W = 800;
const frame = { type: "MultiPoint", coordinates: [[-17.5, 21], [31, 21], [-12, 62.5], [30, 62.5], [9, 64]] };
const proj = d3.geoConicConformal().parallels([30, 55]).rotate([-7, 0]);
proj.fitWidth(W, frame);
const [[, y0], [, y1]] = d3.geoPath(proj).bounds(frame);
const H = Math.round(y1 - y0 + 10);
proj.translate([proj.translate()[0], proj.translate()[1] - y0 + 5]).clipExtent([[0, 0], [W, H]]);
const path = d3.geoPath(proj).digits(1);
const P = ([lon, lat]) => proj([lon, lat]).map(v => +v.toFixed(1));

// Couleurs officielles (approximations web)
const C = { red: "#C1272D", green: "#006233", es_r: "#AA151B", es_y: "#F1BF00", pt_g: "#046A38", pt_r: "#DA291C",
  it_g: "#009246", it_r: "#CE2B37", fr_b: "#0055A4", fr_r: "#EF4135", de_k: "#000000", de_r: "#DD0000", de_y: "#FFCE00",
  be_y: "#FDDA24", be_r: "#EF3340", nl_r: "#AE1C28", nl_b: "#21468B", lu_b: "#00A1DE", pl_r: "#DC143C", cz_b: "#11457E", cz_r: "#D7141A",
  sk_b: "#0B4EA2", sk_r: "#EE1C25", hu_r: "#CE2939", hu_g: "#477050", ro_b: "#002B7F", ro_y: "#FCD116", ro_r: "#CE1126",
  bg_g: "#00966E", bg_r: "#D62612", dk_r: "#C8102E", se_b: "#006AA7", se_y: "#FECC02", no_r: "#BA0C2F", no_b: "#00205B", W: "#FFFFFF" };

// flag(bbox) -> svg string inside the country's clip
const H3 = (a, b, c, w = [1, 1, 1]) => ({ type: "h", cols: [a, b, c], w });
const V3 = (a, b, c, w = [1, 1, 1]) => ({ type: "v", cols: [a, b, c], w });
const FLAGS = {
  ES: { ids: [724], f: H3(C.es_r, C.es_y, C.es_r, [1, 2, 1]) },
  PT: { ids: [620], f: { type: "v", cols: [C.pt_g, C.pt_r], w: [2, 3] } },
  IT: { ids: [380], f: V3(C.it_g, C.W, C.it_r) },
  FR: { ids: [250], f: V3(C.fr_b, C.W, C.fr_r) },
  DE: { ids: [276], f: H3(C.de_k, C.de_r, C.de_y) },
  BE: { ids: [56], f: V3(C.de_k, C.be_y, C.be_r) },
  NL: { ids: [528], f: H3(C.nl_r, C.W, C.nl_b) },
  LU: { ids: [442], f: H3(C.de_r, C.W, C.lu_b) },
  PL: { ids: [616], f: { type: "h", cols: [C.W, C.pl_r], w: [1, 1] } },
  CZ: { ids: [203], f: { type: "cz" } },
  SK: { ids: [703], f: H3(C.W, C.sk_b, C.sk_r) },
  HU: { ids: [348], f: H3(C.hu_r, C.W, C.hu_g) },
  RO: { ids: [642], f: V3(C.ro_b, C.ro_y, C.ro_r) },
  BG: { ids: [100], f: H3(C.W, C.bg_g, C.bg_r) },
  DK: { ids: [208], f: { type: "cross", bg: C.dk_r, fg: C.W } },
  SE: { ids: [752], f: { type: "cross", bg: C.se_b, fg: C.se_y } },
  NO: { ids: [578], f: { type: "cross", bg: C.no_r, fg: C.W, inner: C.no_b } },
  MA: { ids: [504, 732], f: { type: "ma" } },
};

function flagSvg(code, f, [[x0, y0], [x1, y1]]) {
  const w = x1 - x0, h = y1 - y0; let s = "";
  const r = (x, y, ww, hh, c) => `<rect x="${(x).toFixed(1)}" y="${(y).toFixed(1)}" width="${(ww + .6).toFixed(1)}" height="${(hh + .6).toFixed(1)}" fill="${c}"/>`;
  if (f.type === "h" || f.type === "v") {
    const tot = f.w.reduce((a, b) => a + b, 0); let acc = 0;
    f.cols.forEach((c, i) => { const a = acc / tot, b = f.w[i] / tot; acc += f.w[i];
      s += f.type === "h" ? r(x0, y0 + a * h, w, b * h, c) : r(x0 + a * w, y0, b * w, h, c); });
  } else if (f.type === "cz") {
    s += r(x0, y0, w, h / 2, C.W) + r(x0, y0 + h / 2, w, h / 2, C.cz_r) + `<path d="M${x0} ${y0}L${x0 + w * .5} ${y0 + h / 2}L${x0} ${y1}Z" fill="${C.cz_b}"/>`;
  } else if (f.type === "cross") {
    const cx = x0 + w * .38, cy = y0 + h * .5, t = Math.min(w, h) * .14;
    s += r(x0, y0, w, h, f.bg) + r(cx - t / 2, y0, t, h, f.fg) + r(x0, cy - t / 2, w, t, f.fg);
    if (f.inner) { const t2 = t * .5; s += r(cx - t2 / 2, y0, t2, h, f.inner) + r(x0, cy - t2 / 2, w, t2, f.inner); }
  } else if (f.type === "ma") {
    s += r(x0, y0, w, h, C.red);
    const [sx, sy] = P([-6.4, 31.6]); const R = 34;
    const pts = [...Array(5)].map((_, i) => { const a = -Math.PI / 2 + i * 4 * Math.PI / 5; return [sx + R * Math.cos(a), sy + R * Math.sin(a)]; });
    s += `<path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(" ")).join("L")}Z" fill="none" stroke="${C.green}" stroke-width="5.5" stroke-linejoin="miter"/>`;
  }
  return s;
}

// ---- Villes et flux
const CITY = {
  casa: [-7.59, 33.57], tng: [-5.50, 35.89], mad: [-3.56, 40.42], bcn: [2.17, 41.39], ali: [-0.48, 38.35],
  opo: [-8.61, 41.15], lis: [-9.14, 38.72], mil: [9.38, 45.41],
  fr: [2.4, 47.2], de: [10.2, 51.0], bnl: [4.6, 51.0], sca: [14.2, 57.6], est: [19.6, 48.6]
};
const DOT = new Set(["casa","tng","mad","bcn","ali","opo","lis","mil"]);
// [from, to, bend, style]  main = lignes régulières RTL ; part = réseau partenaires
const FLOWS = [
  ["opo", "tng", -0.16, "main"], ["lis", "tng", -0.10, "main"],
  ["mad", "tng", 0.02, "main"], ["bcn", "tng", 0.10, "main"], ["ali", "tng", 0.16, "main"],
  ["mil", "tng", 0.14, "main"], ["fr", "tng", 0.20, "main"],
  ["bnl", "tng", 0.10, "part"], ["de", "tng", -0.02, "part"], ["sca", "tng", -0.12, "part"],
  ["est", "mil", 0.10, "part"],
];
const curve = (a, b, k) => {
  const [x1, y1] = P(CITY[a]), [x2, y2] = P(CITY[b]);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
  const cx = mx - dy * k, cy = my + dx * k;
  // raccourcir aux extrémités pour laisser respirer les points
  const sh = (px, py, qx, qy, d) => { const L = Math.hypot(qx - px, qy - py); return [px + (qx - px) * d / L, py + (qy - py) * d / L]; };
  const [sx, sy] = sh(x1, y1, cx, cy, DOT.has(a) ? 9 : 2), [ex, ey] = sh(x2, y2, cx, cy, b === "tng" ? 20 : 11);
  return `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
};

const LABELS = [
  ["casa", "Casablanca", -15, 7, "end", 1], ["tng", "Tanger Med", -15, -8, "end", 1],
  ["opo", "Porto", -10, 4, "end"], ["lis", "Lisboa", -10, 4, "end"], ["mad", "Madrid", -7, -10, "end"],
  ["bcn", "Barcelona", 10, 4, "start"], ["ali", "Alicante", 11, 9, "start"], ["mil", "Milano · Tribiano", 11, 20, "start"],
];

let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Carte des flux RTL Maroc : Espagne, Portugal, Italie, France, Europe de l'Est, Allemagne, Benelux, Scandinavie ⇄ Tanger Med et Casablanca">
<style>
.land{fill:#262B33;stroke:#3A404B;stroke-width:.6}
.served{stroke:#fff;stroke-width:.9;stroke-opacity:.85}
.halo{fill:none;stroke:#0B0D10;stroke-linecap:round;stroke-opacity:.75}
.main{fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round}
.part{fill:none;stroke:#FFB81C;stroke-width:2.8;stroke-dasharray:8 6;stroke-linecap:round}
.trunk{fill:none;stroke:#fff;stroke-width:4.5;stroke-linecap:round}
.dot{fill:#fff;stroke:#0B0D10;stroke-width:2}
.hub{fill:#E03A2F;stroke:#fff;stroke-width:3}
text{font-family:"Barlow Condensed","Arial Narrow","Roboto Condensed",Arial,sans-serif;font-weight:500;fill:#fff;paint-order:stroke;stroke:#0B0D10;stroke-width:4.5;stroke-linejoin:round}
.city{font-size:19px}.major{font-size:25px;font-weight:600}
.flow{stroke-dashoffset:0}
@media (prefers-reduced-motion:no-preference){.part{animation:m 1.4s linear infinite}}
@keyframes m{to{stroke-dashoffset:-28}}
</style>
<defs>
<marker id="aw" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#fff" stroke="#0B0D10" stroke-width="1"/></marker>
<marker id="ay" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#FFB81C" stroke="#0B0D10" stroke-width="1"/></marker>
<radialGradient id="sea" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#14304A"/><stop offset="1" stop-color="#0A1826"/></radialGradient>
`;
const served = Object.entries(FLAGS).map(([code, o]) => ({ code, o, g: feat(o.ids) }));
served.forEach(({ code, g }) => { out += `<clipPath id="k${code}"><path d="${path(g)}"/></clipPath>\n`; });
out += `</defs>\n<rect width="${W}" height="${H}" fill="url(#sea)"/>\n`;

// fond : tous les pays
const servedIds = new Set(Object.values(FLAGS).flatMap(o => o.ids.map(Number)));
const others = geoms.filter(g => !servedIds.has(+g.id));
out += `<path class="land" d="${path(topo.merge(world, others))}"/>\n`;
out += `<path class="land" d="${path(topo.mesh(world, { type: "GeometryCollection", geometries: others }, (a, b) => a !== b))}" fill="none"/>\n`;

// pays desservis aux couleurs du drapeau
served.forEach(({ code, o, g }) => {
  const b = path.bounds(g);
  out += `<g clip-path="url(#k${code})" opacity=".92">${flagSvg(code, o.f, b)}</g><path class="served" fill="none" d="${path(g)}"/>\n`;
});

// flux
const flows = FLOWS.map(([a, b, k, s]) => ({ d: curve(a, b, k), s }));
flows.filter(f => f.s === "part").forEach(f => { out += `<path class="halo" stroke-width="5" d="${f.d}"/><path class="part" d="${f.d}" marker-start="url(#ay)" marker-end="url(#ay)"/>\n`; });
flows.filter(f => f.s === "main").forEach(f => { out += `<path class="halo" stroke-width="6.5" d="${f.d}"/><path class="main" d="${f.d}" marker-start="url(#aw)" marker-end="url(#aw)"/>\n`; });
const [tx, ty] = P(CITY.tng), [cx, cy] = P(CITY.casa);
out += `<path class="halo" stroke-width="9" d="M${tx} ${ty}L${cx} ${cy}"/><path class="trunk" d="M${tx} ${ty}L${cx} ${cy}"/>\n`;

// points + libellés
Object.entries(CITY).filter(([k]) => DOT.has(k)).forEach(([k, c]) => { const [x, y] = P(c); const hub = k === "tng" || k === "casa";
  out += hub ? `<circle class="hub" cx="${x}" cy="${y}" r="10"/>` : `<circle class="dot" cx="${x}" cy="${y}" r="5.5"/>`; });
out += "\n";
LABELS.forEach(([k, t, dx, dy, a, maj]) => { const [x, y] = P(CITY[k]);
  out += `<text class="${maj ? "major" : "city"}" x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${a}">${t}</text>`; });
out += `\n</svg>\n`;
fs.writeFileSync(process.argv[2] || "carte-flux.svg", out);
console.log("ok", W, H, (out.length / 1024).toFixed(0) + " KB");
