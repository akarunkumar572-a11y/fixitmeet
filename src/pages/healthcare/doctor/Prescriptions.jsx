import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiPrinter, FiSend, FiTrash2, FiFileText, FiDownload, FiEye } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';
import styles from './Prescriptions.module.css';
import { getAppointments, updateAppointmentStatus } from '../../../store/appointmentSlice';
import { getReports } from '../../../store/reportSlice';
import api from '../../../services/api';

const Prescriptions = () => {
    const dispatch = useDispatch();
    const { appointments } = useSelector(state => state.appointments);
    const { reports } = useSelector(state => state.reports);

    const [medicines, setMedicines] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [selectedAptId, setSelectedAptId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medName, setMedName] = useState('');
    const [dose, setDose] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        dispatch(getAppointments());
        const urlParams = new URLSearchParams(window.location.search);
        const pId = urlParams.get('patientId');
        if (pId) {
            setSelectedPatientId(pId);
        }
    }, [dispatch]);

    useEffect(() => {
        if (selectedPatientId) {
            dispatch(getReports({ patientId: selectedPatientId }));
        }
    }, [selectedPatientId, dispatch]);

    // Derive unique patients
    const patientMap = {};
    appointments.forEach(apt => {
        if (apt.patient && !patientMap[apt.patientId]) {
            patientMap[apt.patientId] = {
                id: (apt.patientId || '').substring(0, 8).toUpperCase(),
                name: apt.patient.name,
                originalId: apt.patientId
            };
        }
    });
    const patientList = Object.values(patientMap);

    // Eligible appointments for the selected patient to attach prescription (scheduled or completed)
    const patientApts = appointments.filter(a => a.patientId === selectedPatientId);

    // Filter completed appointments for the history side
    const history = appointments.filter(a => a.status === 'completed' && a.diagnosis).map(h => ({
        id: (h.id || '').substring(0, 8).toUpperCase(),
        patient: h.patient?.name || 'Unknown',
        date: new Date(h.date).toLocaleDateString(),
        Diagnosis: h.diagnosis || h.notes || 'Consultation'
    }));

    const handleAddMedicine = () => {
        if (medName && dose) {
            setMedicines([...medicines, { id: Date.now(), name: medName, dose, duration, timing: 'After Food' }]);
            setMedName('');
            setDose('');
            setDuration('');
        }
    };

    const handleFinalize = async () => {
        if (!selectedPatientId || !selectedAptId) {
            alert('Please select a patient and an appointment to attach the prescription.');
            return;
        }

        try {
            await dispatch(updateAppointment({
                id: selectedAptId,
                status: 'completed',
                diagnosis: diagnosis,
                medicines: medicines
            })).unwrap();
            
            alert('Prescription saved and appointment completed!');
            // Reset form
            setMedicines([]);
            setDiagnosis('');
            setSelectedAptId('');
        } catch (err) {
            alert('Error saving prescription: ' + err);
        }
    };

    const handleDownloadReport = async (report) => {
        try {
            const res = await api.get(`/reports/${report.id}/download`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', report.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Download failed');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>E-Prescriptions</h1>
                    <p>Generate digital prescriptions and view patient medical history.</p>
                </div>
            </header>

            <div className={styles.mainGrid}>
                {/* Creator */}
                <Card className={styles.creatorCard}>
                    <div className={styles.formSection}>
                        <h3>Patient & Session</h3>
                        <div className={styles.selectGroup}>
                            <select
                                className={styles.select}
                                value={selectedPatientId}
                                onChange={(e) => setSelectedPatientId(e.target.value)}
                            >
                                <option value="">Select Patient...</option>
                                {patientList.map(p => (
                                    <option key={p.originalId} value={p.originalId}>
                                        #PT-{p.id} - {p.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className={styles.select}
                                value={selectedAptId}
                                onChange={(e) => setSelectedAptId(e.target.value)}
                                disabled={!selectedPatientId}
                            >
                                <option value="">Select Appointment Session...</option>
                                {patientApts.map(a => (
                                    <option key={a.id} value={a.id}>
                                        {new Date(a.date).toLocaleDateString()} - {a.timeSlot} ({a.status})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h3>Diagnosis & Observations</h3>
                        <textarea
                            placeholder="Clinical observation and diagnosis..."
                            className={styles.textarea}
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        ></textarea>
                    </div>

                    <div className={styles.formSection}>
                        <h3>Medicines</h3>
                        <div className={styles.medInputs}>
                            <input type="text" placeholder="Medicine Name" className={styles.input} value={medName} onChange={e => setMedName(e.target.value)} />
                            <input type="text" placeholder="Dosage (e.g. 1-0-1)" className={styles.input} value={dose} onChange={e => setDose(e.target.value)} />
                            <input type="text" placeholder="Duration" className={styles.input} value={duration} onChange={e => setDuration(e.target.value)} />
                            <button className={styles.btnAdd} onClick={handleAddMedicine}><FiPlus /> Add</button>
                        </div>

                        <div className={styles.medList}>
                            {medicines.length === 0 ? <p style={{ fontSize: '13px', color: '#64748b' }}>No medicines added.</p> : medicines.map(m => (
                                <div key={m.id} className={styles.medItem}>
                                    <div className={styles.medInfo}>
                                        <div className={styles.mName}>{m.name}</div>
                                        <div className={styles.mMeta}>{m.dose} • {m.timing} • {m.duration}</div>
                                    </div>
                                    <button className={styles.btnRemove} onClick={() => setMedicines(medicines.filter(x => x.id !== m.id))}><FiTrash2 /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.btnPreview} onClick={() => alert('Print Preview Loading...')}><FiPrinter /> Print PDF</button>
                        <button className={styles.btnSubmit} onClick={handleFinalize}><FiSend /> Finalize & Share</button>
                    </div>
                </Card>

                {/* Patient Records (Side) */}
                <div className={styles.historyCol}>
                    <Card className={styles.historyCard}>
                        <h3>Patient Documents</h3>
                        <div className={styles.historyList}>
                            {!selectedPatientId ? (
                                <p style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#94a3b8' }}>Select a patient to view their uploaded reports.</p>
                            ) : reports.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#94a3b8' }}>No reports found for this patient.</p>
                            ) : reports.map(r => (
                                <div key={r.id} className={styles.hItem}>
                                    <div className={styles.hIcon}><FiFileText /></div>
                                    <div className={styles.hInfo}>
                                        <div className={styles.hPatient}>{r.name}</div>
                                        <div className={styles.hMeta}>{new Date(r.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <button className={styles.hBtn} onClick={() => handleDownloadReport(r)}><FiDownload /></button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className={styles.historyCard} style={{ marginTop: '24px' }}>
                        <h3>Prescription History</h3>
                        <div className={styles.historyList}>
                            {history.length === 0 ? <p style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#94a3b8' }}>No completed prescriptions.</p> : history.map(h => (
                                <div key={h.id} className={styles.hItem}>
                                    <div className={styles.hIcon} style={{ background: '#ecfdf5', color: '#10b981' }}><FiFileText /></div>
                                    <div className={styles.hInfo}>
                                        <div className={styles.hPatient}>{h.patient}</div>
                                        <div className={styles.hMeta}>{h.date} • {h.Diagnosis}</div>
                                    </div>
                                    <button className={styles.hBtn}><FiEye /></button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Prescriptions;
