import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask, completeTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Academic');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Raised');

  useEffect(() => {
    if (task) {
      setHeader(task.header);
      setDescription(task.description);
      setPriority(task.priority);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setStatus(task.status);
    }
  }, [task]);

  if (!task) {
    return (
      <div className="page error-page">
        <div className="empty-state-card">
          <h2>Task Not Found</h2>
          <p>No task matches ID: <code>{id}</code></p>
          <Link to="/tasks" className="btn btn-primary">&larr; Return to Tasks</Link>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateTask(id, {
      header: header.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      status
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.header}"?`)) {
      deleteTask(id);
      navigate('/tasks');
    }
  };

  const handleStatusChange = (newStatus) => {
    updateTask(id, { status: newStatus });
  };

  return (
    <div className="page task-details-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb-sub">
            <Link to="/tasks">&larr; Tasks</Link> / <span>Task #{id}</span>
          </div>
          <h1>{isEditing ? 'Edit Task' : task.header}</h1>
        </div>

        <div className="header-actions">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                Edit Task
              </button>
              {task.status !== 'Closed' ? (
                <button onClick={() => completeTask(id)} className="btn btn-success">
                  Mark Closed
                </button>
              ) : (
                <button onClick={() => updateTask(id, { status: 'Pending' })} className="btn btn-secondary">
                  Reopen
                </button>
              )}
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
              Cancel Editing
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="form-card">
          <form onSubmit={handleSave} className="task-form">
            <div className="form-group">
              <label htmlFor="edit-header">Task Header</label>
              <input
                id="edit-header"
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-desc">Task Description</label>
              <textarea
                id="edit-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="textarea-field"
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="edit-priority">Priority</label>
                <select
                  id="edit-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="select-field"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group half">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-field"
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select-field"
                >
                  <option value="Raised">Raised</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group half">
                <label htmlFor="edit-due">Due Date</label>
                <input
                  id="edit-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="details-card">
          <div className="details-header-badges">
            <span className={`badge status-${task.status.toLowerCase()}`}>{task.status}</span>
            <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
            <span className="badge category-badge">{task.category}</span>
          </div>

          <div className="details-section">
            <h3>Description</h3>
            <p className="details-desc-text">{task.description}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Task ID</span>
              <span className="detail-val"><code>{task.id}</code></span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-val">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="select-field inline-select"
                >
                  <option value="Raised">Raised</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Raised Date & Time</span>
              <span className="detail-val">{task.raisedDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Due Date</span>
              <span className="detail-val">{task.dueDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
