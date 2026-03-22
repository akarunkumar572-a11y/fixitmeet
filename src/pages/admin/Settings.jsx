import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiLock, FiBell, FiGlobe, FiShield } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/authSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const NOTIFICATION_KEYS = [
  { key: 'newProRegistration', title: 'New Professional Registration', desc: 'Notify when a new doctor or partner applies.' },
  { key: 'highValueBooking', title: 'High-Value Booking', desc: 'Alert for bookings exceeding ₹50,000.' },
  { key: 'systemSecurityAlerts', title: 'System Security Alerts', desc: 'Notify on unauthorized login attempts.' },
  { key: 'paymentPayouts', title: 'Payment Payouts', desc: 'Alert when professional withdrawals are requested.' },
];

const STORAGE_KEY_NOTIFICATIONS = 'admin_notification_settings';

const getStoredNotificationPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return NOTIFICATION_KEYS.reduce((acc, { key }) => ({ ...acc, [key]: true }), {});
};

const AdminSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading: authLoading, message: authMessage, isSuccess: authSuccess } = useSelector((state) => state.auth);

  const [activeSection, setActiveSection] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', location: '' });
  const [profileSaved, setProfileSaved] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState(getStoredNotificationPrefs);
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: typeof user.location === 'string' ? user.location : '',
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifPrefs));
  }, [notifPrefs]);

  const sections = [
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'platform', icon: <FiGlobe />, label: 'System' },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    setProfileSaved(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaved(false);
    try {
      await dispatch(updateProfile({
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim() || undefined,
      })).unwrap();
      setProfileSaved(true);
    } catch (_) {}
  };

  const toggleNotif = (key) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.dashboard} style={{ padding: '24px' }}>
      <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
        <div>
          <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Admin Configuration</h1>
          <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Profile management, notification preferences, and system security controls.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        <aside>
          <Card style={{ padding: '8px', borderRadius: '12px' }}>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: activeSection === s.id ? '#f0fdf4' : 'none',
                  color: activeSection === s.id ? '#064e3b' : '#64748b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: activeSection === s.id ? '700' : '500',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '16px' }}>{s.icon}</span> {s.label}
              </button>
            ))}
          </Card>
        </aside>

        <main>
          {activeSection === 'profile' && (
            <Card style={{ padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: '#fff',
                      fontWeight: '700',
                    }}
                  >
                    {(user?.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      background: '#064e3b',
                      color: '#fff',
                      border: '2px solid #fff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <FiCamera size={14} />
                  </button>
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>{user?.name || 'Admin'}</h2>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>Administrator</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                    <input
                      name="name"
                      type="text"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                      style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMAIL ADDRESS</label>
                    <input
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                      style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PHONE NUMBER</label>
                    <input
                      name="phone"
                      type="text"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      placeholder="+91 98765 43210"
                      style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>LOCATION (display only)</label>
                    <input
                      name="location"
                      type="text"
                      value={profileForm.location}
                      onChange={handleProfileChange}
                      placeholder="e.g. Mumbai, MH, India"
                      style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>
                </div>
                {authMessage && <p style={{ color: 'red', fontSize: '13px', marginTop: '12px' }}>{authMessage}</p>}
                {profileSaved && authSuccess && <p style={{ color: '#10b981', fontSize: '13px', marginTop: '12px' }}>Profile saved successfully.</p>}
                <button
                  type="submit"
                  disabled={authLoading}
                  style={{
                    marginTop: '32px',
                    background: '#064e3b',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    cursor: authLoading ? 'not-allowed' : 'pointer',
                    opacity: authLoading ? 0.7 : 1,
                  }}
                >
                  {authLoading ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </form>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card style={{ padding: '32px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Global Alerts</h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Control which system events trigger notifications. Preferences are saved locally.</p>

              {NOTIFICATION_KEYS.map((item, idx) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: idx === NOTIFICATION_KEYS.length - 1 ? 'none' : '1px solid #f1f5f9',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifPrefs[item.key]}
                    onClick={() => toggleNotif(item.key)}
                    style={{
                      width: '44px',
                      height: '24px',
                      background: notifPrefs[item.key] ? '#10b981' : '#cbd5e1',
                      borderRadius: '12px',
                      position: 'relative',
                      cursor: 'pointer',
                      border: 'none',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: notifPrefs[item.key] ? '22px' : '2px',
                        width: '20px',
                        height: '20px',
                        background: '#fff',
                        borderRadius: '50%',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
                </div>
              ))}
            </Card>
          )}

          {activeSection === 'security' && (
            <Card style={{ padding: '32px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Security</h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Change your password and manage security options.</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f0fdf4', borderRadius: '12px', marginBottom: '24px' }}>
                <FiShield size={24} color="#10b981" />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Secure account</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Your account is protected with a password. Change it periodically.</div>
                </div>
              </div>

              <div style={{ maxWidth: '400px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>CURRENT PASSWORD</label>
                  <input
                    type="password"
                    value={securityForm.currentPassword}
                    onChange={(e) => setSecurityForm((p) => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="••••••••"
                    style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>NEW PASSWORD</label>
                  <input
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm((p) => ({ ...p, newPassword: e.target.value }))}
                    placeholder="••••••••"
                    style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>CONFIRM NEW PASSWORD</label>
                  <input
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                    style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    background: '#064e3b',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Update Password
                </button>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Password change requires backend support. Use profile update if your API supports it.</p>
              </div>
            </Card>
          )}

          {activeSection === 'platform' && (
            <Card style={{ padding: '32px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>System</h2>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Platform display and regional settings.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px' }}>Theme</label>
                  <select
                    style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '100%' }}
                    defaultValue="light"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px' }}>Timezone</label>
                  <select
                    style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '100%' }}
                    defaultValue="Asia/Kolkata"
                  >
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern</option>
                    <option value="Europe/London">London</option>
                  </select>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b' }}>These options can be wired to app state or API in a future update.</p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
