// Critical functionality for buttons and scroll animations
document.addEventListener('DOMContentLoaded', function () {
    // PORTFOLIO REVEAL BUTTON
    var btn = document.getElementById('revealPortfolioBtn');
    var wrapper = document.getElementById('portfolioWrapper');
    var hero = document.querySelector('.hero');
    var floatingToggle = document.getElementById('themeToggleFloating');

    if (btn && wrapper && hero) {
        btn.addEventListener('click', function () {
            hero.classList.add('slide-out');
            if (floatingToggle) {
                floatingToggle.style.transition = 'opacity 0.3s ease';
                floatingToggle.style.opacity = '0';
            }
            setTimeout(function () {
                hero.classList.add('hidden');
                wrapper.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        });
    }

    // THEME TOGGLE FUNCTIONALITY
    var themeToggle = document.getElementById('themeToggle');
    var themeToggleFloating = document.getElementById('themeToggleFloating');
    var html = document.documentElement;

    // Check for saved theme or default to light
    var currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    function toggleTheme() {
        var current = html.getAttribute('data-theme');
        var newTheme = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add animation effect
        if (themeToggle) {
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(function () {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
        if (themeToggleFloating) {
            themeToggleFloating.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(function () {
                themeToggleFloating.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        }
    }

    // Attach event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleFloating) {
        themeToggleFloating.addEventListener('click', toggleTheme);
    }

    // SCROLL ANIMATIONS - Restore the animations!
    var observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                // Remove class when leaving viewport so animation can repeat
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with data-scroll-animate attribute
    var animateElements = document.querySelectorAll('[data-scroll-animate]');
    animateElements.forEach(function (el) {
        observer.observe(el);
    });
});
    
    // CONTACT FORM REVEAL AND SUBMIT FUNCTIONALITY
    var contactRevealBtn = document.getElementById('contactRevealBtn');
    var contactFormWrapper = document.getElementById('contactFormWrapper');
    var contactForm = document.getElementById('contactForm');
    
    if (contactRevealBtn && contactFormWrapper) {
        contactRevealBtn.addEventListener('click', function() {
            // Hide the button with animation
            contactRevealBtn.classList.add('hidden');
            
            // Show the form with animation
            setTimeout(function() {
                contactFormWrapper.classList.add('active');
            }, 300);
        });
    }
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
