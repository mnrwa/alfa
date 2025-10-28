export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  genre: string;
  seasons: number;
  year: string;
  rating: string;
}

export interface ProductCardProps {
  product: Product;
  isLiked: boolean;
  onLike: () => void;
  onDelete: () => void;
}
