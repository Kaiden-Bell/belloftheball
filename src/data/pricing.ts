export const PRICING_IS_PLACEHOLDER = false;

export interface PricingOption {
  name: string;
  /** Fixed price, or null when the client quotes it per event ("Varies"). */
  price: number | null;
  /** Billing unit shown after the figure, e.g. "per day". */
  unit?: string;
  /*
   * A rate against a quantity the visitor hasn't given (a head count, hours).
   * Shown at its real rate but excluded from the total, because adding $5 for
   * a charge that is $5 *per guest* is worse than showing nothing. A "per day"
   * machine price is not a rate in this sense — one day is the default.
   */
  rate?: boolean;
  /** Short qualifier shown under the row. */
  note?: string;
  /*
   * Names of other options in the same event type that must be selected before
   * this one is offered. Extra supplies and an attendant are meaningless
   * without a machine, so those rows stay hidden — and un-select themselves —
   * until one is on the estimate. Empty or absent means the option always
   * shows.
   */
  requires?: string[];
}

export interface EventType {
  name: string;
  /** A floor, not a fixed fee — the client scopes most work per event. */
  basePrice: number;
  includes: string;
  options: PricingOption[];
}

export const CURRENCY = '$';

const SNOW_CONE = 'Snow Cone Machine';
const COTTON_CANDY = 'Cotton Candy Machine';
const POPCORN = 'Popcorn Machine';

const MACHINE_NAMES = [SNOW_CONE, COTTON_CANDY, POPCORN];

const MACHINES: PricingOption[] = [
  ...MACHINE_NAMES.map((name) => ({
    name,
    price: 125,
    unit: 'per day',
    note: 'Supplies for up to 25 people',
  })),
  {
    name: 'Extra Machine Supplies',
    price: 5,
    unit: 'per additional guest',
    rate: true,
    note: 'Beyond the 25 people a machine already covers',
    requires: MACHINE_NAMES,
  },
  {
    name: 'On-Site Attendant',
    price: 10,
    unit: 'per hour',
    rate: true,
    note: 'Machines are self-serve unless an attendant is requested',
    requires: MACHINE_NAMES,
  },
];

// A floor, not a fixed price. Counting it at $250 is correct because the
// total is only ever presented as "From $X".
const BALLOON_ARCH: PricingOption = {
  name: 'Balloon Arch',
  price: 250,
  note: 'Starting price — scoped to size and color count',
};

const MONEY_BOUQUET: PricingOption = {
  name: 'Money Bouquet or Lei',
  price: 50,
  note: 'Plus the cash placed in the bouquet',
};

const DIAPER_CAKE: PricingOption = { name: 'Diaper Cake', price: 50 };

export const EVENT_TYPES: EventType[] = [
  {
    name: 'Wedding',
    basePrice: 1500,
    includes:
      'Day-of coordination on site, plus delivery, setup, and teardown. Scoped per event.',
    options: [BALLOON_ARCH, MONEY_BOUQUET, ...MACHINES],
  },
  {
    name: 'Corporate Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [{ name: 'Additional Balloons', price: null }, BALLOON_ARCH, ...MACHINES],
  },
  {
    name: 'Personal Event',
    basePrice: 600,
    includes: 'Starting point for design and planning. Scoped per event.',
    options: [
      { name: 'Additional Balloons', price: null },
      BALLOON_ARCH,
      MONEY_BOUQUET,
      DIAPER_CAKE,
      ...MACHINES,
    ],
  },
  {
    name: 'Products & Rentals Only',
    basePrice: 0,
    includes: 'À la carte — no planning package required.',
    options: [BALLOON_ARCH, MONEY_BOUQUET, DIAPER_CAKE, ...MACHINES],
  },
];
