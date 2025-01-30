import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext()
import axios from 'axios'

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [apiproducts, setApiProducts] = useState([])

    // console.log(products);

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Selected Product Size');
            return;
        }
        let cartData = structuredClone(cartItem)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItem(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                console.log(error);
                toast.error(error.message)


            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {

                }
            }
        }

        return totalCount
    }

    // useEffect(() => {
    //     addToCart()
    // }, [cartItem])

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);

        cartData[itemId][size] = quantity;
        setCartItem(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItem) {
            let itemInfo = apiproducts.find((product) => product._id === items)
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }


    const getProductData = async () => {


        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setApiProducts(response.data.products)


            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }

    }
    // console.log(apiproducts);



    // fn for the refresh cartData not gone everywhere 
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get', 
                {}, 
                { headers: { 
                    Authorization: `Bearer ${token}` 
                } }
            );
    
            if (response.data.success) {
                setCartItem(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) { 
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])


    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItem, setCartItem, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, apiproducts,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;