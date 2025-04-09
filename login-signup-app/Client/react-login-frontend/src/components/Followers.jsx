import { motion, AnimatePresence } from "framer-motion";

const Followers = ({ username, followers, isOpen, onClose, onProfileClick }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={styles.overlay}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        style={styles.modal}
                    >
                        <div style={styles.header}>
                            <h2>{username}'s Followers</h2>
                            <button onClick={onClose} style={styles.closeButton}>×</button>
                        </div>
                        <div style={styles.list}>
                            {followers.map((follower) => (
                                <div key={follower.id} style={styles.userItem}>
                                    <button
                                        style={styles.usernameButton}
                                        onClick={() => onProfileClick(follower.username)}
                                    >
                                        {follower.username}
                                    </button>
                                    <p>{follower.description || "No description"}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "20px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflowY: "auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    closeButton: {
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    userItem: {
        padding: "10px",
        borderBottom: "1px solid #e5e7eb",
    },
    usernameButton: {
        background: "none",
        border: "none",
        color: "#6366f1",
        fontSize: "1.1rem",
        fontWeight: "500",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
    },
};

export default Followers;