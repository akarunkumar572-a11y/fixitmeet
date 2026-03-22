import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiTool, FiZap, FiFilter, FiHeart, FiSettings, FiCheckCircle, FiCalendar, FiTruck, FiStar, FiActivity, FiShield, FiUserPlus, FiCpu } from 'react-icons/fi';
import './Home.css';
import HeroSearch from '../../components/public/HeroSearch';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home-services');

  const verticals = [
    { id: 'healthcare', label: 'Healthcare & Doctors', icon: <FiHeart /> },
    { id: 'home-services', label: 'Home Services', icon: <FiTool /> },
    { id: 'pest-control', label: 'Pest Control', icon: <FiShield /> },
  ];

  const popularServices = {
    'home-services': [
      { id: 1, title: 'Plumbing', icon: <FiTool />, desc: 'Expert plumbing repairs and installations for your home.' },
      { id: 2, title: 'Electrical', icon: <FiZap />, desc: 'Safe and certified electricians for all your wiring needs.' },
      { id: 3, title: 'Cleaning', icon: <FiFilter />, desc: 'Professional deep cleaning services for sparkling spaces.' },
      { id: 4, title: 'Repair', icon: <FiSettings />, desc: 'Handyman services for quick fixes and maintenance.' },
    ],
    'healthcare': [
      { id: 1, title: 'General Physician', icon: <FiActivity />, desc: 'Book appointments with top rated physicians.' },
      { id: 2, title: 'Dentist', icon: <FiHeart />, desc: 'Expert dental care and surgeries near you.' },
      { id: 3, title: 'At-home Nursing', icon: <FiUserPlus />, desc: 'Trusted at-home care and nursing services on demand.' },
    ],
    'pest-control': [
      { id: 1, title: 'Termite Control', icon: <FiShield />, desc: 'Comprehensive termite inspection and eradication.' },
      { id: 2, title: 'General Pest', icon: <FiCheckCircle />, desc: 'Keep your home free of ants, roaches, and bugs.' },
      { id: 3, title: 'Rodent Control', icon: <FiTruck />, desc: 'Safe and effective rat and mice removal services.' },
    ]
  };

  const smartSuggestions = {
    'healthcare': ['Telehealth', 'Pediatricians', 'Dental Surgery'],
    'pest-control': ['Bed Bug Treatment', 'Eco-friendly Pest', 'Termite Protection'],
    'home-services': ['Emergency Plumbing', 'AC Deep Cleaning', 'Sofa Shampooing']
  };

  const steps = [
    { id: 1, title: 'Search Professional', icon: <FiSearch />, desc: 'Find highly-rated experts for your specific needs.' },
    { id: 2, title: 'Book Appointment', icon: <FiCalendar />, desc: 'Schedule a time that works perfectly for your calendar.' },
    { id: 3, title: 'Get Job Done', icon: <FiCheckCircle />, desc: 'Enjoy top-quality service delivered to your satisfaction.' },
  ];

  const testimonials = [
    { id: 1, name: 'Sarah Jenkins', role: 'Homeowner', text: 'FixitMeet saved me when my pipes burst. Found a top-rated plumber in 5 minutes!', avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: 2, name: 'Dr. David Chen', role: 'Medical Specialist', text: 'The platform helps me manage my appointments effortlessly while reaching more local patients.', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 3, name: 'Emily Rose', role: 'Working Mom', text: 'Booking house cleaning and physician visits all in one app is incredibly convenient.', avatar: 'https://i.pravatar.cc/150?img=9' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-bg-streak"></div>

        <div className="hero-content">
          <h1 className="hero-title">Your One-Stop Platform for <span className="gold-text">Every Need</span></h1>
          <p className="hero-subtitle">From Doctors to Electricians, finding trusted professionals has never been easier.</p>

          <div className="vertical-tabs">
            {verticals.map(vert => (
              <button
                key={vert.id}
                className={`tab-btn ${activeTab === vert.id ? 'active' : ''}`}
                onClick={() => setActiveTab(vert.id)}
              >
                {vert.icon} {vert.label}
              </button>
            ))}
          </div>

          <HeroSearch activeTab={activeTab} />

          {/* Smart Suggestions */}
          <div className="smart-suggestions animate-fade-up-slow">
            <span className="suggestion-label">Popular now:</span>
            <div className="suggestion-pills">
              {smartSuggestions[activeTab].map((item, idx) => (
                <button
                  key={idx}
                  className="pill"
                  onClick={() => window.location.href = `/booking/ai?service=${item}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-actions animate-fade-up-slower" style={{ marginTop: '20px' }}>
            <Link to="/partner-register" className="btn-outline">Become a Professional Partner</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Popular in <span className="gold-text">
            {verticals.find(v => v.id === activeTab).label}
          </span></h2>
          <p>Explore specialized services provided by verified experts</p>
        </div>

        <div className="services-grid">
          {popularServices[activeTab].map(service => (
            <div key={service.id} className="service-card glass-card">
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It <span className="gold-text">Works</span></h2>
          <p>Experience seamless booking in three simple steps</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-card">
              <div className="step-icon-glow">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {index !== steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our <span className="gold-text">Customers Say</span></h2>
          <p>Real reviews from people who found the right professional</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card glass-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="star-icon" fill="currentColor" />)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;