import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTool, FiZap, FiFilter, FiHeart, FiSettings, FiActivity, FiShield, FiCheckCircle, FiTruck, FiUserPlus, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../store/serviceSlice';
import './Services.css';

const CATEGORY_ICONS = {
  'Healthcare': FiActivity,
  'Home Services': FiTool,
  'Pest Control': FiShield,
  'Other': FiSettings
};

const FALLBACK_GROUPS = [
  {
    category: 'Healthcare & Doctors',
    description: 'Book verified doctors, specialists, and at-home medical support.',
    services: [
      { _id: 'h1', name: 'General Physician', description: 'Consult with top-rated physicians for general checkups and illnesses.' },
      { _id: 'h2', name: 'Dentist', description: 'Expert dental care, cleaning, and surgeries near you.' },
      { _id: 'h3', name: 'At-home Nursing', description: 'Trusted at-home care, nursing services, and physical therapy on demand.' },
      { _id: 'h4', name: 'Pediatrician', description: 'Specialized healthcare for infants, children, and adolescents.' },
    ]
  },
  {
    category: 'Home Services',
    description: 'Find trusted professionals for your everyday home needs.',
    services: [
      { _id: 's1', name: 'Plumbing', description: 'Expert plumbing repairs, leaky faucets, pipe installations, and bathroom setups.' },
      { _id: 's2', name: 'Electrical', description: 'Safe and certified electricians for wiring, panel upgrades, and lighting.' },
      { _id: 's3', name: 'Deep Cleaning', description: 'Professional residential and commercial deep cleaning for sparkling spaces.' },
      { _id: 's4', name: 'Home Repair', description: 'Handyman services for quick fixes, custom carpentry, and general maintenance.' },
    ]
  },
  {
    category: 'Pest Control',
    description: 'Eliminate pests safely and effectively from your home or business.',
    services: [
      { _id: 'p1', name: 'Termite Control', description: 'Comprehensive termite inspection, treatment, and structural protection.' },
      { _id: 'p2', name: 'General Pest', description: 'Keep your home free of ants, roaches, spiders, and common bugs.' },
      { _id: 'p3', name: 'Rodent Control', description: 'Safe, ethical, and highly effective rat and mice removal services.' },
      { _id: 'p4', name: 'Bed Bug Treatment', description: 'Specialized intensive treatments to completely eliminate bed bugs.' },
    ]
  }
];

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services: apiServices, isLoading } = useSelector((state) => state.services);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const activeServices = useMemo(() => (Array.isArray(apiServices) ? apiServices.filter(s => s.status !== 'inactive') : []), [apiServices]);

  const groupedFromApi = useMemo(() => {
    if (activeServices.length === 0) return null;
    const byCategory = {};
    activeServices.forEach(s => {
      const cat = s.category || 'Other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(s);
    });
    return Object.entries(byCategory).map(([category, services]) => ({
      category,
      description: `Book ${category.toLowerCase()} from verified professionals.`,
      services
    }));
  }, [activeServices]);

  const groups = groupedFromApi || FALLBACK_GROUPS;

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    const q = search.toLowerCase();
    return groups.map(grp => ({
      ...grp,
      services: grp.services.filter(s =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (grp.category && grp.category.toLowerCase().includes(q))
      )
    })).filter(grp => grp.services.length > 0);
  }, [groups, search]);

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="bg-glow"></div>
        <h1>Explore Our <span className="gold-text">Services</span></h1>
        <p>Find specialized experts across all our service verticals</p>

        <div className="services-discovery">
          <div className="discovery-search">
            <FiSearch className="search-icon-svc" />
            <input
              type="text"
              placeholder="Search services (e.g. AC Repair, Dentist)..."
              className="svc-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {isLoading && activeServices.length === 0 && (
        <section className="services-list-section">
          <p style={{ textAlign: 'center', color: '#64748b' }}>Loading services...</p>
        </section>
      )}

      <section className="services-list-section">
        {filteredGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="service-group">
            <div className="group-header">
              <h2>{group.category}</h2>
              <p>{group.description}</p>
            </div>
            <div className="services-grid-large">
              {group.services.map(service => {
                const Icon = CATEGORY_ICONS[group.category] || FiCheckCircle;
                return (
                  <div key={service.id || service._id} className="service-card-large">
                    <div className="service-icon-large"><Icon /></div>
                    <div className="service-info-large">
                      <h3 className="service-title-large">{service.name}</h3>
                      <p className="service-desc-large">{service.description || ''}</p>
                      {typeof service.price === 'number' && <p style={{ fontSize: '14px', fontWeight: '700', color: '#064e3b', marginBottom: '8px' }}>₹{service.price}</p>}
                      <button type="button" className="btn-outline service-btn" onClick={() => navigate(`/hc/patient/book-now?service=${service.id || service._id}`)}>Book Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filteredGroups.length === 0 && !isLoading && (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>No services match your search.</p>
        )}
      </section>
    </div>
  );
};

export default Services;
