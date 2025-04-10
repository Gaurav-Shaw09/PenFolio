import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiHeart, FiMessageSquare, FiMoreVertical, FiClock, FiSend, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

const BlogDetails = ({ isDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(location.state?.blog || null);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(!location.state?.blog);
    const [error, setError] = useState(null);
    const [commentMenuOpen, setCommentMenuOpen] = useState(null);
    const [commentLikes, setCommentLikes] = useState({});
    const [commentLikeCounts, setCommentLikeCounts] = useState({});

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/blogs/${id}`);
                setBlog(response.data);
                setLikes(response.data.likes || 0);
                setComments(response.data.comments || []);

                if (response.data.likedUsers && response.data.likedUsers.includes(loggedInUserId)) {
                    setLiked(true);
                }

                // Initialize comment likes state
                const likesState = {};
                const likeCounts = {};
                response.data.comments?.forEach(comment => {
                    likesState[comment.id] = comment.likedUsers?.includes(loggedInUserId) || false;
                    likeCounts[comment.id] = comment.likes || 0;
                });
                setCommentLikes(likesState);
                setCommentLikeCounts(likeCounts);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError("Failed to load blog details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, loggedInUserId]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/blogs/${id}/like`, null, {
                params: { userId: loggedInUserId },
            });
            setBlog(response.data);
            setLikes(response.data.likes);
            setLiked(response.data.likedUsers.includes(loggedInUserId));
        } catch (error) {
            console.error("Error liking blog:", error);
            setError("Failed to like the blog. Please try again.");
        }
    };

    const handleCommentLike = async (commentId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/blogs/${id}/comments/${commentId}/like`,
                null,
                { params: { userId: loggedInUserId } }
            );

            setCommentLikes(prev => ({
                ...prev,
                [commentId]: response.data.likedUsers.includes(loggedInUserId),
            }));

            setCommentLikeCounts(prev => ({
                ...prev,
                [commentId]: response.data.likes,
            }));

            setComments(prev =>
                prev.map(comment =>
                    comment.id === commentId ? response.data : comment
                )
            );
        } catch (error) {
            console.error("Error liking comment:", error);
            setError("Failed to like the comment. Please try again.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            setError("Comment cannot be empty.");
            return;
        }
        if (!loggedInUserId || !loggedInUsername) {
            setError("You must be logged in to comment.");
            return;
        }

        const commentData = {
            content: newComment,
            author: loggedInUsername,
            authorId: loggedInUserId,
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/api/blogs/${id}/comment`,
                commentData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setBlog(response.data);
            setComments(response.data.comments || []);
            setNewComment("");

            // Initialize like state for the new comment
            const newCommentId = response.data.comments[response.data.comments.length - 1].id;
            setCommentLikes(prev => ({ ...prev, [newCommentId]: false }));
            setCommentLikeCounts(prev => ({ ...prev, [newCommentId]: 0 }));
        } catch (error) {
            console.error("Error adding comment:", error);
            if (error.response) {
                setError(error.response.data || "Failed to add comment. Please try again.");
            } else {
                setError("Failed to add comment. Please try again.");
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/blogs/${id}/comments/${commentId}`,
                {
                    data: { username: loggedInUsername },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setComments(comments.filter(comment => comment.id !== commentId));
            setCommentMenuOpen(null);

            // Remove like data for deleted comment
            setCommentLikes(prev => {
                const newState = { ...prev };
                delete newState[commentId];
                return newState;
            });

            setCommentLikeCounts(prev => {
                const newCounts = { ...prev };
                delete newCounts[commentId];
                return newCounts;
            });
        } catch (error) {
            console.error("Error deleting comment:", error);
            setError(error.response?.data || "Failed to delete comment.");
        }
    };

    if (loading) {
        return (
            <div style={{
                ...styles.loadingContainer,
                background: isDarkMode ? "#0f172a" : "#f8fafc",
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}>
                <div style={styles.spinner}></div>
                <p>Loading blog post...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div style={{
                ...styles.errorContainer,
                background: isDarkMode ? "#0f172a" : "#f8fafc",
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}>
                <h2>Blog not found!</h2>
                <button onClick={() => navigate(-1)} style={{
                    ...styles.backButton,
                    backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.1)",
                    color: isDarkMode ? "#818cf8" : "#6366f1"
                }}>
                    <FiArrowLeft style={{ marginRight: 8 }} /> Go Back
                </button>
            </div>
        );
    }

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
                    ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
                    : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div style={styles.blogHeader} variants={itemVariants}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{
                        ...styles.backButton,
                        backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.1)",
                        color: isDarkMode ? "#818cf8" : "#6366f1"
                    }}
                >
                    <FiArrowLeft style={{ marginRight: 8 }} /> Back
                </button>
                <h1 style={{
                    ...styles.blogTitle,
                    color: isDarkMode ? "#e2e8f0" : "#1e293b"
                }}>{blog.title}</h1>
            </motion.div>

            <motion.div 
                style={{
                    ...styles.blogContent,
                    backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
                }}
                variants={itemVariants}
            >
                <div style={styles.authorSection}>
                    <div 
                        style={{
                            ...styles.avatar,
                            backgroundColor: isDarkMode ? "#818cf8" : "#6366f1"
                        }}
                        onClick={() => navigate(`/profile/${blog.author}`)}
                    >
                        {blog.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p 
                            style={{
                                ...styles.authorName,
                                color: isDarkMode ? "#e2e8f0" : "#1e293b"
                            }}
                            onClick={() => navigate(`/profile/${blog.author}`)}
                        >
                            {blog.author}
                        </p>
                        <p style={{
                            ...styles.postTime,
                            color: isDarkMode ? "rgba(226, 232, 240, 0.7)" : "#64748b"
                        }}>
                            <FiClock style={{ marginRight: 5 }} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {blog.imagePath && (
                    <img
                        src={`http://localhost:8080/${blog.imagePath}`}
                        alt="Blog"
                        style={styles.blogImage}
                    />
                )}

                <div style={styles.blogText}>
                    {blog.content.split('\n').map((paragraph, i) => (
                        <p key={i} style={{
                            ...styles.paragraph,
                            color: isDarkMode ? "#e2e8f0" : "#334155"
                        }}>{paragraph}</p>
                    ))}
                </div>

                <div style={{
                    ...styles.interactionBar,
                    borderTop: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
                }}>
                    <button 
                        onClick={handleLike} 
                        style={{
                            ...styles.likeButton,
                            color: liked ? '#ff4757' : (isDarkMode ? '#94a3b8' : '#64748b'),
                            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "transparent"
                        }}
                    >
                        <FiHeart style={{ marginRight: 8 }} />
                        {likes} {likes === 1 ? 'Like' : 'Likes'}
                    </button>
                    <div style={{
                        ...styles.commentCount,
                        color: isDarkMode ? '#94a3b8' : '#64748b'
                    }}>
                        <FiMessageSquare style={{ marginRight: 8 }} />
                        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </div>
                </div>
            </motion.div>

            <motion.div 
                style={{
                    ...styles.commentSection,
                    backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
                }}
                variants={itemVariants}
            >
                <h3 style={{
                    ...styles.commentTitle,
                    color: isDarkMode ? "#e2e8f0" : "#1e293b"
                }}>Comments</h3>
                
                {comments.length > 0 ? (
                    <div style={styles.commentList}>
                        {comments.map((comment) => (
                            <motion.div 
                                key={comment.id} 
                                style={{
                                    ...styles.commentItem,
                                    backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.6)",
                                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)"
                                }}
                                whileHover={{ 
                                    backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div style={styles.commentHeader}>
                                    <div 
                                        style={{
                                            ...styles.commentAvatar,
                                            backgroundColor: isDarkMode ? "#818cf8" : "#6366f1"
                                        }}
                                        onClick={() => navigate(`/profile/${comment.author}`)}
                                    >
                                        {comment.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div style={styles.commentContent}>
                                        <div style={styles.commentMeta}>
                                            <span 
                                                style={{
                                                    ...styles.commentAuthor,
                                                    color: isDarkMode ? "#e2e8f0" : "#1e293b"
                                                }}
                                                onClick={() => navigate(`/profile/${comment.author}`)}
                                            >
                                                {comment.author}
                                            </span>
                                            <span style={{
                                                ...styles.commentTime,
                                                color: isDarkMode ? "rgba(226, 232, 240, 0.7)" : "#64748b"
                                            }}>
                                                <FiClock style={{ marginRight: 5 }} />
                                                {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p style={{
                                            ...styles.commentText,
                                            color: isDarkMode ? "#e2e8f0" : "#334155"
                                        }}>{comment.content}</p>
                                    </div>
                                </div>
                                
                                <div style={styles.commentActions}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCommentLike(comment.id);
                                        }}
                                        style={{
                                            ...styles.commentLikeButton,
                                            color: commentLikes[comment.id] ? '#ff4757' : (isDarkMode ? '#94a3b8' : '#64748b'),
                                            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
                                        }}
                                    >
                                        <FiHeart size={16} />
                                        <span style={styles.commentLikeCount}>
                                            {commentLikeCounts[comment.id] || 0}
                                        </span>
                                    </button>
                                    
                                    {(comment.author === loggedInUsername || blog.author === loggedInUsername) && (
                                        <div style={styles.commentMenuContainer}>
                                            <button
                                                style={{
                                                    ...styles.commentMenuButton,
                                                    color: isDarkMode ? "#94a3b8" : "#64748b"
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCommentMenuOpen(
                                                        commentMenuOpen === comment.id ? null : comment.id
                                                    );
                                                }}
                                            >
                                                <FiMoreVertical size={18} />
                                            </button>
                                            {commentMenuOpen === comment.id && (
                                                <div style={{
                                                    ...styles.commentMenu,
                                                    backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
                                                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
                                                }}>
                                                    <button
                                                        style={{
                                                            ...styles.commentMenuItem,
                                                            color: isDarkMode ? "#fca5a5" : "#ef4444"
                                                        }}
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                    >
                                                        <FiTrash2 style={{ marginRight: 8 }} />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.noComments}>
                        <FiMessageSquare size={48} style={{ 
                            color: isDarkMode ? '#475569' : '#94a3b8', 
                            marginBottom: 16 
                        }} />
                        <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                            No comments yet. Be the first to comment!
                        </p>
                    </div>
                )}

                <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
                    <div style={styles.commentInputContainer}>
                        <textarea
                            placeholder="Write your comment here..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{
                                ...styles.commentInput,
                                background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                                '::placeholder': {
                                    color: isDarkMode ? "rgba(226, 232, 240, 0.5)" : "rgba(30, 41, 59, 0.5)"
                                }
                            }}
                            rows={3}
                        />
                        <button 
                            type="submit" 
                            style={{
                                ...styles.commentSubmitButton,
                                backgroundColor: isDarkMode ? "#818cf8" : "#6366f1"
                            }}
                            whileHover={{ 
                                backgroundColor: isDarkMode ? "#6366f1" : "#4f46e5",
                                transform: "translateY(-2px)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiSend size={18} />
                        </button>
                    </div>
                </form>
            </motion.div>

            {error && (
                <motion.div 
                    style={{
                        ...styles.errorMessage,
                        backgroundColor: isDarkMode ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
                        color: isDarkMode ? "#fca5a5" : "#ef4444"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.div>
            )}
        </motion.div>
    );
};

const styles = {
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '16px',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '@media (min-width: 768px)': {
            padding: '24px',
            maxWidth: '800px'
        },
        '@media (min-width: 1024px)': {
            maxWidth: '1000px'
        }
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '16px',
        textAlign: 'center'
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid rgba(99, 102, 241, 0.2)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px',
        '@media (min-width: 768px)': {
            width: '50px',
            height: '50px',
            borderWidth: '5px'
        }
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '16px',
        textAlign: 'center',
        '@media (min-width: 768px)': {
            padding: '24px'
        }
    },
    blogHeader: {
        marginBottom: '24px',
        position: 'relative',
        '@media (min-width: 768px)': {
            marginBottom: '32px'
        }
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        color: '#6366f1',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s',
        marginBottom: '12px',
        '@media (min-width: 768px)': {
            padding: '8px 16px',
            marginBottom: '16px'
        }
    },
    blogTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0',
        lineHeight: '1.3',
        '@media (min-width: 768px)': {
            fontSize: '32px'
        }
    },
    blogContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '@media (min-width: 768px)': {
            padding: '24px',
            marginBottom: '32px'
        }
    },
    authorSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        '@media (min-width: 768px)': {
            marginBottom: '24px'
        }
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '@media (min-width: 768px)': {
            width: '48px',
            height: '48px',
            fontSize: '18px'
        }
    },
    authorName: {
        margin: '0',
        fontWeight: '600',
        color: '#1e293b',
        cursor: 'pointer',
        transition: 'color 0.2s',
        fontSize: '14px',
        '@media (min-width: 768px)': {
            fontSize: '16px'
        }
    },
    postTime: {
        margin: '4px 0 0 0',
        fontSize: '12px',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center'
    },
    blogImage: {
        width: '100%',
        borderRadius: '8px',
        marginBottom: '16px',
        maxHeight: '300px',
        objectFit: 'cover',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '@media (min-width: 768px)': {
            borderRadius: '12px',
            marginBottom: '24px',
            maxHeight: '400px'
        }
    },
    blogText: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#334155',
        padding: '0',
        fontWeight: '400',
        '@media (min-width: 768px)': {
            fontSize: '18px',
            padding: '0 24px'
        },
        '@media (min-width: 1024px)': {
            fontSize: '20px',
            padding: '0 48px'
        }
    },
    paragraph: {
        marginBottom: '16px'
    },
    interactionBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        '@media (min-width: 768px)': {
            gap: '24px',
            marginTop: '24px',
            paddingTop: '16px'
        }
    },
    likeButton: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        padding: '6px 12px',
        borderRadius: '20px',
        transition: 'all 0.2s',
        '@media (min-width: 768px)': {
            padding: '8px 16px',
            fontSize: '14px'
        }
    },
    commentCount: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#64748b'
    },
    commentSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '@media (min-width: 768px)': {
            padding: '24px'
        }
    },
    commentTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '16px',
        '@media (min-width: 768px)': {
            fontSize: '20px',
            marginBottom: '24px'
        }
    },
    commentList: {
        marginBottom: '16px',
        '@media (min-width: 768px)': {
            marginBottom: '24px'
        }
    },
    commentItem: {
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        '@media (min-width: 768px)': {
            padding: '16px',
            marginBottom: '16px'
        }
    },
    commentHeader: {
        display: 'flex',
        gap: '12px',
        marginBottom: '8px',
        '@media (min-width: 768px)': {
            marginBottom: '12px'
        }
    },
    commentAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        flexShrink: '0',
        '@media (min-width: 768px)': {
            width: '36px',
            height: '36px',
            fontSize: '14px'
        }
    },
    commentContent: {
        flex: '1'
    },
    commentMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '4px'
    },
    commentAuthor: {
        fontWeight: '600',
        color: '#1e293b',
        cursor: 'pointer',
        transition: 'color 0.2s',
        fontSize: '14px',
        '@media (min-width: 768px)': {
            fontSize: '14px'
        }
    },
    commentTime: {
        fontSize: '12px',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center'
    },
    commentText: {
        margin: '0',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#334155'
    },
    commentActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '8px',
        marginTop: '8px',
        '@media (min-width: 768px)': {
            gap: '12px',
            marginTop: '12px'
        }
    },
    commentLikeButton: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px',
        padding: '4px 8px',
        borderRadius: '20px',
        transition: 'all 0.2s',
        '@media (min-width: 768px)': {
            fontSize: '14px'
        }
    },
    commentLikeCount: {
        marginLeft: '4px',
        fontSize: '12px'
    },
    commentMenuContainer: {
        position: 'relative'
    },
    commentMenuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b',
        padding: '4px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    commentMenu: {
        position: 'absolute',
        right: '0',
        top: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '8px',
        zIndex: '10',
        minWidth: '120px'
    },
    commentMenuItem: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '8px 12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#ef4444',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    noComments: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#64748b',
        textAlign: 'center',
        '@media (min-width: 768px)': {
            padding: '32px'
        }
    },
    commentForm: {
        marginTop: '16px',
        '@media (min-width: 768px)': {
            marginTop: '24px'
        }
    },
    commentInputContainer: {
        display: 'flex',
        gap: '8px',
        '@media (min-width: 768px)': {
            gap: '12px'
        }
    },
    commentInput: {
        flex: '1',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(5px)',
        fontSize: '14px',
        resize: 'vertical',
        minHeight: '80px',
        transition: 'all 0.2s'
    },
    commentSubmitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        flexShrink: '0',
        alignSelf: 'flex-end',
        '@media (min-width: 768px)': {
            width: '48px',
            height: '48px'
        }
    },
    errorMessage: {
        padding: '12px',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        borderRadius: '8px',
        marginTop: '16px',
        textAlign: 'center',
        fontSize: '14px',
        '@media (min-width: 768px)': {
            padding: '16px',
            marginTop: '24px',
            fontSize: '14px'
        }
    }
};

// Add global styles
const globalStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    
    .backButton:hover {
        background-color: rgba(99, 102, 241, 0.2);
        transform: translateY(-1px);
    }
    
    .avatar:hover, .commentAvatar:hover {
        transform: scale(1.05);
    }
    
    .authorName:hover, .commentAuthor:hover {
        color: #6366f1;
    }
    
    .likeButton:hover {
        background-color: rgba(239, 68, 68, 0.1);
    }
    
    .commentLikeButton:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    .commentMenuButton:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: #1e293b;
    }
    
    .commentMenuItem:hover {
        background-color: rgba(239, 68, 68, 0.1);
    }
    
    .commentInput:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
    
    .commentSubmitButton:hover {
        background-color: #4f46e5;
        transform: translateY(-2px);
    }

    @media (max-width: 767px) {
        .blogText {
            padding: 0 !important;
        }
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${globalStyles}</style>`);

export default BlogDetails;