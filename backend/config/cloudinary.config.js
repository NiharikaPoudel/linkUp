/**
 * Cloudinary Configuration File
 * 
 * Purpose:
 * - Load your Cloudinary credentials from `.env`
 * - Configure Cloudinary once, so the whole project can use it
 * - Export the ready-to-use Cloudinary instance
 */

import { v2 as cloudinary } from 'cloudinary'; 
import dotenv from 'dotenv';                    

// 1) Load environment variables from .env into process.env
dotenv.config();

// 2) Configure Cloudinary with credentials (hidden in .env for security)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  secure: true,                                  
});

// 3) Export the configured Cloudinary instance
//    → So controllers/routes can directly call cloudinary.uploader.upload(...)
export default cloudinary;
