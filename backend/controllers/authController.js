import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
export const registerUser = async (req,res) => {
  const { username,email,password,role,bio,province,skills,experience } = req.body;
  try{
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message:'User already exists' });

    const user = await User.create({ username,email,password,role,bio,province,skills,experience });
    res.status(201).json({...user._doc, token: generateToken(user._id)});
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req,res) => {
  const { email,password } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message:'Invalid credentials' });
    const match = await user.matchPassword(password);
    if(!match) return res.status(400).json({ message:'Invalid credentials' });
    res.json({...user._doc, token: generateToken(user._id)});
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

// Get profile
export const getProfile = async (req,res) => {
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({ message:'User not found' });
  res.json(user);
};

// Update profile
export const updateProfile = async (req,res) => {
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({ message:'User not found' });
  const { username,bio,province,skills,experience } = req.body;
  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.province = province || user.province;
  user.skills = skills || user.skills;
  user.experience = experience || user.experience;
  await user.save();
  res.json(user);
};
