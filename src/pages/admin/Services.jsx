import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';
import { getServices, createService, updateService, deleteService } from '../../store/serviceSlice';

const CATEGORIES = ['Healthcare', 'Home Services', 'Pest Control', 'Other'];

const emptyForm = {
    name: '',
    category: 'Healthcare',
    description: '',
    price: '',
    duration: '',
    status: 'active'
};

const AdminServices = () => {
    const dispatch = useDispatch();
    const { services, isLoading, isError, message } = useSelector((state) => state.services);

    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);

    const displayServices = services.filter(s => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (s.name && s.name.toLowerCase().includes(q)) ||
            (s.category && s.category.toLowerCase().includes(q)) ||
            (s.description && s.description.toLowerCase().includes(q));
    });

    const openAddModal = () => {
        setEditingService(null);
        setForm(emptyForm);
        setSubmitError('');
        setModalOpen(true);
    };

    const openEditModal = (s) => {
        setEditingService(s);
        setForm({
            name: s.name || '',
            category: s.category || 'Healthcare',
            description: s.description || '',
            price: s.price ?? '',
            duration: s.duration || '',
            status: s.status || 'active'
        });
        setSubmitError('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingService(null);
        setForm(emptyForm);
        setSubmitError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!form.name?.trim() || !form.category || (form.price !== 0 && !form.price)) {
            setSubmitError('Name, category and price are required.');
            return;
        }
        try {
            if (editingService) {
                await dispatch(updateService({
                    id: editingService.id || editingService._id,
                    service: {
                        name: form.name.trim(),
                        category: form.category,
                        description: form.description.trim(),
                        price: Number(form.price),
                        duration: form.duration.trim(),
                        status: form.status
                    }
                })).unwrap();
            } else {
                await dispatch(createService({
                    name: form.name.trim(),
                    category: form.category,
                    description: form.description.trim(),
                    price: Number(form.price),
                    duration: form.duration.trim(),
                    status: form.status
                })).unwrap();
            }
            closeModal();
        } catch (err) {
            setSubmitError(err?.message || err || 'Request failed');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            dispatch(deleteService(id));
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Platform Services</h1>
                    <p style={{ color: '#64748b', fontSize: '13px' }}>Manage multi-vertical service catalogs and pricing.</p>
                </div>
                <button
                    type="button"
                    onClick={openAddModal}
                    style={{ background: '#064e3b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}
                >
                    <FiPlus /> Add New Service
                </button>
            </header>

            <Card style={{ padding: '24px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '12px 40px', border: '1px solid #e2e8f0', borderRadius: '10px', outline: 'none', fontSize: '14px' }}
                        />
                    </div>
                </div>

                {isError && message && <p style={{ color: 'red', marginBottom: '12px' }}>{message}</p>}
                {isLoading ? (
                    <p>Loading services...</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                <th style={{ padding: '16px', color: '#64748b', fontSize: '11px', letterSpacing: '0.05em', fontWeight: '700' }}>SERVICE NAME</th>
                                <th style={{ padding: '16px', color: '#64748b', fontSize: '11px', letterSpacing: '0.05em', fontWeight: '700' }}>VERTICAL</th>
                                <th style={{ padding: '16px', color: '#64748b', fontSize: '11px', letterSpacing: '0.05em', fontWeight: '700' }}>BASE PRICE</th>
                                <th style={{ padding: '16px', color: '#64748b', fontSize: '11px', letterSpacing: '0.05em', fontWeight: '700' }}>STATUS</th>
                                <th style={{ padding: '16px', color: '#64748b', fontSize: '11px', letterSpacing: '0.05em', fontWeight: '700' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayServices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                                        {services.length === 0 ? 'No services yet. Add one to get started.' : 'No services match your search.'}
                                    </td>
                                </tr>
                            ) : (
                                displayServices.map(s => (
                                    <tr key={s.id || s._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '16px', fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{s.name}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ background: '#f1f5f9', color: '#1e293b', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>{s.category}</span>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: '700', color: '#064e3b', fontSize: '14px' }}>₹{s.price}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ color: s.status === 'active' ? '#10b981' : '#ef4444', fontWeight: '800', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span> {s.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', gap: '12px', color: '#94a3b8' }}>
                                                <FiEdit2 style={{ cursor: 'pointer' }} onClick={() => openEditModal(s)} title="Edit" />
                                                <FiTrash2 style={{ cursor: 'pointer' }} onClick={() => handleDelete(s.id || s._id)} title="Delete" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </Card>

            {modalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={closeModal}>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '440px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                            <button type="button" onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}><FiX size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Service Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Dental Consultation" style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />

                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Category *</label>
                            <select name="category" value={form.category} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>

                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description" rows={2} style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Price (₹) *</label>
                                    <input name="price" type="number" min={0} step={1} value={form.price} onChange={handleChange} required placeholder="0" style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Duration</label>
                                    <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 30 mins" style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>

                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' }}>Status</label>
                            <select name="status" value={form.status} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            {submitError && <p style={{ color: 'red', fontSize: '13px', marginBottom: '12px' }}>{submitError}</p>}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '10px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#064e3b', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>{editingService ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
