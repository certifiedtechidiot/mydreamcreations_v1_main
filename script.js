// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Testimonials Data & Slider
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
    }, 200);
  }

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

// Auto-rotate testimonials every 6 seconds
setInterval(() => {
  activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
  setTestimonial(activeTestimonialIndex);
}, 6000);

// Featured Weddings Carousel Slide
const featuredImages = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85"
];

let featuredStartIndex = 0;

function updateFeaturedCards() {
  const cards = document.querySelectorAll('.featured-img-card img');
  cards.forEach((img, i) => {
    const imgIndex = (featuredStartIndex + i) % featuredImages.length;
    img.style.opacity = '0.5';
    setTimeout(() => {
      img.src = featuredImages[imgIndex];
      img.style.opacity = '1';
    }, 150);
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

// Modal Management
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

// Form Submission -> Direct WhatsApp
function submitInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;

  const text = `Hello Dream Creation Events! 💍\n\n` +
    `My name is *${name}*.\n` +
    `*Service:* ${service}\n` +
    `*Date & Location:* ${date}\n` +
    `*Vision:* ${notes || 'Looking to discuss wedding planning & decor'}\n\n` +
    `Could you let us know your availability?`;

  const phone = '918788149303';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  closeModal();
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.querySelector('.nav-links');
  if (nav) {
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '84px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = '#FFFFFF';
      nav.style.padding = '24px';
      nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      nav.style.borderBottom = '1px solid #E8E5DF';
    }
  }
}
