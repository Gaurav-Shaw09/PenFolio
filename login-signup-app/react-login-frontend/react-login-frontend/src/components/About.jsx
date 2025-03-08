import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import profile4 from '../assets/profile4.jpg';

function About() {
  const navigate = useNavigate();

  // LinkedIn Profiles
  const linkedInProfiles = {
    gaurav: 'https://www.linkedin.com/in/gauravshaw',
    nishant: 'https://www.linkedin.com/in/kumar-nishant',
    aditya: 'https://www.linkedin.com/in/aditya-suryavanshi',
    subham: 'https://www.linkedin.com/in/subham-bangal',
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove stored username
    localStorage.removeItem("token"); // If using a token-based authentication system
    navigate("/login"); // Redirect to login page
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', // Blue gradient background
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space between title and links
    alignItems: 'center',
    background: 'linear-gradient(to right, #2196f3, #64b5f6)', // Blue gradient for navbar
    padding: '15px 50px',
    color: 'white',
    fontSize: '18px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const navCenterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    flex: 1, // Pushes items to center
  };

  const teamContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '10px',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const hoverEffect = {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  };

  const imageStyle = {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '3px solid #2196f3', // Blue border
  };

  const welcomeTextStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    maxWidth: '70%',
    margin: '20px auto',
    lineHeight: '1.6',
    background: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const footerStyle = {
    background: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '15px 0',
    marginTop: '50px',
  };

  const navbarLinksStyle = {
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={titleStyle}>MyApp</div>
        <div style={navCenterStyle}>
          <span style={navbarLinksStyle} onClick={() => navigate('/home')}>Home</span>
          <span style={navbarLinksStyle} onClick={() => navigate('/about')}>About Us</span>
          <span style={navbarLinksStyle} onClick={() => navigate('/contact')}>Contact Us</span>
          <button
            onClick={handleLogout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>
      </nav>

      <h1 style={{ marginTop: '100px', color: '#2196f3', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>About Us</h1>
      <p style={welcomeTextStyle}>
        Welcome to MyApp! We are a team of passionate developers committed to building amazing experiences.
      </p>

      {/* Team Members */}
      <div style={teamContainerStyle}>
        {/* Member 1 */}
        <div
          style={cardStyle}
          onClick={() => window.open(linkedInProfiles.gaurav, '_blank')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img src={profile1} alt="Gaurav Shaw" style={imageStyle} />
          <h3>Gaurav Shaw</h3>
          <p>Founder and CEO</p>
        </div>

        {/* Member 2 */}
        <div
          style={cardStyle}
          onClick={() => window.open(linkedInProfiles.nishant, '_blank')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img src={profile2} alt="Kumar Nishant" style={imageStyle} />
          <h3>Kumar Nishant</h3>
          <p>Lead Developer</p>
        </div>

        {/* Member 3 */}
        <div
          style={cardStyle}
          onClick={() => window.open(linkedInProfiles.aditya, '_blank')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img src={profile3} alt="Aditya Suryavanshi" style={imageStyle} />
          <h3>Aditya Suryavanshi</h3>
          <p>Full Stack Developer</p>
        </div>

        {/* Member 4 */}
        <div
          style={cardStyle}
          onClick={() => window.open(linkedInProfiles.subham, '_blank')}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img src={profile4} alt="Subham Bangal" style={imageStyle} />
          <h3>Subham Bangal</h3>
          <p>Marketing Specialist</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} MyApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default About;