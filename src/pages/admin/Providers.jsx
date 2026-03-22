import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUserPlus, FiFilter, FiMail, FiPhone, FiCheckCircle, FiMoreVertical } from 'react-icons/fi';
import { getAllUsers } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const Providers = () => {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const pros = users.filter(u => u.role === 'pro').map(u => ({
        id: u.id,
        name: u.name,
        role: u.specialization || 'Professional',
        vertical: 'Healthcare', // Placeholder since it's not in user model yet
        status: u.status,
        rating: 4.9,
        joinDate: new Date(u.createdAt).toLocaleDateString(),
        bookings: 0
    }));

    return (
        <div className={styles.dashboard}>
            <header className={styles.dashHeader}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Service Professionals</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Manage your pool of experts across all service verticals.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn} style={{ fontSize: '13px' }}><FiFilter /> Filters</button>
                    <button className={styles.exportBtn} style={{ marginLeft: '12px', background: '#064e3b', color: '#fff', borderColor: '#064e3b', fontSize: '13px', fontWeight: '700' }}><FiUserPlus /> Add Professional</button>
                </div>
            </header>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Professional</th>
                                <th>Vertical & Role</th>
                                <th>Rating</th>
                                <th>Total Bookings</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {pros.map((pro) => (
                                <tr key={pro.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#64748b' }}>
                                                <FiUserPlus style={{ margin: 'auto' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '700', color: '#0f172a' }}>{pro.name}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: #PRO-{pro.id.substring(0, 5).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '2px', fontSize: '12px' }}>{pro.role}</div>
                                        <span className={`${styles.badge} ${styles[pro.vertical.toLowerCase().replace(' ', '')]}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                                            {pro.vertical}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', color: '#fbbf24' }}>
                                            ★ {pro.rating}
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: '700', color: '#1e293b' }}>{pro.bookings}</td>
                                    <td style={{ color: '#64748b', fontSize: '12px' }}>{pro.joinDate}</td>
                                    <td>
                                        <span className={`${styles.status} ${pro.status.toLowerCase() === 'active' ? styles.confirmed : styles.pending}`} style={{ fontSize: '11px', padding: '2px 8px' }}>
                                            {pro.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <FiMail style={{ color: '#94a3b8', cursor: 'pointer' }} title="Email Pro" size={16} />
                                            <FiPhone style={{ color: '#94a3b8', cursor: 'pointer' }} title="Call Pro" size={16} />
                                            <FiMoreVertical style={{ color: '#94a3b8', cursor: 'pointer' }} title="More Options" size={16} />
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

export default Providers;
