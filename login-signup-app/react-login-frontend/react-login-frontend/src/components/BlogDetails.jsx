import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
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
    const [commentLikes, setCommentLikes] = useState({}); // Track which comments are liked
    const [commentLikeCounts, setCommentLikeCounts] = useState({}); // Track like counts per comment

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
        }
    };

    const handleCommentLike = async (commentId) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/blogs/${id}/comments/${commentId}/like`,
                null,
                { params: { userId: loggedInUserId } }
            );
            
            // Update the specific comment's like status and count
            setCommentLikes(prev => ({
                ...prev,
                [commentId]: response.data.likedUsers.includes(loggedInUserId)
            }));
            
            setCommentLikeCounts(prev => ({
                ...prev,
                [commentId]: response.data.likes
            }));

            // Update the comments array to reflect the changes
            setComments(prev => prev.map(comment => 
                comment.id === commentId ? response.data : comment
            ));

        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment || !blog?.id) return;

        const commentData = { author: loggedInUsername, content: newComment };
        try {
            const response = await axios.post(`http://localhost:8080/api/blogs/${blog.id}/comment`, commentData);
            setBlog(response.data);
            setComments(response.data.comments);
            setNewComment("");
            
            // Initialize like state for new comment
            const newCommentId = response.data.comments[response.data.comments.length - 1].id;
            setCommentLikes(prev => ({ ...prev, [newCommentId]: false }));
            setCommentLikeCounts(prev => ({ ...prev, [newCommentId]: 0 }));

        } catch (error) {
            console.error("Error adding comment:", error);
            setError("Failed to add comment. Please try again.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/blogs/${blog.id}/comments/${commentId}`,
                {
                    data: { 
                        username: loggedInUsername
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            alert("Comment deleted successfully!");
            setComments(comments.filter(comment => comment._id !== commentId));
            setCommentMenuOpen(null);
            
            // Remove like data for deleted comment
            setCommentLikes(prev => {
                const newState = {...prev};
                delete newState[commentId];
                return newState;
            });
            
            setCommentLikeCounts(prev => {
                const newCounts = {...prev};
                delete newCounts[commentId];
                return newCounts;
            });

        } catch (error) {
            setError(error.response?.data || "Failed to delete comment");
        }
    };

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    if (!blog) {
        return <h2 style={{ textAlign: "center" }}>Blog not found!</h2>;
    }

    return (
        <div style={styles.container}>
            <button onClick={() => navigate(-1)} style={styles.backButton}>⬅ Go Back</button>
            <h2>{blog.title}</h2>
            <p><b>Author:</b> 
                <span 
                    style={styles.clickableUsername}
                    onClick={() => navigate(`/profile/${blog.author}`)}
                >
                    {blog.author}
                </span>
            </p>
            {blog.imagePath && (
                <img 
                    src={`http://localhost:8080/${blog.imagePath}`} 
                    alt="Blog" 
                    style={styles.fullImage}
                />
            )}
            <p style={styles.content}>{blog.content}</p>

            <button onClick={handleLike} style={styles.likeButton}>
                {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
            </button>

            <div style={styles.commentSection}>
                <h3>Comments</h3>
                <ul style={styles.commentList}>
                    {comments.map((comment) => (
                        <li key={comment.id} style={styles.commentItem}>
                            <div style={styles.commentHeader}>
                                <p style={styles.commentText}>
                                    <strong 
                                        style={styles.clickableUsername}
                                        onClick={() => navigate(`/profile/${comment.author}`)}
                                    >
                                        {comment.author}
                                    </strong>: {comment.content}
                                </p>
                                <div style={styles.commentActions}>
                                <button 
    onClick={(e) => {
        e.stopPropagation();
        handleCommentLike(comment.id);
    }}
    style={styles.commentLikeButton}
>
    {commentLikes[comment.id] ? (
        <span style={{ color: "red" }}>❤️</span>
    ) : (
        <span style={{ 
            color: "white", 
            textShadow: "0 0 1px #000",
            WebkitTextStroke: "1px #666" // Adds outline to make white heart visible
        }}>❤️</span>
    )}
    <span style={styles.commentLikeCount}>
        {commentLikeCounts[comment.id] || 0}
    </span>
</button>
                                    {(comment.author === loggedInUsername || blog.author === loggedInUsername) && (
                                        <div style={styles.commentMenuContainer}>
                                            <div
                                                style={styles.commentMenuButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCommentMenuOpen(commentMenuOpen === comment.id ? null : comment.id);
                                                }}
                                            >
                                                ⋮
                                            </div>
                                            {commentMenuOpen === comment.id && (
                                                <div style={styles.commentMenu}>
                                                    <button
                                                        style={styles.commentMenuItem}
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit} style={styles.commentInputContainer}>
                    <textarea 
                        placeholder="Add a comment..." 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)}
                        style={styles.commentInput}
                        rows={3}
                    />
                    <button type="submit" style={styles.commentButton}>Post</button>
                </form>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "25px",
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    },
    backButton: {
        padding: "10px 15px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginBottom: "20px",
        fontSize: "16px",
        transition: "background 0.3s ease",
    },
    fullImage: {
        width: "350px",
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px",
        marginTop: "15px",
        boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
    },
    content: {
        fontSize: "18px",
        textAlign: "justify",
        marginTop: "20px",
        lineHeight: "1.6",
        color: "#333",
    },
    likeButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#008CBA",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "15px",
        transition: "background 0.3s ease",
    },
    commentSection: {
        marginTop: "30px",
        textAlign: "left",
    },
    commentList: {
        listStyle: "none",
        padding: 0,
        margin: "10px 0",
    },
    commentItem: {
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "10px",
        position: "relative",
        wordWrap: "break-word",
        overflow: "hidden",
    },
    commentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    commentText: {
        flex: 1,
        marginRight: "10px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "hidden",
    },
    commentActions: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    commentLikeButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderRadius: "5px",
        transition: "all 0.2s",
        '&:hover': {
            background: "#f0f0f0",
        },
    },
    commentLikeCount: {
        marginLeft: "5px",
        fontSize: "14px",
        color: "#666",
    },
    clickableUsername: {
        cursor: "pointer",
        color: "#007bff",
        '&:hover': {
            textDecoration: "underline",
        }
    },
    commentMenuContainer: {
        position: "relative",
    },
    commentMenuButton: {
        cursor: "pointer",
        padding: "5px",
        fontSize: "18px",
        color: "#666",
        '&:hover': {
            color: "#333",
        },
    },
    commentMenu: {
        position: "absolute",
        right: 0,
        top: "100%",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 100,
        minWidth: "100px",
    },
    commentMenuItem: {
        padding: "8px 15px",
        display: "block",
        width: "100%",
        textAlign: "left",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "#f44336",
        '&:hover': {
            backgroundColor: "#f5f5f5",
        },
    },
    commentInputContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    commentInput: {
        flex: 1,
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        minHeight: "40px",
        resize: "vertical",
    },
    commentButton: {
        padding: "8px 12px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default BlogDetails;