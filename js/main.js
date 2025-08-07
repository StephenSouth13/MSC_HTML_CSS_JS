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

  // ===== TAB TIN TỨC (CHIA SẺ / TIN NỔI BẬT) =====
  const newsTabs = document.querySelectorAll('.news-tabs .tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (newsTabs.length && tabPanes.length) {
    newsTabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        newsTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        tabPanes.forEach(pane => pane.classList.remove('active'));
        const paneName = this.getAttribute('data-tab');
        const pane = document.querySelector('.tab-pane[data-pane="' + paneName + '"]');
        if (pane) pane.classList.add('active');
      });
    });
  }

  // ===== AUTO CAROUSEL LOGO LOOP =====
  const track = document.querySelector('.carousel-track');
  if (track) {
    const logos = track.querySelectorAll('img');
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
    let scrollAmount = 0;
    const speed = 1; // tốc độ cuộn
    function autoScroll() {
      scrollAmount += speed;
      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }
      track.style.transform = `translateX(-${scrollAmount}px)`;
      requestAnimationFrame(autoScroll);
    }
    autoScroll();
  }

  // ===== CAROUSEL THỦ CÔNG (NẾU DÙNG) =====
  let currentSlide = 0;
  function moveSlide(direction) {
    const slides = document.querySelectorAll('.msc-grid');
    const totalSlides = slides.length;
    if (!totalSlides) return;
    currentSlide += direction;
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
      if (document.getElementById("current-year"))
        document.getElementById("current-year").innerText = "KHÓA 2024";
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0;
      if (document.getElementById("current-year"))
        document.getElementById("current-year").innerText = "KHÓA 2025";
    }
    const carousel = document.querySelector('.carousel-slide');
    if (carousel) {
      const offset = -currentSlide * (300 + 20);
      carousel.style.transform = `translateX(${offset}px)`;
    }
  }
  // Nếu cần dùng moveSlide ở HTML, hãy gán window.moveSlide = moveSlide;
  window.moveSlide = moveSlide;
});

// Chỉnh thay đổi tab ở Mentor
const tabBoxes = document.querySelectorAll('.tab-box');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const tabDescription = document.getElementById('tab-description');

  const descriptions = {
    "phuong-phap": "Phương pháp giảng huấn kết hợp Mentoring và Coaching giúp cho người học và các dự án giải quyết trực tiếp vấn đề vướng phải...",
    "giang-huan": "Đội ngũ trực tiếp tư vấn, thiết kế và huấn luyện cho các chương trình đào tạo và dự án tại MSC",
    "ke-thua": "Phương pháp giảng huấn kết hợp Mentoring và Coaching giúp cho các dự án, gia tộc, doanh nghiệp có được đội ngũ nhân sự kế thừa liên tục và phát triển bền vững..."
  };

  tabBoxes.forEach(box => {
    box.addEventListener('click', () => {
      // Active tab
      tabBoxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');

      const target = box.getAttribute('data-tab');

      // Toggle tab panels
      tabPanels.forEach(panel => {
        panel.style.display = panel.id === target ? 'block' : 'none';
      });

      // Update description
      tabDescription.textContent = descriptions[target];
    });
  });