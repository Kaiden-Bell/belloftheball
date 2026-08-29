/*
 * Google reviews only. Two Yelp-sourced quotes were withdrawn 2026-08-29 (kept
 * at the bottom of this file): Yelp's terms restrict copying content off the
 * site and they have a history of asking businesses to take republished
 * reviews down. Google is not policed the same way in practice.
 *
 * Surnames reduced to an initial, matching Yelp's own convention — these are
 * private individuals who reviewed a business, not public endorsers.
 *
 * Quotes are verbatim. A shortened one is a contiguous excerpt, marked
 * `excerpted`, with the full original in a comment above it.
 *
 * No reviewer photographs. A public review does not imply consent to
 * republish someone's profile picture as a marketing asset; the faceted
 * monogram stands in. A photo supplied directly by the client goes in `image`.
 */
export const TESTIMONIALS_ARE_PLACEHOLDER = false;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** True when `quote` is a contiguous excerpt rather than the full review. */
  excerpted?: boolean;
  /** Only ever a photo the client supplied directly — never a scraped avatar. */
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Bell of the Ball did an amazing job with my daughter's 8th birthday party! Everything was absolutely beautiful, from the décor to the cotton candy and snow cones. They truly brought our Harry Potter vision to life and helped make her day so special and memorable.",
    name: 'N. A.',
    role: "Children's Birthday · Google",
    excerpted: true,
    // Full: "...I couldn't have asked for a better experience. Highly recommend!"
  },
  {
    quote:
      'Her decorating skills are truly next level. She took our vision and transformed the entire space. Christa made the whole planning process totally stress free and smooth from start to finish! If you need someone to bring your events to life Christa is definitely the one to call.',
    name: 'Jamii L.',
    role: 'Spa-Day Birthday Party · Google',
    excerpted: true,
    // Full: "Working with Bell of the Ball for a birthday party for my daughter
    // was an absolute dream from start to finish! Her decorating skills are
    // truly next level. She took our vision (My daughter wanted a spa day
    // party) and transformed the entire space and made it look super cute for
    // my daughter. Bell of the ball (Christa Bell) made the whole planning
    // process totally stress free and smooth from start to finish! If you need
    // someone to bring your events to life Christa is definitely the one to
    // call."
  },
  {
    quote:
      'Very pleasant and professional to work with. The decorations and theme are a custom fit to each individual party. I would hire over and over and over again!',
    name: 'Christin S.',
    role: 'Themed Party · Google',
  },
  {
    quote:
      "Working with Christa on my wife and I's wedding was absolutely fantastic! An amazing officiant, amazing decorator, and everything my wife and I could have ever asked for! Above and beyond! Would recommend 100 times over!",
    name: 'Helder P.',
    role: 'Wedding & Officiating · Google',
  },
  {
    quote:
      'Highly professional and punctual! Capable of accommodating what feels like an endless variety of events! Very personable folks as well, would recommend their services to anyone!',
    name: 'Michael B.',
    role: 'Multiple Events · Google',
  },
  {
    quote:
      'Christa is an incredible event planner who brings every vision to life with creativity, professionalism, and heart. She makes everything run smoothly and look effortless. If you want your event to feel special and unforgettable, she’s the one to call!',
    name: 'TaTiana M.',
    role: 'Event Planning · Google',
    excerpted: true,
    // Full opens: "I love Bell of the Ball! Bell of the Ball is amazing!"
  },
  {
    quote: 'Shared my vision and she ran with my theme and idea and exceeded my expectations!',
    name: 'Charda S.',
    role: 'Themed Event · Google',
  },
  {
    quote:
      'My husband and I just had our wedding and having Christa as our officiant was the cherry on top! From our meetup to getting everything sorted out and arranged like we wanted to hearing on our day everything we discussed and more! Very respectful and fun!',
    name: 'Giordan B.',
    role: 'Wedding Officiating · Google',
    excerpted: true,
    // Full closes: "Worth it 1000% to go with them for your party needs!"
  },
  {
    quote:
      'Christa went above and beyond for my 20 year reunion!! She had all the colors I wanted and even brought a backdrop for our arch. I was blown away from the professionalism and communication. Also, she was VERY reasonable with pricing. I would highly recommend for any event.',
    name: 'Jessica W.',
    role: 'Class Reunion · Google',
  },
];

/*
 * WITHDRAWN 2026-08-29 — the two Yelp-sourced quotes, held here in full.
 *
 * Removed for the republication reason in the header note, not because there
 * is any doubt about them: both are genuine reviews of real events. Robin A.'s
 * is the loss that stings, because it names the whole service range in a
 * customer's own words, which is exactly what the site claims about itself.
 *
 * To restore one: get the customer's permission, paste it back into
 * TESTIMONIALS, and note the permission here.
 *
 *   {
 *     quote:
 *       'Definitely would recommend a Bell of the Ball event. Not only does she plan events, she does wedding planning, notary, party supplies rentals, and balloon art for celebrations. One stop shop for all your party needs!',
 *     name: 'Robin A.',
 *     role: 'Sip & Paint Event · Yelp',
 *     excerpted: true,
 *     // Full: "Bell of the Ball hosted a Sip & Paint at a chicken wing restaurant
 *     // in Reno. They supplied all the paint supplies and gave us a drink voucher
 *     // for the restaurant. We all got to open a tape individually for food
 *     // orders too. We got to pick out our own canvases with stencil art. There
 *     // were a lot of designs to choose from. Our tickets were prepunched before
 *     // the event for $40. We had good music and good food and drinks. I got to
 *     // connect with some new people and we had a great time. Definitely would
 *     // recommend a Bell of the Ball event. Not only does she plan events, she
 *     // does wedding planning, notary, party supplies rentals, and balloon art
 *     // for celebrations. One stop shop for all your party needs!"
 *   },
 *   {
 *     quote:
 *       'Event planning is exceptional, hands down best in town. Family business also. Love love love this. Thank you for helping with my birthday.',
 *     name: 'Keisha C.',
 *     role: 'Birthday · Yelp',
 *     excerpted: true,
 *     // Full review opens "Love love love your services from book bags to custom
 *     // shirts." Trimmed because custom shirts, cups, and mugs are no longer
 *     // offered — leaving it in would advertise a discontinued service.
 *   }
 */
