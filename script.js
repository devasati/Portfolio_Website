let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Contact Me button of Navbar
document.getElementById("contactMe").addEventListener("click", function () {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
});

// For Opening Resume
document.getElementById("hireBtn").addEventListener("click", function (e) {
  e.preventDefault();
  window.open("./Dev_Asati_Resume.pdf", "_blank");
});

// For Opening Whatsapp
document.getElementById("whatsappIcon").addEventListener("click", function (e) {
  e.preventDefault();
  window.open("https://wa.me/7850821102", "_blank");
});

// For home page Mail icon
document.addEventListener("DOMContentLoaded", function () {
  const mailIcon = document.getElementById("mailIcon");

  if (mailIcon) {
    mailIcon.addEventListener("click", function (e) {
      e.preventDefault();

      const mailto = this.getAttribute("href");
      if (!mailto || !mailto.startsWith("mailto:")) {
        console.error("Mailto link is not properly set.");
        return;
      }

      // Attempt to open the email client
      window.location.href = mailto;

      // Fallback alert if no email client is configured
      setTimeout(() => {
        if (document.hasFocus()) {
          alert(
            "It looks like you don't have an email client configured. " +
              "You can reach me directly at: devasati0605@gmail.com"
          );
        }
      }, 300); // Slightly longer timeout for better reliability
    });
  } else {
    console.warn("Mail icon element not found.");
  }
});

// For Read More Button on About Section
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("popupModal");
  const btn = document.getElementById("readMoreBtn");
  const span = document.querySelector(".close");

  // Ensure modal is hidden and remove any conflicting classes
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
  }

  // Clear URL hash if it points to the modal (prevents auto-opening)
  if (window.location.hash === "#popupModal") {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
  }

  if (btn && modal && span) {
    let isModalOpen = false;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!isModalOpen) {
        modal.classList.add("show");
        modal.style.display = "flex"; // Ensure it's visible
        document.body.style.overflow = "hidden"; // Disable background scroll
        isModalOpen = true;
      }
    });

    span.addEventListener("click", function () {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.style.overflow = ""; // Re-enable background scroll
      isModalOpen = false;
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.style.overflow = "";
        isModalOpen = false;
      }
    });

    // Optional: close modal on Escape key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isModalOpen) {
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.style.overflow = "";
        isModalOpen = false;
      }
    });
  } else {
    console.warn("Modal elements not found. Skipping popup logic.");
  }
});

// For Opening Whatsapp Footer
document
  .getElementById("whatsappIconfoot")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://wa.me/7850821102", "_blank");
  });

// For home page Mail icon Footer
document.addEventListener("DOMContentLoaded", function () {
  const mailIcon = document.getElementById("mailIconfoot");

  if (mailIcon) {
    mailIcon.addEventListener("click", function (e) {
      e.preventDefault();

      const mailto = this.getAttribute("href");
      if (!mailto || !mailto.startsWith("mailto:")) {
        console.error("Mailto link is not properly set.");
        return;
      }

      // Attempt to open the email client
      window.location.href = mailto;

      // Fallback alert if no email client is configured
      setTimeout(() => {
        if (document.hasFocus()) {
          alert(
            "It looks like you don't have an email client configured. " +
              "You can reach me directly at: devasati0605@gmail.com"
          );
        }
      }, 300); // Slightly longer timeout for better reliability
    });
  } else {
    console.warn("Mail icon element not found.");
  }
});

// Contact me form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = form
        .querySelector('input[placeholder="Full Name"]')
        .value.trim();
      const email = form
        .querySelector('input[placeholder="Email"]')
        .value.trim();
      const phone = form
        .querySelector('input[placeholder="Phone Number"]')
        .value.trim();
      const subject = form
        .querySelector('input[placeholder="Subject"]')
        .value.trim();
      const message = form.querySelector("textarea").value.trim();

      // Basic validation
      if (!fullName || !email || !phone || !subject || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // Simple email regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Optional: basic phone number check
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      // Show user input
      alert(
        `Thank you for contacting me!\n\n` +
          `Full Name: ${fullName}\n` +
          `Email: ${email}\n` +
          `Phone Number: ${phone}\n` +
          `Subject: ${subject}\n` +
          `Message: ${message}`
      );

      form.reset(); // Optional: clear form after submit
    });
  }
});
