import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <button onClick={() => navigate("/")} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;