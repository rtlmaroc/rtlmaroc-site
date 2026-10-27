// Génère les pages dédiées (une vraie URL par ligne et par langue) à partir de index.html.
// Lancé automatiquement par Netlify à chaque publication (netlify.toml → [build] command).
// En local : node tools/pages/build.mjs  (les dossiers générés ne sont pas versionnés).
//
// Pages produites :
//   - français : /groupage-italie-maroc/, /groupage-espagne-maroc/, /groupage-portugal-maroc/
//   - autres langues (es, pt, it, en, ar) : /xx/ (accueil) et /xx/groupage-…-maroc/ (les trois lignes)
// Chaque page reçoit son propre titre, sa description, son URL canonique, ses liens hreflang
// et le contenu déjà écrit en HTML dans sa langue, lisible par Google sans JavaScript.
// Le site reste une seule application : le script de index.html prend le relais.
// Le fichier sitemap.xml est régénéré à chaque exécution.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://rtlmaroc.com";
const LASTMOD = "2026-10-27";
const LANGS = ["fr", "es", "pt", "it", "en", "ar"];
const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

const LINES = [
  { k: "it", slug: "groupage-italie-maroc", country: "Italie" },
  { k: "es", slug: "groupage-espagne-maroc", country: "Espagne" },
  { k: "pt", slug: "groupage-portugal-maroc", country: "Portugal" }
];

