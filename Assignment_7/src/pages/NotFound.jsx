import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="page not-found-page">
      <div className="empty-state-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you requested does not exist or has moved.</p>
        <Link to="/" className="btn btn-primary">Return to Dashboard</Link>
      </div>
    </div>
  );
};
