import React from 'react';

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: '#1A1A2E', color: '#fff', padding: '60px 40px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: '#FF6B35', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛍️</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>ShopWave</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>Your one-stop destination for everything you need, delivered fast and affordably.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
              ))}
            </div>
          </div>
          {[
            ['Quick Links', [['Home', 'home'], ['Shop', 'shop'], ['Orders', 'orders'], ['Wishlist', 'wishlist']]],
            ['Categories', [['Electronics', 'shop'], ['Clothing', 'shop'], ['Home & Kitchen', 'shop'], ['Books', 'shop']]],
            ['Support', [['FAQ', null], ['Contact Us', null], ['Returns', null], ['Track Order', 'orders']]],
          ].map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{title}</p>
              {links.map(([label, pg]) => (
                <p key={label} onClick={() => pg && setPage(pg)} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10, cursor: pg ? 'pointer' : 'default', transition: 'color 0.2s' }}
                  onMouseEnter={e => { if (pg) e.currentTarget.style.color = '#FF6B35'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >{label}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>© 2024 ShopWave. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['💳 Visa', '💳 Mastercard', '📱 UPI', '🏦 NetBanking'].map(m => (
              <span key={m} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 6 }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
