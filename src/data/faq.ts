/*
 * Every `confirmed` entry is the client's own answer, edited for prose but
 * never for substance. Nothing here is inferred.
 *
 * `todo` entries render with a badge in development and are stripped from
 * production, because a question with no answer is worse than no question.
 *
 * TODO(client): "Day-Of Coordination" vs "Full-Service Planning" reads
 * inverted against industry usage — as written, Day-Of is the richer tier and
 * Full-Service is setup only. Couples self-selecting from that answer may pick
 * the wrong one. Consider renaming the tiers.
 */

export interface FaqItem {
  question: string;
  answer: string;
  bullets?: string[];
  outro?: string;
  group: string;
  status: 'confirmed' | 'todo';
}

export const FAQ_GROUPS = [
  'Booking & Logistics',
  'Pricing & Payment',
  'Weddings',
  'Corporate',
  'Décor & Rentals',
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    group: 'Booking & Logistics',
    question: 'What areas do you serve, and do you travel?',
    answer:
      'Reno and Sparks are home ground, and we travel to Carson City. We do not book beyond that. Because we handle delivery, setup, and teardown ourselves rather than subcontracting it — and because concession rentals need dropping off and collecting the same day — a longer drive stops being a detail and starts eating into the day itself. Holding the radius is how we keep the on-site work as good as the planning.',
    status: 'confirmed',
  },
  {
    group: 'Booking & Logistics',
    question: 'How far in advance should we book?',
    answer:
      'As far ahead as your event needs — the honest answer is that it depends on what you are planning, and a small balloon install and a full wedding are not the same conversation. What we do turn down is work booked too close to the date. A full day-of coordination and setup with a week to go is not something we can do well, and we would rather say no than under-deliver on the day that matters. The constraint is rarely the calendar itself; it is that your deposit is what buys the materials, and those have to be ordered and delivered before anything can be built.',
    status: 'confirmed',
  },
  {
    group: 'Booking & Logistics',
    question: 'Can we hire you for one service without full event planning?',
    answer:
      'Yes, and plenty of clients do. Concession rentals and balloon arrangements are both available on their own, with no planning package attached and no minimum to clear first. Build an estimate above to see what that looks like, or book a consultation and we will scope just the piece you want.',
    status: 'confirmed',
  },
  {
    group: 'Booking & Logistics',
    question: 'How does the consultation work, and is there a fee?',
    answer:
      'There is no fee, and no obligation attached to it. It is normally a phone call or a Zoom meeting where we talk through what you are planning and agree on a direction. From that we build a quote and send it as an invoice through Intuit QuickBooks, so you have the figure in writing before anything is committed. You settle it against your event date by whichever payment method suits you.',
    status: 'confirmed',
  },
  {
    group: 'Booking & Logistics',
    question: 'What happens if we need to cancel or move our date?',
    answer:
      'The deposit is not refundable. It is spent almost immediately on the materials for your event, so by the time a cancellation reaches us the money is generally already in supplies bought specifically for you. Moving the date is a different matter: if you need to reschedule, your deposit moves with you and still counts toward the event. Tell us as early as you can either way — the earlier we know, the more of what has already been ordered we can work into the new date.',
    status: 'confirmed',
  },

  {
    group: 'Pricing & Payment',
    question: 'What locks in our date, and how are payments structured?',
    answer:
      'A deposit of at least 25% of the quote holds the date. The balance does not have to arrive in one piece — you can pay it down over time, and it needs to be settled no later than two weeks before your event. Everything runs through a single Intuit QuickBooks invoice, so there is one document to check against rather than a trail of separate charges. The deposit is not a booking fee we sit on: it is what lets us order materials early, which is the entire reason it is structured this way. If you would rather settle the full amount up front, you are welcome to.',
    status: 'confirmed',
  },
  {
    group: 'Pricing & Payment',
    question: 'Are delivery, setup, and teardown included?',
    answer:
      'Yes, all three, written into the main quote. We do this work in house rather than handing it to a third party, which means there is no separate delivery line, no setup surcharge, and nobody arriving on the day whose fee you had not been told about. What you approve in the quote is what you pay.',
    status: 'confirmed',
  },
  {
    group: 'Pricing & Payment',
    question: 'What do the starting prices cover?',
    answer:
      'Corporate and personal events start at $600. Weddings start at $1,500, because we do not take a wedding without also running the day — day-of coordination is part of the floor rather than an extra bolted on afterwards. In both cases the base covers delivery, setup, and teardown with balloons included. It is deliberately built that way so an arch is not a separate line item stacked on top of an installation fee stacked on top of a collection fee. Beyond that, every event is quoted specifically, and the balloon count and other supplies move the number more than anything else. Treat these as floors to plan against, not package prices.',
    status: 'confirmed',
  },
  {
    group: 'Pricing & Payment',
    question: 'Is there a travel charge for events outside Reno and Sparks?',
    answer:
      'Yes. Reno and Sparks carry no travel charge. Carson City is within our radius but does add one, and the amount depends on what is going out there — a single balloon install and a full setup with concession machines to drop off and collect are not the same trip. We will put a figure on it during the consultation, before you see a quote, so it is never something that turns up later as a surprise line.',
    status: 'confirmed',
  },

  {
    group: 'Weddings',
    question: 'What is the difference between Day-Of Coordination and Full-Service Planning?',
    answer:
      'Day-Of Coordination is where our wedding work starts, at $1,500, and it puts us on site to run the day itself. It includes:',
    bullets: [
      'Up to eight hours on site with your lead coordinator and one assistant, so you can be present at your own wedding instead of managing it',
      'Directing the ceremony processional',
      'Coordinating and assisting with ceremony and reception setup',
      'Setting up wedding accessories — guest book, place cards, favors, and the rest',
      'Coordinating boutonniere pinning and making sure VIPs receive their flowers',
      'Acting as the single point of contact for every vendor',
      'Assisting the wedding party and guests as needed',
      'Distributing final payments and gratuity to vendors',
      'Handling the unforeseen, so it never reaches you',
    ],
    outro:
      'Full-Service Planning covers setting up the wedding as we would any other event. It does not include the on-site coordinator duties above, and we do not act as the point of contact for your vendors — that stays with you on the day. If you are unsure which fits, say so in the consultation and we will walk you through both against your actual timeline.',
    status: 'confirmed',
  },
  {
    group: 'Weddings',
    question: 'Does officiating include custom ceremony writing and vow help?',
    answer:
      'The default is a traditional ceremony — traditional vows and a prayer — and for a lot of couples that is exactly right. If you would rather write your own, yes, we work through them with you across the meetings we would already be having, over Zoom or in person. There is room to change the shape of the ceremony itself too. Either way it gets decided in conversation well before the day, not handed to you as a script to read on the morning.',
    status: 'confirmed',
  },
  {
    group: 'Weddings',
    question: 'Why do you have an in-house notary, and how does it help?',
    answer:
      'Our founder, Christa Bell, took the initiative to acquire a notary license. It means the person planning and coordinating your wedding can also handle the legal side of the week, rather than sending you off to find a separate appointment during the busiest days you will have. One fewer vendor to brief, one fewer thing to schedule, and one fewer thing that can go wrong in the run-up.',
    status: 'confirmed',
  },
  {
    group: 'Weddings',
    question: 'Is the notary service included, or billed separately?',
    answer:
      'Separately — notarization is its own service and it is quoted as one. Worth saying plainly, though: most weddings never need it. Nevada asks for a witness, not a notarized document, so for the majority of couples this never becomes a line on the invoice. It is there for the cases where something does need notarizing during the week, and it means you are not hunting for an appointment when you have the least time to spare.',
    status: 'confirmed',
  },

  {
    group: 'Corporate',
    question: 'Can you provide a COI and W-9 for our venue?',
    answer:
      'Yes to both. Venues generally will not release a load-in slot without a Certificate of Insurance on file, and your finance team will need the W-9 before we can be set up as a payee. Send us the venue’s requirements along with the request — the earlier the better, since COI conditions occasionally name specifics that are far easier to sort out weeks ahead than in the final week.',
    status: 'confirmed',
  },
  {
    group: 'Corporate',
    question: 'What event sizes and guest capacities can you handle?',
    answer:
      'Every size. We have built events for well over 200 guests, and headcount on its own has never been the thing that decides whether we can take a booking. What actually matters is how much time we get on site to set up. A large room with a generous load-in window is a straightforward job; a small one that has to be built in ninety minutes between two other bookings is the harder problem. So when you enquire, tell us the guest count by all means — but tell us the venue’s access times too, because that is the number we will be thinking about.',
    status: 'confirmed',
  },
  {
    group: 'Corporate',
    question: 'Do you accept corporate POs and Net-30 terms?',
    answer:
      'No, and the reason is cash flow rather than paperwork. Most of your deposit is spent on supplies straight away, well before the event — that is what makes the build possible. Net-30 settles after the fact, and a purchase order typically needs its own lead time before anything is released, so neither instrument puts money in place when we actually need it. What works instead is the standard structure: at least 25% up front, the balance paid down to zero two weeks before the date, invoiced through QuickBooks. Bring that to your procurement team early and it is usually straightforward to process as a prepayment.',
    status: 'confirmed',
  },

  {
    group: 'Décor & Rentals',
    question: 'How long do organic balloon installations last, and can they go outdoors?',
    answer:
      'Indoors, an installation will typically hold for the entire event. Outdoors is genuinely harder. Wind is the main culprit, and heat plays its part too — both act on latex regardless of how carefully the piece was built, and we have had outdoor installs move on us before. We will install outdoors, and we will build for the conditions as best we can, but we cannot guarantee an outdoor piece will hold its shape from setup through teardown. We would rather set that expectation now than have it land as a surprise on the day.',
    status: 'confirmed',
  },
  {
    group: 'Décor & Rentals',
    question: 'Do concession rentals come with supplies and staff?',
    answer:
      'Supplies yes, staff on request. At $125 per day a machine arrives with enough supplies for about 25 people, and more can be added at $5 per additional guest if you are expecting a bigger crowd. The machines go out self-serve, which suits plenty of events perfectly well — guests help themselves and it runs itself. If you would rather not think about it, ask for an attendant and we will send someone to run it at $10 per hour on top of the day rate. Worth deciding in advance rather than on the day: a self-serve popcorn machine at a 200-person corporate event is a different proposition to one at a back-garden birthday.',
    status: 'confirmed',
  },
  {
    group: 'Décor & Rentals',
    question: 'What do the concession machines need on site?',
    answer:
      'Electricity, and that is genuinely it — we bring everything else, machine and supplies included. If your venue is outdoors or somewhere rural without power to hand, we can bring a generator, which is an added cost we will price during the consultation. The one thing worth checking before you book is that there is an outlet within reach of where you actually want the machine standing, because that is the detail that tends to surface on the day rather than before it.',
    status: 'confirmed',
  },
  {
    group: 'Décor & Rentals',
    question: 'What happens if weather turns on an outdoor event?',
    answer:
      'We do what we can, and we would rather be straight with you about the limits of that. We have moved events indoors mid-way before, and where there is an indoor space to move into we will try. What we cannot promise is that the room gets rebuilt on the other side. Décor is built in place, and a lot of it does not survive being taken down at speed and carried inside — some of it will be damaged in the move. The things that travel well are the balloons and the concession rentals, and those we can usually save. If your event is outdoors, the single most useful thing you can do is identify a backup space before the day, so the decision is about moving rather than about where to move to.',
    status: 'confirmed',
  },
  {
    group: 'Décor & Rentals',
    question: 'What happens if rented equipment is damaged or goes missing?',
    answer:
      'Every rental is covered by a contract you sign before the equipment goes out, and it puts responsibility for damage or loss with you while the equipment is on site. Damages are handled case by case against that contract. In practice this rarely comes up — the machines are sturdy and most events return them exactly as they arrived — but it is worth reading the clause rather than discovering it afterwards, particularly if the equipment is going somewhere you do not control, like a public park or a venue with its own staff moving things around.',
    status: 'confirmed',
  },
];

/** Questions the client still owes an answer on. Never shipped to production. */
export const FAQ_OPEN_COUNT = FAQ_ITEMS.filter((item) => item.status === 'todo').length;
