import React from 'react';
import { Shield, Search, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfficialWelcomePage = () => {
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
    color: '#0d47a1',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const subHeaderStyle = {
    textAlign: 'center',
    color: '#1565c0',
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
    color: '#1565c0',
  };

  const featureTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: '10px',
  };

  const featureDescStyle = {
    color: '#37474f',
    fontSize: '0.9rem',
  };

  const buttonStyle = {
    display: 'block',
    width: '200px',
    margin: '0 auto',
    padding: '12px 0',
    backgroundColor: '#1565c0',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(21, 101, 192, 0.4)',
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
        <h1 style={headerStyle}>Welcome to BlocktheCrime Official Portal</h1>
        <p style={subHeaderStyle}>Empowering officials to investigate and resolve complaints efficiently</p>
        <div style={featureContainerStyle}>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Shield size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Secure Access</h3>
            <p style={featureDescStyle}>Encrypted portal for authorized officials only</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Search size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Complaint Investigation</h3>
            <p style={featureDescStyle}>Tools to thoroughly investigate reported cases</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FileText size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Case Management</h3>
            <p style={featureDescStyle}>Efficient tracking and management of complaints</p>
          </div>
          <div
            style={featureStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <BarChart3 size={48} style={iconStyle} />
            <h3 style={featureTitleStyle}>Analytics Dashboard</h3>
            <p style={featureDescStyle}>Insights and statistics for better decision-making</p>
          </div>
        </div>
        <Link to="/login" style={buttonStyle}>Login</Link>
      </div>
    </div>
  );
};

export default OfficialWelcomePage;