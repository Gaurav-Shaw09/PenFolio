import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import profile4 from '../assets/profile4.jpg';

function About() {
  const navigate = useNavigate();

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    background: '#f4f4f4',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#4facfe',
    padding: '15px 50px',
    color: 'white',
    fontSize: '18px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  const teamContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '80px', // To avoid overlap with navbar
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</div>
        <div>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>Home</span>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/about')}>About Us</span>
          <span style={{ margin: '0 20px', cursor: 'pointer' }} onClick={() => navigate('/contact')}>Contact Us</span>
        </div>
      </nav>

      <h1 style={{ marginTop: '100px', color: '#333' }}>About Us</h1>
      <p>Welcome to MyApp! We are a team of passionate developers committed to building amazing experiences.</p>

      {/* Team Members */}
      <div style={teamContainerStyle}>
        {/* Member 1 */}
        <div style={cardStyle}>
          <img src={profile1} alt="Gaurav Shaw" style={imageStyle} />
          <h3>Gaurav Shaw</h3>
          <p>Founder and CEO</p>
        </div>

        {/* Member 2 */}
        <div style={cardStyle}>
          <img src={profile2} alt="Kumar Nishant" style={imageStyle} />
          <h3>Kumar Nishant</h3>
          <p>Lead Developer</p>
        </div>

        {/* Member 3 */}
        <div style={cardStyle}>
          <img src={profile3} alt="Aditya Suryavanshi" style={imageStyle} />
          <h3>Aditya Suryavanshi</h3>
          <p>Full Stack Developer</p>
        </div>

        {/* Member 4 */}
        <div style={cardStyle}>
          <img src={profile4} alt="Subham Bangal" style={imageStyle} />
          <h3>Subham Bangal</h3>
          <p>Marketing Specialist</p>
        </div>
      </div>
    </div>
  );
}

export default About;
