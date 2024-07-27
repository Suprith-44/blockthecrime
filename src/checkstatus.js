import React, { useState } from 'react';

const CheckComplaintStatus = () => {
    const [complaintId, setComplaintId] = useState('');
    const [complaintDetails, setComplaintDetails] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        color: '#1a237e',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    };
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    };
    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #bdc3c7',
    };
    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };
    const detailsStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setComplaintDetails(null);
        try {
            const response = await fetch(`http://localhost:5000/get-complaint/${complaintId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch complaint details');
            }
            const data = await response.json();
            setComplaintDetails(data);
        } catch (err) {
            setError('Error fetching complaint details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={headerStyle}>Check Complaint Status</h1>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="text"
                        value={complaintId}
                        onChange={(e) => setComplaintId(e.target.value)}
                        placeholder="Enter your 5-digit complaint ID"
                        style={inputStyle}
                        maxLength={5}
                        required
                    />
                    <button type="submit" style={buttonStyle} disabled={isLoading}>
                        {isLoading ? 'Checking...' : 'Check Status'}
                    </button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                {complaintDetails && (
                    <div style={detailsStyle}>
                        <h2>Complaint Details</h2>
                        <p><strong>Complaint ID:</strong> {complaintDetails.id}</p>
                        <p><strong>Date Filed:</strong> {complaintDetails.date}</p>
                        <p><strong>Place:</strong> {complaintDetails.place}</p>
                        <p><strong>Description:</strong> {complaintDetails.description}</p>
                        <p><strong>Evidence Files:</strong></p>
                        <ul>
                            {complaintDetails.evidence_files.map((file, index) => (
                                <li key={index}>
                                    <p>{file.filename}</p>
                                    <img src={`data:image/jpeg;base64,${file.content}`} alt={file.filename} style={{ maxWidth: '100%' }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckComplaintStatus;
