# 🛍️ ShopWave E-Commerce App

A fully functional React e-commerce web application with cart, wishlist, checkout, auth, admin dashboard, and more.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- npm >= 6

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app runs at **http://localhost:3000**

---

## 🔑 Demo Accounts

| Role  | Email              | Password  |
|-------|--------------------|-----------|
| User  | priya@demo.com     | demo123   |
| Admin | admin@demo.com     | admin123  |

---

## ✨ Features

### Storefront
- 🏠 **Homepage** — Hero banner, categories, bestsellers, flash deals, new arrivals, testimonials, newsletter
- 🛒 **Shop Page** — Search, filter by category/price/rating, sort by price/rating/discount
- 📦 **Product Cards** — Images, ratings, badges, wishlist toggle, add to cart
- 🔍 **Product Modal** — Full details, color/size picker, quantity selector, reviews, shipping info

### Shopping
- 🛒 **Cart Drawer** — Add/remove items, quantity update, promo code field, order totals
- 💳 **3-Step Checkout** — Shipping address → Payment → Order confirmation
- ❤️ **Wishlist** — Save & manage favourite products

### User Accounts
- 🔐 **Auth** — Login / Register with demo hint
- 👤 **Profile** — View & edit personal info, account stats
- 📦 **Orders** — Full order history with status tracker (Confirmed → Processing → Shipped → Delivered)

### Admin
- 📊 **Dashboard** — Revenue, orders, users, products KPIs
- 📋 **Orders Table** — Full order management view
- 🏷️ **Products Table** — Inventory & stock levels
- 📈 **Analytics** — Revenue chart, top products, inventory alerts

---

## 🗂️ Project Structure

```
src/
├── App.js                  # Root component & routing
├── index.js                # Entry point
├── index.css               # Global styles & CSS variables
├── data/
│   └── products.js         # Mock product & user data
├── context/
│   └── AppContext.js       # Auth, Cart, Wishlist, Toast providers
├── components/
│   ├── UI.js               # Reusable: ProductCard, Btn, Input, Modal, etc.
│   ├── Navbar.js           # Top navigation
│   ├── Footer.js           # Site footer
│   ├── CartDrawer.js       # Slide-in cart with checkout flow
│   ├── AuthModal.js        # Login / Register modal
│   └── ProductModal.js     # Product detail modal
└── pages/
    ├── HomePage.js          # Landing page
    ├── ShopPage.js          # Product listing with filters
    └── OtherPages.js        # Orders, Wishlist, Profile, Admin Dashboard
```

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Context API + useReducer** — State management (Cart, Auth, Wishlist)
- **CSS Variables** — Design tokens & theming
- **Google Fonts** — Plus Jakarta Sans + Fraunces
- No external UI library — fully custom components

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm run build
# Upload build/ folder to Vercel or use Vercel CLI
```

### Netlify
```bash
npm run build
# Drag & drop build/ folder on netlify.com
```

---

## 🔮 Extending to Full Stack

To add a real backend:

1. **Backend**: Node.js + Express + MongoDB
2. **Auth**: Replace mock auth with JWT + bcrypt
3. **Database**: Mongoose schemas for Users, Products, Orders, Reviews
4. **Payments**: Integrate Stripe or Razorpay
5. **Images**: Use Cloudinary for product images
6. **Email**: Nodemailer for order confirmations

---

## 📄 License

MIT — free to use and modify.
