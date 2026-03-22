import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiVideo, FiUser, FiClock, FiFileText, FiPlus, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { getAppointments } from '../../../store/appointmentSlice';
import Card from '../../../components/common/Card/Card';
import styles from './DoctorDashboard.module.css';

const DoctorDashboard = () => {
    const dispatch = useDispatch();
    const { appointments: appts, isLoading } = useSelector(state => state.appointments);

    const [greeting, setGreeting] = React.useState('');

    useEffect(() => {
        dispatch(getAppointments());

        // Dynamic greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, [dispatch]);

    // Filter for today's or upcoming appointments
    const upcomingAppts = appts.filter(a => a.status === 'scheduled')
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleJoinMeeting = (appt) => {
        if (appt.meetingLink) {
            window.open(appt.meetingLink, '_blank');
        } else {
            // Default Google Meet link if none provided
            window.open('https://meet.google.com/new', '_blank');
        }
    };

    const displayAppointments = upcomingAppts.slice(0, 5).map(apt => ({
        id: (apt.id || apt._id).substring(0, 8).toUpperCase(),
        originalId: apt.id || apt._id,
        patientId: apt.patientId,
        patient: apt.patient?.name || 'Unknown Patient',
        time: apt.timeSlot,
        type: apt.service ? apt.service.name : (apt.type === 'Video' ? 'Teleconsult' : 'Clinic Visit'),
        status: apt.status,
        issue: apt.notes || 'Routine Checkup',
        meetingLink: apt.meetingLink
    }));

    const totalPatients = new Set(appts.map(a => a.patientId)).size;
    const activeSlots = upcomingAppts.length;
    const completedToday = appts.filter(a => a.status === 'completed').length;

    return (
        <div className={styles.dashContainer}>
            <div className={styles.welcomeRow}>
                <h1>{greeting}, Dr. Michael Chen</h1>
                <p>You have {activeSlots} consultations scheduled.</p>
            </div>
            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#ecfdf5', color: '#10b981' }}><FiUser /></div>
                    <div className={styles.statData}>
                        <h3>{totalPatients}</h3>
                        <p>Total Patients</p>
                    </div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}><FiVideo /></div>
                    <div className={styles.statData}>
                        <h3>{activeSlots}</h3>
                        <p>Active Slots</p>
                    </div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}><FiCheckCircle /></div>
                    <div className={styles.statData}>
                        <h3>{completedToday}</h3>
                        <p>Completed Today</p>
                    </div>
                </Card>
            </div>

            <div className={styles.mainGrid}>
                {/* Appointments List */}
                <div className={styles.colMain}>
                    <Card className={styles.appointmentsCard}>
                        <div className={styles.cardHeader}>
                            <h3>Upcoming Appointments</h3>
                            <button className={styles.viewMore} onClick={() => window.location.href = '/hc/doctor/appointments'}>View All</button>
                        </div>
                        <div className={styles.apptTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Time</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayAppointments.length === 0 ? (
                                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No upcoming appointments</td></tr>
                                    ) : (
                                        displayAppointments.map(appt => (
                                            <tr key={appt.id}>
                                                <td>
                                                    <div className={styles.patientInfo}>
                                                        <div className={styles.avatar}>{appt.patient.charAt(0)}</div>
                                                        <div>
                                                            <div className={styles.name}>{appt.patient}</div>
                                                            <div className={styles.issue}>{appt.issue}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><FiClock size={12} /> {appt.time}</td>
                                                <td>
                                                    <span className={`${styles.badge} ${appt.type.includes('Video') || appt.type.includes('Teleconsult') ? styles.video : styles.visit}`}>
                                                        {appt.type}
                                                    </span>
                                                </td>
                                                <td><span className={styles.statusDot} style={{ background: appt.status === 'scheduled' ? '#10b981' : '#64748b' }}></span> {appt.status}</td>
                                                <td>
                                                    <div className={styles.tableActions}>
                                                        {(appt.type.includes('Video') || appt.type.includes('Teleconsult')) && <button className={styles.videoBtn} onClick={() => handleJoinMeeting(appt)} title="Start Google Meet"><FiVideo /></button>}
                                                        <button className={styles.prescBtn} title="Write Prescription" onClick={() => window.location.href = `/hc/doctor/prescriptions?patientId=${appt.patientId}`}><FiFileText /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Teleconsult Mockup / Quick Tools */}
                <div className={styles.colSide}>
                    <Card className={styles.videoMockupCard}>
                        <div className={styles.videoHeader}>
                            <h4>Live Consultation</h4>
                            <span className={styles.liveBadge}>READY</span>
                        </div>
                        <div className={styles.videoPlaceholder}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b', borderRadius: '12px' }}>
                                <FiVideo size={48} color="#475569" />
                            </div>
                            <div className={styles.videoControls}>
                                <button className={styles.controlBtn}><FiVideo /></button>
                                <button className={styles.controlBtn}><FiMessageSquare /></button>
                                <button className={styles.endBtn} onClick={() => window.open('https://meet.google.com/new', '_blank')}>Start Google Meet</button>
                            </div>
                        </div>
                        <div className={styles.patientNote}>
                            <p><strong>Quick Tip:</strong> Ensure your camera and microphone are properly connected before starting.</p>
                        </div>
                    </Card>

                    <Card className={styles.quickPrescCard}>
                        <h3>Digital Documents</h3>
                        <p>Generate reports and shared medical documents securely.</p>
                        <button className={styles.btnFull} onClick={() => window.location.href = '/hc/doctor/prescriptions'}>Manage Documents</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
