import React, { useState } from 'react';
import { useAuth, useCart, useWishlist } from '../context/AppContext';

export default function Navbar({ page, setPage, setAuthModal, setCartOpen }) {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
  ];

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #E8E5DF',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        {/* Logo */}
        <div onClick={() => setPage('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, background: '#FF6B35', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛍️</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#1A1A2E' }}>ShopWave</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4 }} className="hide-mobile">
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              background: page === n.id ? '#FFF4F0' : 'transparent',
              color: page === n.id ? '#FF6B35' : '#6B6880',
              border: 'none', padding: '7px 16px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'var(--font-body)'
            }}>{n.label}</button>
          ))}
          {user?.role === 'admin' && (
            <button onClick={() => setPage('dashboard')} style={{
              background: page === 'dashboard' ? '#FFF4F0' : 'transparent',
              color: page === 'dashboard' ? '#FF6B35' : '#6B6880',
              border: 'none', padding: '7px 16px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)'
            }}>Dashboard</button>
          )}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Search */}
          <button onClick={() => setPage('shop')} style={{ background: '#F8F7F4', border: '1px solid #E8E5DF', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6B6880', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)' }} className="hide-mobile">
            🔍 Search
          </button>

          {/* Wishlist */}
          <button onClick={() => setPage('wishlist')} style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, fontSize: 20 }}>
            🤍
            {ids.length > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: '#EF4444', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ids.length}</span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => setCartOpen(true)} style={{ position: 'relative', background: '#FF6B35', border: 'none', borderRadius: 10, cursor: 'pointer', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)' }}>
            🛒 <span className="hide-mobile">Cart</span>
            {count > 0 && (
              <span style={{ background: '#fff', color: '#FF6B35', borderRadius: '50%', width: 20, height: 20, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 20 }}>{count}</span>
            )}
          </button>

          {/* User */}
          <div style={{ position: 'relative' }}>
            {user ? (
              <button onClick={() => setUserMenuOpen(v => !v)} style={{
                background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 10,
                padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)'
              }}>
                <span style={{ background: '#FF6B35', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{user.avatar}</span>
                <span className="hide-mobile">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button onClick={() => setAuthModal('login')} style={{ background: '#1A1A2E', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                Sign In
              </button>
            )}
            {/* Dropdown */}
            {userMenuOpen && user && (
              <div style={{
                position: 'absolute', right: 0, top: '110%', background: '#fff',
                border: '1px solid #E8E5DF', borderRadius: 14, padding: 8, minWidth: 180,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, animation: 'scaleIn 0.2s ease'
              }}>
                {[
                  { label: '👤 Profile', page: 'profile' },
                  { label: '📦 My Orders', page: 'orders' },
                  { label: '❤️ Wishlist', page: 'wishlist' },
                ].map(item => (
                  <button key={item.page} onClick={() => { setPage(item.page); setUserMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '9px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer', color: '#1A1A2E', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F8F7F4'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >{item.label}</button>
                ))}
                <div style={{ borderTop: '1px solid #E8E5DF', margin: '4px 0' }} />
                <button onClick={() => { logout(); setUserMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '9px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer', color: '#EF4444', fontFamily: 'var(--font-body)' }}>🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
