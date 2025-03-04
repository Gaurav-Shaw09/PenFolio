import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
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

      {/* Contact Form */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingTop: '80px' // Adjust for fixed navbar
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '50%',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#333' }}>Contact Us</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Your Name"
              required
              style={{ width: '80%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              style={{ width: '80%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <textarea
              placeholder="Your Message"
              required
              style={{ width: '80%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
            ></textarea>
            <button
              type="submit"
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                background: '#4facfe',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#3a8efc'}
              onMouseOut={(e) => e.target.style.background = '#4facfe'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
