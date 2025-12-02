export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounts
  category: 'Fruits' | 'Vegetables' | 'Dairy' | 'Staples' | 'Spices' | 'Snacks' | 'Beverages';
  image: string;
  description: string;
  nutrition: string;
  unit: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  date: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
}

export interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (customer: Order['customer']) => void;
  addProduct: (newProductData: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  editProduct: (updatedProduct: Product) => void;
}