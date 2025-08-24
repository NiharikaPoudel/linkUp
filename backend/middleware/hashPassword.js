// import bcrypt from 'bcryptjs';

// export const hashPassword = async (req, res, next) => {
//   if (!req.body.password) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     req.body.password = await bcrypt.hash(req.body.password, salt);
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: 'Error hashing password' });
//   }
// };
