//  For Select elements
const selectElement = document.getElementById("property-for");
const labelElement = document.getElementById("property-label");

if (selectElement && labelElement) {
  selectElement.addEventListener("focus", () => {
    labelElement.textContent = "Please choose Rent or Buy";
  });

  selectElement.addEventListener("change", () => {
    const selectedValue = selectElement.value;
    labelElement.textContent = `You selected: ${
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
    }`;
  });
}

//   Price Slider
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const track = document.getElementById("track");
const minLabel = document.getElementById("min-label");
const maxLabel = document.getElementById("max-label");

function showLabels() {
  minLabel.classList.add("show-label");
  maxLabel.classList.add("show-label");
}
function hideLabels() {
  minLabel.classList.remove("show-label");
  maxLabel.classList.remove("show-label");
}

[minRange, maxRange].forEach((input) => {
  input.addEventListener("touchstart", showLabels);
  input.addEventListener("mouseup", hideLabels);
  input.addEventListener("touchend", hideLabels);
  input.addEventListener("mouseleave", hideLabels);
});

function updateSlider() {
  let minVal = Number.parseInt(minRange.value);
  let maxVal = Number.parseInt(maxRange.value);

  if (maxVal - minVal < 1000) {
    if (event.target === minRange) {
      minRange.value = maxVal - 1000;
    } else {
      maxRange.value = minVal + 1000;
    }
  }

  minVal = Number.parseInt(minRange.value);
  maxVal = Number.parseInt(maxRange.value);

  const minPercent = (minVal / 20000) * 100;
  const maxPercent = (maxVal / 20000) * 100;

  track.style.left = `${minPercent}%`;
  track.style.width = `${maxPercent - minPercent}%`;

  minLabel.innerText = `$ ${minVal.toLocaleString()}`;
  maxLabel.innerText = `$ ${maxVal.toLocaleString()}`;

  const containerWidth =
    document.querySelector(".slider-container").offsetWidth;
  minLabel.style.left = `${(minVal / 20000) * containerWidth}px`;
  maxLabel.style.left = `${(maxVal / 20000) * containerWidth}px`;
}

if (minRange && maxRange) {
  minRange.addEventListener("input", updateSlider);
  maxRange.addEventListener("input", updateSlider);
  updateSlider();
}

//   For Counter
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    element.textContent =
      value >= 1000 ? Math.round(value / 1000) + "K+" : value + "+";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = Math.round(target / 1000) + "K+";
    }
  };
  window.requestAnimationFrame(step);
}

// For Active links
const navLinks = document.querySelectorAll(".nav-link");
const contactUsLink = document.querySelector(".nav-btns a[href*='contact-us']");
const currentPath = window.location.pathname.replace(/\/$/, "").toLowerCase();

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href").replace(/\/$/, "").toLowerCase();
  if (
    currentPath.endsWith(linkPath) ||
    (linkPath === "index.html" &&
      (currentPath === "" || currentPath === "/index.html"))
  ) {
    link.classList.add("active");
  }
});

// Handle Contact Us link in nav-btns section
if (contactUsLink) {
  const contactUsPath = contactUsLink
    .getAttribute("href")
    .replace(/\/$/, "")
    .toLowerCase();
  if (currentPath.endsWith(contactUsPath)) {
    contactUsLink.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".menu");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeBtn = document.querySelector(".close-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu-content a");

  function openMenu() {
    hamburger.classList.add("open");
    mobileOverlay.classList.add("active");
    document.body.classList.add("no-scroll", "menu-open");
    var floatingSearch = document.querySelector(".floating-search");
    if (floatingSearch) floatingSearch.style.display = "none";
    var floatingSearch1 = document.querySelector(".floating-search1");
    if (floatingSearch1) floatingSearch1.style.display = "none";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    mobileOverlay.classList.remove("active");
    // Only remove no-scroll if no modal is open
    if (!document.getElementById('loginModal').classList.contains('active') && !document.getElementById('registerModal').classList.contains('active')) {
    document.body.classList.remove("no-scroll", "menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    var floatingSearch = document.querySelector(".floating-search");
    if (floatingSearch) floatingSearch.style.display = "";
    var floatingSearch1 = document.querySelector(".floating-search1");
    if (floatingSearch1) floatingSearch1.style.display = "";
  }

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener("click", function () {
      if (mobileOverlay.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  mobileOverlay.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileOverlay.classList.contains("active")) {
      closeMenu();
    }
  });
});

// Initialize everything when DOM is ready
let propertiesSwiper;

document.addEventListener("DOMContentLoaded", () => {
  // Counter animation
  const trustedCustomers = document.getElementById("trustedCustomers");
  const housesSold = document.getElementById("housesSold");
  const propertyListed = document.getElementById("propertyListed");

  if (trustedCustomers) animateCounter(trustedCustomers, 15000, 1200);
  if (housesSold) animateCounter(housesSold, 20000, 1400);
  if (propertyListed) animateCounter(propertyListed, 75000, 1600);

  // Swiper initialization
  const Swiper = window.Swiper;
  if (typeof Swiper !== "undefined") {
    // Testimonials Swiper
    // Testimonials Swiper Configuration
    new Swiper(".testimonials-swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // Add these properties for better responsiveness
      grabCursor: true,
      watchOverflow: true,

      on: {
        init: function () {
          AOS.refresh();
        },
        slideChange: function () {
          AOS.refresh();
        },
      },

      breakpoints: {
        // Mobile devices
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
        },
        // Small tablets
        576: {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: true,
        },
        // Medium tablets
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
          centeredSlides: true,
        },
        // Desktop
        992: {
          slidesPerView: 2,
          spaceBetween: 50,
          centeredSlides: false,
        },
        // Large desktop
        1200: {
          slidesPerView: 2,
          spaceBetween: 60,
          centeredSlides: false,
        },
      },
    });

    // Properties Swiper
    propertiesSwiper = new Swiper(".properties-swiper", {
      slidesPerView: 1, // 👈 Default for mobile (up to 576px)
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      preloadImages: true,
      updateOnImagesReady: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      on: {
        init: function () {
          AOS.refresh();
        },
        slideChange: function () {
          AOS.refresh();
        },
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // Fix: Update Swiper on resize
  window.addEventListener("resize", () => {
    if (propertiesSwiper) {
      propertiesSwiper.update();
    }
  });
});

setTimeout(() => {
  if (document.readyState === "complete") {
    console.log("Fallback initialization...");
  }
}, 1000);

Array.from(document.querySelectorAll("*")).filter((el) => {
  const style = getComputedStyle(el);
  return (
    (style.overflowY === "auto" || style.overflowY === "scroll") &&
    el.scrollHeight > el.clientHeight
  );
});
