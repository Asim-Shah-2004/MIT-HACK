import mongoose from "mongoose"
import "dotenv/config"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('connected to database successfully')
    } catch (err) {
        console.error(err)
    }
}

export default connectDB