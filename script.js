/**
 * ============================================
 * PORTFOLIO WEBSITE - MAIN JAVASCRIPT FILE
 * ============================================
 * Author: Dev Asati
 * Description: Main functionality for portfolio website including
 *              mobile navigation, modal handling, form validation,
 *              and smooth scrolling behaviors
 * ============================================
 */

// ============================================
// MOBILE NAVIGATION MENU
// ============================================

/**
 * Handles mobile menu toggle functionality
 * Opens/closes navigation menu when hamburger icon is clicked
 */
const initMobileMenu = () => {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");

  // Exit if elements don't exist
  if (!menuIcon || !navbar) return;

  // Toggle menu on icon click
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Close menu when clicking on any navigation link
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    });
  });

  // Close menu when clicking outside of menu area
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  });
};

// ============================================
// CONTACT ME BUTTON - SMOOTH SCROLL
// ============================================

/**
 * Scrolls to contact section when Contact Me button is clicked
 */
const initContactButton = () => {
  const contactMeBtn = document.getElementById("contactMe");

  if (!contactMeBtn) return;

  contactMeBtn.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
};

// ============================================
// RESUME DOWNLOAD FUNCTIONALITY
// ============================================

/**
 * Handles resume download with error checking
 * Verifies PDF exists before attempting to open
 */
const initResumeDownload = () => {
  const hireBtn = document.getElementById("hireBtn");

  if (!hireBtn) return;

  hireBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const resumePath = "./Dev_Asati_Resume.pdf";

    // Check if PDF exists before opening
    fetch(resumePath, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          window.open(resumePath, "_blank");
        } else {
          showResumeError();
        }
      })
      .catch(() => {
        showResumeError();
      });
  });
};

/**
 * Displays error message when resume is unavailable
 */
const showResumeError = () => {
  alert(
    "Resume is currently unavailable. Please contact me directly at devasati0605@gmail.com"
  );
};

// ============================================
// WHATSAPP INTEGRATION
// ============================================

/**
 * Opens WhatsApp with appropriate method based on device
 * @param {Event} e - Click event
 */
const openWhatsApp = (e) => {
  e.preventDefault();

  const phoneNumber = "7850821102";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Detect mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // Try to open WhatsApp app on mobile
    window.location.href = `whatsapp://send?phone=${phoneNumber}`;

    // Fallback to web WhatsApp after delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  } else {
    // Open web WhatsApp on desktop
    window.open(whatsappUrl, "_blank");
  }
};

/**
 * Initialize WhatsApp icon click handlers
 */
const initWhatsAppIcons = () => {
  const whatsappIcon = document.getElementById("whatsappIcon");
  const whatsappIconFoot = document.getElementById("whatsappIconfoot");

  if (whatsappIcon) {
    whatsappIcon.addEventListener("click", openWhatsApp);
  }

  if (whatsappIconFoot) {
    whatsappIconFoot.addEventListener("click", openWhatsApp);
  }
};

// ============================================
// EMAIL FUNCTIONALITY
// ============================================

/**
 * Handles email icon clicks with fallback for no email client
 * @param {HTMLElement} mailIcon - The clicked email icon
 * @param {Event} e - Click event
 */
const handleEmail = (mailIcon, e) => {
  e.preventDefault();

  const mailto = mailIcon.getAttribute("href");

  // Validate mailto link
  if (!mailto || !mailto.startsWith("mailto:")) {
    console.error("Mailto link is not properly set.");
    showEmailFallback();
    return;
  }

  // Attempt to open email client
  window.location.href = mailto;

  // Check if email client opened successfully
  setTimeout(() => {
    if (document.hasFocus()) {
      showEmailFallback();
    }
  }, 500);
};

/**
 * Shows fallback when email client is unavailable
 * Attempts to copy email to clipboard
 */
const showEmailFallback = () => {
  const email = "devasati0605@gmail.com";

  // Try to copy email to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert(
          `Email copied to clipboard: ${email}\n\nYou can now paste it in your email client.`
        );
      })
      .catch(() => {
        alert(`Please reach me at: ${email}`);
      });
  } else {
    alert(`Please reach me at: ${email}`);
  }
};

/**
 * Initialize email icon click handlers
 */
const initEmailIcons = () => {
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
};

// ============================================
// MODAL POPUP - READ MORE
// ============================================

/**
 * Handles "Read More" modal functionality
 * Opens and closes modal with proper accessibility
 */
