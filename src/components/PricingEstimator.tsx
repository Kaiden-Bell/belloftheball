import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  CURRENCY,
  EVENT_TYPES,
  PRICING_IS_PLACEHOLDER,
  type EventType,
  type PricingOption,
} from '../data/pricing';

interface Props {
  cta_href?: string;
  cta_label?: string;
  show_placeholder_notice?: boolean;
  // Off on /pricing: a booking CTA under the total is an exit ramp offered
  // exactly when the visitor has questions the FAQ below answers.
  show_cta?: boolean;
}

// Pinned to en-US: Intl.NumberFormat(undefined) resolves to the server's locale
// during SSR and the visitor's in the browser, which mismatches on hydration.
const formatter = new Intl.NumberFormat('en-US');
const format_price = (value: number) => `${CURRENCY}${formatter.format(value)}`;

const key_for = (event_name: string, option_name: string) => `${event_name}::${option_name}`;

const is_unlocked = (event: EventType, option: PricingOption, keys: string[]) =>
  !option.requires?.length ||
  option.requires.some((name) => keys.includes(key_for(event.name, name)));

export default function PricingEstimator({
  cta_href = '/contact',
  cta_label = 'Book Consultation',
  show_placeholder_notice = false,
  show_cta = true,
}: Props) {
  const [is_open, set_open] = useState(false);
  const [selected_name, set_selected_name] = useState<string>('');
  const [selected_keys, set_selected_keys] = useState<string[]>([]);
  const [active_index, set_active_index] = useState(0);

  const wrap_ref = useRef<HTMLDivElement | null>(null);
  const trigger_ref = useRef<HTMLButtonElement | null>(null);
  const list_ref = useRef<HTMLDivElement | null>(null);
  const listbox_id = useId();

  const selected_event: EventType | null = useMemo(
    () => EVENT_TYPES.find((e) => e.name === selected_name) ?? null,
    [selected_name]
  );

  const available_options = useMemo(() => {
    if (!selected_event) return [];
    return selected_event.options.filter((o) => is_unlocked(selected_event, o, selected_keys));
  }, [selected_event, selected_keys]);

  const selected_options = useMemo(() => {
    if (!selected_event) return [];
    return available_options.filter((o) =>
      selected_keys.includes(key_for(selected_event.name, o.name))
    );
  }, [selected_event, available_options, selected_keys]);

  const total = useMemo(() => {
    if (!selected_event) return 0;
    return selected_event.basePrice + selected_options.reduce(
      // A rate row is per guest or per hour and we know neither, so counting
      // it once would read as the whole charge.
      (sum, o) => sum + (o.rate ? 0 : o.price ?? 0),
      0
    );
  }, [selected_event, selected_options]);

  const has_uncounted_selection = useMemo(
    () => selected_options.some((o) => o.price === null || o.rate),
    [selected_options]
  );

  const close_and_refocus = useCallback(() => {
    set_open(false);
    trigger_ref.current?.focus();
  }, []);

  const select_event = useCallback(
    (name: string) => {
      set_selected_name(name);
      set_selected_keys([]);
      close_and_refocus();
    },
    [close_and_refocus]
  );

  const toggle_option = useCallback(
    (optionName: string) => {
      if (!selected_event) return;
      const key = key_for(selected_event.name, optionName);
      set_selected_keys((prev) => {
        const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
        // Removing a machine must also remove the supplies bought for it,
        // rather than leaving a checked row that has just been hidden.
        return next.filter((k) => {
          const option = selected_event.options.find(
            (o) => key_for(selected_event.name, o.name) === k
          );
          return !option || is_unlocked(selected_event, option, next);
        });
      });
    },
    [selected_event]
  );

  // Close on outside click / Escape.
  useEffect(() => {
    if (!is_open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrap_ref.current?.contains(event.target as Node)) set_open(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close_and_refocus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [is_open, close_and_refocus]);

  // Move DOM focus to follow the roving active option.
  useEffect(() => {
    if (!is_open) return;
    const options = list_ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    options?.[active_index]?.focus();
  }, [is_open, active_index]);

  const openAt = (index: number) => {
    set_active_index(index);
    set_open(true);
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = Math.max(0, EVENT_TYPES.findIndex((e) => e.name === selected_name));
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAt(currentIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAt(EVENT_TYPES.length - 1);
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    const last = EVENT_TYPES.length - 1;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      set_active_index((i) => (i >= last ? 0 : i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      set_active_index((i) => (i <= 0 ? last : i - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      set_active_index(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      set_active_index(last);
    } else if (event.key === 'Tab') {
      set_open(false);
    }
  };

  return (
    <div className="pricing-estimator">
      {show_placeholder_notice && PRICING_IS_PLACEHOLDER && (
        <p className="placeholder-banner">
          TODO(client) — the balloon arch and diaper cake figures still come from the guide rather than
          from the client. Confirm them and flip PRICING_IS_PLACEHOLDER in src/data/pricing.ts. This
          banner is dev-only and will not appear in a production build.
        </p>
      )}

      <div className="pe-field" ref={wrap_ref}>
        <span className="label-text" id={`${listbox_id}-label`}>
          What are you planning?
        </span>

        <div className="pe-select-wrap">
          <button
            type="button"
            ref={trigger_ref}
            className="pe-select shape-14"
            aria-haspopup="listbox"
            aria-expanded={is_open}
            aria-controls={is_open ? listbox_id : undefined}
            aria-labelledby={`${listbox_id}-label`}
            onClick={() => (is_open ? set_open(false) : openAt(
              Math.max(0, EVENT_TYPES.findIndex((e) => e.name === selected_name))
            ))}
            onKeyDown={onTriggerKeyDown}
          >
            <span>{selected_name || 'Choose an event type'}</span>
            <span className="pe-select-caret" aria-hidden="true">{is_open ? '—' : '+'}</span>
          </button>

          {is_open && (
            <div
              className="pe-listbox"
              id={listbox_id}
              role="listbox"
              ref={list_ref}
              aria-labelledby={`${listbox_id}-label`}
              onKeyDown={onListKeyDown}
            >
              {EVENT_TYPES.map((eventType, i) => (
                <button
                  key={eventType.name}
                  type="button"
                  role="option"
                  tabIndex={i === active_index ? 0 : -1}
                  aria-selected={selected_name === eventType.name}
                  className={`pe-option${i === active_index ? ' is-active' : ''}`}
                  onClick={() => select_event(eventType.name)}
                >
                  {eventType.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pe-body">
        <div className="pe-pane pe-pane-addons">
          <span className="label-text">Add-ons</span>

          {!selected_event ? (
            <p className="pe-empty">Choose an event type to see what can be added.</p>
          ) : (
            <div className="pe-addons">
              {available_options.map((option, i) => {
                const key = key_for(selected_event.name, option.name);
                const checked = selected_keys.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    className="pe-addon"
                    style={{ ['--pe-delay' as string]: `${i * 0.045}s` }}
                    onClick={() => toggle_option(option.name)}
                  >
                    <span className="pe-addon-label">
                      <span className="pe-check" aria-hidden="true">{checked ? '✓' : ''}</span>
                      <span>
                        {option.name}
                        {option.note && <span className="pe-addon-note">{option.note}</span>}
                      </span>
                    </span>
                    <span className="pe-price">
                      {option.price === null ? (
                        <em className="pe-varies">Varies</em>
                      ) : (
                        <>
                          {format_price(option.price)}
                          {option.unit && <span className="pe-unit"> {option.unit}</span>}
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="pe-pane-right">
          <div className="pe-pane">
            <span className="label-text">Estimate breakdown</span>

            {!selected_event ? (
              <p className="pe-empty">Choose an event type to preview pricing.</p>
            ) : (
              <div className="pe-lines" aria-live="polite">
                <div className="pe-line" key={`${selected_event.name}-base`}>
                  <span className="pe-line-label">
                    {selected_event.name} — base
                    <span className="pe-line-sub">{selected_event.includes}</span>
                  </span>
                  <span className="pe-line-value">{format_price(selected_event.basePrice)}</span>
                </div>

                {selected_options.map((option) => (
                  <div className="pe-line" key={`${selected_event.name}-${option.name}`}>
                    <span className="pe-line-label">
                      {option.name}
                      {option.unit ? (
                        <span className="pe-line-sub">Charged {option.unit}</span>
                      ) : (
                        option.note && <span className="pe-line-sub">{option.note}</span>
                      )}
                    </span>
                    <span className="pe-line-value">
                      {option.price === null ? (
                        <em className="pe-varies">Quoted per event</em>
                      ) : option.rate ? (
                        <em className="pe-varies">
                          {format_price(option.price)} {option.unit}
                        </em>
                      ) : (
                        format_price(option.price)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pe-total shape-18">
            <span className="label-text">Estimated total</span>
            <p className="pe-total-figure">
              <span className="pe-from">From</span> {format_price(total)}
            </p>
            <p className="pe-total-note">
              {has_uncounted_selection
                ? 'Starting figure only — anything quoted per event, or charged by the guest or the hour, is listed above but not counted here. Your real number comes out of the consultation.'
                : 'A starting figure, not a quote. Most work is scoped per event; your real number comes out of the consultation.'}
            </p>
          </div>
        </div>
      </div>

      {show_cta && (
        <a className="cta-btn" href={cta_href}>
          {cta_label}
        </a>
      )}
    </div>
  );
}
