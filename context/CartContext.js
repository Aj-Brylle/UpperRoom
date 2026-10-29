import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@upperroom_cart_v1';

const CartContext = createContext({
  items: [],
  totalCount: 0,
  subtotal: 0,
  addToBag: () => {},
  removeFromBag: () => {},
  updateQuantity: () => {},
  clearBag: () => {},
  isBagOpen: false,
  openBag: () => {},
  closeBag: () => {},
  notification: null,
  clearNotification: () => {},
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsHydrated(true);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(console.warn);
  }, [items, isHydrated]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const addToBag = (product, size = 'M', color = null, quantity = 1) => {
    if (!product) return;
    const chosenColor = color || (product.colors && product.colors[0]) || { name: 'Purity White', hex: '#FFFFFF' };
    const cartItemId = `${product.id}_${size}_${chosenColor.name}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color: chosenColor,
          image: product.images && product.images[0],
          quantity,
        };
        return [...prevItems, newItem];
      }
    });

    showNotification(`ADDED TO BAG: ${product.name.toUpperCase()}`);
  };

  const removeFromBag = (cartItemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBag(cartItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const value = {
    items,
    totalCount,
    subtotal,
    addToBag,
    removeFromBag,
    updateQuantity,
    clearBag,
    isBagOpen,
    openBag: () => setIsBagOpen(true),
    closeBag: () => setIsBagOpen(false),
    notification,
    clearNotification: () => setNotification(null),
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
