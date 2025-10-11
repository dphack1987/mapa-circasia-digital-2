// ==============================
// 📌 VARIABLES Y ELEMENTOS DOM
// ==============================
const mapContainer = document.getElementById('map-container');
const panzoomWrapper = document.getElementById('panzoom-element-wrapper');
const mapImage = document.getElementById('map-image');
const switchBtn = document.getElementById('switch-btn');
const infoModal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtn = document.getElementById('close-modal');

const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');

let mostrandoCara1 = true;
let panzoomInstance = null;

// ==============================
// 🔍 FUNCIÓN PARA INICIALIZAR EL ZOOM
// ==============================
function initializePanzoom() {
  if (panzoomInstance) {
    panzoomInstance.destroy();
  }
  panzoomInstance = panzoom(panzoomWrapper, {
    maxScale: 5,
    minScale: 1,
    contain: 'outside',
    zoomSpeed: 0.065,
    pinchAndPan: true,
  });
}

// ==============================
// 🌀 CAMBIO DE CARA
// ==============================
switchBtn.addEventListener('click', () => {
  mostrandoCara1 = !mostrandoCara1;
  mapImage.src = mostrandoCara1 ? 'assets/cara1.jpg' : 'assets/cara2.jpg';
  switchBtn.textContent = mostrandoCara1 ? 'Cambiar a Cara 2' : 'Cambiar a Cara 1';
  switchBtn.setAttribute('aria-pressed', mostrandoCara1 ? 'false' : 'true');

  renderPautasAdicionales();
  initializePanzoom();
});

// ==============================
// 📢 PAUTAS FIJAS
// ==============================
const pautasAdicionales = [
  { position: 'top', title: 'Cerámicas El Alfarero', img: 'assets/pautas/pauta1.jpg', desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!', cara: 1 },
  { position: 'bottom', title: 'Publicidad Pauta 2', img: 'assets/pautas/pauta2.jpg', desc: 'Información o promoción de la Pauta 2.', cara: 1 }
];

function renderPautasAdicionales() {
  const topAdContainer = document.getElementById('pauta-superior-container');
  const bottomAdContainer = document.getElementById('pauta-inferior-container');
  topAdContainer.innerHTML = '';
  bottomAdContainer.innerHTML = '';
  
  pautasAdicionales.forEach(p => {
    if (p.cara !== (mostrandoCara1 ? 1 : 2)) return;
    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    pautaEl.title = p.title;
    const imgEl = document.createElement('img');
    imgEl.src = p.img;
    imgEl.alt = p.title;
    pautaEl.appendChild(imgEl);
    const titleEl = document.createElement('div');
    titleEl.classList.add('pauta-title');
    titleEl.textContent = p.title;
    pautaEl.appendChild(titleEl);
    if (p.position === 'top') {
      topAdContainer.appendChild(pautaEl);
    } else if (p.position === 'bottom') {
      bottomAdContainer.appendChild(pautaEl);
    }
    pautaEl.addEventListener('click', e => {
      e.stopPropagation();
      openModal(p.title, `<img src="${p.img}" alt="${p.title}" style="width:100%; border-radius:6px; margin-bottom:8px;"><p style="font-size:14px;color:#333;">${p.desc}</p>`);
    });
  });
}

// ==============================
// 🪟 MODAL DE INFORMACIÓN
// ==============================
function openModal(title, desc) {
  modalTitle.textContent = title;
  modalDesc.innerHTML = desc;
  infoModal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => infoModal.classList.add('hidden'));
infoModal.addEventListener('click', e => { if (e.target === infoModal) infoModal.classList.add('hidden'); });

// ==============================
// 🎮 EVENT LISTENERS PARA LOS BOTONES DE ZOOM
// ==============================
zoomInBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panzoomInstance) panzoomInstance.zoomIn();
});

zoomOutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panzoomInstance) panzoomInstance.zoomOut();
});

// ==============================
// 🟢 INICIALIZAR
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  renderPautasAdicionales();
  initializePanzoom();
});