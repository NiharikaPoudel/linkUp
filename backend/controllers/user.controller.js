import User from '../models/user.model.js';

// Fetch all users
export const getUserList = async (req, res) => {
    try {
        const search = req.query.search
            ? { username: { $regex: req.query.search, $options: 'i' } }
            : {};
        const users = await User.find(search).select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Fetch single user
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};