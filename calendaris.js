// =====================================================
//  CALENDARIS - tot el que s'ha de canviar és aquí dalt
// =====================================================
const CALENDARI = {
    obert: true,                 // false = amaga els botons de compra
    preu: 15,                    // € per calendari
    enviament: 3,                // € per l'enviament a casa  (PENDENT DE CONFIRMAR)
    zona: 'Barcelona',          // on fa entregues (en mà)
    recollida: '[lloc per confirmar]',       // on es recull
    mida: 'DIN A4',
    quan: 'Les comandes es preparen al desembre. Si el reculls, la Lola t\'avisarà quan estigui a punt; si te l\'enviem, l\'entreguem durant els dies següents.',
    contacte: { text: '@lalola', url: 'https://instagram.com/' },   // PENDENT: Instagram o correu de la Lola

    // Enllaços de pagament de Stripe (Payment Links).
    // Mentre hi posi PENDENT, els botons diran que encara no està obert.
    stripe: {
        recollida: 'PENDENT',    // p. ex. https://buy.stripe.com/xxxxxxxx
        enviament: 'PENDENT'
    },

    // Fotos de la galeria (carpeta images/calendaris/)
    fotos: [
        { img: '05-maig.jpg',     alt: 'Maig - Paul Klee' },
        { img: '06-juny.jpg',     alt: 'Juny - Miró' },
        { img: '07-juliol.jpg',   alt: 'Juliol - Keith Haring' },
        { img: '08-agost.jpg',    alt: 'Agost - Andy Warhol' },
        { img: '09-setembre.jpg', alt: 'Setembre - Dalí' },
        { img: '10-octubre.jpg',  alt: 'Octubre - Mondrian' },
        { img: '11-novembre.jpg', alt: 'Novembre - Van Gogh' },
        { img: '12-desembre.jpg', alt: 'Desembre - Matisse' }
    ]
};

// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    const fill = (sel, val) => document.querySelectorAll(sel).forEach(el => el.textContent = val);
    fill('.js-preu', CALENDARI.preu);
    fill('.js-enviament', CALENDARI.enviament);
    fill('.js-zona', CALENDARI.zona);
    fill('.js-recollida', CALENDARI.recollida);
    fill('.js-mida', CALENDARI.mida);
    fill('.js-quan', CALENDARI.quan);
    document.querySelectorAll('.js-contacte').forEach(a => {
        a.textContent = CALENDARI.contacte.text;
        a.href = CALENDARI.contacte.url;
        a.target = '_blank';
        a.rel = 'noopener';
    });

    // Botons de pagament -> Stripe
    let algunTancat = !CALENDARI.obert;
    document.querySelectorAll('.js-pay').forEach(btn => {
        const link = CALENDARI.stripe[btn.dataset.link] || '';
        if (CALENDARI.obert && link.startsWith('https://')) {
            btn.href = link;
        } else {
            algunTancat = true;
            btn.classList.add('cal-btn-disabled');
            btn.textContent = 'AVIAT!';
            btn.addEventListener('click', e => e.preventDefault());
        }
    });
    if (algunTancat) document.getElementById('calClosed').hidden = false;

    // Galeria
    const gallery = document.getElementById('calGallery');
    const modal = document.getElementById('calModal');
    const modalImg = document.getElementById('calModalImg');
    CALENDARI.fotos.forEach(f => {
        const btn = document.createElement('button');
        btn.className = 'cal-gallery-item';
        btn.setAttribute('aria-label', f.alt);
        const img = document.createElement('img');
        img.src = 'images/calendaris/' + f.img;
        img.alt = f.alt;
        img.loading = 'lazy';
        btn.appendChild(img);
        btn.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = f.alt;
            modal.hidden = false;
        });
        gallery.appendChild(btn);
    });
    const close = () => { modal.hidden = true; };
    document.getElementById('calModalClose').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
