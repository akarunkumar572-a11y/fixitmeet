import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './PartnerRegister.module.css';

const PartnerRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vertical: 'home-services',
        specialty: '',
        experience: '',
        idProof: null
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('vertical', formData.vertical);
            data.append('specialty', formData.specialty);
            data.append('experience', formData.experience);
            if (formData.idProof) {
                data.append('idProof', formData.idProof);
            }

            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/partners`, {
                method: 'POST',
                body: data
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Submission failed');
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(err?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.success}>
                <div className={styles.icon}>✅</div>
                <h2>Application Submitted!</h2>
                <p>Our admin team will review your credentials. If approved, you will receive your <strong>Profession ID</strong> and <strong>Password</strong> via Email or WhatsApp.</p>
                <button onClick={() => window.location.href = '/'} className={styles.btnHome}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Become a Part of <span className={styles.gold}>FixitMeet</span></h1>
                    <p>Join our elite network of healthcare & service professionals.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Dr. John Doe / Tech Service"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Service Vertical</label>
                            <select
                                value={formData.vertical}
                                onChange={e => setFormData({ ...formData, vertical: e.target.value })}
                            >
                                <option value="healthcare">Healthcare (Doctor)</option>
                                <option value="home-services">Home Services (Partner)</option>
                                <option value="pest-control">Pest Control (Partner)</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Work Email</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Mobile Number (For WhatsApp Updates)</label>
                            <PhoneInput
                                country={'us'}
                                value={formData.phone}
                                onChange={phone => setFormData({ ...formData, phone })}
                                containerClass={styles.phoneContainer}
                                inputClass={styles.phoneInput}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Years of Experience</label>
                            <input
                                type="number"
                                placeholder="e.g. 5"
                                value={formData.experience}
                                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Specialty / Skill</label>
                            <input
                                type="text"
                                placeholder="e.g. Cardiology / AC Expert"
                                value={formData.specialty}
                                onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.fileGroup}>
                        <label>Upload Certification / ID Proof (Aadhar/Passport)</label>
                        <div className={styles.fileDrop}>
                            <span>Click to upload or drag and drop</span>
                            <input
                                type="file"
                                className={styles.fileHidden}
                                onChange={e => setFormData({ ...formData, idProof: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application for Review'}
                    </button>
                    {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default PartnerRegister;
