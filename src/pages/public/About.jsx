import React from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiShield } from 'react-icons/fi';
import './About.css';

const About = () => {
  const stats = [
    { id: 1, icon: <FiUsers />, count: '50K+', label: 'Happy Customers' },
    { id: 2, icon: <FiAward />, count: '10K+', label: 'Verified Providers' },
    { id: 3, icon: <FiCheckCircle />, count: '100K+', label: 'Services Completed' },
    { id: 4, icon: <FiShield />, count: '100%', label: 'Trust & Safety' },
  ];

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="bg-glow"></div>
        <h1>About <span className="gold-text">FixitMeet</span></h1>
        <p>Connecting you with the best local service providers in one single platform.</p>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-text glass-card">
            <h2>Our <span className="gold-text">Mission</span></h2>
            <p>
              FixitMeet was founded with a simple goal: to make finding reliable, fast, and high-quality local services as seamless as ordering a ride or booking a hotel.
            </p>
            <p>
              Whether it's an emergency plumbing issue, a home renovation project, or in-home healthcare assistance, we provide a unified platform where verified professionals and customers can connect with complete transparency and trust.
            </p>
            <ul className="benefits-list">
              <li><FiCheckCircle className="gold-text" /> <span>Rigorous vetting process for all providers</span></li>
              <li><FiCheckCircle className="gold-text" /> <span>Transparent pricing and reviews</span></li>
              <li><FiCheckCircle className="gold-text" /> <span>24/7 dedicated customer support</span></li>
            </ul>
          </div>

          <div className="about-stats-container">
            {stats.map(stat => (
              <div key={stat.id} className="stat-card glass-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-count">{stat.count}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;