import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-8 text-center py-16 px-4 bg-gray-50'>
            <div className='flex flex-col items-center'>
                <img src={assets.exchange_icon} className='w-16 mb-4' alt="Exchange Icon" />
                <p className='font-semibold text-gray-800'>Easy Exchange Policy</p>
                <p className='text-gray-500 mt-2'>We offer a hassle-free exchange process.</p>
            </div>

            <div className='flex flex-col items-center'>
                <img src={assets.quality_icon} className='w-16 mb-4' alt="Quality Icon" />
                <p className='font-semibold text-gray-800'>7 Days Return Policy</p>
                <p className='text-gray-500 mt-2'>Enjoy a smooth 7-day return experience.</p>
            </div>

            <div className='flex flex-col items-center'>
                <img src={assets.support_img} className='w-16 mb-4' alt="Support Icon" />
                <p className='font-semibold text-gray-800'>Best Customer Support</p>
                <p className='text-gray-500 mt-2'>Experience top-notch support anytime.</p>
            </div>
        </div>
    );
};

export default OurPolicy;
