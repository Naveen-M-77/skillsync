import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MONGODB CONNECTED");
    } catch (err) {
        console.log("❌ MONGODB CONNECTION FAILED", err.message);
    }
}

export default connectDB;