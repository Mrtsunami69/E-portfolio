document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const headerName = document.querySelector('header h1');
    const mobileNavCloseBtn = document.getElementById('mobile-nav-close-btn'); // New: Get close button

    // --- Theme Toggle Logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light-mode') {
        body.classList.add('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    // Apply theme-specific colors to header name
    function applyThemeColors() {
        if (body.classList.contains('light-mode')) {
            headerName.style.color = '#1f2937'; // Dark text for light mode header name
            // Update back to top button color for light mode
            backToTopBtn.classList.remove('bg-white', 'text-gray-900');
            backToTopBtn.classList.add('bg-gray-900', 'text-gray-100');
        } else {
            headerName.style.color = 'white'; // White text for dark mode header name
            // Update back to top button color for dark mode
            backToTopBtn.classList.remove('bg-gray-900', 'text-gray-100');
            backToTopBtn.classList.add('bg-white', 'text-gray-900');
        }
    }
    applyThemeColors(); // Apply on initial load

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'dark-mode');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
        applyThemeColors(); // Re-apply colors on theme change
    });

    // --- Initial Content Display & Animation ---
    // Main content is immediately visible since splash is removed
    header.style.opacity = '1';
    header.style.visibility = 'visible';
    header.style.pointerEvents = 'auto';

    main.style.opacity = '1';
    main.style.visibility = 'visible';
    main.style.pointerEvents = 'auto';

    footer.style.opacity = '1';
    footer.style.visibility = 'visible';
    footer.style.pointerEvents = 'auto';

    body.style.overflow = 'auto'; // Ensure scrolling is enabled

    // Apply page load animations to main sections
    const allSections = document.querySelectorAll('main section');
    allSections.forEach((section, index) => {
        section.classList.add('visible'); // Add 'visible' class to trigger animation
        section.style.animationDelay = `${(index + 1) * 0.2}s`; // Dynamically set delay
    });

    // --- Scroll Progress Bar & Back to Top Button Logic ---
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / totalHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;

        if (scrollPosition > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Hamburger Menu Logic ---
    function toggleMobileNav() {
        mobileNavOverlay.classList.toggle('is-open');
        hamburgerButton.querySelector('.hamburger-icon').classList.toggle('is-open');
        if (mobileNavOverlay.classList.contains('is-open')) {
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    hamburgerButton.addEventListener('click', toggleMobileNav);
    mobileNavCloseBtn.addEventListener('click', toggleMobileNav); // New: Close button listener

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('is-open')) {
                toggleMobileNav(); // Close menu
            }
        });
    });
});
