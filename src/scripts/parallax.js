const RANGE = 0.1;

// Must not exceed the overhang .px-frame > img is given in components.css,
// or the frame shows an edge.
const OVERHANG = 0.12;

export function init_parallax() {
  const frames = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!frames.length) return;

  // The CSS centres the overhang, so doing nothing is the correct rendering.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const live = new Set();
  const watcher = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) live.add(entry.target);
        else live.delete(entry.target);
      });
      request();
    },
    { rootMargin: '25% 0px 25% 0px' }
  );
  frames.forEach((frame) => watcher.observe(frame));

  let ticking = false;

  const update = () => {
    ticking = false;
    const viewport = window.innerHeight;

    live.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      if (!rect.height) return;

      // -1 entering from the bottom, 0 at screen centre, +1 leaving past the top.
      const span = (viewport + rect.height) / 2;
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / span;
      const clamped = Math.max(-1, Math.min(1, progress));

      // Positive is downward: the image lags the frame's upward travel, which
      // is what makes it read as sitting further back than the page.
      const depth = parseFloat(frame.dataset.parallax) || 1;
      const travel = Math.min(RANGE * depth, OVERHANG);
      const shift = clamped * rect.height * travel;
      frame.style.setProperty('--px-shift', `${shift.toFixed(1)}px`);
    });
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  update();
}
