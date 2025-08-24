import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../shared/config/axiosInstance";
import type { AxiosResponse } from "axios";

import "./profilepage.css";

interface User {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  qualification: string;
  professionalField: string;
  bio: string;
  skills?: string[];
  experience?: string;
  profilePicture?: { url: string };
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axiosInstance
        .get<User>(`/users/${id}`)
        .then((res: AxiosResponse<User>) => setUser(res.data))
        .catch((err: unknown) =>
          console.error("Error fetching user:", err)
        );
    }
  }, [id]);

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Left: Profile Picture */}
        <div className="profile-left">
          <img
            src={user.profilePicture?.url || "https://via.placeholder.com/150?text=No+Image"}
            alt={user.name}
            className="profile-img"
          />
        </div>

        {/* Right: User Info */}
        <div className="profile-right">
          <h2 className="profile-title">{user.name}</h2>
          <div className="profile-field">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="profile-field">
            <label>Contact No:</label>
            <p>{user.contactNumber}</p>
          </div>
          <div className="profile-field">
            <label>Address:</label>
            <p>{user.address}</p>
          </div>
          <div className="profile-field">
            <label>Qualification:</label>
            <p>{user.qualification}</p>
          </div>
          <div className="profile-field">
            <label>Professional Field:</label>
            <p>{user.professionalField}</p>
          </div>
          {user.skills && user.skills.length > 0 && (
            <div className="profile-field">
              <label>Skills:</label>
              <p>{user.skills.join(", ")}</p>
            </div>
          )}
          {user.experience && (
            <div className="profile-field">
              <label>Experience:</label>
              <p>{user.experience}</p>
            </div>
          )}
          <div className="profile-field">
            <label>Bio:</label>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;