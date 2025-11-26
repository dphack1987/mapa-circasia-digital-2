// ==============================
// 📌 VARIABLES Y ELEMENTOS DOM
// ==============================
const mapContainer = document.getElementById('map-container');
const panzoomWrapper = document.getElementById('panzoom-element-wrapper');
const mapImage = document.getElementById('map-image');
const infoModal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtn = document.getElementById('close-modal');

const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const langSelect = document.getElementById('lang-select');
const themeToggle = document.getElementById('theme-toggle');

let panzoomInstance = null;
let currentLang = 'es';
let zoomWheelHandler = null; // manejador para zoom con rueda

// ==============================
// 🌐 DICCIONARIO DE TRADUCCIONES
// ==============================
const i18n = {
  es: {
    headerTitle: 'Mapa Turístico de Circasia 2025',
    headerSubtitle: 'Explora los puntos más representativos del municipio',
    switchToFace2: 'Cambiar a Cara 2',
    switchToFace1: 'Cambiar a Cara 1',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    altFace1: 'Mapa Turístico - Cara 1',
    altFace2: 'Mapa Turístico - Cara 2',
    globalDirections: 'Cómo llegar a Circasia',
    getDirections: 'Cómo llegar',
    pautas: {
      pauta1: {
        title: 'Cerámicas El Alfarero',
        desc: 'Taller artesanal de cerámica tradicional en Circasia. Piezas únicas hechas a mano.'
      },
      pauta2: {
        title: 'Orquesta Quinta Base',
        desc: 'Agrupación musical local. Consulta presentaciones, clases y eventos.'
      },
      pauta3: {
        title: 'Queso y Café',
        desc: 'Sabores de la región: productos lácteos y café especial.'
      },
      pauta4: {
        title: 'Restaurante El Roble',
        desc: 'Gastronomía típica en un ambiente acogedor. ¡Buen provecho!'
      },
      pauta5: {
        title: 'Mapaturisticodelquindio.com',
        desc: ''
      },
      pauta6: {
        title: 'Pauta 6',
        desc: ''
      },
      pauta7: {
        title: 'Pauta 7',
        desc: ''
      }
      ,
      pauta8: {
        title: 'Pauta 8',
        desc: ''
      }
    }
  },
  en: {
    headerTitle: 'Circasia 2025 Tourist Map',
    headerSubtitle: 'Explore the most representative places of the municipality',
    switchToFace2: 'Switch to Face 2',
    switchToFace1: 'Switch to Face 1',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    altFace1: 'Tourist Map - Face 1',
    altFace2: 'Tourist Map - Face 2',
    globalDirections: 'Directions to Circasia',
    getDirections: 'Get directions',
    pautas: {
      pauta1: {
        title: 'El Alfarero Ceramics',
        desc: 'Traditional handcrafted ceramics in Circasia. Unique pieces, made with care.'
      },
      pauta2: {
        title: 'Quinta Base Orchestra',
        desc: 'Local music ensemble. Check shows, classes and events.'
      },
      pauta3: {
        title: 'Cheese & Coffee',
        desc: 'Regional flavors: dairy delicacies and specialty coffee.'
      },
      pauta4: {
        title: 'El Roble Restaurant',
        desc: 'Traditional cuisine in a cozy setting. Enjoy!'
      },
      pauta5: {
        title: 'Mapaturisticodelquindio.com',
        desc: ''
      },
      pauta6: {
        title: 'Ad Slot 6',
        desc: ''
      },
      pauta7: {
        title: 'Ad Slot 7',
        desc: ''
      }
      ,
      pauta8: {
        title: 'Ad Slot 8',
        desc: ''
      }
    }
  },
  fr: {
    headerTitle: 'Carte touristique de Circasia 2025',
    headerSubtitle: 'Explorez les lieux les plus représentatifs de la commune',
    switchToFace2: 'Changer vers Face 2',
    switchToFace1: 'Changer vers Face 1',
    zoomIn: 'Zoom avant',
    zoomOut: 'Zoom arrière',
    altFace1: 'Carte touristique - Face 1',
    altFace2: 'Carte touristique - Face 2',
    globalDirections: 'Itinéraire vers Circasia',
    getDirections: 'Itinéraire',
    pautas: {
      pauta1: {
        title: 'Céramiques El Alfarero',
        desc: 'Atelier artisanal de céramique à Circasia. Pièces uniques faites à la main.'
      },
      pauta2: {
        title: 'Orchestre Quinta Base',
        desc: 'Ensemble musical local. Consultez spectacles, cours et événements.'
      },
      pauta3: {
        title: 'Fromage et Café',
        desc: 'Saveurs régionales : produits laitiers et café de spécialité.'
      },
      pauta4: {
        title: 'Restaurant El Roble',
        desc: 'Cuisine traditionnelle dans un cadre chaleureux. Bon appétit !'
      },
      pauta5: {
        title: 'Mapaturisticodelquindio.com',
        desc: ''
      },
      pauta6: {
        title: 'Publicité 6',
        desc: ''
      },
      pauta7: {
        title: 'Publicité 7',
        desc: ''
      }
      ,
      pauta8: {
        title: 'Publicité 8',
        desc: ''
      }
    }
  },
  de: {
    headerTitle: 'Touristenkarte Circasia 2025',
    headerSubtitle: 'Entdecken Sie die repräsentativsten Orte der Gemeinde',
    switchToFace2: 'Zur Seite 2 wechseln',
    switchToFace1: 'Zur Seite 1 wechseln',
    zoomIn: 'Vergrößern',
    zoomOut: 'Verkleinern',
    altFace1: 'Touristenkarte - Seite 1',
    altFace2: 'Touristenkarte - Seite 2',
    globalDirections: 'Route nach Circasia',
    getDirections: 'Route',
    pautas: {
      pauta1: {
        title: 'Keramik El Alfarero',
        desc: 'Handgefertigte Keramik in Circasia. Einzigartige Stücke, mit Liebe gemacht.'
      },
      pauta2: {
        title: 'Orchester Quinta Base',
        desc: 'Lokales Musikensemble. Konzerte, Kurse und Events.'
      },
      pauta3: {
        title: 'Käse & Kaffee',
        desc: 'Regionale Köstlichkeiten: Milchprodukte und Spezialkaffee.'
      },
      pauta4: {
        title: 'Restaurant El Roble',
        desc: 'Traditionelle Küche in gemütlicher Atmosphäre. Guten Appetit!'
      },
      pauta5: {
        title: 'Mapaturisticodelquindio.com',
        desc: ''
      },
      pauta6: {
        title: 'Anzeige 6',
        desc: ''
      },
      pauta7: {
        title: 'Anzeige 7',
        desc: ''
      }
      ,
      pauta8: {
        title: 'Anzeige 8',
        desc: ''
      }
    }
  }
};

