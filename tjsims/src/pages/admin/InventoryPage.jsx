import React, { useState, useEffect } from 'react';
import Navbar from '../../components/admin/Navbar';
import { BsSearch, BsPencil } from 'react-icons/bs';
import '../../styles/InventoryPage.css';
import { inventoryAPI } from '../../utils/api'; 
import { serialNumberAPI } from '../../utils/serialNumberApi';

const InventoryPage = () => {
  // ... (Keep all existing state and functions from line 9 to 516)

  return (
    
    <div className="admin-layout"> {/* CHANGED */}
     <Navbar />
      <main className="admin-main"> {/* CHANGED */}
        <div className="admin-container"> {/* CHANGED */}
     
          {/* Header Section */}
          <div className="page-header"> {/* CHANGED */}
            <h1 className="page-title">Inventory Management</h1> {/* CHANGED */}
            <p className="page-subtitle">Monitor and adjust stock levels for all products</p> {/* CHANGED */}
          </div>

          {/* Controls Section */}
          <div className="card"> {/* CHANGED */}
            <div className="inventory-controls">
              <div className="search-filter-section">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn" type="button">
                    <BsSearch />
                  </button>
                </div>

                <div className="filter-section">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-dropdown" // CHANGED
                  >
                    <option value="All">All Categories</option>
                    {Array.from(new Set(products.map(p => p.category))).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="filter-dropdown" // CHANGED
                  >
                    <option value="All">All Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low on Stock">Low on Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="action-buttons-section">
                  <button 
                    onClick={handleOpenReturnToSupplier}
                    className="btn btn-danger" // CHANGED
                  >
                    Return to Supplier
                  </button>
                  <button 
                    onClick={handleOpenBulkStockIn}
                    className="btn btn-warning" // CHANGED
                  >
                    + Stock In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-stats"> {/* CHANGED */}
            {/* ... (Keep all stat-card divs) ... */}
          </div>

          {/* Products Table */}
          <div className="table-section"> {/* CHANGED */}
            {error && (
              <div className="error-state"> {/* CHANGED */}
                <strong>Error:</strong> {error}
                <button onClick={loadProducts} className="btn btn-danger">Retry</button> {/* CHANGED */}
              </div>
            )}

            {loading ? (
              <div className="loading-state">Loading products...</div> /* CHANGED */
            ) : (
              <div className="table-container">
                <table className="table"> {/* CHANGED */}
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Stock Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(product => (
                    <tr key={product.id}>
                      {/* ... (Keep all table content) ... */}
                      <td>
                        <span className={`status-badge ${product.stock > product.reorderPoint ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                          {product.stock > product.reorderPoint ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="edit-btn"
                            title="Edit Reorder Level"
                          >
                            <BsPencil />
                          </button>
                          <button
                            onClick={() => handleOpenStockInModal(product)}
                            className="stock-in-btn"
                            title="Record Stock In"
                          >
                            Stock In
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

            {/* Pagination and Results Info */}
            <div className="table-footer">
              {/* ... (Keep table footer content) ... */}
            </div>
          </div>
        </div>
      </main>

      {/* ... (Keep all Modals, their class names are consistent) ... */}
    </div>
  );
};

export default InventoryPage;