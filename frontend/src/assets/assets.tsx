
import cake from "./cake.jpg";
import desert from "./desert.webp";
import noodles from "./noodles.jpg";
import pasta from "./pasta.jpg";

import rolls from "./rolls.jpg";
import salad from "./salad.jpg";
import sandwitch from "./sandwitch.jpg";
import veg from "./Veg.jpg";


import food_1 from './food_1.jpg'
import food_2 from './food_2.jpg'
import food_3 from './food_3.jpg'
import food_4 from './food_4.webp'
import food_5 from './food_5.webp'
import food_6 from './food_6.jpg'
import food_7 from './food_7.jpg'
import food_8 from './food_8.jpg'
import food_9 from './food_9.webp'
import food_10 from './food_10.webp'
import food_11 from './food_11.jpg'
import food_12 from './food_12.jpg'
import food_13 from './food_13.jpg'
import food_14 from './food_14.jpg'
import food_15 from './food_15.jpg'
import food_16 from './food_16.webp'
import food_17 from './food_17.jpg'
import food_18 from './food_18.jpg'
import food_19 from './food_19.jpeg'
import food_20 from './food_20.webp'

export const menu_list = [
  {
    menu_name: "Salad",
    menu_image: salad,
  },
  {
    menu_name: "Rolls",
    menu_image: rolls,
  },
  {
    menu_name: "Deserts",
    menu_image: desert,
  },
  {
    menu_name: "Vegetarian",
    menu_image: veg,
  },
  {
    menu_name:"Cake",
    menu_image:cake

  },
  {
    menu_image:sandwitch,
    menu_name:"Sandwitch"

  },

  {
    menu_image:noodles,
    menu_name:"Noodles"

  },
  {
    menu_image:pasta,
    menu_name:"Pasta"

  }
];

export type FoodItem ={
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
};



export const food_list:FoodItem[] = [
  {
    _id: "1",
    name: "Greek Salad",
    image: food_1,
    price: 12,
    description: "Fresh and healthy Greek salad",
    category: "Salad"
  },
  {
    _id: "2",
    name: "Veg Salad",
    image: food_2,
    price: 10,
    description: "Green vegetable salad",
    category: "Salad"
  },
  {
    _id: "3",
    name: "Chicken Roll",
    image: food_3,
    price: 15,
    description: "Spicy chicken roll",
    category: "Rolls"
  },
  {
    _id: "4",
    name: "Paneer Roll",
    image: food_4,
    price: 14,
    description: "Soft paneer stuffed roll",
    category: "Rolls"
  },
  {
    _id: "5",
    name: "Chocolate Ice Cream",
    image: food_5,
    price: 8,
    description: "Rich chocolate dessert",
    category: "Deserts"
  },
  {
    _id: "6",
    name: "Vanilla Ice Cream",
    image: food_6,
    price: 7,
    description: "Classic vanilla flavor",
    category: "Deserts"
  },
  {
    _id: "7",
    name: "Veg Thali",
    image: food_7,
    price: 20,
    description: "Complete vegetarian meal",
    category: "Vegetarian"
  },
  {
    _id: "8",
    name: "Paneer Butter Masala",
    image: food_8,
    price: 22,
    description: "Creamy paneer curry",
    category: "Vegetarian"
  },
  {
    _id: "9",
    name: "Chocolate Cake",
    image: food_9,
    price: 25,
    description: "Soft chocolate cake",
    category: "Cake"
  },
  {
    _id: "10",
    name: "Strawberry Cake",
    image: food_10,
    price: 24,
    description: "Fresh strawberry cake",
    category: "Cake"
  },
  {
    _id: "11",
    name: "Grilled Sandwitch",
    image: food_11,
    price: 12,
    description: "Crispy grilled sandwich",
    category: "Sandwitch"
  },
  {
    _id: "12",
    name: "Veg Sandwitch",
    image: food_12,
    price: 10,
    description: "Healthy veg sandwich",
    category: "Sandwitch"
  },
  {
    _id: "13",
    name: "Hakka Noodles",
    image: food_13,
    price: 18,
    description: "Spicy Chinese noodles",
    category: "Noodles"
  },
  {
    _id: "14",
    name: "Veg Noodles",
    image: food_14,
    price: 16,
    description: "Vegetable noodles",
    category: "Noodles"
  },
  {
    _id: "15",
    name: "White Sauce Pasta",
    image: food_15,
    price: 19,
    description: "Creamy white sauce pasta",
    category: "Pasta"
  },
  {
    _id: "16",
    name: "Red Sauce Pasta",
    image: food_16,
    price: 18,
    description: "Tangy red sauce pasta",
    category: "Pasta"
  },
  {
    _id: "17",
    name: "Fruit Salad",
    image: food_17,
    price: 11,
    description: "Mixed fresh fruits",
    category: "Salad"
  },
  {
    _id: "18",
    name: "Spring Roll",
    image: food_18,
    price: 13,
    description: "Crispy veg spring roll",
    category: "Rolls"
  },
  {
    _id: "19",
    name: "Brownie Dessert",
    image: food_19,
    price: 9,
    description: "Chocolate brownie",
    category: "Deserts"
  },
  {
    _id: "20",
    name: "Mushroom Curry",
    image: food_20,
    price: 21,
    description: "Spicy mushroom curry",
    category: "Vegetarian"
  }
]; 
