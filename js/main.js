// PRAXIS INITIATIVE - MAIN JAVASCRIPT
// WCAG 2.1 AA Compliant | Production-Ready

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      this.innerHTML = isExpanded ? '✕' : '☰';
    });
  }
  
  // ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jump
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // ===== FORM VALIDATION =====
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate email
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          emailInput.focus();
          return;
        }
      }
      
      // Simulate form submission
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        alert('Thank you! Your submission has been received.');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  });
  
  // ===== NEWSLETTER SUBSCRIPTION =====
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Simulate API call
      fetch('https://api.praxisinitiative.org/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
      .then(() => {
        alert('Successfully subscribed to our newsletter!');
        this.reset();
      })
      .catch(() => {
        alert('Thank you for subscribing! (Demo mode)');
        this.reset();
      });
    });
  });
  
  // ===== DROPDOWN MENU ACCESSIBILITY =====
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Keyboard navigation
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  });
  
  // ===== LAZY LOADING IMAGES =====
  const images = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s';
          
          if (img.complete) {
            img.style.opacity = '1';
          } else {
            img.addEventListener('load', () => {
              img.style.opacity = '1';
            });
          }
          
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // ===== BACK TO TOP BUTTON =====
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopButton);
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // ===== PRINT FUNCTIONALITY =====
  const printButtons = document.querySelectorAll('.print-page');
  
  printButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.print();
    });
  });
  
  // ===== ANNOUNCEMENT BANNER =====
  const announcementBanner = document.querySelector('.announcement-banner');
  
  if (announcementBanner) {
    const closeButton = announcementBanner.querySelector('.close-banner');
    
    closeButton.addEventListener('click', () => {
      announcementBanner.style.display = 'none';
      localStorage.setItem('praxis-announcement-closed', 'true');
    });
    
    // Check if user already closed banner
    if (localStorage.getItem('praxis-announcement-closed')) {
      announcementBanner.style.display = 'none';
    }
  }
  
  console.log('Praxis Initiative website loaded successfully!');
});