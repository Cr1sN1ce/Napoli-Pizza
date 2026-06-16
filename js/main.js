document.addEventListener(
    "DOMContentLoaded",
    async() => {
        initializeHeader();

        await loadFeaturedProducts();
    }
);

function initializeHeader() {
    const header =
        document.querySelector(".header");

    if (!header) {
        return;
    }

    window.addEventListener(
        "scroll",
        () => {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );
        }
    );
}
async function loadFeaturedProducts() {
    const container =
        document.getElementById(
            "featuredProducts"
        );

    if (!container) {
        return;
    }

    const products =
        await getProducts();

    const featured =
        products.filter(
            product =>
            product.featured === true
        );

    container.innerHTML = "";

    featured.slice(0, 4).forEach(
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

                        <p>
                            ${product.description}
                        </p>

                        <div class="product-footer">

                            <span class="price">
                                ${product.price} MDL
                            </span>

                            <a
                                href="pages/product.html?id=${product.id}"
                                class="btn btn-primary"
                            >
                                Vezi
                            </a>

                        </div>

                    </div>

                </article>
            `;
        }
    );
}
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
});
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileMenu.classList.remove("active");
    });
});