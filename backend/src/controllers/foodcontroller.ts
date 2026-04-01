import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';
import type{ Request,Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
});

export const addFood = async (req:Request,res:Response)=>{
    try {
        const {description,price,category,name}=req.body;
        
        if (!req.file) {
            return res.json({success:false,message:"No image uploaded"});
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'bitedash'
        });

        await foodModel.create({
            description,
            price:Number(price),
            category,
            image:result.secure_url,
            name
        });

        res.json({
            success:true,message:"Food Added"
        });
    } catch(error){
        res.json({success:false,message:"Error"});
    }
}


export const listFood=async(req:Request,res:Response)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods}) 
          
    }catch(error){
        console.log("error");
        res.json(
            {success:false,message:"error!"}

        )

    }

}

export const FoodRemove=async(req:Request,res:Response)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Delete from Cloudinary if URL contains cloudinary
        if (food.image.includes('cloudinary')) {
            const publicId = food.image.split('/').pop()?.split('.')[0];
            if (publicId) {
                await cloudinary.uploader.destroy(`bitedash/${publicId}`);
            }
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food Removed"});
    } catch(error){
        res.json({success:false,message:"Error"});
    }
}