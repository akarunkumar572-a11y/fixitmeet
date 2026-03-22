import React from 'react';
import { useSelector } from 'react-redux';
import { FiUser, FiMapPin, FiAward, FiClock, FiFileText, FiCamera, FiEdit3 } from 'react-icons/fi';
import CardStyles from './DoctorDashboard.module.css'; // Reuse CSS or define inline

const ClinicProfile = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <div style={{ padding: '32px' }}>
             <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#064e3b' }}>Clinic Profile</h1>
                    <p style={{ color: '#64748b' }}>Manage your public-facing professional identity and clinic details.</p>
                </div>
                <button style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiEdit3 /> Edit Profile
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* 1. Header Card */}
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '32px', alignItems: 'center' }}>
                         <div style={{ position: 'relative' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '30px', background: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'white', fontWeight: '800' }}>
                                {(user?.name || 'A').charAt(0).toUpperCase()}
                            </div>
                            <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#064e3b', color: 'white', border: '4px solid white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <FiCamera />
                            </button>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{user?.name || 'Admin'}</h2>
                            <p style={{ color: '#059669', fontWeight: '700', marginBottom: '8px' }}>{user?.specialization || 'Healthcare Professional'}</p>
                            <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '14px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiMapPin /> Mumbai, MH</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiAward /> 12+ Yrs Experience</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Professional Bio */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiFileText color="#10b981" /> Professional Biography
                        </h3>
                        <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px' }}>
                            Dr. Rajesh Kumar is a board-certified cardiologist with over 12 years of experience in interventional cardiology. 
                            He specializes in treating complex heart conditions and has successfully performed over 2,000 heart procedures. 
                            He is dedicated to providing patient-centered care and utilizing the latest medical technologies to improve patient outcomes.
                        </p>
                    </div>

                    {/* 3. Credentials Table */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                         <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Education & Certifications</h3>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                             {[
                                 { year: '2012', title: 'MD in Cardiology', inst: 'AIIMS Delhi' },
                                 { year: '2015', title: 'Fellowship in Cardiovascular Interventions', inst: 'Mount Sinai' },
                                 { year: '2018', title: 'Board Certification (Interventional Cardiology)', inst: 'NABH' }
                             ].map(item => (
                                 <div key={item.title} style={{ display: 'flex', gap: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                                    <span style={{ fontWeight: '800', color: '#10b981' }}>{item.year}</span>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
                                        <div style={{ color: '#64748b', fontSize: '13px' }}>{item.inst}</div>
                                    </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiClock color="#10b981" /> Consultation Hours
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                             {['Mon - Fri', 'Saturday', 'Sunday'].map(day => (
                                 <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <span style={{ fontWeight: '600' }}>{day}</span>
                                    <span style={{ color: day === 'Sunday' ? '#ef4444' : '#1e293b' }}>{day === 'Sunday' ? 'Closed' : '09:00 AM - 05:00 PM'}</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', color: 'white' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Clinic Visibility</h3>
                        <p style={{ opacity: 0.8, fontSize: '13px', marginBottom: '20px' }}>Your profile is currently visible to patients in the Greater Mumbai area.</p>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '12px', color: '#10b981', fontSize: '12px', fontWeight: '700', textAlign: 'center' }}>
                            STATUS: ACTIVELY BOOKING
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicProfile;
