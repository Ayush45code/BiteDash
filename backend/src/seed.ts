import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import { connectDb } from "./config/db.js";

const seedFood = async () => {
  try {
    await connectDb();
    
    // Clear existing food items
    await foodModel.deleteMany({});
    console.log("Cleared existing food items");

    // Seed food items
    const foodItems = [
      {
        name: "Greek Salad",
        description: "Fresh and healthy Greek salad with feta cheese, olives, and Mediterranean vegetables",
        price: 12,
        category: "Salad",
        image: "greek-salad.jpg"
      },
      {
        name: "Veg Salad",
        description: "Green vegetable salad with fresh seasonal vegetables and light dressing",
        price: 10,
        category: "Salad",
        image: "veg-salad.jpg"
      },
      {
        name: "Chicken Roll",
        description: "Spicy chicken roll with fresh vegetables and special sauce",
        price: 15,
        category: "Rolls",
        image: "chicken-roll.jpg"
      },
      {
        name: "Paneer Roll",
        description: "Soft paneer stuffed roll with Indian spices and herbs",
        price: 14,
        category: "Rolls",
        image: "paneer-roll.jpg"
      },
      {
        name: "Chocolate Ice Cream",
        description: "Rich chocolate dessert made with premium cocoa",
        price: 8,
        category: "Deserts",
        image: "chocolate-icecream.jpg"
      },
      {
        name: "Vanilla Ice Cream",
        description: "Classic vanilla flavor with real vanilla beans",
        price: 7,
        category: "Deserts",
        image: "vanilla-icecream.jpg"
      },
      {
        name: "Veg Thali",
        description: "Complete vegetarian meal with dal, sabzi, roti, and rice",
        price: 20,
        category: "Vegetarian",
        image: "veg-thali.jpg"
      },
      {
        name: "Paneer Butter Masala",
        description: "Creamy paneer curry in rich tomato-based gravy",
        price: 22,
        category: "Vegetarian",
        image: "paneer-butter-masala.jpg"
      },
      {
        name: "Chocolate Cake",
        description: "Soft chocolate cake with layers of chocolate ganache",
        price: 25,
        category: "Cake",
        image: "chocolate-cake.jpg"
      },
      {
        name: "Strawberry Cake",
        description: "Fresh strawberry cake with whipped cream frosting",
        price: 24,
        category: "Cake",
        image: "strawberry-cake.jpg"
      },
      {
        name: "Grilled Sandwich",
        description: "Crispy grilled sandwich with vegetables and cheese",
        price: 12,
        category: "Sandwich",
        image: "grilled-sandwich.jpg"
      },
      {
        name: "Veg Sandwich",
        description: "Healthy veg sandwich with fresh vegetables and herbs",
        price: 10,
        category: "Sandwich",
        image: "veg-sandwich.jpg"
      },
      {
        name: "Hakka Noodles",
        description: "Spicy Chinese noodles with vegetables and soy sauce",
        price: 18,
        category: "Noodles",
        image: "hakka-noodles.jpg"
      },
      {
        name: "Veg Noodles",
        description: "Stir-fried noodles with mixed vegetables",
        price: 16,
        category: "Noodles",
        image: "veg-noodles.jpg"
      },
      {
        name: "White Sauce Pasta",
        description: "Creamy white sauce pasta with herbs and parmesan",
        price: 19,
        category: "Pasta",
        image: "white-sauce-pasta.jpg"
      },
      {
        name: "Red Sauce Pasta",
        description: "Tangy red sauce pasta with fresh basil",
        price: 18,
        category: "Pasta",
        image: "red-sauce-pasta.jpg"
      },
      {
        name: "Fruit Salad",
        description: "Mixed fresh fruits with honey dressing",
        price: 11,
        category: "Salad",
        image: "fruit-salad.jpg"
      },
      {
        name: "Spring Roll",
        description: "Crispy veg spring roll with sweet and sour sauce",
        price: 13,
        category: "Rolls",
        image: "spring-roll.jpg"
      },
      {
        name: "Brownie Dessert",
        description: "Chocolate brownie with walnuts and fudge",
        price: 9,
        category: "Deserts",
        image: "brownie.jpg"
      },
      {
        name: "Mushroom Curry",
        description: "Spicy mushroom curry with Indian spices",
        price: 21,
        category: "Vegetarian",
        image: "mushroom-curry.jpg"
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
