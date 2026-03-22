import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTool, FiUsers, FiClock, FiDollarSign, FiSearch, FiFilter, FiDownload, FiZap } from 'react-icons/fi';
import { getAllUsers, getAdminStats } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const HomeServicesVertical = () => {
    const dispatch = useDispatch();
    const { users, verticalPerf } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAdminStats());
    }, [dispatch]);

    const homePros = users.filter(u => u.role === 'pro' && !u.specialization);
    const homeStats = verticalPerf.find(v => v.name === 'Home Services') || { orders: 0 };

    const stats = [
        { label: 'Active Partners', value: homePros.length.toString(), icon: <FiUsers />, color: '#10b981' },
        { label: 'Total Jobs', value: homeStats.orders.toString(), icon: <FiClock />, color: '#fbbf24' },
        { label: 'Revenue (MTD)', value: `₹${(homeStats.orders * 2500).toLocaleString()}`, icon: <FiDollarSign />, color: '#3b82f6' },
        { label: 'Service Quality', value: '4.78', icon: <FiTool />, color: '#8b5cf6' },
    ];

    const topPartners = homePros.map(p => ({
        id: `PRO-${p.id.substring(0, 4).toUpperCase()}`,
        name: p.name,
        trade: 'General Partner',
        status: p.status === 'active' ? 'Available' : 'Offline',
        completed: Math.floor(Math.random() * 50),
        rating: 4.8
    }));

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Home Services Vertical</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Managing plumbing, electrical, cleaning, and general repair operations.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn}><FiDownload /> Job Reports</button>
                </div>
            </header>

            <div className={styles.statsGrid} style={{ marginBottom: '32px' }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <div className={styles.statHeader}>
                                <span className={styles.statIcon} style={{ background: `${stat.color}10`, color: stat.color }}>{stat.icon}</span>
                            </div>
                            <h3 className={stat.value.includes('₹') ? styles.statValue : ''} style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px', color: '#0f172a' }}>{stat.value}</h3>
                            <p className={stat.label.includes('₹') ? styles.statLabel : ''} style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Skilled Professionals</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }} />
                            <input
                                type="text"
                                placeholder="Search Professionals..."
                                style={{ padding: '8px 8px 8px 32px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                            />
                        </div>
                        <button style={{ padding: '8px 12px', border: '1px solid #e2e8f0', background: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                            <FiFilter /> Trade
                        </button>
                    </div>
                </div>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Partner ID</th>
                                <th>Name</th>
                                <th>Trade</th>
                                <th>Jobs Completed</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {topPartners.map((pro) => (
                                <tr key={pro.id}>
                                    <td style={{ fontWeight: '700' }}>{pro.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '700' }}>{pro.name}</div>
                                    </td>
                                    <td>
                                        <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>{pro.trade}</span>
                                    </td>
                                    <td style={{ fontWeight: '600' }}>{pro.completed}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '700' }}>
                                            ★ {pro.rating}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ color: pro.status === 'Available' ? '#10b981' : '#f59e0b', fontWeight: '800', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span> {pro.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button style={{ color: '#3b82f6', border: 'none', background: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Manage</button>
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

export default HomeServicesVertical;
