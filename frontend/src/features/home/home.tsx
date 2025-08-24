import './home.css';
import { useEffect, useState } from "react";
import axiosInstance from "../shared/config/axiosInstance"; 
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: { url: string }; 
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = async (search = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get(
        `/user${search ? `?search=${search}` : ""}`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsLoggedIn(true);
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profilepage/${userId}`);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SearchBest</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/research">Research</a></li>
        </ul>
        <div className="nav-right">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <a href="/login" className="login-btn">Login</a>
          )}
        </div>
      </nav>

      {/* Tagline */}
      <section className="tagline-section">
        <h1>Connecting Talent with Opportunities</h1>
        <p>Find your dream job or hire the perfect candidate in just a few clicks.</p>
      </section>

      {/* Feature Cards */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Post a Job</h3>
          <p>Quickly list your job openings and reach top talent instantly.</p>
        </div>
        <div className="feature-card">
          <h3>View Jobs</h3>
          <p>Explore thousands of opportunities tailored for your skills.</p>
        </div>
        <div className="feature-card">
          <h3>Build Profile</h3>
          <p>Showcase your skills and experience to attract recruiters.</p>
        </div>
      </section>

      {/* Search bar */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search professionals by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}

      {/* Users list */}
      <div className="users-list">
        {!loading && !error && users.length === 0 && <p>No users found</p>}
        {!loading && !error && users.map((user) => (
          <div key={user._id} className="user-card">
            <img 
              src={user.profilePicture?.url || "/default-avatar.png"} 
              alt={user.username} 
              className="user-avatar"
            />
            <h3>{user.username}</h3>
            <p className="email">{user.email}</p>
            <button
              className="view-profile-btn"
              onClick={() => handleViewProfile(user._id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
