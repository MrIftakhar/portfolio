/***************************************************
==================== JS INDEX ======================
****************************************************
01. Intersection Observer / Scroll Reveal
02. PreLoader Js
03. Custom Cursor
04. Swiper Sliders
05. Mobile Menu & Accordion
06. Offcanvas Menu
07. Search Overlay
08. Header Sticky & Back To Top
09. Tabs, FAQ & Driver Sliders
10. Dynamic Google Sheet Fetcher (Work Experience)
11. Navbar, Scroll & Counter Observers
12. Form Submissions (Newsletter & Contact)
****************************************************/

(function ($) {
    "use strict";

    // 01. Intersection Observer for Steps
    if ('IntersectionObserver' in window) {
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

    // 02. Preloader
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loading-window');
        if (loader) {
            loader.style.display = 'none';
        }
    });

    // 03. Custom Cursor JS
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");

    if (cursor && follower) {
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

        function animateFollower() {
            followerX += (mouseX - followerX) / 8;
            followerY += (mouseY - followerY) / 8;

            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";

            requestAnimationFrame(animateFollower);
        }
        animateFollower();
    }

    // 04. Swiper Sliders
    if (typeof Swiper !== 'undefined') {
        // Brand Carousel
        if ($('.brandSwiper').length) {
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
        }

        // About Swiper Slider
        if ($('.about-swiper-slider').length) {
            var aboutSwiper = new Swiper(".about-swiper-slider", {
                centeredSlides: true,
                slidesPerView: 1,
                grabCursor: true,
                freeMode: false,
                loop: true,
                mousewheel: false,
                keyboard: { enabled: true },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                breakpoints: {
                    640: { slidesPerView: 1.25, spaceBetween: 20 },
                    1024: { slidesPerView: 2, spaceBetween: 20 }
                }
            });
        }

        // Expert Drivers Swiper
        if ($('.expert-drivers-slider').length) {
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
                    900: { slidesPerView: 2 },
                    600: { slidesPerView: 1 }
                }
            });
        }
    }

    // 05. Mobile Menu & Submenu Dropdowns
    var stMenuWrap = $('.mobile-menu-active > ul').clone();
    var stSideMenu = $('.offcanvas-menu nav');
    stSideMenu.append(stMenuWrap);

    stSideMenu.find('.submenu, .mega-menu, .sub-submenu').each(function () {
        if (!$(this).siblings('.menu-close').length) {
            $(this)
                .parent()
                .addClass('has-dropdown')
                .append('<button class="menu-close"><i class="ri-arrow-right-s-line"></i></button>');
        }
    });

    $('.offcanvas-menu').on('click', 'button.menu-close, li.has-dropdown > a', function (e) {
        e.preventDefault();
        const parentLi = $(this).closest('li');
        const submenu = parentLi.children('.submenu, .mega-menu, .sub-submenu');

        if (!parentLi.hasClass('active')) {
            parentLi.siblings('.active').removeClass('active').children('.submenu, .mega-menu, .sub-submenu').slideUp(300);
            parentLi.addClass('active');
            submenu.slideDown(300);
        } else {
            parentLi.removeClass('active');
            submenu.slideUp(300);
        }
    });

    // 06. Off-canvas Menu
    $(".offcanvas-open-btn").on("click", function () {
        $(".offcanvas-area").addClass("opened");
        $(".body-overlay").addClass("opened");
    });
    $(".offcanvas-close-btn, .body-overlay").on("click", function () {
        $(".offcanvas-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    // 07. Search Overlay
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

    // 08. Header Sticky & Back to Top
    $(window).on('scroll', function () {
        const header = $('.sticky-header');
        if ($(window).scrollTop() > 200) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }

        const backToTopButton = $('.back-to-top');
        if ($(window).scrollTop() > 300) {
            backToTopButton.addClass('show');
        } else {
            backToTopButton.removeClass('show');
        }
    });

    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    // 09. Tabs & FAQ Accordion
    $(".tab-btn").on("click", function () {
        $(".tab-btn").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(this).addClass("active");
        var target = $(this).data("target");
        $(target).addClass("active");
    });

    $(".wcus-tab-list li").on("click", function () {
        var target = $(this).data("target");
        $(".wcus-tab-list li").removeClass("active");
        $(this).addClass("active");
        $(".wcus-content").removeClass("active");
        $(target).addClass("active");
    });

    $(".wcus-tab-list li").hover(function () {
        $(this).trigger("click");
    });

    $(".faq-title").on("click", function () {
        var parent = $(this).closest(".faq-item");
        if (!parent.hasClass("active")) {
            $(".faq-item").removeClass("active").find(".faq-content").slideUp();
            $(".faq-item .faq-icon").html('<i class="ri-add-line"></i>');

            parent.addClass("active").find(".faq-content").slideDown();
            parent.find(".faq-icon").html('<i class="ri-subtract-line"></i>');
        } else {
            parent.removeClass("active").find(".faq-content").slideUp();
            parent.find(".faq-icon").html('<i class="ri-add-line"></i>');
        }
    });

})(jQuery);