const initModal = () => {
  const modal = document.getElementById("popupModal");
  const btn = document.getElementById("readMoreBtn");
  const span = document.querySelector(".close");

  // Exit if elements don't exist
  if (!modal || !btn || !span) return;

  // Initialize modal state
  let isModalOpen = false;
  modal.classList.remove("show");
  modal.style.display = "none";

  // Clear URL hash if it points to modal
  if (window.location.hash === "#popupModal") {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
  }

  /**
   * Opens the modal with accessibility features
   */
  const openModal = () => {
    modal.classList.add("show");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    isModalOpen = true;

    // Focus trap for accessibility
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  };

  /**
   * Closes the modal and restores focus
   */
  const closeModal = () => {
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.style.overflow = "";
    isModalOpen = false;

    // Return focus to button that opened modal
    btn.focus();
  };

  // Event Listeners
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isModalOpen) {
      openModal();
    }
  });

  span.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal && isModalOpen) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalOpen) {
      closeModal();
    }
  });

  // Prevent modal from closing when clicking inside modal content
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
};

// ============================================
// CONTACT FORM VALIDATION & HANDLING
// ============================================

/**
 * Validates form data before submission
 * @param {string} fullName - User's full name
 * @param {string} email - User's email address
 * @param {string} phone - User's phone number
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 * @returns {Object} Validation result with isValid flag and message
 */
const validateForm = (fullName, email, phone, subject, message) => {
  // Check for empty fields
  if (!fullName || !email || !phone || !subject || !message) {
    return {
      isValid: false,
      message: "Please fill in all fields before submitting.",
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
    };
  }

  // Validate phone format
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      message: "Please enter a valid phone number.",
    };
  }

  // Validate name length
  if (fullName.length < 2) {
    return {
      isValid: false,
      message: "Please enter your full name.",
    };
  }

  // Validate message length
  if (message.length < 10) {
    return {
      isValid: false,
      message:
        "Please provide a more detailed message (at least 10 characters).",
    };
  }

  return { isValid: true };
};

/**
 * Validates individual form field
 * @param {HTMLElement} field - Form field to validate
 * @returns {boolean} Whether field is valid
 */
const validateField = (field) => {
  // Remove existing error styling
  field.style.borderColor = "";

  const value = field.value.trim();
  const placeholder = field.placeholder;

  // Check required fields
  if (!value && field.hasAttribute("required")) {
    field.style.borderColor = "#ff6b6b";
    return false;
  }

  // Validate email
  if (placeholder === "Email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.style.borderColor = "#ff6b6b";
      return false;
    }
  }

  // Validate phone
  if (placeholder === "Phone Number" && value) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      field.style.borderColor = "#ff6b6b";
      return false;
    }
  }

  // Field is valid
  field.style.borderColor = "#2ecc71";
  return true;
};

/**
 * Initializes contact form with validation and submission handling
 */
const initContactForm = () => {
  const form = document.querySelector(".contact form");

  if (!form) return;

  let isSubmitting = false;

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    // Get form values
    const fullName = form
      .querySelector('input[placeholder="Full Name"]')
      ?.value.trim();
    const email = form
      .querySelector('input[placeholder="Email"]')
      ?.value.trim();
    const phone = form
      .querySelector('input[placeholder="Phone Number"]')
      ?.value.trim();
    const subject = form
      .querySelector('input[placeholder="Subject"]')
      ?.value.trim();
    const message = form.querySelector("textarea")?.value.trim();

    // Validate form
    const validation = validateForm(fullName, email, phone, subject, message);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Set loading state
    isSubmitting = true;
    const submitBtn = form.querySelector('input[type="submit"]');
    const originalValue = submitBtn.value;
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      alert(
        `Thank you for contacting me, ${fullName}!\n\n` +
          `I'll get back to you soon at ${email}.\n\n` +
          `Your message: "${message}"`
      );

      // Reset form
      form.reset();
      isSubmitting = false;
      submitBtn.value = originalValue;
      submitBtn.disabled = false;

      // Reset field borders
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.style.borderColor = "";
      });
    }, 1000);
  });

  // Real-time validation on blur
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });
};

// ============================================
// SMOOTH SCROLLING FOR INTERNAL LINKS
// ============================================

/**
 * Enables smooth scrolling for all internal anchor links
 */
const initSmoothScrolling = () => {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#"
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without causing scroll
        history.pushState(null, null, href);
      }
    });
  });
};

// ============================================
// EXTERNAL LINKS ENHANCEMENT
// ============================================

/**
 * Adds loading states to external links
 */
const initExternalLinks = () => {
  const externalLinks = document.querySelectorAll('a[href^="http"]');

  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Add visual feedback
      this.style.opacity = "0.7";

      setTimeout(() => {
        this.style.opacity = "1";
      }, 200);
    });
  });
};

