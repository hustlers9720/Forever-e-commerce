import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t '>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="About Us" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Welcome to our platform, where we prioritize delivering top-notch products and services tailored to meet your needs.</p>
                    <p>We are committed to innovation, quality, and ensuring a seamless experience for our customers.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>To empower individuals and businesses by providing exceptional value through high-quality offerings and unparalleled customer support.</p>
                </div>
            </div>

            <div className='text-xl py-4'>
                <Title text1={"WHY"} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>We ensure the highest standards in every product and service, providing you with reliability and excellence.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Shop with ease and enjoy a hassle-free experience, from browsing to delivery, right at your fingertips.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Our dedicated support team is here to assist you every step of the way, ensuring your satisfaction and peace of mind.</p>
                </div>
            </div>

            <NewsLetterBox />
        </div>
    )
}

export default About
