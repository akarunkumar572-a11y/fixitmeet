import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiCalendar, FiClock, FiTool, FiMapPin, FiChevronRight } from 'react-icons/fi';
import styles from './Bookings.module.css';
import { getAppointments } from '../../../store/appointmentSlice';

const CustomerBookings = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading, isError, message } = useSelector(state => state.appointments);

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const displayBookings = Array.isArray(appointments) ? appointments.map(apt => ({
        id: (apt.id || apt._id || '').substring(0, 8).toUpperCase(),
        pro: apt.doctor?.name || 'Service Pro',
        service: apt.service?.name || apt.doctor?.specialization || 'General Service',
        date: new Date(apt.date).toLocaleDateString(),
        time: apt.timeSlot,
        type: 'On-site Service',
        status: apt.status ? apt.status.charAt(0).toUpperCase() + apt.status.slice(1) : 'Scheduled'
    })) : [];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Service History</h1>
                <p>Track your scheduled and past service requests.</p>
            </header>

            <Card className={styles.mainCard}>
                {isLoading && <p style={{ padding: '20px' }}>Syncing with system...</p>}
                {isError && <p style={{ color: 'red', padding: '20px' }}>Failed to load bookings.</p>}

                <div className={styles.bookingList}>
                    {!isLoading && displayBookings.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No service requests found.</div>
                    ) : displayBookings.map(bk => (
                        <div key={bk.id} className={styles.bookingCard}>
                            <div className={styles.badgeRow}>
                                <span className={styles.id}>#JOB-{bk.id}</span>
                                <span className={`${styles.status} ${styles[bk.status?.toLowerCase() || ''] || ''}`}>{bk.status}</span>
                            </div>

                            <div className={styles.contentRow}>
                                <div className={styles.proInfo}>
                                    <div className={styles.avatar} style={{ background: '#fef3c7', color: '#d97706' }}><FiTool /></div>
                                    <div>
                                        <div className={styles.name}>{bk.service}</div>
                                        <div className={styles.vertical}>Professional: {bk.pro}</div>
                                    </div>
                                </div>

                                <div className={styles.metaInfo}>
                                    <div className={styles.metaItem}>
                                        <FiCalendar /> {bk.date}
                                    </div>
                                    <div className={styles.metaItem}>
                                        <FiClock /> {bk.time}
                                    </div>
                                    <div className={styles.metaItem}>
                                        <FiMapPin /> {bk.type}
                                    </div>
                                </div>

                                <div className={styles.btnCol}>
                                    <button className={styles.btnPrimary} style={{ background: '#fbbf24', color: '#1e293b' }}>Track Professional</button>
                                    <button className={styles.btnSecondary}>Invoice <FiChevronRight /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default CustomerBookings;
