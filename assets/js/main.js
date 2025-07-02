/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jul 2 2025
 * Author: BootstrapMade.com
 * Modified By: Vishnu Teja
 */

(function () {
  "use strict";

  /**
   * Header toggle for mobile nav
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navLink => {
    navLink.addEventListener('click', () => {
      if (document.querySelector('#header.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle dropdowns in mobile nav (e.g., "More" menu)
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

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
  document.querySelectorAll('.skills-animation').forEach((skillBlock) => {
    new Waypoint({
      element: skillBlock,
      offset: '80%',
      handler: function () {
        skillBlock.querySelectorAll('.progress .progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
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
    const defaultSections = ['hero', 'about', 'skills', 'resume', 'services', 'contact', 'stats'];
    const customSections = ['achievements-section', 'certifications-section', 'project-demos-section'];
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
    const defaultSections = ['hero', 'about', 'skills', 'resume', 'services', 'contact', 'stats'];
    const customSections = ['achievements-section', 'certifications-section', 'project-demos-section'];
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
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
