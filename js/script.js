document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const overlay = document.querySelector(".menu-overlay");

    const toggleMenu = () => {
        burger.classList.toggle("active");
        nav.classList.toggle("active");
        overlay.classList.toggle("active");
    };

    burger.addEventListener("click", toggleMenu);

    overlay.addEventListener("click", toggleMenu);
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.case__item');

    const preload = (url) => {
        if (!url) return;
        const i = new Image();
        i.src = url;
    };

    items.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        const hoverSrc = item.dataset.hover || img.dataset.hover;
        if (hoverSrc) preload(hoverSrc);

        const originalSrc = img.src;

        let isHover = false;

        const setHover = () => {
            if (!hoverSrc) return;
            img.src = hoverSrc;
            isHover = true;
            img.setAttribute('data-swapped', 'true');
        };

        const unsetHover = () => {
            if (img.getAttribute('data-swapped') === 'true') {
                img.src = originalSrc;
                img.removeAttribute('data-swapped');
            }
            isHover = false;
        };

        item.addEventListener('mouseenter', setHover);
        item.addEventListener('mouseleave', unsetHover);

        item.addEventListener('focusin', setHover);
        item.addEventListener('focusout', unsetHover);

        item.addEventListener('touchstart', (e) => {
            if (!isHover) {
                e.preventDefault();
                setHover();
            }
        }, { passive: false });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider__item');
    const prevBtn = document.querySelector('.slider__nav--btn .prev');
    const nextBtn = document.querySelector('.slider__nav--btn .next');

    let current = 0;
    let autoSlide;

    function moveSlides() {
        slides.forEach((slide, i) => {
            const shift = ((i - current + slides.length) % slides.length) * 480;
            slide.style.transform = `translateX(${shift}px)`;
            slide.style.transition = 'transform 1s ease';
            slide.style.zIndex = slides.length - i;
        });
    }

    function showNext() {
        current = (current + 1) % slides.length;
        moveSlides();
    }

    function showPrev() {
        current = (current - 1 + slides.length) % slides.length;
        moveSlides();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlide = setInterval(showNext, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    nextBtn.addEventListener('click', () => {
        showNext();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        showPrev();
        startAutoSlide();
    });

    const sliderWrapper = document.querySelector('.slider__wrapper');
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);

    moveSlides();
    startAutoSlide();
});


$('.owl-carousel').owlCarousel({
    autoplay: true,
    autoplayTimeout: 6500,
    autoplaySpeed: 1000,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        500: {
            items: 1
        }
    }

})

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".overlay");
    const overlayContent = document.querySelector(".overlay-item");
    const closeBtn = document.querySelector(".close-btn");
    const sliderItems = document.querySelectorAll(".slider__item, .mobile__slider--item");
    const overlayItem = document.querySelector(".slider__item--overlay");

    const docOverlay = document.querySelector(".doc-overlay");
    const docOverlayImg = document.querySelector(".doc-overlay-img");
    const docCloseBtn = document.querySelector(".doc-close-btn");
    const nextDoc = document.querySelector(".next-doc");
    const prevDoc = document.querySelector(".prev-doc");

    const pages = ["img/docum1.svg", "img/docum2.svg", "img/docum3.svg"];
    let currentPage = 0;
    let zoomed = false;

    sliderItems.forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target.closest(".document-preview")) return;

            if (overlayItem) {
                const clonedItem = overlayItem.cloneNode(true);
                overlayContent.innerHTML = "";
                overlayContent.appendChild(clonedItem);
                overlay.style.display = "flex";
            }
        });
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    document.addEventListener("click", (e) => {
        const target = e.target.closest(".document-preview");
        if (!target) return;

        e.stopPropagation();
        currentPage = 0;
        docOverlayImg.src = pages[currentPage];
        docOverlay.style.display = "flex";
    });

    docCloseBtn.addEventListener("click", () => {
        docOverlay.style.display = "none";
        zoomed = false;
        docOverlayImg.style.transform = "scale(1)";
    });

    docOverlay.addEventListener("click", (e) => {
        if (e.target === docOverlay) {
            docOverlay.style.display = "none";
            zoomed = false;
            docOverlayImg.style.transform = "scale(1)";
        }
    });

    nextDoc.addEventListener("click", (e) => {
        e.stopPropagation();
        currentPage = (currentPage + 1) % pages.length;
        docOverlayImg.src = pages[currentPage];
    });

    prevDoc.addEventListener("click", (e) => {
        e.stopPropagation();
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        docOverlayImg.src = pages[currentPage];
    });

    docOverlayImg.addEventListener("click", (e) => {
        e.stopPropagation();
        zoomed = !zoomed;
        docOverlayImg.style.transform = zoomed ? "scale(2)" : "scale(1)";
        docOverlayImg.style.cursor = zoomed ? "zoom-out" : "zoom-in";
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("next-page")) {
            const img = e.target.closest(".slider__document").querySelector(".document-preview");
            if (!img) return;
            currentPage = (currentPage + 1) % pages.length;
            img.src = pages[currentPage];
        }

        if (e.target.classList.contains("prev-page")) {
            const img = e.target.closest(".slider__document").querySelector(".document-preview");
            if (!img) return;
            currentPage = (currentPage - 1 + pages.length) % pages.length;
            img.src = pages[currentPage];
        }
    });
});

