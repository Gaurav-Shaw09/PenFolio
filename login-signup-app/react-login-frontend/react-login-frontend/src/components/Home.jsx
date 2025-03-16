import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username"); // Remove stored username
        localStorage.removeItem("token"); // If using a token-based authentication system
        navigate("/login"); // Redirect to login page
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");  // ✅ Get userId from localStorage
        if (!userId) {
            console.error("User not logged in!");
            alert("Please log in to create a blog.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", localStorage.getItem("username")); // ✅ Get username from localStorage
        formData.append("userId", userId);  // ✅ Send userId

        if (image) {
            formData.append("file", image);
        }

        try {
            await axios.post("http://localhost:8080/api/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            fetchBlogs();
            setTitle("");
            setContent("");
            setImage(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    return (
        <div style={styles.container}>
            {/* ✅ Navbar */}
            <nav style={styles.navbar}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
                <div style={styles.navCenter}>
                    <span style={styles.navLink} onClick={() => navigate('/home')}>Home</span>
                    <span style={styles.navLink} onClick={() => navigate('/about')}>About Us</span>
                    <span style={styles.navLink} onClick={() => navigate('/contact')}>Contact Us</span>
                    <span style={styles.navLink} onClick={() => navigate("/profile")}>My Profile</span>
                    <button
                        onClick={handleLogout}
                        style={{ ...styles.button, backgroundColor: "#f44336" }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Create Blog Button */}
            <div style={styles.createButtonContainer}>
                <button onClick={() => setShowModal(true)} style={styles.createButton}>Create Blog</button>
            </div>

            <h2 style={{ textAlign: "center", marginTop: "100px" }}>All Blogs</h2>
            <div style={styles.blogContainer}>
                {blogs.map((blog) => (
                    <div key={blog.id} style={styles.blogCard}>
                        {/* ✅ Clickable username */}
                        <span
                            style={styles.username}
                            onClick={() => navigate(`/profile/${blog.author}`)} // Redirect to profile page
                        >
                            {blog.author}
                        </span>

                        <h3>{blog.title}</h3>
                        <p><b>Author:</b> {blog.author}</p>

                        {blog.imagePath && (
                            <img
                                src={`http://localhost:8080/${blog.imagePath}`}
                                alt="Blog"
                                style={styles.blogImage}
                            />
                        )}

                        {expanded[blog.id] ? (
                            <>
                                <p>{blog.content}</p>
                                <button
                                    onClick={() => toggleReadMore(blog.id)}
                                    style={styles.showLessButton}
                                >
                                    Show Less
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                                style={styles.readMoreButton}
                            >
                                Read More
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal for Creating Blog */}
            {showModal && (
                <div style={styles.modal}>
                    <h2>Create a Blog</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            type="text"
                            placeholder="Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                        <button type="submit" style={styles.postButton}>Post Blog</button>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>Close</button>
                    </form>
                </div>
            )}

            {/* ✅ Footer */}
            <footer style={styles.footer}>
                © 2025 MyApp. All rights reserved.
            </footer>
        </div>
    );
};

// ✅ Styles
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        background: '#f4f4f4',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#4facfe',
        padding: '15px 50px',
        color: 'white',
        fontSize: '18px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    navCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        flex: 1,
    },
    navLink: {
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#4facfe',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        marginLeft: '20px',
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
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        justifyContent: "center",
        maxWidth: "95vw",
        margin: "0 auto",
    },
    blogCard: {
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "400px",
        textAlign: "center",
        position: "relative",
    },
    username: {
        position: "absolute",
        top: "10px",
        left: "10px",
        backgroundColor: "#f0f0f0",
        padding: "5px 10px",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer", // Make it look clickable
    },
    blogImage: {
        width: "220px",
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px",
    },
    readMoreButton: {
        padding: "10px 10px",
        backgroundColor: "#008CBA",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    showLessButton: {
        padding: "5px 10px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
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
        padding: "5px"
    },
    textarea: {
        display: "block",
        marginBottom: "10px",
        width: "100%",
        padding: "5px"
    },
    postButton: {
        padding: "8px 15px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginRight: "10px"
    },
    closeButton: {
        padding: "8px 15px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    },
    footer: {
        background: '#01579b',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        position: 'absolute',
        bottom: -10,
        width: '100%',
    }
};

export default Home;