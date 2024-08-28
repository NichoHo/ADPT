var prevScrollpos = window.pageYOffset;
var navbar = document.querySelector(".navbar");

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  
  if (currentScrollPos == 0) {
    navbar.style.backgroundColor = "transparent"; // If at the top, set background to transparent
  } else if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
    navbar.style.backgroundColor = "black"; // Change navbar background color to black when scrolling up
  } else {
    navbar.style.top = "-75px"; // Adjust the value based on your navbar height to completely hide it
    navbar.style.backgroundColor = "transparent"; // Change navbar background color to transparent when scrolling down
  }
  
  prevScrollpos = currentScrollPos;
}

document.addEventListener("DOMContentLoaded", function() {
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function(item) {
      var question = item.querySelector(".faq-question");
      var toggleSign = question.querySelector(".toggle-sign");

      question.addEventListener("click", function() {
          item.classList.toggle("active");
          toggleSign.textContent = item.classList.contains("active") ? "-" : "+";
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector('body');
  const sidebar = body.querySelector('nav');
  const toggle = body.querySelector(".toggle");
  const modeSwitch = body.querySelector(".toggle-switch");
  const modeText = body.querySelector(".mode-text");

  toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
  });

  modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
          modeText.innerText = "Light mode";
      } else {
          modeText.innerText = "Dark mode";
      }
  });
});

function showSlide(slideNumber) {
  if (slideNumber === 2) {
      // Check if all required fields on slide 1 are filled
      const fullName = document.querySelector('input[name="name"]').value.trim();
      const phoneNumber = document.querySelector('input[name="phone_number"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const password = document.querySelector('input[name="password"]').value.trim();
      const confirmPassword = document.querySelector('input[name="confirm_password"]').value.trim();
      const termsChecked = document.querySelector('input[name="terms"]').checked;

      if (!fullName || !phoneNumber || !email || !password || !confirmPassword || !termsChecked) {
          alert("Please fill in all the required fields before proceeding.");
          return; // Stop the function if any field is empty
      }

      if (password !== confirmPassword) {
          alert("Passwords do not match. Please re-enter them.");
          return; // Stop the function if passwords don't match
      }
  }

  // Hide all slides
  document.querySelectorAll('.form-slide').forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'none';
  });

  // Show the selected slide
  const currentSlide = document.getElementById(`slide${slideNumber}`);
  currentSlide.classList.add('active');
  currentSlide.style.display = 'flex';
}

// Set the initial active slide
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('slide1').classList.add('active');
  document.getElementById('slide1').style.display = 'flex';
});