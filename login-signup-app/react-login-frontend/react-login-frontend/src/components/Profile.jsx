import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Profile not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, navigate, loggedInUsername]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{profile?.username}'s Profile</h1>
            {profile?.profilePicture && <img src={profile.profilePicture} alt="Profile" />}
            <p>{profile?.description || "No description available."}</p>
            <button onClick={() => navigate("/home")}>Back to Home</button>
        </div>
    );
};

export default Profile;
