import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/users.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await Admin.findOne({
            email: process.env.EMAIL
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);

        const admin = await Admin.create({
            name: process.env.NAME,
            email: process.env.EMAIL,
            password: hashedPassword
        });

        console.log("Admin created successfully:", admin.email);

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();