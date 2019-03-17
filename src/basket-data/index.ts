export interface BasketData {
  isLoading?: boolean;
  items: BasketItem[];

  
  onAllItemsDeleted: () => void;
  onItemAdded: (id: string) => void;
  onItemDeleted: (id: string) => void;
}

export interface BasketItem {
  id: string;
  name: string;
  image?: string;
  link?: string;
  quantity: number;
  price: number;
  maxCount?: number
}