// Titres et descriptions de chaque page, par langue (le français fait foi).
const SEO = {
  fr: {
    home: { title: "Transport routier international Maroc – Europe | RTL Maroc",
      desc: "RTL Maroc : transport routier international entre le Maroc et l’Europe. Groupage et camions complets Italie (72 h), Espagne et Portugal (48 h), MEAD Tanger et Casablanca." },
    it: { title: "Transport routier Italie – Maroc : groupage en 72 h | RTL Maroc",
      desc: "Transport routier international Italie – Maroc avec RTL Maroc : groupage consolidé à Tribiano (Milan), 2 départs par semaine, 72 h de transit vers Casablanca et Tanger. Aussi du Maroc vers l’Italie." },
    es: { title: "Transport routier Espagne – Maroc : groupage en 48 h | RTL Maroc",
      desc: "Transport routier international Espagne – Maroc avec RTL Maroc : groupage, enlèvement dans toute l’Espagne via Madrid, Barcelone et Alicante, 48 h de transit, livraison MEAD Tanger et Casablanca." },
    pt: { title: "Transport routier Portugal – Maroc : groupage en 48 h | RTL Maroc",
      desc: "Transport routier international Portugal – Maroc avec RTL Maroc : groupage Porto et Lisbonne, départs le mercredi et le vendredi, 48 h de transit vers Casablanca et Tanger. Aussi du Maroc vers le Portugal." }
  },
  es: {
    home: { title: "Transporte por carretera Marruecos – Europa | RTL Maroc",
      desc: "RTL Maroc: transporte internacional por carretera entre Marruecos y Europa. Grupaje y camiones completos desde Italia (72 h), España y Portugal (48 h) a Casablanca y Tánger." },
    it: { title: "Transporte Italia – Marruecos: grupaje en 72 h | RTL Maroc",
      desc: "Transporte internacional por carretera Italia – Marruecos con RTL Maroc: grupaje consolidado en Tribiano (Milán), 2 salidas por semana, 72 h de tránsito a Casablanca y Tánger. También de Marruecos a Italia." },
    es: { title: "Transporte España – Marruecos: grupaje en 48 h | RTL Maroc",
      desc: "Transporte internacional por carretera España – Marruecos con RTL Maroc: grupaje, recogida en toda España vía Madrid, Barcelona y Alicante, 48 h de tránsito, entrega en el MEAD de Tánger y Casablanca." },
    pt: { title: "Transporte Portugal – Marruecos: grupaje en 48 h | RTL Maroc",
      desc: "Transporte internacional por carretera Portugal – Marruecos con RTL Maroc: grupaje desde Oporto y Lisboa, salidas miércoles y viernes, 48 h de tránsito a Casablanca y Tánger. También de Marruecos a Portugal." }
  },
  pt: {
    home: { title: "Transporte rodoviário Marrocos – Europa | RTL Maroc",
      desc: "RTL Maroc: transporte rodoviário internacional entre Marrocos e a Europa. Grupagem e camiões completos de Itália (72 h), Espanha e Portugal (48 h) para Casablanca e Tânger." },
    it: { title: "Transporte Itália – Marrocos: grupagem em 72 h | RTL Maroc",
      desc: "Transporte rodoviário internacional Itália – Marrocos com a RTL Maroc: grupagem consolidada em Tribiano (Milão), 2 partidas por semana, 72 h de trânsito para Casablanca e Tânger. Também de Marrocos para Itália." },
    es: { title: "Transporte Espanha – Marrocos: grupagem em 48 h | RTL Maroc",
      desc: "Transporte rodoviário internacional Espanha – Marrocos com a RTL Maroc: grupagem, recolha em toda a Espanha via Madrid, Barcelona e Alicante, 48 h de trânsito, entrega no MEAD de Tânger e Casablanca." },
    pt: { title: "Transporte Portugal – Marrocos: grupagem em 48 h | RTL Maroc",
      desc: "Transporte rodoviário internacional Portugal – Marrocos com a RTL Maroc: grupagem do Porto e Lisboa, partidas à quarta e à sexta, 48 h de trânsito para Casablanca e Tânger. Também de Marrocos para Portugal." }
  },
  it: {
    home: { title: "Trasporto stradale Marocco – Europa | RTL Maroc",
      desc: "RTL Maroc: trasporto stradale internazionale tra Marocco ed Europa. Groupage e carichi completi da Italia (72 h), Spagna e Portogallo (48 h) verso Casablanca e Tangeri." },
    it: { title: "Trasporto Italia – Marocco: groupage in 72 h | RTL Maroc",
      desc: "Trasporto stradale internazionale Italia – Marocco con RTL Maroc: groupage consolidato a Tribiano (Milano), 2 partenze a settimana, 72 h di transito verso Casablanca e Tangeri. Anche dal Marocco all’Italia." },
    es: { title: "Trasporto Spagna – Marocco: groupage in 48 h | RTL Maroc",
      desc: "Trasporto stradale internazionale Spagna – Marocco con RTL Maroc: groupage, ritiro in tutta la Spagna via Madrid, Barcellona e Alicante, 48 h di transito, consegna al MEAD di Tangeri e Casablanca." },
    pt: { title: "Trasporto Portogallo – Marocco: groupage in 48 h | RTL Maroc",
      desc: "Trasporto stradale internazionale Portogallo – Marocco con RTL Maroc: groupage da Porto e Lisbona, partenze mercoledì e venerdì, 48 h di transito verso Casablanca e Tangeri. Anche dal Marocco al Portogallo." }
  },
  en: {
    home: { title: "International road transport Morocco – Europe | RTL Maroc",
      desc: "RTL Maroc: international road freight between Morocco and Europe. Groupage and full trucks from Italy (72 h), Spain and Portugal (48 h) to Casablanca and Tangier." },
    it: { title: "Road transport Italy – Morocco: groupage in 72 h | RTL Maroc",
      desc: "International road transport Italy – Morocco with RTL Maroc: groupage consolidated in Tribiano (Milan), 2 departures a week, 72 h transit to Casablanca and Tangier. Also Morocco to Italy." },
    es: { title: "Road transport Spain – Morocco: groupage in 48 h | RTL Maroc",
      desc: "International road transport Spain – Morocco with RTL Maroc: groupage, pickup across Spain via Madrid, Barcelona and Alicante, 48 h transit, delivery to the Tangier and Casablanca MEAD." },
    pt: { title: "Road transport Portugal – Morocco: groupage in 48 h | RTL Maroc",
      desc: "International road transport Portugal – Morocco with RTL Maroc: groupage from Porto and Lisbon, departures on Wednesday and Friday, 48 h transit to Casablanca and Tangier. Also Morocco to Portugal." }
  },
  ar: {
    home: { title: "النقل الطرقي الدولي المغرب – أوروبا | RTL Maroc",
      desc: "RTL Maroc: نقل طرقي دولي بين المغرب وأوروبا. شحن مجمّع وشاحنات كاملة من إيطاليا (72 ساعة) وإسبانيا والبرتغال (48 ساعة) نحو الدار البيضاء وطنجة." },
    it: { title: "النقل من إيطاليا إلى المغرب: شحن مجمّع في 72 ساعة | RTL Maroc",
      desc: "نقل طرقي دولي بين إيطاليا والمغرب مع RTL Maroc: تجميع البضائع في تريبيانو (ميلانو)، رحلتان أسبوعيًا، 72 ساعة نحو الدار البيضاء وطنجة. وكذلك من المغرب إلى إيطاليا." },
    es: { title: "النقل من إسبانيا إلى المغرب: شحن مجمّع في 48 ساعة | RTL Maroc",
      desc: "نقل طرقي دولي بين إسبانيا والمغرب مع RTL Maroc: شحن مجمّع، استلام من كل إسبانيا عبر مدريد وبرشلونة وأليكانتي، 48 ساعة، تسليم في MEAD طنجة والدار البيضاء." },
    pt: { title: "النقل من البرتغال إلى المغرب: شحن مجمّع في 48 ساعة | RTL Maroc",
      desc: "نقل طرقي دولي بين البرتغال والمغرب مع RTL Maroc: شحن مجمّع من بورتو ولشبونة، انطلاق الأربعاء والجمعة، 48 ساعة نحو الدار البيضاء وطنجة. وكذلك من المغرب إلى البرتغال." }
  }
};

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

