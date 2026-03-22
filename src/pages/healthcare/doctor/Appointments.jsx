import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCalendar, FiClock, FiUser, FiVideo, FiCheck, FiX, FiMoreVertical } from 'react-icons/fi';
import { getAppointments } from '../../../store/appointmentSlice';
import Card from '../../../components/common/Card/Card';
import styles from './Appointments.module.css';

const Appointments = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading } = useSelector(state => state.appointments);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const filteredAppts = Array.isArray(appointments) ? appointments.filter(apt => {
        if (filter === 'all') return true;
        return apt.status === filter;
    }) : [];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Clinical Appointments</h1>
                    <p>Manage your patient consultations and schedule.</p>
                </div>
                <div className={styles.filterBtns}>
                    <button className={filter === 'all' ? styles.active : ''} onClick={() => setFilter('all')}>All</button>
                    <button className={filter === 'scheduled' ? styles.active : ''} onClick={() => setFilter('scheduled')}>Scheduled</button>
                    <button className={filter === 'completed' ? styles.active : ''} onClick={() => setFilter('completed')}>Completed</button>
                </div>
            </header>

            <div className={styles.appointmentGrid}>
                {isLoading ? (
                    <p>Loading appointments...</p>
                ) : filteredAppts.length > 0 ? (
                    filteredAppts.map(apt => (
                        <Card key={apt.id || apt._id} className={styles.apptCard}>
                            <div className={styles.apptHeader}>
                                <div className={styles.patientInfo}>
                                    <div className={styles.avatar}>{apt.patient?.name?.charAt(0) || 'P'}</div>
                                    <div>
                                        <h3>{apt.patient?.name || 'Unknown Patient'}</h3>
                                        <p>ID: #{(apt.patient?.id || apt.patient?._id || '').substring(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className={`${styles.statusBadge} ${styles[apt.status]}`}>
                                    {apt.status}
                                </div>
                            </div>
                            <div className={styles.apptDetails}>
                                <div className={styles.detailItem}>
                                    <FiCalendar /> {new Date(apt.date).toLocaleDateString()}
                                </div>
                                <div className={styles.detailItem}>
                                    <FiClock /> {apt.timeSlot}
                                </div>
                                <div className={styles.detailItem}>
                                    <FiVideo /> {apt.type || 'In-Clinic'}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                {apt.status === 'scheduled' && (
                                    <>
                                        <button className={styles.btnAccept} title="Confirm"><FiCheck /></button>
                                        <button className={styles.btnReject} title="Cancel"><FiX /></button>
                                    </>
                                )}
                                <button className={styles.btnMore}><FiMoreVertical /></button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <FiCalendar size={48} />
                        <p>No appointments found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
