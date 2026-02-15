// Toggle mobile nav menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Accessibility: allow keyboard toggle for hamburger
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    navLinks.classList.toggle('open');
  }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ==================
// Dark Mode Toggle
// ==================
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  htmlElement.classList.add('dark-mode');
  themeToggle.classList.add('sun-mode');
}

// Listen for toggle changes
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    toggleTheme();
  }
});

function toggleTheme() {
  htmlElement.classList.toggle('dark-mode');
  themeToggle.classList.toggle('sun-mode');
  
  // Save preference
  const isDarkMode = htmlElement.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Animate skill bars when Skills section enters viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

const skillsSection = document.querySelector('.skills-section');
const skillLevels = document.querySelectorAll('.skill-level');
let skillsAnimated = false;

function animateSkillsOnScroll() {
  if (!skillsAnimated && isInViewport(skillsSection)) {
    skillLevels.forEach((bar) => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    });
    skillsAnimated = true;
    // Remove event listener after animation
    window.removeEventListener('scroll', animateSkillsOnScroll);
  }
}

window.addEventListener('scroll', animateSkillsOnScroll);


// Contact section fade-in
const contactSection = document.querySelector('.contact'); // Changed selector to .contact

function animateContactOnScroll() {
  if (isInViewport(contactSection)) {
    contactSection.classList.add('visible');
    // Remove listener so it only happens once
    window.removeEventListener('scroll', animateContactOnScroll);
  }
}

window.addEventListener('scroll', animateContactOnScroll);

// Intersection Observer for smooth animations on scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(section);
});

// Project Card "View More" link - prevent default behavior
document.querySelectorAll('.view-more-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior (jumping to top)
    });
});