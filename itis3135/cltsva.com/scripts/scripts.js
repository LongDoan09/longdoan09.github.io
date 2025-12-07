// =============================
//  CLTSVA Website JavaScript
// =============================

// All vanilla JS runs when page loads
document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // Helper: Validate Email Format
    // -----------------------------
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  
    // -----------------------------
    // Register Form Functionality
    // -----------------------------
    const regForm = document.getElementById("regForm");
  
    if (regForm) {
      regForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const association = document.getElementById("association").value;
        const guests = document.getElementById("guests").value;
  
        if (!name || !email || !association || !guests) {
          alert("Please fill in all required fields.");
          return;
        }
  
        if (!isValidEmail(email)) {
          alert("Please enter a valid email address.");
          return;
        }
  
        alert("Thank you! Your registration has been submitted successfully.");
        regForm.reset();
      });
    }
  
    // -----------------------------
    // Contact Form Functionality
    // -----------------------------
    const contactForm = document.getElementById("contactForm");
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const cname = document.getElementById("cname").value.trim();
        const cemail = document.getElementById("cemail").value.trim();
        const cmsg = document.getElementById("cmsg").value.trim();
  
        if (!cname || !cemail || !cmsg) {
          alert("Please complete all contact form fields.");
          return;
        }
  
        if (!isValidEmail(cemail)) {
          alert("Invalid email address format.");
          return;
        }
  
        alert("Thank you! Your message has been sent.");
        contactForm.reset();
      });
    }
  
    // -----------------------------
    // Navigation Hover Effect
    // -----------------------------
    const navLinks = document.querySelectorAll("nav ul li a");
  
    navLinks.forEach(link => {
      link.addEventListener("mouseenter", () => {
        link.style.opacity = "0.7";
      });
  
      link.addEventListener("mouseleave", () => {
        link.style.opacity = "1";
      });
    });
  
  });
  
  
  // =============================
  //  jQuery Dropdowns (Events + FAQ)
  // =============================
  $(document).ready(function () {
  
    // -----------------------------
    // Event Dropdowns
    // -----------------------------
    $(".dropdown-title").click(function () {
  
      // Toggle the event list
      $(this).next(".dropdown-list").slideToggle();
  
      // Swap ▼ ↔ ▲
      if ($(this).text().includes("▼")) {
        $(this).text($(this).text().replace("▼", "▲"));
      } else {
        $(this).text($(this).text().replace("▲", "▼"));
      }
  
    });
  
    // -----------------------------
    // FAQ Dropdowns
    // -----------------------------
    $(".faq-question").click(function () {
  
      // Toggle the FAQ answer
      $(this).next(".faq-answer").slideToggle();
  
      // Swap ▼ ↔ ▲
      if ($(this).text().includes("▼")) {
        $(this).text($(this).text().replace("▼", "▲"));
      } else {
        $(this).text($(this).text().replace("▲", "▼"));
      }
  
    });
  
  });

  