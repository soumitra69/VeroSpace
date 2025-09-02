// Modal logic with scrollbar compensation
const loginBtn = document.getElementById("loginBtn");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLoginModal = document.getElementById("closeLoginModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");
const mobileNav = document.querySelector('.mobile-overlay');

// Scrollbar compensation logic
function getScrollbarWidth() {
  const container = document.createElement('div');
  container.style.visibility = 'hidden';
  container.style.overflow = 'scroll';
  container.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(container);
  const inner = document.createElement('div');
  container.appendChild(inner);
  const scrollbarWidth = container.offsetWidth - inner.offsetWidth;
  container.parentNode.removeChild(container);
  return scrollbarWidth;
}

function compensateScrollbar() {
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = scrollbarWidth + 'px';
}

function resetScrollbarCompensation() {
  document.body.style.paddingRight = '';
}

// Open login modal
function openLoginModal() {
  loginModal.classList.add("active");
  document.body.classList.add("no-scroll");
  compensateScrollbar();
  // Close mobile nav if open
  if (typeof mobileNav !== 'undefined') {
    mobileNav.classList.remove("active");
  }
  if (typeof overlay !== 'undefined') {
    overlay.classList.remove("active");
  }
}

function openRegisterModal() {
  registerModal.classList.add("active");
  document.body.classList.add("no-scroll");
  compensateScrollbar();
}

loginBtn && loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

mobileLoginBtn && mobileLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

// Close modals
closeLoginModal && closeLoginModal.addEventListener("click", () => {
  loginModal.classList.remove("active");
  document.body.classList.remove("no-scroll");
  resetScrollbarCompensation();
});

closeRegisterModal && closeRegisterModal.addEventListener("click", () => {
  registerModal.classList.remove("active");
  document.body.classList.remove("no-scroll");
  resetScrollbarCompensation();
});

// Close modal when clicking outside
loginModal && loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
    resetScrollbarCompensation();
  }
});

registerModal && registerModal.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
    resetScrollbarCompensation();
  }
});

// Switch between modals
forgotPasswordLink && forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
  // Keep no-scroll class since we're still in a modal
});

switchToRegister && switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  openRegisterModal();
  // Keep no-scroll class since we're still in a modal
});

switchToLogin && switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
  // Keep no-scroll class since we're still in a modal
});

// Form submissions
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
loginForm && loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login form submitted!");
  // Add your login logic here
});

registerForm && registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registration form submitted!");
  // Add your registration logic here
});

// Close modals with Escape key
if (loginModal && registerModal) {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      loginModal.classList.remove("active");
      registerModal.classList.remove("active");
      document.body.classList.remove("no-scroll");
      resetScrollbarCompensation();
    }
  });
}
