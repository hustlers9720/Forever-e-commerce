import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify'

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);

    const [sizes, setSizes] = useState([]);

    const handleSizeClick = (size) => {
        setSizes((prev) =>
            prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform your form submission logic here
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)


            const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } });
            if (response.data) {
                toast.success({ success: true, message: 'Product added' })
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('');
            }
            else {
                toast.error(response.data.message);
            }
            console.log(response.data);

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
        >
            {/* Upload Image Section */}
            <div className="w-full">
                <p className="mb-4 text-lg font-semibold text-gray-700">Upload Image</p>
                <div className="flex flex-wrap gap-4">
                    {[image1, image2, image3, image4].map((image, index) => (
                        <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
                            <img
                                className="w-20 h-20 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-all"
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt={`Upload area ${index + 1}`}
                            />
                            <input
                                onChange={(e) => {
                                    const setters = [setImage1, setImage2, setImage3, setImage4];
                                    setters[index](e.target.files[0]);
                                }}
                                type="file"
                                id={`image${index + 1}`}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Name Section */}
            <div className="w-full">
                <p className="mb-2 text-lg font-semibold text-gray-700">Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type="text"
                    placeholder="Type Here"
                    required
                />
            </div>

            {/* Product Description Section */}
            <div className="w-full">
                <p className="mb-2 text-lg font-semibold text-gray-700">Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={4}
                    placeholder="Write Content Here"
                    required
                />
            </div>

            {/* Product Details Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Category */}
                <div>
                    <p className="mb-2 text-lg font-semibold text-gray-700">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                {/* Sub Category */}
                <div>
                    <p className="mb-2 text-lg font-semibold text-gray-700">Sub Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                {/* Product Price */}
                <div>
                    <p className="mb-2 text-lg font-semibold text-gray-700">Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        type="number"
                        placeholder="25"
                    />
                </div>
            </div>

            {/* Product Sizes Section */}
            <div className="w-full">
                <p className="mb-2 text-lg font-semibold text-gray-700">Product Sizes</p>
                <div className="flex flex-wrap gap-4">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div
                            key={size}
                            onClick={() => handleSizeClick(size)}
                            className={`flex items-center justify-center w-12 h-12 border ${sizes.includes(size)
                                ? 'border-pink-500 bg-pink-100'
                                : 'border-gray-300 hover:border-gray-400'
                                } rounded-lg transition-all cursor-pointer`}
                        >
                            <p className="text-gray-700">{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Seller Checkbox */}
            <div className="w-full flex items-center gap-2">
                <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={(e) => setBestseller(prev => !prev)}
                    className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-blue-500"
                />
                <label htmlFor="bestseller" className="text-gray-700">
                    Add to best seller
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
            >
                Add Product
            </button>
        </form>
    );
};

export default Add;
