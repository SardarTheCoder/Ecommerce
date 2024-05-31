import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        
        // await mongoose.connect(process.env.MONGO_URI)
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
         console.log("sucessfully connected to mongoo")
    } catch (error) {
        
        console.log(`Error:  ${error.message}`)
        process.exit(1)

    }
};
export default connectDB;