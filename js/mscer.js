// ===== MENU MOBILE TOGGLE (Hamburger) =====
const mobileToggle = document.getElementById('mobile-toggle');
const navMobileMenu = document.getElementById('nav-mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileOverlay = document.getElementById('mobile-overlay');

// Mở menu mobile dạng off-canvas
if (mobileToggle && navMobileMenu && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
        navMobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
    });
}

// Đóng menu mobile (nút X hoặc click overlay)
if (mobileClose && navMobileMenu && mobileOverlay) {
    mobileClose.addEventListener('click', () => {
        navMobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
    mobileOverlay.addEventListener('click', () => {
        navMobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
