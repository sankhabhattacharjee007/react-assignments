import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export const Tasks = () => {
  const { tasks, completeTask, deleteTask } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const statusFilter = searchParams.get('status') || 'All';
  const categoryFilter = searchParams.get('category') || 'All';
  const priorityFilter = searchParams.get('priority') || 'All';
  const searchQuery = searchParams.get('q') || '';

  // Update query params helper
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === '') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  // Filter tasks based on URL parameters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== 'All' && task.status !== statusFilter) return false;
      if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inHeader = task.header.toLowerCase().includes(query);
        const inDesc = task.description.toLowerCase().includes(query);
        if (!inHeader && !inDesc) return false;
      }
      return true;
    });
  }, [tasks, statusFilter, categoryFilter, priorityFilter, searchQuery]);

  const hasFiltersApplied = statusFilter !== 'All' || categoryFilter !== 'All' || priorityFilter !== 'All' || searchQuery !== '';

  return (
    <div className="page tasks-page">
      <div className="page-header">
        <div>
          <h1>Tasks Directory</h1>
          <p className="subtitle">View, search, filter, and manage your tasks</p>
        </div>
        <Link to="/add-task" className="btn btn-primary">+ Add Task</Link>
      </div>

      {/* Filter Toolbar (Synced with URL Parameters) */}
      <div className="filter-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => handleFilterChange('q', e.target.value)}
            className="input-field"
          />
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="select-field"
          >
            <option value="All">All Statuses</option>
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select
            value={priorityFilter}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="select-field"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="select-field"
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {hasFiltersApplied && (
          <button onClick={handleResetFilters} className="btn btn-sm btn-outline">
            Reset Filters
          </button>
        )}
      </div>

      {/* Task Count & Feedback */}
      <div className="tasks-count-bar">
        <span>Showing <strong>{filteredTasks.length}</strong> of {tasks.length} tasks</span>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state-card">
          <p>No tasks matched your filter criteria.</p>
          {hasFiltersApplied && (
            <button onClick={handleResetFilters} className="btn btn-sm btn-primary">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <div className="task-badges">
                  <span className={`badge status-${task.status.toLowerCase()}`}>{task.status}</span>
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
                  {task.status !== 'Closed' && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="btn btn-sm btn-success"
                      title="Mark as Closed"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete task "${task.header}"?`)) {
                        deleteTask(task.id);
                      }
                    }}
                    className="btn btn-sm btn-danger"
                    title="Delete task"
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
