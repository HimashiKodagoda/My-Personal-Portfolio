// script.js - small interactions: nav toggle, smooth scroll, section highlight, simple theme swap, contact mailto fallback

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeBtn = document.getElementById('theme-btn');
  const themeLink = document.getElementById('theme-link');
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');

  // Set current year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Smooth scroll and close mobile nav after click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav
      nav.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // IntersectionObserver to highlight active nav link
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(s => obs.observe(s));
  }

  // Simple theme toggle (expects other color files like color-2.css later)
  if (themeBtn && themeLink) {
    themeBtn.addEventListener('click', () => {
      // toggle between color-1.css and color-2.css if you create it later
      const cur = themeLink.getAttribute('href') || 'color-1.css';
      themeLink.setAttribute('href', cur === 'color-1.css' ? 'color-2.css' : 'color-1.css');
      // If color-2.css doesn't exist yet, nothing will change — that's okay for now.
    });
  }

  // Contact form: open mail client via mailto (simple fallback — replace with real backend later)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (contactForm.name.value || '').trim();
      const email = (contactForm.email.value || '').trim();
      const message = (contactForm.message.value || '').trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const subject = `Portfolio contact from ${name}`;
      const body = `${message}\n\n— ${name}\n${email}`;
      const mailto = `mailto:your.email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // open default mail client
      window.location.href = mailto;

      // Reset form after submit
      contactForm.reset();
    });
  }
});

const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

elements.forEach(el => observer.observe(el));
const textArray = [
  "Frontend Developer",
  "Web Designer",
  "Software Engineering Student",
  "UI Enthusiast"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const typingElement = document.getElementById("typing");

  if (!typingElement) return;

  if (!isDeleting) {
    currentText = textArray[index].substring(0, charIndex++);
  } else {
    currentText = textArray[index].substring(0, charIndex--);
  }

  typingElement.textContent = currentText;

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === textArray[index].length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % textArray.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);
const textArray = [
  "Frontend Developer 💻",
  "Creative Designer 🎨",
  "Future Software Engineer 🚀"
];

function filterProjects(category) {
  const projects = document.querySelectorAll('.card');

  projects.forEach(project => {
    if (category === 'all' || project.classList.contains(category)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}
window.onscroll = () => {
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (scroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  let update = () => {
    let target = +counter.getAttribute('data-target');
    let count = +counter.innerText;

    let increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(update, 30);
    } else {
      counter.innerText = target;
    }
  };
  update();
});