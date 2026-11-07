/* ============================================================
   RECENSIONI scorrevoli (marquee) — Landing Angelica Frascarolo
   Le card vengono generate in JS, duplicate per il loop continuo
   e rese con renderIcons() di icons.js.
   ============================================================ */
(function () {
  'use strict';

  const REVIEWS = [
    { name: 'Marco R.', role: 'Percorso Guidato', stars: 5, text: 'Prima mi allenavo a caso senza vedere risultati. Con il programma di Angelica ho finalmente una struttura chiara e dopo 6 settimane ho notato un miglioramento reale.' },
    { name: 'Giulia B.', role: 'Percorso Completo', stars: 5, text: 'Gli allenamenti in videochiamata hanno cambiato tutto: corregge la tecnica in tempo reale e adatta gli esercizi quando sento difficoltà. Mi sono sentita seguita sempre.' },
    { name: 'Davide M.', role: 'Percorso Autonomo', stars: 5, text: 'Ottimo anche in autonomia: scheda personalizzata, check periodici e supporto su WhatsApp quando ne ho bisogno. Professionale e disponibile.' },
    { name: 'Federica L.', role: 'Post parto', stars: 5, text: 'Dopo la gravidanza ero spaventata dall\'idea di ripartire. Angelica ha costruito un percorso adatto alla mia fase, in accordo con la mia fisioterapista. Percorso serio e umano.' },
    { name: 'Alessandro P.', role: 'Recupero post-infortunio', stars: 4, text: 'Dalla riabilitazione sono tornato ad allenarmi con sicurezza. Programmi progressivi, mai forzati, sempre rispettosi delle indicazioni del medico.' },
    { name: 'Chiara T.', role: 'Attività motoria adattata', stars: 5, text: 'Avevo provato schede generiche fallite tutte. Questa volta il programma teneva davvero conto delle mie possibilità. Costanza finalmente raggiunta!' },
    { name: 'Luca F.', role: 'Terza età', stars: 5, text: 'A 67 anni ho ritrovato mobilità ed equilibrio. Esercizi mirati, spiegati con pazienza e monitorati nel tempo. Consigliato a chi vuole restare attivo.' },
    { name: 'Sara D.', role: 'Percorso Guidato', stars: 5, text: 'Il confronto costante e gli aggiustamenti settimanali fanno la differenza. Non mi sono mai sentita un numero: il percorso è cambiato insieme a me.' }
  ];

  function starRow(n) {
    let html = '';
    for (let i = 0; i < 5; i++) {
      html += '<span data-icon="' + (i < n ? 'star-filled' : 'star') + '" style="opacity:' + (i < n ? 1 : 0.3) + '"></span>';
    }
    return html;
  }

  function reviewCard(r) {
    const initials = r.name.charAt(0);
    return (
      '<article class="review-card">' +
        '<div class="review-head">' +
          '<div class="review-avatar">' + initials + '</div>' +
          '<div>' +
            '<div class="review-name">' + r.name + '</div>' +
            '<div class="review-role">' + r.role + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="review-stars">' + starRow(r.stars) + '</div>' +
        '<p class="review-text">' + r.text + '</p>' +
      '</article>'
    );
  }

  function buildMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    const set = REVIEWS.map(reviewCard).join('');
    // doppio set identico -> translateX(-50%) crea il loop infinito
    track.innerHTML = set + set;

    if (window.renderIcons) window.renderIcons(track);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMarquee);
  } else {
    buildMarquee();
  }
})();
