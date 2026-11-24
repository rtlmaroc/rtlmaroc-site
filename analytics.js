// Google Analytics 4 — RTL Maroc (identifiant de mesure G-TVC0Q6971G)
// Consentement refusé par défaut pour tous les visiteurs ; le bandeau de /conformite.js le met à jour après accord.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent", "default", {ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied"});
gtag("js", new Date());
gtag("config", "G-TVC0Q6971G");

// Le script Google (≈180 Ko) est chargé après l'affichage de la page, pour ne pas la ralentir.
// Les commandes ci-dessus restent en file d'attente et sont traitées dès son arrivée.
(function () {
  var done = false;
  function load() {
    if (done) return; done = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-TVC0Q6971G";
    document.head.appendChild(s);
  }
  function later() { setTimeout(load, 3000); }
  if (document.readyState === "complete") later(); else window.addEventListener("load", later);
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (e) { window.addEventListener(e, load, {once: true, passive: true}); });
})();
