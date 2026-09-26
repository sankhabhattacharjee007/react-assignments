import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

export const Dashboard = () => {
  const { user, token, tokenData, logout } = useAuth();
  const { tasks, stats } = useTasks();
  const [showFullToken, setShowFullToken] = useState(false);

  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb-sub">
            <span className="badge status-closed">&bull; Protected Dashboard Active</span>
          </div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome, <strong>{user?.username}</strong>. Overview of your task management system.</p>
        </div>
        <div className="header-actions">
          <Link to="/add-task" className="btn btn-primary">+ Add New Task</Link>
          <Link to="/tasks" className="btn btn-secondary">View All Tasks</Link>
        </div>
      </div>

      {/* Simulated JWT Token Banner */}
      {token && (
        <div className="token-card">
          <div className="token-card-header">
            <div>
              <h3>Simulated JWT Token</h3>
              <p className="token-sub">Generated on login &bull; Stored in <code>localStorage</code></p>
            </div>
            <button
              onClick={() => setShowFullToken(!showFullToken)}
              className="btn btn-sm btn-outline"
            >
              {showFullToken ? 'Hide Raw Token' : 'View Full Token'}
            </button>
          </div>

          <div className="token-preview-box">
            <code>
              {showFullToken ? token : `${token.slice(0, 45)}...${token.slice(-15)}`}
            </code>
          </div>

          {tokenData?.payload && (
            <div className="token-claims-row">
              <span className="claim-pill"><strong>Subject:</strong> {tokenData.payload.sub}</span>
              <span className="claim-pill"><strong>Issuer:</strong> {tokenData.payload.iss}</span>
              <span className="claim-pill"><strong>Expires In:</strong> 2 Hours</span>
              <span className="claim-pill green"><strong>Status:</strong> Valid (Active)</span>
            </div>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card stat-raised">
          <span className="stat-label">Raised</span>
          <span className="stat-value">{stats.raised}</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
        <div className="stat-card stat-closed">
          <span className="stat-label">Closed</span>
          <span className="stat-value">{stats.closed}</span>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="section-card">
        <div className="section-header">
          <h2>Recent Tasks</h2>
          <Link to="/tasks" className="link-arrow">Browse all &rarr;</Link>
        </div>

        {recentTasks.length === 0 ? (
          <p className="empty-text">No tasks available yet. Create one!</p>
        ) : (
          <div className="tasks-list">
            {recentTasks.map((task) => (
              <div key={task.id} className="task-row">
                <div className="task-row-main">
                  <div className="task-badges">
                    <span className={`badge status-${task.status.toLowerCase()}`}>{task.status}</span>
                    <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className="badge category-badge">{task.category}</span>
                  </div>
                  <h3 className="task-row-title">{task.header}</h3>
                  <p className="task-row-desc">{task.description}</p>
                  <div className="task-meta-info">
                    <span><strong>Raised:</strong> {task.raisedDate}</span>
                    <span>&bull;</span>
                    <span><strong>Due:</strong> {task.dueDate}</span>
                  </div>
                </div>
                <div className="task-row-actions">
                  <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
