import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, StoreContextType } from '../types';
import { StorageService } from '../services/storage';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load initial data
  useEffect(() => {
    setProducts(StorageService.getProducts());
    setCart(StorageService.getCart());
    setOrders(StorageService.getOrders());
  }, []);

  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    StorageService.saveProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    StorageService.saveProducts(updatedProducts);
  };

  const editProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updatedProducts);
    StorageService.saveProducts(updatedProducts);
  };

  const addToCart = (productId: string, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      let newCart;
      if (existing) {
        newCart = prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        newCart = [...prev, { productId, quantity: qty }];
      }
      StorageService.saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.productId !== productId);
      StorageService.saveCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      StorageService.saveCart(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    StorageService.saveCart([]);
  };

  const placeOrder = (customer: Order['customer']) => {
    // Calculate total
    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total,
      customer,
      date: new Date().toISOString(),
      status: 'Pending',
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    StorageService.saveOrders(updatedOrders);
    clearCart();
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      addProduct,
      deleteProduct,
      editProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