const prefix = l => (l === "fr" ? "" : "/" + l);
// Adresse d'une page : accueil (slug = "") ou ligne, dans une langue donnée
const urlOf = (l, slug) => `${SITE}${prefix(l)}/${slug ? slug + "/" : ""}`;
const alternates = slug =>
  LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${urlOf(l, slug)}">`).join("\n")
  + `\n<link rel="alternate" hreflang="x-default" href="${urlOf("fr", slug)}">`;

function build({ lang, slug, key, seo, name }) {
  const pathname = prefix(lang) + "/" + (slug ? slug + "/" : "");
  location.pathname = pathname;
  vm.runInContext(`lang = ${JSON.stringify(lang)}; render();`, ctx);
  const url = urlOf(lang, slug);
  let h = src;
  h = swap(h, /<html lang="fr">/, `<html lang="${lang}"${lang === "ar" ? ' dir="rtl"' : ""}>`);
  h = swap(h, /<meta charset="utf-8">/, '<meta charset="utf-8">\n<base href="/">');
  h = swap(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(seo.desc)}">`);
  h = swap(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(name || seo.title)}">`);
  h = swap(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(seo.desc)}">`);
  h = swap(h, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  h = swap(h, /<link rel="canonical" href="[^"]*">\n(<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n)+/, `<link rel="canonical" href="${url}">\n${alternates(slug)}\n`);
  let title = `<title>${esc(seo.title)}</title>`;
  if (key) {
    const L = vm.runInContext(`T.${lang}.lines.${key}`, ctx);
    const country = LINES.find(x => x.k === key).country;
    const ld = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Service", "name": L.name, "serviceType": "Transport routier international – groupage", "description": seo.desc, "url": url,
          "provider": { "@id": SITE + "/#rtl" }, "areaServed": [country, "Maroc"], "inLanguage": lang },
        { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "RTL Maroc", "item": urlOf(lang, "") },
          { "@type": "ListItem", "position": 2, "name": L.name, "item": url }] }
      ]
    };
    title += `\n<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
  }
  h = swap(h, /<title>[^<]*<\/title>/, title);
  h = swap(h, /<nav class="nav" id="nav"><\/nav>/, `<nav class="nav" id="nav">${els["#nav"].innerHTML}</nav>`);
  h = swap(h, /<main id="app">[\s\S]*?<\/main>/, `<main id="app">${els["#app"].innerHTML}</main>`);
  h = swap(h, /<footer class="foot" id="foot"><\/footer>/, `<footer class="foot" id="foot">${els["#foot"].innerHTML}</footer>`);
  const dir = path.join(ROOT, prefix(lang), slug || "");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), h);
  console.log("OK  " + pathname);
}

for (const lang of LANGS) {
  // Accueil : le français est index.html lui-même ; les autres langues ont leur dossier
  if (lang !== "fr") build({ lang, slug: "", key: null, seo: SEO[lang].home });
  for (const P of LINES) {
    const L = vm.runInContext(`T.${lang}.lines.${P.k}`, ctx);
    build({ lang, slug: P.slug, key: P.k, seo: SEO[lang][P.k], name: `${L.name} | RTL Maroc` });
  }
}

// --- sitemap.xml : toutes les pages dans toutes les langues, avec leurs alternatives ---
const entries = [["", 1.0], ...LINES.map(P => [P.slug, 0.9])];
const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
for (const [slug, prio] of entries) {
  for (const l of LANGS) {
    xml.push(`  <url><loc>${urlOf(l, slug)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>monthly</changefreq><priority>${l === "fr" ? prio : (prio - 0.1).toFixed(1)}</priority>`);
    for (const a of LANGS) xml.push(`    <xhtml:link rel="alternate" hreflang="${a}" href="${urlOf(a, slug)}"/>`);
    xml.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf("fr", slug)}"/>`);
    xml.push("  </url>");
  }
}
xml.push("</urlset>", "");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml.join("\n"));
console.log("OK  sitemap.xml (" + entries.length * LANGS.length + " adresses)");
