import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen border-r bg-gray-50">
            {/* Sidebar Container */}
            <div className="flex flex-col gap-4 pt-6 pl-6 text-sm">
                {/* Navigation Links */}
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                        }`
                    }
                    to={'/add'}
                >
                    <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
                    <p className="hidden md:block">Add Items</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                        }`
                    }
                    to={'/list'}
                >
                    <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
                    <p className="hidden md:block">List Items</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                        }`
                    }
                    to={'/orders'}
                >
                    <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
                    <p className="hidden md:block">Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
