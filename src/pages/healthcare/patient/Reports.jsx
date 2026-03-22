import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/common/Card/Card';
import { FiFileText, FiDownload, FiUploadCloud, FiSearch } from 'react-icons/fi';
import { getReports, uploadReport } from '../../../store/reportSlice';
import api from '../../../services/api';
import styles from './Reports.module.css';

const Reports = () => {
    const dispatch = useDispatch();
    const { reports, isLoading, isError, message } = useSelector(state => state.reports);
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [doctor, setDoctor] = useState('');

    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);

    const filtered = (reports || []).filter(r =>
        (r?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (r?.doctor?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleUpload = () => {
        if (!file || !name) {
            alert('Please select a file and give it a name');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        if (doctor) formData.append('doctor', doctor);
        dispatch(uploadReport(formData));
        setFile(null);
        setName('');
        setDoctor('');
    };

    const handleDownload = async (report) => {
        const res = await api.get(`/reports/${report.id}/download`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', report.name);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Medical Reports</h1>
                    <p>Securely access and manage your medical history.</p>
                </div>
                <div>
                    <input type="text" placeholder="Report name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Doctor (optional)" value={doctor} onChange={e => setDoctor(e.target.value)} />
                    <label className={styles.fileUploadLabel}>
                        <FiFileText />
                        <span>{file ? file.name : 'Select Document'}</span>
                        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                    <button className={styles.btnUpload} onClick={handleUpload}><FiUploadCloud /> Upload</button>
                </div>
            </header>

            <div className={styles.searchBar}>
                <FiSearch />
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by report name or doctor..." />
            </div>

            {isLoading && <p>Loading reports...</p>}
            {isError && <p style={{ color: 'red' }}>{message}</p>}

            <div className={styles.reportGrid}>
                {(filtered.length ? filtered : (reports || [])).map(r => (
                    <Card key={r.id} className={styles.reportCard}>
                        <div className={styles.iconBox}>
                            <FiFileText />
                        </div>
                        <div className={styles.details}>
                            <h3>{r.name}</h3>
                            <p>Provided by <span>{r.doctor || 'Unknown'}</span></p>
                            <div className={styles.meta}>
                                {new Date(r.createdAt).toLocaleDateString()} • {r.fileType} • {Math.round(r.fileSize / 1024)} KB
                            </div>
                        </div>
                        <button className={styles.downloadBtn} title="Download" onClick={() => handleDownload(r)}><FiDownload /></button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Reports;
