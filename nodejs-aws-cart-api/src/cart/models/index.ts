enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS'
}

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product: Product,
  count: number,
}

export type Cart = {
  id: string,
  user_id: string,
  created_at: string,
  updated_at: string,
  status: CartStatus,
  items: CartItem[],
}
