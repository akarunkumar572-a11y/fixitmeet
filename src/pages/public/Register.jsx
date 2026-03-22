import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { register, reset } from '../../store/authSlice';
import './Login.css'; // Re-use the beautifully styled auth container
import './Register.css'; // Add any specific ones

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const navigateBasedOnRole = (user) => {
        if (!user) return '/login';
        switch (user.role) {
            case 'admin': return '/admin';
            case 'pro': return user.specialization ? '/hc/doctor/dashboard' : '/sr/provider/dashboard';
            default: return '/hc/patient/dashboard';
        }
    };

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            navigate(navigateBasedOnRole(user));
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            const userData = { name, email, password };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return (
            <div className="auth-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-bg-glow register-glow"></div>
            <div className="auth-card glass-card">
                <div className="auth-header">
                    <h2>Create <span className="gold-text">Account</span></h2>
                    <p>Join FixitMeet and find the best services</p>
                </div>

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="input-group">
                        <FiUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="form-input with-icon"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FiMail className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="form-input with-icon"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input with-icon"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-input with-icon"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-options">
                        <label className="checkbox-container">
                            <input type="checkbox" required />
                            <span className="checkmark"></span>
                            I agree to the <Link to="/terms" className="gold-text" style={{ marginLeft: '4px' }}>Terms</Link>
                        </label>
                    </div>

                    {isError && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

                    <button type="submit" className="btn-primary auth-submit">Sign Up</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="gold-text">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;