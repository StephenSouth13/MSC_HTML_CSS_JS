document.addEventListener('DOMContentLoaded', () => {
  // ===== MENU MOBILE TOGGLE (Hamburger) =====
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navMobileMenu = document.getElementById('nav-mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileOverlay = document.getElementById('mobile-overlay');

  // Toggle menu trên mobile (hamburger)
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.innerHTML = navMenu.classList.contains('active')
        ? '<i class="bi bi-x"></i>'
        : '<i class="bi bi-list"></i>';
    });
  }

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

  // ===== ACTIVE MENU ITEM KHI SCROLL TỚI SECTION =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu li a');
  function setActiveMenu() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', setActiveMenu);
  }

  
});



