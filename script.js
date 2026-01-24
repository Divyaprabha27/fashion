document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateToggleIcon(currentTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon(true);
    }

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
});
