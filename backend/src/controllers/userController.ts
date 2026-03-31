import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User with this email already exists" 
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill all fields" 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 6 characters long" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: "Account created successfully" 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide email and password" 
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ 
            success: true, 
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export { registerUser, loginUser };
