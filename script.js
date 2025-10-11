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

// Crear el elemento pautaHotspot
const pautaHotspot = document.createElement('div');
pautaHotspot.classList.add('pauta-hotspot');
pautaHotspot.style.position = 'absolute';
pautaHotspot.style.top = '50%';
pautaHotspot.style.left = '50%';
mapContainer.appendChild(pautaHotspot);

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
    col: 'A',       // Costado izquierdo
    row: 2,
    title: 'Cerámicas El Alfarero',
    img: 'assets/pautas/pauta1.jpg',
    desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!',
    cara: 1,
    position: 'left'
  },
  {
    col: 'H',       // Costado derecho
    row: 2,
    title: 'Publicidad Pauta 2',
    img: 'assets/pautas/pauta2.jpg',
    desc: 'Información o promoción de la Pauta 2.',
    cara: 1,
    position: 'right'
  }
];

function renderPautasAdicionales() {
  // Limpiar pautas anteriores
  document.querySelectorAll('.pauta').forEach(el => el.remove());
  
  pautasAdicionales.forEach(p => {
    if (p.cara !== (mostrandoCara1 ? 1 : 2)) return;

    // Crear elemento de pauta
    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    
    // Establecer tamaño fijo de 8x6 cm (convertido a píxeles aproximadamente)
    // 1cm ≈ 37.8px en pantallas estándar
    pautaEl.style.width = '302px';  // 8cm * 37.8px
    pautaEl.style.height = '227px'; // 6cm * 37.8px
    
    // Posicionar en los costados según la propiedad position
    pautaEl.style.position = 'absolute';
    
    if (p.position === 'left') {
      pautaEl.style.left = '10px';
      pautaEl.style.top = '30%';
    } else if (p.position === 'right') {
      pautaEl.style.right = '10px';
      pautaEl.style.top = '30%';
    }
    
    // Mostrar la imagen directamente
    pautaEl.style.backgroundImage = `url(${p.img})`;
    pautaEl.style.backgroundSize = 'cover';
    pautaEl.style.backgroundPosition = 'center';
    pautaEl.style.border = '2px solid #000';
    pautaEl.style.borderRadius = '8px';
    pautaEl.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    pautaEl.style.cursor = 'pointer';
    pautaEl.title = p.title;
    
    // Agregar título visible
    const titleEl = document.createElement('div');
    titleEl.textContent = p.title;
    titleEl.style.position = 'absolute';
    titleEl.style.bottom = '0';
    titleEl.style.left = '0';
    titleEl.style.right = '0';
    titleEl.style.background = 'rgba(0,0,0,0.7)';
    titleEl.style.color = 'white';
    titleEl.style.padding = '8px';
    titleEl.style.fontSize = '14px';
    titleEl.style.fontWeight = 'bold';
    titleEl.style.textAlign = 'center';
    titleEl.style.borderBottomLeftRadius = '6px';
    titleEl.style.borderBottomRightRadius = '6px';
    
    pautaEl.appendChild(titleEl);
    mapContainer.appendChild(pautaEl);

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
