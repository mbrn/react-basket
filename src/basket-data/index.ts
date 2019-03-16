export interface BasketData {
  items: BasketItem[];
}

export interface BasketItem {
  name: string;
  image?: string;
  link?: string;
  quantity: number;
  price: number;
  maxCount?: number
}