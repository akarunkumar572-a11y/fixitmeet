import React from 'react';
import { FiBriefcase, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Partner.css';
import './Login.css'; // Let's reuse some form styles!

const Partner = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container partner-page">
      <section className="page-header">
        <div className="bg-glow"></div>
        <h1>Become a <span className="gold-text">Provider</span></h1>
        <p>Join thousands of professionals scaling their business on FixitMeet</p>
      </section>

      <section className="partner-section">
        <div className="partner-grid">

          <div className="partner-info glass-card">
            <h2>Why Partner with Us?</h2>
            <div className="partner-benefits">
              <div className="benefit-item">
                <div className="benefit-icon-ring">
                  <FiBriefcase />
                </div>
                <div>
                  <h4>More Clients</h4>
                  <p className="text-muted">Get consistent bookings in your local area without heavy marketing costs.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-ring">
                  <FiMapPin />
                </div>
                <div>
                  <h4>Flexible Schedule</h4>
                  <p className="text-muted">You decide when and where you want to work.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-ring">
                  <FiMail />
                </div>
                <div>
                  <h4>Secure Payments</h4>
                  <p className="text-muted">Enjoy direct payouts with complete transparency and zero hidden fees.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="partner-form glass-card">
            <h3>Enroll as a Provider</h3>
            <p className="text-muted form-subtitle">Fill out the quick enrollment form and get verified.</p>

            <form onSubmit={e => e.preventDefault()} className="enroll-form">
              <div className="input-group">
                <FiBriefcase className="input-icon" />
                <input type="text" placeholder="Business / Personal Name" className="form-input with-icon" />
              </div>

              <div className="input-group">
                <FiMail className="input-icon" />
                <input type="email" placeholder="Business Email" className="form-input with-icon" />
              </div>

              <div className="input-group">
                <FiPhone className="input-icon" />
                <input type="tel" placeholder="Phone Number" className="form-input with-icon" />
              </div>

              <div className="input-group">
                <FiMapPin className="input-icon" />
                <input type="text" placeholder="City / Region" className="form-input with-icon" />
              </div>

              <div className="form-group full-width">
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Primary Service</label>
                <select className="form-input">
                  <option value="">Select Category</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="healthcare">Healthcare Support</option>
                  <option value="repair">Home Repair</option>
                </select>
              </div>

              <button
                type="button"
                className="btn-primary enroll-submit"
                onClick={() => navigate('/partner-register')}
              >
                Start Registration
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Partner;