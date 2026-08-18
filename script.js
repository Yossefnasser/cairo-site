// Mobile Menu Toggle
let mobileMenu, navLinks;

async function initDynamicElements() {
  mobileMenu = document.querySelector('.mobile-menu');
  navLinks = document.querySelector('.nav-links');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenu.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenu) mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

// Initialize dynamic elements after HTML is included
window.addEventListener('load', async () => {
  await includeHTML();
  initDynamicElements();
  initTheme();
});


// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add fade-in animation to sections on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For this static site, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');

    // Reset the form
    this.reset();
  });
}

// Add active class to current navigation item
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Theme Toggle Functionality
let themeToggle;
const html = document.documentElement;

function initTheme() {
  themeToggle = document.getElementById('theme-toggle');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}


// Products Slider Navigation
const prodSlider = document.querySelector('.products-slider');
const prodPrevBtn = document.querySelector('.prod-slider-arrow.prev');
const prodNextBtn = document.querySelector('.prod-slider-arrow.next');
let prodCurrentSlide = 0;
let prodSlideInterval;

function initProductsSlider() {
  if (!prodSlider || !prodPrevBtn || !prodNextBtn) return;

  const slides = prodSlider.querySelectorAll('.prod-slide');
  const totalSlides = slides.length;

  function updateProdSlider() {
    prodSlider.style.transform = `translateX(-${prodCurrentSlide * 100}%)`;
  }

  function nextProdSlide() {
    prodCurrentSlide = (prodCurrentSlide + 1) % totalSlides;
    updateProdSlider();
  }

  function prevProdSlide() {
    prodCurrentSlide = (prodCurrentSlide - 1 + totalSlides) % totalSlides;
    updateProdSlider();
  }

  prodNextBtn.addEventListener('click', () => {
    nextProdSlide();
    resetProdInterval();
  });

  prodPrevBtn.addEventListener('click', () => {
    prevProdSlide();
    resetProdInterval();
  });

  function resetProdInterval() {
    clearInterval(prodSlideInterval);
    prodSlideInterval = setInterval(nextProdSlide, 5000);
  }

  resetProdInterval();
}

// Initialize products slider
initProductsSlider();

// Projects Slider Navigation
const projectsSlider = document.querySelector('.projects-slider');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

if (projectsSlider && prevBtn && nextBtn) {
  const scrollAmount = 370; // project-item width (350px) + gap (20px)

  prevBtn.addEventListener('click', () => {
    projectsSlider.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    projectsSlider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

// Projects Page Filtering Logic
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Initialize filter and modal if on projects page
if (window.location.pathname.includes('projects.html')) {
  initProjectsFilter();
  initProjectModal();
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.close-modal');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal || !closeBtn) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      const img = card.querySelector('img').src;
      const title = card.querySelector('h3').innerText;
      const category = card.querySelector('.category-tag').innerText;
      const desc = card.querySelector('p').innerText;

      document.getElementById('modal-img').src = img;
      document.getElementById('modal-title').innerText = title;
      document.getElementById('modal-category').innerText = category;
      document.getElementById('modal-desc').innerText = desc + " This is a detailed description of the project, highlighting the architectural challenges, the solutions implemented, and the final outcome. Our team ensured that every detail met the highest standards of quality and sustainability.";

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}


// Function to include HTML files
async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  for (const el of elements) {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        el.innerHTML = `Error loading ${file}`;
      }
    } catch (err) {
      el.innerHTML = `Error loading ${file}`;
    }
  }
}
