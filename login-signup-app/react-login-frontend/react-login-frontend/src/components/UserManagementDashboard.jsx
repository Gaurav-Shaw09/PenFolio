import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiUserPlus, FiChevronLeft, FiChevronRight, FiUser, FiMail, FiLock, FiCheck, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const UserManagementDashboard = ({ isDarkMode }) => {
  // State for users data
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });
  
  // Edit user form state
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get('/api/users');
        // setUsers(response.data);
        
        // Mock data for demonstration
        const mockUsers = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joinDate: '2023-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active', joinDate: '2023-02-20' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', joinDate: '2023-03-10' },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active', joinDate: '2023-04-05' },
          { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'editor', status: 'inactive', joinDate: '2023-05-12' },
          { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'admin', status: 'active', joinDate: '2023-06-18' },
          { id: 7, name: 'Ethan Davis', email: 'ethan@example.com', role: 'user', status: 'active', joinDate: '2023-07-22' },
          { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'editor', status: 'active', joinDate: '2023-08-30' },
          { id: 9, name: 'George Martinez', email: 'george@example.com', role: 'user', status: 'inactive', joinDate: '2023-09-14' },
          { id: 10, name: 'Hannah Lee', email: 'hannah@example.com', role: 'admin', status: 'active', joinDate: '2023-10-05' },
          { id: 11, name: 'Ian Thompson', email: 'ian@example.com', role: 'user', status: 'active', joinDate: '2023-11-11' },
          { id: 12, name: 'Jessica White', email: 'jessica@example.com', role: 'editor', status: 'inactive', joinDate: '2023-12-25' },
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };
    
    fetchUsers();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = users;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, roleFilter, statusFilter, users]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle add new user
  const handleAddUser = () => {
    // In a real app, this would be an API call
    // try {
    //   const response = await axios.post('/api/users', newUser);
    //   setUsers([...users, response.data]);
    //   setNewUser({ name: '', email: '', role: 'user', status: 'active' });
    //   setShowAddUserModal(false);
    // } catch (err) {
    //   setError('Failed to add user. Please try again.');
    // }
    
    // Mock implementation
    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUserObj = {
      id: newUserId,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUserObj]);
    setNewUser({ name: '', email: '', role: 'user', status: 'active' });
    setShowAddUserModal(false);
  };

  // Handle edit user
  const handleEditUser = () => {
    // In a real app, this would be an API call
    // try {
    //   const response = await axios.put(`/api/users/${selectedUser.id}`, editUser);
    //   const updatedUsers = users.map(user => 
    //     user.id === selectedUser.id ? response.data : user
    //   );
    //   setUsers(updatedUsers);
    //   setShowEditModal(false);
    // } catch (err) {
    //   setError('Failed to update user. Please try again.');
    // }
    
    // Mock implementation
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, ...editUser } : user
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  // Handle delete user
  const handleDeleteUser = () => {
    // In a real app, this would be an API call
    // try {
    //   await axios.delete(`/api/users/${selectedUser.id}`);
    //   const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    //   setUsers(updatedUsers);
    //   setShowDeleteModal(false);
    // } catch (err) {
    //   setError('Failed to delete user. Please try again.');
    // }
    
    // Mock implementation
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  // Open edit modal and set current user data
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    return (
      <span style={{
        ...styles.statusBadge,
        backgroundColor: status === 'active' 
          ? (isDarkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.2)')
          : (isDarkMode ? 'rgba(248, 113, 113, 0.2)' : 'rgba(248, 113, 113, 0.2)'),
        color: status === 'active' 
          ? (isDarkMode ? '#4ade80' : '#16a34a')
          : (isDarkMode ? '#f87171' : '#dc2626'),
      }}>
        {status === 'active' ? (
          <>
            <FiCheck size={14} style={{ marginRight: 4 }} />
            Active
          </>
        ) : (
          <>
            <FiX size={14} style={{ marginRight: 4 }} />
            Inactive
          </>
        )}
      </span>
    );
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleColors = {
      admin: isDarkMode ? '#818cf8' : '#6366f1',
      editor: isDarkMode ? '#fbbf24' : '#d97706',
      user: isDarkMode ? '#94a3b8' : '#64748b'
    };
    
    return (
      <span style={{
        ...styles.roleBadge,
        backgroundColor: isDarkMode 
          ? 'rgba(30, 41, 59, 0.5)' 
          : 'rgba(241, 245, 249, 0.5)',
        color: roleColors[role],
        border: `1px solid ${roleColors[role]}`
      }}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        ...styles.loadingContainer,
        background: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#e2e8f0" : "#1e293b"
      }}>
        <div style={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        ...styles.errorContainer,
        background: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#e2e8f0" : "#1e293b"
      }}>
        <p style={{ color: isDarkMode ? "#fca5a5" : "#dc2626" }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            ...styles.button,
            backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.1)",
            color: isDarkMode ? "#818cf8" : "#6366f1"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      style={{
        ...styles.container,
        background: isDarkMode 
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        color: isDarkMode ? "#e2e8f0" : "#1e293b"
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div style={styles.header} variants={itemVariants}>
        <h1 style={styles.title}>User Management</h1>
        <button 
          onClick={() => setShowAddUserModal(true)}
          style={{
            ...styles.addButton,
            backgroundColor: isDarkMode ? "#818cf8" : "#6366f1"
          }}
          whileHover={{ 
            backgroundColor: isDarkMode ? "#6366f1" : "#4f46e5",
            transform: "translateY(-2px)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FiUserPlus style={{ marginRight: 8 }} />
          Add User
        </button>
      </motion.div>

      <motion.div style={styles.controls} variants={itemVariants}>
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...styles.searchInput,
              background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "#e2e8f0" : "#1e293b",
            }}
          />
        </div>
        
        <div style={styles.filterContainer}>
          <div style={styles.filterGroup}>
            <FiFilter style={styles.filterIcon} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                ...styles.filterSelect,
                background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
              }}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <FiFilter style={styles.filterIcon} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                ...styles.filterSelect,
                background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{
          ...styles.tableContainer,
          background: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
          border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
        }}
        variants={itemVariants}
      >
        <table style={styles.table}>
          <thead>
            <tr style={{
              ...styles.tableHeaderRow,
              borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
            }}>
              <th style={styles.tableHeader}>User</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Joined</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <motion.tr 
                  key={user.id}
                  style={{
                    ...styles.tableRow,
                    borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
                  }}
                  whileHover={{
                    backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.5)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <td style={styles.tableCell}>
                    <div style={styles.userCell}>
                      <div style={{
                        ...styles.avatar,
                        backgroundColor: isDarkMode ? "#818cf8" : "#6366f1"
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>
                    <RoleBadge role={user.role} />
                  </td>
                  <td style={styles.tableCell}>
                    <StatusBadge status={user.status} />
                  </td>
                  <td style={styles.tableCell}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => openEditModal(user)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: isDarkMode ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.1)",
                          color: isDarkMode ? "#818cf8" : "#6366f1"
                        }}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: isDarkMode ? "rgba(248, 113, 113, 0.1)" : "rgba(239, 68, 68, 0.1)",
                          color: isDarkMode ? "#f87171" : "#ef4444"
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noResults}>
                  <FiUser size={48} style={{ 
                    color: isDarkMode ? '#475569' : '#94a3b8', 
                    marginBottom: 16 
                  }} />
                  <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                    No users found matching your criteria
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {filteredUsers.length > 0 && (
        <motion.div style={styles.pagination} variants={itemVariants}>
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.paginationButton,
              backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "#e2e8f0" : "#1e293b",
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <FiChevronLeft size={18} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                ...styles.paginationButton,
                backgroundColor: number === currentPage 
                  ? (isDarkMode ? "#818cf8" : "#6366f1")
                  : (isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)"),
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                color: number === currentPage 
                  ? 'white' 
                  : (isDarkMode ? "#e2e8f0" : "#1e293b"),
              }}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              ...styles.paginationButton,
              backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "#e2e8f0" : "#1e293b",
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            <FiChevronRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <motion.div 
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            style={{
              ...styles.modal,
              background: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 style={{
              ...styles.modalTitle,
              color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}>Add New User</h2>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Name</label>
              <div style={styles.inputWithIcon}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={{
                    ...styles.formInput,
                    background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                    color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  }}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Email</label>
              <div style={styles.inputWithIcon}>
                <FiMail style={styles.inputIcon} />
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{
                    ...styles.formInput,
                    background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                    color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  }}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                style={{
                  ...styles.formSelect,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                }}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Status</label>
              <select
                value={newUser.status}
                onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                style={{
                  ...styles.formSelect,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowAddUserModal(false)}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.8)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "#818cf8" : "#6366f1",
                  color: "white"
                }}
                disabled={!newUser.name || !newUser.email}
              >
                Add User
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <motion.div 
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            style={{
              ...styles.modal,
              background: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 style={{
              ...styles.modalTitle,
              color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}>Edit User</h2>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Name</label>
              <div style={styles.inputWithIcon}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                  style={{
                    ...styles.formInput,
                    background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                    color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  }}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Email</label>
              <div style={styles.inputWithIcon}>
                <FiMail style={styles.inputIcon} />
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                  style={{
                    ...styles.formInput,
                    background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                    color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  }}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Role</label>
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                style={{
                  ...styles.formSelect,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                }}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: isDarkMode ? "#e2e8f0" : "#1e293b"
              }}>Status</label>
              <select
                value={editUser.status}
                onChange={(e) => setEditUser({...editUser, status: e.target.value})}
                style={{
                  ...styles.formSelect,
                  background: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.8)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "#818cf8" : "#6366f1",
                  color: "white"
                }}
                disabled={!editUser.name || !editUser.email}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <motion.div 
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            style={{
              ...styles.modal,
              background: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 style={{
              ...styles.modalTitle,
              color: isDarkMode ? "#e2e8f0" : "#1e293b"
            }}>Confirm Deletion</h2>
            
            <p style={{
              ...styles.modalText,
              color: isDarkMode ? "#94a3b8" : "#64748b"
            }}>
              Are you sure you want to delete user <strong>{selectedUser.name}</strong>? This action cannot be undone.
            </p>
            
            <div style={styles.modalButtons}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.8)",
                  color: isDarkMode ? "#e2e8f0" : "#1e293b",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                style={{
                  ...styles.modalButton,
                  backgroundColor: isDarkMode ? "#f87171" : "#ef4444",
                  color: "white"
                }}
              >
                Delete User
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '24px',
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(99, 102, 241, 0.2)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0',
    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.3s ease',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  searchContainer: {
    position: 'relative',
    flex: '1',
    minWidth: '250px'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 40px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  filterContainer: {
    display: 'flex',
    gap: '16px'
  },
  filterGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  filterIcon: {
    position: 'absolute',
    left: '12px',
    color: '#64748b'
  },
  filterSelect: {
    padding: '12px 16px 12px 36px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  tableContainer: {
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0'
  },
  tableHeaderRow: {
    textAlign: 'left'
  },
  tableHeader: {
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    whiteSpace: 'nowrap'
  },
  tableRow: {
    transition: 'background-color 0.2s ease'
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    whiteSpace: 'nowrap'
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
    flexShrink: '0'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  roleBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  noResults: {
    padding: '40px',
    textAlign: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px'
  },
  paginationButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '24px'
  },
  modalText: {
    marginBottom: '24px',
    lineHeight: '1.6'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500'
  },
  inputWithIcon: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px 12px 40px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  formSelect: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)'
    }
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px'
  },
  modalButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }
};

export default UserManagementDashboard;