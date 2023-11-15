export interface CartItem {
  id: string;
  title: string;
  price?: number | undefined;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
