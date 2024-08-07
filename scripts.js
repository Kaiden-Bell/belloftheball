document.addEventListener('DOMContentLoaded', () => {
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

  // Slider functionality
  let slideIndex = 0;

  function showSlides() {
    const slides = document.getElementById('slides');
    const images = slides.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > images.length) {slideIndex = 1}
    images[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }

  function plusSlides(n) {
    const slides = document.getElementById('slides');
    const images = slides.getElementsByTagName('img');
    slideIndex += n;
    if (slideIndex > images.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = images.length}
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
    images[slideIndex-1].style.display = "block";
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

  // Attach the plusSlides function to buttons
  document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
  document.querySelector('.next').addEventListener('click', () => plusSlides(1));
});
