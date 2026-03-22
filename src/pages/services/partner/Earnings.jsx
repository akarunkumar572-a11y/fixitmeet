import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiTrendingUp, FiDollarSign, FiCalendar, FiArrowDownLeft } from 'react-icons/fi';
import styles from './PartnerEarnings.module.css';
import { getAppointments } from '../../../store/appointmentSlice';

const PartnerEarnings = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading } = useSelector(state => state.appointments);

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const completedJobs = appointments.filter(a => a.status === 'completed');
    const totalEarnings = completedJobs.reduce((sum, a) => sum + (a.service?.price || 0), 0);

    // Map completed jobs to transactions
    const transactions = completedJobs.map(job => ({
        id: `TR-${(job.id || '').substring(0, 4).toUpperCase()}`,
        type: 'Job Payout',
        date: new Date(job.date).toLocaleDateString(),
        amount: `+₹${job.service?.price || 0}`,
        status: 'Completed'
    }));

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Earnings & Financials</h1>
                <p>Monitor your service revenue and bank payouts.</p>
            </header>

            {isLoading ? <p>Loading earnings history...</p> : (
                <>
                    <div className={styles.summaryGrid}>
                        <Card className={styles.sumCard}>
                            <div className={styles.sumIcon}><FiDollarSign /></div>
                            <div className={styles.sumData}>
                                <p>Available Balance</p>
                                <h3>₹{totalEarnings}</h3>
                                <button className={styles.withdrawBtn} onClick={() => alert('Payout initiated to registered bank account.')}>Request Payout</button>
                            </div>
                        </Card>
                        <Card className={styles.sumCard}>
                            <div className={styles.sumIcon} style={{ background: '#ecfdf5', color: '#10b981' }}><FiTrendingUp /></div>
                            <div className={styles.sumData}>
                                <p>Total Revenue</p>
                                <h3>₹{totalEarnings}</h3>
                                <span className={styles.trend}>Generated from {completedJobs.length} jobs</span>
                            </div>
                        </Card>
                    </div>

                    <Card className={styles.transactionsCard}>
                        <h3>Transaction History</h3>
                        <div className={styles.tList}>
                            {transactions.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No transactions found for completed jobs.</p>
                            ) : transactions.map(t => (
                                <div key={t.id} className={styles.tItem}>
                                    <div className={styles.tIcon}><FiArrowDownLeft /></div>
                                    <div className={styles.tMain}>
                                        <div className={styles.tType}>{t.type}</div>
                                        <div className={styles.tDate}>{t.date} • {t.id}</div>
                                    </div>
                                    <div className={styles.tRight}>
                                        <div className={styles.tAmount}>{t.amount}</div>
                                        <div className={`${styles.tStatus} ${styles.completed}`}>{t.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default PartnerEarnings;
