import React from 'react';
import { FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import './Providers.css';

const Providers = () => {
    const providers = [
        { id: 1, name: 'Dr. Michael Chen', role: 'General Physician', category: 'Healthcare', rating: 4.9, reviews: 324, location: 'Downtown Medical Center', img: 'https://i.pravatar.cc/150?img=11', skills: ['General Checkup', 'Pediatrics'] },
        { id: 2, name: 'Sarah Jenkins', role: 'Certified Electrician', category: 'Home Services', rating: 5.0, reviews: 89, location: 'North Side', img: 'https://i.pravatar.cc/150?img=47', skills: ['Wiring', 'Panel Upgrades'] },
        { id: 3, name: 'David Smith', role: 'Termite Inspector', category: 'Pest Control', rating: 4.8, reviews: 210, location: 'West End', img: 'https://i.pravatar.cc/150?img=33', skills: ['Termite Inspection', 'Wood Treatment'] },
        { id: 4, name: 'Emily Rose', role: 'Registered Nurse', category: 'Healthcare', rating: 5.0, reviews: 145, location: 'City Center', img: 'https://i.pravatar.cc/150?img=9', skills: ['Elderly Care', 'Physical Therapy'] },
        { id: 5, name: 'James Wilson', role: 'Master Plumber', category: 'Home Services', rating: 4.7, reviews: 156, location: 'Suburbs', img: 'https://i.pravatar.cc/150?img=12', skills: ['Pipe Repair', 'Heater Installation'] },
        { id: 6, name: 'Lisa Ray', role: 'Rodent Exterminator', category: 'Pest Control', rating: 4.9, reviews: 312, location: 'Metro Region', img: 'https://i.pravatar.cc/150?img=44', skills: ['Rodent Removal', 'Prevention Setup'] },
        { id: 7, name: 'Dr. Robert King', role: 'Dentist', category: 'Healthcare', rating: 4.8, reviews: 412, location: 'Uptown Clinic', img: 'https://i.pravatar.cc/150?img=59', skills: ['Teeth Cleaning', 'Root Canal'] },
        { id: 8, name: 'Amanda Cooper', role: 'Deep Cleaner', category: 'Home Services', rating: 4.9, reviews: 280, location: 'South River', img: 'https://i.pravatar.cc/150?img=45', skills: ['Deep Cleaning', 'Move in/out'] },
    ];

    return (
        <div className="page-container">
            <section className="page-header">
                <div className="bg-glow"></div>
                <h1>Our <span className="gold-text">Verified Professionals</span></h1>
                <p>Connect with top-rated experts across all our service verticals</p>
            </section>

            <section className="providers-section">
                <div className="providers-filters glass-card">
                    <input type="text" placeholder="Search by name, specialty, or condition..." className="form-input filter-input" />
                    <select className="form-input filter-select">
                        <option value="">All Categories</option>
                        <option value="healthcare">Healthcare & Doctors</option>
                        <option value="home-services">Home Services</option>
                        <option value="pest-control">Pest Control</option>
                    </select>
                    <select className="form-input filter-select">
                        <option value="">Sort By</option>
                        <option value="rating">Highest Rating</option>
                        <option value="reviews">Most Reviews</option>
                        <option value="distance">Nearest to Me</option>
                    </select>
                </div>

                <div className="providers-grid">
                    {providers.map(provider => (
                        <div key={provider.id} className="provider-card glass-card">
                            <div className="provider-header">
                                <img src={provider.img} alt={provider.name} className="provider-avatar" />
                                <div className="provider-info">
                                    <h3 className="provider-name">
                                        {provider.name} <FiCheckCircle className="verified-icon" />
                                    </h3>
                                    <span className="provider-role">{provider.role}</span>
                                    <span className="provider-category-badge">{provider.category}</span>
                                </div>
                            </div>

                            <div className="provider-stats">
                                <div className="stat">
                                    <FiStar className="gold-text" /> <span>{provider.rating} ({provider.reviews})</span>
                                </div>
                                <div className="stat">
                                    <FiMapPin className="text-muted" /> <span>{provider.location}</span>
                                </div>
                            </div>

                            <div className="provider-skills">
                                {provider.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>

                            <button className="btn-outline provider-action">View Profile & Book</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Providers;