// ==============================
// 🔍 FUNCIÓN PARA INICIALIZAR EL ZOOM
// ==============================
function initializePanzoom() {
  // Limpia manejador de rueda previo si existe
  if (zoomWheelHandler) {
    mapContainer.removeEventListener('wheel', zoomWheelHandler);
    zoomWheelHandler = null;
  }
  // Destruye instancia previa y limpia transform
  if (panzoomInstance) {
    panzoomInstance.destroy();
    panzoomInstance = null;
    mapImage.style.transform = '';
  }
  // Zoom aplicado al wrapper para que imagen y marcadores se muevan juntos
  panzoomInstance = Panzoom(panzoomWrapper, {
    maxScale: 5,
    minScale: 1,
    contain: 'outside',
    step: 0.15,
    animate: true,
    duration: 200,
    transformOrigin: '50% 50%'
  });
  // Añade zoom con rueda al contenedor del mapa
  zoomWheelHandler = panzoomInstance.zoomWithWheel;
  mapContainer.addEventListener('wheel', zoomWheelHandler, { passive: false });
}

// Cara 2 eliminada: siempre se muestra la cara 1

// ==============================
// 📢 PAUTAS FIJAS
// ==============================
const pautasAdicionales = [
  { position: 'top',    id: 'pauta1', img: 'assets/pautas/pauta1.jpg',  cara: 1, dest: '4.619811,-75.635037' },
  { position: 'bottom', id: 'pauta2', img: 'assets/pautas/pauta2.png',  cara: 1, dest: '' },
  { position: 'top',    id: 'pauta3', img: 'assets/pautas/pauta3.png',  cara: 1, dest: 'Armenia - Pereira #km 1, Circasia, Salento, Quindío' },
  { position: 'bottom', id: 'pauta4', img: 'assets/pautas/pauta4.png',  cara: 1, dest: 'El Roble, Sobre la autopista del café, Armenia - Pereira Km 12, Arrayanal, Circasia, Quindío' },
  { position: 'top',    id: 'pauta5', img: 'assets/pautas/pauta5.png',  cara: 1, dest: null },
  { position: 'bottom', id: 'pauta6', img: 'assets/pautas/pauta6.png',  cara: 1, dest: null },
  { position: 'bottom', id: 'pauta7', img: 'assets/pautas/pauta7.png',  cara: 1, dest: null },
  { position: 'top',    id: 'pauta8', img: 'assets/pautas/pauta8.png',  cara: 1, dest: '4.619811,-75.635037' }
];

