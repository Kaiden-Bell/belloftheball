document.addEventListener('DOMContentLoaded', () => {

  // Nav Bar Scripts
  const navbar = document.querySelector('.navbar');
  const servicesSection = document.getElementById('services');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const servicesOffsetTop = servicesSection.offsetTop;

    if (scrollPosition >= servicesOffsetTop - navbar.offsetHeight) {
      navbar.style.top = `-${navbar.offsetHeight}px`; // Hide the navbar when you reach the services section
    } else {
      navbar.style.top = '0'; // Make the navbar visible while scrolling
    }

    if (scrollPosition > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });

  // TypeWriter
  const businessName = "BELL OF THE BALL";
  let i = 0;
  const typingSpeed = 52;

  function typeWriter() {
    if (i < businessName.length) {
      document.getElementById('business-name').innerHTML += businessName.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  typeWriter();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });


  // Slide function for Portfolio
  let slideIndex = 0;

  function showSlides() {
    const slides = document.getElementById('slides');
    const images = slides.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > images.length) { slideIndex = 1 }
    images[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }

  function plusSlides(n) {
    const slides = document.getElementById('slides');
    const images = slides.getElementsByTagName('img');
    slideIndex += n;
    if (slideIndex > images.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = images.length }
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove('active');
    }
    images[slideIndex - 1].classList.add('active');
  }

  // Load images from JSON file
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      const slides = document.getElementById('slides');
      data.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        slides.appendChild(img);
      });
      showSlides();
  });
  window.plusSlides = plusSlides;
});
