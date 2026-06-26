document.addEventListener('DOMContentLoaded', function() {
  // Sticky header scroll effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu toggle
  var toggle = document.querySelector('.mobile-menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
    // Mobile sub-menu toggles
    nav.querySelectorAll('li').forEach(function(li) {
      if (li.querySelector('.sub-menu')) {
        li.querySelector('a').addEventListener('click', function(e) {
          if (window.innerWidth <= 980 && this.getAttribute('href') === '#') {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      }
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.main-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 980 && this.getAttribute('href') !== '#') {
        if (toggle) toggle.classList.remove('active');
        if (nav) nav.classList.remove('open');
      }
    });
  });

  // Scroll animations
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-in').forEach(function(el) {
      observer.observe(el);
    });
  }

  // Contact form handling
  var forms = document.querySelectorAll('.contact-form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var data = new FormData(form);
      var obj = {};
      data.forEach(function(val, key) { obj[key] = val; });

      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
      .then(function(res) { return res.json(); })
      .then(function() {
        btn.textContent = 'Sent!';
        form.reset();
        setTimeout(function() {
          btn.textContent = origText;
          btn.disabled = false;
        }, 3000);
      })
      .catch(function() {
        btn.textContent = origText;
        btn.disabled = false;
        alert('Something went wrong. Please call us at (318) 449-8988.');
      });
    });
  });
});
