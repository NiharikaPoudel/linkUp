import User from "../models/user.model.js";
import { uploadBufferToCloudinary } from "../middleware/image-uploader.middleware.js";
import cloudinary from "../config/cloudinary.config.js";
 
export async function uploadProfilePic(req, res) {
    try {
        if (!req.file) throw new Error('No file uploaded');
 
        const result = await uploadBufferToCloudinary(req.file.buffer, {
            folder: 'profilepic',
            public_id: `user_${req.user.id}`,
            transformation: [
                { width: 1600, height: 1600, crop: 'fill', gravity: 'auto' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });
 
        // Save image details to MongoDB
        const user = await User.findByIdAndUpdate(
            req.user.id,  
            {
                profilePicture: {
                    url: result.secure_url,
                    public_id: result.public_id
                }
            },
            { new: true }
        );
 
        res.json({ success: true, image: user.profilePicture });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
}
 
export async function deleteProfilePic(req, res) {
    try {
        // Find the user
        const user = await User.findById(req.user.id);
        if (!user) throw new Error("User not found");
 
        // Check if user has a profile picture
        if (!user.profilePicture || !user.profilePicture.public_id) {
            return res.status(400).json({ success: false, message: "No profile picture to delete" });
        }
 
        // Delete from Cloudinary using the public_id
        await cloudinary.uploader.destroy(user.profilePicture.public_id);
 
        // Remove profile picture info from MongoDB
        user.profilePicture = null;
        await user.save();
 
        res.json({ success: true, message: "Profile picture deleted successfully" });
    } catch (e) {
        res.status(400).json({ success: false, message: e.message });
    }
}
 