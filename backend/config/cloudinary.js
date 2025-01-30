import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, // Fix key name
        api_secret: process.env.CLOUDINARY_SECRET_KEY // Fix key name
    });

    console.log('Cloudinary is configured'); // Optional: Confirm setup
};

export default connectCloudinary;
