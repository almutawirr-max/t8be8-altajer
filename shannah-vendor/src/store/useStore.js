import { create } from 'zustand';
import { MOCK_STORE, MOCK_ORDERS, MOCK_PRODUCTS, MOCK_TRANSACTIONS, MOCK_NOTIFICATIONS, MOCK_REVIEWS, MOCK_PROMOTIONS } from '../data/mockData';

const useStore = create((set, get) => ({
  // Auth state
  isLoggedIn: false,
  isSetupComplete: false,
  user: null,

  // Store info
  store: MOCK_STORE,

  // Orders
  orders: MOCK_ORDERS,

  // Products / Catalog
  products: MOCK_PRODUCTS,

  // Wallet
  transactions: MOCK_TRANSACTIONS,
  balance: MOCK_STORE.balance,
  todayEarnings: MOCK_STORE.todayEarnings,

  // Notifications
  notifications: MOCK_NOTIFICATIONS,

  // Reviews
  reviews: MOCK_REVIEWS,

  // Promotions
  promotions: MOCK_PROMOTIONS,

  // Actions
  login: (email, password) => {
    set({ isLoggedIn: true, isSetupComplete: true, user: { email } });
  },

  logout: () => {
    set({ isLoggedIn: false, isSetupComplete: false, user: null });
  },

  completeSetup: (storeData) => {
    set((state) => ({
      isSetupComplete: true,
      store: { ...state.store, ...storeData },
    }));
  },

  toggleStoreOnline: () => {
    set((state) => ({
      store: { ...state.store, isOnline: !state.store.isOnline },
    }));
  },

  acceptOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'preparing' } : o
      ),
    }));
  },

  rejectOrder: (orderId, reason) => {
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== orderId),
    }));
  },

  markOrderReady: (orderId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'ready' } : o
      ),
    }));
  },

  handoverOrder: (orderId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'delivered' } : o
      ),
    }));
  },

  togglePrepItem: (orderId, itemId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              prepCheckList: o.prepCheckList.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : o
      ),
    }));
  },

  addProduct: (product) => {
    const newProduct = { ...product, id: String(Date.now()) };
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: (productId, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, ...updates } : p
      ),
    }));
  },

  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },

  replyToReview: (reviewId, reply) => {
    set((state) => ({
      reviews: state.reviews.map((r) =>
        r.id === reviewId ? { ...r, reply } : r
      ),
    }));
  },

  addPromotion: (promo) => {
    const newPromo = { ...promo, id: String(Date.now()) };
    set((state) => ({ promotions: [...state.promotions, newPromo] }));
  },

  togglePromotion: (promoId) => {
    set((state) => ({
      promotions: state.promotions.map((p) =>
        p.id === promoId ? { ...p, active: !p.active } : p
      ),
    }));
  },

  updateStore: (updates) => {
    set((state) => ({
      store: { ...state.store, ...updates },
    }));
  },
}));

export default useStore;
