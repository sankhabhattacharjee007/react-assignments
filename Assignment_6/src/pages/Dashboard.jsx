import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export const Dashboard = () => {
  const { tasks, stats } = useTasks();

  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of your academic and personal task progress</p>
        </div>
        <div className="header-actions">
          <Link to="/add-task" className="btn btn-primary">+ Add New Task</Link>
          <Link to="/tasks" className="btn btn-secondary">View All Tasks</Link>
        </div>
      </div>

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
