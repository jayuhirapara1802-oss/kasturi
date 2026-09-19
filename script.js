const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const animatedItems = document.querySelectorAll('[data-animate]');

const updateHeader = () => {
  const header = document.querySelector('.site-header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 18);
  }
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const fields = ['name', 'company', 'email', 'phone', 'product', 'message'];
    let isValid = true;

    fields.forEach((field) => {
      const value = String(formData.get(field) || '').trim();
      if (!value) {
        isValid = false;
      }
    });

    if (!isValid) {
      if (formMessage) {
        formMessage.textContent = 'Please fill in all required fields before submitting.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
      }
      return;
    }

    const emailValue = String(formData.get('email') || '').trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      if (formMessage) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
      }
      return;
    }

    const phoneValue = String(formData.get('phone') || '').trim();
    const phonePattern = /^[+\d][\d\s().-]{7,}$/;
    if (!phonePattern.test(phoneValue)) {
      if (formMessage) {
        formMessage.textContent = 'Please enter a valid phone number.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
      }
      return;
    }

    const messageValue = String(formData.get('message') || '').trim();
    if (messageValue.length < 20) {
      if (formMessage) {
        formMessage.textContent = 'Please enter at least 20 characters in your message.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
      }
      return;
    }

    if (formMessage) {
      formMessage.textContent = 'Your enquiry has been successfully submitted.';
      formMessage.classList.remove('error');
      formMessage.classList.add('success');
    }

    contactForm.reset();
  });
}
