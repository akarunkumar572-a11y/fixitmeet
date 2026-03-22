import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import axios from 'axios';
import PublicLayout from './layouts/public/PublicLayout';
import Home from './pages/public/Home';
import LandingPage from './components/LandingPage';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Providers from './pages/public/Providers';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Partner from './pages/public/Partner';
import PartnerRegister from './pages/public/PartnerRegister';
import AIBooking from './pages/booking/AIBooking'; // New import for AI Booking
import AiAssistant from './components/AiAssistant';

// Admin & Professional & Patient layouts
import AdminLayout from './layouts/admin/MainLayout';
import HealthcareLayout from './layouts/healthcare/HealthcareLayout';
import ServicesLayout from './layouts/services/ServicesLayout';


// Page imports
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Bookings';
import AdminProviders from './pages/admin/Providers';
import AdminServices from './pages/admin/Services'; // New import for Admin Services
import ProApprovals from './pages/admin/ProApprovals'; // New import for Professional Approvals
import AdminBackup from './pages/admin/BackupRestore'; // New import for Backup & Restore
import HealthcareVertical from './pages/admin/HealthcareVertical';
import HomeServicesVertical from './pages/admin/HomeServicesVertical';
import PestControlVertical from './pages/admin/PestControlVertical';
import AdminSettings from './pages/admin/Settings';
import AdminReviews from './pages/admin/Reviews';
import AdminPayments from './pages/admin/Payments';
import AdminHelpCenter from './pages/admin/HelpCenter';

// Professional Pages (Healthcare)
import DoctorDashboard from './pages/healthcare/doctor/Dashboard';
import ProfessionalAppointments from './pages/healthcare/doctor/Appointments';
import ProfessionalPatients from './pages/healthcare/doctor/Patients';
import ProfessionalPrescriptions from './pages/healthcare/doctor/Prescriptions';

// Patient Pages (Healthcare)
import PatientDashboard from './pages/healthcare/patient/Dashboard';
import PatientBookings from './pages/healthcare/patient/Bookings';
import BookNow from './pages/healthcare/patient/BookNow';
import PatientReports from './pages/healthcare/patient/Reports';
import PatientProfile from './pages/healthcare/patient/Profile';
import UserWallet from './pages/healthcare/patient/Wallet';

// Partner Pages (Services)
import PartnerDashboard from './pages/services/partner/Dashboard';
import ProfessionalJobs from './pages/services/partner/Jobs';
import ProfessionalEarnings from './pages/services/partner/Earnings';

// Customer Pages (Services)
import CustomerDashboard from './pages/services/customer/Dashboard';
import CustomerBookings from './pages/services/customer/Bookings';
import CustomerProfile from './pages/services/customer/Profile';
import CustomerWallet from './pages/services/customer/Wallet';

// Global interceptor for JWT / SQL validation cache purging
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Placeholder common
const PlaceholderPage = ({ title, role }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1 style={{ color: role === 'patient' ? '#10b981' : '#064e3b' }}>{title}</h1>
    <p style={{ color: '#64748b' }}>This professional workspace is being synchronized with your profile.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'providers', element: <Providers /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'partner', element: <Partner /> },
      { path: 'partner-register', element: <PartnerRegister /> }, // New route for Partner Registration
      { path: 'provider', element: <Partner /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> }, // Added explicit dashboard path
      { path: 'services', element: <AdminServices /> }, // New route for Admin Services
      { path: 'healthcare', element: <HealthcareVertical /> },
      { path: 'home-services', element: <HomeServicesVertical /> },
      { path: 'pest-control', element: <PestControlVertical /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'approvals', element: <ProApprovals /> }, // New route for Professional Approvals
      { path: 'providers', element: <AdminProviders /> },
      { path: 'backup', element: <AdminBackup /> },
      { path: 'reviews', element: <AdminReviews /> },
      { path: 'payments', element: <AdminPayments /> },
      { path: 'help-center', element: <AdminHelpCenter /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    path: '/booking',
    children: [
      { path: 'ai', element: <AIBooking /> },
    ],
  },
  {
    path: '/hc', // Healthcare Module
    element: <HealthcareLayout />,
    children: [
      { path: 'doctor', children: [
          { index: true, element: <DoctorDashboard /> },
          { path: 'dashboard', element: <DoctorDashboard /> },
          { path: 'appointments', element: <ProfessionalAppointments /> },
          { path: 'patients', element: <ProfessionalPatients /> },
          { path: 'prescriptions', element: <ProfessionalPrescriptions /> },
          { path: 'teleconsult', element: <PlaceholderPage title="Live Teleconsultation Room" role="pro" /> },
          { path: 'profile', element: <PatientProfile /> },
          { path: 'settings', element: <PlaceholderPage title="Clinic Settings" role="pro" /> },
      ]},
      { path: 'patient', children: [
          { index: true, element: <PatientDashboard /> },
          { path: 'dashboard', element: <PatientDashboard /> },
          { path: 'bookings', element: <PatientBookings /> },
          { path: 'reports', element: <PatientReports /> },
          { path: 'wallet', element: <UserWallet /> },
          { path: 'profile', element: <PatientProfile /> },
          { path: 'book-now', element: <BookNow /> },
          { path: 'settings', element: <PlaceholderPage title="Account Settings" role="patient" /> },
      ]}
    ]
  },
  {
    path: '/sr', // Services Module
    element: <ServicesLayout />,
    children: [
      { path: 'provider', children: [
          { index: true, element: <PartnerDashboard /> },
          { path: 'dashboard', element: <PartnerDashboard /> },
          { path: 'jobs', element: <ProfessionalJobs /> },
          { path: 'earnings', element: <ProfessionalEarnings /> },
          { path: 'profile', element: <CustomerProfile /> },
      ]},
      { path: 'user', children: [
          { index: true, element: <CustomerDashboard /> },
          { path: 'dashboard', element: <CustomerDashboard /> },
          { path: 'bookings', element: <CustomerBookings /> },
          { path: 'wallet', element: <CustomerWallet /> },
          { path: 'profile', element: <CustomerProfile /> },
          { path: 'settings', element: <PlaceholderPage title="User Settings" role="patient" /> },
      ]}
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AiAssistant />
    </>
  );
}

export default App;