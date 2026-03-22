import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/common/Card/Card';
import { getServices } from '../../../store/serviceSlice';
import { createAppointment } from '../../../store/appointmentSlice';
import styles from './BookNow.module.css';

const BookNow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { services, isLoading: svcLoading } = useSelector(state => state.services);
    const { isLoading: aptLoading, isError, message } = useSelector(state => state.appointments);

    const [doctorList, setDoctorList] = useState([]);
    const [form, setForm] = useState({ serviceId: '', doctorId: '', date: '', timeSlot: '', notes: '' });
    const [feedback, setFeedback] = useState(null);

    // time slots sample
    const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        dispatch(getServices());
        fetch(`${apiBase}/users/doctors`)
            .then(res => res.json())
            .then(data => setDoctorList(Array.isArray(data) ? data : []))
            .catch(() => setDoctorList([]));

        const params = new URLSearchParams(window.location.search);
        const svc = params.get('service');
        if (svc) setForm(f => ({ ...f, serviceId: svc }));
    }, [dispatch, apiBase]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);
        try {
            await dispatch(createAppointment(form)).unwrap();
            setFeedback({ type: 'success', text: 'Appointment booked! Redirecting...' });
            setTimeout(() => navigate('/hc/patient/bookings'), 1500);
        } catch (err) {
            setFeedback({ type: 'error', text: err });
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Book an Appointment</h1>
                <p>Choose service, doctor and schedule your visit.</p>
            </header>

            <Card className={styles.formCard}>
                {(svcLoading || aptLoading) && <p>Loading...</p>}
                {isError && <p style={{ color: 'red' }}>{message}</p>}
                {feedback && <p className={feedback.type === 'error' ? styles.error : styles.success}>{feedback.text}</p>}

                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                    <label>
                        Service
                        <select name="serviceId" value={form.serviceId} onChange={handleChange} required>
                            <option value="">Select service</option>
                            {services.map(s => <option key={s.id || s._id} value={s.id || s._id}>{s.name}</option>)}
                        </select>
                    </label>

                    <label>
                        Professional
                        <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                            <option value="">Select professional</option>
                            {doctorList.map(d => (
                                <option key={d.id || d._id} value={d.id || d._id}>{d.name} ({d.specialization || 'General'})</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Date
                        <input type="date" name="date" value={form.date} onChange={handleChange} required />
                    </label>

                    <label>
                        Time Slot
                        <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required>
                            <option value="">Select slot</option>
                            {timeSlots.map(ts => <option key={ts} value={ts}>{ts}</option>)}
                        </select>
                    </label>

                    <label>
                        Notes (optional)
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
                    </label>

                    <button type="submit" className={styles.btnSubmit}>Book Appointment</button>
                </form>
            </Card>
        </div>
    );
};

export default BookNow;
