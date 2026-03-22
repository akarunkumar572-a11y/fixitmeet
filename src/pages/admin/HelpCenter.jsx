import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiHelpCircle, FiSearch, FiMessageSquare, FiBookOpen, FiLifeBuoy, FiChevronRight, FiPhoneCall } from 'react-icons/fi';
import { getAdminTickets } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const AdminHelpCenter = () => {
    const dispatch = useDispatch();
    const { allTickets: activeTickets, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminTickets());
    }, [dispatch]);

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Help & Support Center</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Manage customer tickets, provider disputes, and knowledge base articles.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn} style={{ background: '#064e3b', color: '#fff', borderColor: '#064e3b' }}><FiLifeBuoy /> New Ticket</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <Card style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ background: '#eff6ff', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiMessageSquare />
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a' }}>Live Chat</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>4 Active Sessions</div>
                    </div>
                </Card>
                <Card style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ background: '#fef2f2', color: '#ef4444', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiLifeBuoy />
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a' }}>Support Tickets</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>12 Unresolved</div>
                    </div>
                </Card>
                <Card style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ background: '#f0fdf4', color: '#10b981', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiBookOpen />
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a' }}>Knowledge Base</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Manage Articles</div>
                    </div>
                </Card>
                <Card style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ background: '#fefce8', color: '#eab308', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <FiPhoneCall />
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a' }}>Phone Support</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Configure IVR Routes</div>
                    </div>
                </Card>
            </div>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Active Support Tickets</h3>
                    <div style={{ position: 'relative' }}>
                        <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }} />
                        <input
                            type="text"
                            placeholder="Search ticket ID or user..."
                            style={{ padding: '8px 8px 8px 32px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '250px' }}
                        />
                    </div>
                </div>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Ticket ID</th>
                                <th>Reported By</th>
                                <th>Issue Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {activeTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td style={{ fontWeight: '700', color: '#64748b' }}>{ticket.id}</td>
                                    <td style={{ fontWeight: '700', color: '#0f172a' }}>{ticket.user}</td>
                                    <td style={{ fontWeight: '600', color: '#475569' }}>{ticket.type}</td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ticket.priority === 'Urgent' ? '#ef4444' : ticket.priority === 'High' ? '#f59e0b' : '#3b82f6', fontWeight: '800' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span> {ticket.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            background: ticket.status === 'Open' ? '#fef2f2' : '#eff6ff',
                                            color: ticket.status === 'Open' ? '#ef4444' : '#3b82f6',
                                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700'
                                        }}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '11px', color: '#94a3b8' }}>{ticket.time}</td>
                                    <td>
                                        <button style={{ color: '#064e3b', border: 'none', background: 'none', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Resolve <FiChevronRight /></button>
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

export default AdminHelpCenter;
