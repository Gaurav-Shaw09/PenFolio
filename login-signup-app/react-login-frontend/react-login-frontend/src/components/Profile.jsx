import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        if (!username) {
            loggedInUsername
                ? navigate(`/profile/${loggedInUsername}`, { replace: true })
                : navigate("/login", { replace: true });
            setTimeout(() => {
                window.location.reload();
            }, 1);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${username}`);
                setProfile(response.data);
                setDescription(response.data.description || "");
                setFollowersCount(response.data.followers?.length || 0);
                setFollowingCount(response.data.following?.length || 0);
                if (response.data.userId) {
                    setUserId(response.data.userId);
                }
                const followers = response.data.followers || [];
                setIsFollowing(followers.includes(loggedInUserId));
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Profile not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, navigate, loggedInUsername, loggedInUserId]);

    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/blogs/user/username/${username}`);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (userId) fetchUserBlogs();
    }, [userId]);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await axios.post(`http://localhost:8080/api/profile/${username}/unfollow`, {
                    userId: loggedInUserId
                });
                setFollowersCount(prev => prev - 1);
                setIsFollowing(false);
            } else {
                await axios.post(`http://localhost:8080/api/profile/${username}/follow`, {
                    userId: loggedInUserId
                });
                setFollowersCount(prev => prev + 1);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Error following/unfollowing:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", description);
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/profile/${username}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProfile(response.data);
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            await axios.delete(`http://localhost:8080/api/blogs/${blogId}`, {
                data: { userId: loggedInUserId },
            });
            setBlogs(blogs.filter((blog) => blog._id !== blogId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("Please log in to create a blog.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", localStorage.getItem("username"));
        formData.append("userId", userId);
        if (image) formData.append("file", image);

        try {
            await axios.post("http://localhost:8080/api/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            fetchUserBlogs();
            setTitle("");
            setContent("");
            setImage(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    const handleLike = async (blogId) => {
        try {
            await axios.post(`http://localhost:8080/api/blogs/${blogId}/like`, null, {
                params: { userId: loggedInUserId }
            });
            fetchUserBlogs();
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
        </div>
    );

    if (error) return (
        <div style={styles.errorContainer}>
            <div style={styles.errorCard}>
                <h2 style={styles.errorTitle}>Oops!</h2>
                <p style={styles.errorText}>{error}</p>
                <button onClick={() => navigate("/home")} style={styles.errorButton}>
                    Return Home
                </button>
            </div>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.container}
        >
            <header style={styles.header}>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/home")} 
                    style={styles.backButton}
                >
                    ← Back to Home
                </motion.button>
                
                <h1 style={styles.title}>
                    <span style={styles.titleHighlight}>{profile?.username}'s</span> Profile
                </h1>
                
                {loggedInUsername === username && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        style={styles.createButton}
                    >
                        + New Blog
                    </motion.button>
                )}
            </header>

            <section style={styles.profileSection}>
                <motion.div 
                    whileHover={{ scale: 1.03 }}
                    style={styles.profilePictureContainer}
                >
                    {profile?.profilePicture ? (
                        <img
                            src={`http://localhost:8080/api/profile/${username}/profile-picture`}
                            alt="Profile"
                            style={styles.profilePicture}
                        />
                    ) : (
                        <div style={styles.placeholderPicture}>
                            <div style={styles.initials}>
                                {profile?.username?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </motion.div>

                <div style={styles.profileInfo}>
                    <h2 style={styles.username}>{profile?.username}</h2>
                    <div style={styles.followStats}>
                        <span style={styles.followCount}>
                            <strong>{followersCount}</strong> Followers
                        </span>
                        <span style={styles.followCount}>
                            <strong>{followingCount}</strong> Following
                        </span>
                    </div>
                    <p style={styles.description}>
                        {profile?.description || "No description yet. Share something about yourself!"}
                    </p>
                    
                    <div style={styles.profileActions}>
                        {loggedInUsername === username ? (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsEditing(!isEditing)}
                                style={isEditing ? styles.cancelButton : styles.editButton}
                            >
                                {isEditing ? "Cancel Editing" : "Edit Profile"}
                            </motion.button>
                        ) : (
                            loggedInUserId && (
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleFollow}
                                    style={isFollowing ? styles.unfollowButton : styles.followButton}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </motion.button>
                            )
                        )}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isEditing && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleSubmit}
                        style={styles.editForm}
                    >
                        <div style={styles.formGroup}>
                            <label htmlFor="profilePicture" style={styles.label}>
                                Profile Picture
                            </label>
                            <div style={styles.fileInputContainer}>
                                <label htmlFor="profilePicture" style={styles.fileInputLabel}>
                                    Choose File
                                </label>
                                <input 
                                    type="file" 
                                    id="profilePicture" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    style={styles.fileInput} 
                                />
                                <span style={styles.fileName}>
                                    {profilePicture ? profilePicture.name : "No file selected"}
                                </span>
                            </div>
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label htmlFor="description" style={styles.label}>
                                About Me
                            </label>
                            <textarea 
                                id="description" 
                                value={description} 
                                onChange={handleDescriptionChange} 
                                style={styles.textarea}
                                placeholder="Tell your story..."
                            />
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            style={styles.saveButton}
                        >
                            Save Changes
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>

            <section style={styles.blogsSection}>
                <h2 style={styles.sectionTitle}>
                    {profile?.username}'s Blog Posts
                </h2>
                
                {blogs.length > 0 ? (
                    <div style={styles.blogGrid}>
                        {blogs.map((blog) => (
                            <motion.article
                                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                                key={blog._id || blog.id}
                                style={styles.blogCard}
                            >
                                {blog.imagePath && (
                                    <div style={styles.blogImageContainer}>
                                        <img 
                                            src={`http://localhost:8080/${blog.imagePath}`} 
                                            alt="Blog" 
                                            style={styles.blogImage}
                                            onClick={() => navigate(`/blog/${blog._id || blog.id}`, { state: { blog } })}
                                        />
                                    </div>
                                )}
                                
                                <div style={styles.blogContent}>
                                    <div style={styles.blogHeader}>
                                        <h3 style={styles.blogTitle}>{blog.title}</h3>
                                        {loggedInUsername === blog.author && (
                                            <div style={styles.menuContainer}>
                                                <button
                                                    style={styles.menuButton}
                                                    onClick={() => setMenuOpen(menuOpen === blog._id ? null : blog._id)}
                                                >
                                                    ⋮
                                                </button>
                                                {menuOpen === blog._id && (
                                                    <div style={styles.menuDropdown}>
                                                        <button
                                                            style={styles.menuItem}
                                                            onClick={() => navigate(`/edit-blog/${blog._id || blog.id}`)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            style={styles.menuItem}
                                                            onClick={() => handleDeleteBlog(blog._id || blog.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <p style={styles.blogExcerpt}>
                                        {blog.content.length > 120 
                                            ? `${blog.content.substring(0, 120)}...` 
                                            : blog.content}
                                    </p>
                                    
                                    <div style={styles.blogFooter}>
                                        <div style={styles.blogMeta}>
                                            <span style={styles.blogAuthor}>By {blog.author}</span>
                                            <span style={styles.blogDate}>Posted on {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        
                                        <div style={styles.blogActions}>
                                            <button
                                                onClick={() => handleLike(blog._id || blog.id)} 
                                                style={blog.likedUsers && blog.likedUsers.includes(loggedInUserId) 
                                                    ? styles.likedButton 
                                                    : styles.likeButton}
                                            >
                                                ♥ {blog.likes || 0}
                                            </button>
                                            
                                            <button
                                                onClick={() => navigate(`/blog/${blog._id || blog.id}`, { state: { blog } })}
                                                style={styles.readMoreButton}
                                            >
                                                Read More →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div style={styles.noBlogsContainer}>
                        <div style={styles.noBlogsIllustration}>
                            <div style={styles.pencilIcon}>✏️</div>
                            <div style={styles.paperIcon}>📄</div>
                        </div>
                        <h3 style={styles.noBlogsTitle}>No Blogs Yet</h3>
                        <p style={styles.noBlogsText}>
                            {loggedInUsername === username 
                                ? "You haven't written any blogs yet. Share your thoughts with the world!"
                                : "This user hasn't published any blogs yet."}
                        </p>
                        {loggedInUsername === username && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowModal(true)}
                                style={styles.createFirstBlogButton}
                            >
                                Create Your First Blog
                            </motion.button>
                        )}
                    </div>
                )}
            </section>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.modalOverlay}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            style={styles.modal}
                        >
                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalTitle}>Create New Blog</h2>
                                <button 
                                    onClick={() => setShowModal(false)} 
                                    style={styles.modalCloseButton}
                                >
                                    ×
                                </button>
                            </div>
                            
                            <form onSubmit={handleCreateBlog} style={styles.modalForm}>
                                <div style={styles.formGroup}>
                                    <label style={styles.modalLabel}>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter a captivating title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        style={styles.modalInput}
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.modalLabel}>Content</label>
                                    <textarea
                                        placeholder="Write your amazing content here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        style={styles.modalTextarea}
                                        rows={8}
                                    />
                                </div>
                                
                                <div style={styles.formGroup}>
                                    <label style={styles.modalLabel}>Featured Image</label>
                                    <div style={styles.fileInputContainer}>
                                        <label htmlFor="blogImage" style={styles.fileInputLabel}>
                                            Choose Image
                                        </label>
                                        <input
                                            type="file"
                                            id="blogImage"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                            style={styles.fileInput}
                                        />
                                        <span style={styles.fileName}>
                                            {image ? image.name : "No file selected"}
                                        </span>
                                    </div>
                                </div>
                                
                                <div style={styles.modalButtons}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button" 
                                        onClick={() => setShowModal(false)} 
                                        style={styles.cancelModalButton}
                                    >
                                        Cancel
                                    </motion.button>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit" 
                                        style={styles.submitButton}
                                    >
                                        Publish Blog
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Profile;

const styles = {
    container: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        paddingBottom: "60px",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid rgba(0, 0, 0, 0.1)",
        borderTop: "5px solid #6366f1",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    errorContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    errorCard: {
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
    },
    errorTitle: {
        fontSize: "2rem",
        color: "#ef4444",
        marginBottom: "20px",
    },
    errorText: {
        fontSize: "1.1rem",
        color: "#6b7280",
        marginBottom: "30px",
        lineHeight: "1.6",
    },
    errorButton: {
        padding: "12px 24px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
    },
    backButton: {
        padding: "10px 16px",
        backgroundColor: "transparent",
        color: "#4b5563",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "700",
        color: "#111827",
        margin: 0,
    },
    titleHighlight: {
        color: "#6366f1",
    },
    createButton: {
        padding: "10px 20px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        backgroundColor: "white",
        margin: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    profilePictureContainer: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        marginBottom: "20px",
        border: "5px solid #f3f4f6",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    },
    profilePicture: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    placeholderPicture: {
        width: "100%",
        height: "100%",
        backgroundColor: "#e5e7eb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    initials: {
        fontSize: "4rem",
        fontWeight: "bold",
        color: "#9ca3af",
    },
    profileInfo: {
        textAlign: "center",
    },
    username: {
        fontSize: "1.8rem",
        fontWeight: "700",
        color: "#111827",
        margin: "0 0 10px 0",
    },
    followStats: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginBottom: "15px",
    },
    followCount: {
        fontSize: "1rem",
        color: "#4b5563",
    },
    description: {
        fontSize: "1.1rem",
        color: "#4b5563",
        lineHeight: "1.6",
        maxWidth: "600px",
        marginBottom: "25px",
    },
    profileActions: {
        marginTop: "15px",
    },
    editButton: {
        padding: "12px 24px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    cancelButton: {
        padding: "12px 24px",
        backgroundColor: "#6b7280",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    followButton: {
        padding: "12px 24px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    unfollowButton: {
        padding: "12px 24px",
        backgroundColor: "#e5e7eb",
        color: "#374151",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    editForm: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        margin: "20px auto",
        maxWidth: "600px",
        overflow: "hidden",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "0.95rem",
        fontWeight: "500",
        color: "#374151",
    },
    fileInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "15px",
    },
    fileInputLabel: {
        padding: "10px 15px",
        backgroundColor: "#f3f4f6",
        color: "#374151",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    fileInput: {
        display: "none",
    },
    fileName: {
        fontSize: "0.9rem",
        color: "#6b7280",
    },
    textarea: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        resize: "vertical",
        minHeight: "120px",
        fontSize: "1rem",
        fontFamily: "inherit",
        lineHeight: "1.5",
        transition: "all 0.2s ease",
    },
    saveButton: {
        padding: "12px 24px",
        backgroundColor: "#10b981",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        width: "100%",
        transition: "all 0.2s ease",
    },
    blogsSection: {
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    sectionTitle: {
        fontSize: "1.6rem",
        fontWeight: "700",
        color: "#111827",
        marginBottom: "30px",
        textAlign: "center",
    },
    blogGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "25px",
    },
    blogCard: {
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
    },
    blogImageContainer: {
        width: "100%",
        height: "200px",
        overflow: "hidden",
    },
    blogImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        cursor: "pointer",
        transition: "transform 0.3s ease",
    },
    blogContent: {
        padding: "20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    blogHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "15px",
    },
    blogTitle: {
        fontSize: "1.3rem",
        fontWeight: "600",
        color: "#111827",
        margin: 0,
        flex: 1,
    },
    menuContainer: {
        position: "relative",
    },
    menuButton: {
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "#6b7280",
        padding: "5px 10px",
    },
    menuDropdown: {
        position: "absolute",
        right: 0,
        top: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        minWidth: "120px",
        overflow: "hidden",
    },
    menuItem: {
        display: "block",
        width: "100%",
        padding: "10px 15px",
        textAlign: "left",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "0.9rem",
        color: "#374151",
        transition: "all 0.2s ease",
    },
    blogExcerpt: {
        color: "#6b7280",
        lineHeight: "1.6",
        marginBottom: "20px",
        flex: 1,
    },
    blogFooter: {
        marginTop: "auto",
    },
    blogMeta: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        fontSize: "0.85rem",
        color: "#9ca3af",
    },
    blogAuthor: {
        fontWeight: "500",
    },
    blogDate: {
        fontStyle: "italic",
    },
    blogActions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likeButton: {
        padding: "8px 16px",
        backgroundColor: "#f3f4f6",
        color: "#374151",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        transition: "all 0.2s ease",
    },
    likedButton: {
        padding: "8px 16px",
        backgroundColor: "#fecaca",
        color: "#dc2626",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        transition: "all 0.2s ease",
    },
    readMoreButton: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        color: "#6366f1",
        border: "1px solid #6366f1",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    noBlogsContainer: {
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "40px 20px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    noBlogsIllustration: {
        position: "relative",
        width: "150px",
        height: "150px",
        margin: "0 auto 30px",
    },
    pencilIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: "60px",
        transform: "rotate(-15deg)",
    },
    paperIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        fontSize: "60px",
        transform: "rotate(10deg)",
    },
    noBlogsTitle: {
        fontSize: "1.5rem",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "10px",
    },
    noBlogsText: {
        fontSize: "1.1rem",
        color: "#6b7280",
        marginBottom: "25px",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: "1.6",
    },
    createFirstBlogButton: {
        padding: "12px 24px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: "1px solid #e5e7eb",
    },
    modalTitle: {
        fontSize: "1.5rem",
        fontWeight: "600",
        color: "#111827",
        margin: 0,
    },
    modalCloseButton: {
        backgroundColor: "transparent",
        border: "none",
        fontSize: "1.5rem",
        color: "#6b7280",
        cursor: "pointer",
        padding: "5px",
    },
    modalForm: {
        padding: "20px",
    },
    modalLabel: {
        display: "block",
        marginBottom: "8px",
        fontSize: "0.95rem",
        fontWeight: "500",
        color: "#374151",
    },
    modalInput: {
        width: "100%",
        padding: "12px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        fontSize: "1rem",
        marginBottom: "20px",
        transition: "all 0.2s ease",
    },
    modalTextarea: {
        width: "100%",
        padding: "12px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        fontSize: "1rem",
        marginBottom: "20px",
        resize: "vertical",
        fontFamily: "inherit",
        lineHeight: "1.5",
        minHeight: "150px",
        transition: "all 0.2s ease",
    },
    modalButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
        marginTop: "20px",
    },
    submitButton: {
        padding: "12px 24px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
    cancelModalButton: {
        padding: "12px 24px",
        backgroundColor: "#f3f4f6",
        color: "#374151",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
    },
};