# The portfolio archive

Everything on the Portfolio page is read from this folder tree at build time.
There is no list of photos anywhere in the code — **the folders are the data.**

```
portfolio/
  weddings/                     ← a category (shows up in the filter bar)
    blue-wood-reception/        ← an event (one tile on the grid)
      event.json                ← its title and description
      blue-wedding-dessert-table.jpg
      blue-wedding-favor-table.jpg
```

## Day-to-day

**Add a photo to an event** — drag it into that event's folder. Done.

**Remove a photo** — drag it out. Done.

**Add an event** — make a folder inside the right category and drop photos in.
That's enough to publish it: the title falls back to the folder name
(`spring-garden-party` → "Spring Garden Party"). Add an `event.json` when you
want a nicer title or a description.

**Move an event to another category** — drag the folder into a different
category folder.

**Add a category** — make a new folder here and put event folders in it. It
appears in the filter bar automatically. (Set where it sits in that bar via
`CATEGORY_ORDER` in `src/data/portfolio.ts`; unlisted ones go last.)

**While `npm run dev` is running** — photos dropped into an existing folder
show up on the next refresh. A brand-new *folder* sometimes 404s until the dev
server is restarted; a fresh `npm run dev` always picks it up.

**Hide something without deleting it** — rename the folder to start with `_`
or `.`. Both are skipped.

## Which photo becomes the tile

In order: whatever `event.json` names as `"cover"`, else a file named
`cover.jpg`, else the first file alphabetically. The rest of the folder shows
inside the lightbox when someone opens the event, in alphabetical order — so
`01-`, `02-` prefixes are an easy way to control that order.

## event.json

Every field is optional.

```json
{
  "title": "Blue & Wood Reception",
  "description": "Navy and dusty-blue florals run the length of raw wood farm tables…",
  "date": "June 2025",
  "cover": "/photos/services/event-design-bridal-table.jpg",
  "include": ["/photos/about/sweetheart-table-detail.jpg"],
  "order": 10,
  "shape": 4,
  "alt": {
    "blue-wedding-dessert-table.jpg": "A tiered white wedding cake on a dessert table…"
  }
}
```

- **cover** — a filename in this folder, or a `/photos/…` path to borrow a
  photo that lives elsewhere on the site.
- **include** — `/photos/…` paths to photos that belong to this event but live
  in a fixed page slot (see below). They show after the folder's own photos.
- **order** — position within the category, low to high. Without it, events
  sort alphabetically by folder name after the numbered ones.
- **shape** — the tile's cut-corner variant (4–18). Left out, one is picked
  from the folder name and stays stable.
- **alt** — screen-reader text, keyed by filename or borrowed path. Anything
  missing falls back to the filename with the dashes taken out, so name files
  descriptively and the fallback is usable.

## Photos used by the hand-built pages

`hero/`, `services/`, `about/`, `contact/`, and `featured/` are **fixed slots**
— specific images the homepage, Services, About, and Contact pages point at
directly. Don't move or rename those; a page will break silently.

This archive is the opposite: reorganize it freely. When one of those slot
photos also belongs to an event, the event borrows it with `cover` or
`include` rather than keeping a second copy.

## Excluded, and must stay excluded

Per `PRODUCT.md`, do not add:

- `table-4x3-01.jpg` — a celebration-of-life table bearing a deceased person's
  photograph.
- `table-16x9-01.jpg` — shows a real couple's full names and wedding date.
