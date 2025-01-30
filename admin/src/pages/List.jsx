import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            }
            else {
                toast.error(response.data.message)

            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="p-4">
            {/* Heading */}
            <p className="text-lg font-semibold mb-4">All Products List</p>

            {/* Table Container */}
            <div className="overflow-x-auto">
                {/* Table Title (Visible on Medium and Larger Screens) */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 text-sm font-medium rounded-t-lg">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span className="text-center">Action</span>
                </div>

                {/* Product List */}
                <div className="flex flex-col gap-2">
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Product Image */}
                            <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                            />

                            {/* Product Name */}
                            <p className="text-sm font-medium">{item.name}</p>

                            {/* Product Category */}
                            <p className="text-sm text-gray-600">{item.category}</p>

                            {/* Product Price */}
                            <p className="text-sm font-semibold">
                                {currency}
                                {item.price}
                            </p>

                            {/* Action Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => removeProduct(item._id)}
                                    className="text-gray-500 hover:text-gray-700 transition-all duration-200 transform hover:scale-110 hover:rotate-12 cursor-pointer"
                                >
                                    X
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default List;