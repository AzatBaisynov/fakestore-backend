import express from 'express'
import mongoose from "mongoose"
import authRouter from "./router/authRouter.js"
import cors from 'cors'
import productRouter from "./router/productRouter.js";

const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/product", productRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://user:a123456789A@cluster0.ggqgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log("APP STARTED"))
    } catch (e) {
        console.log(e)
    }
}


start()