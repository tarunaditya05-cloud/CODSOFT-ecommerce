export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️', count: 24 },
  { id: 'electronics', name: 'Electronics', icon: '📱', count: 6 },
  { id: 'clothing', name: 'Clothing', icon: '👕', count: 6 },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠', count: 4 },
  { id: 'sports', name: 'Sports', icon: '⚽', count: 4 },
  { id: 'books', name: 'Books', icon: '📚', count: 4 },
];

export const PRODUCTS = [
  // Electronics
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', brand: 'SoundMax', category: 'electronics', price: 79.99, originalPrice: 129.99, discount: 38, rating: 4.6, reviews: 2341, stock: 15, image: '🎧', description: 'Premium sound quality with 40hr battery life, active noise cancellation, and foldable design. Perfect for travel and work-from-home.', tags: ['bestseller', 'deal'], colors: ['#1A1A2E', '#FF6B35', '#FFFFFF'], sizes: [] },
  { id: 2, name: 'Smart Fitness Watch', brand: 'FitPro', category: 'electronics', price: 149.99, originalPrice: 199.99, discount: 25, rating: 4.4, reviews: 1876, stock: 23, image: '⌚', description: 'Track heart rate, sleep, steps, calories. GPS enabled. 7-day battery. Water resistant up to 50m. Compatible with iOS & Android.', tags: ['new', 'popular'], colors: ['#000', '#C0C0C0', '#FF6B35'], sizes: [] },
  { id: 3, name: 'Portable Bluetooth Speaker', brand: 'BoomBox', category: 'electronics', price: 49.99, originalPrice: 49.99, discount: 0, rating: 4.3, reviews: 987, stock: 42, image: '🔊', description: '360° sound, IPX7 waterproof, 20hr playtime, built-in microphone. Pairs instantly with any Bluetooth device.', tags: ['popular'], colors: ['#1A1A2E', '#00C9A7', '#FF6B35'], sizes: [] },
  { id: 4, name: 'USB-C Laptop Charging Hub', brand: 'ConnectPro', category: 'electronics', price: 34.99, originalPrice: 44.99, discount: 22, rating: 4.5, reviews: 654, stock: 60, image: '🔌', description: '7-in-1 hub: 4K HDMI, 3× USB-A, SD card, USB-C PD 100W. Compact aluminum design.', tags: ['deal'], colors: ['#C0C0C0'], sizes: [] },
  { id: 5, name: 'Mechanical Gaming Keyboard', brand: 'KeyForce', category: 'electronics', price: 89.99, originalPrice: 110.00, discount: 18, rating: 4.7, reviews: 1234, stock: 18, image: '⌨️', description: 'TKL layout, RGB backlit, red linear switches, USB-C detachable cable. Tactile, fast, and durable for 50M keystrokes.', tags: ['bestseller', 'new'], colors: ['#1A1A2E', '#FFFFFF'], sizes: [] },
  { id: 6, name: 'Webcam HD 1080p', brand: 'ClearView', category: 'electronics', price: 59.99, originalPrice: 79.99, discount: 25, rating: 4.2, reviews: 445, stock: 33, image: '📷', description: 'Auto-focus, built-in dual mic with noise reduction, plug-and-play USB. Perfect for video calls and streaming.', tags: [], colors: ['#1A1A2E'], sizes: [] },

  // Clothing
  { id: 7, name: 'Classic Cotton T-Shirt', brand: 'BasicsLab', category: 'clothing', price: 19.99, originalPrice: 19.99, discount: 0, rating: 4.5, reviews: 3210, stock: 120, image: '👕', description: '100% organic cotton, pre-shrunk, relaxed fit. Available in 12 colors. Machine washable. Sustainably made.', tags: ['bestseller', 'popular'], colors: ['#FFFFFF', '#1A1A2E', '#FF6B35', '#00C9A7'], sizes: ['XS','S','M','L','XL','XXL'] },
  { id: 8, name: 'Slim Fit Chino Pants', brand: 'UrbanThread', category: 'clothing', price: 44.99, originalPrice: 59.99, discount: 25, rating: 4.3, reviews: 876, stock: 55, image: '👖', description: 'Stretch twill fabric, 5-pocket design, modern slim fit. Smart-casual ready. Wrinkle resistant.', tags: ['deal'], colors: ['#8B7355', '#1A1A2E', '#6B7280'], sizes: ['28','30','32','34','36','38'] },
  { id: 9, name: 'Lightweight Running Jacket', brand: 'ActiveWear', category: 'clothing', price: 64.99, originalPrice: 89.99, discount: 28, rating: 4.6, reviews: 543, stock: 28, image: '🧥', description: 'Wind and water resistant, reflective details, packable into pocket. Ideal for outdoor runs and morning commutes.', tags: ['new', 'popular'], colors: ['#FF6B35', '#1A1A2E', '#00C9A7'], sizes: ['S','M','L','XL'] },
  { id: 10, name: 'Crew Neck Sweater', brand: 'WarmKnit', category: 'clothing', price: 39.99, originalPrice: 55.00, discount: 27, rating: 4.4, reviews: 721, stock: 40, image: '🧶', description: 'Fine merino wool blend, ribbed cuffs and hem, relaxed fit. Soft, warm and itch-free.', tags: ['bestseller'], colors: ['#8B7355', '#6B7280', '#1A1A2E', '#FFFFFF'], sizes: ['S','M','L','XL','XXL'] },
  { id: 11, name: 'Canvas Sneakers', brand: 'StepUp', category: 'clothing', price: 54.99, originalPrice: 54.99, discount: 0, rating: 4.2, reviews: 1098, stock: 35, image: '👟', description: 'Vulcanized rubber sole, cushioned insole, durable canvas upper. Classic low-top silhouette for everyday wear.', tags: ['popular'], colors: ['#FFFFFF', '#1A1A2E', '#FF6B35'], sizes: ['6','7','8','9','10','11','12'] },
  { id: 12, name: 'Denim Baseball Cap', brand: 'HeadStyle', category: 'clothing', price: 22.99, originalPrice: 29.99, discount: 23, rating: 4.1, reviews: 334, stock: 80, image: '🧢', description: 'Structured 6-panel design, adjustable strap, UV-protective fabric. One size fits most.', tags: ['deal'], colors: ['#1A1A2E', '#8B7355', '#FF6B35'], sizes: ['One Size'] },

  // Home & Kitchen
  { id: 13, name: 'Air Fryer 5.5L', brand: 'CrispKing', category: 'home', price: 89.99, originalPrice: 119.99, discount: 25, rating: 4.7, reviews: 4521, stock: 12, image: '🍳', description: '1700W, digital touchscreen, 8 preset cooking modes, non-stick basket, dishwasher safe. Cook healthier with 80% less oil.', tags: ['bestseller', 'deal'], colors: ['#1A1A2E', '#FFFFFF'], sizes: [] },
  { id: 14, name: 'Bamboo Cutting Board Set', brand: 'EcoKitchen', category: 'home', price: 29.99, originalPrice: 39.99, discount: 25, rating: 4.5, reviews: 1203, stock: 50, image: '🪵', description: 'Set of 3 sizes, eco-friendly bamboo, juice groove edges, easy-grip handles. Naturally antibacterial.', tags: ['popular', 'new'], colors: [], sizes: [] },
  { id: 15, name: 'Stainless Steel Water Bottle', brand: 'HydroPlus', category: 'home', price: 24.99, originalPrice: 24.99, discount: 0, rating: 4.6, reviews: 2876, stock: 75, image: '🍶', description: 'Double-wall insulated, keeps cold 24hr/hot 12hr, leak-proof lid, BPA-free. 32oz capacity.', tags: ['bestseller'], colors: ['#C0C0C0', '#1A1A2E', '#FF6B35', '#00C9A7'], sizes: [] },
  { id: 16, name: 'LED Desk Lamp with USB Charger', brand: 'BrightDesk', category: 'home', price: 39.99, originalPrice: 54.99, discount: 27, rating: 4.4, reviews: 765, stock: 30, image: '💡', description: '3 color modes, 5 brightness levels, USB-A charging port, flexible goose-neck arm, memory function.', tags: ['deal'], colors: ['#FFFFFF', '#1A1A2E'], sizes: [] },

  // Sports
  { id: 17, name: 'Yoga Mat Non-Slip 6mm', brand: 'ZenFlex', category: 'sports', price: 34.99, originalPrice: 44.99, discount: 22, rating: 4.5, reviews: 2109, stock: 60, image: '🧘', description: 'Extra thick 6mm cushioning, eco-friendly TPE material, alignment lines, carrying strap included.', tags: ['bestseller', 'popular'], colors: ['#FF6B35', '#00C9A7', '#6B7280', '#1A1A2E'], sizes: [] },
  { id: 18, name: 'Resistance Bands Set (5 Pack)', brand: 'PowerBand', category: 'sports', price: 19.99, originalPrice: 27.99, discount: 29, rating: 4.3, reviews: 3402, stock: 90, image: '🏋️', description: '5 resistance levels (10–50 lbs), latex-free, includes carry bag and exercise guide. Full-body workout anywhere.', tags: ['deal', 'new'], colors: [], sizes: [] },
  { id: 19, name: 'Adjustable Dumbbell 20kg', brand: 'IronSet', category: 'sports', price: 119.99, originalPrice: 159.99, discount: 25, rating: 4.6, reviews: 876, stock: 8, image: '🏋', description: 'Replaces 9 dumbbells. Quick-adjust dial mechanism, weight range 2–20kg in 2kg increments. Space saving.', tags: ['popular'], colors: [], sizes: [] },
  { id: 20, name: 'Jump Rope Speed Cable', brand: 'SkipPro', category: 'sports', price: 14.99, originalPrice: 14.99, discount: 0, rating: 4.2, reviews: 1543, stock: 100, image: '🪃', description: 'Ball-bearing handles, adjustable length steel cable, anti-slip grips. For cardio, HIIT and boxing training.', tags: [], colors: ['#1A1A2E', '#FF6B35'], sizes: [] },

  // Books
  { id: 21, name: 'Atomic Habits', brand: 'James Clear', category: 'books', price: 14.99, originalPrice: 22.00, discount: 32, rating: 4.9, reviews: 87432, stock: 200, image: '📗', description: 'The #1 New York Times bestseller. Tiny changes, remarkable results. A proven framework for building good habits and breaking bad ones.', tags: ['bestseller', 'popular'], colors: [], sizes: [] },
  { id: 22, name: 'Deep Work', brand: 'Cal Newport', category: 'books', price: 12.99, originalPrice: 18.00, discount: 28, rating: 4.7, reviews: 34210, stock: 150, image: '📘', description: 'Rules for focused success in a distracted world. Learn to master the skill of deep concentration and produce elite work.', tags: ['popular'], colors: [], sizes: [] },
  { id: 23, name: 'The Psychology of Money', brand: 'Morgan Housel', category: 'books', price: 13.99, originalPrice: 19.99, discount: 30, rating: 4.8, reviews: 52109, stock: 175, image: '📙', description: 'Timeless lessons on wealth, greed, and happiness. 19 short stories exploring the strange ways people think about money.', tags: ['bestseller', 'new'], colors: [], sizes: [] },
  { id: 24, name: 'Ikigai: The Japanese Secret', brand: 'Héctor García', category: 'books', price: 11.99, originalPrice: 16.99, discount: 29, rating: 4.6, reviews: 21876, stock: 120, image: '📕', description: 'Discover your reason for being. The Japanese concept that can bring happiness and meaning to your everyday life.', tags: ['deal'], colors: [], sizes: [] },
];

export const DEMO_USERS = [
  { id: 1, name: 'Priya Sharma', email: 'priya@demo.com', password: 'demo123', role: 'user', avatar: 'PS', joined: '2023-06-15' },
  { id: 2, name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin', avatar: 'AD', joined: '2022-01-01' },
];

export const BANNERS = [
  { id: 1, title: 'Mega Sale', subtitle: 'Up to 50% off on Electronics', cta: 'Shop Electronics', category: 'electronics', color: '#1A1A2E', accent: '#FF6B35', emoji: '⚡' },
  { id: 2, title: 'New Arrivals', subtitle: 'Fresh styles for every season', cta: 'Browse Clothing', category: 'clothing', color: '#00C9A7', accent: '#FFFFFF', emoji: '✨' },
  { id: 3, title: 'Home Refresh', subtitle: 'Upgrade your living space today', cta: 'Shop Home', category: 'home', color: '#FF6B35', accent: '#FFFFFF', emoji: '🏠' },
];
