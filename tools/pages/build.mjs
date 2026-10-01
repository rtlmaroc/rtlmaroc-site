// Génère les pages dédiées (une vraie URL par ligne) à partir de index.html.
// Lancé automatiquement par Netlify à chaque publication (netlify.toml → [build] command).
// En local : node tools/pages/build.mjs  (les dossiers générés ne sont pas versionnés).
//
// Chaque page reçoit son propre titre, sa description, son URL canonique et le contenu
// de la ligne déjà écrit en HTML (français), lisible par Google sans JavaScript.
// Le site reste une seule application : le script de index.html prend le relais.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://rtlmaroc.com";
const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

const PAGES = [
  { k: "it", slug: "groupage-italie-maroc", country: "Italie",
    title: "Groupage Italie – Maroc : 2 départs par semaine, 72 h | RTL Maroc",
    desc: "Groupage Italie – Maroc avec RTL Maroc : consolidation à Tribiano (Milan), 2 départs par semaine, 72 h de transit vers Casablanca et Tanger. Aussi du Maroc vers l’Italie." },
  { k: "es", slug: "groupage-espagne-maroc", country: "Espagne",
    title: "Groupage Espagne – Maroc : enlèvement toute l’Espagne, 48 h | RTL Maroc",
    desc: "Groupage Espagne – Maroc avec RTL Maroc : enlèvement dans toute l’Espagne via Madrid, Barcelone et Alicante, 48 h de transit, livraison MEAD Tanger et Casablanca." },
  { k: "pt", slug: "groupage-portugal-maroc", country: "Portugal",
    title: "Groupage Portugal – Maroc : mercredi et vendredi, 48 h | RTL Maroc",
    desc: "Groupage Portugal – Maroc avec RTL Maroc : Porto et Lisbonne, départs le mercredi et le vendredi, 48 h de transit vers Casablanca et Tanger. Aussi du Maroc vers le Portugal." }
];

// --- Exécuter le script du site dans un faux navigateur pour obtenir le HTML rendu ---
const scripts = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length !== 1) throw new Error("index.html : script principal introuvable");
const els = {};
const el = () => ({ innerHTML: "", hidden: false, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, scrollIntoView() {} });
const location = { hash: "", pathname: "/", replace(u) { throw new Error("redirection inattendue vers " + u); } };
const ctx = vm.createContext({
  location, navigator: { language: "fr" }, localStorage: { getItem: () => null, setItem() {} },
  document: { documentElement: {}, title: "", querySelector: s => (els[s] ||= el()), querySelectorAll: () => [], getElementById: () => null, addEventListener() {} },
  window: { addEventListener() {}, scrollTo() {} }, matchMedia: () => ({ matches: true }),
  setInterval: () => 0, clearInterval() {}, setTimeout: () => 0, getSelection: () => ({}), console
});
ctx.window.document = ctx.document;
vm.runInContext(scripts[0], ctx);

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));
const swap = (html, re, to) => { if (!re.test(html)) throw new Error("motif introuvable : " + re); return html.replace(re, () => to); };

for (const P of PAGES) {
  location.pathname = "/" + P.slug + "/";
  vm.runInContext('lang = "fr"; render();', ctx);
  const L = vm.runInContext(`T.fr.lines.${P.k}`, ctx);
  const url = `${SITE}/${P.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "name": L.name, "serviceType": "Groupage routier international", "description": P.desc, "url": url,
        "provider": { "@id": SITE + "/#rtl" }, "areaServed": [P.country, "Maroc"] },
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "RTL Maroc", "item": SITE + "/" },
        { "@type": "ListItem", "position": 2, "name": L.name, "item": url }] }
    ]
  };
  let h = src;
  h = swap(h, /<meta charset="utf-8">/, '<meta charset="utf-8">\n<base href="/">');
  h = swap(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(P.desc)}">`);
  h = swap(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(L.name)} | RTL Maroc">`);
  h = swap(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(P.desc)}">`);
  h = swap(h, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  h = swap(h, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  h = swap(h, /<title>[^<]*<\/title>/, `<title>${esc(P.title)}</title>\n<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  h = swap(h, /<nav class="nav" id="nav"><\/nav>/, `<nav class="nav" id="nav">${els["#nav"].innerHTML}</nav>`);
  h = swap(h, /<main id="app">[\s\S]*?<\/main>/, `<main id="app">${els["#app"].innerHTML}</main>`);
  h = swap(h, /<footer class="foot" id="foot"><\/footer>/, `<footer class="foot" id="foot">${els["#foot"].innerHTML}</footer>`);
  fs.mkdirSync(path.join(ROOT, P.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, P.slug, "index.html"), h);
  console.log("OK  /" + P.slug + "/");
}
