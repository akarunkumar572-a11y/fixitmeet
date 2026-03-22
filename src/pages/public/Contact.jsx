import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
    return (
        <div className="page-container">
            <section className="page-header">
                <div className="bg-glow"></div>
                <h1>Get in <span className="gold-text">Touch</span></h1>
                <p>We're here to answer any questions you may have</p>
            </section>

            <section className="contact-section">
                <div className="contact-grid">
                    <div className="contact-info glass-card">
                        <h3>Contact Information</h3>
                        <p className="text-muted">Fill out the form and our team will get back to you within 24 hours.</p>

                        <div className="info-item">
                            <FiPhone className="info-icon" />
                            <div>
                                <h4>Phone</h4>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <FiMail className="info-icon" />
                            <div>
                                <h4>Email</h4>
                                <p>support@fixitmeet.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <FiMapPin className="info-icon" />
                            <div>
                                <h4>Location</h4>
                                <p>123 Emerald Ave, Suite 100<br />New York, NY 10001</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form glass-card">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" placeholder="John" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" placeholder="Doe" className="form-input" />
                            </div>
                            <div className="form-group full-width">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" className="form-input" />
                            </div>
                            <div className="form-group full-width">
                                <label>Message</label>
                                <textarea placeholder="How can we help you?" className="form-input textarea" rows="5"></textarea>
                            </div>
                            <button type="submit" className="btn-primary full-width">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
