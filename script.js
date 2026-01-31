// ===== DOM Elements =====
const cursorFollower = document.getElementById('cursor-follower');
const cursorDot = document.getElementById('cursor-dot');
const particlesContainer = document.getElementById('particles-container');
const exploreBtn = document.getElementById('explore-btn');
const contactBtn = document.getElementById('contact-btn');
const letters = document.querySelectorAll('.letter');
const statsContainer = document.getElementById('stats');

// ===== Custom Cursor =====
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant dot movement
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateCursor() {
    const speed = 0.15;
    
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('button, a, .letter');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// ===== Particle System =====
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// ===== Floating Animation on Mouse Move =====
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// ===== Letter Interaction =====
letters.forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.color = getRandomColor();
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.color = '';
    });
});

function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== Stats Counter Animation =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Intersection Observer for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statsObserver.observe(statsContainer);

// ===== Button Click Effects =====
exploreBtn.addEventListener('click', () => {
    createRipple(event);
    showNotification('🚀 Let\'s explore together!');
});

contactBtn.addEventListener('click', () => {
    createRipple(event);
    showNotification('📧 Connecting soon...');
});

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes notificationSlide {
        0% {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
        10% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        90% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 500;
        z-index: 10001;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
        animation: notificationSlide 3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// ===== Typing Effect for Tagline =====
const taglineText = document.querySelector('.tagline-text');
const originalText = taglineText.textContent;
const phrases = [
    'Crafting Digital Experiences',
    'Building the Future',
    'Creating Amazing Things',
    'Innovating Every Day'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        taglineText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        taglineText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing new phrase
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after initial animation
setTimeout(typeEffect, 3000);

// ===== Greeting Based on Time =====
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingLine = document.getElementById('greeting-line');
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = '☀️ Good Morning, Welcome';
    } else if (hour >= 12 && hour < 17) {
        greeting = '🌤️ Good Afternoon, Welcome';
    } else if (hour >= 17 && hour < 21) {
        greeting = '🌅 Good Evening, Welcome';
    } else {
        greeting = '🌙 Good Night, Welcome';
    }
    
    greetingLine.textContent = greeting;
}
updateGreeting();

// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Page Visibility API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back, Sudharshan misses you!';
    } else {
        document.title = 'Welcome to Sudharshan';
    }
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease';
    showNotification('🎉 You found the secret! You\'re awesome!');
    
    // Create confetti
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${getRandomColor()};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 10000;
        animation: fall ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(confettiStyle);

// ===== Initial Animation Complete Callback =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c🎉 Welcome to Sudharshan\'s Page!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cPress ↑↑↓↓←→←→BA for a surprise!', 'color: #f093fb; font-size: 14px;');
});
