import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center justify-between py-4 px-6 shadow-md bg-white'>
            {/* Logo */}
            <img
                className='w-[120px] h-auto ml-2'
                src={assets.logo}
                alt="Logo"
            />

            {/* Logout Button */}
            <button onClick={() => setToken('')} className='bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:bg-gray-800 transition-all duration-300'>
                Logout
            </button>
        </div>
    );
};

export default Navbar;
