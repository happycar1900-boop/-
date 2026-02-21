export interface PortfolioItem {
  id: number;
  title: string;
  category: 'Performance' | 'Choreography' | 'Teaching';
  type: 'Video' | 'Photo';
  url: string;
  thumbnail?: string;
  description?: string;
  created_at: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
  role?: string;
  created_at: string;
}
