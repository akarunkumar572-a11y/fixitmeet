import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiCreditCard, FiArrowUpRight, FiArrowDownRight, FiClock, FiSettings, FiCheckCircle, FiShield } from 'react-icons/fi';
import { getAdminPayments } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const AdminPayments = () => {
    const dispatch = useDispatch();
    const { allPayments, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminPayments());
    }, [dispatch]);

    const transactions = allPayments.map(tx => ({
        id: tx.id.substring(0, 8).toUpperCase(),
        provider: tx.user?.name || 'Platform',
        vertical: tx.type === 'Payment' ? 'Healthcare' : 'System',
        amount: `₹${tx.amount.toLocaleString()}`,
        type: tx.type,
        status: tx.status,
        date: new Date(tx.createdAt).toLocaleString()
    }));

    const totalCleared = allPayments.filter(tx => tx.status === 'Completed').reduce((sum, tx) => sum + tx.amount, 0);
    const totalPending = allPayments.filter(tx => tx.status === 'Processing').reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>Payments & Payouts</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Manage automated partner payouts, platform commissions, and gateways.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn} style={{ background: '#064e3b', color: '#fff', borderColor: '#064e3b' }}><FiSettings /> Gateway Settings</button>
                </div>
            </header>

            <div className={styles.statsGrid} style={{ marginBottom: '32px' }}>
                <Card className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <div className={styles.statHeader}>
                            <span className={styles.statIcon} style={{ background: '#10b98110', color: '#10b981' }}><FiCheckCircle /></span>
                        </div>
                        <h3 className={styles.statValue} style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px', color: '#0f172a' }}>₹{totalCleared.toLocaleString()}</h3>
                        <p className={styles.statLabel} style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Cleared Payouts (MTD)</p>
                    </div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <div className={styles.statHeader}>
                            <span className={styles.statIcon} style={{ background: '#fbbf2410', color: '#fbbf24' }}><FiClock /></span>
                        </div>
                        <h3 className={styles.statValue} style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px', color: '#0f172a' }}>₹{totalPending.toLocaleString()}</h3>
                        <p className={styles.statLabel} style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Pending Processing</p>
                    </div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <div className={styles.statHeader}>
                            <span className={styles.statIcon} style={{ background: '#3b82f610', color: '#3b82f6' }}><FiDollarSign /></span>
                        </div>
                        <h3 className={styles.statValue} style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 4px', color: '#0f172a' }}>₹2,85,000</h3>
                        <p className={styles.statLabel} style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Platform Commission</p>
                    </div>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                    <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Recent Transactions</h3>
                    </div>
                    <div className={styles.tableResponsive}>
                        <table className={styles.table}>
                            <thead>
                                <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <th>TXN ID</th>
                                    <th>Recipient / Source</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {transactions.map((txn) => (
                                    <tr key={txn.id}>
                                        <td style={{ fontWeight: '700', color: '#64748b' }}>{txn.id}</td>
                                        <td>
                                            <div style={{ fontWeight: '700', color: '#0f172a' }}>{txn.provider}</div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{txn.vertical}</div>
                                        </td>
                                        <td>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: txn.type === 'Payout' ? '#ef4444' : '#10b981', fontWeight: '600' }}>
                                                {txn.type === 'Payout' ? <FiArrowUpRight /> : <FiArrowDownRight />} {txn.type}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '800' }}>{txn.amount}</td>
                                        <td>
                                            <span style={{
                                                background: txn.status === 'Completed' ? '#f0fdf4' : txn.status === 'Processing' ? '#fffbeb' : '#fef2f2',
                                                color: txn.status === 'Completed' ? '#10b981' : txn.status === 'Processing' ? '#f59e0b' : '#ef4444',
                                                padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700'
                                            }}>
                                                {txn.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card style={{ borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '24px' }}>Automated Payouts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#f0f9ff', padding: '10px', borderRadius: '8px', color: '#0ea5e9' }}>
                                    <FiCreditCard size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '14px' }}>Stripe Connect</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>Primary Gateway</div>
                                </div>
                            </div>
                            <span style={{ color: '#10b981', fontWeight: '800', fontSize: '12px' }}>Active</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '8px', color: '#ef4444' }}>
                                    <FiShield size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '14px' }}>Escrow Holding</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>For Disputed Jobs</div>
                                </div>
                            </div>
                            <span style={{ color: '#64748b', fontWeight: '700', fontSize: '12px' }}>Setup</span>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                            <strong>Note:</strong> Automated payouts to verified partners are processed every Tuesday at 00:00 UTC. Ensure platform wallet maintains a minimum balance of ₹5,00,000 to prevent payout delays.
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminPayments;
