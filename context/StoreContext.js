import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { products as defaultProducts } from '../data/products';

const PRODUCTS_STORAGE_KEY = '@upperroom_products_v2';
const ORDERS_STORAGE_KEY = '@upperroom_orders_v2';

const initialOrders = [
  {
    id: 'UR-847291',
    date: '2026-10-27T14:32:00Z',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@sanctuary.com',
    shippingAddress: '450 Lexington Ave, Suite 1900, New York, NY 10017',
    status: 'PENDING',
    items: [
      {
        id: 'acts-2-oversized-tee_L_Purity White',
        productId: 'acts-2-oversized-tee',
        name: 'Acts 2 White Oversized Tee',
        price: 98,
        size: 'L',
        color: { name: 'Purity White', hex: '#FFFFFF' },
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      },
      {
        id: 'upperroom-monogram-cap_ONE SIZE_Purity White',
        productId: 'upperroom-monogram-cap',
        name: 'UpperRoom Monogram Structured Cap',
        price: 68,
        size: 'ONE SIZE',
        color: { name: 'Purity White', hex: '#FFFFFF' },
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    subtotal: 264,
    tax: 21.78,
    total: 285.78,
  },
  {
    id: 'UR-719304',
    date: '2026-10-26T11:15:00Z',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@rostovadesign.com',
    shippingAddress: '1200 Brickell Bay Dr, Apt 28A, Miami, FL 33131',
    status: 'APPROVED',
    items: [
      {
        id: 'ascension-heavyweight-hoodie_M_Purity White',
        productId: 'ascension-heavyweight-hoodie',
        name: 'Ascension Heavyweight Hoodie',
        price: 195,
        size: 'M',
        color: { name: 'Purity White', hex: '#FFFFFF' },
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    subtotal: 195,
    tax: 16.09,
    total: 211.09,
  },
];

const StoreContext = createContext({
  products: [],
  orders: [],
  addProduct: () => {},
  deleteProduct: () => {},
  resetProducts: () => {},
  addOrder: () => {},
  approveOrder: () => {},
  fulfillOrder: () => {},
  rejectOrder: () => {},
  deleteOrder: () => {},
});

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (storedProducts) {
          const parsed = JSON.parse(storedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        }

        const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsHydrated(true);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products)).catch(console.error);
  }, [products, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)).catch(console.error);
  }, [orders, isHydrated]);

  const addProduct = (newProduct) => {
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productRecord = {
      id: slug || `ur-${Date.now()}`,
      name: newProduct.name,
      price: Number(newProduct.price) || 95,
      category: newProduct.category || 'TEES',
      sizes: newProduct.sizes && newProduct.sizes.length > 0 ? newProduct.sizes : ['S', 'M', 'L', 'XL', 'XXL'],
      colors: newProduct.colors && newProduct.colors.length > 0 ? newProduct.colors : [
        { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
        { name: 'Onyx Black', hex: '#000000', border: '#000000' },
        { name: 'Alabaster Gray', hex: '#ECECEC', border: '#D0D0D0' },
      ],
      images: [
        newProduct.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      ],
      fabric: newProduct.fabric || '360 GSM Combed Ring-Spun Organic Cotton.',
      description: newProduct.description || 'Monolithic architectural silhouette cut in pure optic white combed organic cotton.',
      scripture: {
        verse: newProduct.scriptureVerse || 'Acts 2:1',
        passage: newProduct.scripturePassage || 'When the day of Pentecost arrived, they were all together in one place.',
        reflection: newProduct.scriptureReflection || 'Reflecting holy unity and quiet reverence.',
      },
      featured: Boolean(newProduct.featured),
      inStock: true,
    };

    setProducts((prev) => [productRecord, ...prev]);
    return productRecord;
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetProducts = () => {
    setProducts(defaultProducts);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.id || `UR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      customerName: orderData.customerName || 'Valued Client',
      customerEmail: orderData.customerEmail || 'client@sanctuary.com',
      shippingAddress: orderData.shippingAddress || 'Dallas, TX',
      status: 'PENDING',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      tax: orderData.tax || 0,
      total: orderData.total || 0,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const approveOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'APPROVED' } : o))
    );
  };

  const fulfillOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'FULFILLED' } : o))
    );
  };

  const rejectOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'REJECTED' } : o))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        addProduct,
        deleteProduct,
        resetProducts,
        addOrder,
        approveOrder,
        fulfillOrder,
        rejectOrder,
        deleteOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

export default StoreContext;
