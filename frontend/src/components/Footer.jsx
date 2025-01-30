import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="Company Logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        At the heart of everything we do lies a passion for excellence. We strive to deliver products and services that inspire trust, convenience, and quality, empowering our customers to embrace the best.
                    </p>
                </div>

                <div className='flex justify-center items-center'>
                    <div className='text-center'>
                        <p className='text-xl font-medium mb-5'>COMPANY</p>
                        <ul className='flex flex-col gap-1 text-gray-600'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-2456378</li>
                        <li>adigoyal9720@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 all rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;
