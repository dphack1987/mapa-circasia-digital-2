// ==============================
// 📌 VARIABLES Y ELEMENTOS DOM
// ==============================
const mapContainer = document.getElementById('map-container');
const mapImage = document.getElementById('map-image');
const switchBtn = document.getElementById('switch-btn');
const gridOverlay = document.getElementById('grid-overlay');
const infoModal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtn = document.getElementById('close-modal');

let mostrandoCara1 = true;

// ==============================
// 📍 PUNTOS TURÍSTICOS — CARA 1 & 2
// ==============================
const hotspotsCara1 = [
  { top: '35%', left: '50%', title: 'Mirador de Circasia', desc: 'Uno de los puntos panorámicos más emblemáticos de Circasia.' },
  { top: '60%', left: '20%', title: 'Plaza Principal', desc: 'Centro histórico con arquitectura tradicional y gran actividad cultural.' },
  { top: '75%', left: '70%', title: 'Museo Local', desc: 'Espacio cultural con exposiciones permanentes sobre la historia local.' }
];

const hotspotsCara2 = [
  { top: '40%', left: '40%', title: 'Zona Gastronómica', desc: 'Área con restaurantes típicos y cafés artesanales.' },
  { top: '65%', left: '60%', title: 'Sendero Ecológico', desc: 'Ruta natural para caminatas con paisajes únicos.' }
];

// ==============================
// 🌀 CAMBIO DE CARA
// ==============================
switchBtn.addEventListener('click', () => {
  mostrandoCara1 = !mostrandoCara1;
  mapImage.src = mostrandoCara1 ? 'assets/cara1.jpg' : 'assets/cara2.jpg';
  switchBtn.textContent = mostrandoCara1 ? 'Cambiar a Cara 2' : 'Cambiar a Cara 1';
  switchBtn.setAttribute('aria-pressed', mostrandoCara1 ? 'false' : 'true');

  renderHotspots();
  renderPautasAdicionales();
});

// ==============================
// 📍 FUNCION RENDER HOTSPOTS
// ==============================
function renderHotspots() {
  document.querySelectorAll('.hotspot.dynamic').forEach(el => el.remove());

  const currentHotspots = mostrandoCara1 ? hotspotsCara1 : hotspotsCara2;

  currentHotspots.forEach(hs => {
    const el = document.createElement('div');
    el.classList.add('hotspot', 'dynamic');
    el.style.top = hs.top;
    el.style.left = hs.left;
    el.dataset.title = hs.title;
    el.dataset.desc = hs.desc;

    el.addEventListener('click', () => openModal(hs.title, hs.desc));
    mapContainer.appendChild(el);
  });
}

// ==============================
// 📐 GENERAR REJILLA
// ==============================
const cols = 8;
const rows = 4;

gridOverlay.style.display = 'grid';
gridOverlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
gridOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
gridOverlay.style.width = '100%';
gridOverlay.style.height = '100%';
gridOverlay.style.position = 'absolute';
gridOverlay.style.top = '0';
gridOverlay.style.left = '0';

for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= cols; j++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.dataset.col = String.fromCharCode(64 + j);
    cell.dataset.row = i;
    cell.title = `${cell.dataset.col}${i}`;
    cell.style.cursor = 'pointer';
    gridOverlay.appendChild(cell);

    cell.addEventListener('click', () => {
      openModal(`Celda ${cell.title}`, 'Espacio disponible para información o pauta local.');
    });
  }
}

// ==============================
// 📢 PAUTAS FIJAS — CARA 1
// ==============================
const pautasAdicionales = [
  {
    col: 'A',       // Primer cuadro blanco
    row: 1,
    title: 'Pauta 1',
    img: 'assets/pautas/pauta1.jpg',
    desc: '',
    cara: 1
  },
  {
    col: 'A',
    row: 3,         // Segundo cuadro blanco
    title: 'Pauta 2',
    img: 'assets/pautas/pauta2.jpg',
    desc: '',
    cara: 1
  }
];

function renderPautasAdicionales() {
  pautasAdicionales.forEach(p => {
    if (p.cara !== (mostrandoCara1 ? 1 : 2)) return;

    const targetCell = [...gridOverlay.children].find(
      c => c.dataset.col === p.col && c.dataset.row === String(p.row)
    );

    if (!targetCell) return;

    const pautaEl = document.createElement('img');
    pautaEl.src = p.img;
    pautaEl.alt = p.title;
    pautaEl.style.width = '100%';
    pautaEl.style.height = 'auto';
    pautaEl.style.borderRadius = '6px';
    pautaEl.style.position = 'absolute';
    pautaEl.style.top = '50%';
    pautaEl.style.left = '50%';
    pautaEl.style.transform = 'translate(-50%, -50%)';
    pautaEl.style.zIndex = '800';

    targetCell.appendChild(pautaEl);
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
// 🟢 INICIALIZAR
// ==============================
renderHotspots();
renderPautasAdicionales();
