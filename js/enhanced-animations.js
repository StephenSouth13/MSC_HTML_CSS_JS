/* =========================
   ENHANCED ANIMATIONS & INTERACTIONS
   Beautiful Scroll Effects & Smooth Transitions
 ========================= */

// Intersection Observer for scroll animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupHeaderEffects();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
    this.setupTypingEffect();
  }

  // Intersection Observer for element animations
  setupIntersectionObserver() {
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
    this.addAnimationClasses();

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
      observer.observe(el);
    });
  }

  // Add animation classes to elements based on their position
  addAnimationClasses() {
    // Cards and items
    document.querySelectorAll('.du-an-card, .mentor-card, .chu-nhiem-item, .msc-item, .news-item').forEach((el, index) => {
      if (index % 2 === 0) {
        el.classList.add('slide-in-left');
      } else {
        el.classList.add('slide-in-right');
      }
    });

    // Titles and headings
    document.querySelectorAll('h1, h2, h3, .du-an-title, .mentor-title, .news-title-center').forEach(el => {
      el.classList.add('fade-in');
    });

    // Images and media
    document.querySelectorAll('img, video, .hero-video').forEach(el => {
      el.classList.add('scale-in');
    });

    // Buttons and links
    document.querySelectorAll('.btn, .profile-btn, .contact-btn').forEach(el => {
      el.classList.add('fade-in');
    });
  }

  // Enhanced scroll effects
  setupScrollEffects() {
    let ticking = false;

    const updateOnScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Parallax background effect
      const heroSection = document.querySelector('.hero-video');
      if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }

      // Update floating elements
      this.updateFloatingElements(scrolled);

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Update floating contact buttons visibility
  updateFloatingElements(scrolled) {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (scrolled > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Back to top functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Header scroll effects
  setupHeaderEffects() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      if (scrolled > 100) {
        header.classList.add('scrolled');
        if (logo) {
          logo.style.height = '60px';
        }
      } else {
        header.classList.remove('scrolled');
        if (logo) {
          logo.style.height = '85px';
        }
      }
    });
  }

  // Parallax effects for sections
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Counter animations for statistics
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const countUp = (element) => {
      const target = parseInt(element.dataset.count);
      const current = parseInt(element.textContent);
      const increment = target / 100;
      
      if (current < target) {
        element.textContent = Math.ceil(current + increment);
        setTimeout(() => countUp(element), 20);
      } else {
        element.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  }

  // Typing effect for dynamic text
  setupTypingEffect() {
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
      
      // Start typing when element is visible
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
  }
}

// Enhanced card hover effects
class CardAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupCardHoverEffects();
    this.setupImageLoadEffects();
    this.setupButtonRippleEffect();
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.du-an-card, .mentor-card, .chu-nhiem-item, .news-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.addFloatingEffect(e.target);
      });
      
      card.addEventListener('mouseleave', (e) => {
        this.removeFloatingEffect(e.target);
      });
      
      card.addEventListener('mousemove', (e) => {
        this.addTiltEffect(e);
      });
    });
  }

  addFloatingEffect(card) {
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 15px 40px rgba(0, 59, 92, 0.2)';
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  removeFloatingEffect(card) {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 4px 15px rgba(0, 59, 92, 0.1)';
  }

  addTiltEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  setupImageLoadEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
          img.style.opacity = '1';
        }, 100);
      });
    });
  }

  setupButtonRippleEffect() {
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
  }
}

// Enhanced loading animations
class LoadingAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupPageLoadAnimation();
    this.setupElementStaggering();
  }

  setupPageLoadAnimation() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Stagger animation for header elements
      const headerElements = document.querySelectorAll('header *');
      headerElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-up');
      });
    });
  }

  setupElementStaggering() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, sectionIndex) => {
      const elements = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
      
      elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new CardAnimations();
  new LoadingAnimations();
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

body.loaded {
  overflow-x: hidden;
}
`;

// Insert CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
