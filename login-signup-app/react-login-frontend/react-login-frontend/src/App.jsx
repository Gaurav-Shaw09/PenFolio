import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import BlogDetails from "./components/BlogDetails";
import Profile from "./components/Profile";
import EditBlog from "./components/EditBlog";
import NotFound from "./components/NotFound";
import SideNavigation from "./components/SideNavigation";
import Footer from "./components/Footer";
import BlogWritingTips from "./components/BlogWritingTips";
import CommunityGuidelines from "./components/CommunityGuidelines";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import Featured from "./components/Featured";
import CreateBlog from "./components/CreateBlog";
import UserManagementDashboard from "./components/UserManagementDashboard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <AppContent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </Router>
  );
}

function AppContent({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`} style={styles.appContainer}>
      {!isAuthRoute && isMobile && (
        <div style={styles.mobileHeader}>
          <button 
            onClick={toggleSidebar}
            style={styles.menuButton}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 style={styles.mobileLogo}>📝PenFolio</h1>
          <div style={{ width: 40 }}></div>
        </div>
      )}

      {!isAuthRoute && (
        <>
          {!isMobile && (
            <div style={styles.sideNavContainer}>
              <SideNavigation 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            </div>
          )}

          {isMobile && sidebarOpen && (
            <div style={styles.mobileSideNavContainer}>
              <SideNavigation 
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                isMobile={true}
                onNavigate={() => setSidebarOpen(false)}
              />
            </div>
          )}

          {isMobile && sidebarOpen && (
            <div 
              style={styles.overlay}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      <div style={{
        ...styles.mainContentContainer,
        marginLeft: !isAuthRoute && !isMobile ? '280px' : '0',
        paddingTop: !isAuthRoute && isMobile ? '60px' : '0'
      }}>
        <Routes>
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
          <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/user-management" element={<UserManagementDashboard isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
          <Route path="/blog/:id" element={<BlogDetails isDarkMode={isDarkMode} />} />
          <Route path="/create-blog" element={<CreateBlog isDarkMode={isDarkMode} />} />
          <Route path="/profile/:username" element={<Profile isDarkMode={isDarkMode} />} />
          <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
          <Route path="/edit-blog/:id" element={<EditBlog isDarkMode={isDarkMode} />} />
          <Route path="/blog-tips" element={<BlogWritingTips isDarkMode={isDarkMode} />} />
          <Route path="/featured" element={<Featured isDarkMode={isDarkMode} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} />} />
          <Route path="/service-terms" element={<TermsOfService isDarkMode={isDarkMode} />} />
          <Route path="/community-guidelines" element={<CommunityGuidelines isDarkMode={isDarkMode} />} />
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>           
    </div>
  );
}

function getStyles(isDarkMode) {
  return {
    appContainer: {
      display: 'flex',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease',
      position: 'relative',
    },
    mobileHeader: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    menuButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333',
      padding: '8px',
    },
    mobileLogo: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#6366f1',
      margin: 0,
    },
    sideNavContainer: {
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '280px',
      zIndex: 100,
      transition: 'transform 0.3s ease',
    },
    mobileSideNavContainer: {
      position: 'fixed',
      left: 0,
      top: '60px',
      bottom: 0,
      width: '280px',
      zIndex: 999,
      transform: 'translateX(0)',
      transition: 'transform 0.3s ease',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      position: 'fixed',
      top: '60px',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
    },
    mainContentContainer: {
      flex: 1,
      minHeight: '100vh',
      transition: 'margin-left 0.3s ease, padding-top 0.3s ease',
    }
  };
}

export default App;
