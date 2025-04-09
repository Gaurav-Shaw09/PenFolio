import React, { useState, useEffect } from "react";
import { FiPlus, FiImage, FiArrowLeft, FiX, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = ({ isDarkMode }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const navigate = useNavigate();

  const loggedInUsername = localStorage.getItem("username");
  const loggedInUserId = localStorage.getItem("userId");

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: "error", message: "Image must be less than 5MB" });
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setStatus({ type: "error", message: "Title and content are required" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", loggedInUsername);
    formData.append("userId", loggedInUserId);
    if (image) formData.append("file", image);

    try {
      await axios.post("http://localhost:8080/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ type: "success", message: "Blog created successfully! Redirecting..." });

      setTimeout(() => {
        navigate("/home");
      }, 2000);

    } catch (error) {
      console.error("Error creating blog:", error);
      const errorMsg = error.response?.data?.message || "Failed to create blog. Please try again.";
      setStatus({ type: "error", message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
      color: isDarkMode ? "#e2e8f0" : "#1e293b",
      padding: "3rem 1rem",
      transition: "background-color 0.3s, color 0.3s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "2rem",
      width: "100%",
      maxWidth: "800px",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      backgroundColor: isDarkMode ? "#1e293b" : "#e2e8f0",
      color: isDarkMode ? "#e2e8f0" : "#1e293b",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginRight: "1rem",
      ":hover": {
        backgroundColor: isDarkMode ? "#334155" : "#cbd5e1",
        transform: "translateY(-1px)",
      },
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      margin: 0,
      color: isDarkMode ? "#ffffff" : "#1e293b",
      background: isDarkMode 
        ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" 
        : "linear-gradient(90deg, #2563eb, #7c3aed)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    formContainer: {
      width: "100%",
      maxWidth: "800px",
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      borderRadius: "1rem",
      padding: "2.5rem",
      boxShadow: isDarkMode 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
      border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
    },
    formGroup: {
      marginBottom: "2rem",
    },
    label: {
      display: "block",
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
      color: isDarkMode ? "#e2e8f0" : "#475569",
    },
    input: {
      width: "100%",
      padding: "1rem",
      borderRadius: "0.75rem",
      border: `1px solid ${isDarkMode ? "#334155" : "#cbd5e1"}`,
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      color: isDarkMode ? "#f8fafc" : "#1e293b",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      ":focus": {
        outline: "none",
        borderColor: isDarkMode ? "#3b82f6" : "#2563eb",
        boxShadow: `0 0 0 3px ${isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(37, 99, 235, 0.3)"}`,
      },
    },
    textarea: {
      width: "100%",
      padding: "1rem",
      borderRadius: "0.75rem",
      border: `1px solid ${isDarkMode ? "#334155" : "#cbd5e1"}`,
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      color: isDarkMode ? "#f8fafc" : "#1e293b",
      fontSize: "1rem",
      minHeight: "250px",
      resize: "vertical",
      transition: "all 0.3s ease",
      lineHeight: "1.6",
      ":focus": {
        outline: "none",
        borderColor: isDarkMode ? "#3b82f6" : "#2563eb",
        boxShadow: `0 0 0 3px ${isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(37, 99, 235, 0.3)"}`,
      },
    },
    fileUploadContainer: {
      border: `2px dashed ${isDarkMode ? "#334155" : "#cbd5e1"}`,
      borderRadius: "0.75rem",
      padding: "2.5rem",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      ":hover": {
        borderColor: isDarkMode ? "#3b82f6" : "#2563eb",
        backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.5)",
      },
    },
    fileInput: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    },
    uploadContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      transition: "all 0.3s ease",
    },
    uploadIcon: {
      fontSize: "3rem",
      color: isDarkMode ? "#64748b" : "#94a3b8",
      transition: "all 0.3s ease",
    },
    previewContainer: {
      position: "relative",
      width: "100%",
      maxHeight: "400px",
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: isDarkMode 
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)" 
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    previewImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    removeImageButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      padding: "0.5rem",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
      color: isDarkMode ? "#e2e8f0" : "#64748b",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ":hover": {
        backgroundColor: isDarkMode ? "rgba(51, 65, 85, 0.9)" : "rgba(241, 245, 249, 0.9)",
        transform: "scale(1.1)",
      },
    },
    submitButton: {
      padding: "1.25rem 2rem",
      borderRadius: "0.75rem",
      fontWeight: "600",
      fontSize: "1.1rem",
      backgroundColor: isSubmitting 
        ? (isDarkMode ? "#1e40af" : "#60a5fa") 
        : (isDarkMode ? "#2563eb" : "#3b82f6"),
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      transition: "all 0.3s ease",
      width: "100%",
      boxShadow: isSubmitting 
        ? "none" 
        : isDarkMode 
          ? "0 4px 6px -1px rgba(37, 99, 235, 0.3)" 
          : "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
      ":hover": {
        backgroundColor: isSubmitting 
          ? (isDarkMode ? "#1e40af" : "#60a5fa") 
          : (isDarkMode ? "#1e40af" : "#2563eb"),
        transform: isSubmitting ? "none" : "translateY(-2px)",
        boxShadow: isSubmitting 
          ? "none" 
          : isDarkMode 
            ? "0 6px 8px -1px rgba(37, 99, 235, 0.4)" 
            : "0 6px 8px -1px rgba(59, 130, 246, 0.4)",
      },
      ":disabled": {
        opacity: 0.8,
        cursor: "not-allowed",
      },
    },
    statusMessage: {
      padding: "1.25rem",
      borderRadius: "0.75rem",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1rem",
      fontWeight: "500",
    },
    errorMessage: {
      backgroundColor: isDarkMode ? "rgba(127, 29, 29, 0.2)" : "#fee2e2",
      color: isDarkMode ? "#fecaca" : "#b91c1c",
      border: isDarkMode ? "1px solid #7f1d1d" : "1px solid #fecaca",
    },
    successMessage: {
      backgroundColor: isDarkMode ? "rgba(20, 83, 45, 0.2)" : "#dcfce7",
      color: isDarkMode ? "#bbf7d0" : "#166534",
      border: isDarkMode ? "1px solid #14532d" : "1px solid #bbf7d0",
    },
    spinner: {
      animation: "spin 1s linear infinite",
      width: "1.5rem",
      height: "1.5rem",
    },
    gradientBorder: {
      position: "relative",
      borderRadius: "1rem",
      padding: "3px",
      background: isDarkMode 
        ? "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)" 
        : "linear-gradient(135deg, #2563eb, #7c3aed, #db2777)",
      marginBottom: "3rem",
      boxShadow: isDarkMode 
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)" 
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    formInner: {
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      borderRadius: "0.75rem",
      overflow: "hidden",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={styles.pageContainer}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={styles.header}>
          <motion.button
            onClick={() => navigate(-1)}
            style={styles.backButton}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
          >
            <FiArrowLeft size={20} />
            Back
          </motion.button>
          <motion.h1 
            style={styles.headerTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Create New Blog Post
          </motion.h1>
        </div>

        <motion.div
          style={styles.gradientBorder}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={styles.formInner}>
            <div style={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                {status.type && (
                  <motion.div
                    style={{
                      ...styles.statusMessage,
                      ...(status.type === "error" ? styles.errorMessage : styles.successMessage),
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {status.type === "success" ? (
                      <FiCheckCircle size={20} />
                    ) : null}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <motion.div 
                  style={styles.formGroup}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label style={styles.label} htmlFor="blog-title">Title</label>
                  <input
                    id="blog-title"
                    type="text"
                    placeholder="Your amazing blog title..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (status.type === "error") setStatus({ type: null, message: "" });
                    }}
                    required
                    disabled={isSubmitting}
                    style={{
                      ...styles.input,
                      borderColor: status.type === "error" && !title.trim()
                        ? (isDarkMode ? "#f87171" : "#dc2626")
                        : styles.input.borderColor,
                    }}
                  />
                </motion.div>

                <motion.div 
                  style={styles.formGroup}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label style={styles.label} htmlFor="blog-content">Content</label>
                  <textarea
                    id="blog-content"
                    placeholder="Write your thoughts here..."
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (status.type === "error") setStatus({ type: null, message: "" });
                    }}
                    required
                    disabled={isSubmitting}
                    style={{
                      ...styles.textarea,
                      borderColor: status.type === "error" && !content.trim()
                        ? (isDarkMode ? "#f87171" : "#dc2626")
                        : styles.textarea.borderColor,
                    }}
                  />
                </motion.div>

                <motion.div 
                  style={styles.formGroup}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label style={styles.label}>Featured Image (Optional)</label>
                  <motion.div
                    style={styles.fileUploadContainer}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = isDarkMode ? "#3b82f6" : "#2563eb";
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = isDarkMode ? "#334155" : "#cbd5e1";
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = isDarkMode ? "#334155" : "#cbd5e1";
                      if (e.dataTransfer.files.length && !isSubmitting) {
                        handleImageChange({ target: { files: e.dataTransfer.files } });
                      }
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={styles.fileInput}
                      disabled={isSubmitting}
                    />
                    {preview ? (
                      <div style={styles.previewContainer}>
                        <img
                          src={preview}
                          alt="Preview"
                          style={styles.previewImage}
                        />
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                            setPreview(null);
                          }}
                          style={styles.removeImageButton}
                          aria-label="Remove image"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiX size={20} />
                        </motion.button>
                      </div>
                    ) : (
                      <div style={styles.uploadContent}>
                        <FiImage style={styles.uploadIcon} />
                        <div>
                          <p style={{ margin: "0.5rem 0 0", fontSize: "1rem", fontWeight: "500" }}>
                            Click to upload or drag and drop
                          </p>
                          <p style={{ margin: 0, fontSize: "0.875rem", color: isDarkMode ? "#94a3b8" : "#64748b" }}>
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    style={styles.submitButton}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          style={styles.spinner}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                          <path
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                            opacity="0.75"
                          />
                        </svg>
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <FiPlus size={20} />
                        <span>Publish Blog</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateBlogPage;