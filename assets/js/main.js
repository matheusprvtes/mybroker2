document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Transform hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // --- 3. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    mobileToggle.click();
                }
                
                // Calculate offset for header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // --- 5. Lazy Loading Images (Intersection Observer) ---
    const lazyImages = document.querySelectorAll('img.lazyload');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If we had real data-src, we would swap it here.
                    // For now, we just add a class to animate if wanted.
                    img.classList.add('loaded');
                    img.style.opacity = 1;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            img.style.opacity = 0; // initial state
            img.style.transition = 'opacity 0.5s ease-in-out';
            imageObserver.observe(img);
        });
    }

    // --- 6. Form Submission Simulation ---
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide the button and show loading or directly success
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Enviando...';
            btn.disabled = true;
            
            // Simulate API Call
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                const successMsg = form.querySelector('.form-success');
                successMsg.classList.remove('d-none');
                
                setTimeout(() => {
                    successMsg.classList.add('d-none');
                }, 5000);
            }, 1500);
        });
    }

});
