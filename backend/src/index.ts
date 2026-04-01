import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import type{ Request,Response } from "express"
import { foodRouter } from "./routes/foodRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"

dotenv.config();

const app=express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

connectDb();

app.use("/api/food",foodRouter)

app.use("/api/order",orderRouter)

app.use("/api/user",userRouter)

app.use("/images",express.static('uploads'))

app.get("/",(req:Request,res:Response)=>{
    res.send("hey");
})

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}!`)
})