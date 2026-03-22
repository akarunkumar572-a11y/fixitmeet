import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiCalendar, FiClock, FiVideo, FiMapPin, FiChevronRight } from 'react-icons/fi';
import styles from './Bookings.module.css';
import { getAppointments } from '../../../store/appointmentSlice';

const Bookings = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading, isError, message } = useSelector(state => state.appointments);

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    // Fallback data if DB is empty or backend disconnected
    const displayBookings = appointments.length > 0 ? appointments.map(apt => ({
        id: (apt.id || apt._id || '').substring(0, 8).toUpperCase(),
        pro: apt.doctor?.name || 'Unknown Doctor',
        vertical: apt.doctor?.specialization || 'General',
        date: new Date(apt.date).toLocaleDateString(),
        time: apt.timeSlot,
        type: apt.type === 'Video' ? 'Video Consult' : 'Physical Visit',
        status: apt.status.charAt(0).toUpperCase() + apt.status.slice(1),
        meetingLink: apt.meetingLink
    })) : [];

    const handleJoinMeeting = (bk) => {
        if (bk.meetingLink) {
            window.open(bk.meetingLink, '_blank');
        } else {
            window.open('https://meet.google.com/new', '_blank');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Bookings</h1>
                <p>Track and manage all your service appointments.</p>
            </header>

            <Card className={styles.mainCard}>
                {isLoading && <p style={{ padding: '20px' }}>Loading your appointments...</p>}
                {isError && <p style={{ color: 'red', padding: '20px' }}>Failed to load. {message}</p>}

                <div className={styles.bookingList}>
                    {!isLoading && displayBookings.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No bookings found.</div>
                    ) : displayBookings.map(bk => (
                        <div key={bk.id} className={styles.bookingCard}>
                            <div className={styles.badgeRow}>
                                <span className={styles.id}>#BK-{bk.id}</span>
                                <span className={`${styles.status} ${styles[bk.status?.toLowerCase() || ''] || ''}`}>{bk.status}</span>
                            </div>

                            <div className={styles.contentRow}>
                                <div className={styles.proInfo}>
                                    <div className={styles.avatar}>{bk.pro.charAt(0)}</div>
                                    <div>
                                        <div className={styles.name}>{bk.pro}</div>
                                        <div className={styles.vertical}>{bk.vertical}</div>
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
                                        {bk.type === 'Video Consult' ? <FiVideo /> : <FiMapPin />} {bk.type}
                                    </div>
                                </div>

                                <div className={styles.btnCol}>
                                    {bk.type === 'Video Consult' && (
                                        <button className={styles.btnPrimary} onClick={() => handleJoinMeeting(bk)}>
                                            <FiVideo /> Join Meeting
                                        </button>
                                    )}
                                    <button className={styles.btnSecondary}>Details <FiChevronRight /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Bookings;
