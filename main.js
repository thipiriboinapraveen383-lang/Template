// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // ===== PRELOADER =====
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 1500);
  
  // ===== CUSTOM 404 HANDLER =====
  // Check if current page is 404 (you can implement this based on your routing)
  const is404 = false; // Set to true for demo
  if (is404) {
    document.getElementById('custom-404').style.display = 'flex';
    document.querySelector('.wrapper').style.display = 'none';
  }
  
  // ===== RESPONSIVE NAVIGATION =====
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // ===== ACTIVE NAVIGATION LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function setActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveLink);
  
  // ===== GSAP ANIMATIONS =====
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate elements with data-gsap attribute
  document.querySelectorAll('[data-gsap]').forEach(el => {
    const animation = el.dataset.gsap;
    const delay = el.dataset.delay || 0;
    
    let gsapConfig = {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    };
    
    if (animation === 'fadeLeft') {
      gsapConfig.x = -50;
    } else if (animation === 'fadeRight') {
      gsapConfig.x = 50;
    }
    
    gsap.from(el, gsapConfig);
  });
  
  // ===== PROJECT SLIDER =====
  const slider = document.getElementById('project-slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dots = document.querySelectorAll('.dot');
  
  if (slider && slides.length) {
    let currentSlide = 0;
    
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
      });
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
    });
    
    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 5000);
  }
  
  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      delay: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%'
      }
    });
  });
  
  // ===== MOUSE GLOW EFFECT =====
  const mouseGlow = document.getElementById('mouse-glow');
  
  document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
    }
  });
  
  // ===== CONTACT FORM VALIDATION =====
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const message = document.getElementById('message')?.value;
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Message sent successfully! (Demo)');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }
  
  // ===== DOWNLOAD RESUME BUTTON =====
  const downloadBtn = document.getElementById('download-resume');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // ===== PLACEHOLDER RESUME CONTENT - REPLACE WITH YOUR OWN =====
      const resumeContent = `YOUR FULL NAME
===============================
Email: your.email@example.com
Phone: +1 234 567 890
LinkedIn: linkedin.com/in/yourprofile
Location: Your City, Country

PROFESSIONAL SUMMARY
--------------------
This is a placeholder for your professional summary. Replace this text with your own background,
experience, and career goals. Keep it concise and impactful.

WORK EXPERIENCE
---------------
Job Title | Company Name | Start Date - End Date
• Describe your key achievement or responsibility
• Another important accomplishment
• Additional responsibility or project

Job Title | Company Name | Start Date - End Date
• Describe your key achievement or responsibility
• Another important accomplishment
• Additional responsibility or project

EDUCATION
---------
Degree Name | University Name | Year - Year
• Relevant coursework or achievements

SKILLS
------
• Skill 1, Skill 2, Skill 3, Skill 4, Skill 5
• Skill 6, Skill 7, Skill 8, Skill 9, Skill 10

CERTIFICATIONS
--------------
• Certification Name - Issuing Organization (Year)
• Certification Name - Issuing Organization (Year)

LANGUAGES
---------
• Language 1 (Fluency Level)
• Language 2 (Fluency Level)`;

      // Create blob and download
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Your_Name_Resume.txt'; // Change this filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('Resume template downloaded. Replace with your own content!');
    });
  }
  
  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navMenu) navMenu.classList.remove('active');
      }
    });
  });
  
  // ===== PARALLAX EFFECT ON HOVER =====
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});