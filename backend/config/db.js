import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB connected : ${conn.connection.host}`);
    }catch(e){
        console.log(`Error : ${e.message}`);
        process.exit(1);
    }
}