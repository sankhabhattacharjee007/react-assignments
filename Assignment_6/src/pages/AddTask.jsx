import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Academic');
  const [dueDate, setDueDate] = useState('2026-08-28');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!header.trim()) {
      alert('Please enter a Task Header');
      return;
    }

    addTask({
      header,
      description,
      priority,
      category,
      dueDate
    });

    navigate('/tasks');
  };

  return (
    <div className="page form-page">
      <div className="page-header">
        <div>
          <h1>Add New Task</h1>
          <p className="subtitle">Create and assign a new academic or personal task</p>
        </div>
        <Link to="/tasks" className="btn btn-outline">&larr; Back to Tasks</Link>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="task-form">
          {/* Task Header */}
          <div className="form-group">
            <label htmlFor="header">Task Header *</label>
            <input
              id="header"
              type="text"
              placeholder="e.g. Complete Operating Systems Assignment"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Task Description */}
          <div className="form-group">
            <label htmlFor="description">Task Description *</label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the details and requirements of this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="textarea-field"
            />
          </div>

          {/* Row for Priority & Category */}
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
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
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-field"
              >
                <option value="Academic">Academic</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>

          {/* Due Date & Auto-picked Raised Date Info */}
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group half">
              <label>Raised Date & Time</label>
              <div className="info-readonly-box">
                Automatically picked on creation
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
