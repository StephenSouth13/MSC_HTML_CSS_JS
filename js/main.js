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

  // ===== TAB MENTOR (CHỈNH THAY ĐỔI TAB) =====
  const mentorTabBoxes = document.querySelectorAll('.tab-box');
  const mentorTabPanels = document.querySelectorAll('.tab-panel');
  const mentorTabDescription = document.getElementById('tab-description');

  const mentorDescriptions = {
    "phuong-phap": "Phương pháp giảng huấn kết hợp Mentoring và Coaching giúp cho người học và các dự án giải quyết trực tiếp vấn đề vướng phải...",
    "giang-huan": "Đội ngũ trực tiếp tư vấn, thiết kế và huấn luyện cho các chương trình đào tạo và dự án tại MSC",
    "ke-thua": "Phương pháp giảng huấn kết hợp Mentoring và Coaching giúp cho các dự án, gia tộc, doanh nghiệp có được đội ngũ nhân sự kế thừa liên tục và phát triển bền vững..."
  };

  if (mentorTabBoxes.length && mentorTabPanels.length && mentorTabDescription) {
    mentorTabBoxes.forEach(box => {
      box.addEventListener('click', () => {
        // Active tab
        mentorTabBoxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active');

        const target = box.getAttribute('data-tab');

        // Toggle tab panels
        mentorTabPanels.forEach(panel => {
          panel.style.display = panel.id === target ? 'block' : 'none';
        });

        // Update description
        mentorTabDescription.textContent = mentorDescriptions[target];
      });
    });
  }

  // ===== ENHANCED SCROLL ANIMATIONS =====
  const setupScrollAnimations = () => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    // Add animation classes to elements
    document.querySelectorAll('.du-an-card, .mentor-card, .chu-nhiem-item, .msc-item, .news-item').forEach((el, index) => {
      if (index % 2 === 0) {
        el.classList.add('slide-in-left');
      } else {
        el.classList.add('slide-in-right');
      }
      observer.observe(el);
    });

    document.querySelectorAll('h1, h2, h3, .du-an-title, .mentor-title, .news-title-center').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    document.querySelectorAll('img, video, .hero-video').forEach(el => {
      el.classList.add('scale-in');
      observer.observe(el);
    });
  };

  // ===== ENHANCED HEADER EFFECTS =====
  const setupHeaderEffects = () => {
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      if (scrolled > 100) {
        header.classList.add('scrolled');
        if (logoImg) {
          logoImg.style.height = '60px';
        }
      } else {
        header.classList.remove('scrolled');
        if (logoImg) {
          logoImg.style.height = '85px';
        }
      }
    });
  };

  // ===== ENHANCED CARD HOVER EFFECTS =====
  const setupCardEffects = () => {
    const cards = document.querySelectorAll('.du-an-card, .mentor-card, .chu-nhiem-item, .news-item');

    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
        e.target.style.boxShadow = '0 15px 40px rgba(0, 59, 92, 0.2)';
      });

      card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = '0 4px 15px rgba(0, 59, 92, 0.1)';
      });
    });
  };

  // ===== RIPPLE EFFECT FOR BUTTONS =====
  const setupRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn, .profile-btn, button');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  };

  // ===== TYPING EFFECT =====
  const setupTypingEffect = () => {
    const typewriterElements = document.querySelectorAll('.typewriter-text');

    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #0091D0';

      let i = 0;
      const typing = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typing, 50);
        } else {
          element.style.borderRight = 'none';
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typing, 500);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  };

  // Initialize all enhanced features
  setupScrollAnimations();
  setupHeaderEffects();
  setupCardEffects();
  setupRippleEffect();
  setupTypingEffect();
});
