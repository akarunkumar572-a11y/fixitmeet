import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiMapPin, FiClock, FiUser, FiNavigation, FiCheckCircle } from 'react-icons/fi';
import styles from './PartnerJobs.module.css';
import { getAppointments, updateAppointmentStatus } from '../../../store/appointmentSlice';

const PartnerJobs = () => {
    const dispatch = useDispatch();
    const { appointments, isLoading } = useSelector(state => state.appointments);

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const handleUpdateStatus = (id, status) => {
        if (window.confirm(`Mark job as ${status}?`)) {
            dispatch(updateAppointmentStatus({ id, status }));
        }
    };

    const displayJobs = appointments.filter(a => a.serviceId !== null).map(job => ({
        id: `JOB-${(job.id || '').substring(0, 4).toUpperCase()}`,
        originalId: job.id || job._id,
        client: job.patient?.name || 'Unknown Client',
        Type: job.service?.name || 'General Service',
        Date: new Date(job.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        Time: job.timeSlot,
        Address: job.notes?.split('Address:')[1]?.split('\n')[0]?.trim() || 'Refer to booking notes',
        status: job.status || 'pending',
        price: `₹${job.service?.price || 0}`
    }));

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Field Service Jobs</h1>
                <p>Manage your active jobs and site visits.</p>
            </header>

            {isLoading ? (
                <p style={{ padding: '20px' }}>Loading your tasks...</p>
            ) : (
                <div className={styles.grid}>
                    {displayJobs.length === 0 ? (
                        <div style={{ gridColumn: '1/-1', padding: '40px', textAlign: 'center', color: '#64748b' }}>
                            You have no assigned service jobs at the moment.
                        </div>
                    ) : displayJobs.map(job => (
                        <Card key={job.originalId} className={styles.jobCard}>
                            <div className={styles.cardTop}>
                                <span className={styles.id}>{job.id}</span>
                                <span className={`${styles.status} ${styles[job.status?.toLowerCase()]}`}>{job.status}</span>
                            </div>
                            <div className={styles.clientInfo}>
                                <h3>{job.client}</h3>
                                <p>{job.Type}</p>
                            </div>
                            <div className={styles.meta}>
                                <div className={styles.metaItem} title={job.Address}><FiMapPin /> {job.Address.substring(0, 30)}{job.Address.length > 30 ? '...' : ''}</div>
                                <div className={styles.metaItem}><FiClock /> {job.Date} at {job.Time}</div>
                                <div className={styles.price}>{job.price}</div>
                            </div>
                            <div className={styles.actions}>
                                {job.status === 'scheduled' ? (
                                    <>
                                        <button className={styles.btnNav} onClick={() => alert('Navigation opening soon...')}><FiNavigation /> Navigate</button>
                                        <button className={styles.btnComplete} onClick={() => handleUpdateStatus(job.originalId, 'completed')}><FiCheckCircle /> Complete</button>
                                    </>
                                ) : (
                                    <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Job marked as {job.status}</p>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartnerJobs;
