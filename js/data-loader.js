async function loadJson(path) {
    try {
        const response =
            await fetch(path);

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            `Ошибка загрузки ${path}:`,
            error
        );

        return [];
    }
}

async function getProducts() {
    return await loadJson(
        "../data/products.json"
    );
}
async function getCategories() {
    return await loadJson(
        "../data/categories.json"
    );
}

async function getTestimonials() {
    return await loadJson(
        "../data/testimonials.json"
    );
}