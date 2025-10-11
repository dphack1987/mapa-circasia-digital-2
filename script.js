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

  pautaHotspot.style.display = mostrandoCara1 ? 'block' : 'none';
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
// 📢 PAUTAS FIJAS PARA CARA 1
// ==============================
const pautasAdicionales = [
  {
    col: 'A',       // Primer cuadro blanco
    row: 1,
    title: 'Cerámicas El Alfarero',
    img: 'assets/pautas/pauta1.jpg',
    desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!',
    cara: 1
  },
  {
    col: 'B',       // Segundo cuadro blanco
    row: 1,
    title: 'Publicidad Pauta 2',
    img: 'assets/pautas/pauta2.jpg',
    desc: 'Información o promoción de la Pauta 2.',
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

    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    pautaEl.title = p.title;
    pautaEl.textContent = p.title;
    pautaEl.style.position = 'absolute';
    pautaEl.style.top = '50%';
    pautaEl.style.left = '50%';
    pautaEl.style.transform = 'translate(-50%, -50%)';
    pautaEl.style.background = 'rgba(255, 255, 255, 0.95)';
    pautaEl.style.padding = '4px 8px';
    pautaEl.style.fontSize = '12px';
    pautaEl.style.fontWeight = '600';
    pautaEl.style.border = '1px solid #000';
    pautaEl.style.borderRadius = '4px';
    pautaEl.style.cursor = 'pointer';
    pautaEl.style.textAlign = 'center';

    targetCell.appendChild(pautaEl);

    pautaEl.addEventListener('click', e => {
      e.stopPropagation();
      openModal(
        p.title,
        `<img src="${p.img}" alt="${p.title}" style="width:100%; border-radius:6px; margin-bottom:8px;">
         <p style="font-size:14px;color:#333;">${p.desc}</p>`
      );
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
// 🔶 Hotspot visual de la pauta (Cerámicas El Alfarero)
// ==============================
const pautaHotspot = document.createElement('div');
pautaHotspot.classList.add('pauta-hotspot');
pautaHotspot.title = 'Cerámicas El Alfarero';
pautaHotspot.style.top = '70%';
pautaHotspot.style.left = '55%';
mapContainer.appendChild(pautaHotspot);

pautaHotspot.addEventListener('click', e => {
  e.stopPropagation();
  openModal(
    'Cerámicas El Alfarero',
    `<div style="text-align:center;">
       <img src="assets/pautas/pauta1.jpg" alt="Cerámicas El Alfarero"
            style="width:100%; border-radius:10px; margin-bottom:10px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
       <p style="font-size:14px;color:#333; margin:0;">
         Centro Artesanal y Gastronómico — Cerámica tradicional y contemporánea hecha a mano en Circasia.
       </p>
     </div>`
  );
});

// ==============================
// 🔶 Estilos dinámicos para hotspot pulsante
// ==============================
(function injectPautaStyles() {
  const css = `
    .pauta-hotspot {
      width: 22px;
      height: 22px;
      background: radial-gradient(circle, #ffd54f 35%, #f39c12 100%);
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(243,156,18,0.35);
      cursor: pointer;
      animation: pautaPulso 2s infinite;
      transform: translate(-50%, -50%);
      border: 2px solid white;
      z-index: 900;
    }
    @keyframes pautaPulso {
      0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 6px rgba(243,156,18,0.28); }
      50% { transform: translate(-50%, -50%) scale(1.18); box-shadow: 0 0 20px rgba(255,200,0,0.45); }
      100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 6px rgba(243,156,18,0.28); }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-generated', 'pauta-hotspot-styles');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
})();

// ==============================
// 🟢 INICIALIZAR
// ==============================
pautaHotspot.style.display = mostrandoCara1 ? 'block' : 'none';
renderHotspots();
renderPautasAdicionales();
