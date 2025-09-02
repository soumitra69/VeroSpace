document.addEventListener("DOMContentLoaded", function () {
  // Debug output to make sure JS is running
  console.log("✅ JS is running");

  const navLinks = document.querySelectorAll(".nav-link");
  console.log("Found", navLinks.length, "nav-link(s)");

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  console.log("Current page:", currentPage);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").toLowerCase();
    console.log("Comparing", href, "to", currentPage);

    if (
      currentPage === href ||
      (href === "index.html" &&
        (currentPage === "" || currentPage === "index.html"))
    ) {
      link.classList.add("active");
      console.log("✅ Added .active to:", href);
    }
  });

  // Swiper for Teams Section
  if (window.Swiper) {
    new Swiper(".teams-section-cards.swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      // Removed navigation and pagination options
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 60,
        },
      },
    });
  }
});

function animateCounter(element, target, duration = 1500) {
  let start = 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    // Format as "15K+"
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

document.addEventListener("DOMContentLoaded", () => {
  animateCounter(document.getElementById("trustedCustomers"), 15000, 1200);
  animateCounter(document.getElementById("housesSold"), 20000, 1400);
  animateCounter(document.getElementById("propertyListed"), 75000, 1600);
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".menu");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeBtn = document.querySelector(".close-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu-content a");

  function openMenu() {
    hamburger.classList.add("open");
    mobileOverlay.classList.add("active");
    document.body.classList.add("no-scroll", "menu-open");
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



