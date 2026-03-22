import React from 'react';
import { useSelector } from 'react-redux';
import { FiBriefcase, FiDollarSign, FiStar, FiCalendar, FiMapPin, FiClock, FiPlusCircle } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';
import styles from './PartnerDashboard.module.css';

const PartnerDashboard = () => {
    const { user } = useSelector(state => state.auth);

    // Placeholder data for demonstration
    const stats = [
        { label: 'Active Jobs', value: '4', icon: <FiBriefcase />, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Total Earnings', value: '₹12,450', icon: <FiDollarSign />, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Rating', value: '4.8', icon: <FiStar />, color: '#f59e0b', bg: '#fffbeb' },
    ];

    const upcomingJobs = [
        { id: 'JOB-4122', client: 'Aradhya Sharma', type: 'AC Repair', date: 'Today', time: '02:00 PM', address: 'B-4, Sector 15, Noida', status: 'In Progress' },
        { id: 'JOB-4125', client: 'Rohit Verma', type: 'Electrical Setup', date: 'Tomorrow', time: '10:00 AM', address: 'H-12, Indirapuram, GZB', status: 'Scheduled' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                    <Card key={i} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className={styles.statData}>
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className={styles.mainContent}>
                <div className={styles.colMain}>
                    <Card className={styles.jobsCard}>
                        <div className={styles.cardHeader}>
                            <h3>Active Service Requests</h3>
                            <button className={styles.viewPlan}>Manage Calendar</button>
                        </div>
                        <div className={styles.jobList}>
                            {upcomingJobs.map(job => (
                                <div key={job.id} className={styles.jobItem}>
                                    <div>
                                        <div className={styles.jobId}>{job.id}</div>
                                        <div className={styles.client}>{job.client}</div>
                                        <div className={styles.jobType}>{job.type}</div>
                                    </div>
                                    <div className={styles.jobMeta}>
                                        <div className={styles.metaLine}><FiCalendar size={13} /> {job.date}</div>
                                        <div className={styles.metaLine}><FiClock size={13} /> {job.time}</div>
                                        <div className={styles.metaLine}><FiMapPin size={13} /> {job.address}</div>
                                    </div>
                                    <div className={styles.jobAction}>
                                        <span className={styles.statusBadge}>{job.status}</span>
                                        <button className={styles.btnAction}>Update Status</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className={styles.colSide}>
                    <Card className={styles.performanceCard}>
                        <h3>Performance Score</h3>
                        <div className={styles.chartPlaceholder}>
                            <FiPlusCircle size={32} color="#10b981" />
                            <p>You have maintained a 98% task completion rate this month.</p>
                        </div>
                    </Card>

                    <Card className={styles.inviteCard} style={{ marginTop: '24px' }}>
                        <h3>Grow Your Team</h3>
                        <p>Refer other professionals to FixitMeet and earn incentives on every successful onboarding.</p>
                        <button className={styles.inviteBtn}>Invite Partner</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PartnerDashboard;
