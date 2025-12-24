// Theme Toggle Functionality (Both toggles)
const themeToggle = document.getElementById('themeToggle');
const themeToggleFloating = document.getElementById('themeToggleFloating');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Function to toggle theme
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add a small animation effect to both toggles
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
    if (themeToggleFloating) {
        themeToggleFloating.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
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

// Portfolio Reveal Functionality
const revealPortfolioBtn = document.getElementById('revealPortfolioBtn');
const portfolioWrapper = document.getElementById('portfolioWrapper');
const heroSection = document.querySelector('.hero');

if (revealPortfolioBtn) {
    revealPortfolioBtn.addEventListener('click', () => {
        // Slide out hero section to the left
        heroSection.classList.add('slide-out');

        // Hide floating theme toggle
        if (themeToggleFloating) {
            themeToggleFloating.style.transition = 'opacity 0.3s ease';
            themeToggleFloating.style.opacity = '0';
        }

        setTimeout(() => {
            // Hide hero completely
            heroSection.classList.add('hidden');

            // Show portfolio content with slide-in animation from right
            portfolioWrapper.classList.add('active');

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Run scroll detection after portfolio is visible
            setTimeout(() => {
                updateActiveNavOnScroll();
            }, 100);
        }, 800);
    });
}

// Smooth scroll to sections and active nav links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');

        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

// Observe all elements with data-scroll-animate attribute
const animateElements = document.querySelectorAll('[data-scroll-animate]');
animateElements.forEach(el => observer.observe(el));

// Scroll detection for navbar highlighting
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.portfolio-wrapper section[id]');
    if (sections.length === 0) return;

    const scrollY = window.scrollY || window.pageYOffset;
    let currentSection = 'about'; // Default to about

    // Check if we're near the bottom of the page (within 300px)
    const isNearBottom = (window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 300;

    if (isNearBottom) {
        // If near bottom, activate the last section (contact)
        currentSection = 'contact';
    } else {
        // Loop through sections from top to bottom
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Account for header

            // If we've scrolled past the top of this section
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
    }

    // Update the active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Listen to scroll events
window.addEventListener('scroll', updateActiveNavOnScroll);

// Run on page load
window.addEventListener('load', updateActiveNavOnScroll);

// Contact Form Reveal
const contactRevealBtn = document.getElementById('contactRevealBtn');
const contactFormWrapper = document.getElementById('contactFormWrapper');
const contactForm = document.getElementById('contactForm');

contactRevealBtn.addEventListener('click', () => {
    // Hide the button with animation
    contactRevealBtn.classList.add('hidden');

    // Show the form with animation
    setTimeout(() => {
        contactFormWrapper.classList.add('active');
    }, 300);
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Palette Selector Functionality
const paletteToggle = document.getElementById('paletteToggle');
const paletteDropdown = document.getElementById('paletteDropdown');
const paletteOptions = document.querySelectorAll('.palette-option');

// Check for saved palette preference or default to 'midnight-neon'
const currentPalette = localStorage.getItem('colorPalette') || 'midnight-neon';
if (currentPalette && portfolioWrapper) {
    portfolioWrapper.setAttribute('data-palette', currentPalette);
    // Mark the active palette option
    paletteOptions.forEach(option => {
        if (option.getAttribute('data-palette') === currentPalette) {
            option.classList.add('active');
        }
    });
    // Save default if not already saved
    if (!localStorage.getItem('colorPalette')) {
        localStorage.setItem('colorPalette', currentPalette);
    }
}

// Toggle dropdown
if (paletteToggle) {
    paletteToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        paletteDropdown.classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (paletteDropdown && !paletteDropdown.contains(e.target) && e.target !== paletteToggle) {
        paletteDropdown.classList.remove('active');
    }
});

// Handle palette selection
paletteOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedPalette = option.getAttribute('data-palette');

        // Remove active class from all options
        paletteOptions.forEach(opt => opt.classList.remove('active'));

        // Add active class to selected option
        option.classList.add('active');

        // Apply the palette to the portfolio wrapper
        if (portfolioWrapper) {
            portfolioWrapper.setAttribute('data-palette', selectedPalette);
            localStorage.setItem('colorPalette', selectedPalette);
        }

        // Close dropdown
        paletteDropdown.classList.remove('active');

        // Add a small animation effect
        paletteToggle.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            paletteToggle.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    });
});

