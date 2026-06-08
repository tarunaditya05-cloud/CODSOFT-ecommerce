import React, { useState } from 'react';
import { useCart, useWishlist, useToast } from '../context/AppContext';
import { Modal, Stars, Badge, Btn, QtyPicker } from './UI';

export default function ProductModal({ product: p, onClose }) {
  const { dispatch } = useCart();
  const { toggle, has } = useWishlist();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(p.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(p.sizes?.[0] || null);
  const [tab, setTab] = useState('desc');
  const inWishlist = has(p.id);

  const REVIEWS = [
    { name: 'Rahul M.', rating: 5, date: '2 days ago', text: 'Excellent product! Exactly as described. Fast shipping too.' },
    { name: 'Sneha K.', rating: 4, date: '1 week ago', text: 'Good quality for the price. Would definitely buy again.' },
    { name: 'Amit P.', rating: 5, date: '2 weeks ago', text: 'Surpassed my expectations. Highly recommended!' },
  ];

  const addToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', product: p, color: selectedColor, size: selectedSize });
    toast(`${qty}× "${p.name}" added to cart! 🛒`);
    onClose();
  };

  const savings = p.discount > 0 ? (p.originalPrice - p.price) * qty : 0;

  return (
    <Modal onClose={onClose} maxWidth={760}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Image */}
        <div style={{ flex: '1 1 280px', background: 'linear-gradient(135deg, #F8F7F4 0%, #F0ECE4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, minHeight: 300, position: 'relative', borderRadius: '20px 0 0 20px' }}>
          {p.image}
          {p.discount > 0 && (
            <div style={{ position: 'absolute', top: 16, left: 16, background: '#EF4444', color: '#fff', fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>−{p.discount}% OFF</div>
          )}
        </div>

        {/* Details */}
        <div style={{ flex: '1 1 300px', padding: '28px 28px' }}>
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map(t => <Badge key={t} type={t} />)}
            </div>
            <button onClick={onClose} style={{ background: '#F8F7F4', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>

          <p style={{ fontSize: 12, color: '#6B6880', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>{p.brand}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#1A1A2E', lineHeight: 1.3, marginBottom: 10 }}>{p.name}</h2>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Stars rating={p.rating} size={14} />
            <span style={{ fontSize: 13, color: '#6B6880' }}>{p.rating} ({p.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: '#1A1A2E' }}>${p.price}</span>
            {p.discount > 0 && <span style={{ fontSize: 16, color: '#A8A5B0', textDecoration: 'line-through' }}>${p.originalPrice}</span>}
          </div>
          {savings > 0 && <p style={{ fontSize: 13, color: '#22C55E', fontWeight: 600, marginBottom: 12 }}>You save ${savings.toFixed(2)}!</p>}

          {/* Stock */}
          <p style={{ fontSize: 13, color: p.stock < 10 ? '#EF4444' : '#22C55E', fontWeight: 600, marginBottom: 16 }}>
            {p.stock < 10 ? `⚠️ Only ${p.stock} left!` : `✅ In Stock (${p.stock} available)`}
          </p>

          {/* Colors */}
          {p.colors?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Color: <span style={{ color: '#6B6880', fontWeight: 400 }}>{selectedColor}</span></p>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c,
                    border: `3px solid ${selectedColor === c ? '#FF6B35' : '#E8E5DF'}`,
                    cursor: 'pointer', outline: 'none',
                    boxShadow: selectedColor === c ? '0 0 0 2px #fff, 0 0 0 4px #FF6B35' : 'none'
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {p.sizes?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Size: <span style={{ color: '#6B6880', fontWeight: 400 }}>{selectedSize}</span></p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    padding: '5px 12px', borderRadius: 8, border: `2px solid ${selectedSize === s ? '#FF6B35' : '#E8E5DF'}`,
                    background: selectedSize === s ? '#FFF4F0' : '#fff', color: selectedSize === s ? '#FF6B35' : '#1A1A2E',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)'
                  }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Qty & Actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
            <QtyPicker value={qty} onChange={setQty} />
            <Btn onClick={addToCart} style={{ flex: 1, padding: '11px' }}>🛒 Add to Cart</Btn>
            <button onClick={() => { toggle(p.id); toast(inWishlist ? 'Removed from wishlist' : '❤️ Added to wishlist!', inWishlist ? 'warning' : 'success'); }} style={{ width: 44, height: 44, borderRadius: 10, border: `2px solid ${inWishlist ? '#EF4444' : '#E8E5DF'}`, background: inWishlist ? '#FEF2F2' : '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {inWishlist ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Tabs */}
          <div style={{ borderTop: '1px solid #E8E5DF', paddingTop: 16 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
              {['desc','reviews','shipping'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '5px 12px', borderRadius: 8, border: 'none', background: tab === t ? '#FFF4F0' : 'transparent', color: tab === t ? '#FF6B35' : '#6B6880', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {t === 'desc' ? 'Description' : t === 'reviews' ? 'Reviews' : 'Shipping'}
                </button>
              ))}
            </div>
            {tab === 'desc' && <p style={{ fontSize: 14, color: '#6B6880', lineHeight: 1.7 }}>{p.description}</p>}
            {tab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {REVIEWS.map((r, i) => (
                  <div key={i} style={{ padding: '12px', background: '#F8F7F4', borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</span>
                      <span style={{ fontSize: 11, color: '#A8A5B0' }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} size={12} />
                    <p style={{ fontSize: 13, color: '#6B6880', marginTop: 4 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === 'shipping' && (
              <div style={{ fontSize: 13, color: '#6B6880', lineHeight: 2 }}>
                📦 Free shipping on orders over $50<br />
                🚚 Standard delivery: 3–5 business days<br />
                ⚡ Express delivery: 1–2 business days<br />
                ↩️ Easy 30-day returns & exchanges
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
