import { init_parallax } from './parallax.js';
import { init_lightbox } from './lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // Both no-op on pages carrying none of their markup.
  init_parallax();
  init_lightbox();

  const menu_button = document.getElementById('mobile-menu-btn');
  const mobile_menu = document.getElementById('mobile-menu');
  const mobile_links = document.querySelectorAll('.mobile-links a');

  if (menu_button && mobile_menu) {
    menu_button.addEventListener('click', () => {
      const is_open = mobile_menu.classList.contains('open');
      mobile_menu.classList.toggle('open');
      menu_button.textContent = is_open ? 'MENU' : 'CLOSE';
    });

    mobile_links.forEach((link) => {
      link.addEventListener('click', () => {
        mobile_menu.classList.remove('open');
        menu_button.textContent = 'MENU';
      });
    });
  }

  const reveal_elements = document.querySelectorAll('.reveal, .reveal-up, .reveal-right');
  const reveal_on_scroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  reveal_elements.forEach((el) => reveal_on_scroll.observe(el));

  const parallax_text = document.querySelectorAll('.parallax-text');
  if (parallax_text.length) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallax_text.forEach((el) => {
        const speed = el.dataset.speed || 0.1;
        el.style.transform = `translateY(${-(scrolled * speed)}px)`;
      });
    });
  }

  const parallax_scope = document.querySelector('[data-parallax-scope]');
  const fine_pointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce_motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (parallax_scope && fine_pointer && !reduce_motion) {
    const MAX_SHIFT = 16;
    const EASE = 0.09;
    const layers = Array.from(parallax_scope.querySelectorAll('[data-parallax-depth]')).map((el) => ({
      el,
      depth: parseFloat(el.dataset.parallaxDepth) || 1,
      x: 0,
      y: 0,
      target_x: 0,
      target_y: 0,
    }));

    let frame = null;

    const step = () => {
      let settling = false;
      layers.forEach((layer) => {
        layer.x += (layer.target_x - layer.x) * EASE;
        layer.y += (layer.target_y - layer.y) * EASE;
        if (Math.abs(layer.target_x - layer.x) > 0.05 || Math.abs(layer.target_y - layer.y) > 0.05) {
          settling = true;
        }
        layer.el.style.setProperty('--parallax-x', `${layer.x.toFixed(2)}px`);
        layer.el.style.setProperty('--parallax-y', `${layer.y.toFixed(2)}px`);
      });
      frame = settling ? requestAnimationFrame(step) : null;
    };

    const run = () => {
      if (frame === null) frame = requestAnimationFrame(step);
    };

    parallax_scope.addEventListener('pointermove', (event) => {
      const rect = parallax_scope.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      layers.forEach((layer) => {
        layer.target_x = -nx * MAX_SHIFT * layer.depth;
        layer.target_y = -ny * MAX_SHIFT * layer.depth;
      });
      run();
    });

    parallax_scope.addEventListener('pointerleave', () => {
      layers.forEach((layer) => {
        layer.target_x = 0;
        layer.target_y = 0;
      });
      run();
    });
  }

  const to_top = document.querySelector('[data-to-top]');
  if (to_top) {
    // Well past the hero, so it never covers the opening view.
    const show_after = () => window.innerHeight * 1.5;
    let ticking = false;

    const sync = () => {
      to_top.hidden = window.scrollY < show_after();
      ticking = false;
    };

    sync();
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(sync);
      },
      { passive: true }
    );

    to_top.addEventListener('click', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  const nav_links = document.querySelectorAll('.nav-link');
  const current_path = window.location.pathname.replace(/\/$/, '') || '/';
  nav_links.forEach((link) => {
    const link_path = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    link.classList.toggle('active', link_path === current_path);
  });
});
