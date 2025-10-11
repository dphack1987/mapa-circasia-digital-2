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
let panzoomInstance = null; // 🚨 NUEVO: Variable para guardar la instancia de Panzoom

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
// 🔍 FUNCIÓN PARA INICIALIZAR EL ZOOM
// ==============================
function initializePanzoom() {
  // Si ya existe una instancia, la destruimos para evitar conflictos
  if (panzoomInstance) {
    panzoomInstance.destroy();
  }

  // Creamos una nueva instancia de Panzoom en la imagen del mapa
  panzoomInstance = panzoom(mapImage, {
    maxScale: 5, // Zoom máximo permitido (5x el tamaño original)
    minScale: 1, // Zoom mínimo (tamaño original)
    contain: 'outside', // Asegura que la imagen no se salga de su contenedor
    // Puedes añadir más opciones aquí si lo deseas
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

  renderHotspots();
  renderPautasAdicionales();
  
  // 🚨 CAMBIO CLAVE: Re-inicializamos Panzoom para la nueva imagen
  initializePanzoom();
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
// 📢 PAUTAS FIJAS (NUEVA UBICACIÓN)
// ==============================
const pautasAdicionales = [
  {
    position: 'top', // Posición: en el contenedor superior
    title: 'Cerámicas El Alfarero',
    img: 'assets/pautas/pauta1.jpg',
    desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!',
    cara: 1
  },
  {
    position: 'bottom', // Posición: en el contenedor inferior
    title: 'Publicidad Pauta 2',
    img: 'assets/pautas/pauta2.jpg',
    desc: 'Información o promoción de la Pauta 2.',
    cara: 1
  }
  // Puedes añadir más pautas aquí si lo deseas
  // { position: 'top', title: 'Otra Pauta', img: '...', desc: '...', cara: 1 }
];

function renderPautasAdicionales() {
  // 🚨 Seleccionar los nuevos contenedores superior e inferior
  const topAdContainer = document.getElementById('pauta-superior-container');
  const bottomAdContainer = document.getElementById('pauta-inferior-container');

  // Limpiar pautas anteriores de ambos contenedores
  topAdContainer.innerHTML = '';
  bottomAdContainer.innerHTML = '';
  
  pautasAdicionales.forEach(p => {
    if (p.cara !== (mostrandoCara1 ? 1 : 2)) return;

    // Crear elemento de pauta
    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    pautaEl.title = p.title;

    // Crear la imagen
    const imgEl = document.createElement('img');
    imgEl.src = p.img;
    imgEl.alt = p.title;
    pautaEl.appendChild(imgEl);

    // Crear el título
    const titleEl = document.createElement('div');
    titleEl.classList.add('pauta-title');
    titleEl.textContent = p.title;
    pautaEl.appendChild(titleEl);
    
    // 🚨 Añadir la pauta al contenedor correcto
    if (p.position === 'top') {
      topAdContainer.appendChild(pautaEl);
    } else if (p.position === 'bottom') {
      bottomAdContainer.appendChild(pautaEl);
    }

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
// 🔶 Estilos dinámicos para hotspot pulsante (Se mantiene, pero no se usa en este diseño)
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
renderHotspots();
renderPautasAdicionales();
// 🚨 CAMBIO CLAVE: Inicializamos Panzoom al cargar la página
initializePanzoom();