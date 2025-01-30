import express from "express";
import { logInUser, registerUser, adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', logInUser)
userRouter.post('/admin', adminLogin)

export default userRouter