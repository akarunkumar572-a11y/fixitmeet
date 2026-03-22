import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiMail, FiLock } from 'react-icons/fi';
import { login, otpLogin } from '../../store/authSlice';
import './Login.css';

const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [isOtpMode, setIsOtpMode] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateBasedOnRole = (user) => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'pro':
        // Healthcare professionals (Doctors, Nurses with specialization)
        if (user.specialization) return '/hc/doctor/dashboard';
        // General Service Providers
        return '/sr/provider/dashboard';
      case 'patient':
      default:
        // Default patient/user to healthcare for now, or check logical vertical
        return '/hc/patient/dashboard';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isOtpMode) {
      // verify OTP using thunk
      try {
        const result = await dispatch(otpLogin({ mobile, code: otp })).unwrap();
        navigate(navigateBasedOnRole(result));
      } catch (err) {
        setMessage(err);
      }
    } else {
      try {
        const result = await dispatch(login({ email, password })).unwrap();
        navigate(navigateBasedOnRole(result));
      } catch (err) {
        setMessage(err?.message || err);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-glow"></div>
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h2>Welcome <span className="gold-text">Back</span></h2>
          <p>Sign in to your FixitMeet account</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {isOtpMode ? (
            <>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="text"
                  placeholder="Mobile number"
                  className="form-input with-icon"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="text"
                  placeholder="OTP code"
                  className="form-input with-icon"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await fetch(`${apiBase}/auth/otp/request`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ mobile })
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
                      setMessage('OTP sent to your mobile');
                    } catch (err) {
                      setMessage(err?.message || 'Failed to send OTP');
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '13px' }}
                >
                  Send OTP
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input with-icon"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input with-icon"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="auth-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-primary auth-submit">Log In</button>
          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <button type="button" onClick={() => setIsOtpMode(!isOtpMode)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>
              {isOtpMode ? 'Use email/password' : 'Login with mobile OTP'}
            </button>
          </div>
          {message && <p style={{ color: 'red', marginTop: '8px' }}>{typeof message === 'string' ? message : message?.message || 'Error'}</p>}
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="gold-text">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;