import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiStar, FiSearch, FiFilter, FiTrash2, FiMessageCircle, FiUser } from 'react-icons/fi';
import { getAdminReviews } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const AdminReviews = () => {
    const dispatch = useDispatch();
    const { allReviews: reviews, isLoading } = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAdminReviews());
    }, [dispatch]);

    return (
        <div className={styles.dashboard} style={{ padding: '24px' }}>
            <header className={styles.dashHeader} style={{ marginBottom: '32px' }}>
                <div>
                    <h1 className={styles.dashTitle} style={{ fontSize: '20px', fontWeight: '800' }}>User Feedback & Reviews</h1>
                    <p className={styles.dashSubtitle} style={{ fontSize: '13px' }}>Manage customer reviews, ratings, and platform reputation.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn} style={{ fontSize: '13px' }}><FiFilter /> Filters</button>
                </div>
            </header>

            <Card className={styles.mainCard} style={{ borderRadius: '16px' }}>
                <div className={styles.cardHeader} style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Recent Reviews</h3>
                    <div style={{ position: 'relative' }}>
                        <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }} />
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            style={{ padding: '8px 8px 8px 32px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.tableResponsive}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th>Review ID</th>
                                <th>Customer & Provider</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {reviews.map((rev) => (
                                <tr key={rev.id}>
                                    <td style={{ fontWeight: '700', color: '#64748b' }}>{rev.id}</td>
                                    <td>
                                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{rev.customer}</div>
                                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>to {rev.provider} ({rev.vertical})</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '800' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar key={i} fill={i < rev.rating ? 'currentColor' : 'none'} color={i < rev.rating ? '#fbbf24' : '#e2e8f0'} />
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: '250px' }}>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#475569', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{rev.comment}"</p>
                                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{rev.date}</span>
                                    </td>
                                    <td>
                                        <span style={{
                                            background: rev.status === 'Published' ? '#f0fdf4' : '#fef2f2',
                                            color: rev.status === 'Published' ? '#10b981' : '#ef4444',
                                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700'
                                        }}>
                                            {rev.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 0 }} title="Reply"><FiMessageCircle size={16} /></button>
                                            <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }} title="Delete/Hide"><FiTrash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminReviews;
