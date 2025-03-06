import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/send-otp",
        { email }
      );
      if (response.data.success) {
        alert("OTP sent to your email!");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP!");
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        { email, otp }
      );
      if (response.data.success) {
        alert("OTP verified! You can now sign up.");
        setOtpVerified(true);
      } else {
        alert("Invalid OTP! Try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP!");
    }
  };

  // Function to handle signup after OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify OTP first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, password, email }
      );
      if (response.data) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!otpSent && (
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        )}
        {otpSent && !otpVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="button" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={!otpVerified}
        />
        <button type="submit" disabled={!otpVerified}>
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
