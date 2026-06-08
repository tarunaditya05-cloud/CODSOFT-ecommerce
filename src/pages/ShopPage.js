import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard, SectionHeader } from '../components/UI';

export default function ShopPage({ setSelectedProduct, initCategory }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initCategory || 'all');
  const [sort, setSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    list = list.filter(p => p.price <= maxPrice && p.rating >= minRating);
    switch (sort) {
      case 'low': return list.sort((a, b) => a.price - b.price);
      case 'high': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      case 'new': return list.filter(p => p.tags.includes('new'));
      case 'discount': return list.sort((a, b) => b.discount - a.discount);
      default: return list.sort((a, b) => (b.tags.includes('popular') ? 1 : 0) - (a.tags.includes('popular') ? 1 : 0));
    }
  }, [search, category, sort, maxPrice, minRating]);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            placeholder="Search products, brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: 12, border: '1.5px solid #E8E5DF', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', background: '#fff' }}
            onFocus={e => e.target.style.borderColor = '#FF6B35'}
            onBlur={e => e.target.style.borderColor = '#E8E5DF'}
          />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid #E8E5DF', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', background: '#fff', cursor: 'pointer', color: '#1A1A2E' }}>
          <option value="popular">Most Popular</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="new">New Arrivals</option>
          <option value="discount">Biggest Discount</option>
        </select>
        <button onClick={() => setShowFilters(v => !v)} style={{ padding: '11px 18px', borderRadius: 12, border: '1.5px solid #E8E5DF', background: showFilters ? '#FFF4F0' : '#fff', color: showFilters ? '#FF6B35' : '#1A1A2E', borderColor: showFilters ? '#FF6B35' : '#E8E5DF', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 6 }}>
          ⚡ Filters
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, display: showFilters ? 'block' : 'none' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', padding: '20px', position: 'sticky', top: 80 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>Filters</p>

            <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6880', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Category</p>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                width: '100%', textAlign: 'left', background: category === cat.id ? '#FFF4F0' : 'transparent',
                color: category === cat.id ? '#FF6B35' : '#1A1A2E', border: 'none', padding: '8px 10px',
                borderRadius: 8, fontSize: 14, fontWeight: category === cat.id ? 600 : 400, cursor: 'pointer',
                fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span>{cat.icon} {cat.name}</span>
                <span style={{ fontSize: 11, color: '#A8A5B0' }}>{cat.count}</span>
              </button>
            ))}

            <div style={{ height: 1, background: '#E8E5DF', margin: '16px 0' }} />

            <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6880', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Max Price</p>
            <input type="range" min="10" max="200" step="5" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: '100%', accentColor: '#FF6B35', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B6880', marginTop: 4 }}>
              <span>$10</span><span style={{ color: '#FF6B35', fontWeight: 700 }}>${maxPrice}</span>
            </div>

            <div style={{ height: 1, background: '#E8E5DF', margin: '16px 0' }} />

            <p style={{ fontSize: 12, fontWeight: 700, color: '#6B6880', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>Min Rating</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 3, 4, 4.5].map(r => (
                <button key={r} onClick={() => setMinRating(r)} style={{ padding: '4px 10px', borderRadius: 8, border: `2px solid ${minRating === r ? '#FF6B35' : '#E8E5DF'}`, background: minRating === r ? '#FFF4F0' : '#fff', color: minRating === r ? '#FF6B35' : '#1A1A2E', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {r === 0 ? 'All' : `${r}★+`}
                </button>
              ))}
            </div>

            <div style={{ height: 1, background: '#E8E5DF', margin: '16px 0' }} />
            <button onClick={() => { setCategory('all'); setSort('popular'); setMaxPrice(200); setMinRating(0); setSearch(''); }} style={{ width: '100%', padding: '9px', borderRadius: 10, border: '1.5px solid #E8E5DF', background: 'transparent', color: '#6B6880', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: '#6B6880' }}>
              Showing <strong style={{ color: '#1A1A2E' }}>{filtered.length}</strong> products
              {search && <> for "<strong style={{ color: '#FF6B35' }}>{search}</strong>"</>}
            </p>
            {/* Active filters */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {category !== 'all' && <span style={{ background: '#FFF4F0', color: '#FF6B35', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{CATEGORIES.find(c=>c.id===category)?.name} ✕</span>}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#1A1A2E', marginBottom: 8 }}>No products found</h3>
              <p style={{ color: '#6B6880' }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
