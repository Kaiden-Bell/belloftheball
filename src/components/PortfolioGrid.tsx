import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PortfolioCategory, PortfolioEvent } from '../data/portfolio-types';

type Filter = PortfolioCategory | 'All';

interface Props {
  events: PortfolioEvent[];
  categories: Filter[];
}

export default function PortfolioGrid({ events, categories }: Props) {
  const [active, setActive] = useState<Filter>('All');
  const [open_slug, set_open_slug] = useState<string | null>(null);

  const visible = useMemo(
    () => (active === 'All' ? events : events.filter((e) => e.category === active)),
    [active, events]
  );

  const open_event = useMemo(
    () => events.find((e) => e.slug === open_slug) ?? null,
    [open_slug, events]
  );

  useEffect(() => {
    const from_hash = () => {
      const slug = window.location.hash.replace(/^#/, '');
      set_open_slug(events.some((e) => e.slug === slug) ? slug : null);
    };
    from_hash();
    window.addEventListener('hashchange', from_hash);
    return () => window.removeEventListener('hashchange', from_hash);
  }, [events]);

  const open = useCallback((slug: string) => {
    window.location.hash = slug;
    set_open_slug(slug);
  }, []);

  const close = useCallback(() => {
    set_open_slug(null);
    // Drop the hash without adding another history entry.
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <div className="pf-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className="label-text pf-filter"
            aria-pressed={active === cat}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="pf-grid">
        {visible.map((event) => (
          <button
            key={event.slug}
            type="button"
            className="pf-tile"
            onClick={() => open(event.slug)}
            aria-haspopup="dialog"
          >
            <span className={`pf-tile-media shape-${event.shape}`}>
              <img src={event.cover.src} alt={event.cover.alt} loading="lazy" />
            </span>
            <span className="pf-tile-meta">
              <span className="pf-tile-title">{event.title}</span>
              <span className="label-text">
                {event.category.toUpperCase()}
                {event.photos.length > 0 && ` · ${event.photos.length + 1} PHOTOS`}
              </span>
            </span>
          </button>
        ))}
      </div>

      {open_event && <Lightbox event={open_event} onClose={close} />}
    </div>
  );
}

function Lightbox({ event, onClose }: { event: PortfolioEvent; onClose: () => void }) {
  const panel_ref = useRef<HTMLDivElement | null>(null);
  const close_ref = useRef<HTMLButtonElement | null>(null);
  const thumb_rail_ref = useRef<HTMLDivElement | null>(null);

  const all = useMemo(() => [event.cover, ...event.photos], [event]);
  const [index, set_index] = useState(0);

  const step = useCallback(
    (delta: number) => set_index((i) => (i + delta + all.length) % all.length),
    [all.length]
  );

  useEffect(() => {
    close_ref.current?.focus();

    const previous_overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const on_key_down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (all.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        step(e.key === 'ArrowLeft' ? -1 : 1);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panel_ref.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', on_key_down);
    return () => {
      document.removeEventListener('keydown', on_key_down);
      document.body.style.overflow = previous_overflow;
    };
  }, [onClose, step, all.length]);

  // Not scrollIntoView: that also scrolls every scrollable ancestor, which on
  // open dragged the overlay down far enough to hide the event title.
  useEffect(() => {
    const rail = thumb_rail_ref.current;
    const active = rail?.querySelector<HTMLElement>('[data-active="true"]');
    if (!rail || !active) return;
    rail.scrollLeft = active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2;
  }, [index]);

  const current = all[index];
  const has_many = all.length > 1;

  return (
    <div className="pf-overlay" onClick={onClose}>
      <div
        className="pf-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${event.slug}-title`}
        ref={panel_ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="pf-close" onClick={onClose} ref={close_ref} aria-label="Close">
          CLOSE ✕
        </button>

        <div className="pf-panel-head">
          <span className="label-text">
            {event.category.toUpperCase()}
            {event.date && ` · ${event.date.toUpperCase()}`}
          </span>
          <h3 id={`${event.slug}-title`} className="pf-panel-title">
            {event.title}
          </h3>
          {event.description && <p className="pf-panel-desc">{event.description}</p>}
        </div>

        <div className="pf-stage">
          {has_many && (
            <button
              type="button"
              className="pf-arrow pf-arrow-prev"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
            >
              <span aria-hidden="true">←</span>
            </button>
          )}

          <figure className="pf-stage-figure">
            <img key={current.src} src={current.src} alt={current.alt} />
          </figure>

          {has_many && (
            <button
              type="button"
              className="pf-arrow pf-arrow-next"
              onClick={() => step(1)}
              aria-label="Next photograph"
            >
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        {has_many ? (
          <>
            <p className="label-text pf-counter" aria-live="polite">
              {index + 1} / {all.length}
            </p>

            <div className="pf-thumbs" ref={thumb_rail_ref}>
              {all.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  className="pf-thumb"
                  data-active={i === index}
                  aria-current={i === index}
                  aria-label={`Photograph ${i + 1} of ${all.length}`}
                  onClick={() => set_index(i)}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="pf-panel-note">More photographs from this event are being added.</p>
        )}
      </div>
    </div>
  );
}
