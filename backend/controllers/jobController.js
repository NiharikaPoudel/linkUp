import Job from '../models/Job.js';

// Get all jobs
export const getJobs = async (req,res) => {
  const jobs = await Job.find().populate('postedBy','username email');
  res.json(jobs);
};

// Post a job (admin only)
export const createJob = async (req,res) => {
  const { title,company,description,province } = req.body;
  const job = await Job.create({ title,company,description,province,postedBy:req.user.id });
  res.status(201).json(job);
};
