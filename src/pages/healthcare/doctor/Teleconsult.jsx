import React, { useState } from 'react';
import { FaVideo, FaMicrophone, FaDesktop, FaPhoneSlash, FaComment, FaUserMd, FaNotesMedical, FaRegIdCard, FaClipboardList } from 'react-icons/fa';
import styles from './Teleconsult.module.css';

const Teleconsult = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.mainArea}>
                {/* 1. Video Grid */}
                <div className={styles.videoGrid}>
                    <div className={styles.patientVideo}>
                        <div className={styles.videoPlaceholder}>
                            <div className={styles.avatar}>RD</div>
                            <span>Ramesh Dutt (Patient)</span>
                        </div>
                        <div className={styles.videoLabel}>Patient View</div>
                    </div>
                    <div className={styles.doctorVideo}>
                        <div className={styles.videoPlaceholder}>
                            <FaUserMd size={40} />
                            <span>Dr. Rajesh (You)</span>
                        </div>
                        <div className={styles.videoLabel}>Self View</div>
                    </div>
                </div>

                {/* 2. Controls */}
                <div className={styles.controls}>
                    <button className={`${styles.controlBtn} ${isMuted ? styles.active : ''}`} onClick={() => setIsMuted(!isMuted)}>
                        <FaMicrophone />
                    </button>
                    <button className={`${styles.controlBtn} ${!isVideoOn ? styles.active : ''}`} onClick={() => setIsVideoOn(!isVideoOn)}>
                        <FaVideo />
                    </button>
                    <button className={styles.controlBtn}>
                        <FaDesktop />
                    </button>
                    <button className={`${styles.controlBtn} ${styles.endCall}`}>
                        <FaPhoneSlash />
                    </button>
                </div>
            </div>

            {/* 3. Patient Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h3>Patient Info</h3>
                </div>
                <div className={styles.patientProfile}>
                    <div className={styles.patientAvatar}>RD</div>
                    <h4>Ramesh Dutt</h4>
                    <span className={styles.patientId}>ID: P-908721</span>
                </div>

                <div className={styles.infoTabs}>
                    <div className={styles.tabItem}>
                        <FaRegIdCard />
                        <div>
                            <label>Age/Gender</label>
                            <p>45 / Male</p>
                        </div>
                    </div>
                    <div className={styles.tabItem}>
                        <FaClipboardList />
                        <div>
                            <label>Symptoms</label>
                            <p>Mild fever, dry cough</p>
                        </div>
                    </div>
                    <div className={styles.tabItem}>
                        <FaNotesMedical />
                        <div>
                            <label>Past History</label>
                            <p>None / Non-diabetic</p>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <button className={styles.actionBtn}>
                        <FaComment /> Chat
                    </button>
                    <button className={styles.actionBtn}>
                        Create Prescription
                    </button>
                </div>

                <div className={styles.notesSection}>
                    <label>Live Meeting Notes</label>
                    <textarea placeholder="Type your observations here..." />
                </div>
            </div>
        </div>
    );
};

export default Teleconsult;
