document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check for saved theme preference, otherwise use light as default
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- Skills Filter and Progress Bar Animation ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Function to animate skill progress bars
  const animateSkillBars = () => {
    skillCards.forEach(card => {
      if (card.style.display !== 'none') {
        const fillBar = card.querySelector('.skill-bar-fill');
        if (fillBar) {
          const targetWidth = fillBar.getAttribute('data-level') + '%';
          // Small timeout to allow display change to take effect for animation
          setTimeout(() => {
            fillBar.style.width = targetWidth;
          }, 50);
        }
      }
    });
  };

  // Reset all bars to 0% for animation
  const resetSkillBars = () => {
    const fillBars = document.querySelectorAll('.skill-bar-fill');
    fillBars.forEach(bar => {
      bar.style.width = '0%';
    });
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on tab buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      resetSkillBars();

      // Show/Hide skill cards based on filter
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });

      // Animate visible bars
      setTimeout(animateSkillBars, 150);
    });
  });

  // Animate skill bars when they enter viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const skillsSection = document.querySelector('#skills');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (skillsSection) {
    observer.observe(skillsSection);
  } else {
    // Fallback if observer isn't triggered or element not found
    setTimeout(animateSkillBars, 500);
  }

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      
      // Loading state animation
      submitBtn.disabled = true;
      submitBtn.innerHTML = '送信中... ⏳';
      
      // Simulate form submission to backend (2 seconds delay)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Show success status
        formStatus.classList.add('success');
        formStatus.innerText = 'メッセージが送信されました！お問い合わせありがとうございます。💌';
        
        // Reset form fields
        contactForm.reset();
        
        // Fade out success message after 5 seconds
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.classList.remove('success');
            formStatus.style.opacity = '1';
            formStatus.style.display = 'none';
          }, 300);
        }, 5000);
      }, 1500);
    });
  }

  // --- Smooth Scrolling for Navigation ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Offset header height
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
