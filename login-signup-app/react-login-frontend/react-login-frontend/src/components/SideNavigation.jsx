import { 
    FiHome, 
    FiUser, 
    FiMail, 
    FiInfo, 
    FiPlus, 
    FiLogOut, 
    FiMoon, 
    FiSun,
    FiBell,
    FiSearch,
    FiSettings
  } from "react-icons/fi";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  
  const SideNavigation = ({ isDarkMode, toggleTheme, isMobile, onNavigate }) => {
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem("username") || "User";
    const loggedInUserId = localStorage.getItem("userId");
  
    // State for notifications
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    
    // State for search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
  
    useEffect(() => {
      fetchNotifications();
    }, []);
  
    const fetchNotifications = async () => {
      setLoadingNotifications(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/notifications/${loggedInUserId}`
        );
        setNotifications(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    };
  
    const markNotificationsAsRead = async () => {
      try {
        await axios.put(`http://localhost:8080/api/notifications/${loggedInUserId}/read`);
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    };
  
    const clearNotifications = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/notifications/${loggedInUserId}`);
        setNotifications([]);
      } catch (error) {
        console.error("Error clearing notifications:", error);
      }
    };
  
    const handleNotificationClick = (notification) => {
      setShowNotifications(false);
      if (notification.type === "LIKE" || notification.type === "COMMENT" || notification.type === "COMMENT_LIKE") {
        if (notification.blogId) {
          navigate(`/blog/${notification.blogId}`);
        }
      } else if (notification.type === "FOLLOW") {
        const username = notification.message.split(" followed you")[0];
        if (username) {
          navigate(`/profile/${username}`);
        }
      }
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/search?query=${searchQuery}`
        );
        setSearchResults(response.data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Error searching user:", error);
        setSearchResults([]);
      }
    };
  
    const handleNavigation = (path) => {
      navigate(path);
      if (isMobile && onNavigate) {
        onNavigate();
      }
      setShowNotifications(false);
      setShowSearchResults(false);
    };
  
    const handleLogout = () => {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
    return (
      <div style={isDarkMode ? styles.sidebarDark : styles.sidebar}>
        {!isMobile && (
          <div 
            style={isDarkMode ? styles.logoDark : styles.logo}
            onClick={() => handleNavigation("/home")}
          >
            📝PenFolio
          </div>
        )}
        
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={isDarkMode ? styles.searchInputDark : styles.searchInput}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            />
          </form>
          {showSearchResults && searchResults.length > 0 && (
            <div style={isDarkMode ? styles.searchResultsDark : styles.searchResults}>
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  style={isDarkMode ? styles.searchResultItemDark : styles.searchResultItem}
                  onClick={() => {
                    navigate(`/profile/${user.username}`);
                    setSearchResults([]);
                    setSearchQuery("");
                    setShowSearchResults(false);
                    if (isMobile && onNavigate) onNavigate();
                  }}
                >
                  @{user.username}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <nav style={styles.navMenu}>
          <div 
            style={isDarkMode ? styles.navItemDark : styles.navItem} 
            onClick={() => handleNavigation("/home")}
          >
            <FiHome style={styles.navIcon} />
            <span>Home</span>
          </div>
          <div 
            style={isDarkMode ? styles.navItemDark : styles.navItem} 
            onClick={() => handleNavigation("/profile")}
          >
            <FiUser style={styles.navIcon} />
            <span>Profile</span>
          </div>
          <div 
            style={isDarkMode ? styles.navItemDark : styles.navItem} 
            onClick={() => handleNavigation("/about")}
          >
            <FiInfo style={styles.navIcon} />
            <span>About</span>
          </div>
          <div 
            style={isDarkMode ? styles.navItemDark : styles.navItem} 
            onClick={() => handleNavigation("/contact")}
          >
            <FiMail style={styles.navIcon} />
            <span>Contact</span>
          </div>
          <div 
            style={isDarkMode ? styles.navItemDark : styles.navItem} 
            onClick={() => handleNavigation("/user-management")}
          >
            <FiSettings style={styles.navIcon} />
            <span>Manage Users</span>
          </div>
        </nav>
        
        <button 
          onClick={() => handleNavigation("/create-blog")} 
          style={isDarkMode ? styles.createPostButtonDark : styles.createPostButton}
        >
          <FiPlus style={{ marginRight: 8 }} />
          Create Post
        </button>
        
        {/* Notifications */}
        <div style={styles.notificationContainer}>
          <div 
            style={isDarkMode ? styles.notificationButtonDark : styles.notificationButton}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) markNotificationsAsRead();
            }}
          >
            <FiBell style={styles.notificationIcon} />
            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>{unreadCount}</span>
            )}
            <span>Notifications</span>
          </div>
          {showNotifications && (
            <div style={isDarkMode ? styles.notificationDropdownDark : styles.notificationDropdown}>
              <div style={styles.notificationHeader}>
                <h3 style={{ margin: "0", color: isDarkMode ? "#e2e8f0" : "#1a3c34" }}>Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotifications();
                    }}
                    style={styles.clearButton}
                  >
                    Clear All
                  </button>
                )}
              </div>
              {loadingNotifications ? (
                <p style={{ padding: "10px", color: isDarkMode ? "#e2e8f0" : "#333" }}>Loading...</p>
              ) : notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      ...(isDarkMode ? styles.notificationItemDark : styles.notificationItem),
                      backgroundColor: notif.isRead 
                        ? (isDarkMode ? "rgba(255, 255, 255, 0.05)" : "#fff") 
                        : (isDarkMode ? "rgba(129, 140, 248, 0.2)" : "#e6f3ff"),
                      borderLeft: notif.isRead ? "none" : `4px solid ${isDarkMode ? "#818cf8" : "#4facfe"}`,
                    }}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div style={styles.notificationContent}>
                      <span style={{ color: isDarkMode ? "#e2e8f0" : "#333" }}>{notif.message}</span>
                    </div>
                    <div style={{ 
                      ...styles.notificationTimestamp,
                      color: isDarkMode ? "#94a3b8" : "#888"
                    }}>
                      {new Date(notif.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: "10px", color: isDarkMode ? "#e2e8f0" : "#333" }}>No notifications</p>
              )}
            </div>
          )}
        </div>
        
        <div style={styles.themeToggle} onClick={toggleTheme}>
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
        
        <div style={isDarkMode ? styles.userProfileDark : styles.userProfile}>
          <div style={{
            ...styles.avatar,
            backgroundColor: isDarkMode ? '#818cf8' : '#6366f1'
          }}>
            {loggedInUsername.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={isDarkMode ? styles.userNameDark : styles.userName}>{loggedInUsername}</p>
            <button 
              onClick={handleLogout} 
              style={isDarkMode ? styles.logoutButtonDark : styles.logoutButton}
            >
              <FiLogOut style={{ marginRight: 5 }} />
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const styles = {
    sidebar: {
      width: '280px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      height: '100vh',
      position: 'relative',
      zIndex: 1000,
    },
    sidebarDark: {
      width: '280px',
      backgroundColor: 'rgba(30, 41, 59, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
      height: '100vh',
      color: '#e2e8f0',
      position: 'relative',
      zIndex: 1000,
    },
    logo: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#6366f1',
      marginBottom: '20px',
      paddingLeft: '8px',
      cursor: 'pointer',
    },
    logoDark: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#818cf8',
      marginBottom: '20px',
      paddingLeft: '8px',
      cursor: 'pointer',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '20px',
    },
    searchForm: {
      position: 'relative',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b',
    },
    searchInput: {
      width: '100%',
      padding: '10px 15px 10px 35px',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: 'rgba(241, 245, 249, 0.7)',
      transition: 'all 0.2s ease',
      ':focus': {
        borderColor: '#6366f1',
        backgroundColor: 'white',
      },
    },
    searchInputDark: {
      width: '100%',
      padding: '10px 15px 10px 35px',
      borderRadius: '20px',
      border: '1px solid #334155',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      color: '#e2e8f0',
      transition: 'all 0.2s ease',
      ':focus': {
        borderColor: '#818cf8',
        backgroundColor: '#1e293b',
      },
    },
    searchResults: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '8px 0',
      zIndex: 1000,
      marginTop: '4px',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    searchResultsDark: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#1e293b',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      padding: '8px 0',
      zIndex: 1000,
      marginTop: '4px',
      maxHeight: '300px',
      overflowY: 'auto',
      border: '1px solid #334155',
    },
    searchResultItem: {
      padding: '10px 15px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f1f5f9',
      },
    },
    searchResultItemDark: {
      padding: '10px 15px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#334155',
      },
    },
    navMenu: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: 'auto',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#64748b',
      ':hover': {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        color: '#6366f1',
      },
    },
    navItemDark: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#94a3b8',
      ':hover': {
        backgroundColor: 'rgba(129, 140, 248, 0.2)',
        color: '#818cf8',
      },
    },
    navIcon: {
      fontSize: '20px',
    },
    createPostButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 16px',
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#4f46e5',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
      },
    },
    createPostButtonDark: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 16px',
      backgroundColor: '#818cf8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#6366f1',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(129, 140, 248, 0.3)',
      },
    },
    notificationContainer: {
      position: 'relative',
      marginBottom: '16px',
    },
    notificationButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      ':hover': {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    },
    notificationButtonDark: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      color: '#818cf8',
      ':hover': {
        backgroundColor: 'rgba(129, 140, 248, 0.3)',
      },
    },
    notificationIcon: {
      fontSize: '20px',
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '12px',
      transform: 'translate(50%, -50%)',
    },
    notificationDropdown: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      zIndex: 1000,
      maxHeight: '400px',
      overflowY: 'auto',
      marginBottom: '10px',
    },
    notificationDropdownDark: {
      position: 'absolute',
      bottom: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#1e293b',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
      padding: '10px',
      zIndex: 1000,
      maxHeight: '400px',
      overflowY: 'auto',
      marginBottom: '10px',
      border: '1px solid #334155',
    },
    notificationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 0',
      marginBottom: '5px',
    },
    notificationItem: {
      padding: '10px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    notificationItemDark: {
      padding: '10px',
      borderBottom: '1px solid #334155',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    notificationContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    notificationTimestamp: {
      fontSize: '12px',
      marginTop: '5px',
    },
    clearButton: {
      padding: '5px 10px',
      backgroundColor: 'transparent',
      color: '#ef4444',
      border: '1px solid #ef4444',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    },
    themeToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '16px',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      ':hover': {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
    },
    userProfileDark: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '16px',
    },
    userName: {
      margin: '0',
      fontWeight: '600',
      fontSize: '14px',
    },
    userNameDark: {
      margin: '0',
      fontWeight: '600',
      fontSize: '14px',
      color: '#e2e8f0',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      color: '#64748b',
      fontSize: '12px',
      cursor: 'pointer',
      padding: '4px 0',
      transition: 'all 0.2s ease',
      ':hover': {
        color: '#6366f1',
      },
    },
    logoutButtonDark: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      fontSize: '12px',
      cursor: 'pointer',
      padding: '4px 0',
      transition: 'all 0.2s ease',
      ':hover': {
        color: '#818cf8',
      },
    },
  };
  
  export default SideNavigation;