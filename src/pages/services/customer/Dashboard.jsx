import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCalendar, FiClock, FiTool, FiCheckCircle, FiPlus, FiCreditCard } from 'react-icons/fi';
import { getAppointments } from '../../../store/appointmentSlice';
import Card from '../../../components/common/Card/Card';
import styles from './PatientDashboard.module.css'; // Reusing layout styles
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
    const dispatch = useDispatch();
    const { appointments = [] } = useSelector(state => state.appointments);

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    // Filter only non-healthcare services if possible, or just show all bookings for this user
    const myBookings = Array.isArray(appointments) ? appointments.slice(0, 3).map(apt => ({
        id: apt.id || apt._id,
        pro: apt.doctor?.name || 'Service Pro',
        service: apt.service?.name || 'General Service',
        time: apt.timeSlot,
        date: new Date(apt.date).toLocaleDateString(),
        status: apt.status
    })) : [];

    return (
        <div className={styles.dashContainer}>
            <div className={styles.heroBanner} style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className={styles.heroText}>
                    <h1>Your Home, <span className={styles.goldText}>Perfectly Maintained</span></h1>
                    <p>Track your service requests, view history, and book verified professionals.</p>
                </div>
                <Link to="/services" className={styles.btnApoint} style={{ background: '#fbbf24', color: '#1e293b' }}>
                    <FiPlus /> Request New Service
                </Link>
            </div>

            <div className={styles.mainGrid}>
                <div className={styles.colMain}>
                    {/* Active Requests */}
                    <Card className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h3>Active Service Requests</h3>
                        </div>
                        <div className={styles.bookingList}>
                            {myBookings.length > 0 ? myBookings.map(bk => (
                                <div key={bk.id} className={styles.bookingItem}>
                                    <div className={styles.drInfo}>
                                        <div className={styles.drAvatar} style={{ background: '#fef3c7', color: '#d97706' }}>
                                            <FiTool />
                                        </div>
                                        <div>
                                            <div className={styles.drName}>{bk.service}</div>
                                            <div className={styles.drRole}>Provider: {bk.pro}</div>
                                        </div>
                                    </div>
                                    <div className={styles.timeInfo}>
                                        <div className={styles.dateTime}><FiCalendar size={12} /> {bk.date} at {bk.time}</div>
                                        <div className={styles.typeTag} style={{ background: '#ecfdf5', color: '#10b981' }}>{bk.status}</div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button className={styles.reschedule}>Track</button>
                                    </div>
                                </div>
                            )) : (
                                <p style={{ padding: '20px', color: '#64748b' }}>No active service requests.</p>
                            )}
                        </div>
                    </Card>

                    <Card className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h3>Service Documents</h3>
                        </div>
                        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                            <FiCheckCircle size={32} style={{ marginBottom: '10px' }} />
                            <p>Completed jobs will show invoices and warranties here.</p>
                        </div>
                    </Card>
                </div>

                <div className={styles.colSide}>
                    <Card className={styles.healthScoreCard} style={{ borderTop: '4px solid #fbbf24' }}>
                        <h3>User Credits</h3>
                        <div className={styles.scoreCircle} style={{ borderColor: '#fbbf24' }}>
                            <span style={{ color: '#d97706' }}>₹0</span>
                        </div>
                        <p>Add money to your wallet for faster one-click bookings.</p>
                        <button className={styles.viewAllBtn} style={{ background: '#fbbf24', color: '#1e293b', border: 'none', padding: '10px', width: '100%', borderRadius: '8px', marginTop: '10px', fontWeight: 'bold' }}>
                            <FiCreditCard /> Add Funds
                        </button>
                    </Card>

                    <Card className={styles.prescCard}>
                        <h3>Recent Payments</h3>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>No recent transactions found.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
