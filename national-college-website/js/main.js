/**
 * Main JavaScript File for The National College Basavanagudi
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header Implementation ---
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check and event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);


    // --- Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');

            // Change icon based on state
            const icon = mobileToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated to keep the state
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-up class
    animatedElements.forEach(el => observer.observe(el));


    // --- Start initial animations for elements already in viewport on load ---
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
    }, 100);

    // --- Modal Logic ---
    const modal = document.getElementById('apply-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const applyButtons = document.querySelectorAll('a[href="#apply"]');

    // Open modal
    applyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to #apply
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal via button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside the container
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission (prevent default refresh for demo)
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would send data to a backend

            // Show success styling temporarily
            const submitBtn = applicationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Application Sent! <i class="fas fa-check"></i>';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.style.color = '#fff';

            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';

                // Reset form
                applicationForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 2500);
        });
    }
    // --- Virtual Tour Logic ---
    const tourModal = document.getElementById('tour-modal');
    const closeTourBtn = document.getElementById('close-tour');
    const tourButtons = document.querySelectorAll('a[href="#tour"]');
    const tourSlidesContainer = document.getElementById('tour-slides');
    const tourIndicatorsContainer = document.getElementById('tour-indicators');
    const tourPrevBtn = document.getElementById('tour-prev');
    const tourNextBtn = document.getElementById('tour-next');

    const tourImages = [
        'assets/images/tour/media__1772691081725.jpg',
        'assets/images/tour/media__1772691081848.jpg',
        'assets/images/tour/media__1772691081910.jpg',
        'assets/images/tour/media__1772691081956.jpg',
        'assets/images/tour/media__1772691082060.jpg'
    ];

    let currentSlide = 0;
    let tourInitialized = false;

    function initTour() {
        if (tourInitialized) return;

        tourImages.forEach((src, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `tour-slide ${index === 0 ? 'active' : ''}`;
            const img = document.createElement('img');
            img.src = src;
            img.alt = `College Tour Image ${index + 1}`;
            slide.appendChild(img);
            tourSlidesContainer.appendChild(slide);

            // Create dot
            const dot = document.createElement('div');
            dot.className = `tour-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            tourIndicatorsContainer.appendChild(dot);
        });

        tourInitialized = true;
    }

    function goToSlide(index) {
        const slides = document.querySelectorAll('.tour-slide');
        const dots = document.querySelectorAll('.tour-dot');

        if (slides.length === 0) return;

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Open tour modal
    tourButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            initTour();
            tourModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close tour modal
    if (closeTourBtn) {
        closeTourBtn.addEventListener('click', () => {
            tourModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Next/Prev Buttons
    if (tourPrevBtn) {
        tourPrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (tourNextBtn) {
        tourNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === tourModal) {
            tourModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