/* ==========================================================================
   DOM Content Loaded Event Handler (Vanilla JavaScript Tasks)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {

    // 10. Dynamic Google Sheet Experience Data Fetcher
    const SHEET_ID = '1-BA9lPj4CwIn5eIiNXFsPA6ZGivdY5FtQezdI2IP4GM';
    const SHEET_TITLE = 'work experence';
    const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_TITLE)}`;

    async function fetchExperienceData() {
        const container = document.getElementById('experience-container');
        if (!container) return; // Exit gracefully if element is not on page

        try {
            const response = await fetch(FULL_URL);
            const text = await response.text();
            
            // Extract pure JSON payload from Google gviz response
            const json = JSON.parse(text.substring(47, text.length - 2));
            const rows = json.table.rows;
            
            container.innerHTML = ''; // Clear loading spinner

            rows.forEach((row, index) => {
                const dateRange = row.c[0] ? row.c[0].v : '';
                const company = row.c[1] ? row.c[1].v : '';
                const role = row.c[2] ? row.c[2].v : '';
                
                // Responsibilities separated by pipe '|'
                const bulletItems = row.c[3] ? row.c[3].v.split('|') : [];
                // Skills separated by comma ','
                const skills = row.c[4] ? row.c[4].v.split(',') : [];

                const isLatestJob = (index === 0);

                const bulletListHTML = bulletItems.map(item => `<li>${item.trim()}</li>`).join('');
                const skillsHTML = skills.map(skill => `<span class="skill-badge">${skill.trim()}</span>`).join('');

                const cardHTML = `
                    <div class="experience-card">
                        <div class="date-range mb-2">${dateRange}</div>
                        
                        <div class="company-title-wrapper mb-1">
                            <h2 class="company-name">${company}</h2>
                            ${isLatestJob ? '<span class="glowing-dot ms-2" title="Current Role"></span>' : ''}
                        </div>

                        <div class="job-role">${role}</div>

                        <ul class="bullet-list">
                            ${bulletListHTML}
                        </ul>

                        <div class="skills-wrapper">
                            ${skillsHTML}
                        </div>
                    </div>
                `;

                container.insertAdjacentHTML('beforeend', cardHTML);
            });

        } catch (error) {
            console.error('Error fetching Google Sheet data:', error);
            if (container) {
                container.innerHTML = `
                    <div class="alert alert-danger text-center">Failed to load experience records. Please verify Google Sheet link permissions.</div>
                `;
            }
        }
    }

    fetchExperienceData();


    // 11. Navbar Active State, Scroll Styling & Counters
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Projects Counter Observer
    const runCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const speed = 2000;
        const increment = target / (speed / 16);
        let current = 0;

        const update = () => {
            current += increment;
            if (current < target) {
                const display = isDecimal ? current.toFixed(1) : Math.ceil(current);
                el.innerHTML = display + '<span class="count-suffix">' + suffix + '</span>';
                requestAnimationFrame(update);
            } else {
                const display = isDecimal ? target.toFixed(1) : target;
                el.innerHTML = display + '<span class="count-suffix">' + suffix + '</span>';
            }
        };
        update();
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.count-num').forEach(n => counterObserver.observe(n));
    }

    // Auto-update Footer Year
    const footerYearEl = document.getElementById('footerYear');
    if (footerYearEl) {
        footerYearEl.textContent = new Date().getFullYear();
    }


    // 12. Form Submission Handlers

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : '';

            if (email && /\S+@\S+\.\S+/.test(email)) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Contact Form (Formspree AJAX)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const statusEl = document.getElementById('contactFormStatus');

            if (statusEl) {
                statusEl.textContent = '';
                statusEl.classList.remove('success', 'error');
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    if (statusEl) {
                        statusEl.textContent = "Thanks! Your message has been sent.";
                        statusEl.classList.add('success');
                    }
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        const message = (data && data.errors && data.errors.length)
                            ? data.errors.map(err => err.message).join(', ')
                            : "Something went wrong. Please try again or email me directly.";
                        throw new Error(message);
                    });
                }
            })
            .catch(err => {
                if (statusEl) {
                    statusEl.textContent = err.message || "Something went wrong. Please try again or email me directly.";
                    statusEl.classList.add('error');
                }
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }
            });
        });
    }

});