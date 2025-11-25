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
  // Zoom aplicado directamente a la imagen (cara 1 por defecto)
  panzoomInstance = Panzoom(mapImage, {
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
  { position: 'bottom', id: 'pauta2', img: 'assets/pautas/pauta2.png',  cara: 1, dest: null },
  { position: 'top',    id: 'pauta3', img: 'assets/pautas/pauta3.png',  cara: 1, dest: null },
  { position: 'bottom', id: 'pauta4', img: 'assets/pautas/pauta4.png',  cara: 1, dest: null },
  { position: 'top',    id: 'pauta5', img: 'assets/pautas/pauta5.png',  cara: 1, dest: null },
  { position: 'bottom', id: 'pauta6', img: 'assets/pautas/pauta6.png',  cara: 1, dest: null },
  { position: 'bottom', id: 'pauta7', img: 'assets/pautas/pauta7.png',  cara: 1, dest: null }
];

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
      const dest = p.dest && String(p.dest).trim().length > 0 ? p.dest : 'Circasia, Quindío, Colombia';
      const destParam = encodeURIComponent(dest);
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destParam}`;
      const actionsHtml = `<div class="modal-actions"><a class="maps-link" href="${directionsUrl}" target="_blank" rel="noopener" aria-label="${i18n[currentLang].getDirections} a ${tr.title}">${i18n[currentLang].getDirections}</a></div>`;
      openModal(tr.title, `<img src="${p.img}" alt="${tr.title}" style="width:100%; border-radius:6px; margin-bottom:8px;">${descHtml}${actionsHtml}`);
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
  if (headerTitleEl) headerTitleEl.textContent = i18n[currentLang].headerTitle;
  if (headerSubtitleEl) headerSubtitleEl.textContent = i18n[currentLang].headerSubtitle;
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

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  mapImage.alt = i18n[currentLang].altFace1;
  loadSavedTheme(); // Cargar tema guardado
  renderPautasAdicionales();
  initializePanzoom();
  applyTranslations();
});
