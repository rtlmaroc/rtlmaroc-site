/* Conformité légale RTL Maroc : textes juridiques (6 langues) + bandeau de consentement.
   Le français fait foi. Aucun secret ici : le dépôt est public. */
(function () {
  var CO = "Round Trip Logistics SARL";
  var ID = "RC Casablanca 404781 · ICE 002075433000015";
  var ADDR = "Espace Idriss, 353 Boulevard Mohammed V, Étage 4, Appt 6, Casablanca, Maroc";
  var MAIL = "sales.manager@rtlmaroc.com";
  var TEL = "+212 661 07 83 58";
  var DIR = "Abderrahim Haddaj";
  var HOST = "Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107, USA";

  var L = {};

  L.fr = {
    foot: ["Mentions légales", "Confidentialité et cookies", "Gérer les cookies"],
    mT: "Mentions légales", pT: "Politique de confidentialité et cookies", upd: "Dernière mise à jour : novembre 2026",
    m: [
      ["Éditeur du site", CO + " — capital 500 000 MAD — " + ID + "."],
      ["Siège et contact", ADDR + ". Téléphone / WhatsApp : " + TEL + ". E-mail : " + MAIL + "."],
      ["Directeur de la publication", DIR + "."],
      ["Hébergeur", HOST + "."],
      ["Propriété intellectuelle", "Les textes, images, logos et la carte des flux de ce site sont la propriété de " + CO + ". Toute reproduction sans autorisation écrite est interdite."]
    ],
    p: [
      ["Responsable du traitement", CO + " (" + ID + "), " + ADDR + ". Contact : " + MAIL + "."],
      ["Données collectées", "Via le formulaire de devis : société, nom, téléphone, e-mail, trajet, volume ou poids, nature de la marchandise et message. Via la mesure d’audience : pages vues et informations techniques de navigation, uniquement si vous l’acceptez."],
      ["Finalités et bases légales", "Répondre à votre demande de devis et gérer la relation commerciale (mesures précontractuelles et intérêt légitime). Mesurer l’audience du site (votre consentement)."],
      ["Destinataires et transferts", "Vos données sont lues par notre équipe commerciale et exploitation. Le formulaire et l’hébergement sont assurés par Netlify (États-Unis) et la mesure d’audience par Google Analytics, sous-traitants techniques."],
      ["Durée de conservation", "Le temps nécessaire au traitement de votre demande, puis au maximum 3 ans après notre dernier échange commercial. Les données de mesure d’audience sont conservées selon les paramètres de Google Analytics."],
      ["Vos droits", "Vous pouvez demander l’accès, la rectification, l’opposition ou la suppression de vos données en écrivant à " + MAIL + ". Vous pouvez aussi introduire une réclamation auprès de la CNDP (Maroc, loi 09-08) ou, si vous résidez dans l’Union européenne, de votre autorité de protection des données (CNIL en France)."],
      ["Cookies et mesure d’audience", "Ce site n’utilise aucun cookie publicitaire. Google Analytics 4 ne mesure votre visite qu’après votre accord, que vous pouvez retirer à tout moment via « Gérer les cookies ». Votre choix de langue est mémorisé dans votre navigateur (stockage local), sans suivi."]
    ],
    bn: ["Nous utilisons Google Analytics pour mesurer l’audience du site, uniquement avec votre accord. Aucun cookie publicitaire.", "Accepter", "Refuser", "En savoir plus"]
  };

  L.es = {
    foot: ["Aviso legal", "Privacidad y cookies", "Gestionar cookies"],
    mT: "Aviso legal", pT: "Política de privacidad y cookies", upd: "Última actualización: noviembre de 2026",
    m: [
      ["Editor del sitio", CO + " — capital 500 000 MAD — " + ID + "."],
      ["Sede y contacto", ADDR + ". Teléfono / WhatsApp: " + TEL + ". Correo: " + MAIL + "."],
      ["Director de la publicación", DIR + "."],
      ["Alojamiento web", HOST + "."],
      ["Propiedad intelectual", "Los textos, imágenes, logotipos y el mapa de flujos de este sitio son propiedad de " + CO + ". Queda prohibida su reproducción sin autorización escrita."]
    ],
    p: [
      ["Responsable del tratamiento", CO + " (" + ID + "), " + ADDR + ". Contacto: " + MAIL + "."],
      ["Datos recogidos", "Mediante el formulario de presupuesto: empresa, nombre, teléfono, correo, ruta, volumen o peso, tipo de mercancía y mensaje. Mediante la medición de audiencia: páginas vistas e información técnica de navegación, solo si usted la acepta."],
      ["Finalidades y bases legales", "Responder a su solicitud de presupuesto y gestionar la relación comercial (medidas precontractuales e interés legítimo). Medir la audiencia del sitio (su consentimiento)."],
      ["Destinatarios y transferencias", "Sus datos son consultados por nuestro equipo comercial y de operaciones. El formulario y el alojamiento los presta Netlify (Estados Unidos) y la medición de audiencia Google Analytics, como encargados técnicos."],
      ["Plazo de conservación", "El tiempo necesario para tramitar su solicitud y, como máximo, 3 años tras nuestro último contacto comercial. Los datos de audiencia se conservan según los ajustes de Google Analytics."],
      ["Sus derechos", "Puede solicitar el acceso, la rectificación, la oposición o la supresión de sus datos escribiendo a " + MAIL + ". También puede presentar una reclamación ante la CNDP (Marruecos, ley 09-08) o, si reside en la Unión Europea, ante su autoridad de protección de datos (AEPD en España)."],
      ["Cookies y medición de audiencia", "Este sitio no usa cookies publicitarias. Google Analytics 4 solo mide su visita tras su consentimiento, que puede retirar en cualquier momento con «Gestionar cookies». Su idioma se guarda en su navegador (almacenamiento local), sin seguimiento."]
    ],
    bn: ["Usamos Google Analytics para medir la audiencia del sitio, solo con su consentimiento. Sin cookies publicitarias.", "Aceptar", "Rechazar", "Más información"]
  };

  L.pt = {
    foot: ["Avisos legais", "Privacidade e cookies", "Gerir cookies"],
    mT: "Avisos legais", pT: "Política de privacidade e cookies", upd: "Última atualização: novembro de 2026",
    m: [
      ["Editor do site", CO + " — capital 500 000 MAD — " + ID + "."],
      ["Sede e contacto", ADDR + ". Telefone / WhatsApp: " + TEL + ". E-mail: " + MAIL + "."],
      ["Diretor da publicação", DIR + "."],
      ["Alojamento", HOST + "."],
      ["Propriedade intelectual", "Os textos, imagens, logótipos e o mapa de fluxos deste site são propriedade de " + CO + ". É proibida a reprodução sem autorização escrita."]
    ],
    p: [
      ["Responsável pelo tratamento", CO + " (" + ID + "), " + ADDR + ". Contacto: " + MAIL + "."],
      ["Dados recolhidos", "Através do formulário de orçamento: empresa, nome, telefone, e-mail, rota, volume ou peso, tipo de mercadoria e mensagem. Através da medição de audiência: páginas vistas e informações técnicas de navegação, apenas se a aceitar."],
      ["Finalidades e bases legais", "Responder ao seu pedido de orçamento e gerir a relação comercial (diligências pré-contratuais e interesse legítimo). Medir a audiência do site (o seu consentimento)."],
      ["Destinatários e transferências", "Os seus dados são consultados pela nossa equipa comercial e de operações. O formulário e o alojamento são assegurados pela Netlify (Estados Unidos) e a medição de audiência pelo Google Analytics, como subcontratantes técnicos."],
      ["Prazo de conservação", "O tempo necessário para tratar o seu pedido e, no máximo, 3 anos após o nosso último contacto comercial. Os dados de audiência são conservados segundo as definições do Google Analytics."],
      ["Os seus direitos", "Pode pedir o acesso, a retificação, a oposição ou o apagamento dos seus dados escrevendo para " + MAIL + ". Pode também apresentar reclamação à CNDP (Marrocos, lei 09-08) ou, se residir na União Europeia, à sua autoridade de proteção de dados (CNPD em Portugal)."],
      ["Cookies e medição de audiência", "Este site não usa cookies publicitários. O Google Analytics 4 só mede a sua visita após o seu consentimento, que pode retirar a qualquer momento em «Gerir cookies». A sua língua é guardada no navegador (armazenamento local), sem rastreamento."]
    ],
    bn: ["Usamos o Google Analytics para medir a audiência do site, apenas com o seu consentimento. Sem cookies publicitários.", "Aceitar", "Recusar", "Saber mais"]
  };

  L.it = {
    foot: ["Note legali", "Privacy e cookie", "Gestisci i cookie"],
    mT: "Note legali", pT: "Informativa sulla privacy e sui cookie", upd: "Ultimo aggiornamento: novembre 2026",
    m: [
      ["Editore del sito", CO + " — capitale 500 000 MAD — " + ID + "."],
      ["Sede e contatti", ADDR + ". Telefono / WhatsApp: " + TEL + ". E-mail: " + MAIL + "."],
      ["Direttore responsabile", DIR + "."],
      ["Hosting", HOST + "."],
      ["Proprietà intellettuale", "I testi, le immagini, i loghi e la mappa dei flussi di questo sito sono di proprietà di " + CO + ". È vietata la riproduzione senza autorizzazione scritta."]
    ],
    p: [
      ["Titolare del trattamento", CO + " (" + ID + "), " + ADDR + ". Contatto: " + MAIL + "."],
      ["Dati raccolti", "Tramite il modulo di preventivo: azienda, nome, telefono, e-mail, tratta, volume o peso, tipo di merce e messaggio. Tramite la misurazione del traffico: pagine viste e informazioni tecniche di navigazione, solo se lo accetta."],
      ["Finalità e basi giuridiche", "Rispondere alla sua richiesta di preventivo e gestire il rapporto commerciale (misure precontrattuali e legittimo interesse). Misurare il traffico del sito (il suo consenso)."],
      ["Destinatari e trasferimenti", "I suoi dati sono consultati dal nostro team commerciale e operativo. Il modulo e l’hosting sono forniti da Netlify (Stati Uniti) e la misurazione del traffico da Google Analytics, in qualità di responsabili tecnici."],
      ["Periodo di conservazione", "Per il tempo necessario a gestire la sua richiesta e, al massimo, 3 anni dopo l’ultimo contatto commerciale. I dati di traffico sono conservati secondo le impostazioni di Google Analytics."],
      ["I suoi diritti", "Può chiedere l’accesso, la rettifica, l’opposizione o la cancellazione dei suoi dati scrivendo a " + MAIL + ". Può inoltre presentare reclamo alla CNDP (Marocco, legge 09-08) o, se risiede nell’Unione europea, alla sua autorità di protezione dei dati (Garante per la protezione dei dati personali in Italia)."],
      ["Cookie e misurazione del traffico", "Questo sito non usa cookie pubblicitari. Google Analytics 4 misura la sua visita solo dopo il suo consenso, che può revocare in qualsiasi momento da «Gestisci i cookie». La lingua scelta è memorizzata nel browser (archiviazione locale), senza tracciamento."]
    ],
    bn: ["Usiamo Google Analytics per misurare il traffico del sito, solo con il suo consenso. Nessun cookie pubblicitario.", "Accetta", "Rifiuta", "Scopri di più"]
  };

  L.en = {
    foot: ["Legal notice", "Privacy and cookies", "Manage cookies"],
    mT: "Legal notice", pT: "Privacy and cookie policy", upd: "Last updated: November 2026",
    m: [
      ["Site publisher", CO + " — share capital MAD 500,000 — " + ID + "."],
      ["Registered office and contact", ADDR + ". Phone / WhatsApp: " + TEL + ". Email: " + MAIL + "."],
      ["Publication director", DIR + "."],
      ["Hosting provider", HOST + "."],
      ["Intellectual property", "The texts, images, logos and flow map of this site are the property of " + CO + ". Reproduction without written permission is prohibited."]
    ],
    p: [
      ["Data controller", CO + " (" + ID + "), " + ADDR + ". Contact: " + MAIL + "."],
      ["Data collected", "Through the quote form: company, name, phone, email, route, volume or weight, type of goods and message. Through audience measurement: pages viewed and technical browsing information, only if you accept it."],
      ["Purposes and legal bases", "Answering your quote request and managing the commercial relationship (pre-contractual steps and legitimate interest). Measuring site audience (your consent)."],
      ["Recipients and transfers", "Your data is read by our sales and operations team. The form and hosting are provided by Netlify (United States) and audience measurement by Google Analytics, as technical processors."],
      ["Retention", "For as long as needed to handle your request, then at most 3 years after our last commercial contact. Audience data is kept according to Google Analytics settings."],
      ["Your rights", "You can request access, rectification, objection or deletion of your data by writing to " + MAIL + ". You may also lodge a complaint with the CNDP (Morocco, law 09-08) or, if you live in the European Union, with your data protection authority."],
      ["Cookies and audience measurement", "This site uses no advertising cookies. Google Analytics 4 measures your visit only after you consent, which you can withdraw at any time via “Manage cookies”. Your language choice is stored in your browser (local storage), without tracking."]
    ],
    bn: ["We use Google Analytics to measure site audience, only with your consent. No advertising cookies.", "Accept", "Decline", "Learn more"]
  };

  L.ar = {
    foot: ["إشعار قانوني", "الخصوصية وملفات تعريف الارتباط", "إدارة ملفات تعريف الارتباط"],
    mT: "إشعار قانوني", pT: "سياسة الخصوصية وملفات تعريف الارتباط", upd: "آخر تحديث: نونبر 2026",
    m: [
      ["ناشر الموقع", "Round Trip Logistics SARL — رأس المال 500 000 درهم — السجل التجاري بالدار البيضاء 404781 — ICE 002075433000015."],
      ["المقر والاتصال", "المقر: " + ADDR + ". الهاتف / واتساب: " + TEL + ". البريد الإلكتروني: " + MAIL + "."],
      ["مدير النشر", DIR + "."],
      ["الاستضافة", HOST + "."],
      ["الملكية الفكرية", "النصوص والصور والشعارات وخريطة التدفقات في هذا الموقع ملك لشركة " + CO + ". يمنع النسخ دون إذن كتابي."]
    ],
    p: [
      ["المسؤول عن المعالجة", CO + " (" + ID + ")، " + ADDR + ". للتواصل: " + MAIL + "."],
      ["البيانات المجمّعة", "عبر نموذج طلب عرض السعر: الشركة، الاسم، الهاتف، البريد الإلكتروني، المسار، الحجم أو الوزن، نوع البضاعة والرسالة. وعبر قياس الزيارات: الصفحات المطلعة ومعلومات تقنية عن التصفح، فقط إذا وافقتم عليه."],
      ["الأغراض والأسس القانونية", "الرد على طلب عرض السعر وتدبير العلاقة التجارية (إجراءات ما قبل التعاقد والمصلحة المشروعة). وقياس زيارات الموقع (بموافقتكم)."],
      ["المستلمون والتحويل", "يطلع على بياناتكم فريقنا التجاري والتشغيلي. تتولى شركة Netlify (الولايات المتحدة) النموذج والاستضافة، وGoogle Analytics قياس الزيارات، بصفتهما مناولين تقنيين."],
      ["مدة الاحتفاظ", "للمدة اللازمة لمعالجة طلبكم، ثم 3 سنوات كحد أقصى بعد آخر تواصل تجاري. تُحفظ بيانات قياس الزيارات وفق إعدادات Google Analytics."],
      ["حقوقكم", "يمكنكم طلب الولوج إلى بياناتكم أو تصحيحها أو التعرض عليها أو حذفها بمراسلتنا على " + MAIL + ". ويمكنكم تقديم شكاية إلى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP، القانون 09-08) أو، إذا كنتم مقيمين في الاتحاد الأوروبي، إلى سلطة حماية البيانات في بلدكم."],
      ["ملفات تعريف الارتباط وقياس الزيارات", "لا يستعمل هذا الموقع أي ملفات إعلانية. لا يقيس Google Analytics 4 زيارتكم إلا بعد موافقتكم، ويمكنكم سحبها في أي وقت عبر «إدارة ملفات تعريف الارتباط». ويُحفظ اختيار اللغة في متصفحكم (التخزين المحلي) دون أي تتبع."]
    ],
    bn: ["نستعمل Google Analytics لقياس زيارات الموقع، وذلك بموافقتكم فقط. لا ملفات إعلانية.", "قبول", "رفض", "معرفة المزيد"]
  };

  window.LEGAL = L;

  /* ===== Bandeau de consentement (Google Analytics) ===== */
  var KEY = "rtl-consent";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    if (typeof window.gtag !== "function") return;
    var s = v === "granted" ? "granted" : "denied";
    window.gtag("consent", "update", {analytics_storage: s, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"});
  }
  function curLang() {
    var l = (document.documentElement.lang || "fr").slice(0, 2);
    return L[l] ? l : "fr";
  }
  function close() { var b = document.getElementById("cookie-bar"); if (b) b.remove(); }
  function show() {
    close();
    var t = L[curLang()], b = document.createElement("div");
    b.id = "cookie-bar"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", t.foot[2]);
    b.innerHTML = '<p></p><div><button type="button" data-v="granted"></button><button type="button" data-v="denied"></button><a href="#confidentialite"></a></div>';
    b.querySelector("p").textContent = t.bn[0];
    var bt = b.querySelectorAll("button"); bt[0].textContent = t.bn[1]; bt[1].textContent = t.bn[2];
    b.querySelector("a").textContent = t.bn[3];
    b.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-v");
      if (v) { set(v); apply(v); close(); } else if (e.target.tagName === "A") close();
    });
    document.body.appendChild(b);
  }
  var css = document.createElement("style");
  css.textContent = "#cookie-bar{position:fixed;inset:auto 12px 12px 12px;z-index:9999;max-width:760px;margin-inline:auto;background:#12161c;color:#e8ebef;border:1px solid #2a323c;border-radius:10px;padding:16px 18px;font:400 14px/1.5 'IBM Plex Sans','IBM Plex Sans Arabic',sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.45)}#cookie-bar p{margin:0 0 12px}#cookie-bar div{display:flex;flex-wrap:wrap;gap:10px;align-items:center}#cookie-bar button{font:500 14px 'IBM Plex Sans','IBM Plex Sans Arabic',sans-serif;padding:9px 18px;border-radius:6px;border:1px solid #E03A2F;background:transparent;color:#fff;cursor:pointer}#cookie-bar button[data-v=granted]{background:#E03A2F}#cookie-bar a{color:#cfd5dc;text-decoration:underline;font-size:13px}";
  document.head.appendChild(css);

  var saved = get();
  if (saved) apply(saved);
  function init() {
    if (!saved) show();
    document.addEventListener("click", function (e) {
      var el = e.target.closest && e.target.closest("[data-cookies]");
      if (el) { e.preventDefault(); show(); }
    });
    new MutationObserver(function () { if (document.getElementById("cookie-bar")) show(); })
      .observe(document.documentElement, {attributes: true, attributeFilter: ["lang"]});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
