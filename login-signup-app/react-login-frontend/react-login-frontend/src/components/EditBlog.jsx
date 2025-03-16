import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null); // For selecting a new file
    const [prevImage, setPrevImage] = useState(""); // Stores the previous image path

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/blogs/${id}`)
            .then((response) => {
                const { title, content, imagePath } = response.data;
                setTitle(title);
                setContent(content);
                setPrevImage(imagePath);
                console.log("Fetched Image Path:", imagePath); // ✅ Check if imagePath is correct
            })
            .catch((error) => console.error("Error fetching blog:", error));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        // If a new image is selected, append it
        if (image) {
            formData.append("image", image);
        }

        try {
            await axios.put(`http://localhost:8080/api/blogs/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Blog updated successfully!");
            navigate("/profile"); // Redirect to profile page
        } catch (error) {
            console.error("Error updating blog:", error.response?.data || error.message);
        }
    };

    return (
        <div style={{
            width: "50%",
            margin: "auto",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Edit Blog</h2>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <label style={{ fontWeight: "bold" }}>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width: "100%"
                    }}
                />

                <label style={{ fontWeight: "bold" }}>Content:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width: "100%",
                        height: "150px",
                        resize: "none"
                    }}
                />

                {/* Display Current & New Image Side-by-Side */}
                <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
                    {/* Current Image */}
                    <div style={{ textAlign: "center" }}>
                        <label style={{ fontWeight: "bold" }}>Current Image:</label>
                        {prevImage ? (
                            <img 
                                src={`http://localhost:8080/${prevImage}`} 
                                alt="Current Blog"
                                style={{
                                    width: "200px",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    border: "2px solid #ccc"
                                }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>

                    {/* New Image (Selected by User) */}
                    <div style={{ textAlign: "center" }}>
                        <label style={{ fontWeight: "bold" }}>New Image:</label>
                        {image ? (
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt="New Blog"
                                style={{
                                    width: "200px",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    border: "2px solid #4caf50"
                                }}
                            />
                        ) : (
                            <p>No new image selected</p>
                        )}
                    </div>
                </div>

                <label style={{ fontWeight: "bold" }}>Change Image:</label>
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button 
                    type="submit"
                    style={{
                        padding: "10px",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#218838"}
                    onMouseOut={(e) => e.target.style.background = "#28a745"}
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
