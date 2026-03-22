import React, { useState } from 'react';
import { FiDatabase, FiDownload, FiUpload, FiRefreshCw, FiClock, FiCheckCircle } from 'react-icons/fi';
import Card from '../../components/common/Card/Card';
import styles from './BackupRestore.module.css';

const BackupRestore = () => {
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [backups, setBackups] = useState([
        { id: 'BK-001', date: '2023-10-25 10:30 AM', size: '1.2 GB', type: 'Full System' },
        { id: 'BK-002', date: '2023-10-24 11:45 PM', size: '450 MB', type: 'Database Only' },
        { id: 'BK-003', date: '2023-10-23 09:15 AM', size: '1.1 GB', type: 'Full System' },
    ]);

    const handleCreateBackup = () => {
        setIsBackingUp(true);
        setTimeout(() => {
            const newBackup = {
                id: `BK-00${backups.length + 1}`,
                date: new Date().toLocaleString(),
                size: '1.2 GB',
                type: 'Manual Backup'
            };
            setBackups([newBackup, ...backups]);
            setIsBackingUp(false);
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Backup & Restore</h1>
                    <p>Secure your platform data with automated and manual backups.</p>
                </div>
                <button
                    className={styles.btnBackup}
                    onClick={handleCreateBackup}
                    disabled={isBackingUp}
                >
                    {isBackingUp ? <FiRefreshCw className={styles.spin} /> : <FiDatabase />}
                    {isBackingUp ? 'Creating Backup...' : 'Create New Backup'}
                </button>
            </header>

            <div className={styles.grid}>
                <Card className={styles.statusCard}>
                    <div className={styles.cardHeader}>
                        <h3>System Status</h3>
                        <FiCheckCircle className={styles.okIcon} />
                    </div>
                    <div className={styles.statusItem}>
                        <span>Last Backup:</span>
                        <strong>{backups[0].date}</strong>
                    </div>
                    <div className={styles.statusItem}>
                        <span>Backup Storage:</span>
                        <strong>Encrypted (AES-256)</strong>
                    </div>
                    <div className={styles.statusItem}>
                        <span>Next Scheduled:</span>
                        <strong>2023-10-26 12:00 AM</strong>
                    </div>
                </Card>

                <Card className={styles.historyCard}>
                    <h3>Backup History</h3>
                    <div className={styles.backupList}>
                        {backups.map(bk => (
                            <div key={bk.id} className={styles.backupItem}>
                                <div className={styles.bkInfo}>
                                    <span className={styles.bkId}>{bk.id}</span>
                                    <div className={styles.bkMeta}>
                                        <FiClock /> {bk.date} • {bk.type}
                                    </div>
                                </div>
                                <div className={styles.bkActions}>
                                    <span className={styles.bkSize}>{bk.size}</span>
                                    <button className={styles.btnIcon} title="Download"><FiDownload /></button>
                                    <button className={styles.btnRestore}>Restore</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className={styles.uploadCard}>
                    <div className={styles.uploadIcon}><FiUpload /></div>
                    <h3>Restore from Local</h3>
                    <p>Upload a .zip or .sql backup file to restore your database or system files.</p>
                    <label className={styles.fileLabel}>
                        Choose File
                        <input type="file" className={styles.fileInput} />
                    </label>
                </Card>
            </div>
        </div>
    );
};

export default BackupRestore;
