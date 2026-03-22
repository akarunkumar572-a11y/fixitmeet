import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCalendar, FiUser, FiClock, FiSettings, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { getAdminBookings } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const Bookings = () => {
    const dispatch = useDispatch();
    const { recentBookings: bookings, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminBookings());
    }, [dispatch]);

    return (
        <div className={styles.dashboard}>
            <header className={styles.dashHeader}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Booking Management</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>View and manage all service appointments across the platform.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn} style={{ fontSize: '13px' }}>Filter by Vertical</button>
                    <button className={styles.exportBtn} style={{ marginLeft: '12px', background: '#064e3b', color: '#fff', borderColor: '#064e3b', fontSize: '13px', fontWeight: '700' }}>New Booking</button>
                </div>
            </header>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Booking ID</th>
                                <th>Customer</th>
                                <th>Professional</th>
                                <th>Vertical</th>
                                <th>Date & Time</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {bookings.map((booking, idx) => (
                                <tr key={idx}>
                                    <td className={styles.orderId} style={{ fontWeight: '700' }}>{booking.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                                            <FiUser style={{ color: '#94a3b8' }} /> {booking.user}
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{booking.pro}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[booking.vertical.toLowerCase().replace(' ', '')]}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                                            {booking.vertical}
                                        </span>
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: '700', color: '#0f172a' }}>{booking.date}</div>
                                            <div style={{ color: '#64748b', fontSize: '11px' }}><FiClock size={10} /> {booking.time}</div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '800', color: '#064e3b' }}>₹{booking.amount}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`} style={{ fontSize: '11px', padding: '2px 8px' }}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }} title="Approve"><FiCheckCircle size={16} /></button>
                                            <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Reject"><FiXCircle size={16} /></button>
                                            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }} title="Settings"><FiSettings size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Bookings;
