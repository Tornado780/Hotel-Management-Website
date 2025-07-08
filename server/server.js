import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhook.js';

connectDB();
const app= express();
const PORT=process.env.PORT || 5000;
app.use(cors());


app.use(express.json());
app.use(clerkMiddleware())

// API to listen webhooks
app.use("/api/clerk",clerkWebhooks);

app.get("/", (req, res) => {
    res.send("Hello from server");
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
