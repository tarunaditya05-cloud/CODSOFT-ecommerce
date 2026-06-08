import React, { useState } from 'react';
import { useCart, useAuth, useToast } from '../context/AppContext';
import { Btn, Input, QtyPicker } from './UI';

const TAX_RATE = 0.08;
const FREE_SHIP_THRESHOLD = 50;
const SHIP_COST = 5.99;

export default function CartDrawer({ open, onClose, setPage, addOrder }) {
  const { items, dispatch, total, count } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const [step, setStep] = useState('cart'); // cart | shipping | payment | success
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '', card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const tax = total * TAX_RATE;
  const shipping = total >= FREE_SHIP_THRESHOLD ? 0 : SHIP_COST;
  const grandTotal = total + tax + shipping;

  const handleCheckout = () => {
    if (!user) { toast('Please sign in to checkout', 'warning'); return; }
    setForm(f => ({ ...f, name: user.name, email: user.email }));
    setStep('shipping');
  };

  const validateShipping = () => {
    const e = {};
    if (!form.name) e.name = 'Required';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (!form.card || form.card.length < 16) e.card = 'Enter a valid card number';
    if (!form.expiry) e.expiry = 'Required';
    if (!form.cvv || form.cvv.length < 3) e.cvv = 'Invalid CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;
    const order = {
      id: 'SWV' + Math.floor(Math.random() * 900000 + 100000),
      date: new Date().toLocaleDateString('en-IN'),
      items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price, image: i.image })),
      status: 'Confirmed',
      total: +grandTotal.toFixed(2),
      address: `${form.address}, ${form.city} ${form.zip}`,
    };
    addOrder(order);
    dispatch({ type: 'CLEAR' });
    setStep('success');
  };

  const handleClose = () => { onClose(); setTimeout(() => setStep('cart'), 400); };

  return (
    <>
      {open && <div onClick={handleClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,46,0.5)', zIndex: 298, backdropFilter: 'blur(2px)' }} />}
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: 420, background: '#fff',
        zIndex: 299, display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E8E5DF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#1A1A2E', fontWeight: 700 }}>
              {step === 'cart' ? '🛒 Your Cart' : step === 'shipping' ? '📦 Shipping' : step === 'payment' ? '💳 Payment' : '🎉 Order Placed!'}
            </h2>
            {step === 'cart' && <p style={{ fontSize: 13, color: '#6B6880', marginTop: 2 }}>{count} {count === 1 ? 'item' : 'items'}</p>}
          </div>
          <button onClick={handleClose} style={{ background: '#F8F7F4', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Steps indicator */}
        {['shipping','payment'].includes(step) && (
          <div style={{ padding: '12px 24px', background: '#F8F7F4', display: 'flex', alignItems: 'center', gap: 8 }}>
            {['cart','shipping','payment'].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: ['cart','shipping','payment'].indexOf(step) >= i ? '#FF6B35' : '#E8E5DF', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: ['shipping','payment'].indexOf(step) >= i ? '#FF6B35' : '#E8E5DF', borderRadius: 2 }} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>

          {/* CART STEP */}
          {step === 'cart' && (
            items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#1A1A2E', marginBottom: 8 }}>Your cart is empty</p>
                <p style={{ color: '#6B6880', fontSize: 14 }}>Add items to get started</p>
                <Btn onClick={handleClose} style={{ marginTop: 20 }}>Continue Shopping</Btn>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map(item => (
                  <div key={item.key} style={{ display: 'flex', gap: 12, padding: '12px', background: '#F8F7F4', borderRadius: 12, border: '1px solid #E8E5DF' }}>
                    <div style={{ width: 64, height: 64, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0, border: '1px solid #E8E5DF' }}>{item.image}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E', lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: '#6B6880', marginBottom: 6 }}>{item.brand}{item.selectedColor ? ` · ${item.selectedColor}` : ''}{item.selectedSize ? ` · ${item.selectedSize}` : ''}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <QtyPicker value={item.qty} onChange={qty => dispatch({ type: 'UPDATE', key: item.key, qty })} />
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#FF6B35' }}>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                    <button onClick={() => dispatch({ type: 'REMOVE', key: item.key })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#A8A5B0', fontSize: 16, alignSelf: 'flex-start', padding: 2 }}>✕</button>
                  </div>
                ))}

                {/* Coupon */}
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <input placeholder="Promo code" style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E8E5DF', fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none' }} />
                  <Btn variant="ghost" size="sm">Apply</Btn>
                </div>

                {/* Totals */}
                <div style={{ background: '#F8F7F4', borderRadius: 12, padding: '16px', marginTop: 8 }}>
                  {[['Subtotal', `$${total.toFixed(2)}`], ['Shipping', shipping === 0 ? '🎉 Free' : `$${shipping.toFixed(2)}`], [`Tax (${TAX_RATE*100}%)`, `$${tax.toFixed(2)}`]].map(([l,v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B6880', marginBottom: 8 }}>
                      <span>{l}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #E8E5DF', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17 }}>
                    <span>Total</span><span style={{ color: '#FF6B35' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                {shipping > 0 && <p style={{ fontSize: 12, color: '#00C9A7', textAlign: 'center' }}>Add ${(FREE_SHIP_THRESHOLD - total).toFixed(2)} more for free shipping!</p>}
              </div>
            )
          )}

          {/* SHIPPING STEP */}
          {step === 'shipping' && (
            <div>
              <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} error={errors.name} placeholder="John Doe" />
              <Input label="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="john@email.com" />
              <Input label="Street Address" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} error={errors.address} placeholder="123 Main Street" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input label="City" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} error={errors.city} placeholder="Mumbai" />
                <Input label="ZIP Code" value={form.zip} onChange={e => setForm(f => ({...f, zip: e.target.value}))} error={errors.zip} placeholder="400001" />
              </div>
            </div>
          )}

          {/* PAYMENT STEP */}
          {step === 'payment' && (
            <div>
              <div style={{ background: '#F8F7F4', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#6B6880' }}>Order Total</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#FF6B35' }}>${grandTotal.toFixed(2)}</span>
              </div>
              <Input label="Card Number" value={form.card} onChange={e => setForm(f => ({...f, card: e.target.value.replace(/\D/g,'').slice(0,16)}))} error={errors.card} placeholder="4242 4242 4242 4242" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input label="Expiry (MM/YY)" value={form.expiry} onChange={e => setForm(f => ({...f, expiry: e.target.value}))} error={errors.expiry} placeholder="12/26" />
                <Input label="CVV" value={form.cvv} onChange={e => setForm(f => ({...f, cvv: e.target.value.slice(0,4)}))} error={errors.cvv} placeholder="123" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B6880', marginTop: 8 }}>
                🔒 Your payment is secured with 256-bit SSL
              </div>
              <div style={{ marginTop: 12, padding: 12, background: '#FFF4F0', borderRadius: 10, fontSize: 12, color: '#FF6B35' }}>
                💡 Demo: use card 4242 4242 4242 4242, any expiry/CVV
              </div>
            </div>
          )}

          {/* SUCCESS STEP */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#1A1A2E', marginBottom: 8 }}>Order Confirmed!</h3>
              <p style={{ color: '#6B6880', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                Thank you for your order! You'll receive a confirmation email shortly.
              </p>
              <div style={{ background: '#D1FAE5', borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: '#065F46', fontWeight: 600 }}>✅ Payment Successful</p>
                <p style={{ fontSize: 13, color: '#065F46' }}>Estimated delivery: 3–5 business days</p>
              </div>
              <Btn onClick={handleClose} style={{ width: '100%', marginBottom: 10 }}>Continue Shopping</Btn>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'success' && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #E8E5DF', background: '#fff', display: 'flex', gap: 10 }}>
            {step !== 'cart' && (
              <Btn variant="ghost" onClick={() => setStep(step === 'payment' ? 'shipping' : 'cart')} style={{ flex: 1 }}>← Back</Btn>
            )}
            {step === 'cart' && items.length > 0 && (
              <Btn onClick={handleCheckout} style={{ flex: 1, padding: '13px' }}>Checkout → ${grandTotal.toFixed(2)}</Btn>
            )}
            {step === 'shipping' && (
              <Btn onClick={() => { if(validateShipping()) setStep('payment'); }} style={{ flex: 2, padding: '13px' }}>Continue to Payment →</Btn>
            )}
            {step === 'payment' && (
              <Btn onClick={placeOrder} variant="accent" style={{ flex: 2, padding: '13px' }}>🔒 Place Order</Btn>
            )}
          </div>
        )}
      </div>
    </>
  );
}
