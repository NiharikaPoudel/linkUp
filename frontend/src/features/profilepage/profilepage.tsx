import React from 'react';
import './profilePage.css';
import coverPhoto from '../../assets/female.png'; 
import avatarPhoto from '../../assets/photo.png'; 

export default function Profile() {
  return (
    <div className="profile-page">
      {/* Profile Card */}
      <div className="profile-card">
        {/* Cover Photo */}
        <div className="cover-photo">
          <img src={coverPhoto} alt="Cover" />
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <img src={avatarPhoto} alt="Avatar" className="avatar" />

          <div className="user-info">
            <h2>Niharika</h2>
            <p>IT Student | 2nd Year | Aspiring Software Engineer</p>
            <p>500+ Connections</p>
          </div>

          <div className="action-buttons">
            <button className="btn primary">Connect</button>
            <button className="btn secondary">Message</button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="tab-bar">
          <button className="tab active">Profile</button>
          <button className="tab">Projects</button>
          <button className="tab">Skills</button>
          <button className="tab">Posts</button>
          <button className="tab">Achievements</button>
        </div>
      </div>

      {/* About Section */}
      <section className="profile-section">
        <h3>About</h3>
        <p>
          I’m a passionate and detail-oriented IT student from Nepal with a love for problem-solving
          and building creative digital solutions. Currently pursuing my 2nd year in Information Technology,
          I enjoy working on web development projects and experimenting with both frontend and backend technologies.
          My dream is to create impactful applications that improve lives while constantly learning and growing as a developer.
        </p>
      </section>

      {/* Projects Section */}
      <section className="profile-section">
        <h3>Projects</h3>
        <ul>
          <li><strong>Vehicle Rental System</strong> – A Java MVC-based application for managing vehicle bookings.</li>
          <li><strong>EcoSangraha</strong> – A sustainable paper exchange platform using JSP, Servlets, and MySQL.</li>
          <li><strong>Driving Class Slot Booking App</strong> – MERN stack project for booking driving lessons online.</li>
        </ul>
      </section>

      {/* Skills Section */}
      <section className="profile-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>React.js</li>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>Java (JSP/Servlets)</li>
          <li>MySQL</li>
          <li>Node.js</li>
          <li>Python</li>
        </ul>
      </section>

      {/* Achievements Section */}
      <section className="profile-section">
        <h3>Achievements</h3>
        <ul>
          <li>Successfully completed multiple academic and hackathon projects.</li>
          <li>Built end-to-end full-stack applications using MERN and Java MVC.</li>
          <li>Active in self-learning and improving software engineering skills.</li>
        </ul>
      </section>
    </div>
  );
}
