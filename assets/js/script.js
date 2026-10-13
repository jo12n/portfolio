'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// // testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// // modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// // add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {

//   testimonialsItem[i].addEventListener("click", function () {

//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//     modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//     testimonialsModalFunc();

//   });

// }

// // add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// // custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const pageOrder = ['about', 'resume', 'publications', 'projects'];

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    // Find current active page and its index
    let currentPage = null;
    let currentIndex = -1;
    let targetIndex = pageOrder.indexOf(targetPage);
    let targetPageElement = null;

    for (let j = 0; j < pages.length; j++) {
      if (pages[j].classList.contains("active")) {
        currentPage = pages[j];
        currentIndex = pageOrder.indexOf(pages[j].dataset.page);
      }
      if (pages[j].dataset.page === targetPage) {
        targetPageElement = pages[j];
      }
    }

    // Don't do anything if clicking on the same section
    if (currentPage && currentPage.dataset.page === targetPage) {
      return;
    }

    // Update navigation buttons immediately
    for (let j = 0; j < navigationLinks.length; j++) {
      if (navigationLinks[j].innerHTML.toLowerCase() === targetPage) {
        navigationLinks[j].classList.add("active");
      } else {
        navigationLinks[j].classList.remove("active");
      }
    }

    // Step 1: Hide current section immediately
    if (currentPage) {
      currentPage.classList.remove("active");
    }

    // Step 2: Scroll to top instantly
    const mainWrapper = document.getElementById('main-wrapper');
    if (mainWrapper) {
      mainWrapper.scrollIntoView({ behavior: 'instant' });
    }

    // Step 3: Show new section (small delay to ensure scroll completes)
    setTimeout(() => {
      if (targetPageElement) {
        targetPageElement.classList.add("active");
      }
    }, 50);

  });
}


// --------------  Dark mode toggle functionality ---------------------
const toggleSwitch = document.querySelector('input[type="checkbox"]');
// const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('theme-switch-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
// const textBox = document.getElementById('text-box');

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function toggleDarkLightMode(mode) {
  if (mode == DARK_THEME) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (toggleSwitch) toggleSwitch.checked = true;
    if (toggleIcon) toggleIcon.name = "moon";
  } else if (mode === LIGHT_THEME) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (toggleSwitch) toggleSwitch.checked = false;
    if (toggleIcon) toggleIcon.name = "sunny";
  }
}

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    toggleDarkLightMode(DARK_THEME);
  } else {
    toggleDarkLightMode(LIGHT_THEME);
  }
}

// Event Listeners
if (toggleSwitch) {
  toggleSwitch.addEventListener('change', switchTheme);
}

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) { // if a theme is already set in localStorage
  console.log(`Current theme from localStorage: ${currentTheme}`);
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleDarkLightMode(DARK_THEME);
  } else {
    toggleDarkLightMode(LIGHT_THEME);
  }
} else { // if no theme is set in localStorage, check system preference
  console.log(`No theme in localStorage, checking system preference...`);
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkLightMode(DARK_THEME);
  } else {
    toggleDarkLightMode(LIGHT_THEME);
  }
}

