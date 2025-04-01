import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [followingBlogs, setFollowingBlogs] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const navigate = useNavigate();

    const loggedInUsername = localStorage.getItem("username");
    const loggedInUserId = localStorage.getItem("userId");

    useEffect(() => {
        fetchAllBlogs();
        fetchFollowingBlogs();
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

    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User not logged in!");
            alert("Please log in to create a blog.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", loggedInUsername);
        formData.append("userId", userId);
        if (image) formData.append("file", image);

        try {
            await axios.post("http://localhost:8080/api/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchAllBlogs();
            fetchFollowingBlogs();
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
                params: { userId: loggedInUserId },
            });
            fetchAllBlogs();
            fetchFollowingBlogs();
        } catch (error) {
            console.error("Error liking blog:", error);
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
        } catch (error) {
            console.error("Error searching user:", error);
            alert("Error searching for user!");
            setSearchResults([]);
        }
    };

    const renderBlogs = (blogs) => (
        <div style={styles.blogContainer}>
            {blogs.map((blog) => (
                <div key={blog.id} style={styles.blogCard}>
                    <span
                        style={styles.username}
                        onClick={() => navigate(`/profile/${blog.author}`)}
                    >
                        {blog.author}
                    </span>
                    <h3>{blog.title}</h3>
                    <p>
                        <b>Author:</b> {blog.author}
                    </p>
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
                    <div style={styles.interactionButtons}>
                        <button
                            onClick={() => handleLike(blog.id)}
                            style={styles.likeButton}
                        >
                            {blog.likedUsers && blog.likedUsers.includes(loggedInUserId)
                                ? `Liked (${blog.likes || 0})`
                                : `Like (${blog.likes || 0})`}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>MyApp</div>
                <div style={styles.navCenter}>
                    <span style={styles.navLink} onClick={() => navigate("/home")}>
                        Home
                    </span>
                    <span style={styles.navLink} onClick={() => navigate("/about")}>
                        About Us
                    </span>
                    <span style={styles.navLink} onClick={() => navigate("/contact")}>
                        Contact Us
                    </span>
                    <span style={styles.navLink} onClick={() => navigate("/profile")}>
                        My Profile
                    </span>
                    <form onSubmit={handleSearch} style={styles.searchForm}>
                        <input
                            type="text"
                            placeholder="Search people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                        <button type="submit" style={styles.searchButton}>
                            Search
                        </button>
                    </form>
                    <button
                        onClick={handleLogout}
                        style={{ ...styles.button, backgroundColor: "#f44336" }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {searchResults.length > 0 && (
                <div style={styles.searchResults}>
                    <h3 style={{ margin: "10px 0" }}>Search Results</h3>
                    {searchResults.map((user) => (
                        <div
                            key={user.id}
                            style={styles.searchResultItem}
                            onClick={() => {
                                navigate(`/profile/${user.username}`);
                                setSearchResults([]);
                                setSearchQuery("");
                            }}
                        >
                            {user.username}
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.createButtonContainer}>
                <button onClick={() => setShowModal(true)} style={styles.createButton}>
                    Create Blog
                </button>
            </div>

            <div style={styles.tabContainer}>
                <button
                    style={{
                        ...styles.tabButton,
                        backgroundColor: activeTab === "all" ? "#4facfe" : "#ccc",
                    }}
                    onClick={() => setActiveTab("all")}
                >
                    All Blogs
                </button>
                <button
                    style={{
                        ...styles.tabButton,
                        backgroundColor: activeTab === "following" ? "#4facfe" : "#ccc",
                    }}
                    onClick={() => setActiveTab("following")}
                >
                    Following
                </button>
            </div>

            {activeTab === "all" ? (
                <>
                    <h2 style={{ textAlign: "center", marginTop: "20px" }}>All Blogs</h2>
                    {renderBlogs(allBlogs)}
                </>
            ) : (
                <>
                    <h2 style={{ textAlign: "center", marginTop: "20px" }}>Following</h2>
                    {followingBlogs.length > 0 ? (
                        renderBlogs(followingBlogs)
                    ) : (
                        <p style={{ textAlign: "center" }}>
                            You're not following anyone yet.
                        </p>
                    )}
                </>
            )}

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
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                        <button type="submit" style={styles.postButton}>
                            Post Blog
                        </button>
                        <button onClick={() => setShowModal(false)} style={styles.closeButton}>
                            Close
                        </button>
                    </form>
                </div>
            )}

            <footer style={styles.footer}>© 2025 MyApp. All rights reserved.</footer>
        </div>
    );
};

export default Home;

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        background: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        position: "relative",
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#4facfe",
        padding: "15px 50px",
        color: "white",
        fontSize: "18px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    navCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        flex: 1,
    },
    navLink: {
        cursor: "pointer",
        fontWeight: "bold",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#4facfe",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginLeft: "20px",
    },
    searchForm: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    searchInput: {
        padding: "8px",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        fontSize: "14px",
    },
    searchButton: {
        padding: "8px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    searchResults: {
        position: "absolute",
        top: "60px",
        right: "20px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "10px",
        zIndex: 1000,
        maxWidth: "300px",
        textAlign: "left",
    },
    searchResultItem: {
        padding: "5px 10px",
        cursor: "pointer",
        borderBottom: "1px solid #ccc",
        transition: "background-color 0.2s",
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
    tabContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "80px",
        marginBottom: "20px",
    },
    tabButton: {
        padding: "10px 20px",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
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
        height: "auto",
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
        cursor: "pointer",
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
    textarea: {
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
    footer: {
        background: "#01579b",
        color: "white",
        padding: "15px",
        textAlign: "center",
        position: "absolute",
        bottom: -10,
        width: "100%",
        left: 0,
    },
};

const hoverStyles = `
    .search-result-item:hover {
        background-color: #f0f0f0;
    }
    .tab-button:hover {
        background-color: #66bfff;
    }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${hoverStyles}</style>`);