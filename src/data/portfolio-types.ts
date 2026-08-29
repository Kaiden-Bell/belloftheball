// Split from portfolio.ts so the React island never pulls `node:fs` into the
// client bundle.

export type PortfolioCategory = string;

export interface PortfolioPhoto {
  src: string;
  alt: string;
}

export interface PortfolioEvent {
  slug: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  date?: string;
  shape: number;
  cover: PortfolioPhoto;
  photos: PortfolioPhoto[];
}

export interface PortfolioData {
  events: PortfolioEvent[];
  categories: Array<PortfolioCategory | 'All'>;
}
