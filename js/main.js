// ===========================
//  GreenTrails - Main JavaScript
// ===========================
// --- Initialize Bootstrap Tooltips ---
document.addEventListener('DOMContentLoaded', () => {
  const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipElements.forEach(el => new bootstrap.Tooltip(el));
});

// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkModeToggle) darkModeToggle.textContent = 'Light Mode';
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = 'Light Mode';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = 'Dark Mode';
    }
  });
}


// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// --- Active Nav Link Highlight ---
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});


// --- Fade-in on Scroll ---
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));


// ===========================
//  DESTINATIONS PAGE
//  Search + Region Filter
// ===========================

const destinationSearch = document.getElementById('destinationSearch');
const regionFilter = document.getElementById('regionFilter');
const destinationCards = document.querySelectorAll('.destination-card');
const noResultsMsg = document.getElementById('noResultsMsg');

let activeRegion = 'all';

function filterDestinations() {
  const searchTerm = destinationSearch ? destinationSearch.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  destinationCards.forEach(card => {
    const name = card.getAttribute('data-name');
    const region = card.getAttribute('data-region');

    const matchesSearch = name.includes(searchTerm);
    const matchesRegion = activeRegion === 'all' || region === activeRegion;

    if (matchesSearch && matchesRegion) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noResultsMsg) {
    noResultsMsg.classList.toggle('d-none', visibleCount !== 0);
  }
}

if (destinationSearch) {
  destinationSearch.addEventListener('input', filterDestinations);
}

if (regionFilter) {
  regionFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    regionFilter.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeRegion = btn.getAttribute('data-region');
    filterDestinations();
  });
}


// ===========================
//  ECO-ACCOMMODATIONS PAGE
//  Search + Type + Price Filter
// ===========================

const staySearch = document.getElementById('staySearch');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const stayCards = document.querySelectorAll('.stay-card');
const noStayResultsMsg = document.getElementById('noStayResultsMsg');

let activeType = 'all';

function filterStays() {
  const searchTerm = staySearch ? staySearch.value.trim().toLowerCase() : '';
  const activePrice = priceFilter ? priceFilter.value : 'all';
  let visibleCount = 0;

  stayCards.forEach(card => {
    const name = card.getAttribute('data-name');
    const type = card.getAttribute('data-type');
    const price = card.getAttribute('data-price');

    const matchesSearch = name.includes(searchTerm);
    const matchesType = activeType === 'all' || type === activeType;
    const matchesPrice = activePrice === 'all' || price === activePrice;

    if (matchesSearch && matchesType && matchesPrice) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noStayResultsMsg) {
    noStayResultsMsg.classList.toggle('d-none', visibleCount !== 0);
  }
}

if (staySearch) {
  staySearch.addEventListener('input', filterStays);
}

if (typeFilter) {
  typeFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    typeFilter.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeType = btn.getAttribute('data-type');
    filterStays();
  });
}

if (priceFilter) {
  priceFilter.addEventListener('change', filterStays);
}
// ===========================
//  TRAVEL BLOG PAGE
//  Live Search by Title
// ===========================

const blogSearch = document.getElementById('blogSearch');
const blogCards = document.querySelectorAll('.blog-card');
const noBlogResultsMsg = document.getElementById('noBlogResultsMsg');

function filterBlogPosts() {
  const searchTerm = blogSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  blogCards.forEach(card => {
    const title = card.getAttribute('data-title');

    if (title.includes(searchTerm)) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noBlogResultsMsg) {
    noBlogResultsMsg.classList.toggle('d-none', visibleCount !== 0);
  }
}

if (blogSearch) {
  blogSearch.addEventListener('input', filterBlogPosts);
}
// ===========================
//  CONTACT & BOOKING PAGE
//  Form Validation
// ===========================

const bookingForm = document.getElementById('bookingForm');
const formSuccessAlert = document.getElementById('formSuccessAlert');

function showError(input, errorId) {
  input.classList.add('is-invalid');
  document.getElementById(errorId).style.display = 'block';
}

function clearError(input, errorId) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  document.getElementById(errorId).style.display = 'none';
}

function validateBookingForm() {
  let isValid = true;

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const inquiryType = document.getElementById('inquiryType');
  const message = document.getElementById('message');

  // Full Name: required, at least 2 characters
  if (fullName.value.trim().length < 2) {
    showError(fullName, 'fullNameError');
    isValid = false;
  } else {
    clearError(fullName, 'fullNameError');
  }

  // Email: required, valid format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, 'emailError');
    isValid = false;
  } else {
    clearError(email, 'emailError');
  }

  // Phone: required, at least 7 digits
  const phoneDigits = phone.value.replace(/\D/g, '');
  if (phoneDigits.length < 7) {
    showError(phone, 'phoneError');
    isValid = false;
  } else {
    clearError(phone, 'phoneError');
  }

  // Inquiry Type: required
  if (inquiryType.value === '') {
    showError(inquiryType, 'inquiryTypeError');
    isValid = false;
  } else {
    clearError(inquiryType, 'inquiryTypeError');
  }

  // Message: required, at least 10 characters
  if (message.value.trim().length < 10) {
    showError(message, 'messageError');
    isValid = false;
  } else {
    clearError(message, 'messageError');
  }

  return isValid;
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = validateBookingForm();

    if (valid) {
      formSuccessAlert.classList.remove('d-none');
      bookingForm.reset();

      // Remove valid-state styling after reset
      bookingForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

      // Scroll to success message
      formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Hide success message after 6 seconds
      setTimeout(() => {
        formSuccessAlert.classList.add('d-none');
      }, 6000);
    } else {
      formSuccessAlert.classList.add('d-none');
    }
  });

  // Real-time validation as user types/selects
  ['fullName', 'email', 'phone', 'inquiryType', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', validateBookingForm);
      field.addEventListener('change', validateBookingForm);
    }
  });
}