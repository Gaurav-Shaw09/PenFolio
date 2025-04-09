import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      if (response.data.id) {
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
        
        // Success animation before navigation
        document.querySelector('.login-card').classList.add('success-animation');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      // Shake animation on error
      document.querySelector('.login-card').classList.add('shake-animation');
      setTimeout(() => {
        document.querySelector('.login-card').classList.remove('shake-animation');
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#4F46E5"/>
              <path d="M12 6V18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="white"/>
            </svg>
            <h1>Welcome Back</h1>
          </div>
          <p className="subtitle">Sign in to your account to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#6B7280" strokeWidth="2"/>
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.6055 17.5455 13.3575 18 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>
          <button className="social-button github">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.417 4.865 20.183 8.839 21.5C9.339 21.602 9.5 21.292 9.5 21.017C9.5 20.792 9.5 20.292 9.5 19.5C6.5 20.208 5.7 18.5 5.7 18.5C5.1 17.183 4.2 16.833 4.2 16.833C3.2 16.167 4.3 16.183 4.3 16.183C5.4 16.25 6 17.25 6 17.25C7 18.667 8.3 18.25 9.5 18C9.6 17.417 9.8 17 10 16.75C7.8 16.5 5.5 15.583 5.5 11.5C5.5 10.417 5.9 9.5 6.5 8.833C6.4 8.583 6 7.333 6.5 5.833C6.5 5.833 7.5 5.5 9.5 7C10.3 6.75 11.2 6.667 12 6.667C12.8 6.667 13.7 6.75 14.5 7C16.5 5.5 17.5 5.833 17.5 5.833C18 7.333 17.6 8.583 17.5 8.833C18.1 9.5 18.5 10.417 18.5 11.5C18.5 15.583 16.2 16.5 14 16.75C14.2 17.083 14.4 17.583 14.4 18.333C14.4 19.333 14.4 20.167 14.4 21.017C14.4 21.292 14.6 21.608 15.1 21.5C19.1 20.183 22 16.417 22 12.017C22 6.484 17.522 2 12 2Z" fill="#333"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
          100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
        
        @keyframes success {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 420px;
          animation: fadeIn 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(to right, #4F46E5, #06B6D4);
        }
        
        .login-card.shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        
        .login-card.success-animation {
          animation: success 0.5s ease-in-out;
        }
        
        .login-header {
          margin-bottom: 30px;
          text-align: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        
        .logo svg {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        
        .logo h1 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        
        .subtitle {
          color: #6B7280;
          font-size: 14px;
          margin: 0;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-group {
          position: relative;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        
        .input-group input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
          background-color: #F9FAFB;
        }
        
        .input-group input:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          background-color: white;
        }
        
        .input-icon {
          position: absolute;
          left: 12px;
          bottom: 12px;
          width: 20px;
          height: 20px;
        }
        
        .forgot-password {
          text-align: right;
          margin-top: -10px;
        }
        
        .forgot-password a {
          color: #6B7280;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .forgot-password a:hover {
          color: #4F46E5;
        }
        
        .login-button {
          background: #4F46E5;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
        }
        
        .login-button:hover {
          background: #4338CA;
        }
        
        .login-button:active {
          transform: scale(0.98);
        }
        
        .login-button:disabled {
          background: #E5E7EB;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 25px 0;
          color: #9CA3AF;
          font-size: 13px;
        }
        
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .divider::before {
          margin-right: 10px;
        }
        
        .divider::after {
          margin-left: 10px;
        }
        
        .social-login {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .social-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid #E5E7EB;
          background: white;
        }
        
        .social-button svg {
          width: 18px;
          height: 18px;
        }
        
        .social-button.google {
          color: #374151;
        }
        
        .social-button.google:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }
        
        .social-button.github {
          color: #374151;
        }
        
        .social-button.github:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }
        
        .signup-link {
          text-align: center;
          font-size: 14px;
          color: #6B7280;
        }
        
        .signup-link a {
          color: #4F46E5;
          font-weight: 500;
          text-decoration: none;
        }
        
        .signup-link a:hover {
          text-decoration: underline;
        }
        
        .error-message {
          background: #FEE2E2;
          color: #B91C1C;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Login;