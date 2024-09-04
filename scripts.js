document.addEventListener('DOMContentLoaded', () => {

  // Nav Bar Scripts
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('menu-open');
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

  const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
      item.addEventListener('click', e => {
          e.preventDefault();
          lightbox.style.display = 'block';
          const img = document.createElement('img');
          img.src = item.href;
          while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
          }
          lightbox.appendChild(img);
      });
  });

  lightbox.addEventListener('click', e => {
      if (e.target !== e.currentTarget) return;
      lightbox.style.display = 'none';
  });

  // Slide function for Portfolio
  document.addEventListener("DOMContentLoaded", function() {
    const pageType = document.body.getAttribute('data-page-type');
    let folder = '';

    if (pageType === 'balloons') {
        folder = 'images/balloons';
    } else if (pageType === 'weddings') {
        folder = 'images/weddings';
    }

    if (folder) {
        loadImagesFromFolder(folder, 'slides');
    }
});

async function loadImagesFromFolder(folderPath, containerId) {
    const container = document.getElementById(containerId);

    try {
        const response = await fetch(folderPath);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const images = Array.from(doc.querySelectorAll('a')).map(a => a.href).filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i));

        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.classList.add('slide-img');
            img.style.display = 'none';
            container.appendChild(img);
        });

        if (images.length > 0) {
            showSlides(container);
        }
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function showSlides(slidesContainer) {
    const images = slidesContainer.getElementsByTagName('img');
    let slideIndex = 0;

    function displaySlides() {
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove('active');
        }
        slideIndex++;
        if (slideIndex > images.length) { slideIndex = 1 }
        images[slideIndex - 1].classList.add('active');
        setTimeout(displaySlides, 2000); // Change image every 2 seconds
    }

    displaySlides();
}

});
