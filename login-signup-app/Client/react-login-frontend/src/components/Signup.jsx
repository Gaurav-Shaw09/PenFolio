import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic info, 2: OTP, 3: Complete registration
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/send-otp", { 
        email: formData.email 
      });
      if (response.data.success) {
        setSuccess("OTP sent to your email!");
        setOtpSent(true);
        setCurrentStep(2);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", { 
        email: formData.email, 
        otp: formData.otp 
      });
      if (response.data.success) {
        setSuccess("OTP verified successfully!");
        setOtpVerified(true);
        setCurrentStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError("Please verify OTP first.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role
      });
      if (response.data) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" fill="#4F46E5"/>
              <path d="M12 6V18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="white"/>
            </svg>
            <h1>Create Account</h1>
          </div>
          <p className="subtitle">Join our community today</p>
        </div>

        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Basic Info</div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Verify Email</div>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Complete</div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {currentStep === 1 && (
            <>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="     Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#6B7280" strokeWidth="2"/>
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="#6B7280" strokeWidth="2"/>
                </svg>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="     Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" strokeWidth="2"/>
                  <path d="M22 6L12 13L2 6" stroke="#6B7280" strokeWidth="2"/>
                </svg>
              </div>

              <button 
                type="button" 
                className="auth-button" 
                onClick={handleSendOtp}
                disabled={isLoading || !formData.email || !formData.username}
              >
                {isLoading ? <div className="spinner"></div> : 'Send OTP'}
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="otp-notice">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4F46E5" strokeWidth="2"/>
                  <path d="M12 8V12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 16H12.01" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>We've sent a 6-digit code to <strong>{formData.email}</strong>. Please check your inbox.</p>
              </div>

              <div className="input-group">
                <label htmlFor="otp">Verification Code</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength="6"
                />
              </div>

              <div className="action-buttons">
                <button 
                  type="button" 
                  className="secondary-button"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className="auth-button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading || formData.otp.length < 6}
                >
                  {isLoading ? <div className="spinner"></div> : 'Verify OTP'}
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="input-group">
                <label htmlFor="role">Account Type</label>
                <select 
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="role-select"
                >
                  <option value="USER">Standard User</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>

              <div className="action-buttons">
                <button 
                  type="button" 
                  className="secondary-button"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="auth-button"
                  disabled={isLoading || !formData.password}
                >
                  {isLoading ? <div className="spinner"></div> : 'Complete Registration'}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Sign in
          </a>
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
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .auth-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 480px;
          animation: fadeIn 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        
        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(to right, #4F46E5, #06B6D4);
        }
        
        .auth-header {
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
        
        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          position: relative;
        }
        
        .progress-steps::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 2px;
          background: #E5E7EB;
          z-index: 1;
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E5E7EB;
          color: #6B7280;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-bottom: 8px;
          transition: all 0.3s;
        }
        
        .step.active .step-number {
          background: #4F46E5;
          color: white;
        }
        
        .step-label {
          font-size: 12px;
          color: #9CA3AF;
          font-weight: 500;
        }
        
        .step.active .step-label {
          color: #4F46E5;
        }
        
        .auth-form {
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
          padding: 12px 16px;
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
        
        .role-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
          background-color: #F9FAFB;
          appearance: none;
          -webkit-appearance: none;
        }
        
        .role-select:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          background-color: white;
        }
        
        .auth-button {
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
          width: 100%;
        }
        
        .auth-button:hover {
          background: #4338CA;
        }
        
        .auth-button:active {
          transform: scale(0.98);
        }
        
        .auth-button:disabled {
          background: #E5E7EB;
          cursor: not-allowed;
        }
        
        .secondary-button {
          background: white;
          color: #4F46E5;
          border: 1px solid #E5E7EB;
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
          flex: 1;
        }
        
        .secondary-button:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        .auth-footer {
          text-align: center;
          font-size: 14px;
          color: #6B7280;
          margin-top: 20px;
        }
        
        .auth-footer a {
          color: #4F46E5;
          font-weight: 500;
          text-decoration: none;
        }
        
        .auth-footer a:hover {
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
        
        .success-message {
          background: #D1FAE5;
          color: #065F46;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .otp-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #EFF6FF;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        .otp-notice svg {
          min-width: 20px;
          height: 20px;
          margin-top: 2px;
        }
        
        .otp-notice p {
          margin: 0;
          font-size: 14px;
          color: #1E40AF;
        }
      `}</style>
    </div>
  );
}

export default Signup;