import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // ✅ Use navigate for routing like in About.js

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/contact', formData);

      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      {/* ✅ Navbar (Copied from About.js) */}
      <nav style={styles.navbar}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
        <div>
          <span style={styles.navLink} onClick={() => navigate('/home')}>Home</span>
          <span style={styles.navLink} onClick={() => navigate('/about')}>About Us</span>
          <span style={styles.navLink} onClick={() => navigate('/contact')}>Contact Us</span>
        </div>
      </nav>

      <div style={styles.formContainer}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}

// ✅ Same Navbar Styles as About.js
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: '#f4f4f4',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
  },
  navbar: {
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
    left: 0,
    zIndex: 1000,
  },
  navLink: {
    margin: '0 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  formContainer: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    marginTop: '100px', // To avoid navbar overlap
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
  },
  textarea: {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    background: '#4facfe',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  status: {
    marginTop: '10px',
    color: 'green',
  },
};

export default Contact;
