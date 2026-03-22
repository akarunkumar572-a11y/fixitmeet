import React, { useState } from 'react';
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiCalendar, FiFileText, FiUser, FiLogOut, FiPlusCircle, FiCreditCard, FiMenu, FiX, FiGrid, FiUsers, FiVideo, FiSettings } from 'react-icons/fi';
import { logout, reset } from '../../store/authSlice';
import styles from './HealthcareLayout.module.css';

const Sidebar = ({ isOpen, toggleSidebar, dispatch, navigate, user }) => {
    const isDoctor = user?.role === 'pro' && user?.specialization;
    
    const doctorMenu = [
        { path: '/hc/doctor/dashboard', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/hc/doctor/appointments', icon: <FiCalendar />, label: 'Appointments' },
        { path: '/hc/doctor/patients', icon: <FiUsers />, label: 'Patients' },
        { path: '/hc/doctor/teleconsult', icon: <FiVideo />, label: 'Teleconsult' },
        { path: '/hc/doctor/prescriptions', icon: <FiFileText />, label: 'Prescriptions' },
        { path: '/hc/doctor/profile', icon: <FiUser />, label: 'My Profile' },
        { path: '/hc/doctor/settings', icon: <FiSettings />, label: 'Clinic Settings' },
    ];

    const patientMenu = [
        { path: '/hc/patient/dashboard', icon: <FiHome />, label: 'Overview' },
        { path: '/hc/patient/bookings', icon: <FiCalendar />, label: 'My Bookings' },
        { path: '/hc/patient/reports', icon: <FiFileText />, label: 'Medical Reports' },
        { path: '/hc/patient/book-now', icon: <FiPlusCircle />, label: 'Book Appointment' },
        { path: '/hc/patient/wallet', icon: <FiCreditCard />, label: 'Wallet & Payments' },
        { path: '/hc/patient/profile', icon: <FiUser />, label: 'Profile' },
    ];

    const menuItems = isDoctor ? doctorMenu : patientMenu;

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.logo}>
                <span className={styles.fix}>Fixit</span><span className={styles.meet}>Meet</span>
                <div className={isDoctor ? styles.docBadge : styles.ptBadge}>
                    HEALTHCARE {isDoctor ? 'PRO' : 'MEMBER'}
                </div>
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
                    <FiLogOut /> Sign Out
                </button>
            </div>
        </aside>
    );
};

const Header = ({ toggleSidebar, user }) => (
    <header className={styles.header}>
        <div className={styles.headerLeft}>
            <button className={styles.menuBtn} onClick={toggleSidebar}>
                <FiMenu />
            </button>
            <div className={styles.greeting}>
                <h3>Hello, <span>{user?.name || 'Healthcare Member'}</span></h3>
                <p>Welcome to your Healthcare & Clinical Dashboard.</p>
            </div>
        </div>
        <div className={styles.headerRight}>
             <div className={styles.avatarPlaceholder}>{user?.name?.charAt(0) || 'H'}</div>
        </div>
    </header>
);

const HealthcareLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={styles.container}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} dispatch={dispatch} navigate={navigate} user={user} />
            {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
            <main className={styles.main}>
                <Header toggleSidebar={toggleSidebar} user={user} />
                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HealthcareLayout;
