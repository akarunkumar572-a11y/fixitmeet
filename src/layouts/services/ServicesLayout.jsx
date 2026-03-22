import React, { useState } from 'react';
import { useNavigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiGrid, FiCalendar, FiUsers, FiVideo, FiFileText, FiSettings, FiLogOut, FiTool, FiBriefcase, FiDollarSign, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { logout, reset } from '../../store/authSlice';
import styles from './ServicesLayout.module.css';

const Sidebar = ({ dispatch, navigate, user, isOpen, toggleSidebar }) => {
    const isPartner = user?.role === 'pro' && !user?.specialization;

    const partnerMenu = [
        { path: '/sr/provider/dashboard', icon: <FiGrid />, label: 'Overview' },
        { path: '/sr/provider/jobs', icon: <FiCalendar />, label: 'My Jobs' },
        { path: '/sr/provider/earnings', icon: <FiFileText />, label: 'Earnings' },
        { path: '/sr/provider/profile', icon: <FiUser />, label: 'Profile' },
    ];

    const customerMenu = [
        { path: '/sr/user/dashboard', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/sr/user/bookings', icon: <FiCalendar />, label: 'My Requests' },
        { path: '/sr/user/wallet', icon: <FiDollarSign />, label: 'Payments' },
        { path: '/sr/user/profile', icon: <FiUser />, label: 'Profile' },
    ];

    const menuItems = isPartner ? partnerMenu : customerMenu;

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.logo}>
                <span className={styles.fix}>Fixit</span><span className={styles.meet}>Meet</span>
                <div className={styles.proBadge}>{isPartner ? 'SERVICES PRO' : 'SERVICES USER'}</div>
                <button className={styles.closeBtn} onClick={toggleSidebar}><FiX /></button>
            </div>
            <nav className={styles.nav}>
                {menuItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                        onClick={() => { if (window.innerWidth <= 991) toggleSidebar(); }}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </NavLink>
                ))}
                <div className={styles.navDivider}></div>
                <NavLink to="/sr/settings" className={styles.navItem}>
                    <span className={styles.icon}><FiSettings /></span>
                    <span className={styles.label}>Settings</span>
                </NavLink>
            </nav>
            <div className={styles.footer}>
                <button
                    className={styles.logoutBtn}
                    onClick={() => {
                        dispatch(logout());
                        dispatch(reset());
                        navigate('/login');
                    }}
                >
                    <FiLogOut /> Logout
                </button>
            </div>
        </aside>
    );
};

const Header = ({ user, toggleSidebar }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <button className={styles.menuBtn} onClick={toggleSidebar}>
                    <FiMenu />
                </button>
                <div className={styles.welcome}>
                    <h3>Service Portal, <span>{user?.name || 'Professional'}</span></h3>
                    <p>Managing your service requests and schedules.</p>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.status}>
                    <span className={styles.onlineDot}></span> Online
                </div>
                <div className={styles.profile}>
                    <div className={styles.avatarPlaceholder}>{user?.name?.charAt(0) || 'S'}</div>
                </div>
            </div>
        </header>
    );
};

const ServicesLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={styles.container}>
            <Sidebar dispatch={dispatch} navigate={navigate} user={user} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
            <main className={styles.main}>
                <Header user={user} toggleSidebar={toggleSidebar} />
                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ServicesLayout;
