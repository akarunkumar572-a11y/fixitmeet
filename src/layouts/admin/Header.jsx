import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiSettings, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import styles from './Header.module.css';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'New Pro Registration', body: 'Dr. Priya S. applied for Healthcare vertical.', time: '2m ago', read: false },
  { id: '2', title: 'Booking Confirmed', body: 'Appointment #BK-8821 was confirmed by the patient.', time: '15m ago', read: false },
  { id: '3', title: 'Payment Payout', body: 'Withdrawal request of ₹12,500 from PRO-4421.', time: '1h ago', read: true },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_notifications');
      return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
    } catch { return MOCK_NOTIFICATIONS; }
  });
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('admin_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setProfileOpen(false);
  };

  const displayName = user?.name || 'Admin';
  const displayRole = user?.role === 'admin' ? 'Platform Manager' : (user?.role || 'Admin');

  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Global search providers, bookings..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.headerActions}>
        <div className={styles.dropdownWrap} ref={notifRef}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
          >
            <FiBell />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </button>
          {notifOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHead}>
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button type="button" className={styles.markAllBtn} onClick={markAllRead}>Mark all read</button>
                )}
              </div>
              <div className={styles.dropdownList}>
                {notifications.length === 0 ? (
                  <div className={styles.dropdownEmpty}>No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}>
                      <div className={styles.notifTitle}>{n.title}</div>
                      <div className={styles.notifBody}>{n.body}</div>
                      <div className={styles.notifTime}>{n.time}</div>
                    </div>
                  ))
                )}
              </div>
              <div className={styles.dropdownFooter}>
                <button type="button" className={styles.dropdownLink} onClick={() => { navigate('/admin/settings'); setNotifOpen(false); }}>
                  Notification settings
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => navigate('/admin/settings')}
          aria-label="Settings"
        >
          <FiSettings />
        </button>

        <div className={styles.userProfileWrap} ref={profileRef}>
          <button
            type="button"
            className={styles.userProfile}
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
          >
            <div className={styles.userInfo}>
              <span className={styles.userName}>{displayName}</span>
              <span className={styles.userRole}>{displayRole}</span>
            </div>
            <div className={styles.userAvatar}>
              <FiUser />
            </div>
            <FiChevronDown size={14} className={styles.chevron} />
          </button>
          {profileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownList}>
                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={() => { navigate('/admin/settings'); setProfileOpen(false); }}
                >
                  <FiUser size={16} /> Profile & Settings
                </button>
                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={() => { navigate('/admin/settings'); setProfileOpen(false); }}
                >
                  <FiSettings size={16} /> Configuration
                </button>
                <hr className={styles.dropdownDivider} />
                <button type="button" className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={handleLogout}>
                  <FiLogOut size={16} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
