import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiShield, FiUsers, FiClock, FiDollarSign, FiSearch, FiCheckCircle, FiTrash2, FiActivity } from 'react-icons/fi';
import { getAdminStats } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const PestControlVertical = () => {
    const dispatch = useDispatch();
    const { verticalPerf } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminStats());
    }, [dispatch]);

    const pestStats = verticalPerf.find(v => v.name === 'Pest Control') || { orders: 0 };

    const stats = [
        { label: 'Licensed Pros', value: '45', icon: <FiUsers />, color: '#10b981' },
        { label: 'Active Treatments', value: pestStats.orders.toString(), icon: <FiActivity />, color: '#8b5cf6' },
        { label: 'Safety Incidents', value: '0', icon: <FiShield />, color: '#ef4444' },
        { label: 'Total Revenue', value: `₹${(pestStats.orders * 3500).toLocaleString()}`, icon: <FiDollarSign />, color: '#fbbf24' },
    ];

    const serviceAreas = [
        { id: 'PC-101', area: 'Downtown / Central', status: 'High Activity', leads: 42, completed: 156 },
        { id: 'PC-102', area: 'Suburban North', status: 'Stable', leads: 18, completed: 89 },
        { id: 'PC-103', area: 'Industrial West', status: 'Low Activity', leads: 5, completed: 42 },
    ];

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Pest Control Vertical</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Overseeing termite control, general pest eradication, and safety compliance certificates.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn}><FiShield /> Compliance Check</button>
                </div>
            </header>

            <div className={styles.statsGrid} style={{ marginBottom: '32px' }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <div className={stat.label.includes('Incidents') ? '' : styles.statHeader}>
                                <span className={styles.statIcon} style={{ background: `${stat.color}10`, color: stat.color }}>{stat.icon}</span>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px', color: stat.color === '#ef4444' ? '#ef4444' : '#0f172a' }}>{stat.value}</h3>
                            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Regional Activity Monitoring</h3>
                </div>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Area ID</th>
                                <th>Detection Zone</th>
                                <th>Status</th>
                                <th>New Leads</th>
                                <th>Completed Jobs</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {serviceAreas.map((zone) => (
                                <tr key={zone.id}>
                                    <td style={{ fontWeight: '700' }}>{zone.id}</td>
                                    <td style={{ fontWeight: '600' }}>{zone.area}</td>
                                    <td>
                                        <span style={{
                                            background: zone.status === 'High Activity' ? '#fee2e2' : zone.status === 'Stable' ? '#f1f5f9' : '#f0fdf4',
                                            color: zone.status === 'High Activity' ? '#ef4444' : zone.status === 'Stable' ? '#64748b' : '#10b981',
                                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700'
                                        }}>
                                            {zone.status}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '700', color: '#3b82f6' }}>{zone.leads}</td>
                                    <td style={{ fontWeight: '700' }}>{zone.completed}</td>
                                    <td>
                                        <button style={{ color: '#064e3b', border: 'none', background: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Zone Analytics</button>
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

export default PestControlVertical;
