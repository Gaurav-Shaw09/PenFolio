import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f4f4', minHeight: '100vh', width: '100vw' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#4facfe',
        padding: '15px 50px',
        color: 'white',
        fontSize: '18px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
        <div>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>Home</span>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/about')}>About Us</span>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/contact')}>Contact Us</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingTop: '60px' // Adjust for fixed navbar
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '60%'
        }}>
          <h1 style={{ color: '#333' }}>Welcome, {username}!</h1>
          <p>This is your home page after successful login.</p>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              background: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#ff0000'}
            onMouseOut={(e) => e.target.style.background = '#ff4d4d'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        background: '#01579b', // Deep blue footer
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        fontSize: '16px',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
