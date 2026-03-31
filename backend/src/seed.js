import mongoose from "mongoose";
import foodModel from "../dist/models/foodModel.js";
import { connectDb } from "../dist/config/db.js";

const seedFood = async () => {
  try {
    await connectDb();
    
    
    await foodModel.deleteMany({});
    console.log("Cleared existing food items");

    
    const foodItems = [
      {
        name: "Greek Salad",
        description: "Fresh and healthy Greek salad with feta cheese, olives, and Mediterranean vegetables",
        price: 12,
        category: "Salad",
        image: "salad.jpg"
      },
      {
        name: "Veg Salad",
        description: "Green vegetable salad with fresh seasonal vegetables and light dressing",
        price: 10,
        category: "Salad",
        image: "food_1.jpg"
      },
      {
        name: "Fruit Salad",
        description: "Mixed fresh fruits with honey dressing",
        price: 11,
        category: "Salad",
        image: "food_2.jpg"
      },
      {
        name: "Chicken Roll",
        description: "Spicy chicken roll with fresh vegetables and special sauce",
        price: 15,
        category: "Rolls",
        image: "rolls.jpg"
      },
      {
        name: "Paneer Roll",
        description: "Soft paneer stuffed roll with Indian spices and herbs",
        price: 14,
        category: "Rolls",
        image: "food_3.jpg"
      },
      {
        name: "Spring Roll",
        description: "Crispy veg spring roll with sweet and sour sauce",
        price: 13,
        category: "Rolls",
        image: "food_4.webp"
      },
      {
        name: "Chocolate Ice Cream",
        description: "Rich chocolate dessert made with premium cocoa",
        price: 8,
        category: "Deserts",
        image: "desert.webp"
      },
      {
        name: "Vanilla Ice Cream",
        description: "Classic vanilla flavor with real vanilla beans",
        price: 7,
        category: "Deserts",
        image: "food_5.webp"
      },
      {
        name: "Brownie Dessert",
        description: "Chocolate brownie with walnuts and fudge",
        price: 9,
        category: "Deserts",
        image: "food_6.jpg"
      },
      {
        name: "Veg Thali",
        description: "Complete vegetarian meal with dal, sabzi, roti, and rice",
        price: 20,
        category: "Vegetarian",
        image: "Veg.jpg"
      },
      {
        name: "Paneer Butter Masala",
        description: "Creamy paneer curry in rich tomato-based gravy",
        price: 22,
        category: "Vegetarian",
        image: "food_7.jpg"
      },
      {
        name: "Mushroom Curry",
        description: "Spicy mushroom curry with Indian spices",
        price: 21,
        category: "Vegetarian",
        image: "food_8.jpg"
      },
      {
        name: "Chocolate Cake",
        description: "Soft chocolate cake with layers of chocolate ganache",
        price: 25,
        category: "Cake",
        image: "cake.jpg"
      },
      {
        name: "Strawberry Cake",
        description: "Fresh strawberry cake with whipped cream frosting",
        price: 24,
        category: "Cake",
        image: "food_9.webp"
      },
      {
        name: "Grilled Sandwich",
        description: "Crispy grilled sandwich with vegetables and cheese",
        price: 12,
        category: "Sandwich",
        image: "sandwitch.jpg"
      },
      {
        name: "Veg Sandwich",
        description: "Healthy veg sandwich with fresh vegetables and herbs",
        price: 10,
        category: "Sandwich",
        image: "food_10.webp"
      },
      {
        name: "Hakka Noodles",
        description: "Spicy Chinese noodles with vegetables and soy sauce",
        price: 18,
        category: "Noodles",
        image: "noodles.jpg"
      },
      {
        name: "Veg Noodles",
        description: "Stir-fried noodles with mixed vegetables",
        price: 16,
        category: "Noodles",
        image: "food_11.jpg"
      },
      {
        name: "White Sauce Pasta",
        description: "Creamy white sauce pasta with herbs and parmesan",
        price: 19,
        category: "Pasta",
        image: "pasta.jpg"
      },
      {
        name: "Red Sauce Pasta",
        description: "Tangy red sauce pasta with fresh basil",
        price: 18,
        category: "Pasta",
        image: "food_12.jpg"
      }
    ];

    await foodModel.insertMany(foodItems);
    console.log("Successfully seeded food items");
    
    await mongoose.connection.close();
    console.log("Database connection closed");
    
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedFood();
