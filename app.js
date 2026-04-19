// ============================================================
// Portfolio Alienis — app.js
// ============================================================

// Mobile nav toggle
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open');
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
    });
});

// Contact form (demo — replace with your backend / Formspree / EmailJS)
function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
    }
}

// Smooth scrollspy pour la table of contents des procédures
const tocLinks = document.querySelectorAll('.toc a');
if (tocLinks.length > 0) {
    const sections = document.querySelectorAll('.procedure-content section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    link.style.color = '';
                    link.style.paddingLeft = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--violet-light)';
                        link.style.paddingLeft = '4px';
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
}