// ==============================
// 📍 MARCADORES EN EL MAPA (cara 1)
// ==============================
function getSavedMarkerPos(id) {
  try {
    const raw = localStorage.getItem('markerPos_' + id);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (typeof obj.x === 'number' && typeof obj.y === 'number') return obj;
    return null;
  } catch { return null; }
}

function saveMarkerPos(id, pos) {
  try { localStorage.setItem('markerPos_' + id, JSON.stringify(pos)); } catch {}
}

const markerDefaults = {
  // ejemplo: 'pauta3': { x: 62, y: 48 }
};

function renderMapMarkers() {
  const markersContainer = document.getElementById('map-markers');
  if (!markersContainer) return;
  markersContainer.innerHTML = '';
  // Sólo las pautas con destino verificado (dest !== '' y dest != null)
  const withVerifiedDest = pautasAdicionales.filter(p => p.cara === 1 && p.dest !== '' && p.dest != null);
  withVerifiedDest.forEach(p => {
    const tr = i18n[currentLang].pautas[p.id];
    const marker = document.createElement('button');
    marker.className = 'map-marker';
    marker.setAttribute('type', 'button');
    marker.setAttribute('aria-label', tr.title);
    marker.dataset.id = p.id;
    // Cargar posición guardada o usar centro por defecto
    const saved = getSavedMarkerPos(p.id);
    const preset = markerDefaults[p.id];
    const pos = saved || preset || { x: 50, y: 50 };
    marker.style.left = pos.x + '%';
    marker.style.top = pos.y + '%';
    // Número visible dentro del marcador (1–7)
    const num = parseInt(String(p.id).replace('pauta',''));
    if (!Number.isNaN(num)) {
      marker.textContent = String(num);
    }
    // Etiqueta
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.textContent = tr.title;
    marker.appendChild(label);
    // Click abre modal con información y botón de cómo llegar
    marker.addEventListener('click', (e) => {
      e.stopPropagation();
      const hasExplicitEmptyDest = p.dest === '';
      const resolvedDest = (p.dest === null || p.dest === undefined) ? 'Circasia, Quindío, Colombia' : p.dest;
      let actionsHtml = '';
      if (!hasExplicitEmptyDest) {
        const destParam = encodeURIComponent(String(resolvedDest).trim());
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destParam}`;
        actionsHtml = `<div class="modal-actions"><a class="maps-link" href="${directionsUrl}" target="_blank" rel="noopener" aria-label="${i18n[currentLang].getDirections} a ${tr.title}">${i18n[currentLang].getDirections}</a></div>`;
      }
      const descHtml = tr.desc && String(tr.desc).trim().length > 0 ? `<p style="font-size:14px;color:#333;">${tr.desc}</p>` : '';
      openModal(tr.title, `${descHtml}${actionsHtml}`);
    });
    // Arrastre para ubicar marcador (persistente en localStorage)
    let dragging = false;
    function onPointerMove(ev) {
      if (!dragging) return;
      const rect = markersContainer.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      const clampedX = Math.max(2, Math.min(98, x));
      const clampedY = Math.max(2, Math.min(98, y));
      marker.style.left = clampedX + '%';
      marker.style.top = clampedY + '%';
    }
    function onPointerUp(ev) {
      if (!dragging) return;
      dragging = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      // Guardar posición
      const left = parseFloat(marker.style.left);
      const top = parseFloat(marker.style.top);
      saveMarkerPos(p.id, { x: left, y: top });
    }
    marker.addEventListener('pointerdown', (ev) => {
      ev.stopPropagation();
      dragging = true;
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
    markersContainer.appendChild(marker);
  });
}

function renderPautasAdicionales() {
  const topAdContainer = document.getElementById('pauta-superior-container');
  const bottomAdContainer = document.getElementById('pauta-inferior-container');
  topAdContainer.innerHTML = '';
  bottomAdContainer.innerHTML = '';
  
  pautasAdicionales.forEach(p => {
    if (p.cara !== 1) return;
    const pautaEl = document.createElement('div');
    pautaEl.classList.add('pauta');
    const tr = i18n[currentLang].pautas[p.id];
    pautaEl.title = tr.title;
    const imgEl = document.createElement('img');
    imgEl.src = p.img;
    imgEl.alt = tr.title;
    // Fallback si la imagen no existe (muestra un SVG embebido)
    imgEl.addEventListener('error', () => {
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
           <defs>
             <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
               <stop offset='0%' stop-color='#1b5e20'/>
               <stop offset='50%' stop-color='#2e7d32'/>
               <stop offset='100%' stop-color='#4dd0e1'/>
             </linearGradient>
           </defs>
           <rect x='0' y='0' width='400' height='300' fill='url(#g)'/>
           <text x='200' y='150' fill='white' font-family='Montserrat, sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle' font-weight='700'>${tr.title}</text>
           <text x='200' y='180' fill='rgba(255,255,255,0.8)' font-family='Montserrat, sans-serif' font-size='14' text-anchor='middle' dominant-baseline='middle'>Imagen no disponible</text>
         </svg>`
      );
      imgEl.src = `data:image/svg+xml;utf8,${svg}`;
    });
    pautaEl.appendChild(imgEl);
    const titleEl = document.createElement('div');
    titleEl.classList.add('pauta-title');
    titleEl.textContent = tr.title;
    pautaEl.appendChild(titleEl);
    if (p.position === 'top') {
      topAdContainer.appendChild(pautaEl);
    } else if (p.position === 'bottom') {
      bottomAdContainer.appendChild(pautaEl);
    }
    pautaEl.addEventListener('click', e => {
      e.stopPropagation();
      const hasDesc = tr.desc && String(tr.desc).trim().length > 0;
      const descHtml = hasDesc ? `<p style="font-size:14px;color:#333;">${tr.desc}</p>` : '';
  const hasExplicitEmptyDest = p.dest === '';
  const resolvedDest = (p.dest === null || p.dest === undefined) ? 'Circasia, Quindío, Colombia' : p.dest;
  let actionsHtml = '';
  if (!hasExplicitEmptyDest) {
    const destParam = encodeURIComponent(String(resolvedDest).trim());
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destParam}`;
    actionsHtml = `<div class="modal-actions"><a class="maps-link" href="${directionsUrl}" target="_blank" rel="noopener" aria-label="${i18n[currentLang].getDirections} a ${tr.title}">${i18n[currentLang].getDirections}</a></div>`;
  }
  const modalSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
       <defs>
         <linearGradient id='gm' x1='0' y1='0' x2='1' y2='1'>
           <stop offset='0%' stop-color='#1b5e20'/>
           <stop offset='50%' stop-color='#2e7d32'/>
           <stop offset='100%' stop-color='#4dd0e1'/>
         </linearGradient>
       </defs>
       <rect x='0' y='0' width='800' height='600' fill='url(#gm)'/>
       <text x='400' y='300' fill='white' font-family='Montserrat, sans-serif' font-size='28' text-anchor='middle' dominant-baseline='middle' font-weight='700'>${tr.title}</text>
       <text x='400' y='336' fill='rgba(255,255,255,0.85)' font-family='Montserrat, sans-serif' font-size='16' text-anchor='middle' dominant-baseline='middle'>Imagen no disponible</text>
     </svg>`
  );
  const modalImgHtml = `<img src="${p.img}" alt="${tr.title}" style="width:100%; border-radius:6px; margin-bottom:8px;" onerror="this.src='data:image/svg+xml;utf8,${modalSvg}'">`;
  openModal(tr.title, `${modalImgHtml}${descHtml}${actionsHtml}`);
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
function applyTranslations() {
  const headerTitleEl = document.getElementById('header-title');
  const headerSubtitleEl = document.getElementById('header-subtitle');
  const mapsGlobalBtn = document.getElementById('maps-global-btn');
  if (headerTitleEl) headerTitleEl.textContent = i18n[currentLang].headerTitle;
  if (headerSubtitleEl) headerSubtitleEl.textContent = i18n[currentLang].headerSubtitle;
  if (mapsGlobalBtn) {
    mapsGlobalBtn.textContent = i18n[currentLang].globalDirections;
    mapsGlobalBtn.setAttribute('aria-label', i18n[currentLang].globalDirections);
  }
  zoomInBtn.setAttribute('aria-label', i18n[currentLang].zoomIn);
  zoomOutBtn.setAttribute('aria-label', i18n[currentLang].zoomOut);
  mapImage.alt = i18n[currentLang].altFace1;
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value || 'es';
    document.documentElement.lang = currentLang;
    applyTranslations();
    renderPautasAdicionales();
    renderMapMarkers();
  });
}

// ==============================
// 🌙 FUNCIONALIDAD MODO OSCURO
// ==============================
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  
  // Guardar preferencia en localStorage
  localStorage.setItem('theme', newTheme);
}

// Cargar tema guardado
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
}

// Event listener para el toggle
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Render inicial de marcadores
renderMapMarkers();

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  mapImage.alt = i18n[currentLang].altFace1;
  loadSavedTheme(); // Cargar tema guardado
  renderPautasAdicionales();
  initializePanzoom();
  applyTranslations();
});
