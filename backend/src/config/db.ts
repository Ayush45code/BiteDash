import mongoose from "mongoose";

export const connectDb = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Ayush:hell@cluster0.ykge3xu.mongodb.net/DashBite';
    await mongoose.connect(mongoUri).then(() => {
        console.log("db connected");
    });
}