// ============================================
// INTERSECTION OBSERVER - LAZY ANIMATIONS
// ============================================

/**
 * Initializes intersection observer for lazy-loading animations
 * Adds 'animate' class when elements come into viewport
 */
const initLazyAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".project-card, .services-box"
  );
  animatedElements.forEach((el) => observer.observe(el));
};

// ============================================
// MOBILE TOUCH FEEDBACK
// ============================================

/**
 * Adds touch feedback for mobile devices
 * Provides scale animation on touch for better UX
 */
const initTouchFeedback = () => {
  // Only run on touch-enabled devices
  if (!("ontouchstart" in window)) return;

  // Enable passive touch events for better performance
  document.addEventListener("touchstart", function () {}, { passive: true });

  // Add active states for touch
  const touchElements = document.querySelectorAll(
    ".btn, .social-icons a, .services-box"
  );

  touchElements.forEach((element) => {
    element.addEventListener(
      "touchstart",
      function () {
        this.style.transform = "scale(0.98)";
      },
      { passive: true }
    );

    element.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      },
      { passive: true }
    );
  });
};

// ============================================
// TYPEWRITING EFFECT - Typed.js Integration
// ============================================

/**
 * Initializes the typewriting effect for the home section
 * Displays rotating text with a typing animation
 */
const initTypewritingEffect = () => {
  // Check if Typed.js library is loaded
  if (typeof Typed === "undefined") {
    console.error("Typed.js library not loaded");
    return;
  }

  const element = document.getElementById("element");

  // Exit if element doesn't exist
  if (!element) return;

  // Initialize Typed.js with configuration
  new Typed("#element", {
    strings: ["Software Developer", "App Developer", "Python Developer"],
    typeSpeed: 70, // Speed of typing in milliseconds
    backSpeed: 50, // Speed of backspacing
    backDelay: 2000, // Delay before backspacing
    loop: true, // Loop the animation
    cursorChar: "|", // Custom cursor character
  });
};

// ============================================
// SHOOTING STARS EFFECT
// ============================================

/**
 * Creates and animates shooting stars in the home section
 * Generates random shooting stars at varying intervals
 */
const initShootingStars = () => {
  const shootingStarsContainer = document.querySelector(".shooting-stars");

  // Exit if container doesn't exist
  if (!shootingStarsContainer) return;

  /**
   * Creates a single shooting star with random properties
   */
  const createShootingStar = () => {
    const star = document.createElement("div");
    star.className = "shooting-star";

    // Random starting position (top area, center-to-right region)
    const startX = Math.random() * 40 + 30; // 30-70% from left (center area)
    const startY = Math.random() * 30; // 0-30% from top (upper area)

    // Random animation duration (1.5-3 seconds)
    const duration = Math.random() * 1.5 + 1.5;

    // Random delay before appearing (0-2 seconds)
    const delay = Math.random() * 2;

    // Apply styles
    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    // Also apply duration to the tail
    const tailDuration = duration;
    star.style.setProperty("--tail-duration", `${tailDuration}s`);

    // Add to container
    shootingStarsContainer.appendChild(star);

    // Remove star after animation completes
    setTimeout(() => {
      star.remove();
    }, (duration + delay) * 1000);
  };

  /**
   * Generates shooting stars at random intervals
   */
  const generateStars = () => {
    // Create initial batch of stars
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        createShootingStar();
      }, i * 800);
    }

    // Continue creating stars at random intervals
    setInterval(() => {
      createShootingStar();
    }, Math.random() * 2500 + 1500); // Every 1.5-4 seconds (more frequent)

    // Additional sporadic stars for more natural effect
    setInterval(() => {
      if (Math.random() > 0.4) {
        createShootingStar();
      }
    }, Math.random() * 4000 + 2000); // Every 2-6 seconds (60% chance)
  };

  // Start generating stars
  generateStars();
};

// ============================================
// INITIALIZATION - DOM CONTENT LOADED
// ============================================

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
const initializeApp = () => {
  // Navigation
  initMobileMenu();
  initContactButton();

  // Interactive Elements
  initResumeDownload();
  initWhatsAppIcons();
  initEmailIcons();
  initModal();

  // Forms
  initContactForm();

  // Navigation Enhancements
  initSmoothScrolling();
  initExternalLinks();

  // Performance & UX
  initLazyAnimations();
  initTouchFeedback();

  // Typewriting Effect
  initTypewritingEffect();

  // Shooting Stars Effect
  initShootingStars();
};

// Execute initialization when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);
