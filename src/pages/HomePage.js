import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES, BANNERS } from '../data/products';
import { ProductCard, SectionHeader, Btn } from '../components/UI';

export default function HomePage({ setPage, setSelectedProduct }) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const banner = BANNERS[bannerIdx];
  const featured = PRODUCTS.filter(p => p.tags.includes('bestseller')).slice(0, 4);
  const deals = PRODUCTS.filter(p => p.discount >= 25).slice(0, 4);
  const newArr = PRODUCTS.filter(p => p.tags.includes('new')).slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ background: banner.color, overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', minHeight: 360 }}>
          <div style={{ maxWidth: 520, animation: 'fadeUp 0.5s ease' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, letterSpacing: 1, textTransform: 'uppercase' }}>
              🔥 Limited Time Offer
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '20px 0 12px' }}>
              {banner.title}
            </h1>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', fontWeight: 300, marginBottom: 32 }}>{banner.subtitle}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn onClick={() => setPage('shop')} variant="accent" size="lg">{banner.cta} →</Btn>
              <Btn onClick={() => setPage('shop')} size="lg" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)' }}>Browse All</Btn>
            </div>
          </div>
          <div style={{ fontSize: 160, opacity: 0.15, position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>{banner.emoji}</div>
        </div>
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} style={{ width: i === bannerIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === bannerIdx ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#1A1A2E', padding: '20px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
          {[['10M+', 'Happy Customers'], ['500K+', 'Products'], ['50+', 'Brands'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#FF6B35' }}>{num}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px' }}>
        <SectionHeader title="Shop by Category" subtitle="Browse" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
          {CATEGORIES.slice(1).map(cat => (
            <button key={cat.id} onClick={() => setPage('shop')} style={{
              background: '#fff', border: '2px solid #E8E5DF', borderRadius: 16,
              padding: '24px 12px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
              fontFamily: 'var(--font-body)'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B35'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E5DF'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{cat.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 2 }}>{cat.name}</p>
              <p style={{ fontSize: 11, color: '#A8A5B0' }}>{cat.count} items</p>
            </button>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ background: '#F8F7F4', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader title="Best Sellers" subtitle="Most Popular" action={<Btn variant="outline" size="sm" onClick={() => setPage('shop')}>View All →</Btn>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px' }}>
        <SectionHeader title="⚡ Flash Deals" subtitle="Limited Time" action={
          <div style={{ background: '#FEE2E2', borderRadius: 10, padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>⏳</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#991B1B', fontFamily: 'monospace' }}>04:23:15</span>
          </div>
        } />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {deals.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
        </div>
      </section>

      {/* Trust badges */}
      <section style={{ background: '#1A1A2E', padding: '50px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {[
            ['🚚', 'Free Delivery', 'On all orders above $50'],
            ['🔒', 'Secure Payment', '100% protected transactions'],
            ['↩️', 'Easy Returns', '30-day hassle-free returns'],
            ['🎯', 'Best Prices', 'Price match guarantee'],
            ['⭐', 'Top Quality', 'Curated & verified products'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ background: '#F8F7F4', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHeader title="New Arrivals" subtitle="Just Landed" action={<Btn variant="outline" size="sm" onClick={() => setPage('shop')}>See More →</Btn>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {newArr.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
          </div>
        </div>
      </section>

      {/* App Banner */}
      <section style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)', padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Download the App</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Shop on the Go</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>Get exclusive app-only deals, track your orders, and shop faster.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['📱 App Store', '🤖 Google Play'].map(label => (
              <button key={label} style={{ background: '#fff', color: '#1A1A2E', border: 'none', borderRadius: 14, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: '#fff', padding: '60px 40px', textAlign: 'center', borderTop: '1px solid #E8E5DF' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Stay Updated</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>Subscribe & Save 10%</h2>
          <p style={{ color: '#6B6880', fontSize: 14, marginBottom: 24 }}>Get weekly deals, new arrivals and exclusive offers delivered to your inbox.</p>
          <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '2px solid #E8E5DF' }}>
            <input placeholder="Enter your email address" style={{ flex: 1, padding: '12px 16px', border: 'none', outline: 'none', fontSize: 14, fontFamily: 'var(--font-body)', background: '#fff' }} />
            <Btn size="md" style={{ borderRadius: 0, padding: '12px 24px', whiteSpace: 'nowrap' }}>Subscribe</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
