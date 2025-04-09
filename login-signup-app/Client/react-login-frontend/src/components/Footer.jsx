import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageSquare, FiMail, FiTwitter, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

const Footer = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialLinks = [
    { icon: <FiTwitter />, link: 'https://twitter.com', name: 'Twitter' },
    { icon: <FiInstagram />, link: 'https://instagram.com', name: 'Instagram' },
    { icon: <FiLinkedin />, link: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <FiGithub />, link: 'https://github.com', name: 'GitHub' }
  ];

  const exploreLinks = ['Home', 'Featured', 'About', 'Contact'];
  const resourceLinks = ['Blog Tips', 'Community Guidelines', 'Privacy Policy', 'Service Terms'];

  return (
    <motion.footer 
      style={{
        ...styles.footer,
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderTop: isDarkMode 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid rgba(0, 0, 0, 0.1)'
      }}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div style={styles.footerContainer}>
        {/* Main Content */}
        <motion.div 
          style={styles.footerContent}
          variants={footerVariants}
        >
          {/* Brand Section */}
          <motion.div 
            style={styles.footerSection}
            variants={itemVariants}
          >
            <motion.h3 
              style={{
                ...styles.footerLogo,
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                margin: '0 auto',
                textAlign: 'center'
              }}
              whileHover={{ scale: 1.02 }}
            >
              📝PenFolio
            </motion.h3>
            <p style={{
              ...styles.footerText,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)',
              textAlign: 'center'
            }}>
              Your gateway to inspiring stories and creative ideas.
            </p>
            <div style={{
              ...styles.socialIcons,
              justifyContent: 'center'
            }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...styles.socialIcon,
                    color: isDarkMode ? '#e2e8f0' : '#1e293b'
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2, 
                    color: isDarkMode ? '#818cf8' : '#6366f1',
                    y: -5
                  }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredItem(social.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            style={{
              ...styles.footerSection,
              alignItems: 'center'
            }}
            variants={itemVariants}
          >
            <h4 style={{
              ...styles.footerHeading,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
              textAlign: 'center',
              ':after': {
                left: '50%',
                transform: 'translateX(-50%)',
                background: isDarkMode 
                  ? 'linear-gradient(to right, #818cf8, transparent)' 
                  : 'linear-gradient(to right, #6366f1, transparent)'
              }
            }}>
              Explore
            </h4>
            <ul style={{
              ...styles.footerList,
              alignItems: 'center'
            }}>
              {exploreLinks.map((item, index) => (
                <motion.li
                  key={index}
                  style={{
                    ...styles.footerListItem,
                    textAlign: 'center'
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 5, 
                    color: isDarkMode ? '#818cf8' : '#6366f1',
                    transition: { duration: 0.2 }
                  }}
                >
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    style={{
                      ...styles.footerLink,
                      color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
                    }}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            style={{
              ...styles.footerSection,
              alignItems: 'center'
            }}
            variants={itemVariants}
          >
            <h4 style={{
              ...styles.footerHeading,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
              textAlign: 'center',
              ':after': {
                left: '50%',
                transform: 'translateX(-50%)',
                background: isDarkMode 
                  ? 'linear-gradient(to right, #818cf8, transparent)' 
                  : 'linear-gradient(to right, #6366f1, transparent)'
              }
            }}>
              Resources
            </h4>
            <ul style={{
              ...styles.footerList,
              alignItems: 'center'
            }}>
              {resourceLinks.map((item, index) => (
                <motion.li
                  key={index}
                  style={{
                    ...styles.footerListItem,
                    textAlign: 'center'
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 5, 
                    color: isDarkMode ? '#818cf8' : '#6366f1',
                    transition: { duration: 0.2 }
                  }}
                >
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    style={{
                      ...styles.footerLink,
                      color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
                    }}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            style={{
              ...styles.footerSection,
              alignItems: 'center'
            }}
            variants={itemVariants}
          >
            <h4 style={{
              ...styles.footerHeading,
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
              textAlign: 'center',
              ':after': {
                left: '50%',
                transform: 'translateX(-50%)',
                background: isDarkMode 
                  ? 'linear-gradient(to right, #818cf8, transparent)' 
                  : 'linear-gradient(to right, #6366f1, transparent)'
              }
            }}>
              Stay Updated
            </h4>
            <p style={{
              ...styles.footerText,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)',
              textAlign: 'center'
            }}>
              Subscribe to our newsletter for the latest posts and updates.
            </p>
            <form 
              onSubmit={handleSubscribe} 
              style={{
                ...styles.newsletterForm,
                alignItems: 'center'
              }}
            >
              <motion.div
                style={{
                  ...styles.inputWrapper,
                  margin: '0 auto'
                }}
                whileFocus={{ scale: 1.02 }}
              >
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    ...styles.newsletterInput,
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.2)' 
                      : '1px solid rgba(0, 0, 0, 0.2)',
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    color: isDarkMode ? '#e2e8f0' : '#1e293b',
                    ':focus': {
                      borderColor: isDarkMode ? '#818cf8' : '#6366f1',
                      boxShadow: isDarkMode 
                        ? '0 0 0 2px rgba(129, 140, 248, 0.2)' 
                        : '0 0 0 2px rgba(99, 102, 241, 0.2)'
                    }
                  }}
                  required
                />
                {email && (
                  <motion.button
                    type="button"
                    style={{
                      ...styles.clearButton,
                      color: isDarkMode ? 'rgba(226, 232, 240, 0.5)' : 'rgba(30, 41, 59, 0.5)'
                    }}
                    onClick={() => setEmail('')}
                    whileHover={{ scale: 1.1, color: isDarkMode ? '#818cf8' : '#6366f1' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                )}
              </motion.div>
              <motion.button
                type="submit"
                style={{
                  ...styles.newsletterButton,
                  backgroundColor: isDarkMode ? '#818cf8' : '#6366f1',
                  color: '#ffffff',
                  margin: '0 auto'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: isDarkMode ? '#6366f1' : '#4f46e5'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {subscribed ? (
                  <>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Subscribed!
                    </motion.span>
                    <motion.span 
                      style={{ marginLeft: '8px' }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      ✓
                    </motion.span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          style={{
            ...styles.footerBottom,
            borderTop: isDarkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.1)'
          }}
          variants={itemVariants}
        >
          <p style={{
            ...styles.footerBottomText,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)',
            textAlign: 'center'
          }}>
            © {new Date().getFullYear()} Penfolio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

const styles = {
  footer: {
    padding: '60px 0 30px',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.1)',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '50px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      textAlign: 'center',
      gap: '40px'
    }
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  footerLogo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: 0,
    cursor: 'default',
    width: 'fit-content',
  },
  footerText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: 0,
  },
  socialIcons: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
  },
  socialIcon: {
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerHeading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '20px',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '10px',
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      width: '50px',
      height: '3px',
      borderRadius: '3px',
    },
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerListItem: {
    margin: 0,
    transition: 'all 0.3s ease',
  },
  footerLink: {
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '0px',
    width: '100%',
    maxWidth: '300px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  newsletterInput: {
    padding: '12px 20px',
    borderRadius: '30px',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0 5px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },
  newsletterButton: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  footerBottomText: {
    fontSize: '0.9rem',
    margin: 0,
  },
};

export default Footer;