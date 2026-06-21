// ===========================
//  GreenTrails - Main JavaScript
// ===========================


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