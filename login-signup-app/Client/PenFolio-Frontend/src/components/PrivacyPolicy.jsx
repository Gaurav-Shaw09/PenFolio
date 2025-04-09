import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const policySections = [
    {
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email, etc.)",
        "Account activity and usage data",
        "Device and connection information",
        "Cookies and similar tracking technologies"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our service",
        "To improve user experience",
        "To communicate with you",
        "For security and fraud prevention",
        "To comply with legal obligations"
      ]
    },
    {
      title: "Data Sharing & Disclosure",
      content: [
        "With service providers who assist our operations",
        "When required by law or legal process",
        "During business transfers (mergers/acquisitions)",
        "With your explicit consent"
      ]
    },
    {
      title: "Your Data Rights",
      content: [
        "Right to access your personal data",
        "Right to correct inaccurate information",
        "Right to request deletion of your data",
        "Right to restrict or object to processing",
        "Right to data portability"
      ]
    },
    {
      title: "Data Security",
      content: [
        "Industry-standard encryption protocols",
        "Regular security audits",
        "Limited access to personal data",
        "Secure server infrastructure",
        "Employee training on data protection"
      ]
    },
    {
      title: "International Data Transfers",
      content: [
        "Data may be transferred outside your country",
        "We ensure adequate protection measures",
        "Compliance with GDPR for EU citizens",
        "Standard contractual clauses where applicable"
      ]
    }
  ];

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
      {/* Header */}
      <header style={{
        ...styles.header,
        backgroundColor: isDarkMode ? '#1e293b' : 'white',
        boxShadow: isDarkMode 
          ? '0 2px 10px rgba(0, 0, 0, 0.2)'
          : '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)} 
          style={{
            ...styles.backButton,
            backgroundColor: isDarkMode ? '#334155' : 'transparent',
            color: isDarkMode ? '#e2e8f0' : '#4b5563',
            border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb'
          }}
        >
          ← Back
        </motion.button>
        
        <h1 style={{
          ...styles.title,
          color: isDarkMode ? '#e2e8f0' : '#111827'
        }}>
          <span style={{
            ...styles.titleHighlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #818cf8, #c7d2fe)'
              : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Privacy</span> Policy
        </h1>
      </header>

      {/* Hero Section */}
      <section style={{
        ...styles.heroSection,
        background: isDarkMode 
          ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}>
        <motion.div 
          style={styles.heroContent}
          variants={itemVariants}
        >
          <h2 style={styles.heroTitle}>Your <span style={{
            ...styles.highlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)'
              : 'linear-gradient(90deg, #c7d2fe, #e9d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Data Protection</span> Matters</h2>
          <p style={styles.heroText}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Introduction */}
      <section style={styles.section}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <p style={{
            ...styles.paragraph,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
          }}>
            At our company, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our services. Please read this 
            policy carefully. By accessing or using our service, you agree to the collection and use of 
            information in accordance with this policy.
          </p>
        </motion.div>
      </section>

      {/* Policy Sections */}
      {policySections.map((section, index) => (
        <section 
          key={index}
          style={{
            ...styles.section,
            backgroundColor: index % 2 === 0 
              ? (isDarkMode ? '#0f172a' : '#f8fafc') 
              : 'transparent'
          }}
        >
          <motion.div
            style={styles.contentBlock}
            variants={itemVariants}
          >
            <h2 style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#111827'
            }}>
              {section.title}
            </h2>
            
            <ul style={styles.list}>
              {section.content.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  style={{
                    ...styles.listItem,
                    color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563',
                    borderLeft: isDarkMode 
                      ? '3px solid #818cf8' 
                      : '3px solid #6366f1',
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)'
                  }}
                  variants={itemVariants}
                  transition={{ delay: itemIndex * 0.05 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
      ))}

      {/* Additional Info */}
      <section style={styles.section}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>
            Changes to This Policy
          </h2>
          <p style={{
            ...styles.paragraph,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
          }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
            advised to review this Privacy Policy periodically for any changes.
          </p>
        </motion.div>
      </section>

      {/* Contact */}
      <section style={{
        ...styles.section,
        backgroundColor: isDarkMode ? '#4f46e5' : '#6366f1',
        color: 'white',
        padding: '60px 5%'
      }}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.sectionTitle,
            color: 'white'
          }}>
            Contact Us
          </h2>
          <p style={{
            ...styles.paragraph,
            color: 'rgba(255,255,255,0.9)'
          }}>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <motion.div
            style={{
              ...styles.contactCard,
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.2)'
            }}
            whileHover={{ scale: 1.02 }}
            variants={itemVariants}
          >
            <p style={{ margin: 0 }}>
              <strong>Email:</strong> gauravshaw64@gmail.com
            </p>
            <p style={{ margin: '10px 0 0 0' }}>
              <strong>Mail:</strong> A5/59, Kalyani, West Bengal, India
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Final Note */}
      <section style={styles.section}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <p style={{
            ...styles.paragraph,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            This document was last updated and is effective as of the date shown above.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflowX: "hidden",
    transition: 'background 0.3s ease, color 0.3s ease'
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 5%",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "15px",
      padding: "15px 5%",
      textAlign: "center"
    }
  },
  backButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    '@media (max-width: 768px)': {
      alignSelf: "flex-start"
    }
  },
  title: {
    fontSize: "clamp(1.5rem, 4vw, 1.8rem)",
    fontWeight: "700",
    margin: 0,
    transition: 'color 0.3s ease'
  },
  titleHighlight: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'background 0.3s ease'
  },
  heroSection: {
    position: "relative",
    width: "100%",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    padding: "0 5%",
    overflow: "hidden",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      minHeight: "250px",
      textAlign: "center"
    }
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    '@media (max-width: 768px)': {
      maxWidth: "100%"
    }
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "800",
    color: "white",
    lineHeight: "1.2",
    marginBottom: "10px",
    '@media (max-width: 480px)': {
      fontSize: "1.8rem"
    }
  },
  highlight: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'background 0.3s ease'
  },
  heroText: {
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    color: "rgba(255,255,255,0.9)",
    maxWidth: "600px",
    lineHeight: "1.6",
    '@media (max-width: 768px)': {
      maxWidth: "100%"
    }
  },
  heroPattern: {
    position: "absolute",
    right: "-200px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "600px",
    height: "600px",
    backgroundSize: "20px 20px",
    opacity: 0.3,
    transition: 'background-image 0.3s ease',
    '@media (max-width: 768px)': {
      display: "none"
    }
  },
  section: {
    padding: "clamp(40px, 6vw, 60px) 5%",
    maxWidth: "1200px",
    margin: "0 auto",
    transition: 'background-color 0.3s ease'
  },
  contentBlock: {
    maxWidth: "800px",
    margin: "0 auto",
    '@media (max-width: 768px)': {
      maxWidth: "100%"
    }
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 4vw, 1.8rem)",
    fontWeight: "700",
    marginBottom: "25px",
    transition: 'color 0.3s ease',
    '@media (max-width: 480px)': {
      fontSize: "1.3rem",
      marginBottom: "20px"
    }
  },
  paragraph: {
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    lineHeight: "1.8",
    marginBottom: "20px",
    transition: 'color 0.3s ease'
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: "10px"
  },
  listItem: {
    padding: "clamp(12px, 2vw, 15px) clamp(15px, 3vw, 20px)",
    marginBottom: "10px",
    borderRadius: "6px",
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    lineHeight: "1.6",
    transition: 'all 0.3s ease'
  },
  contactCard: {
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "all 0.3s ease",
    '@media (max-width: 480px)': {
      padding: "15px"
    }
  }
};

export default PrivacyPolicy;