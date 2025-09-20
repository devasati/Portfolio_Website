// Mobile menu toggle
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Close mobile menu when clicking on a nav link
  const navLinks = navbar.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  });
}

// Contact Me button of Navbar
const contactMeBtn = document.getElementById("contactMe");
if (contactMeBtn) {
  contactMeBtn.addEventListener("click", function () {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    });
  });
}

// For Opening Resume
const hireBtn = document.getElementById("hireBtn");
if (hireBtn) {
  hireBtn.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Check if PDF exists before opening
    fetch('./Dev_Asati_Resume.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open("./Dev_Asati_Resume.pdf", "_blank");
        } else {
          alert("Resume is currently unavailable. Please contact me directly at devasati0605@gmail.com");
        }
      })
      .catch(() => {
        alert("Resume is currently unavailable. Please contact me directly at devasati0605@gmail.com");
      });
  });
}

// Utility function for WhatsApp links
function openWhatsApp(e) {
  e.preventDefault();
  const whatsappUrl = "https://wa.me/7850821102";
  
  // Check if on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile, try to open WhatsApp app first
    window.location.href = `whatsapp://send?phone=7850821102`;
    
    // Fallback to web WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  } else {
    // On desktop, open web WhatsApp
    window.open(whatsappUrl, "_blank");
  }
}

// WhatsApp icons
const whatsappIcon = document.getElementById("whatsappIcon");
const whatsappIconFoot = document.getElementById("whatsappIconfoot");

if (whatsappIcon) {
  whatsappIcon.addEventListener("click", openWhatsApp);
}

if (whatsappIconFoot) {
  whatsappIconFoot.addEventListener("click", openWhatsApp);
}

// Utility function for email handling
function handleEmail(mailIcon, e) {
  e.preventDefault();

  const mailto = mailIcon.getAttribute("href");
  if (!mailto || !mailto.startsWith("mailto:")) {
    console.error("Mailto link is not properly set.");
    showEmailFallback();
    return;
  }

  // Try to open email client
  const emailWindow = window.open(mailto);
  
  // Check if email client opened (works on some browsers)
  setTimeout(() => {
    if (emailWindow && emailWindow.closed) {
      // Email client likely opened successfully
      return;
    }
    
    // Fallback for when no email client is available
    if (document.hasFocus()) {
      showEmailFallback();
    }
  }, 500);
}

function showEmailFallback() {
  const email = "devasati0605@gmail.com";
  
  // Try to copy email to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      alert(`Email copied to clipboard: ${email}\n\nYou can now paste it in your email client.`);
    }).catch(() => {
      alert(`Please reach me at: ${email}`);
    });
  } else {
    alert(`Please reach me at: ${email}`);
  }
}

// Email icons
document.addEventListener("DOMContentLoaded", function () {
  const mailIcon = document.getElementById("mailIcon");
  const mailIconFoot = document.getElementById("mailIconfoot");

  if (mailIcon) {
    mailIcon.addEventListener("click", function (e) {
      handleEmail(this, e);
    });
  }

  if (mailIconFoot) {
    mailIconFoot.addEventListener("click", function (e) {
      handleEmail(this, e);
    });
  }
});

// Modal handling for Read More
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("popupModal");
  const btn = document.getElementById("readMoreBtn");
  const span = document.querySelector(".close");

  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
  }

  // Clear URL hash if it points to the modal
  if (window.location.hash === "#popupModal") {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
  }

  if (btn && modal && span) {
    let isModalOpen = false;

    // Open modal
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isModalOpen) {
        openModal();
      }
    });

    // Close modal via close button
    span.addEventListener("click", closeModal);

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === modal && isModalOpen) {
        closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    });

    // Prevent modal from closing when clicking inside modal content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    function openModal() {
      modal.classList.add("show");
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      isModalOpen = true;
      
      // Focus trap for accessibility
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    function closeModal() {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.style.overflow = "";
      isModalOpen = false;
      
      // Return focus to the button that opened the modal
      btn.focus();
    }
  }
});

// Enhanced contact form handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact form");

  if (form) {
    // Add loading state
    let isSubmitting = false;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (isSubmitting) return; // Prevent double submission

      const fullName = form.querySelector('input[placeholder="Full Name"]')?.value.trim();
      const email = form.querySelector('input[placeholder="Email"]')?.value.trim();
      const phone = form.querySelector('input[placeholder="Phone Number"]')?.value.trim();
      const subject = form.querySelector('input[placeholder="Subject"]')?.value.trim();
      const message = form.querySelector("textarea")?.value.trim();

      // Enhanced validation
      const validation = validateForm(fullName, email, phone, subject, message);
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }

      isSubmitting = true;
      const submitBtn = form.querySelector('input[type="submit"]');
      const originalValue = submitBtn.value;
      submitBtn.value = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        alert(
          `Thank you for contacting me, ${fullName}!\n\n` +
          `I'll get back to you soon at ${email}.\n\n` +
          `Your message: "${message}"`
        );

        form.reset();
        isSubmitting = false;
        submitBtn.value = originalValue;
        submitBtn.disabled = false;
      }, 1000);
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  }
});

// Form validation functions
function validateForm(fullName, email, phone, subject, message) {
  if (!fullName || !email || !phone || !subject || !message) {
    return { isValid: false, message: "Please fill in all fields before submitting." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: "Please enter a valid phone number." };
  }

  if (fullName.length < 2) {
    return { isValid: false, message: "Please enter your full name." };
  }

  if (message.length < 10) {
    return { isValid: false, message: "Please provide a more detailed message (at least 10 characters)." };
  }

  return { isValid: true };
}

function validateField(field) {
  // Remove any existing error styling
  field.style.borderColor = "";
  
  const value = field.value.trim();
  const placeholder = field.placeholder;
  
  if (!value && field.hasAttribute('required')) {
    field.style.borderColor = "#ff6b6b";
    return false;
  }
  
  if (placeholder === "Email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.style.borderColor = "#ff6b6b";
      return false;
    }
  }
  
  if (placeholder === "Phone Number" && value) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      field.style.borderColor = "#ff6b6b";
      return false;
    }
  }
  
  field.style.borderColor = "#2ecc71";
  return true;
}

// Smooth scrolling for all internal links
document.addEventListener("DOMContentLoaded", function () {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without causing scroll
        history.pushState(null, null, href);
      }
    });
  });
});

// Add loading states and error handling for external links
document.addEventListener("DOMContentLoaded", function () {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Add a small loading indicator
      const originalText = this.innerHTML;
      this.style.opacity = '0.7';
      
      setTimeout(() => {
        this.style.opacity = '1';
      }, 200);
    });
  });
});

// Performance optimization: Lazy load animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.project-card, .services-box');
  animatedElements.forEach(el => observer.observe(el));
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
  document.addEventListener('touchstart', function() {}, { passive: true });
  
  // Add active states for touch
  const touchElements = document.querySelectorAll('.btn, .social-icons a, .services-box');
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
  });
}