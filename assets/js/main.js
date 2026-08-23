/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jul 2 2025
 * Author: BootstrapMade.com
 * Modified By: Vishnu Teja
 */
/* minimise delauy*/
if (window.innerWidth < 768) {
  AOS.init({ disable: true });
}

(function () {
  "use strict";

  /**
   * Header toggle
   *chnage*/
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */

  /* again changes*/
 document.querySelectorAll('#navmenu a[href^="#"]').forEach(navLink => {
  navLink.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      e.preventDefault();

      // ✅ Automatically restore default sections
      if (typeof window.goBack === 'function') window.goBack();

      // ✅ Close mobile nav if open
      if (document.querySelector('.header-show')) {
        headerToggle();
      }

      // ✅ Immediately set clicked link as active so state updates without waiting for scroll
      // But release this manual active state shortly so the scrollspy (hover) regains control.
      document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
      // Clear prior timer if any
      window.__navActiveReleaseTimer && clearTimeout(window.__navActiveReleaseTimer);
      window.__navActiveReleaseTimer = setTimeout(() => {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        // let the IntersectionObserver set the correct active link on next visibility change
      }, 300);

      // ✅ Scroll to the section after restoring view
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 250); // delay to ensure goBack() finishes updating DOM
    }
  });
});


const switcher = document.getElementById('theme-switch');

function applyDarkTheme(enable) {
  if (enable) {
    document.body.classList.add('dark');
    document.head.appendChild(darkCSS);
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    document.getElementById('dark-css')?.remove();
    localStorage.setItem('theme', 'light');
  }
}

// Create and load dark CSS
const darkCSS = document.createElement('link');
darkCSS.rel = 'stylesheet';
darkCSS.href = 'assets/css/dark.css';
darkCSS.id = 'dark-css';

// Load theme on page load
if (localStorage.getItem('theme') === 'dark') {
  applyDarkTheme(true);
  switcher.checked = true;
}

switcher.addEventListener('change', function () {
  applyDarkTheme(this.checked);
});

/**
   * Toggle dropdowns in mobile nav (e.g., "More" menu)
   */
     /* changes
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });
*/
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 700); // Delay to see the loader animate
  });
}

  /**
   * Smooth reveal animation for sections and cards
   */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px'
  });

  document.querySelectorAll('.resume-item, .project-card, .service-item, .skill-card, .stats-item').forEach((element) => {
    revealObserver.observe(element);
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS animation initialization
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', aosInit);

  /**
   * Typed.js initialization
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * PureCounter init
   */
  new PureCounter();

  /**
   * Animate skill progress bars when in view
   */
function isMobileView() {
  return window.innerWidth <= 768;
}

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', function (e) {
    if (!isMobileView()) return; // Prevent selection in desktop/tablet

    // Remove any previously active card
    document.querySelectorAll('.skill-card.active').forEach(activeCard => {
      activeCard.classList.remove('active');
    });

    // Add active to current
    this.classList.add('active');

    // Remove after 2 seconds
    setTimeout(() => {
      this.classList.remove('active');
    }, 2000);
  });
});

  /**
   * Lightbox for images/videos
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Isotope layout for portfolio filters
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      let iso = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
        filterBtn.addEventListener('click', function () {
          isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
          aosInit(); // Refresh AOS on filter
        });
      });
    });
  });

  /**
   * Swiper slider initialization
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Smooth scroll to section on page load (if URL has hash)
   */
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop);
        window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
      }, 100);
    }
  });

  /**
   * Show custom section from "More" dropdown (e.g., achievements, certifications)
   */
  function showCustomSection(sectionId) {
    const defaultSections = ['hero', 'about', 'skills', 'resume', 'services', 'contact', 'stats','project-demos-section','career-timeline-section'];
    const customSections = ['achievements-section', 'certifications-section'];
    const footer = document.querySelector('footer');

    // Hide all sections and footer
    [...defaultSections, ...customSections].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    if (footer) footer.style.display = 'none';

    // Show selected custom section
    const target = document.getElementById(`${sectionId}-section`);
    if (target) target.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Back button to return from custom section to main sections
   */
  window.goBack = function () {
    const defaultSections = ['hero', 'about', 'skills', 'resume', 'services', 'contact', 'stats','project-demos-section','career-timeline-section'];
    const customSections = ['achievements-section', 'certifications-section'];
    const footer = document.querySelector('footer');

    // Hide custom sections
    customSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    // Show default sections and footer
    defaultSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'block';
    });

    if (footer) footer.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Attach section toggle behavior to dropdown links with `data-section`
   */
  document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      showCustomSection(section);
    });
  });

  /**
   * Scrollspy - highlight active menu based on scroll
   */

  /* changes here*/
 let navmenulinks = document.querySelectorAll('.navmenu a');

  // Robust scrollspy: prefer viewport-center detection (works reliably on small/tall sections and mobile)
  (function setupIntersectionScrollspy() {
    const sectionMap = new Map();
    const sections = [];

    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (section) {
        sectionMap.set(section, link);
        sections.push(section);
      }
    });

    if (!sections.length) return;

    // Helper: set active link
    function setActiveLink(link) {
      if (!link) return;
      document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }

    // Primary: viewport-center detection
    function activeByViewportCenter() {
      const centerY = window.innerHeight / 2;
      let bestSection = null;
      let bestDistance = Infinity;

      sections.forEach(sec => {
        // Skip hidden sections
        if (getComputedStyle(sec).display === 'none') return;
        const rect = sec.getBoundingClientRect();
        // If center is inside this section, prefer it immediately
        if (rect.top <= centerY && rect.bottom >= centerY) {
          bestSection = sec;
          bestDistance = 0;
          return;
        }
        // Otherwise compute distance from center to section center
        const secCenter = rect.top + rect.height / 2;
        const distance = Math.abs(secCenter - centerY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = sec;
        }
      });

      if (bestSection) {
        const link = sectionMap.get(bestSection);
        if (link) setActiveLink(link);
      }
    }

    // Debounce helper
    let scrollTimer = null;
    function debounceActive() {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        activeByViewportCenter();
      }, 80);
    }

    // Secondary: IntersectionObserver as a gentle fallback to catch quick jumps and hash loads
    const observer = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach(entry => {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      });
      if (best && best.isIntersecting) {
        const activeLink = sectionMap.get(best.target);
        if (activeLink) setActiveLink(activeLink);
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '0px 0px -10% 0px' });

    sections.forEach(sec => observer.observe(sec));

    // Run on load to set initial active
    window.addEventListener('load', activeByViewportCenter);
    // Update on scroll and resize
    document.addEventListener('scroll', debounceActive, { passive: true });
    window.addEventListener('resize', debounceActive);
  })();

})();
 document.addEventListener("DOMContentLoaded", function () {
    const dropdownTriggers = document.querySelectorAll('.navmenu .dropdown > a');

    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        const parent = this.parentElement;
        const submenu = parent.querySelector('.dropdown-menu');

        if (submenu.classList.contains('dropdown-active')) {
          submenu.classList.remove('dropdown-active');
        } else {
          // Close all others
          document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('dropdown-active'));
          submenu.classList.add('dropdown-active');
        }
      });
    });
  });

$(function(){
  $().timelinr({
    orientation: 'horizontal', // 'vertical' for up/down arrows
    issuesSpeed: 500,
    datesSpeed: 120,
    arrowKeys: 'true',
    startAt: 1 // Start at the first item
  });
});
