/*
 * Cleared by the client 2026-08-29: Meadowood Mall and the Simon
 * step-and-repeat, the NextHome storefront, the Anthem brand party, and the
 * Nightmare Before Christmas build. Showing work done for a commercial client
 * is ordinary portfolio use; naming a brand as a theme you offer is closer to
 * advertising it, so ask before adding anything that leans that way.
 *
 * Never add to any event folder (PRODUCT.md):
 *   table-4x3-01.jpg  — celebration-of-life table with a deceased person's photograph
 *   table-16x9-01.jpg — a real couple's full names and wedding date
 */
import fs from 'node:fs';
import path from 'node:path';
import type { PortfolioData, PortfolioEvent, PortfolioPhoto } from './portfolio-types';

const ARCHIVE_DIR = path.join(process.cwd(), 'public', 'photos', 'portfolio');
const PUBLIC_ROOT = '/photos/portfolio';
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

const CATEGORY_LABELS: Record<string, string> = {
  'rentals-and-products': 'Rentals & Products',
};

// Filter-bar order. Anything not listed follows, alphabetically.
const CATEGORY_ORDER = ['Weddings', 'Corporate', 'Celebrations', 'Rentals & Products'];

// Filenames that describe nothing, so they can't stand in as alt text.
const PLACEHOLDER_NAME = /^(cover|img|image|photo|pic|dsc|dscn|p|final|edit|export)?[-_ ]?\d*$/i;

const SHAPE_POOL = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

interface EventManifest {
  title?: string;
  description?: string;
  date?: string;
  order?: number;
  shape?: number;
  cover?: string;
  include?: string[];
  alt?: Record<string, string>;
}

function humanize(name: string): string {
  const words = name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function title_case(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function read_dirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map((e) => e.name)
    .sort();
}

function read_images(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) => e.isFile() && !e.name.startsWith('.') && IMAGE_EXT.has(path.extname(e.name).toLowerCase())
    )
    .map((e) => e.name)
    .sort();
}

function read_manifest(dir: string): EventManifest {
  const file = path.join(dir, 'event.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as EventManifest;
  } catch (err) {
    throw new Error(`Invalid JSON in ${path.relative(process.cwd(), file)}: ${(err as Error).message}`);
  }
}

// Stable per-slug facet, so tiles stay varied without anyone picking a number.
function hash_shape(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return SHAPE_POOL[h % SHAPE_POOL.length];
}

function build_event(
  category_dir: string,
  category: string,
  slug: string
): { event: PortfolioEvent; order: number } | null {
  const dir = path.join(ARCHIVE_DIR, category_dir, slug);
  const manifest = read_manifest(dir);
  const files = read_images(dir);
  const borrowed = (manifest.include ?? []).filter((p) => typeof p === 'string' && p.startsWith('/'));

  const to_src = (ref: string) =>
    ref.startsWith('/') ? ref : `${PUBLIC_ROOT}/${category_dir}/${slug}/${ref}`;

  const title = manifest.title?.trim() || title_case(slug);

  const alt_for = (ref: string): string => {
    const written = manifest.alt?.[ref];
    if (written) return written;
    const base = path.basename(ref, path.extname(ref));
    return PLACEHOLDER_NAME.test(base) ? title : humanize(base);
  };

  const photo = (ref: string): PortfolioPhoto => ({ src: to_src(ref), alt: alt_for(ref) });

  const cover_ref = manifest.cover ?? files.find((f) => /^cover\./i.test(f)) ?? files[0];
  if (!cover_ref) return null;

  const rest = [...files.filter((f) => f !== cover_ref), ...borrowed.filter((p) => p !== cover_ref)];

  return {
    event: {
      slug,
      title,
      description: manifest.description?.trim() ?? '',
      category,
      date: manifest.date,
      shape: manifest.shape ?? hash_shape(slug),
      cover: photo(cover_ref),
      photos: rest.map(photo),
    },
    order: manifest.order ?? Number.MAX_SAFE_INTEGER,
  };
}

// Build time only — reads the filesystem, so call it from page frontmatter.
export function load_portfolio(): PortfolioData {
  const events: Array<PortfolioEvent & { _order: number }> = [];
  const found = new Set<string>();

  for (const category_dir of read_dirs(ARCHIVE_DIR)) {
    const category = CATEGORY_LABELS[category_dir] ?? title_case(category_dir);
    for (const slug of read_dirs(path.join(ARCHIVE_DIR, category_dir))) {
      const built = build_event(category_dir, category, slug);
      if (!built) continue;
      events.push({ ...built.event, _order: built.order });
      found.add(category);
    }
  }

  events.sort((a, b) => {
    const ca = CATEGORY_ORDER.indexOf(a.category);
    const cb = CATEGORY_ORDER.indexOf(b.category);
    const ra = ca === -1 ? CATEGORY_ORDER.length : ca;
    const rb = cb === -1 ? CATEGORY_ORDER.length : cb;
    if (ra !== rb) return ra - rb;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a._order !== b._order) return a._order - b._order;
    return a.slug.localeCompare(b.slug);
  });

  const known = CATEGORY_ORDER.filter((c) => found.has(c));
  const extra = [...found].filter((c) => !CATEGORY_ORDER.includes(c)).sort();

  return {
    events: events.map(({ _order, ...event }) => event),
    categories: ['All', ...known, ...extra],
  };
}
