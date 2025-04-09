import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import profile4 from '../assets/profile4.jpg';

const AboutUs = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Gaurav Shaw",
      role: "Founder & CEO",
      bio: "Digital publishing expert with 10+ years in content strategy",
      funFact: "Once wrote a 50,000-word novel in 30 days",
      avatar: profile1
    },
    {
      name: "Kumar Nishant",
      role: "Lead Developer",
      bio: "Full-stack wizard specializing in scalable platforms",
      funFact: "Can solve a Rubik's cube in under 2 minutes",
      avatar: profile2
    },
    {
      name: "Aditya Suryavanshi",
      role: "Community Manager",
      bio: "Connects writers and builds engaged communities",
      funFact: "Has visited every continent except Antarctica",
      avatar: profile3
    },
    {
      name: "Subham Bangal",
      role: "UX Designer",
      bio: "Creates intuitive interfaces that writers love",
      funFact: "Professional-level origami artist",
      avatar: profile4
    }
  ];

  const milestones = [
    {
      year: "2021",
      event: "Penfolio founded as a class project",
      detail: "Started in a dorm room with just 3 beta users"
    },
    {
      year: "2022",
      event: "Public beta launch",
      detail: "10,000+ writers joined in the first 3 months"
    },
    {
      year: "2023",
      event: "Mobile app released",
      detail: "Featured in 'Top New Writing Apps' by TechRadar"
    },
    {
      year: "2024",
      event: "Community reaches 100k members",
      detail: "Expanded to support 12 languages worldwide"
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
          }}>About</span>  📝PenFolio
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
          <h2 style={styles.heroTitle}>Where <span style={{
            ...styles.highlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)'
              : 'linear-gradient(90deg, #c7d2fe, #e9d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Writers</span> Thrive</h2>
          <p style={styles.heroText}>
            Penfolio was born from a simple idea: every writer deserves a beautiful space to create,
            share, and grow their audience.
          </p>
        </motion.div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Our Mission */}
      <section style={styles.section}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>
            Our Mission
          </h2>
          <p style={{
            ...styles.paragraph,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
          }}>
            At Penfolio, we're building more than a writing platform - we're creating a home for 
            storytellers. Our mission is to empower writers of all levels with intuitive tools, 
            a supportive community, and opportunities to connect with readers who love their work.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
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
            Meet the Team
          </motion.h2>
          <motion.p
            style={{
              ...styles.sectionSubtitle,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
            }}
            variants={itemVariants}
          >
            The passionate people behind Penfolio
          </motion.p>
        </div>
        
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              style={{
                ...styles.teamCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{ y: -5 }}
              variants={itemVariants}
            >
              <div style={styles.avatarContainer}>
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  style={styles.avatarImage}
                />
              </div>
              <h3 style={{
                ...styles.memberName,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>{member.name}</h3>
              <p style={{
                ...styles.memberRole,
                color: isDarkMode ? '#818cf8' : '#6366f1'
              }}>{member.role}</p>
              <p style={{
                ...styles.memberBio,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
              }}>{member.bio}</p>
              <div style={{
                ...styles.funFact,
                backgroundColor: isDarkMode ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                borderLeft: isDarkMode 
                  ? '3px solid #818cf8' 
                  : '3px solid #6366f1'
              }}>
                <span style={{ fontWeight: '600' }}>Fun fact:</span> {member.funFact}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <motion.h2 
            style={{
              ...styles.sectionTitle,
              color: isDarkMode ? '#e2e8f0' : '#111827'
            }}
            variants={itemVariants}
          >
            Our Journey
          </motion.h2>
          <motion.p
            style={{
              ...styles.sectionSubtitle,
              color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'
            }}
            variants={itemVariants}
          >
            Key moments in Penfolio's story
          </motion.p>
        </div>
        
        <div style={styles.timeline}>
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              style={styles.timelineItem}
              variants={itemVariants}
            >
              <div style={{
                ...styles.timelineYear,
                backgroundColor: isDarkMode ? '#818cf8' : '#6366f1',
                color: 'white'
              }}>
                {milestone.year}
              </div>
              <div style={{
                ...styles.timelineContent,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}>
                <h3 style={{
                  ...styles.timelineEvent,
                  color: isDarkMode ? '#e2e8f0' : '#111827'
                }}>{milestone.event}</h3>
                <p style={{
                  ...styles.timelineDetail,
                  color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
                }}>{milestone.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{
        ...styles.section,
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc'
      }}>
        <motion.div
          style={styles.contentBlock}
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>
            Our Core Values
          </h2>
          
          <div style={styles.valuesGrid}>
            {[
              {
                title: "Writer First",
                description: "Every decision starts with what's best for our community of writers"
              },
              {
                title: "Quality Over Hype",
                description: "We build thoughtfully, not just for viral moments"
              },
              {
                title: "Open Doors",
                description: "Writing should be accessible to everyone, everywhere"
              },
              {
                title: "Celebrate Creativity",
                description: "We honor the unique voice in every writer"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                style={{
                  ...styles.valueCard,
                  backgroundColor: isDarkMode ? '#1e293b' : 'white',
                  borderTop: `4px solid ${isDarkMode ? '#818cf8' : '#6366f1'}`
                }}
                whileHover={{ scale: 1.02 }}
                variants={itemVariants}
              >
                <h3 style={{
                  ...styles.valueTitle,
                  color: isDarkMode ? '#e2e8f0' : '#111827'
                }}>{value.title}</h3>
                <p style={{
                  ...styles.valueDescription,
                  color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
                }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{
        ...styles.section,
        textAlign: 'center',
        padding: '80px 40px'
      }}>
        <motion.h2
          style={{
            ...styles.ctaTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}
          variants={itemVariants}
        >
          Ready to Join Our Community?
        </motion.h2>
        <motion.p
          style={{
            ...styles.ctaText,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          Writers of all levels are welcome at Penfolio
        </motion.p>
        <motion.button
          style={{
            ...styles.ctaButton,
            background: isDarkMode ? '#818cf8' : '#6366f1'
          }}
          whileHover={{ 
            scale: 1.05,
            background: isDarkMode ? '#6366f1' : '#4f46e5'
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/signup')}
        >
          Start Writing Today
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
    padding: "20px 40px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '@media (max-width: 768px)': {
      padding: "15px 20px",
      flexDirection: "column",
      gap: "15px"
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
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: 0,
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1.5rem"
    }
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
    padding: "0 40px",
    overflow: "hidden",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      padding: "0 20px",
      minHeight: "300px"
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
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "white",
    lineHeight: "1.2",
    marginBottom: "15px",
    '@media (max-width: 768px)': {
      fontSize: "2rem"
    },
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
    fontSize: "1.1rem",
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
    transition: 'background-image 0.3s ease'
  },
  section: {
    padding: "80px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    transition: 'background-color 0.3s ease',
    '@media (max-width: 768px)': {
      padding: "60px 20px"
    }
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
    '@media (max-width: 768px)': {
      marginBottom: "40px"
    }
  },
  sectionTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "15px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1.8rem"
    }
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1rem"
    }
  },
  contentBlock: {
    maxWidth: "800px",
    margin: "0 auto"
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    marginBottom: "20px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1rem"
    }
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "1fr",
      gap: "20px"
    }
  },
  teamCard: {
    borderRadius: "12px",
    padding: "30px",
    transition: "all 0.3s ease",
    textAlign: "center",
    '@media (max-width: 768px)': {
      padding: "20px"
    }
  },
  avatarContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 20px",
    border: "3px solid #6366f1"
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  memberName: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "5px",
    transition: 'color 0.3s ease'
  },
  memberRole: {
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  memberBio: {
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    transition: 'color 0.3s ease'
  },
  funFact: {
    padding: "12px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    lineHeight: "1.5",
    transition: 'all 0.3s ease'
  },
  timeline: {
    position: "relative",
    maxWidth: "800px",
    margin: "0 auto",
    paddingLeft: "50px",
    '@media (max-width: 768px)': {
      paddingLeft: "30px"
    }
  },
  timelineItem: {
    position: "relative",
    marginBottom: "40px",
    '&:before': {
      content: '""',
      position: "absolute",
      left: "-50px",
      top: "0",
      height: "100%",
      width: "2px",
      backgroundColor: "#6366f1",
      '@media (max-width: 768px)': {
        left: "-30px"
      }
    },
    '&:last-child': {
      marginBottom: "0",
      '&:before': {
        height: "30px"
      }
    }
  },
  timelineYear: {
    position: "absolute",
    left: "-70px",
    top: "0",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
    transition: 'background-color 0.3s ease',
    '@media (max-width: 768px)': {
      left: "-50px",
      width: "35px",
      height: "35px",
      fontSize: "0.8rem"
    }
  },
  timelineContent: {
    padding: "25px",
    borderRadius: "8px",
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: "20px"
    }
  },
  timelineEvent: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "10px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1.1rem"
    }
  },
  timelineDetail: {
    fontSize: "1rem",
    lineHeight: "1.6",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "0.9rem"
    }
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "1fr",
      gap: "20px"
    }
  },
  valueCard: {
    borderRadius: "8px",
    padding: "30px",
    transition: "all 0.3s ease",
    '@media (max-width: 768px)': {
      padding: "20px"
    }
  },
  valueTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "15px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1.1rem"
    }
  },
  valueDescription: {
    fontSize: "1rem",
    lineHeight: "1.6",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "0.9rem"
    }
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "20px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "2rem"
    },
    '@media (max-width: 480px)': {
      fontSize: "1.8rem"
    }
  },
  ctaText: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1rem",
      marginBottom: "30px"
    }
  },
  ctaButton: {
    padding: "15px 40px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    '@media (max-width: 768px)': {
      padding: "12px 30px",
      fontSize: "1rem"
    }
  }
};

export default AboutUs;