import fs from 'node:fs';
import path from 'node:path';

const RENTALS_DIR = path.join(process.cwd(), 'public', 'photos', 'rentals');
const PUBLIC_ROOT = '/photos/rentals';
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export interface RentalPhoto {
  src: string;
  name: string;
  alt: string;
}

interface RentalsManifest {
  [filename: string]: { name?: string; alt?: string } | undefined;
}

function title_case(name: string): string {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function read_manifest(): RentalsManifest {
  const file = path.join(RENTALS_DIR, 'rentals.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as RentalsManifest;
  } catch (err) {
    throw new Error(`Invalid JSON in public/photos/rentals/rentals.json: ${(err as Error).message}`);
  }
}

// Build time only — reads the filesystem, so call it from page frontmatter.
export function load_rentals(): RentalPhoto[] {
  if (!fs.existsSync(RENTALS_DIR)) return [];
  const manifest = read_manifest();

  return fs
    .readdirSync(RENTALS_DIR, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() &&
        !e.name.startsWith('.') &&
        !e.name.startsWith('_') &&
        IMAGE_EXT.has(path.extname(e.name).toLowerCase())
    )
    .map((e) => e.name)
    .sort()
    .map((file) => {
      const entry = manifest[file] ?? {};
      const name = entry.name?.trim() || title_case(path.basename(file, path.extname(file)));
      return {
        src: `${PUBLIC_ROOT}/${file}`,
        name,
        alt: entry.alt?.trim() || `${name}, available to rent from Bell of the Ball`,
      };
    });
}
