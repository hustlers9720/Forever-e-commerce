import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItem, setCartItem, getCartAmount, delivery_fee, apiproducts } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const initPay = (order) => {
        console.log(order);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItem({})
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error);
                }

            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandeler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = []

            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(apiproducts.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quatity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {

                // api call for cod
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (response.data.success) {
                        setCartItem({})
                        navigate('/orders')
                    }
                    else {
                        toast.error(response.data.message)

                    }
                    break;
                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    }
                    else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    console.log(responseRazorpay);

                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order);

                    }
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    return (
        <form onSubmit={onSubmitHandeler} className="flex flex-col lg:flex-row justify-between gap-6 pt-5 lg:pt-14 min-h-[80vh] border-t">
            {/* Delivery Information */}
            <div className="flex flex-col gap-6 w-full lg:max-w-[480px] px-4 lg:px-8">
                <div className="text-xl lg:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        type="text"
                        placeholder="First Name"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        type="text"
                        placeholder="Last Name"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="Enter Your Email"
                    className="border border-gray-300 rounded py-2 px-3 w-full"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    type="text"
                    placeholder="Street"
                    className="border border-gray-300 rounded py-2 px-3 w-full"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        type="text"
                        placeholder="State"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        type="number"
                        placeholder="Zipcode"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        type="text"
                        placeholder="Country"
                        className="border border-gray-300 rounded py-2 px-3 w-full"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    type="number"
                    placeholder="Phone"
                    className="border border-gray-300 rounded py-2 px-3 w-full"
                />
            </div>

            {/* Cart Total and Payment Method */}
            <div className="flex flex-col w-full lg:max-w-[480px] px-4 lg:px-8">
                <CartTotal />

                {/* Payment Method */}
                <div className="text-xl lg:text-2xl mt-10 mb-3">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row mt-4 items-center justify-center">
                    <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-4 px-8 cursor-pointer rounded-lg">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-900' : ''}`}></p>
                        <img src={assets.stripe_logo} className="h-5 w-auto" alt="Stripe Logo" />
                    </div>
                    <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-4 px-8 cursor-pointer rounded-lg">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-900' : ''}`}></p>
                        <img src={assets.razorpay_logo} className="h-5 w-auto" alt="Razorpay Logo" />
                    </div>
                    <div onClick={() => setMethod('cod')} className="flex items-center gap-2 border p-2 px-4 cursor-pointer rounded-lg">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-900' : ''}`}></p>
                        <p className="text-gray-700 text-xs font-medium">Cash on Delivery</p>
                    </div>
                </div>

                <div className="w-full text-end mt-8">
                    <button type='submit' className="bg-black text-white px-16 py-3 text-sm">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
