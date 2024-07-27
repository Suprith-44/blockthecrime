import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [hasComplaint, setHasComplaint] = useState(null);

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
    maxWidth: '800px',
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

  const descriptionStyle = {
    textAlign: 'center',
    color: '#3f51b5',
    marginBottom: '30px',
  };

  const questionStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '30px',
    marginBottom: '20px',
    color: '#1a237e',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 5px 15px rgba(63, 81, 181, 0.4)',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(63, 81, 181, 0.6)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(63, 81, 181, 0.4)';
  };

  const handleChoice = (isAnonymous) => {
    if (isAnonymous) {
      navigate('/file-anonymous-complaint');
    } else {
      navigate('/file-non-anonymous-complaint');
    }
  };

  const handleCheckStatus = () => {
    navigate('/check-complaint-status');
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Welcome to BlocktheCrime</h1>
        <p style={descriptionStyle}>
          BlocktheCrime is a revolutionary platform that leverages blockchain technology to provide a secure,
          anonymous, and efficient way to report crimes. Our system ensures that your voice is heard while
          protecting your identity, and that cases are handled with the utmost care and priority.
        </p>
        
        <div style={questionStyle}>
          Have you already filed a complaint?
        </div>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setHasComplaint(true)}
          >
            Yes
          </button>
          <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setHasComplaint(false)}
          >
            No
          </button>
        </div>

        {hasComplaint === true && (
          <div style={{ textAlign: 'center' }}>
            <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCheckStatus}
            >
              Check Complaint Status
            </button>
          </div>
        )}

        {hasComplaint === false && (
          <>
            <div style={questionStyle}>
              Would you like to keep your complaint anonymous?
            </div>
            <div style={buttonContainerStyle}>
              <button
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleChoice(true)}
              >
                Yes
              </button>
              <button
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleChoice(false)}
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
