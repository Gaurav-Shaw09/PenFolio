import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, Award, Zap, TrendingUp, ChevronRight } from "react-feather";

const FeaturedPage = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const featuredContent = [
    {
      id: 1,
      title: "Editor's Choice",
      description: "Curated selection of our highest quality content handpicked by our editors",
      icon: <Star size={24} />,
      color: "#f59e0b",
      items: [
        "In-depth tutorials from industry experts",
        "Exclusive interviews with thought leaders",
        "Case studies from top performers",
        "Premium templates and resources"
      ]
    },
    {
      id: 2,
      title: "Trending Now",
      description: "What the community is engaging with right now",
      icon: <TrendingUp size={24} />,
      color: "#3b82f6",
      items: [
        "Most discussed topics this week",
        "Rising stars in the community",
        "Emerging technologies gaining traction",
        "Popular tools and frameworks"
      ]
    },
    {
      id: 3,
      title: "Staff Picks",
      description: "Our team's favorite content you shouldn't miss",
      icon: <Award size={24} />,
      color: "#10b981",
      items: [
        "Hidden gems from the archives",
        "Underrated but valuable resources",
        "Personal favorites from our staff",
        "Timeless classics worth revisiting"
      ]
    },
    
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
          }}>Featured</span> Content
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
          <h2 style={styles.heroTitle}>Discover <span style={{
            ...styles.highlight,
            background: isDarkMode 
              ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)'
              : 'linear-gradient(90deg, #c7d2fe, #e9d5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Exceptional Content</span></h2>
          <p style={styles.heroText}>
            Handpicked selections, trending topics, and staff recommendations to enhance your experience
          </p>
        </motion.div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Featured Collections */}
      <section style={styles.section}>
        <div style={styles.collectionsGrid}>
          {featuredContent.map((collection, index) => (
            <motion.div
              key={collection.id}
              style={{
                ...styles.collectionCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                boxShadow: isDarkMode
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: isDarkMode
                  ? '0 10px 25px rgba(0, 0, 0, 0.3)'
                  : '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                ...styles.collectionHeader,
                borderBottom: isDarkMode 
                  ? '1px solid rgba(226, 232, 240, 0.1)' 
                  : '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  ...styles.collectionIcon,
                  backgroundColor: isDarkMode 
                    ? `${collection.color}20` 
                    : `${collection.color}10`,
                  color: collection.color
                }}>
                  {collection.icon}
                </div>
                <h3 style={{
                  ...styles.collectionTitle,
                  color: isDarkMode ? '#e2e8f0' : '#111827'
                }}>
                  {collection.title}
                </h3>
              </div>
              <p style={{
                ...styles.collectionDescription,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
              }}>
                {collection.description}
              </p>
              <ul style={styles.collectionList}>
                {collection.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    style={{
                      ...styles.collectionListItem,
                      color: isDarkMode ? 'rgba(226, 232, 240, 0.9)' : '#4b5563'
                    }}
                    variants={itemVariants}
                    transition={{ delay: itemIndex * 0.05 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                style={{
                  ...styles.exploreButton,
                  color: collection.color,
                  backgroundColor: isDarkMode 
                    ? `${collection.color}10` 
                    : `${collection.color}10`,
                  border: `1px solid ${isDarkMode ? `${collection.color}30` : `${collection.color}20`}`
                }}
                whileHover={{ 
                  backgroundColor: isDarkMode 
                    ? `${collection.color}20` 
                    : `${collection.color}20`
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
                <ChevronRight size={18} style={{ marginLeft: 8 }} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        ...styles.section,
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
        textAlign: 'center'
      }}>
        <motion.div
          variants={itemVariants}
        >
          <h2 style={{
            ...styles.ctaTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>
            Ready to discover more featured content?
          </h2>
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
            transition={{ delay: 0.2 }}
          >
            Browse All Collections
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
    fontSize: "clamp(2rem, 5vw, 2.8rem)",
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
    padding: "clamp(60px, 8vw, 80px) 5%",
    maxWidth: "1200px",
    margin: "0 auto",
    transition: 'background-color 0.3s ease'
  },
  collectionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "clamp(20px, 4vw, 30px)",
    '@media (max-width: 640px)': {
      gridTemplateColumns: "1fr"
    }
  },
  collectionCard: {
    borderRadius: "16px",
    padding: "clamp(20px, 3vw, 25px)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column"
  },
  collectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    paddingBottom: "20px",
    marginBottom: "20px"
  },
  collectionIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: 'all 0.3s ease'
  },
  collectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: 0,
    transition: 'color 0.3s ease'
  },
  collectionDescription: {
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    transition: 'color 0.3s ease'
  },
  collectionList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 25px 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flexGrow: 1
  },
  collectionListItem: {
    fontSize: "0.95rem",
    lineHeight: "1.5",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    transition: 'color 0.3s ease',
    '&:before': {
      content: '"•"',
      color: 'inherit',
      fontSize: "1.2rem",
      lineHeight: "1"
    }
  },
  exploreButton: {
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    marginTop: "auto"
  },
  ctaTitle: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: "700",
    marginBottom: "30px",
    lineHeight: "1.3",
    transition: 'color 0.3s ease'
  },
  ctaButton: {
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

export default FeaturedPage;