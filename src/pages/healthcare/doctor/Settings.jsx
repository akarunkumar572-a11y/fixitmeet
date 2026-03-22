import React, { useState } from 'react';
import { FiUser, FiBell, FiLock, FiHome, FiClock, FiDollarSign } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';
import styles from './DoctorDashboard.module.css';

const DoctorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'clinic', icon: <FiHome />, label: 'Clinic Info' },
    { id: 'schedule', icon: <FiClock />, label: 'Availability' },
    { id: 'payouts', icon: <FiDollarSign />, label: 'Payouts' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
  ];

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#064e3b' }}>Settings & Profile</h1>
        <p style={{ color: '#64748b' }}>Manage your professional profile, clinic details and schedule.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
        <aside>
          <Card style={{ padding: '8px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f0fdf4' : 'transparent',
                  color: activeTab === tab.id ? '#059669' : '#64748b',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? '700' : '500',
                  textAlign: 'left',
                  transition: '0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </Card>
        </aside>

        <main>
          {activeTab === 'profile' && (
            <Card style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Professional Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                  <input type="text" placeholder="Dr. Rajesh Kumar" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>SPECIALIZATION</label>
                  <input type="text" placeholder="Cardiologist" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>BIO / EXPERIENCE</label>
                  <textarea placeholder="Tell patients about your expertise..." style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', height: '100px', resize: 'none' }} />
                </div>
              </div>
              <button style={{ marginTop: '24px', background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                Save Changes
              </button>
            </Card>
          )}

          {activeTab === 'schedule' && (
             <Card style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Weekly Schedule</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Define your available time slots for consultations.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                            <span style={{ fontWeight: '600' }}>{day}</span>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <input type="time" defaultValue="09:00" style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                <span>to</span>
                                <input type="time" defaultValue="17:00" style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                            </div>
                        </div>
                    ))}
                </div>
             </Card>
          )}

          {activeTab !== 'profile' && activeTab !== 'schedule' && (
            <Card style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '48px', marginBottom: '16px' }}>{tabs.find(t => t.id === activeTab)?.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
                <p style={{ color: '#64748b', marginTop: '8px' }}>Secure synchronization with your professional profile is in progress.</p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorSettings;
