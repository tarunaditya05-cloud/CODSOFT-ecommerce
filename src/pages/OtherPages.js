import React, { useState } from 'react';
import { useAuth, useWishlist, useCart, useToast } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard, Stars, Btn, Input } from '../components/UI';

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const STATUS = {
  Confirmed: { bg: '#DBEAFE', color: '#1E40AF', icon: '✅' },
  Processing: { bg: '#FEF3C7', color: '#92400E', icon: '⚙️' },
  Shipped: { bg: '#D1FAE5', color: '#065F46', icon: '🚚' },
  Delivered: { bg: '#D1FAE5', color: '#065F46', icon: '📦' },
  Cancelled: { bg: '#FEE2E2', color: '#991B1B', icon: '❌' },
};

// ─── ORDERS PAGE ──────────────────────────────────────────────────────────────
export function OrdersPage({ orders }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔐</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#1A1A2E', marginBottom: 8 }}>Sign in to view orders</h2>
      <p style={{ color: '#6B6880' }}>Please sign in to access your order history</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Order History</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#1A1A2E' }}>My Orders</h1>
        <p style={{ color: '#6B6880', marginTop: 4 }}>{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 20, border: '1px solid #E8E5DF' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>No orders yet</h3>
          <p style={{ color: '#6B6880' }}>Start shopping to see your orders here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map(order => {
            const s = STATUS[order.status] || STATUS.Confirmed;
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {/* Header */}
                <div onClick={() => setExpanded(isOpen ? null : order.id)} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: 12, color: '#6B6880', marginBottom: 2 }}>Order ID</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', fontFamily: 'monospace' }}>#{order.id}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: '#6B6880', marginBottom: 2 }}>Date</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{order.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: '#6B6880', marginBottom: 2 }}>Total</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: '#FF6B35' }}>${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ background: s.bg, color: s.color, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                      {s.icon} {order.status}
                    </span>
                    <span style={{ fontSize: 18, color: '#A8A5B0' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Details */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #E8E5DF', padding: '20px 24px', animation: 'fadeUp 0.2s ease' }}>
                    {/* Progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
                      {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((st, i) => {
                        const statuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
                        const current = statuses.indexOf(order.status);
                        const done = i <= current;
                        return (
                          <React.Fragment key={st}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
                              <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#FF6B35' : '#E8E5DF', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 4 }}>
                                {done ? '✓' : i + 1}
                              </div>
                              <span style={{ fontSize: 10, color: done ? '#FF6B35' : '#A8A5B0', fontWeight: 600, whiteSpace: 'nowrap' }}>{st}</span>
                            </div>
                            {i < 3 && <div style={{ flex: 1, height: 3, background: i < current ? '#FF6B35' : '#E8E5DF', borderRadius: 2, marginBottom: 16 }} />}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Items */}
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 12 }}>Items ({order.items.length})</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {order.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px', background: '#F8F7F4', borderRadius: 10 }}>
                          <span style={{ fontSize: 28 }}>{item.image}</span>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: '#6B6880' }}>Qty: {item.qty}</p>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E' }}>${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    {order.address && <p style={{ fontSize: 13, color: '#6B6880', marginTop: 12 }}>📍 Delivery to: {order.address}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── WISHLIST PAGE ────────────────────────────────────────────────────────────
export function WishlistPage({ setSelectedProduct }) {
  const { ids, toggle } = useWishlist();
  const { dispatch } = useCart();
  const toast = useToast();
  const wished = PRODUCTS.filter(p => ids.includes(p.id));

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Saved Items</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#1A1A2E' }}>My Wishlist</h1>
        <p style={{ color: '#6B6880', marginTop: 4 }}>{wished.length} {wished.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {wished.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 20, border: '1px solid #E8E5DF' }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🤍</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 8 }}>Nothing saved yet</h3>
          <p style={{ color: '#6B6880', marginBottom: 24 }}>Tap the heart icon on any product to save it here</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {wished.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
export function ProfilePage({ setAuthModal, setPage, orders }) {
  const { user, logout, updateProfile } = useAuth();
  const { ids } = useWishlist();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const toast = useToast();

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>👤</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>My Account</h2>
      <p style={{ color: '#6B6880', marginBottom: 32 }}>Sign in to access your profile, orders & wishlist</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Btn onClick={() => setAuthModal('login')}>Sign In</Btn>
        <Btn variant="outline" onClick={() => setAuthModal('register')}>Create Account</Btn>
      </div>
    </div>
  );

  const save = () => { updateProfile(form); setEditing(false); toast('Profile updated!'); };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)', borderRadius: 20, padding: '32px', marginBottom: 24, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{user.avatar}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
            {user.role === 'admin' ? '⭐ Admin Account' : 'ShopWave Member'}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff', fontWeight: 700, marginBottom: 2 }}>{user.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{user.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="ghost" size="sm" onClick={() => { logout(); setPage('home'); toast('Logged out successfully'); }}>🚪 Logout</Btn>
          {user.role === 'admin' && <Btn size="sm" onClick={() => setPage('dashboard')}>⚡ Dashboard</Btn>}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          ['📦', orders.length, 'Total Orders'],
          ['❤️', ids.length, 'Wishlist Items'],
          ['⭐', '4.8', 'Avg Rating Given'],
          ['🎯', user.joined || '2024', 'Member Since'],
        ].map(([icon, val, label]) => (
          <div key={label} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A2E', fontFamily: 'var(--font-display)' }}>{val}</p>
            <p style={{ fontSize: 12, color: '#6B6880' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Profile Form */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8E5DF', padding: '28px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>Personal Information</h3>
          {!editing && <Btn variant="ghost" size="sm" onClick={() => setEditing(true)}>✏️ Edit</Btn>}
        </div>
        {editing ? (
          <>
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <Btn onClick={save} style={{ flex: 1 }}>Save Changes</Btn>
              <Btn variant="ghost" onClick={() => setEditing(false)} style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </>
        ) : (
          <div>
            {[['Full Name', user.name], ['Email', user.email], ['Role', user.role.charAt(0).toUpperCase() + user.role.slice(1)], ['Member Since', user.joined || '2024']].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E8E5DF' }}>
                <span style={{ fontSize: 14, color: '#6B6880' }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {[['📦 My Orders', 'orders'], ['❤️ Wishlist', 'wishlist'], ['🏠 Shop', 'shop']].map(([label, pg]) => (
          <button key={pg} onClick={() => setPage(pg)} style={{ background: '#fff', border: '1.5px solid #E8E5DF', borderRadius: 14, padding: '16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1A1A2E', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B35'; e.currentTarget.style.color = '#FF6B35'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E5DF'; e.currentTarget.style.color = '#1A1A2E'; }}
          >{label}</button>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
export function AdminDashboard({ orders }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') return (
    <div style={{ textAlign: 'center', padding: '100px 40px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔐</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#1A1A2E', marginBottom: 8 }}>Access Denied</h2>
      <p style={{ color: '#6B6880' }}>Admin credentials required</p>
    </div>
  );

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const statusCounts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;
  const catRevenue = {};
  PRODUCTS.forEach(p => { catRevenue[p.category] = (catRevenue[p.category] || 0) + p.price * p.reviews / 100; });

  const TABS = ['overview', 'orders', 'products', 'analytics'];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Admin Panel</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#1A1A2E' }}>Dashboard</h1>
        </div>
        <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: '1px solid #E8E5DF', overflow: 'hidden' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', background: activeTab === t ? '#FF6B35' : 'transparent', color: activeTab === t ? '#fff' : '#6B6880', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              ['💰', `$${totalRevenue.toFixed(2)}`, 'Total Revenue', '+12.5%', '#D1FAE5', '#065F46'],
              ['📦', orders.length, 'Total Orders', '+8.2%', '#DBEAFE', '#1E40AF'],
              ['👥', 2, 'Registered Users', '+3', '#FEF3C7', '#92400E'],
              ['🛍️', PRODUCTS.length, 'Active Products', '0', '#F3E8FF', '#6B21A8'],
              ['💳', `$${avgOrder.toFixed(2)}`, 'Avg Order Value', '+5.1%', '#FFE4E6', '#9F1239'],
            ].map(([icon, val, label, change, bg, color]) => (
              <div key={label} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
                  <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{change}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: '#1A1A2E', marginBottom: 2 }}>{val}</p>
                <p style={{ fontSize: 13, color: '#6B6880' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Charts & Recent Orders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Order Status</h3>
              {Object.entries(statusCounts).map(([status, count]) => {
                const s = STATUS[status] || { bg: '#F3F4F6', color: '#374151' };
                const pct = Math.round((count / orders.length) * 100);
                return (
                  <div key={status} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: '#1A1A2E' }}>{status}</span>
                      <span style={{ color: '#6B6880' }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: 8, background: '#F8F7F4', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: s.color, borderRadius: 4, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Revenue by Category</h3>
              {Object.entries(catRevenue).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([cat, rev]) => {
                const maxRev = Math.max(...Object.values(catRevenue));
                return (
                  <div key={cat} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: '#1A1A2E', textTransform: 'capitalize' }}>{cat}</span>
                      <span style={{ color: '#6B6880' }}>${rev.toFixed(0)}</span>
                    </div>
                    <div style={{ height: 8, background: '#F8F7F4', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(rev / maxRev) * 100}%`, background: '#FF6B35', borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8F7F4' }}>
                {['Order ID', 'Date', 'Items', 'Total', 'Status'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B6880', letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => {
                const s = STATUS[order.status] || STATUS.Confirmed;
                return (
                  <tr key={order.id} style={{ borderTop: '1px solid #E8E5DF', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 700, color: '#1A1A2E', fontFamily: 'monospace' }}>#{order.id}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#6B6880' }}>{order.date}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#1A1A2E' }}>{order.items.map(i => i.name).join(', ').slice(0, 40)}…</td>
                    <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 700, color: '#FF6B35' }}>${order.total.toFixed(2)}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ background: s.bg, color: s.color, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{s.icon} {order.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PRODUCTS */}
      {activeTab === 'products' && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8F7F4' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Reviews'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B6880', letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={p.id} style={{ borderTop: '1px solid #E8E5DF', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.image}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: '#6B6880' }}>{p.brand}</p>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: '#6B6880', textTransform: 'capitalize' }}>{p.category}</td>
                  <td style={{ padding: '12px 20px', fontSize: 13, fontWeight: 700, color: '#1A1A2E' }}>${p.price}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: p.stock < 10 ? '#EF4444' : '#22C55E' }}>{p.stock}</span>
                  </td>
                  <td style={{ padding: '12px 20px' }}><Stars rating={p.rating} size={12} /></td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: '#6B6880' }}>{p.reviews.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ANALYTICS */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '28px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>Monthly Revenue (Simulated)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160 }}>
              {[42, 65, 58, 71, 89, 76, 95, 83, 110, 98, 124, 142].map((val, i) => {
                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', background: i === 11 ? '#FF6B35' : '#FFF4F0', borderRadius: '4px 4px 0 0', height: `${(val / 142) * 140}px`, transition: 'height 0.5s ease', border: i === 11 ? 'none' : '1px solid #FFD4C2' }} />
                    <span style={{ fontSize: 9, color: '#A8A5B0', fontWeight: 600 }}>{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Top Products by Reviews</h3>
              {[...PRODUCTS].sort((a,b) => b.reviews - a.reviews).slice(0,5).map((p,i) => (
                <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#A8A5B0', width: 20 }}>#{i+1}</span>
                  <span style={{ fontSize: 24 }}>{p.image}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{p.name}</p>
                    <p style={{ fontSize: 11, color: '#6B6880' }}>{p.reviews.toLocaleString()} reviews</p>
                  </div>
                  <Stars rating={p.rating} size={11} />
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '24px' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Inventory Alert</h3>
              {PRODUCTS.filter(p => p.stock < 15).sort((a,b) => a.stock - b.stock).map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '10px', background: p.stock < 5 ? '#FEF2F2' : '#FEF3C7', borderRadius: 10 }}>
                  <span style={{ fontSize: 24 }}>{p.image}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{p.name}</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.stock < 5 ? '#EF4444' : '#F59E0B' }}>{p.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
