/**
 * MAIN.JS
 * Core Controller for Rijwal VP Cybersecurity & Cloud 3D Portfolio
 * Handles navigation, modals, project filtering, contact forms, and scrollspy
 */

(function () {
  'use strict';

  // --- 1. Mobile Menu Drawer ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      if (window.AudioFX) window.AudioFX.playClick();
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        if (window.AudioFX) window.AudioFX.playClick();
      });
    }

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // --- 2. Sticky Navbar & Scroll Progress ---
  const navbar = document.getElementById('main-navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const scrollProgressCircle = document.getElementById('scroll-progress-indicator');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Navbar glass effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility & circular progress
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    if (scrollProgressCircle) {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;
      scrollProgressCircle.style.strokeDashoffset = offset;
    }

    // ScrollSpy active link highlight
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.AudioFX) window.AudioFX.playClick();
    });
  }

  // --- 3. Projects Category Filter ---
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      if (window.AudioFX) window.AudioFX.playClick();

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 4. Certificate Preview Modal ---
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalOrg = document.getElementById('cert-modal-org');
  const certModalDesc = document.getElementById('cert-modal-desc');
  const certModalClose = document.getElementById('cert-modal-close');
  const certCards = document.querySelectorAll('.cert-card');

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-cert-img');
      const title = card.getAttribute('data-cert-title');
      const org = card.getAttribute('data-cert-org');
      const desc = card.getAttribute('data-cert-desc');

      if (certModalImg) certModalImg.src = imgSrc;
      if (certModalTitle) certModalTitle.textContent = title;
      if (certModalOrg) certModalOrg.textContent = org;
      if (certModalDesc) certModalDesc.textContent = desc;

      if (certModal) {
        certModal.classList.add('open');
        if (window.AudioFX) window.AudioFX.playAccessGranted();
      }
    });
  });

  if (certModalClose && certModal) {
    certModalClose.addEventListener('click', () => {
      certModal.classList.remove('open');
      if (window.AudioFX) window.AudioFX.playClick();
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('open');
      }
    });
  }

  // --- 5. Interactive Contact Form & Clipboard Copy ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please complete all mandatory parameters.', 'error');
        if (window.AudioFX) window.AudioFX.playBeep(220, 0.12, 'sawtooth');
        return;
      }

      // Generate mailto link as reliable direct transmission
      const mailtoUri = `mailto:vprijwal@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${subject || 'Inquiry from ' + name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      showStatus('[✓] Packet prepared! Launching your mail client...', 'success');
      if (window.AudioFX) window.AudioFX.playAccessGranted();

      setTimeout(() => {
        window.location.href = mailtoUri;
      }, 700);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'vprijwal@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const origText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
        if (window.lucide) window.lucide.createIcons();
        if (window.AudioFX) window.AudioFX.playAccessGranted();
        setTimeout(() => {
          copyEmailBtn.innerHTML = origText;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    });
  }

  // --- 6. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll('.cyber-reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // --- 7. Initialize Lucide Icons ---
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
})();
