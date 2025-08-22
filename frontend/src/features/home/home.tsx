import React, { useEffect, useState } from 'react';
import axiosInstance from '../shared/config/axiosInstance';
import './Home.css';

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  province: string;
}

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axiosInstance.get('/jobs');
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-feed">
      <h2>Job Feed</h2>
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.province}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
