import React, { createContext, useContext, useReducer, useState, useCallback } from 'react';
import { DEMO_USERS } from '../data/products';

// ─── TOAST ───────────────────────────────────────────────────────────────────
export const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: t.type === 'error' ? '#EF4444' : t.type === 'warning' ? '#F59E0B' : '#1A1A2E',
            color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'fadeUp 0.3s ease',
            display: 'flex', alignItems: 'center', gap: 8, maxWidth: 320
          }}>
            <span>{t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : '✅'}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);
const users = [...DEMO_USERS];
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { ok: true }; }
    return { ok: false, error: 'Invalid email or password' };
  };
  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) return { ok: false, error: 'Email already registered' };
    const newUser = { id: Date.now(), name, email, password, role: 'user', avatar: name.slice(0, 2).toUpperCase(), joined: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    setUser(newUser);
    return { ok: true };
  };
  const logout = () => setUser(null);
  const updateProfile = (data) => setUser(u => ({ ...u, ...data }));
  return <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>{children}</AuthContext.Provider>;
}

// ─── CART ─────────────────────────────────────────────────────────────────────
export const CartContext = createContext(null);
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.product.id}-${action.color || ''}-${action.size || ''}`;
      const exists = state.find(i => i.key === key);
      if (exists) return state.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, key, qty: 1, selectedColor: action.color, selectedSize: action.size }];
    }
    case 'REMOVE': return state.filter(i => i.key !== action.key);
    case 'UPDATE': return state.map(i => i.key === action.key ? { ...i, qty: Math.max(0, action.qty) } : i).filter(i => i.qty > 0);
    case 'CLEAR': return [];
    default: return state;
  }
}
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ items, dispatch, total, count }}>{children}</CartContext.Provider>;
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────
export const WishlistContext = createContext(null);
export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const toggle = (id) => setIds(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const has = (id) => ids.includes(id);
  return <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>;
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────
export const useToast = () => useContext(ToastContext);
export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
