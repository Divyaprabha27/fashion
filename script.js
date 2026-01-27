document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Force light mode on load by default (do nothing, as CSS defaults to light)
    // Removed automatic dark mode detection to satisfy user request: "when page is refreshed i want website as light mode"
    updateToggleIcon(false); // Ensure icon is sun/moon correct for light mode

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme === 'dark');
    });

    function updateToggleIcon(isDark) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.src = isDark ? 'assets/sun.svg' : 'assets/moon.svg';
            icon.alt = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('open')) {
            body.style.overflow = 'hidden';
            menuToggle.innerHTML = '✕';
        } else {
            body.style.overflow = '';
            menuToggle.innerHTML = '☰';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            body.style.overflow = '';
            menuToggle.innerHTML = '☰';
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<img src="assets/arrow-up.svg" alt="Scroll to Top">';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Accordion
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
});
