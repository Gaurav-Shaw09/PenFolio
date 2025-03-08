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
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove stored username
    localStorage.removeItem("token"); // If using a token-based authentication system
    navigate("/login"); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      {/* ✅ Navbar */}
      <nav style={styles.navbar}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
        <div style={styles.navCenter}>
          <span style={styles.navLink} onClick={() => navigate('/home')}>Home</span>
          <span style={styles.navLink} onClick={() => navigate('/about')}>About Us</span>
          <span style={styles.navLink} onClick={() => navigate('/contact')}>Contact Us</span>
          <button
            onClick={handleLogout}
            style={{ ...styles.button, backgroundColor: "#f44336" }}
          >
            Logout
          </button>
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

      {/* ✅ Footer Added Here */}
      <footer style={styles.footer}>
        © 2025 MyApp. All rights reserved.
      </footer>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: '#f4f4f4',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
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
  navCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    flex: 1, // Pushes items to center
  },
  navLink: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4facfe',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
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
  status: {
    marginTop: '10px',
    color: 'green',
  },
  footer: {
    background: '#01579b', // Deep blue footer
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    fontSize: '16px',
    position: 'absolute',
    bottom: 70,
    width: '100%',
  },
};

export default Contact;
