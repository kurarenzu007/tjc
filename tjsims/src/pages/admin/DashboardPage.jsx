import React from 'react';
import Navbar from '../../components/admin/Navbar';
import DashboardStats from '../../components/admin/DashboardStats';
import DashboardSections from '../../components/admin/DashboardSections';
// Global CSS is in Navbar.jsx

const DashboardPage = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-main">
        <div className="admin-container">
          <div className="page-header">
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">Welcome Back! Here's what's happening with your store today.</p>
          </div>
          <DashboardStats />
          <DashboardSections />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;