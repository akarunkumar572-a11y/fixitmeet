import React from 'react';
import { FiUser, FiBell, FiMapPin, FiCreditCard, FiLock } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';

const CustomerSettings = () => {
    return (
        <div style={{ padding: '32px' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#064e3b' }}>Account Preferences</h1>
                <p style={{ color: '#64748b' }}>Manage your booking addresses, notification preferences and personal information.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                <FiUser />
                            </div>
                            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Personal Details</h2>
                        </div>
                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>FULL NAME</label>
                                <input type="text" placeholder="John Doe" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>EMAIL ADDRESS</label>
                                <input type="email" placeholder="john@example.com" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>MOBILE NUMBER</label>
                                <input type="text" placeholder="+91 XXXX XXXX" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>PRIMARY CITY</label>
                                <input type="text" placeholder="Mumbai" style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
                            </div>
                        </div>
                        <button style={{ marginTop: '32px', background: '#059669', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                            Save Profile
                        </button>
                    </Card>

                    <Card style={{ padding: '32px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                <FiMapPin />
                            </div>
                            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Saved Addresses</h2>
                        </div>
                         <div style={{ border: '1px dashed #cbd5e1', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
                            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>You haven't added any secondary addresses yet.</p>
                            <button style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                                + Add New Address
                            </button>
                         </div>
                    </Card>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Card style={{ padding: '24px' }}>
                         <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiBell color="#059669" /> Communications
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Select the types of messages you want to receive.</p>
                        {['Email Notifications', 'SMS Updates', 'WhatsApp Notifications', 'Promotional SMS'].map(opt => (
                            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked />
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>{opt}</span>
                            </label>
                        ))}
                    </Card>

                     <Card style={{ padding: '24px' }}>
                         <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FiLock color="#dc2626" /> Security
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>Manage your password and active login sessions.</p>
                        <button style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                            Change Password
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CustomerSettings;
