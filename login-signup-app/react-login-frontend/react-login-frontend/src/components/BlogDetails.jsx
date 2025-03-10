import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state?.blog; // Getting blog data from state

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
    backButtonHover: {
        backgroundColor: "#d32f2f",
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
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#222",
        marginBottom: "10px",
    },
    author: {
        fontSize: "16px",
        color: "#555",
        marginBottom: "15px",
    },
};


export default BlogDetails;
