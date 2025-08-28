import User from '../models/user.model.js';

// Get user profile by ID (public access)
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // If no ID provided and user is authenticated, get their own profile
        if (!userId) {
            if (!req.user) {
                return res.status(401).json({ message: 'Authentication required to view own profile' });
            }
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }
        
        // Get profile by ID (public access)
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update user profile (requires authentication)
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updateData = req.body;
        
        // Remove sensitive fields that shouldn't be updated
        delete updateData.password;
        delete updateData.email;
        delete updateData.username;
        delete updateData.profilePicture;
        
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Add skill to user profile
export const addSkill = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { skill } = req.body;
        
        if (!skill || skill.trim() === '') {
            return res.status(400).json({ message: 'Skill is required' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if skill already exists
        if (user.skills.includes(skill.trim())) {
            return res.status(400).json({ message: 'Skill already exists' });
        }
        
        user.skills.push(skill.trim());
        await user.save();
        
        res.status(200).json({ message: 'Skill added successfully', skills: user.skills });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Remove skill from user profile
export const removeSkill = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { skill } = req.body;
        
        if (!skill) {
            return res.status(400).json({ message: 'Skill is required' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.skills = user.skills.filter(s => s !== skill);
        await user.save();
        
        res.status(200).json({ message: 'Skill removed successfully', skills: user.skills });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
