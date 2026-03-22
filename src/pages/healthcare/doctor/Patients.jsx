import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiFilter, FiMail, FiPhone } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';
import styles from './Patients.module.css';
import { getAppointments } from '../../../store/appointmentSlice';

const Patients = () => {
    const dispatch = React.useRef(useDispatch()).current;
    const { appointments, isLoading } = useSelector(state => state.appointments);

    React.useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    // Derive unique patients from appointments
    const patientMap = {};
    appointments.forEach(apt => {
        if (apt.patient && !patientMap[apt.patientId]) {
            patientMap[apt.patientId] = {
                id: (apt.patientId || '').substring(0, 8).toUpperCase(),
                originalId: apt.patientId,
                name: apt.patient.name,
                email: apt.patient.email,
                phone: apt.patient.phone || 'N/A',
                lastVisit: new Date(apt.date).toLocaleDateString(),
                appointmentsCount: 1,
                status: 'Active'
            };
        } else if (apt.patient) {
            patientMap[apt.patientId].appointmentsCount++;
            const aptDate = new Date(apt.date);
            const lastDate = new Date(patientMap[apt.patientId].lastVisit);
            if (aptDate > lastDate) {
                patientMap[apt.patientId].lastVisit = aptDate.toLocaleDateString();
            }
        }
    });

    const patientList = Object.values(patientMap);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Patients Registry</h1>
                    <p>Access patient records and medical histories based on your consultation history.</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchBar}>
                        <FiSearch />
                        <input type="text" placeholder="Search by name or ID..." />
                    </div>
                    <button className={styles.btnFilter}><FiFilter /> Filters</button>
                </div>
            </header>

            <div className={styles.statsRow}>
                <div className={styles.statBox}>
                    <span className={styles.sVal}>{patientList.length}</span>
                    <span className={styles.sLabel}>Total Patients</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.sVal}>{appointments.filter(a => a.status === 'completed').length}</span>
                    <span className={styles.sLabel}>Total Consultations</span>
                </div>
                <div className={styles.statBox}>
                    <span className={styles.sVal}>1</span>
                    <span className={styles.sLabel}>Recent Follow-ups</span>
                </div>
            </div>

            <Card className={styles.mainCard}>
                {isLoading ? (
                    <p style={{ padding: '20px' }}>Loading registry...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Name</th>
                                <th>Contact Information</th>
                                <th>Last Consultation</th>
                                <th>Status</th>
                                <th>Visits</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientList.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No patients found in your history.</td></tr>
                            ) : (
                                patientList.map(p => (
                                    <tr key={p.originalId}>
                                        <td className={styles.idCell}>#PT-{p.id}</td>
                                        <td className={styles.nameCell}>{p.name}</td>
                                        <td>
                                            <div className={styles.contactIcons}>
                                                <span title={p.email} style={{ marginRight: '10px' }}><FiMail /> {p.email}</span>
                                                <span><FiPhone /> {p.phone}</span>
                                            </div>
                                        </td>
                                        <td>{p.lastVisit}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles.stable}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{p.appointmentsCount}</td>
                                        <td>
                                            <button className={styles.viewBtn} onClick={() => window.location.href = '/hc/doctor/prescriptions'}>Documents</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </Card>
        </div>
    );
};

export default Patients;
