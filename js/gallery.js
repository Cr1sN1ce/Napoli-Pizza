let allImages = [];
let currentFilter = 'all';
let currentIndex = 0;
let filteredImages = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadGallery();
    initializeFilters();
});

async function loadGallery() {
    const isInPages = window.location.pathname.includes('/pages/');
    const jsonPath = isInPages ? '../data/gallery.json' : 'data/gallery.json';

    try {
        const response = await fetch(jsonPath);
        allImages = await response.json();
    } catch (err) {
        console.error('Ошибка загрузки галереи:', err);
        allImages = [];
    }

    renderGallery('all');
}

function renderGallery(filter) {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    filteredImages = filter === 'all'
        ? allImages
        : allImages.filter(img => img.category === filter);

    if (filteredImages.length === 0) {
        container.innerHTML = `
            <div class="gallery-empty col-12">
                <h3>Nu sunt fotografii în această categorie</h3>
                <p>Revino mai târziu.</p>
            </div>`;
        return;
    }

    container.innerHTML = filteredImages.map((img, index) => `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="gallery-item" data-index="${index}">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(parseInt(item.dataset.index));
        });
    });
}

function initializeFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderGallery(currentFilter);
        });
    });
}

function openLightbox(index) {
    currentIndex = index;

    const existing = document.querySelector('.lightbox');
    if (existing) existing.remove();

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <button class="lightbox-close" aria-label="Închide">×</button>
            <button class="lightbox-prev" aria-label="Anterior">❮</button>
            <img class="lightbox-image" src="${filteredImages[currentIndex].src}" alt="${filteredImages[currentIndex].alt}">
            <button class="lightbox-next" aria-label="Următor">❯</button>
            <div class="lightbox-counter">${currentIndex + 1} / ${filteredImages.length}</div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) lightbox.remove();
    document.body.style.overflow = '';
}

function showNext() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

function updateLightbox() {
    const img = document.querySelector('.lightbox-image');
    const counter = document.querySelector('.lightbox-counter');
    if (img) img.src = filteredImages[currentIndex].src;
    if (counter) counter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
}

document.addEventListener('keydown', e => {
    if (!document.querySelector('.lightbox')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});
