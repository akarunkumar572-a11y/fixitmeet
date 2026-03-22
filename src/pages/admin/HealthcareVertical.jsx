import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiActivity, FiUsers, FiCalendar, FiDollarSign, FiSearch, FiFilter, FiDownload, FiCheckCircle } from 'react-icons/fi';
import { getAllUsers, getAdminStats } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const HealthcareVertical = () => {
    const dispatch = useDispatch();
    const { users, verticalPerf } = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAdminStats());
    }, [dispatch]);

    const healthcarePros = users.filter(u => u.role === 'pro' && (u.specialization || '').length > 0);
    const healthcareStats = verticalPerf.find(v => v.name === 'Healthcare') || { orders: 0 };

    const stats = [
        { label: 'Total Doctors', value: healthcarePros.length.toString(), icon: <FiUsers />, color: '#3b82f6' },
        { label: 'Total Appts', value: healthcareStats.orders.toString(), icon: <FiCalendar />, color: '#10b981' },
        { label: 'Revenue (MTD)', value: `₹${(healthcareStats.orders * 1500).toLocaleString()}`, icon: <FiDollarSign />, color: '#fbbf24' },
        { label: 'Patient Rating', value: '4.85', icon: <FiActivity />, color: '#8b5cf6' },
    ];

    const activeSpecialists = healthcarePros.map(doc => ({
        id: `DOC-${doc.id.substring(0, 4).toUpperCase()}`,
        name: doc.name,
        specialty: doc.specialization,
        status: doc.status === 'active' ? 'Online' : 'Offline',
        consultations: Math.floor(Math.random() * 100),
        rating: 4.9
    }));

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Healthcare Vertical</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Monitoring clinical performance, doctor registrations, and patient satisfaction.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn}><FiDownload /> Export Medical Reports</button>
                </div>
            </header>

            <div className={styles.statsGrid} style={{ marginBottom: '32px' }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <div className={styles.statHeader}>
                                <span className={styles.statIcon} style={{ background: `${stat.color}10`, color: stat.color }}>{stat.icon}</span>
                            </div>
                            <h3 className={styles.statValue} style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px' }}>{stat.value}</h3>
                            <p className={styles.statLabel} style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Registered Specialists</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }} />
                            <input
                                type="text"
                                placeholder="Search Doctors..."
                                style={{ padding: '8px 8px 8px 32px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button style={{ padding: '8px 12px', border: '1px solid #e2e8f0', background: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                            <FiFilter /> Filter
                        </button>
                    </div>
                </div>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Doctor ID</th>
                                <th>Specialist Name</th>
                                <th>Specialty</th>
                                <th>Consultations</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {activeSpecialists.map((doc) => (
                                <tr key={doc.id}>
                                    <td style={{ fontWeight: '700' }}>{doc.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '700' }}>{doc.name}</div>
                                    </td>
                                    <td>
                                        <span style={{ background: '#f0f9ff', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>{doc.specialty}</span>
                                    </td>
                                    <td style={{ fontWeight: '600' }}>{doc.consultations}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '700' }}>
                                            ★ {doc.rating}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ color: doc.status === 'Online' ? '#10b981' : '#94a3b8', fontWeight: '800', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span> {doc.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button style={{ color: '#3b82f6', border: 'none', background: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>View Profile</button>
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

export default HealthcareVertical;
