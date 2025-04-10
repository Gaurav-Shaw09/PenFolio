import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiGlobe, FiUsers, FiHeart, FiMessageSquare, FiX, FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Home = ({ isDarkMode }) => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [followingBlogs, setFollowingBlogs] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;
    const navigate = useNavigate();

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        fetchAllBlogs();
        fetchFollowingBlogs();
        fetchNotifications();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/blogs");
            setAllBlogs(response.data.sort((a, b) => b.id.localeCompare(a.id)));
        } catch (error) {
            console.error("Error fetching all blogs:", error);
        }
    };

    const fetchFollowingBlogs = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/blogs/following/${loggedInUserId}`
            );
            setFollowingBlogs(response.data.sort((a, b) => b.id.localeCompare(a.id)));
        } catch (error) {
            console.error("Error fetching following blogs:", error);
        }
    };

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
            } else {
                alert("Cannot navigate: Follower information is missing.");
            }
        }
    };

    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleLike = async (blogId) => {
        try {
            await axios.post(`http://localhost:8080/api/blogs/${blogId}/like`, null, {
                params: { userId: loggedInUserId },
            });
            fetchAllBlogs();
            fetchFollowingBlogs();
            fetchNotifications();
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchAllBlogs();
            fetchFollowingBlogs();
            return;
        }

        try {
            const usersResponse = await axios.get(
                `http://localhost:8080/api/users/search?query=${searchQuery}`
            );
            const matchingUsernames = usersResponse.data.map(user => user.username);

            const blogsResponse = await axios.get("http://localhost:8080/api/blogs");
            const allBlogsData = blogsResponse.data;

            const filteredAllBlogs = allBlogsData.filter(blog => 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                matchingUsernames.includes(blog.author)
            );

            const filteredFollowingBlogs = filteredAllBlogs.filter(blog => 
                followingBlogs.some(fb => fb.id === blog.id)
            );

            setAllBlogs(filteredAllBlogs.sort((a, b) => b.id.localeCompare(a.id)));
            setFollowingBlogs(filteredFollowingBlogs.sort((a, b) => b.id.localeCompare(a.id)));
        } catch (error) {
            console.error("Error searching:", error);
            alert("Error performing search!");
            fetchAllBlogs();
            fetchFollowingBlogs();
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        fetchAllBlogs();
        fetchFollowingBlogs();
    };

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentAllBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const currentFollowingBlogs = followingBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPagesAll = Math.ceil(allBlogs.length / blogsPerPage);
    const totalPagesFollowing = Math.ceil(followingBlogs.length / blogsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const unreadCount = notifications.filter(notif => !notif.isRead).length;

    const renderBlogs = (blogs) => (
        <div style={getStyles().blogContainer}>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <motion.div 
                        key={blog.id} 
                        style={{
                            ...getStyles().blogCard,
                            backgroundColor: isDarkMode ? "#1e293b" : "white",
                            boxShadow: isDarkMode 
                                ? "0 5px 15px rgba(0, 0, 0, 0.3)"
                                : "0 5px 15px rgba(0, 0, 0, 0.08)",
                        }}
                        whileHover={{ 
                            transform: "translateY(-5px)",
                            boxShadow: isDarkMode 
                                ? "0 8px 25px rgba(0, 0, 0, 0.4)"
                                : "0 8px 25px rgba(0, 0, 0, 0.15)",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{
                            ...getStyles().blogHeader,
                            borderBottom: isDarkMode 
                                ? "1px solid rgba(255, 255, 255, 0.1)"
                                : "1px solid #eee",
                        }}>
                            <span
                                style={{
                                    ...getStyles().username,
                                    color: isDarkMode ? "#818cf8" : "#4facfe",
                                }}
                                onClick={() => navigate(`/profile/${blog.author}`)}
                            >
                                @{blog.author}
                            </span>
                            <span style={{
                                ...getStyles().blogDate,
                                color: isDarkMode ? "#94a3b8" : "#888",
                            }}>
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 style={{
                            ...getStyles().blogTitle,
                            color: isDarkMode ? "#e2e8f0" : "#333",
                        }}>
                            {blog.title}
                        </h3>
                        {blog.imagePath && (
                            <div style={getStyles().imageContainer}>
                                <img
                                    src={`http://localhost:8080/${blog.imagePath}`}
                                    alt="Blog"
                                    style={getStyles().blogImage}
                                />
                            </div>
                        )}
                        <div style={getStyles().blogContent}>
                            <p style={{
                                ...getStyles().blogText,
                                color: isDarkMode ? "#cbd5e1" : "#555",
                            }}>
                                {expanded[blog.id] 
                                    ? blog.content
                                    : blog.content.length > 150
                                        ? `${blog.content.substring(0, 150)}...`
                                        : blog.content}
                            </p>
                        </div>
                        <div style={{
                            ...getStyles().blogActions,
                            borderTop: isDarkMode 
                                ? "1px solid rgba(255, 255, 255, 0.1)"
                                : "1px solid #eee",
                        }}>
                            {blog.content.length > 150 && (
                                <button
                                onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                                    style={{
                                        ...getStyles().readMoreButton,
                                        color: isDarkMode ? "#818cf8" : "#4facfe",
                                        border: isDarkMode 
                                            ? "1px solid #818cf8"
                                            : "1px solid #4facfe",
                                    }}
                                >
                                    {expanded[blog.id] ? "Show Less" : "Read More"}
                                </button>
                            )}
                            <button
                                onClick={() => handleLike(blog.id)}
                                style={{
                                    ...getStyles().likeButton,
                                    backgroundColor: blog.likedUsers && blog.likedUsers.includes(loggedInUserId)
                                        ? (isDarkMode ? "#4ade80" : "#16a34a")
                                        : (isDarkMode ? "#3b82f6" : "#4facfe"),
                                }}
                            >
                                <FiHeart style={{ marginRight: 5 }} />
                                {blog.likes || 0}
                            </button>
                            <button
                                onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                                style={{
                                    ...getStyles().commentButton,
                                    color: isDarkMode ? "#94a3b8" : "#888",
                                    border: isDarkMode 
                                        ? "1px solid #334155"
                                        : "1px solid #ddd",
                                }}
                            >
                                <FiMessageSquare style={{ marginRight: 5 }} />
                                Comments
                            </button>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div style={{
                    ...getStyles().emptyState,
                    backgroundColor: isDarkMode ? "#1e293b" : "white",
                    color: isDarkMode ? "#94a3b8" : "#666",
                    gridColumn: "1 / -1",
                }}>
                    <p>No blogs found matching your search.</p>
                </div>
            )}
        </div>
    );

    const renderPagination = (totalPages) => {
        if (totalPages <= 1) return null;

        return (
            <div style={getStyles().paginationContainer}>
                <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{
                        ...getStyles().paginationButton,
                        backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                        border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                        color: isDarkMode ? "#e2e8f0" : "#1e293b",
                        opacity: currentPage === 1 ? 0.5 : 1,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    <FiChevronLeft size={18} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        style={{
                            ...getStyles().paginationButton,
                            backgroundColor: number === currentPage 
                                ? (isDarkMode ? "#818cf8" : "#6366f1")
                                : (isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"),
                            border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                            color: number === currentPage 
                                ? 'white' 
                                : (isDarkMode ? "#e2e8f0" : "#1e293b"),
                        }}
                    >
                        {number}
                    </button>
                ))}
                
                <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                        ...getStyles().paginationButton,
                        backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                        border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                        color: isDarkMode ? "#e2e8f0" : "#1e293b",
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    <FiChevronRight size={18} />
                </button>
            </div>
        );
    };

    const getStyles = () => {
        const isMobile = windowWidth <= 768;
        const isSmallScreen = windowWidth <= 480;

        return {
            container: {
                fontFamily: "'Inter', sans-serif",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                transition: "background-color 0.3s ease, color 0.3s ease",
                background: isDarkMode 
                    ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
                    : "#f8f9fa",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
            },
            mainContent: {
                padding: "20px",
                flex: 1,
                maxWidth: "1400px",
                margin: "0 auto",
                width: "100%",
            },
            headerWrapper: {
                width: "100%",
                marginBottom: "30px",
                padding: isMobile ? "10px" : "10px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(50px)",
                borderRadius: "0 10px 10px 10px",
                position: "sticky",
                top: isMobile ? "60px" : "20px",
                zIndex: "100",
            },
            headerControls: {
                display: "flex",
                flexDirection: isMobile ? "row" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
            },
            searchContainer: {
                flex: 1,
                minWidth: "250px",
                width: isMobile ? "50%" : undefined,
            },
            searchForm: {
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
            },
            searchIcon: {
                position: "absolute",
                left: "12px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
            },
            searchInput: {
                width: "100%",
                padding: "12px 16px 12px 40px",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                outline: "none",
                backgroundColor: isDarkMode ? "#334155" : "#e0e0e0",
                border: isDarkMode 
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                "::placeholder": {
                    color: isDarkMode ? "#94a3b8" : "#64748b",
                }
            },
            clearSearchButton: {
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
            },
            actionsContainer: {
                display: "flex",
                gap: "12px",
                alignItems: "center",
                justifyContent: isMobile ? "flex-end" : undefined,
                width: isMobile ? "100%" : undefined,
            },
            createButton: {
                padding: isSmallScreen ? "12px" : "12px 20px",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                backgroundColor: isDarkMode ? "#818cf8" : "#4facfe",
                width: isSmallScreen ? "40px" : undefined,
                height: isSmallScreen ? "40px" : undefined,
            },
            createButtonText: {
                marginLeft: "8px",
                display: isSmallScreen ? "none" : "block",
            },
            notificationContainer: {
                position: "relative",
            },
            notificationButton: {
                background: "none",
                border: "none",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                cursor: "pointer",
                position: "relative",
                padding: isSmallScreen ? "6px" : "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.2s ease",
                ":hover": {
                    backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(79, 70, 229, 0.1)",
                }
            },
            notificationBadge: {
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "600",
            },
            notificationDropdown: {
                position: "absolute",
                right: isSmallScreen ? "-20px" : "0",
                top: "100%",
                width: isSmallScreen ? "280px" : "350px",
                maxHeight: "400px",
                overflowY: "auto",
                borderRadius: "12px",
                boxShadow: isDarkMode 
                    ? "0 10px 25px rgba(0, 0, 0, 0.3)"
                    : "0 10px 25px rgba(0, 0, 0, 0.1)",
                zIndex: 100,
                backgroundColor: isDarkMode ? "#1e293b" : "white",
                border: isDarkMode 
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                transformOrigin: "top right",
            },
            notificationHeader: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: isDarkMode 
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: 0,
                backgroundColor: isDarkMode ? "#1e293b" : "white",
                zIndex: 1,
            },
            notificationTitle: {
                margin: 0,
                fontSize: "16px",
                fontWeight: "600",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
            },
            clearButton: {
                color: isDarkMode ? "#f87171" : "#ef4444",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                ":hover": {
                    backgroundColor: isDarkMode ? "rgba(248, 113, 113, 0.1)" : "rgba(239, 68, 68, 0.1)",
                }
            },
            notificationList: {
                padding: "8px 0",
            },
            notificationItem: {
                padding: "12px 16px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderBottom: isDarkMode 
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                ":hover": {
                    backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(79, 70, 229, 0.05)",
                },
                ":last-child": {
                    borderBottom: "none",
                }
            },
            unreadNotification: {
                backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.1)",
            },
            notificationMessage: {
                margin: 0,
                fontSize: "14px",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                fontWeight: "500",
            },
            notificationTime: {
                fontSize: "12px",
                color: isDarkMode ? "#94a3b8" : "#64748b",
            },
            notificationEmpty: {
                padding: "24px",
                textAlign: "center",
                color: isDarkMode ? "#94a3b8" : "#64748b",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
            },
            notificationLoading: {
                padding: "24px",
                textAlign: "center",
                color: isDarkMode ? "#94a3b8" : "#64748b",
            },
            tabContainer: {
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "30px",
            },
            tabButton: {
                padding: "12px 25px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: activeTab === "all" 
                    ? (isDarkMode ? "#818cf8" : "#4facfe")
                    : (isDarkMode ? "#334155" : "#e0e0e0"),
                color: activeTab === "all" ? "white" : (isDarkMode ? "#e2e8f0" : "#333"),
            },
            sectionTitle: {
                textAlign: "center",
                margin: "0 0 30px",
                fontSize: "24px",
                fontWeight: "600",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
            },
            blogContainer: {
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "30px",
                justifyContent: "center",
                margin: "0 auto",
            },
            blogCard: {
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
            },
            blogHeader: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
            },
            username: {
                fontWeight: "600",
                cursor: "pointer",
                transition: "color 0.3s ease",
            },
            blogDate: {
                fontSize: "12px",
            },
            blogTitle: {
                margin: "15px 20px 10px",
                fontSize: "18px",
                fontWeight: "600",
            },
            imageContainer: {
                width: "100%",
                height: "200px",
                overflow: "hidden",
            },
            blogImage: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
            },
            blogContent: {
                padding: "0 20px",
                flex: 1,
            },
            blogText: {
                lineHeight: "1.6",
                margin: "10px 0 20px",
            },
            blogActions: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
            },
            readMoreButton: {
                padding: "8px 15px",
                backgroundColor: "transparent",
                border: "1px solid",
                cursor: "pointer",
                borderRadius: "20px",
                fontSize: "14px",
                transition: "all 0.3s ease",
            },
            likeButton: {
                padding: "8px 15px",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "20px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
            },
            commentButton: {
                padding: "8px 15px",
                backgroundColor: "transparent",
                border: "1px solid",
                cursor: "pointer",
                borderRadius: "20px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
            },
            emptyState: {
                textAlign: "center",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                gridColumn: "1 / -1",
            },
            paginationContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginTop: '30px',
                flexWrap: 'wrap'
            },
            paginationButton: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: '500'
            },
        };
    };

    return (
        <div style={getStyles().container}>
            <div style={getStyles().mainContent}>
                <div style={getStyles().headerWrapper}>
                    <div style={getStyles().headerControls}>
                        <div style={getStyles().searchContainer}>
                            <form onSubmit={handleSearch} style={getStyles().searchForm}>
                                <FiSearch style={getStyles().searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search blogs or authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={getStyles().searchInput}
                                />
                                {searchQuery && (
                                    <button 
                                        type="button" 
                                        onClick={clearSearch}
                                        style={getStyles().clearSearchButton}
                                    >
                                        <FiX size={18} />
                                    </button>
                                )}
                            </form>
                        </div>

                        <div style={getStyles().actionsContainer}>
                            <motion.button 
                                onClick={() => navigate("/create-blog")} 
                                style={getStyles().createButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Create Blog"
                            >
                                <FiPlus size={20} />
                                <span style={getStyles().createButtonText}>Create Blog</span>
                            </motion.button>

            <div style={getStyles().notificationContainer}>
                <motion.button 
                    onClick={() => {
                        setShowNotifications(!showNotifications);
                        if (!showNotifications && unreadCount > 0) {
                            markNotificationsAsRead();
                        }
                    }}
                    style={getStyles().notificationButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Notifications"
                >
                    <FiBell size={20} />
                    {unreadCount > 0 && (
                        <span style={getStyles().notificationBadge}>{unreadCount}</span>
                    )}
                </motion.button>
                {showNotifications && (
                    <motion.div 
                        style={getStyles().notificationDropdown}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div style={getStyles().notificationHeader}>
                            <h3 style={getStyles().notificationTitle}>Notifications</h3>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearNotifications();
                                }}
                                style={getStyles().clearButton}
                            >
                                Clear All
                            </button>
                        </div>
                        
                        {loadingNotifications ? (
                            <div style={getStyles().notificationLoading}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        border: `3px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                                        borderTopColor: isDarkMode ? '#818cf8' : '#6366f1',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                </div>
                            </div>
                        ) : notifications.length > 0 ? (
                            <div style={getStyles().notificationList}>
                                {notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        style={{
                                            ...getStyles().notificationItem,
                                            ...(!notification.isRead ? getStyles().unreadNotification : {}),
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <p style={getStyles().notificationMessage}>
                                            {notification.message}
                                        </p>
                                        <small style={getStyles().notificationTime}>
                                            {new Date(notification.createdAt).toLocaleString([], {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </small>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div style={getStyles().notificationEmpty}>
                                <FiBell size={32} style={{ opacity: 0.5 }} />
                                <p>No notifications yet</p>
                                <small>We'll notify you when something happens</small>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
                        </div>
                    </div>
                </div>

                <div style={getStyles().tabContainer}>
                    <button
                        style={getStyles().tabButton}
                        onClick={() => setActiveTab("all")}
                    >
                        <FiGlobe style={{ marginRight: 8 }} />
                        All Blogs
                    </button>
                    <button
                        style={{
                            ...getStyles().tabButton,
                            backgroundColor: activeTab === "following" 
                                ? (isDarkMode ? "#818cf8" : "#4facfe")
                                : (isDarkMode ? "#334155" : "#e0e0e0"),
                            color: activeTab === "following" ? "white" : (isDarkMode ? "#e2e8f0" : "#333"),
                        }}
                        onClick={() => setActiveTab("following")}
                    >
                        <FiUsers style={{ marginRight: 8 }} />
                        Following
                    </button>
                </div>

                {activeTab === "all" ? (
                    <>
                        <h2 style={getStyles().sectionTitle}>
                            Explore All Blogs
                        </h2>
                        {allBlogs.length > 0 ? (
                            <>
                                {renderBlogs(currentAllBlogs)}
                                {renderPagination(totalPagesAll)}
                            </>
                        ) : (
                            <div style={{
                                ...getStyles().emptyState,
                                backgroundColor: isDarkMode ? "#1e293b" : "white",
                                color: isDarkMode ? "#94a3b8" : "#666",
                            }}>
                                <p>No blogs found. Be the first to create one!</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2 style={getStyles().sectionTitle}>
                            Blogs From People You Follow
                        </h2>
                        {followingBlogs.length > 0 ? (
                            <>
                                {renderBlogs(currentFollowingBlogs)}
                                {renderPagination(totalPagesFollowing)}
                            </>
                        ) : (
                            <div style={{
                                ...getStyles().emptyState,
                                backgroundColor: isDarkMode ? "#1e293b" : "white",
                                color: isDarkMode ? "#94a3b8" : "#666",
                            }}>
                                <p>You're not following anyone yet. Discover and follow people to see their blogs here!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;