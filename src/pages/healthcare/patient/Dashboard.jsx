import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCalendar, FiClock, FiVideo, FiUploadCloud, FiFileText, FiPlus } from 'react-icons/fi';
import { getAppointments } from '../../../store/appointmentSlice';
import { getReports } from '../../../store/reportSlice';
import Card from '../../../components/common/Card/Card';
import styles from './PatientDashboard.module.css';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
    const dispatch = useDispatch();
    const { appointments = [] } = useSelector(state => state.appointments);
    const { reports = [] } = useSelector(state => state.reports);

    useEffect(() => {
        dispatch(getAppointments());
        dispatch(getReports());
    }, [dispatch]);

    const myBookings = Array.isArray(appointments) ? appointments.slice(0, 3).map(apt => ({
        id: apt.id || apt._id,
        dr: apt.doctor?.name || 'Unknown Professional',
        role: apt.doctor?.specialization || 'Healthcare',
        time: apt.timeSlot,
        date: new Date(apt.date).toLocaleDateString(),
        type: 'Clinic Visit',
        status: apt.status
    })) : [];

    const myReports = Array.isArray(reports) ? reports.slice(0, 2) : [];

    return (
        <div className={styles.dashContainer}>
            <div className={styles.heroBanner}>
                <div className={styles.heroText}>
                    <h1>Stay on Top of Your <span className={styles.blueText}>Health</span></h1>
                    <p>Manage your appointments, access reports, and connect with experts instantly.</p>
                </div>
                <Link to="/hc/patient/book-now" className={styles.btnApoint}><FiPlus /> Book New Appointment</Link>
            </div>

            <div className={styles.mainGrid}>
                <div className={styles.colMain}>
                    {/* My Appointments */}
                    <Card className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h3>Upcoming Appointments</h3>
                        </div>
                        <div className={styles.bookingList}>
                            {myBookings.length > 0 ? myBookings.map(bk => (
                                <div key={bk.id} className={styles.bookingItem}>
                                    <div className={styles.drInfo}>
                                        <div className={styles.drAvatar}>{bk.dr.charAt(0)}</div>
                                        <div>
                                            <div className={styles.drName}>{bk.dr}</div>
                                            <div className={styles.drRole}>{bk.role}</div>
                                        </div>
                                    </div>
                                    <div className={styles.timeInfo}>
                                        <div className={styles.dateTime}><FiCalendar size={12} /> {bk.date} at {bk.time}</div>
                                        <div className={styles.typeTag}>{bk.status}</div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button className={styles.reschedule}>Manage</button>
                                    </div>
                                </div>
                            )) : (
                                <p style={{ padding: '20px', color: '#64748b' }}>No upcoming appointments found.</p>
                            )}
                        </div>
                    </Card>

                    {/* Medical Reports Section */}
                    <Card className={styles.sectionCard}>
                        <div className={styles.cardHeader}>
                            <h3>My Medical Reports</h3>
                            <button className={styles.uploadBtn}><FiUploadCloud /> Upload New</button>
                        </div>
                        <div className={styles.reportList}>
                            {myReports.length > 0 ? myReports.map(r => (
                                <div key={r.id || r._id} className={styles.reportItem}>
                                    <div className={styles.reportIcon}><FiFileText /></div>
                                    <div className={styles.reportDetails}>
                                        <div className={styles.reportName}>{r.name}</div>
                                        <div className={styles.reportMeta}>{r.fileType} • {Math.round(r.fileSize / 1024)} KB • {new Date(r.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <Link to="/hc/patient/reports" className={styles.viewReport}>View</Link>
                                </div>
                            )) : (
                                <p style={{ padding: '20px', color: '#64748b' }}>No reports uploaded yet.</p>
                            )}
                        </div>
                    </Card>
                </div>

                <div className={styles.colSide}>
                    <Card className={styles.healthScoreCard}>
                        <h3>Health Summary</h3>
                        <div className={styles.scoreCircle}>
                            <span>84</span>
                            <small>Goal: 90</small>
                        </div>
                        <p>Your physical activity is up by 12% this week. Keep it up!</p>
                    </Card>

                    <Card className={styles.prescCard}>
                        <h3>Recent Prescriptions</h3>
                        <div className={styles.prescItem}>
                            <strong>Antibiotics...</strong>
                            <span>Dr. Michael Chen</span>
                            <small>Dec 12, 2023</small>
                        </div>
                        <button className={styles.viewAllBtn}>View All History</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
