import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommunityGuidelines = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const corePrinciples = [
    {
      icon: "🤝",
      title: "Respect All Members",
      description: "Treat everyone with dignity. Healthy debates are encouraged, but kindness is required."
    },
    {
      icon: "🌈",
      title: "Embrace Diversity",
      description: "Our community includes people from all backgrounds. Hate speech of any kind is prohibited."
    },
    {
      icon: "🔒",
      title: "Protect Privacy",
      description: "Never share others' personal information without explicit consent."
    },
    {
      icon: "💡",
      title: "Add Value",
      description: "Share knowledge, ask thoughtful questions, and help others grow."
    },
    {
        icon: "🧠",
        title: "Stay Curious",
        description: "Approach discussions with a learning mindset. Be open to new perspectives and evolving ideas."
      },
      {
        icon: "🚫",
        title: "No Spam or Self-Promo",
        description: "Keep the space clean and focused. Unsolicited promotions or repetitive links will be removed."
      }
      
  ];

  const contentRules = [
    {
      category: "Prohibited Content",
      items: [
        "Hate speech or discriminatory language",
        "Harassment or bullying",
        "Misinformation or fake news",
        "Spam or repetitive self-promotion",
        "NSFW or explicit material"
      ]
    },
    {
      category: "Encouraged Content",
      items: [
        "Original thoughts and analysis",
        "Constructive feedback",
        "Evidence-based discussions",
        "Helpful resources and tools",
        "Inspiring success stories"
      ]
    }
  ];

  const enforcementStages = [
    {
      stage: "1",
      title: "Warning",
      description: "First violations result in a private warning and content removal"
    },
    {
      stage: "2",
      title: "Temporary Suspension",
      description: "Repeated violations may lead to 7-30 day account suspension"
    },
    {
      stage: "3",
      title: "Permanent Ban",
      description: "Severe or continued violations result in permanent removal"
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
          }}>Community</span> Guidelines
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
          <h2 style={styles.heroTitle}>Building a Space for <span style={{
            ...styles.highlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)'
              : 'linear-gradient(90deg, #c7d2fe, #e9d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Meaningful Connection</span></h2>
          <p style={styles.heroText}>
            These guidelines help maintain our community as a welcoming, insightful, and safe environment 
            for all members. By participating, you agree to uphold these standards.
          </p>
        </motion.div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Core Principles */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <motion.h2 
            style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#111827'
            }}
            variants={itemVariants}
          >
            Our Core Principles
          </motion.h2>
          <motion.p
            style={{
              ...styles.sectionSubtitle,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
            }}
            variants={itemVariants}
          >
            The foundation of all our community interactions
          </motion.p>
        </div>
        
        <div style={styles.principlesGrid}>
          {corePrinciples.map((principle, index) => (
            <motion.div
              key={index}
              style={{
                ...styles.principleCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: isDarkMode 
                  ? '1px solid rgba(99, 102, 241, 0.2)' 
                  : '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{ scale: 1.03 }}
              variants={itemVariants}
            >
              <div style={styles.principleIcon}>{principle.icon}</div>
              <h3 style={{
                ...styles.principleTitle,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>{principle.title}</h3>
              <p style={{
                ...styles.principleText,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
              }}>{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Rules */}
      <section style={{ 
        ...styles.section, 
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' 
      }}>
        <div style={styles.sectionHeader}>
          <motion.h2 
            style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#111827'
            }}
            variants={itemVariants}
          >
            Content Standards
          </motion.h2>
          <motion.p
            style={{
              ...styles.sectionSubtitle,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
            }}
            variants={itemVariants}
          >
            What's allowed and what's not in our community
          </motion.p>
        </div>
        
        <div style={styles.rulesContainer}>
          {contentRules.map((rule, index) => (
            <motion.div
              key={index}
              style={styles.ruleColumn}
              variants={itemVariants}
            >
              <h3 style={{
                ...styles.ruleCategory,
                color: isDarkMode ? '#e2e8f0' : '#111827',
                borderBottom: isDarkMode 
                  ? '2px solid rgba(226, 232, 240, 0.1)' 
                  : '2px solid #e5e7eb'
              }}>{rule.category}</h3>
              <ul style={styles.ruleList}>
                {rule.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    style={{
                      ...styles.ruleItem,
                      color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563',
                      borderBottom: isDarkMode 
                        ? '1px solid rgba(226, 232, 240, 0.1)' 
                        : '1px solid #e5e7eb'
                    }}
                    variants={itemVariants}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enforcement */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <motion.h2 
            style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#111827'
            }}
            variants={itemVariants}
          >
            Policy Enforcement
          </motion.h2>
          <motion.p
            style={{
              ...styles.sectionSubtitle,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
            }}
            variants={itemVariants}
          >
            How we handle guideline violations
          </motion.p>
        </div>
        
        <div style={styles.enforcementContainer}>
          {enforcementStages.map((stage, index) => (
            <motion.div
              key={index}
              style={{
                ...styles.enforcementCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)',
                borderTop: `4px solid ${isDarkMode ? '#818cf8' : '#6366f1'}`
              }}
              variants={itemVariants}
            >
              <div style={{
                ...styles.enforcementStage,
                backgroundColor: isDarkMode ? '#818cf8' : '#6366f1'
              }}>{stage.stage}</div>
              <h3 style={{
                ...styles.enforcementTitle,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>{stage.title}</h3>
              <p style={{
                ...styles.enforcementText,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
              }}>{stage.description}</p>
            </motion.div>
          ))}
          
          <motion.div
            style={styles.enforcementNote}
            variants={itemVariants}
          >
            <p style={{
              ...styles.noteText,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
            }}>
              We reserve the right to skip stages for severe violations. All actions can be appealed by contacting our moderation team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reporting */}
      <section style={{ 
        ...styles.section, 
        backgroundColor: isDarkMode ? '#4f46e5' : '#6366f1',
        color: 'white' 
      }}>
        <div style={{ ...styles.sectionHeader }}>
          <motion.h2 
            style={{ ...styles.sectionTitle, color: 'white' }}
            variants={itemVariants}
          >
            Reporting Issues
          </motion.h2>
          <motion.p
            style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.9)' }}
            variants={itemVariants}
          >
            Help us maintain community standards
          </motion.p>
        </div>
        
        <div style={styles.reportingGrid}>
          <motion.div
            style={{
              ...styles.reportingCard,
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(255, 255, 255, 0.3)'
            }}
            variants={itemVariants}
          >
            <div style={styles.reportingIcon}>🚩</div>
            <h3 style={styles.reportingTitle}>Flag Content</h3>
            <p style={styles.reportingText}>
              Use the report button on any post or comment that violates guidelines. Our moderators review all reports.
            </p>
          </motion.div>
          
          <motion.div
            style={{
              ...styles.reportingCard,
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(255, 255, 255, 0.3)'
            }}
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <div style={styles.reportingIcon}>✉️</div>
            <h3 style={styles.reportingTitle}>Contact Moderators</h3>
            <p style={styles.reportingText}>
              For urgent or sensitive issues, email our moderation team at moderation@community.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ ...styles.section, textAlign: "center" }}>
        <motion.h2
          style={{
            ...styles.finalTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}
          variants={itemVariants}
        >
          Together We Build This Community
        </motion.h2>
        <motion.p
          style={{
            ...styles.finalText,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          By participating, you're helping create a welcoming space for everyone to learn and connect.
        </motion.p>
        <motion.button
          style={{
            ...styles.finalButton,
            background: isDarkMode ? '#818cf8' : '#6366f1'
          }}
          whileHover={{ 
            scale: 1.05,
            background: isDarkMode ? '#6366f1' : '#4f46e5'
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/profile")}
        >
          View Your Profile
        </motion.button>
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
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    padding: "0 5%",
    overflow: "hidden",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      minHeight: "350px",
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
  sectionHeader: {
    textAlign: "center",
    marginBottom: "clamp(30px, 5vw, 60px)"
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
    fontWeight: "700",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  sectionSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    maxWidth: "600px",
    margin: "0 auto",
    transition: 'color 0.3s ease'
  },
  principlesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "clamp(20px, 3vw, 30px)",
    transition: 'all 0.3s ease'
  },
  principleCard: {
    borderRadius: "12px",
    padding: "clamp(20px, 3vw, 30px)",
    transition: "all 0.3s ease",
    textAlign: "center"
  },
  principleIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px"
  },
  principleTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  principleText: {
    lineHeight: "1.6",
    fontSize: "1rem",
    transition: 'color 0.3s ease'
  },
  rulesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "clamp(30px, 5vw, 60px)",
    transition: 'all 0.3s ease'
  },
  ruleColumn: {
    minWidth: "0" // Fixes flexbox overflow issues
  },
  ruleCategory: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "25px",
    paddingBottom: "15px",
    transition: 'all 0.3s ease',
    '@media (max-width: 480px)': {
      fontSize: "1.3rem"
    }
  },
  ruleList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  ruleItem: {
    padding: "15px 0",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: 'all 0.3s ease'
  },
  enforcementContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "clamp(20px, 4vw, 40px)",
    marginBottom: "40px",
    transition: 'all 0.3s ease'
  },
  enforcementCard: {
    borderRadius: "12px",
    padding: "clamp(20px, 3vw, 30px)",
    textAlign: "center",
    transition: 'all 0.3s ease'
  },
  enforcementStage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 auto 20px",
    transition: 'background-color 0.3s ease'
  },
  enforcementTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  enforcementText: {
    lineHeight: "1.6",
    fontSize: "1rem",
    transition: 'color 0.3s ease'
  },
  enforcementNote: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    gridColumn: "1 / -1"
  },
  noteText: {
    fontSize: "1rem",
    fontStyle: "italic",
    lineHeight: "1.6",
    transition: 'color 0.3s ease'
  },
  reportingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "clamp(20px, 4vw, 40px)",
    transition: 'all 0.3s ease'
  },
  reportingCard: {
    borderRadius: "12px",
    padding: "clamp(20px, 3vw, 30px)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    transition: 'all 0.3s ease'
  },
  reportingIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px"
  },
  reportingTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "15px",
    '@media (max-width: 480px)': {
      fontSize: "1.3rem"
    }
  },
  reportingText: {
    lineHeight: "1.6",
    fontSize: "1rem"
  },
  finalTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "20px",
    transition: 'color 0.3s ease'
  },
  finalText: {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
    transition: 'color 0.3s ease'
  },
  finalButton: {
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

export default CommunityGuidelines;