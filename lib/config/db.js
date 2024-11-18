import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
export const ConnectDB = async ()=>{
    
 await mongoose.connect(
   `mongodb+srv://loariftech:${process.env.MONGODB_PASSWORD}@cluster0.iad10.mongodb.net/todo-app`)
    console.log('DB Connected')

}