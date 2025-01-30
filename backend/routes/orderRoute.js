import express from 'express'

import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// admin featurs
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment feature
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/list', adminAuth, placeOrderRazorpay)

// user  feature 
orderRouter.post('/userorders', authUser, userOrders)

// verify stripe route
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// verufy razorpay
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter