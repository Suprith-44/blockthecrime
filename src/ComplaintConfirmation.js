import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { complaintId } = location.state || { complaintId: 'N/A' };

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
    maxWidth: '600px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headerStyle = {
    color: '#1a237e',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    color: '#34495e',
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const complaintIdStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    padding: '10px',
    border: '2px dashed #3498db',
    display: 'inline-block',
    marginTop: '20px',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Thank You for Submitting Your Complaint</h1>
        <p style={paragraphStyle}>
          Your complaint has been successfully recorded in our system. We appreciate your courage in reporting this incident.
        </p>
        <p style={paragraphStyle}>
          Please note down your unique complaint ID for future reference:
        </p>
        <div style={complaintIdStyle}>{complaintId}</div>
        <p style={paragraphStyle}>
          You can use this ID to check the status of your complaint. We will process your report as quickly as possible.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
