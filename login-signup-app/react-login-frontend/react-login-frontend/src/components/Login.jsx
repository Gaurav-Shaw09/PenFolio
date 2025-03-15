import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            username,
            password
        });

        if (response.data.id) {  // ✅ Check if ID is present in response
            localStorage.setItem('userId', response.data.id);  // ✅ Store userId
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
            
            alert('Login successful!');
            navigate('/home');
        } else {
            alert('Login failed! Invalid credentials.');
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error);
        alert('Login failed!');
    }
};



  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(to right, #4facfe, #00f2fe)',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '350px',
        border: '2px solid #4facfe',
        animation: 'fadeIn 1s ease-in-out'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '10px',
              background: '#4facfe',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => e.target.style.background = '#00c6fb'}
            onMouseOut={(e) => e.target.style.background = '#4facfe'}
          >
            Login
          </button>
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/signup')} 
              style={{ cursor: 'pointer', color: '#4facfe', fontWeight: 'bold' }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;