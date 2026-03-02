// Array of gallery images with their captions
const galleryImages = [
  { src: "images/mc1.png", caption: "Minecraft Server - Survival World" },
  { src: "images/mc2.png", caption: "Build your art in the game" },
  { src: "images/mc3.png", caption: "Our community in action" },
  { src: "images/mc4.png", caption: "Minecraft Server - Creative Build" },
  { src: "images/mc5.png", caption: "Community Events" },
  { src: "images/mc6.png", caption: "Server Infrastructure" }
];

// Current image index
let currentIndex = 0;

// Get DOM elements
const mainImage = document.getElementById("mainImage");
const imageCaption = document.getElementById("imageCaption");
const currentIndexDisplay = document.getElementById("currentIndex");
const totalImagesDisplay = document.getElementById("totalImages");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const thumbnails = document.querySelectorAll(".thumbnail");

// Initialize gallery
function initGallery() {
  // Set total images count
  if (totalImagesDisplay) {
    totalImagesDisplay.textContent = galleryImages.length;
  }
  
  // Update display
  updateGallery();
}

// Update gallery display
function updateGallery() {
  // Update main image
  if (mainImage) {
    mainImage.src = galleryImages[currentIndex].src;
    mainImage.alt = galleryImages[currentIndex].caption;
  }
  
  // Update caption
  if (imageCaption) {
    imageCaption.textContent = galleryImages[currentIndex].caption;
  }
  
  // Update counter
  if (currentIndexDisplay) {
    currentIndexDisplay.textContent = currentIndex + 1;
  }
  
  // Update active thumbnail
  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Go to next image
function nextImage() {
  currentIndex++;
  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }
  updateGallery();
}

// Go to previous image
function prevImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }
  updateGallery();
}

// Go to specific image
function goToImage(index) {
  currentIndex = index;
  updateGallery();
}

// Event listeners
if (nextBtn) {
  nextBtn.addEventListener("click", nextImage);
}

if (prevBtn) {
  prevBtn.addEventListener("click", prevImage);
}

// Thumbnail click events
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", function() {
    const index = parseInt(this.dataset.index);
    goToImage(index);
  });
});

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  // RegEx patterns
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageRegex = /^[\s\S]{10,500}$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let errors = [];

    if (!nameRegex.test(name)) {
      errors.push("Name must be 2-50 letters only.");
    }
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!messageRegex.test(message)) {
      errors.push("Message must be between 10 and 500 characters.");
    }

    if (errors.length > 0) {
      alert("Please fix the following:\n\n" + errors.join("\n"));
    } else {
      alert("Message sent! We will get back to you soon.");
      form.reset();
    }
  });
}

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length === 0) return;

  statNumbers.forEach(function (stat) {
    const target = parseInt(stat.textContent);
    let current = 0;
    const step = Math.ceil(target / 60);

    const interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      stat.textContent = current;
    }, 20);
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
  animateStats();
  initGallery();
});
