import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);
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
            setAuthor("");
            setImage(null);
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    return (
        <div>
            <h2>Create a Blog</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit">Post Blog</button>
            </form>

            <h2>All Blogs</h2>
            <div>
                {blogs.map((blog) => (
                    <div key={blog.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <p><b>Author:</b> {blog.author}</p>
                        {blog.imagePath && <img src={`http://localhost:8080/${blog.imagePath}`} alt="Blog" style={{ width: "200px" }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
