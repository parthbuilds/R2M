
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the Thumbnail Swiper first
    var fullWidthThumbnails = new Swiper("#fullWidthThumbnails", {
        spaceBetween: 10,
        slidesPerView: 4, // Default number of visible thumbnails
        freeMode: true, // Allows dragging thumbnails freely
        watchSlidesProgress: true, // Tracks progress for active state
        breakpoints: {
            640: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 6,
            },
            1024: {
                slidesPerView: 7, // Adjust number of visible thumbnails for larger screens
            },
            1200: {
                slidesPerView: 8, // More thumbnails on very large screens
            }
        }
    });

    // Initialize the Main Image Swiper (using your .myFullScreenSwiper class)
    var fullWidthMainSwiper = new Swiper(".myFullScreenSwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true, // Enable infinite looping
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".full-width-image-carousel .swiper-pagination", // Target pagination within the carousel section
            clickable: true,
        },
        navigation: {
            nextEl: ".full-width-image-carousel .swiper-button-next", // Target nav buttons within the carousel section
            prevEl: ".full-width-image-carousel .swiper-button-prev",
        },
        thumbs: {
            swiper: fullWidthThumbnails, // Connect to the thumbnail Swiper
        },
        // Responsive breakpoints - crucial for responsiveness, as in your original script
        breakpoints: {
            // When window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // When window width is >= 768px (tablets)
            768: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // When window width is >= 1024px (desktops)
            1024: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

    // If you have other Swiper initializations on your page (like the service carousel),
    // you should keep them here. For example:
    // var serviceSwiper = new Swiper(".service-carousel", {
    //     slidesPerView: 1,
    //     spaceBetween: 30,
    //     loop: true,
    //     autoplay: {
    //         delay: 3000,
    //         disableOnInteraction: false,
    //     },
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    //     navigation: {
    //         nextEl: ".swiper-nav.swiper-next",
    //         prevEl: ".swiper-nav.swiper-prev",
    //     },
    //     breakpoints: {
    //         576: { slidesPerView: 2 },
    //         768: { slidesPerView: 3 },
    //         992: { slidesPerView: 4 },
    //         1200: { slidesPerView: 4 },
    //     },
    // });
});
