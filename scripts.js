document.addEventListener('DOMContentLoaded', () => {
    const businessName = "BELL OF THE BALL";
    let i = 0;
    const typingSpeed = 100;
  
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
  });
  