import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");
       
   
   
    // Fetch profile and blogs
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
                if (response.data.userId) {
                    setUserId(response.data.userId);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Profile not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, navigate, loggedInUsername]);

    // Fetch user blogs
    const fetchUserBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/blogs/user/username/${username}`);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchUserBlogs();
    }, [userId]);

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
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
            alert("Blog deleted successfully!");
            setBlogs(blogs.filter((blog) => blog._id !== blogId));
        } catch (error) {
            console.error("Error deleting blog:", error.response?.data || error.message);
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error("User not logged in!");
            alert("Please log in to create a blog.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", localStorage.getItem("username"));
        formData.append("userId", userId);
        if (image) {
            formData.append("file", image);
        }

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
            fetchUserBlogs(); // Refresh blogs after liking
        } catch (error) {
            console.error("Error liking blog:", error);
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{profile?.username}'s Profile</h1>

            <div style={styles.profilePictureContainer}>
                {profile?.profilePicture ? (
                    <img
                        src={`http://localhost:8080/api/profile/${username}/profile-picture`}
                        alt="Profile"
                        style={styles.profilePicture}
                    />
                ) : (
                    <div style={styles.placeholderPicture}>No Profile Picture</div>
                )}
            </div>

            <p style={styles.description}>{profile?.description || "No description available."}</p>

            {loggedInUsername === username && (
                <button onClick={() => setIsEditing(!isEditing)} style={styles.button}>
                    {isEditing ? "Cancel" : "Update Profile"}
                </button>
            )}

            {isEditing && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="profilePicture" style={styles.label}>
                            Profile Picture:
                        </label>
                        <input 
                            type="file" 
                            id="profilePicture" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={styles.fileInput} 
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description" style={styles.label}>
                            Description:
                        </label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={handleDescriptionChange} 
                            style={styles.textarea} 
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Save Changes
                    </button>
                </form>
            )}

            <button onClick={() => navigate("/home")} style={styles.button}>
                Back to Home
            </button>

            <div style={styles.createButtonContainer}>
                <button onClick={() => setShowModal(true)} style={styles.createButton}>
                    Create Blog
                </button>
            </div>

            <h2 style={{ textAlign: "center", marginTop: "50px" }}>My Blogs</h2>

            {blogs.length > 0 ? (
                <div style={styles.blogContainer}>
                    {blogs.map((blog) => (
                        <div key={blog._id || blog.id} style={styles.blogCard}>
                            <div style={styles.blogHeader}>
                                <div>
                                    <h3>{blog.title}</h3>
                                    <p style={styles.author}>Author: {blog.author}</p>
                                </div>
                                {loggedInUsername === blog.author && ( // Only show menu if logged-in user is the author
                                    <div style={styles.menuContainer}>
                                        <div
                                            style={styles.menuButton}
                                            onClick={() => setMenuOpen(menuOpen === blog._id ? null : blog._id)}
                                        >
                                            ⋮
                                        </div>
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
                            {blog.imagePath && (
                                <img 
                                    src={`http://localhost:8080/${blog.imagePath}`} 
                                    alt="Blog" 
                                    style={styles.blogImage} 
                                />
                            )}
                            <button
                                onClick={() => navigate(`/blog/${blog._id || blog.id}`, { state: { blog } })}
                                style={styles.readMoreButton}
                            >
                                Read More
                            </button>
                            <div style={styles.interactionButtons}>
                                <button 
                                    onClick={() => handleLike(blog._id || blog.id)} 
                                    style={styles.likeButton}
                                >
                                    {blog.likedUsers && blog.likedUsers.includes(loggedInUserId) ? `Liked (${blog.likes || 0})` : `Like (${blog.likes || 0})`}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.noBlogs}>No blogs posted yet.</p>
            )}

            {showModal && (
                <div style={styles.modal}>
                    <h2>Create a Blog</h2>
                    <form onSubmit={handleCreateBlog} encType="multipart/form-data">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            style={styles.textarea}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                        <button type="submit" style={styles.postButton}>Post Blog</button>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>
                            Close
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;

const styles = {
    container: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px 10px",
    },
    title: {
        fontSize: "2.5rem",
        color: "#222",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    profilePictureContainer: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        marginBottom: "15px",
    },
    profilePicture: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    placeholderPicture: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ddd",
        color: "#666",
    },
    description: {
        fontSize: "1.2rem",
        color: "#444",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    label: {
        fontSize: "1rem",
        color: "#333",
    },
    fileInput: {
        padding: "5px",
    },
    textarea: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        resize: "vertical",
    },
    createButtonContainer: {
        position: "absolute",
        top: "80px",
        right: "20px",
    },
    createButton: {
        padding: "10px 15px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    blogContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        padding: "20px",
    },
    blogCard: {
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        alignItems: "center",
        position: "relative",
    },
    blogHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
    },
    author: {
        fontSize: "0.9rem",
        color: "#666",
        marginTop: "5px",
    },
    menuContainer: {
        position: "relative",
    },
    menuButton: {
        cursor: "pointer",
        fontSize: "24px",
        padding: "5px",
    },
    menuDropdown: {
        position: "absolute",
        top: "30px",
        right: "0",
        background: "white",
        border: "1px solid #ccc",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        borderRadius: "5px",
        zIndex: 10,
    },
    menuItem: {
        padding: "10px 20px",
        border: "none",
        background: "none",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        display: "block",
    },
    blogImage: {
        width: "220px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    readMoreButton: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "0.3s",
    },
    noBlogs: {
        textAlign: "center",
        color: "#666",
    },
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
    },
    input: {
        display: "block",
        marginBottom: "10px",
        width: "100%",
        padding: "5px",
    },
    postButton: {
        padding: "8px 15px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginRight: "10px",
    },
    closeButton: {
        padding: "8px 15px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    interactionButtons: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    likeButton: {
        padding: "8px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    }
};