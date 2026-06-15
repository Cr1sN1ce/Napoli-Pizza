document.addEventListener(
    "DOMContentLoaded",
    () => {
        initializeGallery();
    }
);

/* ===========================
   GALLERY
=========================== */

let currentIndex = 0;

let galleryImages = [];

function initializeGallery() {
    galleryImages =
        Array.from(
            document.querySelectorAll(
                ".gallery-item img"
            )
        );

    if (
        galleryImages.length === 0
    ) {
        return;
    }

    galleryImages.forEach(
        (image, index) => {
            image.addEventListener(
                "click",
                () => {
                    openLightbox(
                        index
                    );
                }
            );
        }
    );

    initializeKeyboardControls();
}

/* ===========================
   OPEN LIGHTBOX
=========================== */

function openLightbox(
    index
) {
    currentIndex =
        index;

    const existing =
        document.querySelector(
            ".lightbox"
        );

    if (existing) {
        existing.remove();
    }

    const lightbox =
        document.createElement(
            "div"
        );

    lightbox.className =
        "lightbox";

    lightbox.innerHTML =
        `
        <div class="lightbox-overlay">

            <button
                class="lightbox-close"
            >
                ×
            </button>

            <button
                class="lightbox-prev"
            >
                ❮
            </button>

            <img
                class="lightbox-image"
                src="${galleryImages[currentIndex].src}"
                alt=""
            >

            <button
                class="lightbox-next"
            >
                ❯
            </button>

        </div>
    `;

    document.body.appendChild(
        lightbox
    );

    document.body.style.overflow =
        "hidden";

    initializeLightboxEvents();
}

function initializeLightboxEvents() {
    const lightbox =
        document.querySelector(
            ".lightbox"
        );

    const closeButton =
        document.querySelector(
            ".lightbox-close"
        );

    const previousButton =
        document.querySelector(
            ".lightbox-prev"
        );

    const nextButton =
        document.querySelector(
            ".lightbox-next"
        );

    closeButton.addEventListener(
        "click",
        closeLightbox
    );

    previousButton.addEventListener(
        "click",
        showPreviousImage
    );

    nextButton.addEventListener(
        "click",
        showNextImage
    );

    lightbox.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                lightbox
            ) {
                closeLightbox();
            }
        }
    );
}

/* ===========================
   CLOSE
=========================== */

function closeLightbox() {
    const lightbox =
        document.querySelector(
            ".lightbox"
        );

    if (lightbox) {
        lightbox.remove();
    }

    document.body.style.overflow =
        "";
}

/* ===========================
   NEXT
=========================== */

function showNextImage() {
    currentIndex++;

    if (
        currentIndex >=
        galleryImages.length
    ) {
        currentIndex = 0;
    }

    updateLightboxImage();
}

/* ===========================
   PREVIOUS
=========================== */

function showPreviousImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex =
            galleryImages.length - 1;
    }

    updateLightboxImage();
}

/* ===========================
   UPDATE IMAGE
=========================== */

function updateLightboxImage() {
    const image =
        document.querySelector(
            ".lightbox-image"
        );

    if (!image) {
        return;
    }

    image.src =
        galleryImages[
            currentIndex
        ].src;
}

function initializeKeyboardControls() {
    document.addEventListener(
        "keydown",
        event => {
            const lightbox =
                document.querySelector(
                    ".lightbox"
                );

            if (!lightbox) {
                return;
            }

            switch (event.key) {
                case "Escape":
                    closeLightbox();
                    break;

                case "ArrowLeft":
                    showPreviousImage();
                    break;

                case "ArrowRight":
                    showNextImage();
                    break;
            }
        }
    );
}