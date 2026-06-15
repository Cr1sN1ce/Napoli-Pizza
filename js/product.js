document.addEventListener(
    "DOMContentLoaded",
    async() => {
        await loadProduct();
    }
);

async function loadProduct() {
    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        Number(
            params.get("id")
        );

    if (!productId) {
        showError(
            "Produsul nu a fost găsit."
        );

        return;
    }

    const products =
        await getProducts();

    const product =
        products.find(
            item =>
            item.id === productId
        );

    if (!product) {
        showError(
            "Produsul nu există."
        );

        return;
    }

    updateProductPage(
        product
    );

    loadRelatedProducts(
        product,
        products
    );
}


function updateProductPage(
    product
) {
    const title =
        document.getElementById(
            "productTitle"
        );

    const image =
        document.getElementById(
            "productImage"
        );

    const description =
        document.getElementById(
            "productDescription"
        );

    const price =
        document.getElementById(
            "productPrice"
        );

    const weight =
        document.getElementById(
            "productWeight"
        );

    if (title) {
        title.textContent =
            product.name;
    }

    if (image) {
        image.src =
            product.image;

        image.alt =
            product.name;
    }

    if (description) {
        description.textContent =
            product.description;
    }

    if (price) {
        price.textContent =
            `${product.price} MDL`;
    }

    if (weight) {
        weight.textContent =
            `${product.weight} g`;
    }

    document.title =
        `${product.name} | Napoli Pizza Cahul`;
}

function loadRelatedProducts(
    currentProduct,
    products
) {
    const container =
        document.getElementById(
            "relatedProducts"
        );

    if (!container) {
        return;
    }

    const relatedProducts =
        products
        .filter(
            product =>
            product.category === currentProduct.category &&
            product.id !== currentProduct.id
        )
        .slice(0, 4);

    container.innerHTML = "";

    if (
        relatedProducts.length === 0
    ) {
        return;
    }

    relatedProducts.forEach(
        product => {
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

                        <span class="price">
                            ${product.price} MDL
                        </span>

                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-primary"
                        >
                            Vezi Produsul
                        </a>

                    </div>

                </article>
            `;
        }
    );
}

function showError(
    message
) {
    const container =
        document.querySelector(
            ".product-section"
        );

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="empty-state">

            <h2>
                ${message}
            </h2>

            <a
                href="menu.html"
                class="btn btn-primary"
            >
                Înapoi la meniu
            </a>

        </div>
    `;
}