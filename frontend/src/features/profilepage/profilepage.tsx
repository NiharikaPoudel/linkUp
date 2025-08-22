import React, { useEffect, useState } from 'react';
import axiosInstance from '../shared/config/axiosInstance';
import './ProfilePage.css';

interface Profile {
  username?: string;
  bio?: string;
  province?: string;
  skills?: string[];
  experience?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosInstance.get('/auth/profile');
      setProfile(res.data);
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const data = { ...profile, skills: Array.isArray(profile.skills) ? profile.skills : profile.skills?.split(',') };
    await axiosInstance.put('/auth/profile', data);
    alert('Profile updated');
  };

  return (
    <div className="profile-page">
      <input name="username" value={profile.username || ''} onChange={handleChange} placeholder="Username"/>
      <textarea name="bio" value={profile.bio || ''} onChange={handleChange} placeholder="Bio"/>
      <input name="province" value={profile.province || ''} onChange={handleChange} placeholder="Province"/>
      <input name="skills" value={profile.skills ? profile.skills.join(',') : ''} onChange={handleChange} placeholder="Skills"/>
      <input name="experience" value={profile.experience || ''} onChange={handleChange} placeholder="Experience"/>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;
