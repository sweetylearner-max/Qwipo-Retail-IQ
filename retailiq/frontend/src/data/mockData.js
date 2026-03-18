export const retailerProfile = {
  id: 'R1042',
  name: 'Ravi General Store',
  type: 'FMCG Retailer',
  location: 'Begum Bazaar, Hyderabad',
  pincode: '500012',
  monthlyRevenue: 142000,
  healthScore: 72,
  missedRevenue: 18400,
  joinedDate: '2022-03-15',
  topCategories: ['Snacks', 'Beverages', 'Personal Care'],
  avatar: 'RG'
}

export const recommendations = [
  {
    id: 1,
    name: "Lays Classic Salted 26g (Pack of 48)",
    brand: "PepsiCo",
    category: "Snacks",
    price: 624,
    mrp: 720,
    discount: 13,
    score: 97,
    reason: "High demand in Begum Bazaar this week",
    image: "🍟",
    trend: "+34%",
    moq: 2,
    inStock: true,
    tags: ["Trending", "Best Seller"]
  },
  {
    id: 2,
    name: "Parle-G Glucose Biscuits 800g (Pack of 24)",
    brand: "Parle",
    category: "Biscuits",
    price: 1152,
    mrp: 1320,
    discount: 12,
    score: 94,
    reason: "Retailers like you buy this every 2 weeks",
    image: "🍪",
    trend: "+12%",
    moq: 1,
    inStock: true,
    tags: ["Reorder Due", "High Margin"]
  },
  {
    id: 3,
    name: "Amul Taaza Toned Milk 500ml (Pack of 30)",
    brand: "Amul",
    category: "Dairy",
    price: 810,
    mrp: 900,
    discount: 10,
    score: 91,
    reason: "Top selling in your area — not in your cart",
    image: "🥛",
    trend: "+8%",
    moq: 1,
    inStock: true,
    tags: ["Missing Product", "Area Trend"]
  },
  {
    id: 4,
    name: "Maggi 2-Minute Noodles 70g (Pack of 48)",
    brand: "Nestle",
    category: "Instant Food",
    price: 1440,
    mrp: 1680,
    discount: 14,
    score: 89,
    reason: "Monsoon demand spike predicted",
    image: "🍜",
    trend: "+22%",
    moq: 2,
    inStock: true,
    tags: ["Seasonal", "AI Predicted"]
  },
  {
    id: 5,
    name: "Coca Cola 600ml (Pack of 24)",
    brand: "Coca Cola",
    category: "Beverages",
    price: 888,
    mrp: 1056,
    discount: 15,
    score: 86,
    reason: "Summer season alert — stock up now",
    image: "🥤",
    trend: "+45%",
    moq: 1,
    inStock: true,
    tags: ["Seasonal", "High Demand"]
  },
  {
    id: 6,
    name: "Colgate Strong Teeth 500g (Pack of 12)",
    brand: "Colgate",
    category: "Personal Care",
    price: 1080,
    mrp: 1260,
    discount: 14,
    score: 83,
    reason: "You ordered this 45 days ago — restock time",
    image: "🦷",
    trend: "+5%",
    moq: 1,
    inStock: true,
    tags: ["Reorder Due"]
  }
]

export const basketCompletion = {
  currentCart: [
    { name: "Britannia Good Day", qty: 2, price: 480 },
    { name: "Sunfeast Dark Fantasy", qty: 1, price: 420 },
    { name: "Haldiram Aloo Bhujia", qty: 3, price: 675 }
  ],
  suggestions: [
    { name: "Lay's Cream & Onion", reason: "Usually bought with snacks", confidence: 94, price: 624, image: "🍟" },
    { name: "Pepsi 600ml x24", reason: "Pairs with snack combos", confidence: 87, price: 888, image: "🥤" },
    { name: "Kurkure Masala Munch", reason: "Frequently bought together", confidence: 82, price: 396, image: "🌮" }
  ],
  savingsOnBundle: 234
}

export const opportunityScore = {
  current: 72,
  potential: 91,
  missedRevenue: 18400,
  gaps: [
    { category: "Dairy Products", gap: 6200, reason: "Not stocking Amul & Mother Dairy", priority: "high" },
    { category: "Packaged Water", gap: 4800, reason: "No water brands in inventory", priority: "high" },
    { category: "Noodles & Pasta", gap: 3900, reason: "Only 1 brand vs avg 3 in area", priority: "medium" },
    { category: "Chocolate & Candy", gap: 2100, reason: "Low variety — area demand is high", priority: "medium" },
    { category: "Health Drinks", gap: 1400, reason: "Growing segment in pincode", priority: "low" }
  ]
}

export const hyperlocalTrends = [
  { area: "Begum Bazaar", trend: "Beverages", change: "+45%", reason: "Summer heat wave", hot: true },
  { area: "Begum Bazaar", trend: "Ice Cream", change: "+67%", reason: "Trending this week", hot: true },
  { area: "Secunderabad", trend: "Dairy", change: "+18%", reason: "Festival season", hot: false },
  { area: "Koti", trend: "Snacks", change: "+34%", reason: "School reopening", hot: true },
  { area: "Abids", trend: "Stationery", change: "+28%", reason: "School supplies demand", hot: false }
]

export const purchaseHistory = [
  { month: "Aug", spent: 98000, items: 142, savings: 11200 },
  { month: "Sep", spent: 112000, items: 167, savings: 13400 },
  { month: "Oct", spent: 134000, items: 198, savings: 15800 },
  { month: "Nov", spent: 119000, items: 175, savings: 14100 },
  { month: "Dec", spent: 156000, items: 228, savings: 18700 },
  { month: "Jan", spent: 142000, items: 209, savings: 16900 }
]

export const topCategories = [
  { name: "Snacks", value: 32, color: "#6366f1" },
  { name: "Beverages", value: 24, color: "#8b5cf6" },
  { name: "Personal Care", value: 18, color: "#ec4899" },
  { name: "Dairy", value: 14, color: "#14b8a6" },
  { name: "Others", value: 12, color: "#f59e0b" }
]

export const nearbyRetailers = [
  { name: "Krishna Store", similarity: 94, area: "Begum Bazaar", topBuy: "Maggi Noodles" },
  { name: "Lakshmi Traders", similarity: 88, area: "Sultan Bazaar", topBuy: "Amul Milk" },
  { name: "Venkat General", similarity: 82, area: "Koti", topBuy: "Coca Cola" }
]
