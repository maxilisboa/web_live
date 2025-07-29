document.addEventListener('DOMContentLoaded', function() {
    // Manejo del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Navegación suave con offset para menú fijo
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70; // Ajusta según la altura de tu navbar
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manejo de las FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            // Cerrar todas las FAQ activas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-question i');
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            });
            // Abrir la FAQ seleccionada
            if (!isActive) {
                faqItem.classList.add('active');
                const icon = question.querySelector('i');
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            try {
                const formData = new FormData(this);
                const response = await fetch('process-form.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    alert('Gracias por contactarnos. Te responderemos a la brevedad.');
                    contactForm.reset();
                } else {
                    alert('Hubo un error al enviar el formulario: ' + result.message);
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
            }
        });

        // Prevenir spam en el formulario
        let submitCount = 0;
        const maxSubmits = 3;
        const submitDelay = 60000; // 1 minuto
        contactForm.addEventListener('submit', function(e) {
            if (submitCount >= maxSubmits) {
                e.preventDefault();
                alert('Has enviado demasiados mensajes. Por favor, espera un momento antes de intentar nuevamente.');
                setTimeout(() => {
                    submitCount = 0;
                }, submitDelay);
            } else {
                submitCount++;
            }
        });
    }

    // Animación de elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Elementos a animar
    const animatedElements = document.querySelectorAll('.value-card, .service-card, .faq-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Validación de formulario en tiempo real
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });

    // Efecto Parallax para el hero
    window.addEventListener('scroll', () => {
        requestAnimationFrame(parallaxEffect);
    });
    function parallaxEffect() {
        const parallax = document.querySelector('.hero-parallax');
        if (parallax) {
            const scrolled = window.pageYOffset;
            const limit = parallax.offsetTop + parallax.offsetHeight;
            if (scrolled <= limit) {
                parallax.style.transform = `translateY(${scrolled * 0.4}px)`; // Velocidad del parallax
            }
        }
    }
    parallaxEffect();

    // Carrusel
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : null;
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = dotsNav ? Array.from(dotsNav.children) : null;
    if (track && slides && nextButton && prevButton && dotsNav && dots) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
        let currentSlide = 0;
        const slideInterval = 5000;
        function moveToSlide(track, currentIndex, targetIndex) {
            if (targetIndex >= slides.length) targetIndex = 0;
            if (targetIndex < 0) targetIndex = slides.length - 1;
            track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
            slides[currentIndex].classList.remove('active');
            slides[targetIndex].classList.add('active');
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
            currentSlide = targetIndex;
        }
        nextButton.addEventListener('click', () => {
            moveToSlide(track, currentSlide, currentSlide + 1);
        });
        prevButton.addEventListener('click', () => {
            moveToSlide(track, currentSlide, currentSlide - 1);
        });
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('span');
            if (!targetDot) return;
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            moveToSlide(track, currentSlide, targetIndex);
        });
        setInterval(() => {
            moveToSlide(track, currentSlide, currentSlide + 1);
        }, slideInterval);
        slides[0].classList.add('active');
        dots[0].classList.add('active');
    }
});