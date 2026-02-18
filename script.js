// --- Menú lateral funcional universal ---
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('menu-close');
    // Abrir menú
    if (menuIcon && sideMenu) {
        menuIcon.addEventListener('click', function() {
            var menuWidth = window.innerWidth <= 480 ? '100%' : '250px';
            sideMenu.style.left = '0';
            sideMenu.style.width = menuWidth;
            menuIcon.style.display = 'none';
        });
    }
    // Cerrar menú
    if (closeBtn && sideMenu) {
        closeBtn.addEventListener('click', function() {
            sideMenu.style.left = '-100%';
            sideMenu.style.width = '0';
            menuIcon.style.display = 'flex';
        });
    }
    // Cerrar menú al hacer click fuera del menú
    document.addEventListener('click', function(e) {
        if (sideMenu && sideMenu.style.left === '0px' && !sideMenu.contains(e.target) && e.target !== menuIcon && !menuIcon.contains(e.target)) {
            sideMenu.style.left = '-100%';
            sideMenu.style.width = '0';
            menuIcon.style.display = 'flex';
        }
    });
});

// --- GALERÍA TATUS ---
const tatusData = [
    {idx:1, img:'1BN.jpg', color:'1.jpg', vid:'vídeo 1.mp4'},
    {idx:2, img:'2BN.jpg', color:'2.jpg', vid:'vídeo 2.mp4'},
    {idx:3, img:'3BN.jpg', color:'3.png', vid:'vídeo 3.mp4'},
    {idx:4, img:'4BN.jpg', color:'4.png', vid:'vídeo 4.mp4'},
    {idx:5, img:'5BN.jpg', color:'5.png', vid:'vídeo 5.mp4'},
    {idx:6, img:'6BN.jpg', color:'6.jpg', vid:'vídeo 6.mp4'},
    {idx:7, img:'7BN.jpg', color:'7.png', vid:'vídeo 7.mp4'},
    {idx:8, img:'8BN.jpg', color:'8.jpg', vid:'vídeo 8.mp4'},
    {idx:9, img:'9BN.jpg', color:'9.jpg', vid:'vídeo 9.mp4'},
    {idx:10, img:'10BN.jpg', color:'10.jpg', vid:'vídeo 10.mp4'},
    {idx:11, img:'11BN.jpg', color:'11.jpg', vid:'vídeo 11.mp4'},
    {idx:12, img:'12BN.jpg', color:'12.jpg', vid:'vídeo 12.mp4'},
    {idx:13, img:'13BN.jpg', color:'13.jpg'},
    {idx:14, img:'14BN.jpg', color:'14.jpg'},
    {idx:15, img:'15BN.jpg', color:'15.PNG', vid:'vídeo 15.MP4'},
    {idx:16, img:'16BN.jpg', color:'16.jpg', vid:'vídeo 16.mp4'},
    {idx:17, img:'17BN.jpg', color:'17.jpg', vid:'vídeo 17.mp4'},
    {idx:18, img:'18BN.jpg', color:'18.jpg', vid:'vídeo 18.MP4'},
    {idx:19, img:'19BN.jpg', color:'19.jpg'},
    {idx:20, img:'20BN.jpg', color:'20.jpg'},
    {idx:21, img:'21BN.jpg', color:'21.jpg'}
];

function createGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const cols = window.innerWidth <= 768 ? 2 : 4;
    for(let i=0; i<tatusData.length; i+=cols) {
        const row = document.createElement('div');
        row.className = 'gallery-row';
        for(let j=0; j<cols; j++) {
            const item = tatusData[i+j];
            if(!item) break;
            const cell = document.createElement('div');
            cell.className = 'gallery-item';
            cell.dataset.idx = item.idx;
            // Imagen BN
            const img = document.createElement('img');
            img.src = `images/tatus/fets/${item.idx}/${item.img}`;
            img.alt = `Tatu ${item.idx}`;
            cell.appendChild(img);
            // Si tiene vídeo, añadirlo para hover
            if(item.vid) {
                const vid = document.createElement('video');
                vid.src = `images/tatus/fets/${item.idx}/${item.vid}`;
                vid.setAttribute('playsinline','');
                vid.setAttribute('muted','');
                vid.setAttribute('loop','');
                vid.setAttribute('preload','none');
                cell.appendChild(vid);
                cell.addEventListener('mouseenter',()=>{
                    cell.classList.add('hovered');
                    vid.currentTime = 0;
                    vid.play();
                });
                cell.addEventListener('mouseleave',()=>{
                    cell.classList.remove('hovered');
                    vid.pause();
                });
            }
            // Modal click
            cell.addEventListener('click',()=>openTatusModal(item));
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

// --- MODAL ---
let tatusModalIndex = null;
let tatusModalShowingVideo = false;
function openTatusModal(item) {
    tatusModalIndex = item.idx;
    tatusModalShowingVideo = false;
    const modal = document.getElementById('tatusModal');
    const img = document.getElementById('tatusModalImage');
    const vid = document.getElementById('tatusModalVideo');
    const arrowL = document.getElementById('tatusModalArrowLeft');
    const arrowR = document.getElementById('tatusModalArrowRight');
    img.src = `images/tatus/fets/${item.idx}/${item.color}`;
    img.style.display = 'block';
    vid.style.display = 'none';
    arrowL.style.display = 'none';
    if(item.vid) {
        arrowR.style.display = 'flex';
    } else {
        arrowR.style.display = 'none';
    }
    modal.style.display = 'flex';
}
function showTatusModalVideo() {
    const item = tatusData.find(t=>t.idx==tatusModalIndex);
    if(!item||!item.vid) return;
    tatusModalShowingVideo = true;
    const modal = document.getElementById('tatusModal');
    const img = document.getElementById('tatusModalImage');
    const vid = document.getElementById('tatusModalVideo');
    const arrowL = document.getElementById('tatusModalArrowLeft');
    const arrowR = document.getElementById('tatusModalArrowRight');
    img.style.display = 'none';
    vid.style.display = 'block';
    vid.src = `images/tatus/fets/${item.idx}/${item.vid}`;
    vid.currentTime = 0;
    vid.muted = false;
    vid.play();
    arrowL.style.display = 'flex';
    arrowR.style.display = 'none';
}
function showTatusModalImage() {
    const item = tatusData.find(t=>t.idx==tatusModalIndex);
    if(!item) return;
    tatusModalShowingVideo = false;
    const img = document.getElementById('tatusModalImage');
    const vid = document.getElementById('tatusModalVideo');
    const arrowL = document.getElementById('tatusModalArrowLeft');
    const arrowR = document.getElementById('tatusModalArrowRight');
    img.style.display = 'block';
    vid.style.display = 'none';
    if(item.vid) {
        arrowR.style.display = 'flex';
    } else {
        arrowR.style.display = 'none';
    }
    arrowL.style.display = 'none';
}
function closeTatusModal() {
    document.getElementById('tatusModal').style.display = 'none';
    document.getElementById('tatusModalVideo').pause();
}
document.addEventListener('DOMContentLoaded',function(){
    createGallery();
    var tatusModalCloseEl = document.getElementById('tatusModalClose');
    var tatusModalArrowRightEl = document.getElementById('tatusModalArrowRight');
    var tatusModalArrowLeftEl = document.getElementById('tatusModalArrowLeft');
    var tatusModalEl = document.getElementById('tatusModal');
    if (tatusModalCloseEl) tatusModalCloseEl.onclick = closeTatusModal;
    if (tatusModalArrowRightEl) tatusModalArrowRightEl.onclick = showTatusModalVideo;
    if (tatusModalArrowLeftEl) tatusModalArrowLeftEl.onclick = showTatusModalImage;
    if (tatusModalEl) tatusModalEl.onclick = function(e){
        if(e.target===this) closeTatusModal();
    };
    document.addEventListener('keydown',function(e){
        var modal = document.getElementById('tatusModal');
        if(modal && modal.style.display !== 'none') {
            if(e.key==='Escape') closeTatusModal();
        }
    });
});

// --- Scroll-based menu icon transition ---
window.addEventListener('scroll', function() {
    var menuIcon = document.getElementById('menu-icon');
    if (!menuIcon) return;
    if (window.scrollY > 80) {
        menuIcon.classList.add('scrolled');
    } else {
        menuIcon.classList.remove('scrolled');
    }
});

// --- Rebuild gallery on resize for responsive columns ---
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        createGallery();
    }, 250);
});
