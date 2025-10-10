// ==============================
// 📌 VARIABLES Y ELEMENTOS DOM
// ==============================
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
  {
    top: '35%',
    left: '50%',
    title: 'Mirador de Circasia',
    desc: 'Uno de los puntos panorámicos más emblemáticos de Circasia.'
  },
  {
    top: '60%',
    left: '20%',
    title: 'Plaza Principal',
    desc: 'Centro histórico con arquitectura tradicional y gran actividad cultural.'
  },
  {
    top: '75%',
    left: '70%',
    title: 'Museo Local',
    desc: 'Espacio cultural con exposiciones permanentes sobre la historia local.'
  }
];

const hotspotsCara2 = [
  {
    top: '40%',
    left: '40%',
    title: 'Zona Gastronómica',
    desc: 'Área con restaurantes típicos y cafés artesanales.'
  },
  {
    top: '65%',
    left: '60%',
    title: 'Sendero Ecológico',
    desc: 'Ruta natural para caminatas con paisajes únicos.'
  }
];

// ==============================
// 🌀 FUNCIÓN PARA CAMBIAR ENTRE CARAS
// ==============================
switchBtn.addEventListener('click', () => {
  mostrandoCara1 = !mostrandoCara1;

  mapImage.src = mostrandoCara1 ? 'assets/cara1.jpg' : 'assets/cara2.jpg';
  switchBtn.textContent = mostrandoCara1 ? 'Cambiar a Cara 2' : 'Cambiar a Cara 1';
  switchBtn.setAttribute('aria-pressed', mostrandoCara1 ? 'false' : 'true');

  renderHotspots();
});

// ==============================
// 📍 FUNCIÓN PARA RENDERIZAR HOTSPOTS
// ==============================
function renderHotspots() {
  // Elimina hotspots dinámicos (solo los de clase .hotspot)
  document.querySelectorAll('.hotspot').forEach(el => el.remove());

  const currentHotspots = mostrandoCara1 ? hotspotsCara1 : hotspotsCara2;

  currentHotspots.forEach(hs => {
    const el = document.createElement('div');
    el.classList.add('hotspot');
    el.style.top = hs.top;
    el.style.left = hs.left;
    el.dataset.title = hs.title;
    el.dataset.desc = hs.desc;

    el.addEventListener('click', () => openModal(hs.title, hs.desc));
    mapImage.parentElement.appendChild(el);
  });

  // Mostrar u ocultar el hotspot visual de la pauta según la cara actual
  // (pautaHotspot se crea más abajo; usamos typeof para no causar error si aún no existe)
  if (typeof pautaHotspot !== 'undefined' && pautaHotspot) {
    pautaHotspot.style.display = mostrandoCara1 ? 'block' : 'none';
  }
}

// ==============================
// 📐 GENERAR REJILLA AUTOMÁTICA
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

    cell.style.border = '1px dashed rgba(0,0,0,0.1)';
    cell.style.position = 'relative';
    cell.style.cursor = 'pointer';

    gridOverlay.appendChild(cell);

    // Acción por defecto
    cell.addEventListener('click', () => {
      openModal(`Celda ${cell.title}`, 'Espacio disponible para información o pauta local.');
    });
  }
}

// ==============================
// 📢 PAUTAS FIJAS CON IMAGEN REAL (mantener intactas)
// ==============================
const pautas = [
  {
    col: 'C',
    row: 2,
    title: 'Cerámicas El Alfarero',
    img: 'assets/pautas/pauta_ceramicas_alfarero.jpg',
    desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!'
  }
];

pautas.forEach(p => {
  const targetCell = [...gridOverlay.children].find(
    c => c.dataset.col === p.col && c.dataset.row === String(p.row)
  );

  if (targetCell) {
    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    pautaEl.title = p.title;

    pautaEl.style.position = 'absolute';
    pautaEl.style.top = '50%';
    pautaEl.style.left = '50%';
    pautaEl.style.transform = 'translate(-50%, -50%)';
    pautaEl.style.background = 'rgba(255, 255, 0, 0.85)';
    pautaEl.style.padding = '6px 10px';
    pautaEl.style.fontSize = '13px';
    pautaEl.style.fontWeight = '600';
    pautaEl.style.borderRadius = '4px';
    pautaEl.style.cursor = 'pointer';
    pautaEl.textContent = p.title;

    targetCell.appendChild(pautaEl);

    pautaEl.addEventListener('click', e => {
      e.stopPropagation();
      openModal(
        p.title,
        `<img src="${p.img}" alt="${p.title}" style="width:100%;border-radius:8px;margin-top:10px;">
         <p style="margin-top:8px;font-size:14px;color:#333;">${p.desc}</p>`
      );
    });
  }
});

// ==============================
// 🪟 MODAL DE INFORMACIÓN
// ==============================
function openModal(title, desc) {
  modalTitle.textContent = title;
  modalDesc.innerHTML = desc; // acepta HTML para las imágenes
  infoModal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
  infoModal.classList.add('hidden');
});

infoModal.addEventListener('click', e => {
  if (e.target === infoModal) {
    infoModal.classList.add('hidden');
  }
});

// ==============================
// 🔶 Hotspot visual de la pauta (estético, pulsante)
// - Se crea UNA sola vez y se muestra/oculta según la cara.
// - No reemplaza las pautas en las celdas; las mantiene.
// ==============================
/* Nota: pautahotspot se mantiene con otra clase (pauta-hotspot) para no ser
   eliminada por renderHotspots que borra .hotspot dinámicos. */
const pautaHotspot = document.createElement('div');
pautaHotspot.classList.add('pauta-hotspot');
pautaHotspot.title = 'Cerámicas El Alfarero';
pautaHotspot.style.top = '70%';   // posición visual exacta acordada
pautaHotspot.style.left = '55%';
pautaHotspot.style.position = 'absolute';
pautaHotspot.style.transform = 'translate(-50%, -50%)';
pautaHotspot.style.zIndex = '5'; // encima del mapa
// añadir al mismo contenedor que usa renderHotspots (consistente con hotspots)
mapImage.parentElement.appendChild(pautaHotspot);

// acción al hacer click en el hotspot visual: usar el modal ya existente
pautaHotspot.addEventListener('click', (e) => {
  e.stopPropagation();
  openModal(
    'Cerámicas El Alfarero',
    `<div style="text-align:center;">
       <img src="assets/pautas/pauta_ceramicas_alfarero.jpg" alt="Cerámicas El Alfarero"
            style="width:100%; border-radius:10px; margin-bottom:10px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
       <p style="font-size:14px;color:#333; margin:0;">
         Centro Artesanal y Gastronómico — Cerámica tradicional y contemporánea hecha a mano en Circasia.
       </p>
     </div>`
  );
});

// ==============================
// 🔶 Estilos dinámicos para el hotspot y la animación (se inyectan en <head>)
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
      animation: pautaPulso 2000ms infinite;
      transform: translate(-50%, -50%);
      border: 2px solid white;
    }

    @keyframes pautaPulso {
      0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 6px rgba(243,156,18,0.28); }
      50% { transform: translate(-50%, -50%) scale(1.18); box-shadow: 0 0 20px rgba(255,200,0,0.45); }
      100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 6px rgba(243,156,18,0.28); }
    }

    /* Si quieres, estos estilos ayudan a las imágenes dentro del modal (pauta) */
    .info-modal-img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.12);
      margin-bottom: 10px;
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
/* Mostrar/ocultar hotspot inicial según la cara */
pautaHotspot.style.display = mostrandoCara1 ? 'block' : 'none';

/* Renderizar los hotspots originales */
renderHotspots();
