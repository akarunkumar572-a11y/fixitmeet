import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaStar, FaCog, FaList } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const sidebarStructure = [
    {
      section: 'Main',
      items: [
        { path: '/admin', icon: <FaTachometerAlt />, label: 'Analytics' },
      ]
    },
    {
      section: 'Service Verticals',
      items: [
        { path: '/admin/healthcare', icon: <FaUsers />, label: 'Healthcare' },
        { path: '/admin/home-services', icon: <FaCalendarCheck />, label: 'Home Services' },
        { path: '/admin/pest-control', icon: <FaUsers />, label: 'Pest Control' },
      ]
    },
    {
      section: 'Operations',
      items: [
        { path: '/admin/bookings', icon: <FaCalendarCheck />, label: 'All Bookings' },
        { path: '/admin/services', icon: <FaList />, label: 'Services' },
        { path: '/admin/providers', icon: <FaUsers />, label: 'Global Pros' },
        { path: '/admin/approvals', icon: <FaStar />, label: 'Pro Approvals' },
        { path: '/admin/payments', icon: <FaStar />, label: 'Payments' },
        { path: '/admin/reviews', icon: <FaStar />, label: 'User Feedback' },
        { path: '/admin/help-center', icon: <FaUsers />, label: 'Help Center' },
      ]
    },
    {
      section: 'System',
      items: [
        { path: '/admin/backup', icon: <FaTachometerAlt />, label: 'Backup & Restore' },
        { path: '/admin/settings', icon: <FaCog />, label: 'Configuration' },
      ]
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.brand}>
          <span className={styles.fix}>Fixit</span><span className={styles.meet}>Meet</span>
        </div>
        <div className={styles.adminBadge}>ADMIN PANEL</div>
      </div>

      <nav className={styles.nav}>
        {sidebarStructure.map((group, groupIdx) => (
          <div key={groupIdx} className={styles.navGroup}>
            <div className={styles.groupLabel}>{group.section}</div>
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.version}>v1.0.8 - Enterprise</div>
      </div>
    </aside>
  );
};

export default Sidebar;