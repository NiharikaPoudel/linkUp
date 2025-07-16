import User from '../models/user.model.js';

// ✅ GET USER LIST (Authenticated)
export async function getUserList(req, res) {
    try {
        const users = await User.find().select('-password'); 

        res.status(200).json({
            message: 'User list fetched successfully',
            users: users
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
}
// for the API search filter 
export const searchUserList = async (req, res) => {
  const searchQuery = req.query.name || '';

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