// ----------------------- Download CV PDF ------------------------
function generatePDF() {
  const link = document.createElement('a');
  link.href = 'files/cv/CV_Ignacio_Jolin_Rodrigo.pdf';
  link.download = 'CV_Ignacio_Jolin_Rodrigo.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ----------------------- Hero Overlay - Fluid Window Slide-Up ------------------------
document.addEventListener('DOMContentLoaded', function () {
  const heroSection = document.getElementById('hero');
  const mainWrapper = document.getElementById('main-wrapper');
  const navbar = document.querySelector('.navbar');
  const dragControl = document.querySelector('.hero-drag-control');
  const scrollArrow = document.querySelector('.scroll-arrow');

  if (!heroSection || !mainWrapper) return;

  let isDragging = false;
  let hasMoved = false;
  let isTransitioning = false;
  let startY = 0;
  let currentY = 0;
  let dragY = 0;
  let startTime = 0;
  let lastY = 0;
  let lastTime = 0;
  let velocity = 0;
  let rafId = null;

  function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || 800;
  }

  function updateDragPositions() {
    const vh = getWindowHeight();
    const progress = Math.min(1, Math.max(0, dragY / vh));

    // Hero moves up:
    heroSection.style.transform = `translate3d(0, ${-dragY}px, 0)`;
    const heroOpacity = Math.max(0, 1 - progress * 0.55);
    heroSection.style.opacity = heroOpacity.toFixed(3);

    // Main portfolio ascends from bottom (vh -> 0):
    const mainY = Math.max(0, vh - dragY);
    mainWrapper.style.transform = `translate3d(0, ${mainY}px, 0)`;

    // Navbar smoothly slides in:
    if (navbar) {
      const navProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.85));
      navbar.style.transform = `translate3d(0, ${-100 * (1 - navProgress)}%, 0)`;
      navbar.style.opacity = navProgress.toFixed(3);
    }
  }

  function finishOpen(flickVelocity) {
    if (isTransitioning) return;
    isTransitioning = true;
    isDragging = false;
    heroSection.classList.remove('is-dragging');

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const vh = getWindowHeight();
    const remaining = Math.max(0, vh - dragY);
    const speedFactor = flickVelocity ? Math.min(1.6, Math.max(0.6, flickVelocity)) : 1;
    const duration = Math.round(Math.max(380, Math.min(650, (remaining / vh) * 550 / speedFactor)));

    // Smooth spring deceleration curve
    const curve = 'cubic-bezier(0.16, 1, 0.3, 1)';

    heroSection.style.transition = `transform ${duration}ms ${curve}, opacity ${Math.round(duration * 0.75)}ms ease`;
    mainWrapper.style.transition = `transform ${duration}ms ${curve}`;
    if (navbar) {
      navbar.style.transition = `transform ${duration}ms ${curve}, opacity ${Math.round(duration * 0.7)}ms ease`;
    }

    // Move to destination
    heroSection.style.transform = `translate3d(0, -${vh}px, 0)`;
    heroSection.style.opacity = '0';
    mainWrapper.style.transform = 'translate3d(0, 0, 0)';
    if (navbar) {
      navbar.style.transform = 'translate3d(0, 0, 0)';
      navbar.style.opacity = '1';
    }

    setTimeout(() => {
      heroSection.classList.add('hidden');
      document.body.classList.remove('hero-visible');

      // Clean up inline styles so standard document flow and native scroll take over
      heroSection.style.transform = '';
      heroSection.style.opacity = '';
      heroSection.style.transition = '';
      mainWrapper.style.transform = '';
      mainWrapper.style.transition = '';
      if (navbar) {
        navbar.style.transform = '';
        navbar.style.opacity = '';
        navbar.style.transition = '';
      }

      isTransitioning = false;
      dragY = 0;

      // Notify Three.js and layout observers
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, duration + 20);
  }

  function snapBack() {
    if (isTransitioning) return;
    isDragging = false;
    heroSection.classList.remove('is-dragging');

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const duration = 400;
    const curve = 'cubic-bezier(0.2, 0.9, 0.3, 1)';
    const vh = getWindowHeight();

    heroSection.style.transition = `transform ${duration}ms ${curve}, opacity ${duration}ms ease`;
    mainWrapper.style.transition = `transform ${duration}ms ${curve}`;
    if (navbar) {
      navbar.style.transition = `transform ${duration * 0.8}ms ease, opacity ${duration * 0.8}ms ease`;
    }

    heroSection.style.transform = 'translate3d(0, 0, 0)';
    heroSection.style.opacity = '1';
    mainWrapper.style.transform = `translate3d(0, ${vh}px, 0)`;
    if (navbar) {
      navbar.style.transform = 'translate3d(0, -100%, 0)';
      navbar.style.opacity = '0';
    }

    setTimeout(() => {
      heroSection.style.transition = '';
      mainWrapper.style.transition = '';
      if (navbar) navbar.style.transition = '';
      dragY = 0;
    }, duration + 20);
  }

  function onPointerDown(clientY) {
    if (isTransitioning || !document.body.classList.contains('hero-visible')) return;

    isDragging = true;
    hasMoved = false;
    startY = clientY;
    currentY = clientY;
    lastY = clientY;
    startTime = performance.now();
    lastTime = startTime;
    velocity = 0;

    heroSection.classList.add('is-dragging');
    heroSection.style.transition = 'none';
    mainWrapper.style.transition = 'none';
    if (navbar) navbar.style.transition = 'none';
  }

  function onPointerMove(clientY, e) {
    if (!isDragging || isTransitioning) return;

    currentY = clientY;
    const deltaY = currentY - startY;

    if (Math.abs(deltaY) > 6) {
      hasMoved = true;
    }

    if (deltaY <= 0) {
      // Dragging up
      dragY = -deltaY;
    } else {
      // Pulling down: rubber-band elastic resistance
      dragY = -(deltaY * 0.22);
    }

    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 10) {
      velocity = (lastY - currentY) / dt;
      lastY = currentY;
      lastTime = now;
    }

    if (e && e.cancelable && hasMoved) {
      e.preventDefault();
    }

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        updateDragPositions();
        rafId = null;
      });
    }
  }

  function onPointerUp() {
    if (!isDragging || isTransitioning) return;

    const vh = getWindowHeight();
    const threshold = vh * 0.16; // 16% of screen height
    const isFlickUp = dragY > 40 && velocity > 0.35;

    if (hasMoved && (dragY > threshold || isFlickUp)) {
      finishOpen(velocity);
    } else if (hasMoved) {
      snapBack();
    } else {
      isDragging = false;
      heroSection.classList.remove('is-dragging');
    }
  }

  // --- Mouse Drag Events ---
  heroSection.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    onPointerDown(e.clientY);
  });

  window.addEventListener('mousemove', function (e) {
    onPointerMove(e.clientY, e);
  });

  window.addEventListener('mouseup', function () {
    onPointerUp();
  });

  // --- Touch Drag Events ---
  heroSection.addEventListener('touchstart', function (e) {
    if (e.touches.length > 0) {
      onPointerDown(e.touches[0].clientY);
    }
  }, { passive: true });

  heroSection.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      onPointerMove(e.touches[0].clientY, e);
    }
  }, { passive: false });

  heroSection.addEventListener('touchend', function () {
    onPointerUp();
  });

  heroSection.addEventListener('touchcancel', function () {
    onPointerUp();
  });

  // --- Wheel / Trackpad Scroll Event ---
  window.addEventListener('wheel', function (e) {
    if (!document.body.classList.contains('hero-visible') || isTransitioning) return;
    if (e.deltaY > 15) {
      e.preventDefault();
      finishOpen();
    }
  }, { passive: false });

  // --- Keyboard Event ---
  window.addEventListener('keydown', function (e) {
    if (!document.body.classList.contains('hero-visible') || isTransitioning) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      finishOpen();
    }
  });

  // --- Click Events ---
  if (dragControl) {
    dragControl.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      finishOpen();
    });
    dragControl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finishOpen();
      }
    });
  }

  if (scrollArrow) {
    scrollArrow.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      finishOpen();
    });
  }
});
