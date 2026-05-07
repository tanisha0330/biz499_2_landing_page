/**
 * ═══════════════════════════════════════════════════════
 *  LUMEN HERO — Interactive enhancements (vanilla JS)
 * ═══════════════════════════════════════════════════════
 *
 *  1. Mobile nav toggle
 *  2. Parallax sphere movement on mouse move
 *  3. Smooth navbar background on scroll
 * ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM refs ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const sphereWrapper = document.getElementById('sphereWrapper');
  const navbar = document.getElementById('navbar');

  // ────────────────────────────────────────────
  //  1. MOBILE NAV TOGGLE
  // ────────────────────────────────────────────
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ────────────────────────────────────────────
  //  2. PARALLAX SPHERE — follows mouse
  //     Creates a subtle depth illusion.
  //     Movement capped to ±25px for elegance.
  // ────────────────────────────────────────────
  if (sphereWrapper) {
    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const EASE = 0.06;  // lerp factor — lower = smoother
    const RANGE = 25;    // max px offset

    function updateSphere() {
      // Lerp toward target
      currentX += (mouseX - currentX) * EASE;
      currentY += (mouseY - currentY) * EASE;

      sphereWrapper.style.transform =
        `translateY(-40%) translate(${currentX}px, ${currentY}px)`;

      rafId = requestAnimationFrame(updateSphere);
    }

    document.addEventListener('mousemove', (e) => {
      // Normalise mouse to center of viewport → -1 … +1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseX = nx * RANGE;
      mouseY = ny * RANGE;
    });

    // Start the loop
    rafId = requestAnimationFrame(updateSphere);

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(updateSphere);
      }
    });
  }

  // ────────────────────────────────────────────
  //  3. NAVBAR BACKGROUND ON SCROLL
  //     Adds a translucent backdrop when the
  //     user scrolls past the initial fold.
  // ────────────────────────────────────────────
  if (navbar) {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Hero threshold
        if (window.scrollY > window.innerHeight * 0.8) {
          navbar.classList.add('scrolled');
          // Clear inline styles to let CSS class take over
          navbar.style.background = '';
          navbar.style.backdropFilter = '';
        } else {
          navbar.classList.remove('scrolled');
          // Fallback to initial slight blur when just scrolling slightly
          if (window.scrollY > 60) {
            navbar.style.background = 'rgba(18, 18, 18, 0.88)';
            navbar.style.backdropFilter = 'blur(16px)';
          } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
          }
        }
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ────────────────────────────────────────────
  //  4. INTERSECTION OBSERVER — reveal on scroll
  //     (future-proof for sections below the hero)
  // ────────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ────────────────────────────────────────────
  //  5. HORIZONTAL SCROLL ANIMATION
  // ────────────────────────────────────────────
  const hScrollWrapper = document.getElementById('services');
  const hScrollContainer = document.getElementById('hScrollContainer');

  if (hScrollWrapper && hScrollContainer) {
    let tickingH = false;

    function updateHorizontalScroll() {
      if (tickingH) return;
      tickingH = true;

      requestAnimationFrame(() => {
        const wrapperRect = hScrollWrapper.getBoundingClientRect();

        if (wrapperRect.top <= 0 && wrapperRect.bottom >= window.innerHeight) {
          const scrollableDistance = wrapperRect.height - window.innerHeight;
          const scrollProgress = Math.abs(wrapperRect.top) / scrollableDistance;
          const maxTranslate = hScrollContainer.scrollWidth - window.innerWidth;

          hScrollContainer.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;
        } else if (wrapperRect.top > 0) {
          hScrollContainer.style.transform = `translateX(0px)`;
        } else if (wrapperRect.bottom < window.innerHeight) {
          const maxTranslate = hScrollContainer.scrollWidth - window.innerWidth;
          hScrollContainer.style.transform = `translateX(-${maxTranslate}px)`;
        }

        tickingH = false;
      });
    }

    window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
    window.addEventListener('resize', updateHorizontalScroll, { passive: true });
    updateHorizontalScroll(); // init
  }

  // ────────────────────────────────────────────
  //  6. ABOUT SECTION MASK PARALLAX
  // ────────────────────────────────────────────
  const aboutMask = document.getElementById('aboutMask');
  if (aboutMask) {
    let tickingA = false;
    function updateAboutMask() {
      if (tickingA) return;
      tickingA = true;
      requestAnimationFrame(() => {
        const rect = aboutMask.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = 1 - (rect.top / window.innerHeight);
          const scale = 0.8 + (progress * 0.4);
          const radius = Math.max(0, 40 - (progress * 40));
          aboutMask.style.transform = `translate(-50%, -50%) scale(${scale})`;
          aboutMask.style.borderRadius = `${radius}px`;
        }
        tickingA = false;
      });
    }
    window.addEventListener('scroll', updateAboutMask, { passive: true });
    updateAboutMask();
  }

  // ────────────────────────────────────────────
  //  6B. TEXT ROTATOR & BG CHANGER
  // ────────────────────────────────────────────
  const wordRotator = document.getElementById('wordRotator');
  const aboutSection = document.getElementById('about');
  if (wordRotator && aboutSection) {
    const words = wordRotator.querySelectorAll('.opt-word');
    const bgColors = ['var(--bg)', '#0c1117', '#100c14', '#0d1314', '#151015'];
    let currentWordIndex = 0;

    setInterval(() => {
      // Current word exits
      const currentWord = words[currentWordIndex];
      currentWord.classList.remove('active');
      currentWord.classList.add('exit');

      // Next word index
      currentWordIndex = (currentWordIndex + 1) % words.length;

      // Next word enters
      const nextWord = words[currentWordIndex];
      nextWord.classList.remove('exit');
      nextWord.classList.add('active');

      // Change background
      aboutSection.style.backgroundColor = bgColors[currentWordIndex];
    }, 1000);
  }

  // ────────────────────────────────────────────
  //  7. STACKED CARDS ANIMATION
  // ────────────────────────────────────────────
  const stackArea = document.getElementById('case-studies');
  const cards = document.querySelectorAll('.card');

  if (stackArea && cards.length > 0) {
    const initialRotations = [-12, -5, 4, 10];
    const exitRotations = [-25, 15, -20, 30];

    cards.forEach((card, i) => {
      card.style.zIndex = i + 1;
      const rot = initialRotations[i] || 0;
      card.dataset.initialRotation = rot;
      card.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      const exitRot = exitRotations[i] || 20;
      card.style.setProperty('--exit-rotation', `${exitRot}deg`);
    });

    let tickingS = false;
    function onScrollStack() {
      if (tickingS) return;
      tickingS = true;

      requestAnimationFrame(() => {
        const topVal = stackArea.getBoundingClientRect().top;
        const distance = window.innerHeight * 0.5;

        let index;
        if (topVal >= 0) {
          index = 0;
        } else {
          index = Math.ceil(Math.abs(topVal) / distance);
        }

        cards.forEach((card, i) => {
          const cardIndex = i + 1;
          if (cardIndex <= index) {
            if (card.classList.contains('away')) {
              card.classList.remove('away');
            }
            const rot = card.dataset.initialRotation || 0;
            // Offset each card vertically based on its order to create a visible stack
            const offsetY = i * 30; // 30px gap per card
            card.style.transform = `translate(-50%, calc(-50% + ${offsetY}px)) rotate(${rot}deg)`;
          } else {
            if (!card.classList.contains('away')) {
              card.classList.add('away');
            }
            // Keep away cards off-screen to the right-bottom
            card.style.transform = '';
          }
        });

        tickingS = false;
      });
    }

    window.addEventListener('scroll', onScrollStack, { passive: true });
    onScrollStack();
  }
  // ────────────────────────────────────────────
  //  THEMES GALLERY (PARALLAX ON SCROLL)
  // ────────────────────────────────────────────
  const themesSection = document.getElementById('themes');
  const columns = document.querySelectorAll('.gallery-column');

  if (themesSection && columns.length > 0) {
    const initialOffsets = Array.from(columns).map(column => {
      const inlineStyle = column.getAttribute('style');
      let initialY = 0;
      if (inlineStyle && inlineStyle.includes('translateY')) {
        const match = inlineStyle.match(/translateY\(([\d.]+)vh\)/);
        if (match) {
          initialY = parseFloat(match[1]) * window.innerHeight / 100;
        }
      }
      return initialY;
    });

    window.addEventListener('scroll', () => {
      const sectionRect = themesSection.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const windowHeight = window.innerHeight;

      // Start animations only when the section is pinned/visible at the top
      if (sectionTop <= 0 && sectionRect.bottom >= windowHeight) {
        // Distance scrolled inside the pinned section
        const scrollDistance = Math.abs(sectionTop);
        const maxScroll = sectionRect.height - windowHeight;
        const scrollProgress = scrollDistance / maxScroll;

        columns.forEach((column, index) => {
          const speed = parseFloat(column.getAttribute('data-speed'));
          const initialY = initialOffsets[index];

          // Calculate the parallax movement (moving upwards)
          const moveY = initialY - (scrollDistance * speed);

          column.style.transform = `translateY(${moveY}px)`;
        });

        // Fade in bottom button when almost scrolled
        const themesOutro = document.getElementById('themesOutro');
        const galleryContainer = document.getElementById('galleryContainer');
        if (themesOutro && galleryContainer) {
          if (scrollProgress >= 0.80) {
            themesOutro.classList.add('visible');
            galleryContainer.classList.add('fade-out');
          } else {
            themesOutro.classList.remove('visible');
            galleryContainer.classList.remove('fade-out');
          }
        }
      }
    });
  }

  // ────────────────────────────────────────────
  //  PROJECT MODAL LOGIC (WORKS & FEEDBACK)
  // ────────────────────────────────────────────
  const folders = document.querySelectorAll('.folder-item');
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModal = document.getElementById('closeModal');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  if (folders.length > 0 && projectModal) {
    folders.forEach(folder => {
      folder.addEventListener('click', () => {
        // Populate modal data
        modalTitle.textContent = folder.getAttribute('data-title');
        modalDesc.textContent = folder.getAttribute('data-desc');
        modalPhoto.style.backgroundColor = folder.getAttribute('data-color') || '#444';

        projectModal.classList.add('active');
      });
    });

    const closeFn = () => projectModal.classList.remove('active');
    if (closeModal) closeModal.addEventListener('click', closeFn);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeFn);
  }

  // ════════════════════════════════════════════════════
  // NOTIFICATION POPUP LOGIC
  // ════════════════════════════════════════════════════
  const notifications = [
    { name: "Sonali", text: "just booked a business audit.", color: "#F59AC4" },
    { name: "Rahul", text: "posted: 'Very happy with the services!'", color: "#FBBC74" },
    { name: "Priya", text: "just started a new project.", color: "#a18cd1" },
    { name: "Amit", text: "posted: 'Incredible ROI on the ad campaign.'", color: "#84fab0" },
    { name: "Neha", text: "just scheduled a consultation call.", color: "#8fd3f4" },
    { name: "Vikram", text: "posted: 'The web design is top notch!'", color: "#fccb90" },
    { name: "Sneha", text: "just subscribed to the growth plan.", color: "#d57eeb" },
    { name: "Karan", text: "posted: 'Our sales doubled this quarter.'", color: "#fbc2eb" },
    { name: "Aarti", text: "just upgraded their marketing tier.", color: "#84fab0" },
    { name: "Rohan", text: "posted: 'Highly recommend biz499 to everyone.'", color: "#ff9a9e" }
  ];

  const popup = document.getElementById('notificationPopup');
  const notifText = document.getElementById('notifText');
  const notifPhoto = document.getElementById('notifPhoto');

  if (popup && notifText && notifPhoto) {
    setInterval(() => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      notifText.innerHTML = `<strong>${randomNotif.name}</strong> ${randomNotif.text}`;
      notifPhoto.style.backgroundColor = randomNotif.color;

      popup.classList.add('show');

      setTimeout(() => {
        popup.classList.remove('show');
      }, 5000);
    }, 3000);
  }

})();



// ════════════════════════════════════════════════════
// 8. COUNTDOWN TIMER LOGIC
// ════════════════════════════════════════════════════
const timers = document.querySelectorAll('.countdown-timer');

if (timers.length > 0) {
  // Set time in seconds (10 * 60 = 10 minutes). 
  // If you literally want just 10 seconds, change this to: let timeRemaining = 10;
  let timeRemaining = 10 * 60;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    // Add a leading zero if seconds are less than 10 (e.g. 10:09)
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update the text of both the Hero and Navbar timers simultaneously
    timers.forEach(timer => {
      timer.textContent = `OFFER ending in ${minutes}:${seconds}`;
    });

    // Stop the timer when it hits zero
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timers.forEach(timer => {
        timer.textContent = "0:00";
      });
    } else {
      timeRemaining--;
    }
  }, 1000);
};
