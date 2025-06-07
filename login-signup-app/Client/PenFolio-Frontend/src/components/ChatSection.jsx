import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiSend, FiSearch } from "react-icons/fi";

const ChatSection = ({ isDarkMode }) => {
  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUsername = localStorage.getItem("username");
  const [following, setFollowing] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFollowing, setFilteredFollowing] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch following list on mount
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/profile/${loggedInUsername}/following`
        );
        setFollowing(res.data || []);
        setFilteredFollowing(res.data || []);
      } catch (err) {
        setFollowing([]);
        setFilteredFollowing([]);
      }
    };
    fetchFollowing();
  }, [loggedInUsername]);

  // Filter following users based on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredFollowing(following);
    } else {
      setFilteredFollowing(
        following.filter((user) =>
          (user.username || user.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [search, following]);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/messages/${loggedInUserId}/${selectedUser.userId || selectedUser.id}`
        );
        setMessages(res.data || []);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [selectedUser, loggedInUserId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;
    try {
      const msg = {
        from: loggedInUserId,
        to: selectedUser.userId || selectedUser.id,
        text: text.trim(),
      };
      await axios.post("http://localhost:8080/api/messages", msg);
      setMessages([...messages, { ...msg, user: loggedInUsername }]);
      setText("");
    } catch (err) {}
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        background: isDarkMode ? "#1e293b" : "#fff",
        color: isDarkMode ? "#e2e8f0" : "#1e293b",
        boxShadow: isDarkMode
          ? "0 4px 24px rgba(129,140,248,0.06)"
          : "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      {/* Sidebar: Following List */}
      <div
        style={{
          ...styles.sidebar,
          background: isDarkMode ? "#0f172a" : "#f1f5f9",
          borderRight: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            ...styles.sidebarHeader,
            background: isDarkMode ? "#1e293b" : "#fff",
            borderBottom: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
          }}
        >
          <span>Chats</span>
        </div>
        <div style={styles.searchBar}>
          <FiSearch style={{ marginLeft: 8, color: "#6366f1" }} />
          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...styles.searchInput,
              background: isDarkMode ? "#1e293b" : "#f3f4f6",
              color: isDarkMode ? "#e2e8f0" : "#1e293b",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
            }}
          />
        </div>
        <div style={styles.sidebarList}>
          {filteredFollowing.length === 0 && (
            <div style={styles.emptySidebar}>No following found.</div>
          )}
          {filteredFollowing.map((user) => (
            <div
              key={user.userId || user.id}
              style={{
                ...styles.userItem,
                background:
                  selectedUser &&
                  (selectedUser.userId || selectedUser.id) ===
                    (user.userId || user.id)
                    ? isDarkMode
                      ? "#334155"
                      : "#e0e7ff"
                    : "transparent",
                color:
                  selectedUser &&
                  (selectedUser.userId || selectedUser.id) ===
                    (user.userId || user.id)
                    ? isDarkMode
                      ? "#fff"
                      : "#3730a3"
                    : isDarkMode
                    ? "#cbd5e1"
                    : "#1e293b",
              }}
              onClick={() => setSelectedUser(user)}
            >
              <div
                style={{
                  ...styles.avatar,
                  background: isDarkMode ? "#818cf8" : "#6366f1",
                }}
              >
                {(user.username || user.name || "?")[0].toUpperCase()}
              </div>
              <span>{user.username || user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        style={{
          ...styles.chatPanel,
          background: isDarkMode ? "#1e293b" : "#f8fafc",
        }}
      >
        {selectedUser ? (
          <>
            <div
              style={{
                ...styles.chatHeader,
                borderBottom: isDarkMode
                  ? "1px solid #334155"
                  : "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  ...styles.avatarLarge,
                  background: isDarkMode ? "#6366f1" : "#6366f1",
                }}
              >
                {(selectedUser.username || selectedUser.name || "?")[0].toUpperCase()}
              </div>
              <span style={{ fontWeight: 600, fontSize: 17 }}>
                {selectedUser.username || selectedUser.name}
              </span>
            </div>
            <div style={styles.messagesArea}>
              {loadingMessages ? (
                <div style={{ color: "#888", padding: 14 }}>Loading...</div>
              ) : messages.length === 0 ? (
                <div style={{ color: "#888", fontStyle: "italic", padding: 14 }}>
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.message,
                      alignSelf:
                        msg.from === loggedInUserId ? "flex-end" : "flex-start",
                      background:
                        msg.from === loggedInUserId
                          ? isDarkMode
                            ? "#1e40af"
                            : "#dbeafe"
                          : isDarkMode
                          ? "#334155"
                          : "#f3f4f6",
                      color:
                        msg.from === loggedInUserId
                          ? isDarkMode
                            ? "#fff"
                            : "#1e293b"
                          : isDarkMode
                          ? "#e2e8f0"
                          : "#1e293b",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {msg.from === loggedInUserId ? "You" : selectedUser.username}
                    </span>
                    <br />
                    {msg.text}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              style={{
                ...styles.inputArea,
                background: isDarkMode ? "#1e293b" : "#fff",
                borderTop: isDarkMode
                  ? "1px solid #334155"
                  : "1px solid #e5e7eb",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  ...styles.input,
                  background: isDarkMode ? "#334155" : "#f3f4f6",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  border: isDarkMode ? "1px solid #334155" : "1px solid #d1d5db",
                }}
              />
              <button
                type="submit"
                style={{
                  ...styles.button,
                  background: isDarkMode ? "#6366f1" : "#6366f1",
                }}
                title="Send"
              >
                <FiSend size={18} />
              </button>
            </form>
          </>
        ) : (
          <div
            style={{
              color: isDarkMode ? "#94a3b8" : "#888",
              fontSize: 17,
              padding: 25,
            }}
          >
            Select a person you follow to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "60vh",
    width: "60vw",
    minWidth: 320,
    minHeight: 320,
    maxWidth: 760,
    maxHeight: 500,
    margin: "30px auto",
    borderRadius: 12,
    overflow: "hidden",
    transition: "background 0.3s, color 0.3s",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  },
  sidebar: {
    width: 180,
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    fontWeight: 700,
    fontSize: 17,
    padding: "16px 10px",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    letterSpacing: 1,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: "#f1f5f9",
    padding: "5px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  searchInput: {
    border: "none",
    outline: "none",
    padding: "7px 10px",
    borderRadius: "15px",
    fontSize: "14px",
    marginLeft: 6,
    width: "75%",
    transition: "background 0.2s, color 0.2s",
  },
  sidebarList: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 2,
  },
  emptySidebar: {
    color: "#888",
    padding: 10,
    textAlign: "center",
    fontSize: 13,
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    cursor: "pointer",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14,
    transition: "background 0.2s, color 0.2s",
    fontWeight: 500,
    borderRadius: 0,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 13,
    color: "#fff",
  },
  chatPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    background: "#f8fafc",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 18px 8px 18px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14,
    minHeight: 40,
  },
  avatarLarge: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "10px 14px 0 14px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  message: {
    maxWidth: "80%",
    padding: "8px 13px",
    borderRadius: "12px",
    marginBottom: 6,
    fontSize: 13,
    wordBreak: "break-word",
    boxShadow: "0 1px 4px rgba(0,0,0,0.01)",
    fontWeight: 400,
    whiteSpace: "pre-wrap",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 15px",
    borderTop: "1px solid #e5e7eb",
    minHeight: 40,
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#f3f4f6",
    transition: "background 0.2s, color 0.2s",
  },
  button: {
    padding: "6px 14px",
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "#6366f1",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
};

export default ChatSection;