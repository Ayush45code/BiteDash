import express from "express";

import { addFood, FoodRemove, listFood } from "../controllers/foodcontroller.js";

import multer from "multer";

export const foodRouter= express.Router();

const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})

const upload=multer({storage:storage})




foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get("/list",listFood);

foodRouter.post("/remove",FoodRemove);