export const LOCATIONS = [
  { id: 'tech-hub', name: '4th Floor • Engineering Hub', code: 'VM-408', status: 'Online & Restocked' },
  { id: 'lobby', name: 'Ground Floor • Main Atrium', code: 'VM-101', status: 'Online' },
  { id: 'wellness', name: 'Basement • Gym & Wellness Suite', code: 'VM-004', status: 'High Traffic' },
  { id: 'design-studio', name: '3rd Floor • Design & Creative Lab', code: 'VM-302', status: 'Online' },
];

export const FREQUENCIES = [
  { id: 'daily', label: 'Daily Habit', sub: '1-2 times everyday' },
  { id: 'weekly', label: 'Frequent Guest', sub: '2-3 times a week' },
  { id: 'occasional', label: 'Occasional Pick', sub: 'Once a week or less' },
  { id: 'first_time', label: 'First Visit', sub: 'Just stopped by today' },
];

export const WISHLIST_PRESETS = [
  { id: 'cold-brew', name: 'Nitro Cold Brew (Black)', category: 'Coffee & Energy', votes: 142, icon: '☕' },
  { id: 'oat-latte', name: 'Oat Milk Vanilla Latte', category: 'Coffee & Energy', votes: 98, icon: '🥛' },
  { id: 'kombucha', name: 'Raw Ginger Lemon Kombucha', category: 'Wellness & Teas', votes: 114, icon: '🫧' },
  { id: 'coconut-water', name: 'Pure King Coconut Water', category: 'Hydration', votes: 87, icon: '🥥' },
  { id: 'protein-crisps', name: 'Whey Protein Crisps (20g)', category: 'High Protein', votes: 164, icon: '💪' },
  { id: 'dark-chocolate', name: '72% Single-Origin Sea Salt Bar', category: 'Gourmet Snacks', votes: 129, icon: '🍫' },
  { id: 'truffle-chips', name: 'Black Truffle Artisan Chips', category: 'Gourmet Snacks', votes: 76, icon: '🥔' },
  { id: 'matcha-latte', name: 'Ceremonial Matcha Can', category: 'Wellness & Teas', votes: 105, icon: '🍵' },
  { id: 'chia-pudding', name: 'Coconut Mango Chia Cup', category: 'Fresh & Healthy', votes: 62, icon: '🥭' },
  { id: 'trail-mix', name: 'Raw Almond & Goji Berry Mix', category: 'Fresh & Healthy', votes: 83, icon: '🥜' },
  { id: 'sparkling-water', name: 'Lime San Pellegrino / Perrier', category: 'Hydration', votes: 91, icon: '✨' },
  { id: 'celsius-energy', name: 'Zero Sugar Green Tea Energy', category: 'Coffee & Energy', votes: 153, icon: '⚡' },
];

export const CATEGORIES = [
  'All Items',
  'Coffee & Energy',
  'High Protein',
  'Wellness & Teas',
  'Gourmet Snacks',
  'Fresh & Healthy',
  'Hydration',
];

export const RATING_LEVELS = [
  { value: 1, label: 'Needs Improvement', hint: 'Disappointing experience or broken flow', emoji: '😞' },
  { value: 2, label: 'Subpar', hint: 'Could have been much better', emoji: '😕' },
  { value: 3, label: 'Standard & Reliable', hint: 'Met baseline expectations', emoji: '🙂' },
  { value: 4, label: 'Very Impressed', hint: 'Fast, fresh, and smooth', emoji: '✨' },
  { value: 5, label: 'World-Class', hint: 'Flawless automated retail experience', emoji: '🌟' },
];

export const ISSUE_CATEGORIES = [
  { id: 'stuck_item', label: 'Item stuck in coil / did not drop', icon: 'Box' },
  { id: 'payment_failed', label: 'Card / Apple Pay / UPI declined or double charged', icon: 'CreditCard' },
  { id: 'empty_slot', label: 'Selected item was out of stock or wrong product delivered', icon: 'AlertTriangle' },
  { id: 'temp_issue', label: 'Beverage was warm / temperature not cold', icon: 'Thermometer' },
  { id: 'screen_unresponsive', label: 'Touchscreen frozen or barcode scanner failed', icon: 'Smartphone' },
  { id: 'receipt_change', label: 'Digital receipt or refund not received', icon: 'Receipt' },
];

