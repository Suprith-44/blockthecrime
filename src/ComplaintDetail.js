import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaintDetail();
  }, []);

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

  const handleMoveToInvestigation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/move-to-investigation/${complaintId}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchComplaintDetail(); // Refresh complaint details
      } else {
        console.error('Failed to move complaint to investigation');
      }
    } catch (error) {
      console.error('Error moving complaint to investigation:', error);
    }
  };

  const handleFlagComplaint = async () => {
    try {
      const response = await fetch(`http://localhost:5000/flag-complaint/${complaintId}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchComplaintDetail(); // Refresh complaint details
      } else {
        console.error('Failed to flag complaint');
      }
    } catch (error) {
      console.error('Error flagging complaint:', error);
    }
  };

  const handleChat = () => {
    // Implement chat functionality here
    alert('Chat functionality is not implemented yet.');
  };

  const handleCall = () => {
    // Implement call functionality here
    alert('Call functionality is not implemented yet.');
  };

  const handleMoveToCourt = () => {
    // Implement move to court functionality here
    alert('Move to court functionality is not implemented yet.');
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

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleBackClick} style={{ marginBottom: '20px' }}>Back</button>
      {complaint ? (
        <div style={detailContainerStyle}>
          <h2>Complaint Details</h2>
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Date:</strong> {complaint.date}</p>
          <p><strong>Place:</strong> {complaint.place}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <h3>Evidence Files:</h3>
          {complaint.evidence_files.map((file, index) => (
            <div key={index}>
              <p>{file.filename}</p>
              <img src={`data:image/png;base64,${file.content}`} alt={file.filename} style={imageStyle} />
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            {complaint.status !== 'investigation' && (
              <button onClick={handleMoveToInvestigation} style={{ marginRight: '10px' }}>Move to Investigation</button>
            )}
            <button onClick={handleFlagComplaint} style={{ marginRight: '10px' }}>Flag Complaint</button>
            {complaint.status === 'investigation' && (
              <>
                <button onClick={handleChat} style={{ marginRight: '10px' }}>Chat</button>
                <button onClick={handleCall} style={{ marginRight: '10px' }}>Call</button>
                <button onClick={handleMoveToCourt} style={{ marginRight: '10px' }}>Move to Court</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ComplaintDetail;

