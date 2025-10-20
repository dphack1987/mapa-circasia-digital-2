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
const langSelect = document.getElementById('lang-select');

let mostrandoCara1 = true;
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
    pautas: {
      pauta1: {
        title: 'Cerámicas El Alfarero',
        desc: 'Taller artesanal de cerámica tradicional ubicado en Circasia. ¡Visítanos y conoce nuestras piezas únicas!'
      },
      pauta2: {
        title: 'Orqueta Quinta Base',
        desc: 'Información sobre Orqueta Quinta Base.'
      },
      pauta3: {
        title: 'Queso y Café',
        desc: 'Promoción de Queso y Café.'
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
    pautas: {
      pauta1: {
        title: 'El Alfarero Ceramics',
        desc: 'Traditional handcrafted ceramics workshop in Circasia. Visit us and discover our unique pieces!'
      },
      pauta2: {
        title: 'Ad Slot 2',
        desc: 'Information or promotion for Ad 2.'
      },
      pauta3: {
        title: 'Ad Slot 3',
        desc: 'Promotion and details for Ad 3.'
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
    pautas: {
      pauta1: {
        title: 'Céramiques El Alfarero',
        desc: "Atelier artisanal de céramique traditionnelle à Circasia. Venez découvrir nos pièces uniques !"
      },
      pauta2: {
        title: 'Publicité Emplacement 2',
        desc: 'Informations ou promotion pour la Publicité 2.'
      },
      pauta3: {
        title: 'Publicité Emplacement 3',
        desc: 'Promotion et détails pour la Publicité 3.'
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
    pautas: {
      pauta1: {
        title: 'Keramik El Alfarero',
        desc: 'Traditionelle Keramikwerkstatt in Circasia. Besuchen Sie uns und entdecken Sie unsere einzigartigen Stücke!'
      },
      pauta2: {
        title: 'Werbeplatz 2',
        desc: 'Informationen oder Werbung für Platz 2.'
      },
      pauta3: {
        title: 'Werbeplatz 3',
        desc: 'Promotion und Details für Platz 3.'
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
  
  // Inicializar Panzoom en ambas caras
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

// ==============================
// 🌀 CAMBIO DE CARA
// ==============================
switchBtn.addEventListener('click', () => {
  mostrandoCara1 = !mostrandoCara1;
  mapImage.src = mostrandoCara1 ? 'assets/cara1.jpg' : 'assets/cara2.jpg';
  switchBtn.textContent = mostrandoCara1 ? i18n[currentLang].switchToFace2 : i18n[currentLang].switchToFace1;
  switchBtn.setAttribute('aria-pressed', mostrandoCara1 ? 'false' : 'true');
  mapImage.alt = mostrandoCara1 ? i18n[currentLang].altFace1 : i18n[currentLang].altFace2;

  renderPautasAdicionales();
  initializePanzoom();
});

// ==============================
// 📢 PAUTAS FIJAS
// ==============================
const pautasAdicionales = [
  { position: 'top', id: 'pauta1', img: 'assets/pautas/pauta1.jpg', cara: 1 },
  { position: 'top', id: 'pauta2', img: 'assets/pautas/pauta2.jpg', cara: 1 },
  { position: 'top', id: 'pauta3', img: 'assets/pautas/pauta3.jpg', cara: 1 },
  { position: 'bottom', id: 'pauta1', img: 'assets/pautas/pauta1.jpg', cara: 2 },
  { position: 'bottom', id: 'pauta2', img: 'assets/pautas/pauta2.jpg', cara: 2 },
  { position: 'bottom', id: 'pauta3', img: 'assets/pautas/pauta3.jpg', cara: 2 }
];

function renderPautasAdicionales() {
  const topAdContainer = document.getElementById('pauta-superior-container');
  const bottomAdContainer = document.getElementById('pauta-inferior-container');
  
  if (topAdContainer) topAdContainer.innerHTML = '';
  if (bottomAdContainer) bottomAdContainer.innerHTML = '';
  
  pautasAdicionales.forEach(p => {
    if (p.cara !== (mostrandoCara1 ? 1 : 2)) return;
    
    const container = p.position === 'top' ? topAdContainer : bottomAdContainer;
    if (!container) return;
    
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
    container.appendChild(pautaEl);
    pautaEl.addEventListener('click', e => {
      e.stopPropagation();
      openModal(tr.title, `<img src="${p.img}" alt="${tr.title}" style="width:100%; border-radius:6px; margin-bottom:8px;"><p style="font-size:14px;color:#333;">${tr.desc}</p>`);
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
  switchBtn.textContent = mostrandoCara1 ? i18n[currentLang].switchToFace2 : i18n[currentLang].switchToFace1;
  zoomInBtn.setAttribute('aria-label', i18n[currentLang].zoomIn);
  zoomOutBtn.setAttribute('aria-label', i18n[currentLang].zoomOut);
  mapImage.alt = mostrandoCara1 ? i18n[currentLang].altFace1 : i18n[currentLang].altFace2;
}

if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value || 'es';
    document.documentElement.lang = currentLang;
    applyTranslations();
    renderPautasAdicionales();
  });
}

function ensurePautaContainers() {
  const scroll = document.getElementById('scrollable-content');
  if (!scroll) return;
  if (!document.getElementById('pauta-superior-container')) {
    const sup = document.createElement('div');
    sup.id = 'pauta-superior-container';
    scroll.prepend(sup);
  }
  if (!document.getElementById('pauta-inferior-container')) {
    const inf = document.createElement('div');
    inf.id = 'pauta-inferior-container';
    scroll.appendChild(inf);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ensurePautaContainers();
  document.documentElement.lang = currentLang;
  mapImage.alt = i18n[currentLang].altFace1;
  switchBtn.textContent = i18n[currentLang].switchToFace2;
  renderPautasAdicionales();
  initializePanzoom();
  applyTranslations();
});