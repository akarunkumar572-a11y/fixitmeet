import React from 'react';
import { FiUser, FiBell, FiShield, FiCreditCard } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';

const PatientSettings = () => {
    return (
        <div style={{ padding: '32px' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#064e3b' }}>Account Settings</h1>
                <p style={{ color: '#64748b' }}>Manage your personal details, secure your account and set preferences.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '32px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Personal Profile</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                                <input type="text" placeholder="Your Name" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
                                <input type="text" placeholder="+91 XXXX XXXX" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>ADDRESS</label>
                                <input type="text" placeholder="e.g. 123, Main St, Mumbai" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                        </div>
                        <button style={{ marginTop: '24px', background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                            Update Profile
                        </button>
                    </Card>

                    <Card style={{ padding: '32px' }}>
                         <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Security Settings</h2>
                         <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Change Password</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                                <input type="password" placeholder="New Password" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                                <input type="password" placeholder="Confirm Password" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                            <button style={{ marginTop: '16px', background: '#1e293b', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                                Change Password
                            </button>
                         </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#059669', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '20px' }}><FiBell /></div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Notifications</h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Control your communication preferences for emails and SMS alerts.</p>
                        {['Appointment Alerts', 'Promotional Offers', 'Lab Result Notifications'].map(pref => (
                            <div key={pref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '14px' }}>{pref}</span>
                                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                            </div>
                        ))}
                    </Card>

                    <Card style={{ padding: '24px', background: '#064e3b', color: 'white' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}><FiShield /></div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Privacy</h3>
                        </div>
                        <p style={{ opacity: 0.8, fontSize: '13px', marginBottom: '16px' }}>Your medical data is encrypted with 256-bit SSL and is only shared with your licensed healthcare professionals.</p>
                        <button style={{ width: '100%', background: 'white', color: '#064e3b', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                            Download Privacy Report
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PatientSettings;
