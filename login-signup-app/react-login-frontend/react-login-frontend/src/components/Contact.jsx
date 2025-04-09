import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Contact({ isDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:8080/contact', formData);
      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      style={{
        ...styles.container,
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: isDarkMode ? '#e2e8f0' : '#1e293b'
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        style={styles.formContainer}
        variants={itemVariants}
      >
        <motion.h2 
          style={{
            ...styles.title,
            color: isDarkMode ? '#e2e8f0' : '#1e293b'
          }}
          variants={itemVariants}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          style={{
            ...styles.subtitle,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
          }}
          variants={itemVariants}
        >
          Have questions or feedback? We'd love to hear from you.
        </motion.p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <motion.div 
            style={styles.inputGroup}
            variants={itemVariants}
          >
            <div style={styles.iconWrapper}>
              <FiUser style={styles.icon} />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                '::placeholder': {
                  color: isDarkMode ? 'rgba(226, 232, 240, 0.5)' : 'rgba(30, 41, 59, 0.5)'
                }
              }}
            />
          </motion.div>

          <motion.div 
            style={styles.inputGroup}
            variants={itemVariants}
          >
            <div style={styles.iconWrapper}>
              <FiMail style={styles.icon} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                '::placeholder': {
                  color: isDarkMode ? 'rgba(226, 232, 240, 0.5)' : 'rgba(30, 41, 59, 0.5)'
                }
              }}
            />
          </motion.div>

          <motion.div 
            style={styles.inputGroup}
            variants={itemVariants}
          >
            <div style={styles.iconWrapper}>
              <FiMessageSquare style={styles.icon} />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                ...styles.textarea,
                background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                '::placeholder': {
                  color: isDarkMode ? 'rgba(226, 232, 240, 0.5)' : 'rgba(30, 41, 59, 0.5)'
                }
              }}
            />
          </motion.div>

          <motion.button
            type="submit"
            style={{
              ...styles.submitButton,
              background: isDarkMode ? '#818cf8' : '#6366f1'
            }}
            whileHover={{ 
              scale: 1.03,
              background: isDarkMode ? '#6366f1' : '#4f46e5'
            }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            variants={itemVariants}
          >
            {isSubmitting ? (
              <div style={styles.spinner}></div>
            ) : (
              <>
                <FiSend style={{ marginRight: '8px' }} />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        {status && (
          <motion.p 
            style={{
              ...styles.status,
              color: status.includes('success') ? 
                (isDarkMode ? '#86efac' : '#16a34a') : 
                (isDarkMode ? '#fca5a5' : '#dc2626')
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
    transition: 'background-color 0.3s ease, color 0.3s ease'
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.1)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '12px',
    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    position: 'relative',
    width: '100%'
  },
  iconWrapper: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(99, 102, 241, 0.7)'
  },
  icon: {
    fontSize: '20px'
  },
  input: {
    width: '100%',
    padding: '14px 20px 14px 48px',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  textarea: {
    width: '100%',
    padding: '14px 20px 14px 48px',
    borderRadius: '8px',
    fontSize: '1rem',
    minHeight: '150px',
    resize: 'vertical',
    outline: 'none',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  submitButton: {
    padding: '14px 24px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite'
  },
  status: {
    marginTop: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  }
};

export default Contact;