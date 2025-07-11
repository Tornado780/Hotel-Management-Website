import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
        try{
            mongoose.connection.on("connected", () => {
                console.log("Connected to MongoDB"); 
            })
            await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
            
        }catch(error){
            console.log(error);
        }
}

export default connectDB