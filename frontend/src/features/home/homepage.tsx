import { useState } from "react";
import "./homepage.css";

interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  date: string;
  location: string;
}

const companyEmojis: Record<string, string> = {
  "Fusemachines Nepal": "🤖",
  "Leapfrog Technology": "🐸",
  "CloudFactory Nepal": "☁️",
  "Khalti Digital Wallet": "💰",
  "Default": "💼",
};

function getEmoji(company: string) {
  return companyEmojis[company] || companyEmojis["Default"];
}

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobType, setJobType] = useState("All");

  const jobs: Job[] = [
    { id: 1, title: "Frontend Developer", company: "Fusemachines Nepal", salary: "Rs. 60,000/month", date: "1 Aug 2025", location: "Kathmandu" },
    { id: 2, title: "Backend Engineer", company: "Leapfrog Technology", salary: "Rs. 80,000/month", date: "3 Aug 2025", location: "Lalitpur" },
    { id: 3, title: "Cloud Engineer", company: "CloudFactory Nepal", salary: "Rs. 75,000/month", date: "5 Aug 2025", location: "Pokhara" },
    { id: 4, title: "Product Manager", company: "Khalti Digital Wallet", salary: "Rs. 90,000/month", date: "7 Aug 2025", location: "Kathmandu" },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesJobType = jobType === "All";
    return matchesSearch && matchesLocation && matchesJobType;
  });

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">💼</span> JobPortal Nepal
        </div>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </nav>

      <div className="content">
        {/* Filters */}
        <aside className="filters">
          <h3>Filters</h3>
          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option>All</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
        </aside>
        

        {/* Job List */}
        <main className="jobs">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <span className="job-emoji">{getEmoji(job.company)}</span>
                <div>
                  <h4>{job.title}</h4>
                  <p>{job.company} • {job.location}</p>
                  <p>{job.salary}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
