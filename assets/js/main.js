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
  navLink.addEventListener('click', (e) => {
    const href = navLink.getAttribute('href');

    if (href === '#hero') {
      e.preventDefault(); // prevent default scroll
      goBack(); // show all default sections again
      setTimeout(() => {
        document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    if (document.querySelector('#header.header-show')) {
      headerToggle();
    }
  });
});


 document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('active');

    if (window.innerWidth <= 768) {
      setTimeout(() => {
        card.classList.remove('active');
      }, 0); // 2.5 seconds
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
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 700); // Delay to see the loader animate
  });
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
