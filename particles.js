// Snowfall Animation for Portfolio Page - Full Page Coverage
class SnowfallAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.numberOfSnowflakes = 100; // Increased from 80 for fuller effect

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('scroll', () => this.updateCanvasHeight());
    }

    resize() {
        // Set canvas to cover ENTIRE page (not just viewport)
        const body = document.body;
        const html = document.documentElement;

        const pageHeight = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );

        this.canvas.width = window.innerWidth;
        this.canvas.height = pageHeight; // Full page height including scroll

        // Reinitialize snowflakes with new dimensions
        this.init();
    }

    updateCanvasHeight() {
        // Update canvas height when content changes
        const body = document.body;
        const html = document.documentElement;

        const pageHeight = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );

        if (this.canvas.height !== pageHeight) {
            this.canvas.height = pageHeight;
        }
    }

    init() {
        this.snowflakes = [];
        for (let i = 0; i < this.numberOfSnowflakes; i++) {
            this.snowflakes.push(new Snowflake(this.canvas.width, this.canvas.height));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        this.snowflakes.forEach(snowflake => {
            snowflake.update(this.canvas.height);
            snowflake.draw(this.ctx, isDark);
        });

        requestAnimationFrame(() => this.animate());
    }
}

class Snowflake {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight, true);
    }


    reset(canvasWidth, canvasHeight, initial = false) {
        this.x = Math.random() * canvasWidth;
        this.y = initial ? Math.random() * canvasHeight : -10;
        this.radius = Math.random() * 4 + 3; // Size 3-7px (bigger!)
        this.speed = Math.random() * 1 + 0.5; // Fall speed
        this.drift = Math.random() * 0.5 - 0.25; // Horizontal drift
        this.opacity = Math.random() * 0.6 + 0.4; // Opacity 0.4-1
    }

    update(canvasHeight) {
        this.y += this.speed;
        this.x += this.drift;

        // Reset if snowflake goes off bottom
        if (this.y > canvasHeight) {
            this.reset(window.innerWidth, canvasHeight);
        }
    }

    draw(ctx, isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Theme-aware colors
        if (isDark) {
            // White particles for dark theme
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        } else {
            // Soft purple particles for light theme
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * 0.6})`;
        }

        ctx.fill();
        ctx.closePath();
    }
}

// Initialize when portfolio becomes active
const portfolioWrapper = document.getElementById('portfolioWrapper');
if (portfolioWrapper) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (portfolioWrapper.classList.contains('active')) {
                    new SnowfallAnimation();
                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(portfolioWrapper, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Also check if already active
    if (portfolioWrapper.classList.contains('active')) {
        new SnowfallAnimation();
    }
}
