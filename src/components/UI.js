import React, { useState } from 'react';
import { useCart, useWishlist, useToast } from '../context/AppContext';

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const fmt = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(n * 83);
export const fmtUSD = n => `$${n.toFixed(2)}`;

export function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? '#F59E0B' : '#E8E5DF' }}>★</span>
      ))}
    </span>
  );
}

export function Badge({ type, children }) {
  const styles = {
    bestseller: { bg: '#FEF3C7', color: '#92400E' },
    deal:       { bg: '#FEE2E2', color: '#991B1B' },
    new:        { bg: '#D1FAE5', color: '#065F46' },
    popular:    { bg: '#DBEAFE', color: '#1E40AF' },
  };
  const s = styles[type] || { bg: '#F3F4F6', color: '#374151' };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>
      {type === 'bestseller' ? '🏆 Best Seller' : type === 'deal' ? '🔥 Deal' : type === 'new' ? '✨ New' : '❤️ Popular'}
    </span>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
export function ProductCard({ product, onClick }) {
  const { dispatch } = useCart();
  const { toggle, has } = useWishlist();
  const toast = useToast();
  const [adding, setAdding] = useState(false);
  const inWishlist = has(product.id);

  const addToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    dispatch({ type: 'ADD', product });
    toast(`"${product.name}" added to cart!`);
    setTimeout(() => setAdding(false), 600);
  };

  const toggleWish = (e) => {
    e.stopPropagation();
    toggle(product.id);
    toast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist! 💖', inWishlist ? 'warning' : 'success');
  };

  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 16, border: '1px solid #E8E5DF', overflow: 'hidden',
      cursor: 'pointer', transition: 'all 0.25s', position: 'relative',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#FF6B35'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#E8E5DF'; }}
    >
      {/* Wishlist */}
      <button onClick={toggleWish} style={{
        position: 'absolute', top: 12, right: 12, zIndex: 2,
        background: '#fff', border: '1px solid #E8E5DF', borderRadius: '50%',
        width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, cursor: 'pointer', transition: 'all 0.2s',
        color: inWishlist ? '#EF4444' : '#A8A5B0'
      }}>
        {inWishlist ? '❤️' : '🤍'}
      </button>

      {/* Discount badge */}
      {product.discount > 0 && (
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 2,
          background: '#EF4444', color: '#fff', fontSize: 11, fontWeight: 700,
          padding: '3px 8px', borderRadius: 8
        }}>−{product.discount}%</div>
      )}

      {/* Image */}
      <div style={{
        height: 200, background: 'linear-gradient(135deg, #F8F7F4 0%, #F0ECE4 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80
      }}>{product.image}</div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
          {product.tags.slice(0,2).map(t => <Badge key={t} type={t} />)}
        </div>
        <p style={{ fontSize: 11, color: '#6B6880', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>{product.brand}</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 6, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <Stars rating={product.rating} size={12} />
          <span style={{ fontSize: 12, color: '#6B6880' }}>{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>${product.price}</span>
            {product.discount > 0 && <span style={{ fontSize: 12, color: '#A8A5B0', textDecoration: 'line-through', marginLeft: 6 }}>${product.originalPrice}</span>}
          </div>
          <button onClick={addToCart} style={{
            background: adding ? '#00C9A7' : '#FF6B35', color: '#fff',
            border: 'none', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s', transform: adding ? 'scale(0.95)' : 'scale(1)'
          }}>
            {adding ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
      <div>
        {subtitle && <p style={{ fontSize: 13, color: '#FF6B35', fontWeight: 600, letterSpacing: 0.5, marginBottom: 4, textTransform: 'uppercase' }}>{subtitle}</p>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: '#1A1A2E' }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function Btn({ children, variant = 'primary', size = 'md', onClick, style = {}, disabled }) {
  const base = { cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, border: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 12 };
  const sizes = { sm: { padding: '7px 16px', fontSize: 13 }, md: { padding: '10px 22px', fontSize: 14 }, lg: { padding: '14px 32px', fontSize: 16 } };
  const variants = {
    primary: { background: '#FF6B35', color: '#fff' },
    secondary: { background: '#1A1A2E', color: '#fff' },
    outline: { background: 'transparent', color: '#FF6B35', border: '2px solid #FF6B35' },
    ghost: { background: '#F8F7F4', color: '#1A1A2E', border: '1px solid #E8E5DF' },
    accent: { background: '#00C9A7', color: '#fff' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], opacity: disabled ? 0.6 : 1, ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}>
      {children}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export function Input({ label, error, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A2E', marginBottom: 6 }}>{label}</label>}
      <input {...props} style={{
        width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
        border: `1.5px solid ${error ? '#EF4444' : '#E8E5DF'}`, background: '#fff',
        color: '#1A1A2E', outline: 'none', fontFamily: 'var(--font-body)', transition: 'border 0.2s',
        ...props.style
      }}
        onFocus={e => e.target.style.borderColor = '#FF6B35'}
        onBlur={e => e.target.style.borderColor = error ? '#EF4444' : '#E8E5DF'}
      />
      {error && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
export function Modal({ onClose, children, maxWidth = 480 }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(26,26,46,0.6)', backdropFilter: 'blur(6px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, maxWidth, width: '100%',
        maxHeight: '90vh', overflowY: 'auto', animation: 'scaleIn 0.25s ease',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)'
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── QUANTITY PICKER ──────────────────────────────────────────────────────────
export function QtyPicker({ value, onChange, min = 1 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #E8E5DF', borderRadius: 10, overflow: 'hidden' }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={{ width: 36, height: 36, background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', color: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
      <span style={{ width: 36, textAlign: 'center', fontSize: 15, fontWeight: 600, color: '#1A1A2E' }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ width: 36, height: 36, background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', color: '#1A1A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
  );
}
