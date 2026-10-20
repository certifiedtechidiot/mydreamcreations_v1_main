// ===================================================
// DREAM CREATION EVENTS - INTERACTIVE SCRIPT
// Slideshows, Scroll Animations & WhatsApp Inquiries
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize Scroll Reveal Animations
  initScrollAnimations();

  // Initialize Navbar Scroll Listener
  initNavbarScroll();

  // Initialize Hero Slideshow Auto-Rotation
  startHeroSlideshow();

  // Initialize Featured Weddings Auto-Rotation
  startFeaturedAutoRotate();
});

// ===================================================
// 1. HERO SLIDESHOW WITH TIMED PHOTO INTERVALS
// ===================================================
let currentHeroSlide = 0;
let heroTimer = null;
const heroSlideInterval = 4500; // 4.5 seconds per photo

function setHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator-bar');
  if (!slides.length) return;

  currentHeroSlide = index % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === currentHeroSlide);
  });
}

function nextHeroSlide() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  setHeroSlide((currentHeroSlide + 1) % slides.length);
}

function startHeroSlideshow() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, heroSlideInterval);
}

// ===================================================
// 2. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ===================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  
  if (!('IntersectionObserver' in window) || window.innerWidth <= 768) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Safety fallback for mobile in-app browsers
  setTimeout(() => {
    elements.forEach(el => el.classList.add('in-view'));
  }, 1500);
}

// ===================================================
// 3. NAVBAR ELEVATION ON SCROLL
// ===================================================
function initNavbarScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===================================================
// 4. FEATURED WEDDINGS AUTO-ROTATING GALLERY
// ===================================================
const featuredImages = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
  "assets/hero_goa_reception.jpg"
];

let featuredStartIndex = 0;
let featuredTimer = null;

function updateFeaturedCards() {
  const cards = document.querySelectorAll('.featured-img-card img');
  cards.forEach((img, i) => {
    const imgIndex = (featuredStartIndex + i) % featuredImages.length;
    img.style.opacity = '0.3';
    setTimeout(() => {
      img.src = featuredImages[imgIndex];
      img.style.opacity = '1';
    }, 200);
  });
}

function nextFeaturedSlide() {
  featuredStartIndex = (featuredStartIndex + 1) % featuredImages.length;
  updateFeaturedCards();
}

function prevFeaturedSlide() {
  featuredStartIndex = (featuredStartIndex - 1 + featuredImages.length) % featuredImages.length;
  updateFeaturedCards();
}

function startFeaturedAutoRotate() {
  if (featuredTimer) clearInterval(featuredTimer);
  featuredTimer = setInterval(nextFeaturedSlide, 5000);

  // Pause on hover
  const track = document.getElementById('featuredTrack');
  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(featuredTimer));
    track.addEventListener('mouseleave', () => {
      featuredTimer = setInterval(nextFeaturedSlide, 5000);
    });
  }
}

// ===================================================
// 5. TESTIMONIALS SLIDER
// ===================================================
const testimonials = [
  {
    quote: "Dream Creation Events made our dream wedding a reality. Their attention to detail, creativity and professionalism were beyond anything we imagined. We couldn't have asked for a more perfect day!",
    author: "— EMILY & JAMES"
  },
  {
    quote: "Working with Zaan and the Dream Creation team was the best decision we made for our Goan destination wedding. The floral mandap and evening reception were utterly breathtaking.",
    author: "— ALIZEH & FARHAN"
  },
  {
    quote: "From our first consultation to the final dance, every moment was handled with calm grace and impeccable taste. Our guests are still raving about the decor!",
    author: "— ROHAN & DANIELLE"
  }
];

let activeTestimonialIndex = 0;

function setTestimonial(index) {
  activeTestimonialIndex = index;
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const dots = document.querySelectorAll('.testimonial-dots .dot');

  if (quoteEl && authorEl) {
    quoteEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.innerText = testimonials[index].quote;
      authorEl.innerText = testimonials[index].author;
      quoteEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 250);
  }

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

// Auto-rotate testimonials
setInterval(() => {
  activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
  setTestimonial(activeTestimonialIndex);
}, 6500);

// ===================================================
// 6. MODAL & INQUIRY (DIRECT WHATSAPP)
// ===================================================
function openModal() {
  const modal = document.getElementById('inquiryModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openModalWithService(serviceName) {
  openModal();
  const select = document.getElementById('service');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === serviceName) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeModal() {
  const modal = document.getElementById('inquiryModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleBackdropClick(e) {
  if (e.target.id === 'inquiryModal') {
    closeModal();
  }
}

function submitInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;

  const text = `Hello Dream Creation Events! 💍\n\n` +
    `My name is *${name}*.\n` +
    `*Service Needed:* ${service}\n` +
    `*Date & Location in Goa:* ${date}\n` +
    `*Vision & Notes:* ${notes || 'Looking to discuss wedding planning & decor'}\n\n` +
    `Could you let us know your availability?`;

  const phone = '918788149303';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  closeModal();
}

// ===================================================
// 7. MOBILE MENU DRAWER
// ===================================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const btn = document.getElementById('mobileMenuBtn');
  if (drawer && btn) {
    const isOpen = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const btn = document.getElementById('mobileMenuBtn');
  if (drawer && btn) {
    drawer.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }
}
