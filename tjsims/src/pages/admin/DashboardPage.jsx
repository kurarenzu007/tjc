import React from 'react';
import Navbar from '../../components/admin/Navbar';
import DashboardStats from '../../components/admin/DashboardStats';
import DashboardSections from '../../components/admin/DashboardSections';
// Global CSS is in Navbar.jsx, so we remove the import from here.

const DashboardPage = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-main">
        {/* Use the new consistent container class */}
        <div className="admin-container">
          {/* Use the new consistent page-header classes */}
          <div className="page-header">
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">Welcome Back! Here's what's happening with your store today.</p>
          </div>
          {/* These components will now pick up the styles from Admin.css */}
          <DashboardStats />
          <DashboardSections />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;