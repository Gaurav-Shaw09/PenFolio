import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(location.state?.blog || null); // Use location.state if available
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(!location.state?.blog); // Load only if blog is not in location.state
    const [error, setError] = useState(null); // State to handle errors

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");

    // Fetch blog data if not available in location.state
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/blogs/${id}`);
                setBlog(response.data);
                setLikes(response.data.likes || 0);
                setComments(response.data.comments || []);
                // Check if the current user has already liked the blog
                if (response.data.likedUsers && response.data.likedUsers.includes(loggedInUserId)) {
                    setLiked(true);
                }
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
            // Send like request to the backend
            const response = await axios.post(`http://localhost:8080/api/blogs/${id}/like`, null, {
                params: { userId: loggedInUserId },
            });

            // Update the blog state with the response data
            setBlog(response.data);
            setLikes(response.data.likes);
            setLiked(response.data.likedUsers.includes(loggedInUserId));
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment || !blog?.id) return;

        const commentData = { author: loggedInUsername, content: newComment };
        try {
            // Send comment request to the backend
            const response = await axios.post(`http://localhost:8080/api/blogs/${blog.id}/comment`, commentData);

            // Update the blog state with the response data
            setBlog(response.data);
            setComments(response.data.comments);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
            setError("Failed to add comment. Please try again.");
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
            <p><b>Author:</b> {blog.author}</p>
            {blog.imagePath && (
                <img 
                    src={`http://localhost:8080/${blog.imagePath}`} 
                    alt="Blog" 
                    style={styles.fullImage}
                />
            )}
            <p style={styles.content}>{blog.content}</p>

            {/* Like Button */}
            <button onClick={handleLike} style={styles.likeButton}>
                {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
            </button>

            {/* Comment Section */}
            <div style={styles.commentSection}>
                <h3>Comments</h3>
                <ul style={styles.commentList}>
                    {comments.map((comment, index) => (
                        <li key={index} style={styles.commentItem}>
                            <p><strong>{comment.author}:</strong> {comment.content}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit} style={styles.commentInputContainer}>
                    <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)}
                        style={styles.commentInput}
                    />
                    <button type="submit" style={styles.commentButton}>Post</button>
                </form>
            </div>

            {/* Error Message */}
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
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "5px",
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