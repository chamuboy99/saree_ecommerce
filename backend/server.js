import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

import sareeRoutes from './routes/sareeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

app.use('/api/sarees', sareeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/order', orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected!');  
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

const port = process.env.PORT ?? 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, ()=> {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log('Server failed to start:', error.message);
        process.exit(1);
    }
}

start();