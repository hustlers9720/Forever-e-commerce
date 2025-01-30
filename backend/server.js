import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json())
connectdb()
connectCloudinary()

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('api working')

})

app.listen(3000, (req, res) => {
    console.log("Server is running");

})