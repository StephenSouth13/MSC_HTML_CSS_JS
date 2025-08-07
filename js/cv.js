const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Mở lightbox khi click ảnh
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

// Đóng lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
});

// Chuyển ảnh trước
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // tránh tắt lightbox khi click nút
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Chuyển ảnh sau
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Tắt lightbox khi click ra ngoài ảnh
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }
});
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

  // ===== LOGO RESIZE ON SCROLL =====
  const logoImg = document.querySelector('.logo img');
  if (logoImg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        logoImg.style.height = '50px';
      } else {
        logoImg.style.height = '70px'; // Chiều cao ban đầu
      }
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