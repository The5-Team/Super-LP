// Add interactivity and tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling and card interactions
    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#ff6b6b';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#42b883';
        });
    });

    // CTA button click tracking
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track which benefit was clicked
            const benefitCard = this.closest('.benefit-card');
            const benefitTitle = benefitCard ? benefitCard.querySelector('.benefit-title')?.textContent : 'Footer CTA';
            
            // Console log for debugging (remove in production)
            console.log('CTA clicked for:', benefitTitle);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Optional: Add analytics tracking here
            // gtag('event', 'click', {
            //     event_category: 'CTA',
            //     event_label: benefitTitle
            // });
        });
    });

    // Add scroll animations for benefit cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe benefit cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add urgency timer (optional)
    function updateUrgencyTimer() {
        const urgencyElements = document.querySelectorAll('.urgency-text');
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const timeLeft = endOfDay - now;
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // You can uncomment this to add a countdown timer
        // urgencyElements.forEach(element => {
        //     if (element.textContent.includes('Time-Sensitive')) {
        //         element.innerHTML = `🕐 <strong>Time-Sensitive:</strong> Only ${hoursLeft}h ${minutesLeft}m left today! Don't miss these limited-time offers.`;
        //     }
        // });
    }

    // Update timer every minute (uncomment if you want the timer feature)
    // updateUrgencyTimer();
    // setInterval(updateUrgencyTimer, 60000);

    // Form validation and enhancement (if you add forms later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy loading for images (if you add real images later)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add scroll progress indicator (optional)
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // You can use this to show scroll progress
        // console.log('Scroll progress:', scrolled + '%');
    }

    // Attach debounced scroll listener
    window.addEventListener('scroll', debounce(updateScrollProgress, 10));
});