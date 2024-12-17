export interface GifItem {
  id: string;
  url: string;
  previewUrl: string;
  filename: string;
  category: 'tv' | 'movie' | 'all';
  dateAdded: string;
}