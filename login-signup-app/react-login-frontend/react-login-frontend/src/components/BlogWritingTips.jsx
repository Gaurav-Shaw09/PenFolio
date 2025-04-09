import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogWritingTips = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const tips = [
    {
      title: "Hook Readers Immediately",
      content: "Start with a surprising statistic, thought-provoking question, or compelling anecdote. The first 100 words determine if readers stay.",
      icon: "🎣"
    },
    {
      title: "Master Headline Writing",
      content: "Create headlines that promise value and spark curiosity. Use power words like 'Ultimate', 'Essential', or 'Proven'. Keep it under 60 characters.",
      icon: "📰"
    },
    {
      title: "Structure for Scannability",
      content: "Use subheadings every 300 words, bullet points for lists, and bold text for key ideas. Most readers scan before committing to read.",
      icon: "📐"
    },
    {
      title: "Show, Don't Tell",
      content: "Use vivid examples, case studies, and storytelling instead of abstract advice. 'My conversion rate jumped 27%' beats 'This strategy works well'.",
      icon: "🎭"
    },
    {
      title: "Optimize for Readability",
      content: "Write at 8th grade level (Flesch-Kincaid). Short sentences (15-20 words). Paragraphs of 1-3 sentences. Active voice. Contractions for warmth.",
      icon: "🔍"
    },
    {
      title: "Add Visual Breaks",
      content: "Include relevant images, pull quotes, or dividers every 300-500 words. Visual elements increase engagement by 80%.",
      icon: "🖼️"
    },
    {
      title: "End With Action",
      content: "Close with clear next steps: a question to comment on, a resource to download, or action to try. Never just trail off.",
      icon: "🎬"
    },
    {
      title: "SEO Without Sacrifice",
      content: "Naturally include keywords in H2s, first 100 words, and 2-3 times throughout. Write for humans first, search engines second.",
      icon: "🔎"
    },
    {
        title: "Edit Ruthlessly",
        content: "Cut fluff, clichés, and repetition. Read aloud to catch awkward phrasing. Strong writing is rewriting—aim for clarity, punch, and flow.",
        icon: "✂️"
    }
      
  ];

  const advancedTechniques = [
    {
      title: "The Inverted Pyramid",
      description: "Lead with conclusion, then supporting details, then background. Works especially well for news-style posts."
    },
    {
      title: "Problem-Agitate-Solve",
      description: "1) Identify reader's problem 2) Intensify their pain 3) Present your solution. Powerful for persuasive writing."
    },
    {
      title: "The Bucket Brigade",
      description: "Use transitional phrases like 'Here's why...', 'What's more...', 'Let me explain...' to keep readers scrolling."
    },
    {
      title: "The APP Method",
      description: "Agree (with reader's perspective), Promise (value you'll deliver), Preview (what's coming). Great for introductions."
    }
  ];

  return (
    <div style={{
      ...styles.container,
      background: isDarkMode ? '#0f172a' : '#ffffff',
      color: isDarkMode ? '#e2e8f0' : '#1e293b'
    }}>
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
            color: isDarkMode ? '#818cf8' : '#6366f1'
          }}>Blog Writing</span> Mastery
        </h1>
      </header>

      {/* Hero Section */}
      <section style={{
        ...styles.heroSection,
        background: isDarkMode 
          ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
      }}>
        <div style={styles.heroContent}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={styles.heroTitle}
          >
            Craft Posts That <span style={{
              ...styles.highlight,
              background: isDarkMode 
                ? 'linear-gradient(90deg, #a5b4fc, #c7d2fe)' 
                : 'linear-gradient(90deg, #fbcfe8, #f9a8d4)'
            }}>Convert Readers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={styles.heroText}
          >
            Professional writing techniques used by top content creators and marketers.
            Apply these to grow your audience and engagement.
          </motion.p>
        </div>
        <div style={{
          ...styles.heroPattern,
          backgroundImage: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)'
        }}></div>
      </section>

      {/* Core Tips Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>Essential Blog Writing Techniques</h2>
          <p style={{
            ...styles.sectionSubtitle,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}>8 fundamental strategies to elevate your writing immediately</p>
        </div>
        
        <div style={styles.tipsGrid}>
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              style={{
                ...styles.tipCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: isDarkMode 
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={styles.tipIcon}>{tip.icon}</div>
              <h3 style={{
                ...styles.tipTitle,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>{tip.title}</h3>
              <p style={{
                ...styles.tipContent,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.8)' : '#6b7280'
              }}>{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Section */}
      <section style={{ 
        ...styles.section, 
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc'
      }}>
        <div style={styles.sectionHeader}>
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>Advanced Writing Frameworks</h2>
          <p style={{
            ...styles.sectionSubtitle,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}>Proven structures used by professional content creators</p>
        </div>
        
        <div style={styles.frameworksContainer}>
          {advancedTechniques.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              style={{
                ...styles.frameworkCard,
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: isDarkMode 
                  ? '1px solid rgba(129, 140, 248, 0.1)' 
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: isDarkMode 
                  ? '0 5px 15px rgba(0, 0, 0, 0.2)' 
                  : '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <div style={{
                ...styles.frameworkNumber,
                color: isDarkMode ? '#818cf8' : '#6366f1'
              }}>0{index + 1}</div>
              <h3 style={{
                ...styles.frameworkTitle,
                color: isDarkMode ? '#e2e8f0' : '#111827'
              }}>{tech.title}</h3>
              <p style={{
                ...styles.frameworkDesc,
                color: isDarkMode ? 'rgba(226, 232, 240, 0.8)' : '#6b7280'
              }}>{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Checklist Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={{
            ...styles.sectionTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}>Pre-Publish Checklist</h2>
          <p style={{
            ...styles.sectionSubtitle,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}>Run through these before hitting that publish button</p>
        </div>
        
        <div style={styles.checklistContainer}>
          <motion.ul style={styles.checklist}>
            {[
              "Does the headline promise clear value?",
              "Is the introduction compelling within 10 seconds?",
              "Have I used subheadings every 300 words?",
              "Are paragraphs short (1-3 sentences)?",
              "Does every section move the reader forward?",
              "Have I included at least one image or visual?",
              "Is there a clear call-to-action at the end?",
              "Have I proofread for spelling/grammar errors?"
            ].map((item, index) => (
              <motion.li
                key={index}
                style={{
                  ...styles.checklistItem,
                  borderBottom: isDarkMode 
                    ? '1px solid rgba(226, 232, 240, 0.1)' 
                    : '1px solid #e5e7eb',
                  color: isDarkMode ? '#e2e8f0' : '#1e293b'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span style={{
                  ...styles.checkIcon,
                  color: isDarkMode ? '#34d399' : '#10b981'
                }}>✓</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            style={{
              ...styles.checklistGraphic,
              backgroundColor: isDarkMode 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(16, 185, 129, 0.1)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div style={{
              ...styles.checkmark,
              background: isDarkMode 
                ? 'linear-gradient(135deg, #10b981, #34d399)' 
                : 'linear-gradient(135deg, #10b981, #34d399)'
            }}>✓</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        ...styles.section, 
        textAlign: "center", 
        padding: "80px 20px",
        backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc'
      }}>
        <motion.h2 
          style={{
            ...styles.ctaTitle,
            color: isDarkMode ? '#e2e8f0' : '#111827'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Writing?
        </motion.h2>
        <motion.p
          style={{
            ...styles.ctaText,
            color: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : '#6b7280'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Apply these techniques in your next blog post and watch your engagement grow.
        </motion.p>
        <motion.button
          style={{
            ...styles.ctaButton,
            background: isDarkMode ? '#818cf8' : '#6366f1',
            boxShadow: isDarkMode 
              ? '0 4px 6px rgba(129, 140, 248, 0.3)' 
              : '0 4px 6px rgba(99, 102, 241, 0.3)'
          }}
          whileHover={{ 
            scale: 1.05,
            background: isDarkMode ? '#6366f1' : '#4f46e5'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/profile")}
        >
          Start Writing Now
        </motion.button>
      </section>
    </div>
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
    transition: 'color 0.3s ease'
  },
  heroSection: {
    position: "relative",
    width: "100%",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
    overflow: "hidden",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      padding: "0 20px",
      minHeight: "350px"
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
    fontSize: "3rem",
    fontWeight: "800",
    color: "white",
    lineHeight: "1.2",
    marginBottom: "20px",
    '@media (max-width: 768px)': {
      fontSize: "2.2rem"
    },
    '@media (max-width: 480px)': {
      fontSize: "1.8rem"
    }
  },
  highlight: {
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: 'background 0.3s ease'
  },
  heroText: {
    fontSize: "1.2rem",
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
    opacity: 0.5,
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
  tipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "1fr"
    }
  },
  tipCard: {
    borderRadius: "12px",
    padding: "30px",
    transition: "all 0.3s ease",
    '@media (max-width: 768px)': {
      padding: "20px"
    }
  },
  tipIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px"
  },
  tipTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  tipContent: {
    lineHeight: "1.6",
    transition: 'color 0.3s ease'
  },
  frameworksContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "30px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "1fr"
    }
  },
  frameworkCard: {
    borderRadius: "12px",
    padding: "30px",
    transition: "all 0.3s ease",
    '@media (max-width: 768px)': {
      padding: "20px"
    }
  },
  frameworkNumber: {
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "15px",
    transition: 'color 0.3s ease'
  },
  frameworkTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "15px",
    transition: 'color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1.2rem"
    }
  },
  frameworkDesc: {
    lineHeight: "1.6",
    transition: 'color 0.3s ease'
  },
  checklistContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "60px",
    alignItems: "center",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "40px"
    }
  },
  checklist: {
    listStyle: "none",
    padding: 0,
    maxWidth: "500px",
    '@media (max-width: 768px)': {
      maxWidth: "100%"
    }
  },
  checklistItem: {
    padding: "15px 0",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    transition: 'color 0.3s ease, border-color 0.3s ease',
    '@media (max-width: 768px)': {
      fontSize: "1rem",
      padding: "12px 0"
    }
  },
  checkIcon: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: 'color 0.3s ease'
  },
  checklistGraphic: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: 'background-color 0.3s ease',
    '@media (max-width: 768px)': {
      width: "150px",
      height: "150px"
    }
  },
  checkmark: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "3rem",
    fontWeight: "bold",
    transition: 'background 0.3s ease',
    '@media (max-width: 768px)': {
      width: "80px",
      height: "80px",
      fontSize: "2rem"
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
    '@media (max-width: 768px)': {
      padding: "12px 30px",
      fontSize: "1rem"
    }
  }
};

export default BlogWritingTips;