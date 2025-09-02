function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach((item) => {
    item.classList.remove("active");
  });

  // If the clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Ensure proper initialization
document.addEventListener("DOMContentLoaded", function () {
  // The second FAQ item should be active by default (matching the screenshot)
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 1) {
    faqItems[1].classList.add("active");
  }
});

// Add keyboard accessibility
document.addEventListener("keydown", function (e) {
  if (e.target.classList.contains("faq-question")) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFAQ(e.target);
    }
  }
});

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
