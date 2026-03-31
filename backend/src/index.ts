import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import type{ Request,Response } from "express"
import { foodRouter } from "./routes/foodRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"

const app=express()

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

app.listen(3000,()=>{
    console.log( "server listening at 3000!")
   
})