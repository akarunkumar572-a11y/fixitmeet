import React from 'react';
import { FiSearch, FiMapPin, FiCpu } from 'react-icons/fi';
import styles from './HeroSearch.module.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HeroSearch = ({ activeTab }) => {
    const navigate = useNavigate();
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');

    const handleAISearch = () => {
        navigate('/booking/ai');
    };

    const getPlaceholder = () => {
        if (activeTab === 'healthcare') return 'Search Doctors, Clinics, Specialties...';
        if (activeTab === 'pest-control') return 'Search Bugs, Treatments, Inspectors...';
        return 'Search Plumbing, AC Repair, Cleaning...';
    };

    return (
        <div className={styles.searchRow}>
            <div className={styles.searchBox}>
                <div className={styles.inputGroup}>
                    <FiSearch className={styles.icon} />
                    <input
                        type="text"
                        placeholder={getPlaceholder()}
                        className={styles.searchInput}
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FiMapPin className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Zip code or City"
                        className={styles.searchInput}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.btnGroup}>
                <button
                    className={styles.searchBtn}
                    onClick={() => {
                        // basic navigate to services page with query parameters
                        const params = new URLSearchParams();
                        if (term) params.append('q', term);
                        if (location) params.append('loc', location);
                        if (activeTab) params.append('category', activeTab);
                        navigate(`/services?${params.toString()}`);
                    }}
                >
                    Search
                </button>
                <button className={styles.aiBtn} onClick={handleAISearch}>
                    <FiCpu className={styles.aiIcon} /> AI Match
                </button>
            </div>
        </div>
    );
};

export default HeroSearch;
