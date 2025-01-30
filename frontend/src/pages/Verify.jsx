import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext);

    // Correctly destructuring useSearchParams
    const [searchParams] = useSearchParams();

    // Correctly accessing query parameters
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    console.log(success, orderId);

    const verifyPayment = async () => {
        try {
            if (!token) {
                return;
            }

            const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, { success, orderId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setCartItem({});
                navigate('/orders');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            verifyPayment();
        }
    }, [token]); // Run only when token is available

    return <div>Verifying payment...</div>;
};

export default Verify;
