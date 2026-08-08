/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. Mobile Menu Js
03. Offcanvas Menu Js
04. Search Overlay Js
05. Header Sticky Js
06. Back To Top Js
07. Custom Cursor
****************************************************/

(function ($) {
    "use strict";
    if ('IntersectionObserver' in window) {
        // Native IntersectionObserver for modern browsers
        $('.step').each(function () {
            let step = this;
            let observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('step--visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            observer.observe(step);
        });
    } else {
        // Fallback for older browsers: reveal all on scroll
        function revealSteps() {
            $('.step').each(function () {
                var $this = $(this);
                if ($this.offset().top < $(window).scrollTop() + $(window).height() - 40) {
                    $this.addClass('step--visible');
                }
            });
        }
        $(window).on('scroll resize', revealSteps);
        revealSteps();
    }
    // 01. Preloader Menu Js
    ////////////////////////////////////////////////////
    // mobile menu 
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loading-window');
        if (loader) {
            loader.style.display = 'none';
        }
    });
    ////////////////////////////////////////////////////
    // 21. Custom Cursor JS
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });


    ////////////////////////////////////////////////////
    // 08. Swiper Sliders
    // Brand Carousel
    var brandSwiper = new Swiper(".brandSwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 1000,
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 5, spaceBetween: 30 }
        }
    });

    // About Swiper Slider
    var aboutSwiper = new Swiper(".about-swiper-slider", {
        centeredSlides: true,
        slidesPerView: 1,
        grabCursor: true,
        freeMode: false,
        loop: true,
        mousewheel: false,
        keyboard: {
            enabled: true
        },

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        breakpoints: {
            640: {
                slidesPerView: 1.25,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });



    // Smooth follower movement
    function animateFollower() {
        followerX += (mouseX - followerX) / 8;
        followerY += (mouseY - followerY) / 8;

        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // 02. Mobile Menu Js
    ////////////////////////////////////////////////////
    // mobile menu 

    var stMenuWrap = $('.mobile-menu-active > ul').clone();
    var stSideMenu = $('.offcanvas-menu nav');
    stSideMenu.append(stMenuWrap);

    // Add toggle buttons for all submenu/megamenu
    stSideMenu.find('.submenu, .mega-menu, .sub-submenu').each(function () {
        if (!$(this).siblings('.menu-close').length) {
            $(this)
                .parent()
                .addClass('has-dropdown') // optional class
                .append('<button class="menu-close"><i class="ri-arrow-right-s-line"></i></button>');
        }
    });

    // Accordion toggle logic
    $('.offcanvas-menu').on('click', 'button.menu-close, li.has-dropdown > a', function (e) {
        e.preventDefault();

        const parentLi = $(this).closest('li');
        const submenu = parentLi.children('.submenu, .mega-menu, .sub-submenu');

        if (!parentLi.hasClass('active')) {
            // Close siblings at same level
            parentLi
                .siblings('.active')
                .removeClass('active')
                .children('.submenu, .mega-menu, .sub-submenu')
                .slideUp(300);

            // Open current
            parentLi.addClass('active');
            submenu.slideDown(300);
        } else {
            // Close current
            parentLi.removeClass('active');
            submenu.slideUp(300);
        }
    });

    ////////////////////////////////////////////////////
    // 03. Off-canvas Menu Js
    // offcanvas
    $(".offcanvas-open-btn").on("click", function () {
        $(".offcanvas-area").addClass("opened");
        $(".body-overlay").addClass("opened");
    });
    $(".offcanvas-close-btn").on("click", function () {
        $(".offcanvas-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    // // Body overlay Js
    $(".body-overlay").on("click", function () {
        $(".offcanvas-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });


    ////////////////////////////////////////////////////
    // 04. Search Overlay Js
    function initializeSearchOverlay() {
        const searchIcon = $(".search-icon");
        const searchOverlay = $(".search-overlay");
        const closeSearch = $(".close-search");

        searchIcon.on("click", function (e) {
            e.preventDefault();
            searchOverlay.css("display", "flex");
        });

        closeSearch.on("click", function (e) {
            e.preventDefault();
            searchOverlay.css("display", "none");
        });

        $(window).on("click", function (event) {
            if ($(event.target).is(searchOverlay)) {
                searchOverlay.css("display", "none");
            }
        });
    }
    initializeSearchOverlay();

    ////////////////////////////////////////////////////
    // 05. Header Sticky Js
    $(window).on('scroll', function () {
        const header = $('.sticky-header');
        if ($(window).scrollTop() > 200) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }
    });

    ////////////////////////////////////////////////////
    // 06. Back To Top Js
    const backToTopButton = $('.back-to-top');

    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 300) {
            backToTopButton.addClass('show');
        } else {
            backToTopButton.removeClass('show');
        }
    });

    backToTopButton.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    $(".tab-btn").on("click", function () {
        // remove active class
        $(".tab-btn").removeClass("active");
        $(".tab-pane").removeClass("active");

        // add active class to clicked button
        $(this).addClass("active");
        var target = $(this).data("target");
        $(target).addClass("active");
    });

    //Why Choose Us Js
    $(".wcus-tab-list li").on("click", function () {
        var target = $(this).data("target");

        // left tab active class
        $(".wcus-tab-list li").removeClass("active");
        $(this).addClass("active");

        // right content switch
        $(".wcus-content").removeClass("active");
        $(target).addClass("active");
    });

    // optional hover effect (hover = click)
    $(".wcus-tab-list li").hover(function () {
        $(this).trigger("click");
    });

    //FAQ JS
    $(".faq-title").on("click", function () {
        var parent = $(this).closest(".faq-item");

        if (!parent.hasClass("active")) {
            // close other items
            $(".faq-item").removeClass("active").find(".faq-content").slideUp();
            $(".faq-item .faq-icon").html('<i class="ri-add-line"></i>');

            // open clicked item
            parent.addClass("active").find(".faq-content").slideDown();
            parent.find(".faq-icon").html('<i class="ri-subtract-line"></i>');
        } else {
            parent.removeClass("active").find(".faq-content").slideUp();
            parent.find(".faq-icon").html('<i class="ri-add-line"></i>');
        }
    });
    
    var expertDriversSwiper = new Swiper('.expert-drivers-slider', {
        slidesPerView: 3,
        spaceBetween: 32,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            900: {
                slidesPerView: 2
            },
            600: {
                slidesPerView: 1
            }
        }
    });

})(jQuery);

// Newsletter form validation and fake submit
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email && /\S+@\S+\.\S+/.test(email)) {
                alert('Thank you for subscribing!');
                form.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});