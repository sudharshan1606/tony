// ===== DOM Elements =====
const cursorFollower = document.getElementById('cursor-follower');
const cursorDot = document.getElementById('cursor-dot');

// ===== Custom Cursor =====
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot movement
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
});

// Smooth follower animation
function animateCursor() {
    const speed = 0.15;

    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;

    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('button, a, .stat-card, .offering-card, .contact-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorFollower) cursorFollower.classList.remove('hover');
    });
});

// ===== Stats Counter Animation =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
}

// Intersection Observer for stats
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll('.about-content, .about-image, .contact-info, .map-container');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(el);
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.8)';
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
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

// ===== Card Hover Effects =====
const cards = document.querySelectorAll('.stat-card, .offering-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c🛍️ Welcome to Thineva!', 'color: #f093fb; font-size: 20px; font-weight: bold;');
    console.log('%cOne of the oldest dress stores in Chidambaram', 'color: #667eea; font-size: 14px;');
});
