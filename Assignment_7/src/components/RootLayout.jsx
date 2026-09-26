import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const RootLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Assignment 7: Authentication System with Protected Dashboard &bull; React Router</p>
      </footer>
    </div>
  );
};
