import mongoose from "mongoose"

export const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connect database successfully")
    } catch (error) {
        console.log(error)
        console.log("Connect database failed")
    }
}