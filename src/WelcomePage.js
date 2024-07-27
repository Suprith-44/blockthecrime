import React from 'react';
import { Shield, UserPlus, Database, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  };

  const containerStyle = {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    width: '100%',
    maxWidth: '1200px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#1a237e',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const subHeaderStyle = {
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: '1.2rem',
    marginBottom: '40px',
  };

  const featureContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '40px',
  };

  const featureStyle = {
    flex: '1 1 200px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const iconStyle = {
    marginBottom: '15px',
    color: '#3f51b5',
  };

  const featureTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: '10px',
  };

  const featureDescStyle = {
    color: '#546e7a',
    fontSize: '0.9rem',
  };

  const buttonStyle = {
    display: 'block',
    width: '200px',
    margin: '0 auto',
    padding: '12px 0',
    backgroundColor: '#3f51b5',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(63, 81, 181, 0.4)',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Welcome to BlocktheCrime</h1>
        <p style={subHeaderStyle}>Empowering citizens to report crimes safely and anonymously</p>
        <div style={featureContainerStyle}>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Shield size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Anonymous Reporting</h3>
            <p style={featureDescStyle}>File cases without revealing your identity</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <UserPlus size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Community Oversight</h3>
            <p style={featureDescStyle}>Cases reviewed by multiple parties for fairness</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Database size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Blockchain Security</h3>
            <p style={featureDescStyle}>Tamper-proof storage of complaints and evidence</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <BarChart3 size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Priority Handling</h3>
            <p style={featureDescStyle}>Cases sorted by severity for efficient resolution</p>
          </div>
        </div>
        <Link to="/home" style={buttonStyle}>Get Started</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
