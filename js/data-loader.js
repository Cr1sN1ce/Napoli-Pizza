const isInPages = window.location.pathname.includes('/pages/');
const assetPrefix = isInPages ? '../' : '';

async function loadJson(path) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Ошибка загрузки ${path}:`, error);
        return [];
    }
}

function fixImagePaths(products) {
    return products.map(p => ({
        ...p,
        image: p.image.replace(/^(\.\.\/)?assets\//, assetPrefix + 'assets/')
    }));
}

async function getProducts() {
    const data = await loadJson(isInPages ? '../data/products.json' : 'data/products.json');
    return fixImagePaths(data);
}

async function getCategories() {
    return await loadJson(isInPages ? '../data/categories.json' : 'data/categories.json');
}

async function getTestimonials() {
    return await loadJson(isInPages ? '../data/testimonials.json' : 'data/testimonials.json');
}
