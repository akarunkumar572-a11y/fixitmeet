import React from 'react';
import { FiUser, FiTool, FiCheckCircle, FiStar, FiCamera, FiEdit3 } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';

const PartnerProfile = () => {
    return (
        <div style={{ padding: '32px' }}>
             <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#064e3b' }}>Professional Identity</h1>
                    <p style={{ color: '#64748b' }}>Showcase your skills and business details to customers.</p>
                </div>
                <button style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiEdit3 /> Edit Portfolio
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '40px', display: 'flex', gap: '32px', alignItems: 'center' }}>
                         <div style={{ position: 'relative' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f0fdf4', border: '4px solid #059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#059669', fontWeight: 'bold' }}>
                                AS
                            </div>
                            <button style={{ position: 'absolute', bottom: '0', right: '0', background: '#059669', color: 'white', border: '2px solid white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <FiCamera size={14} />
                            </button>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Amit Sharma</h2>
                                <FiCheckCircle color="#10b981" />
                            </div>
                            <p style={{ color: '#64748b', fontWeight: '600' }}>Licensed Professional Plumber & Electrician</p>
                            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '700' }}>★ 4.9 (124 Jobs)</div>
                                <div style={{ color: '#64748b' }}>Base: Mumbai Central</div>
                            </div>
                        </div>
                    </Card>

                    <Card style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiTool color="#059669" /> Skills & Services
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {['Leak Repair', 'New Wiring', 'System Diagnostics', 'MCB Installation', 'Pipe Fitting', 'AC Repair'].map(skill => (
                                <span key={skill} style={{ padding: '8px 16px', borderRadius: '50px', background: '#f1f5f9', color: '#475569', fontSize: '14px', fontWeight: '600' }}>{skill}</span>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Portfolio Highlights</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ aspectRatio: '1', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px' }}>Job Photo {i}</div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Performance Metrics</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Completion Rate</span>
                                <span style={{ fontWeight: '700', color: '#10b981' }}>98%</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Avg. Response Time</span>
                                <span style={{ fontWeight: '700' }}>15 Mins</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ color: '#64748b' }}>Recurring Customers</span>
                                <span style={{ fontWeight: '700' }}>42</span>
                             </div>
                        </div>
                    </Card>

                    <Card style={{ padding: '24px', background: '#0f172a', color: 'white', textAlign: 'center' }}>
                         <div style={{ margin: '0 auto 16px', width: '40px', height: '40px', borderRadius: '50%', background: '#fbbf24', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiStar /></div>
                         <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Top Rated Partner</h4>
                         <p style={{ fontSize: '12px', opacity: 0.7 }}>You are in the top 5% of service providers in your city. Maintain your rating to get extra visibility.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PartnerProfile;
