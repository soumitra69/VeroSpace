// This function toggles the display of a dropdown panel
function toggleDropdown(dropdownId) {
  // Close all other dropdowns first
  closeAllDropdowns(dropdownId);

  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle("show");
    // Also toggle active state on the button for styling (e.g., rotating arrow)
    const button = dropdown.previousElementSibling;
    if (button) {
      button.classList.toggle("active");
    }
  }
}

// Function to close all open dropdowns, except for the one specified
function closeAllDropdowns(exceptId = null) {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach((dropdown) => {
    if (dropdown.id !== exceptId && dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      const button = dropdown.previousElementSibling;
      if (button) {
        button.classList.remove("active");
      }
    }
  });
}

// Close dropdowns if the user clicks outside of them
window.onclick = function (event) {
  if (!event.target.matches(".dropdown-toggle")) {
    closeAllDropdowns();
  }
};

// Prevent dropdown from closing when clicking inside it
document.addEventListener("DOMContentLoaded", function () {
  const dropdownContents = document.querySelectorAll(".dropdown-content");
  dropdownContents.forEach((content) => {
    content.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
});

// --- Existing Slider Logic (if you have any, keep it) ---
// For example, the dual-range slider logic from your form
document.addEventListener("DOMContentLoaded", function () {
  // Initialize sliders from the main form
  initializeCustomSlider("sqft-slider", 500, 5000, 1000, 3500, "sqft");
  initializeCustomSlider("price-slider", 1000, 100000, 20000, 75000, "$");

  // Any other initializations for the properties page
});

function initializeCustomSlider(
  sliderId,
  min,
  max,
  defaultMin,
  defaultMax,
  unit
) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const range = slider.querySelector(".slider-range");
  const minThumb = slider.querySelector('[data-thumb="min"]');
  const maxThumb = slider.querySelector('[data-thumb="max"]');

  // Create display elements
  const minDisplay = document.createElement("div");
  minDisplay.className = "slider-display";
  slider.appendChild(minDisplay);

  const maxDisplay = document.createElement("div");
  maxDisplay.className = "slider-display";
  slider.appendChild(maxDisplay);

  let activeThumb = null;

  function updateSlider() {
    const minVal = parseInt(minThumb.dataset.value || defaultMin);
    const maxVal = parseInt(maxThumb.dataset.value || defaultMax);

    const minPos = ((minVal - min) / (max - min)) * 100;
    const maxPos = ((maxVal - min) / (max - min)) * 100;

    range.style.left = `${minPos}%`;
    range.style.width = `${maxPos - minPos}%`;
    minThumb.style.left = `${minPos}%`;
    maxThumb.style.left = `${maxPos}%`;

    minDisplay.style.left = `${minPos}%`;
    maxDisplay.style.left = `${maxPos}%`;

    minDisplay.textContent =
      unit === "$"
        ? `${unit}${minVal.toLocaleString()}`
        : `${minVal.toLocaleString()} ${unit}`;
    maxDisplay.textContent =
      unit === "$"
        ? `${unit}${maxVal.toLocaleString()}`
        : `${maxVal.toLocaleString()} ${unit}`;
  }

  function handleMove(e) {
    if (!activeThumb) return;

    const rect = slider.getBoundingClientRect();
    let x = (e.clientX || e.touches[0].clientX) - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    let newValue = Math.round(min + (percent / 100) * (max - min));

    let minVal = parseInt(minThumb.dataset.value);
    let maxVal = parseInt(maxThumb.dataset.value);

    if (activeThumb === minThumb) {
      newValue = Math.min(newValue, maxVal - 1); // Ensure min is less than max
      minThumb.dataset.value = newValue;
    } else {
      newValue = Math.max(newValue, minVal + 1); // Ensure max is greater than min
      maxThumb.dataset.value = newValue;
    }
    updateSlider();
  }

  function handleEnd() {
    if (activeThumb) {
      activeThumb.classList.remove("active");
    }
    activeThumb = null;
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchend", handleEnd);
  }

  [minThumb, maxThumb].forEach((thumb) => {
    thumb.addEventListener("mousedown", (e) => {
      activeThumb = e.target;
      activeThumb.classList.add("active");
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
    });
    thumb.addEventListener("touchstart", (e) => {
      activeThumb = e.target;
      activeThumb.classList.add("active");
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    });
  });

  minThumb.dataset.value = defaultMin;
  maxThumb.dataset.value = defaultMax;
  updateSlider();
}
