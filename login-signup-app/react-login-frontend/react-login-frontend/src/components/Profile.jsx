import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [description, setDescription] = useState(""); // State for description input
    const [profilePicture, setProfilePicture] = useState(null); // State for profile picture file

    // Fetch logged-in username from localStorage
    const loggedInUsername = localStorage.getItem("username");

    useEffect(() => {
        // If no username in URL, redirect to the logged-in user's profile or login
        if (!username) {
            if (loggedInUsername) {
                navigate(`/profile/${loggedInUsername}`, { replace: true }); // Avoids adding history entry
            } else {
                navigate("/login", { replace: true });
            }
            return;
        }

        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profile/${username}`);
                setProfile(response.data);
                setDescription(response.data.description || ""); // Initialize description state
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Profile not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, navigate, loggedInUsername]);

    // Handle file input change
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    // Handle description input change
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("description", description);
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/profile/${username}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setProfile(response.data); // Update profile data in state
            setIsEditing(false); // Exit edit mode
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{profile?.username}'s Profile</h1>

            {/* Profile Picture Section */}
            <div style={styles.profilePictureContainer}>
                {profile?.profilePicture ? (
                    <img
                        src={`http://localhost:8080/api/profile/${username}/profile-picture`} // Fetch image from backend
                        alt="Profile"
                        style={styles.profilePicture}
                    />
                ) : (
                    <div style={styles.placeholderPicture}>No Profile Picture</div>
                )}
            </div>

            {/* Description Section */}
            <p style={styles.description}>{profile?.description || "No description available."}</p>

            {/* Update Profile Button */}
            {loggedInUsername === username && (
                <button onClick={() => setIsEditing(!isEditing)} style={styles.button}>
                    {isEditing ? "Cancel" : "Update Profile"}
                </button>
            )}

            {/* Edit Profile Form */}
            {isEditing && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="profilePicture" style={styles.label}>Profile Picture:</label>
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={styles.fileInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description" style={styles.label}>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={styles.textarea}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Save Changes</button>
                </form>
            )}

            <button onClick={() => navigate("/home")} style={styles.button}>Back to Home</button>
        </div>
    );
};

export default Profile;

// Inline styles for the component
const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    profilePictureContainer: {
        marginBottom: "20px",
    },
    profilePicture: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #ccc",
    },
    placeholderPicture: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #ccc",
        margin: "0 auto",
        fontSize: "1rem",
        color: "#666",
    },
    description: {
        fontSize: "1.2rem",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    label: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
    fileInput: {
        padding: "5px",
    },
    textarea: {
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        resize: "vertical",
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "5px",
    },
    error: {
        color: "red",
        fontSize: "1rem",
        marginBottom: "20px",
    },
};