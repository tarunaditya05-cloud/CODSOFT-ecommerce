import React, { useState } from 'react';
import { useAuth, useToast } from '../context/AppContext';
import { Modal, Input, Btn } from './UI';

export default function AuthModal({ mode, onClose, setMode }) {
  const { login, register } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isLogin = mode === 'login';

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!isLogin && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    if (isLogin) {
      const result = login(form.email, form.password);
      if (result.ok) { toast('Welcome back! 👋'); onClose(); }
      else setErrors({ email: result.error });
    } else {
      const result = register(form.name, form.email, form.password);
      if (result.ok) { toast('Account created successfully! 🎉'); onClose(); }
      else setErrors({ email: result.error });
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose} maxWidth={440}>
      <div style={{ padding: '36px 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, background: '#FFF4F0', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 12px' }}>🛍️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p style={{ fontSize: 14, color: '#6B6880' }}>
            {isLogin ? 'Sign in to your ShopWave account' : 'Join ShopWave for the best deals'}
          </p>
        </div>

        {/* Demo hint */}
        {isLogin && (
          <div style={{ background: '#FFF4F0', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 12, color: '#6B6880', border: '1px solid #FFD4C2' }}>
            <strong style={{ color: '#FF6B35' }}>Demo accounts:</strong><br />
            User: priya@demo.com / demo123<br />
            Admin: admin@demo.com / admin123
          </div>
        )}

        {/* Form */}
        {!isLogin && <Input label="Full Name" value={form.name} onChange={f('name')} error={errors.name} placeholder="Your full name" />}
        <Input label="Email Address" type="email" value={form.email} onChange={f('email')} error={errors.email} placeholder="you@email.com" />
        <Input label="Password" type="password" value={form.password} onChange={f('password')} error={errors.password} placeholder="At least 6 characters" />
        {!isLogin && <Input label="Confirm Password" type="password" value={form.confirm} onChange={f('confirm')} error={errors.confirm} placeholder="Repeat your password" />}

        {/* Submit */}
        <Btn onClick={submit} disabled={loading} style={{ width: '100%', padding: '13px', marginTop: 4, fontSize: 15 }}>
          {loading ? '⏳ Please wait...' : isLogin ? '🔑 Sign In' : '🚀 Create Account'}
        </Btn>

        {/* Switch */}
        <p style={{ textAlign: 'center', fontSize: 14, color: '#6B6880', marginTop: 20 }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setMode(isLogin ? 'register' : 'login')} style={{ color: '#FF6B35', fontWeight: 600, cursor: 'pointer' }}>
            {isLogin ? 'Register' : 'Sign In'}
          </span>
        </p>

        {/* Social */}
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#A8A5B0', marginBottom: 12 }}>or continue with</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {[['🇬 Google', '#fff'], ['🐙 GitHub', '#1A1A2E']].map(([label, bg]) => (
              <button key={label} onClick={() => toast('Social login coming soon!', 'warning')} style={{ padding: '9px 20px', borderRadius: 10, border: '1.5px solid #E8E5DF', background: bg, color: bg === '#fff' ? '#1A1A2E' : '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
