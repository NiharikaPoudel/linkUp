import User from '../models/user.model.js';

export const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { username: { $regex: search, $options: 'i' } }
      : {};

    const users = await User.find(query).select('-password'); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};