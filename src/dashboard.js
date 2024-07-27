import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { LogOut, FileText, ArrowLeft } from 'lucide-react';

const OfficialDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
    fetchComplaints();
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-all-complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      } else {
        console.error('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '2rem',
    color: '#2c3e50',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const userNameStyle = {
    marginRight: '15px',
    fontSize: '1.1rem',
    color: '#34495e',
  };

  const logoutButtonStyle = {
    padding: '8px 15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const complaintsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  };

  const complaintCardStyle = (status) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    borderColor:
      status === 'flagged' ? 'red' :
      status === 'investigation' ? 'yellow' :
      status === 'court' ? 'green' : 'transparent',
    borderWidth: '3px',
    borderStyle: 'solid',
  });

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Official Dashboard</h1>
        <div style={userInfoStyle}>
          <span style={userNameStyle}>{user?.name}</span>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            <LogOut size={18} style={{ marginRight: '5px' }} />
            Logout
          </button>
        </div>
      </header>

      <div style={complaintsContainerStyle}>
        {complaints.map((complaint) => (
          <Link to={`/complaint-detail/${complaint.id}`} key={complaint.id}>
            <div style={complaintCardStyle(complaint.status)}>
              <FileText size={24} style={{ marginBottom: '10px', color: '#3498db' }} />
              <h3>{complaint.id}</h3>
              <p>Date: {complaint.date}</p>
              <p>Place: {complaint.place}</p>
              <p>Status: {complaint.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaintDetail();
  }, [complaintId]);

  const fetchComplaintDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-complaint/${complaintId}`);
      if (response.ok) {
        const data = await response.json();
        setComplaint(data);
      } else {
        console.error('Failed to fetch complaint details');
      }
    } catch (error) {
      console.error('Error fetching complaint details:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);
      const response = await fetch(`http://localhost:5000/update-complaint-status/${complaintId}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setComplaint((prevComplaint) => ({ ...prevComplaint, status: newStatus }));
      } else {
        console.error('Failed to update complaint status');
      }
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const detailContainerStyle = {
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '20px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginTop: '10px',
  };

  const buttonStyle = {
    padding: '8px 15px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    color: 'white',
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleBackClick} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <ArrowLeft size={18} style={{ marginRight: '5px' }} />
        Back
      </button>
      {complaint ? (
        <div style={detailContainerStyle}>
          <h2>Complaint Details</h2>
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Date:</strong> {complaint.date}</p>
          <p><strong>Place:</strong> {complaint.place}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
          <h3>Evidence Files:</h3>
          {complaint.evidence_files.map((file, index) => (
            <div key={index}>
              <p>{file.filename}</p>
              <img src={`data:image/png;base64,${file.content}`} alt={file.filename} style={imageStyle} />
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => handleStatusChange('flagged')}
              style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
            >
              Flag Complaint
            </button>
            <button
              onClick={() => handleStatusChange('investigation')}
              style={{ ...buttonStyle, backgroundColor: '#f39c12' }}
            >
              Move to Investigation
            </button>
          </div>
          {complaint.status === 'investigation' && (
            <div style={{ marginTop: '20px' }}>
              <h3>Investigation Options:</h3>
              <button style={{ ...buttonStyle, backgroundColor: '#3498db' }}>Chat</button>
              <button style={{ ...buttonStyle, backgroundColor: '#2ecc71' }}>Call</button>
              <button
                onClick={() => handleStatusChange('court')}
                style={{ ...buttonStyle, backgroundColor: '#9b59b6' }}
              >
                Move to Court
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export { OfficialDashboard, ComplaintDetail };