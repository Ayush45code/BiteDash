export type FoodItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

export type Order = {
  _id: string;
  items: FoodItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  createdAt: string;
};

// Mock food data
export const food_list: FoodItem[] = [
  {
    _id: "1",
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
    price: 12,
    description: "Fresh and healthy Greek salad",
    category: "Salad"
  },
  {
    _id: "2",
    name: "Veg Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
    price: 10,
    description: "Green vegetable salad",
    category: "Salad"
  },
  {
    _id: "3",
    name: "Chicken Roll",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300",
    price: 15,
    description: "Spicy chicken roll",
    category: "Rolls"
  },
  {
    _id: "4",
    name: "Paneer Roll",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300",
    price: 14,
    description: "Soft paneer stuffed roll",
    category: "Rolls"
  },
  {
    _id: "5",
    name: "Chocolate Ice Cream",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07a?w=300",
    price: 8,
    description: "Rich chocolate dessert",
    category: "Deserts"
  },
  {
    _id: "6",
    name: "Vanilla Ice Cream",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07a?w=300",
    price: 7,
    description: "Classic vanilla flavor",
    category: "Deserts"
  },
  {
    _id: "7",
    name: "Veg Thali",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300",
    price: 20,
    description: "Complete vegetarian meal",
    category: "Vegetarian"
  },
  {
    _id: "8",
    name: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300",
    price: 22,
    description: "Creamy paneer curry",
    category: "Vegetarian"
  },
  {
    _id: "9",
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
    price: 25,
    description: "Soft chocolate cake",
    category: "Cake"
  },
  {
    _id: "10",
    name: "Strawberry Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
    price: 24,
    description: "Fresh strawberry cake",
    category: "Cake"
  },
  {
    _id: "11",
    name: "Grilled Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd944ab3?w=300",
    price: 12,
    description: "Crispy grilled sandwich",
    category: "Sandwich"
  },
  {
    _id: "12",
    name: "Veg Sandwich",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd944ab3?w=300",
    price: 10,
    description: "Healthy veg sandwich",
    category: "Sandwich"
  },
  {
    _id: "13",
    name: "Hakka Noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
    price: 18,
    description: "Spicy Chinese noodles",
    category: "Noodles"
  },
  {
    _id: "14",
    name: "Veg Noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
    price: 16,
    description: "Vegetable noodles",
    category: "Noodles"
  },
  {
    _id: "15",
    name: "White Sauce Pasta",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300",
    price: 19,
    description: "Creamy white sauce pasta",
    category: "Pasta"
  },
  {
    _id: "16",
    name: "Red Sauce Pasta",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300",
    price: 18,
    description: "Tangy red sauce pasta",
    category: "Pasta"
  },
  {
    _id: "17",
    name: "Fruit Salad",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300",
    price: 11,
    description: "Mixed fresh fruits",
    category: "Salad"
  },
  {
    _id: "18",
    name: "Spring Roll",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=300",
    price: 13,
    description: "Crispy veg spring roll",
    category: "Rolls"
  },
  {
    _id: "19",
    name: "Brownie Dessert",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e428c73?w=300",
    price: 9,
    description: "Chocolate brownie",
    category: "Deserts"
  },
  {
    _id: "20",
    name: "Mushroom Curry",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300",
    price: 21,
    description: "Spicy mushroom curry",
    category: "Vegetarian"
  }
];

// Mock orders data
export const orders_list: Order[] = [
  {
    _id: "1",
    items: [food_list[0], food_list[3], food_list[5]],
    totalAmount: 35,
    status: "pending",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    createdAt: "2026-03-31T10:30:00Z"
  },
  {
    _id: "2",
    items: [food_list[1], food_list[7]],
    totalAmount: 32,
    status: "processing",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    createdAt: "2026-03-31T11:15:00Z"
  },
  {
    _id: "3",
    items: [food_list[2], food_list[9]],
    totalAmount: 39,
    status: "completed",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    createdAt: "2026-03-31T09:45:00Z"
  },
  {
    _id: "4",
    items: [food_list[4], food_list[6], food_list[8]],
    totalAmount: 53,
    status: "cancelled",
    customerName: "Alice Brown",
    customerEmail: "alice@example.com",
    createdAt: "2026-03-31T08:20:00Z"
  }
];
