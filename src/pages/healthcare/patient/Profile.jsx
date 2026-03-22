import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiUser, FiMail, FiPhone, FiLock, FiCamera, FiLogOut } from 'react-icons/fi';
import { updateProfile, logout, reset } from '../../../store/authSlice';
import styles from './Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Account Settings</h1>
                <p>Manage your profile information and health account security.</p>
            </header>

            <div className={styles.mainGrid}>
                <Card className={styles.profileCard}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            <img src={user?.avatar || 'https://i.pravatar.cc/150?img=47'} alt="Profile" />
                            <button className={styles.editBtn}><FiCamera /></button>
                        </div>
                        <div className={styles.basicInfo}>
                            <h2>{user?.name}</h2>
                            <p>Patient ID: #{(user?.id || user?._id || '').substring(0, 8).toUpperCase()}</p>
                            <div className={styles.profileBadges}>
                                {user?.status === 'active' && <span className={styles.verified}>Verified Profile</span>}
                                <button className={styles.logoutBtnProfile} onClick={() => {
                                    dispatch(logout());
                                    dispatch(reset());
                                    window.location.href = '/login';
                                }}><FiLogOut /> Sign Out</button>
                            </div>
                        </div>
                    </div>

                    <form className={styles.formGrid} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label><FiUser /> Full Name</label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label><FiMail /> Email Address</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label><FiPhone /> Phone Number</label>
                            <input name="phone" type="text" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label><FiLock /> Password</label>
                            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" />
                        </div>
                        <button className={styles.saveBtn} type="submit" disabled={isLoading}>Save Changes</button>
                    </form>
                    {isError && <p style={{ color: 'red' }}>{message}</p>}
                </Card>

                <div className={styles.sideCol}>
                    <Card className={styles.healthCard}>
                        <h3>Health Profile</h3>
                        <div className={styles.infoRow}>
                            <span>Blood Group</span>
                            <strong>A+ Positive</strong>
                        </div>
                        <div className={styles.infoRow}>
                            <span>Allergies</span>
                            <strong>Penicillin</strong>
                        </div>
                        <div className={styles.infoRow}>
                            <span>Height</span>
                            <strong>165 cm</strong>
                        </div>
                        <div className={styles.infoRow}>
                            <span>Weight</span>
                            <strong>62 kg</strong>
                        </div>
                        <button className={styles.editHealth}>Update Records</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;