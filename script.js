/**
 * script.js - Vanilla JS and jQuery combination
 */

$(document).ready(function() {
    // 1. Feather Icons Initialization
    feather.replace();

    // 3. Navbar Scroll Effect & Mobile Menu
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#navbar').addClass('glass py-4 bg-dark-bg').removeClass('bg-transparent py-6');
        } else {
            $('#navbar').removeClass('glass py-4 bg-dark-bg').addClass('bg-transparent py-6');
        }
    });

    $('#mobile-menu-btn').on('click', function() {
        $('#mobile-menu').slideToggle();
    });
    $('.mobile-link').on('click', function() {
        $('#mobile-menu').slideUp();
    });

    // 4. Typing Animation (Vanilla JS) Only runs if exists on page
    const typeText = document.getElementById('type-text');
    if (typeText) {
        const words = ['Aspiring Software Developer', 'Problem Solver', 'Creative Thinker'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeText.innerText = currentWord.substring(0, charIndex--);
            } else {
                typeText.innerText = currentWord.substring(0, charIndex++);
            }

            let typeSpeed = 100;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(typeLoop, typeSpeed);
        }
        typeLoop();
    }

    // 5. Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Target progress bars within standard glass frames
                if(entry.target.classList.contains('skills-container')) {
                    setTimeout(() => {
                        $('.progress-bar-fill').each(function() {
                            $(this).css('width', $(this).attr('data-width'));
                        });
                    }, 300);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .skills-container').forEach(el => observer.observe(el));

    // Project Filtering
    if ($('.filter-btn').length) {
        $('.filter-btn').on('click', function() {
            let filter = $(this).attr('data-filter');
            
            // update classes
            $('.filter-btn').removeClass('bg-primary text-white border-primary active').addClass('border-white/20 text-gray-300 hover:border-primary hover:text-primary');
            $(this).removeClass('border-white/20 text-gray-300 hover:border-primary hover:text-primary').addClass('bg-primary text-white border-primary active');

            // show/hide project cards
            if (filter === 'all') {
                $('.project-card').fadeIn(300);
            } else {
                $('.project-card').hide();
                $('.project-card[data-category="' + filter + '"]').fadeIn(300);
            }
        });
    }

    // Removed mock form submit to route payloads correctly via native FormSubmit POST.
    
    // Setup current year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
