document.addEventListener(
    "DOMContentLoaded",
    async() => {
        const currentPage =
            window.location.pathname
            .split("/")
            .pop();

        switch (currentPage) {
            case "menu.html":
                await loadCategories();
                break;

            case "catalog.html":
                await loadCategoryProducts();
                break;
        }
    }
);

async function loadCategories() {
    const container =
        document.getElementById(
            "categoriesContainer"
        );

    if (!container) {
        return;
    }

    const categories =
        await getCategories();

    container.innerHTML = "";

    categories.forEach(category => {
        container.innerHTML += `
            <a
                href="catalog.html?id=${category.id}"
                class="category-card"
            >

                <img
                    src="${category.image}"
                    alt="${category.name}"
                >

                <div class="category-content">

                    <h3>
                        ${category.name}
                    </h3>

                    <p>
                        ${category.description}
                    </p>

                </div>

            </a>
        `;
    });
}

async function loadCategoryProducts() {
    const container =
        document.getElementById(
            "productsContainer"
        );

    if (!container) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    const categoryId =
        params.get("id");

    const products =
        await getProducts();

    let filteredProducts =
        products;

    if (categoryId) {
        filteredProducts =
            products.filter(
                product =>
                product.category === categoryId
            );
    }

    renderProducts(
        filteredProducts,
        container
    );

    initializeFilters(
        products,
        container
    );
}


function renderProducts(
    products,
    container
) {
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML =
            `
            <div class="empty-state">

                <h3>
                    Nu există produse
                </h3>

            </div>
        `;

        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <article class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-content">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <div class="product-footer">

                        <span class="price">
                            ${product.price} MDL
                        </span>

                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-primary"
                        >
                            Detalii
                        </a>

                    </div>

                </div>

            </article>
        `;
    });
}

function initializeFilters(
    products,
    container
) {
    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );

    if (!buttons.length) {
        return;
    }

    buttons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                buttons.forEach(btn =>
                    btn.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                const category =
                    button.dataset.category;

                if (category === "all") {
                    renderProducts(
                        products,
                        container
                    );

                    return;
                }

                const filtered =
                    products.filter(
                        product =>
                        product.category === category
                    );

                renderProducts(
                    filtered,
                    container
                );
            }
        );
    });
}