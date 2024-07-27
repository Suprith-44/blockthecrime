import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import AnonymousComplaintPage from './AnonymousComplaint';
import NonAnonymousComplaintPage from './NonAnonymousComplaint';
import ConfirmationPage from './ComplaintConfirmation';
import CheckComplaintStatus from './checkstatus';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/file-anonymous-complaint" element={<AnonymousComplaintPage />} />
        <Route path="/file-non-anonymous-complaint" element={<NonAnonymousComplaintPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/check-complaint-status" element={<CheckComplaintStatus />} />
      </Routes>
    </Router>
  );
};

export default App;