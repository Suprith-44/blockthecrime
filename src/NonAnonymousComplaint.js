import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NonAnonymousComplaintPage = () => {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    place: '',
    description: '',
    evidences: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setComplaint(prev => ({ ...prev, evidences: [...prev.evidences, ...e.target.files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the complaint data to your backend
    console.log('Submitting non-anonymous complaint:', complaint);
    
    // Generate a random 5-digit complaint ID
    const complaintId = Math.floor(10000 + Math.random() * 90000).toString();
    
    // Navigate to the confirmation page with the complaint ID
    navigate('/confirmation', { state: { complaintId } });
  };

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
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#1a237e',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
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

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headerStyle}>File Non-Anonymous Complaint</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="name"
            value={complaint.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={complaint.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            value={complaint.phone}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            required
            style={inputStyle}
          />
          <input
            type="date"
            name="date"
            value={complaint.date}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="place"
            value={complaint.place}
            onChange={handleInputChange}
            placeholder="Place of incident"
            required
            style={inputStyle}
          />
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            placeholder="Description of the incident"
            required
            style={{ ...inputStyle, height: '100px' }}
          />
          <div>
            <p>Upload evidences:</p>
            <input
              type="file"
              name="evidences"
              onChange={handleFileChange}
              accept="image/*,video/*"
              multiple
              style={inputStyle}
            />
          </div>
          {complaint.evidences.length > 0 && (
            <div>
              <p>Selected files:</p>
              <ul>
                {complaint.evidences.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default NonAnonymousComplaintPage;
