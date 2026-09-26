import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const TaskContext = createContext();

export const formatCurrentDateTime = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, '0');

  return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('assignment7_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading tasks from storage', e);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('assignment7_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks to storage', e);
    }
  }, [tasks]);

  const addTask = ({ header, description, priority, category, dueDate }) => {
    const newTask = {
      id: Date.now().toString(),
      header: header.trim(),
      description: description.trim(),
      priority: priority || 'Medium',
      category: category || 'Academic',
      raisedDate: formatCurrentDateTime(),
      dueDate: dueDate || '2026-08-28',
      status: 'Raised'
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completeTask = (id) => {
    updateTask(id, { status: 'Closed' });
  };

  const reopenTask = (id) => {
    updateTask(id, { status: 'Pending' });
  };

  const stats = {
    total: tasks.length,
    raised: tasks.filter((t) => t.status === 'Raised').length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    closed: tasks.filter((t) => t.status === 'Closed').length
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        reopenTask,
        stats
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
