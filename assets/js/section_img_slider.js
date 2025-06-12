
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize the image slider within the "about-section-2" component
            // Targeting by the new ID #aboutImageSlider
            var aboutImageSwiper = new Swiper("#aboutImageSlider", {
                slidesPerView: 1, // Show one slide at a time
                spaceBetween: 0, // No space between slides for a seamless look
                loop: true, // Enable infinite looping of slides
                autoplay: {
                    delay: 4000, // Autoplay every 4 seconds
                    disableOnInteraction: false, // Continue autoplay even after user interaction
                },
                // Intentionally no pagination or navigation elements here as per requirement
                breakpoints: {
                    // Responsive breakpoints for this specific slider (single slide view)
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }
            });

            // Initialize the existing full-screen Swiper (if you still have this on your page)
            // Ensure this targets a div with class "myFullScreenSwiper" in your HTML
            var fullScreenSwiper = new Swiper(".myFullScreenSwiper", {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }
            });

            // Initialize the existing service carousel (if it's not already initialized elsewhere)
            // Ensure this targets the correct service carousel if you have multiple.
            // Assuming 'service-carousel' is the class for the section you provided.
            var serviceSwiper = new Swiper(".service-carousel", {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination", // This might need a unique class if there are multiple paginations
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-nav.swiper-next", // Use the specific classes from your provided section
                    prevEl: ".swiper-nav.swiper-prev",
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                },
            });
        });