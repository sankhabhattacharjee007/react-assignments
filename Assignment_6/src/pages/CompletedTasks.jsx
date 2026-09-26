import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export const CompletedTasks = () => {
  const { tasks, reopenTask, deleteTask } = useTasks();

  const completedList = tasks.filter((t) => t.status === 'Closed');

  return (
    <div className="page completed-page">
      <div className="page-header">
        <div>
          <h1>Completed Tasks</h1>
          <p className="subtitle">All tasks that have been closed and finalized</p>
        </div>
        <Link to="/tasks" className="btn btn-secondary">View All Tasks</Link>
      </div>

      <div className="tasks-count-bar">
        <span>Total Closed Tasks: <strong>{completedList.length}</strong></span>
      </div>

      {completedList.length === 0 ? (
        <div className="empty-state-card">
          <p>No completed tasks yet. Finish a task from the directory to see it here.</p>
          <Link to="/tasks" className="btn btn-primary">Go to Tasks</Link>
        </div>
      ) : (
        <div className="tasks-list">
          {completedList.map((task) => (
            <div key={task.id} className="task-card completed-card">
              <div className="task-card-header">
                <div className="task-badges">
                  <span className="badge status-closed">Closed</span>
                  <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
                  <span className="badge category-badge">{task.category}</span>
                </div>
              </div>

              <h3 className="task-card-title">{task.header}</h3>
              <p className="task-card-desc">{task.description}</p>

              <div className="task-dates">
                <div><strong>Raised:</strong> {task.raisedDate}</div>
                <div><strong>Due Date:</strong> {task.dueDate}</div>
              </div>

              <div className="task-card-footer">
                <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-outline">
                  View Details &rarr;
                </Link>

                <div className="task-card-actions">
                  <button
                    onClick={() => reopenTask(task.id)}
                    className="btn btn-sm btn-secondary"
                    title="Move back to Pending"
                  >
                    Reopen Task
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete completed task "${task.header}"?`)) {
                        deleteTask(task.id);
                      }
                    }}
                    className="btn btn-sm btn-danger"
                    title="Delete permanently"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
