import React, { useState } from 'react';
import { ToastProvider, AuthProvider, CartProvider, WishlistProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import { OrdersPage, WishlistPage, ProfilePage, AdminDashboard } from './pages/OtherPages';

function AppContent() {
  const [page, setPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([
    { id: 'SWV391042', date: '15 May 2024', items: [{ name: 'Wireless Headphones', qty: 1, price: 79.99, image: '🎧' }], status: 'Delivered', total: 91.27, address: '42 MG Road, Bengaluru 560001' },
    { id: 'SWV284710', date: '02 Apr 2024', items: [{ name: 'Atomic Habits', qty: 2, price: 14.99, image: '📗' }, { name: 'Yoga Mat', qty: 1, price: 34.99, image: '🧘' }], status: 'Delivered', total: 70.17, address: '42 MG Road, Bengaluru 560001' },
    { id: 'SWV193847', date: '18 Mar 2024', items: [{ name: 'Air Fryer 5.5L', qty: 1, price: 89.99, image: '🍳' }], status: 'Shipped', total: 101.87, address: '42 MG Road, Bengaluru 560001' },
  ]);

  const addOrder = (order) => setOrders(prev => [order, ...prev]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar page={page} setPage={setPage} setAuthModal={setAuthModal} setCartOpen={setCartOpen} />

      <main style={{ flex: 1 }}>
        {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
        {page === 'shop' && <ShopPage setSelectedProduct={setSelectedProduct} />}
        {page === 'orders' && <OrdersPage orders={orders} />}
        {page === 'wishlist' && <WishlistPage setSelectedProduct={setSelectedProduct} />}
        {page === 'profile' && <ProfilePage setAuthModal={setAuthModal} setPage={setPage} orders={orders} />}
        {page === 'dashboard' && <AdminDashboard orders={orders} />}
      </main>

      <Footer setPage={setPage} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} setPage={setPage} addOrder={addOrder} />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} setMode={setAuthModal} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
