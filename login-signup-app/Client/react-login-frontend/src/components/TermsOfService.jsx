import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TermsOfService = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "Service Description",
      content: "We provide an online platform for [describe your service]. We reserve the right to modify or discontinue any aspect of the service at any time without prior notice."
    },
    {
      title: "User Responsibilities",
      content: "You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials."
    },
    {
      title: "Intellectual Property",
      content: "All content and materials available on our platform, including but not limited to text, graphics, logos, and software, are our property or the property of our licensors."
    },
    {
      title: "User-Generated Content",
      content: "By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the service."
    },
    {
      title: "Prohibited Activities",
      content: "You may not: (a) violate any laws; (b) infringe intellectual property rights; (c) harass others; (d) distribute malware; (e) attempt unauthorized access; (f) interfere with service operations."
    },
    {
      title: "Termination",
      content: "We may suspend or terminate your access to the service immediately, without prior notice, for any violation of these Terms or for any other reason at our sole discretion."
    },
    {
      title: "Disclaimers",
      content: "The service is provided 'as is' without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free."
    },
    {
      title: "Limitation of Liability",
      content: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service."
    },
    {
      title: "Governing Law",
      content: "These Terms shall be governed by the laws of [Your Jurisdiction] without regard to its conflict of law provisions."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. We will notify users of significant changes through the service or via email. Continued use constitutes acceptance."
    },
    {
      title: "Contact Information",
      content: "For questions about these Terms, please contact us at legal@yourcompany.com."
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
          onClick={() => navigate("/home")} 
          style={{
            ...styles.backButton,
            backgroundColor: isDarkMode ? '#334155' : 'transparent',
            color: isDarkMode ? '#e2e8f0' : '#4b5563',
            border: isDarkMode ? '1px solid #475569' : '1px solid #e5e7eb'
          }}
        >
          ← Back to Home
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
          }}>Terms of</span> Service
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
          <h2 style={styles.heroTitle}>Understanding Our <span style={{
            ...styles.highlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)'
              : 'linear-gradient(90deg, #c7d2fe, #e9d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Legal Agreement</span></h2>
          <p style={styles.heroText}>
            These Terms of Service govern your use of our platform. Please read them carefully before using our services.
          </p>
        </motion.div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Effective Date */}
      <section style={styles.section}>
        <motion.div
          style={styles.effectiveDate}
          variants={itemVariants}
        >
          <div style={{
            ...styles.dateBadge,
            backgroundColor: isDarkMode ? '#818cf8' : '#6366f1',
            color: 'white'
          }}>
            Effective Date
          </div>
          <p style={{
            ...styles.dateText,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section style={styles.section}>
        <div style={styles.contentContainer}>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              style={{
                ...styles.sectionCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              variants={itemVariants}
            >
              <h2 style={{
                ...styles.sectionTitle,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>
                <span style={{
                  ...styles.sectionNumber,
                  color: isDarkMode ? '#818cf8' : '#6366f1'
                }}>
                  {String(index + 1).padStart(2, '0')}.
                </span> {section.title}
              </h2>
              <p style={{
                ...styles.sectionContent,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
              }}>{section.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Acceptance Section */}
      <section style={{ 
        ...styles.section, 
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
        textAlign: 'center'
      }}>
        <motion.div
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.acceptanceTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>
            By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </h2>
          <motion.button
            style={{
              ...styles.acceptButton,
              background: isDarkMode ? '#818cf8' : '#6366f1'
            }}
            whileHover={{ 
              scale: 1.05,
              background: isDarkMode ? '#6366f1' : '#4f46e5'
            }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/home")}
          >
            I Understand
          </motion.button>
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
    minHeight: "350px",
    display: "flex",
    alignItems: "center",
    padding: "0 5%",
    overflow: "hidden",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      minHeight: "300px",
      padding: "0 5%"
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
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "800",
    color: "white",
    lineHeight: "1.2",
    marginBottom: "20px",
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
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "rgba(255,255,255,0.9)",
    maxWidth: "600px",
    lineHeight: "1.6",
    '@media (max-width: 768px)': {
      fontSize: "1rem"
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
    padding: "clamp(40px, 6vw, 80px) 5%",
    maxWidth: "1200px",
    margin: "0 auto",
    transition: 'background-color 0.3s ease'
  },
  effectiveDate: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "40px",
    '@media (max-width: 480px)': {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px"
    }
  },
  dateBadge: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: 'background-color 0.3s ease'
  },
  dateText: {
    fontSize: "1rem",
    transition: 'color 0.3s ease'
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  },
  sectionCard: {
    borderRadius: "12px",
    padding: "clamp(20px, 3vw, 30px)",
    transition: "all 0.3s ease"
  },
  sectionTitle: {
    fontSize: "clamp(1.3rem, 3vw, 1.5rem)",
    fontWeight: "600",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: 'color 0.3s ease'
  },
  sectionNumber: {
    fontSize: "1.2rem",
    fontWeight: "700",
    transition: 'color 0.3s ease'
  },
  sectionContent: {
    lineHeight: "1.8",
    fontSize: "1rem",
    transition: 'color 0.3s ease'
  },
  acceptanceTitle: {
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    fontWeight: "600",
    maxWidth: "800px",
    margin: "0 auto 30px",
    lineHeight: "1.5",
    transition: 'color 0.3s ease'
  },
  acceptButton: {
    padding: "clamp(12px, 2vw, 15px) clamp(30px, 4vw, 40px)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
};

export default TermsOfService;