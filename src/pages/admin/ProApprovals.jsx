import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiMail, FiMessageCircle, FiShield } from 'react-icons/fi';
import Card from '../../components/common/Card/Card';
import styles from './ProApprovals.module.css';

const ProApprovals = () => {
    const [applications, setApplications] = useState([]);

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const getAuthHeader = () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
        } catch { return {}; }
    };

    useEffect(() => {
        fetch(`${apiBase}/partners`, { headers: getAuthHeader() })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setApplications(data);
                else setApplications(data.partners || []);
            })
            .catch(() => setApplications([]));
    }, [apiBase]);

    const [approvedMsg, setApprovedMsg] = useState(null);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(`${apiBase}/partners/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify({ status: 'approved' })
            });
            const updated = await res.json();
            if (!res.ok) throw new Error(updated.message || 'Approve failed');
            setApplications(apps => apps.filter(a => (a.id || a._id) !== id));
            setApprovedMsg({
                proName: updated.name,
                id: `PRO-${updated.id.substring(0, 4).toUpperCase()}`,
                pass: updated.generatedPassword || '**********',
                channel: 'Email & WhatsApp'
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Professional Approvals</h1>
                <p>Review credentials and approve new partner/doctor applications.</p>
            </header>

            {approvedMsg && (
                <Card className={styles.successCard}>
                    <div className={styles.successIcon}><FiCheckCircle /></div>
                    <div className={styles.successContent}>
                        <h3>Credentials Generated for {approvedMsg.proName}</h3>
                        <p>ID: <strong>{approvedMsg.id}</strong> | Password: <strong>{approvedMsg.pass}</strong></p>
                        <span className={styles.sentInfo}><FiMail /> Sent to Email | <FiMessageCircle /> Sent to WhatsApp</span>
                    </div>
                    <button onClick={() => setApprovedMsg(null)} className={styles.btnClose}>Dismiss</button>
                </Card>
            )}

            <div className={styles.grid}>
                {applications.map(app => (
                    <Card key={app.id || app._id} className={styles.appCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.mainInfo}>
                                <h3>{app.name}</h3>
                                <span className={styles.vertical}>{app.vertical}</span>
                            </div>
                            <div className={styles.typeBadge}><FiShield /> {app.specialty || app.degree || 'Partner'}</div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailRow}><span>Email:</span> {app.email}</div>
                            <div className={styles.detailRow}><span>Phone:</span> {app.phone}</div>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.btnReview}>Review ID Proof</button>
                            <div className={styles.btnOps}>
                                <button className={styles.btnReject} onClick={async () => {
                                    try {
                                        const res = await fetch(`${apiBase}/partners/${app.id || app._id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                                            body: JSON.stringify({ status: 'rejected' })
                                        });
                                        if (res.ok) setApplications(apps => apps.filter(a => (a.id || a._id) !== (app.id || app._id)));
                                    } catch (e) { console.error(e); }
                                }}><FiXCircle /> Reject</button>
                                <button className={styles.btnApprove} onClick={() => handleApprove(app.id || app._id)}>
                                    <FiCheckCircle /> Approve & Send Credentials
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
                {applications.length === 0 && !approvedMsg && (
                    <div className={styles.empty}>No pending applications for review.</div>
                )}
            </div>
        </div>
    );
};

export default ProApprovals;
