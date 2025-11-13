import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/admin/Navbar';
import { BsSearch, BsPlus, BsPencil } from 'react-icons/bs';
import '../../styles/ProductPage.css';
import { productAPI, authAPI } from '../../utils/api.js';

const ProductPage = () => {
  // ... (Keep all existing state and functions from line 8 to 253)
  // ... (handleInputChange, handleFileChange, requestImageChange, etc.)

  return (
    <div className="admin-layout"> {/* CHANGED */}
      <Navbar />
      <main className="admin-main"> {/* CHANGED */}
        <div className="admin-container"> {/* CHANGED */}

          {/* Header Section */}
          <div className="page-header"> {/* CHANGED */}
            <h1 className="page-title">Product Management</h1> {/* CHANGED */}
            <p className="page-subtitle">Manage your autoparts inventory and product details</p> {/* CHANGED */}
          </div>

          {/* Controls Section */}
          <div className="card"> {/* CHANGED */}
            <div className="product-controls">
              <div className="add-product-section">
                <button className="btn btn-warning" onClick={handleAddProduct}> {/* CHANGED */}
                  <BsPlus className="plus-icon" />
                  Add Product
                </button>
              </div>

              <div className="filter-section">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="All Brand">All Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="All Status">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn" type="button" onClick={loadProducts}>
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="table-section"> {/* CHANGED */}
            {error && (
              <div className="error-state" style={{ padding: '20px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '20px' }}> {/* CHANGED */}
                <strong>Error:</strong> {error}
                <button
                  onClick={loadProducts}
                  className="btn btn-danger" // CHANGED
                  style={{ marginLeft: '10px', padding: '5px 10px', height: 'auto' }}
                >
                  Retry
                </button>
              </div>
            )}

            {loading ? (
              <div className="loading-state"> {/* CHANGED */}
                <div>Loading products...</div>
              </div>
            ) : (
              <div className="table-container">
                <table className="table"> {/* CHANGED */}
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                          No products found. Add your first product!
                        </td>
                      </tr>
                    ) : (
                      currentProducts.map(product => (
                        <tr key={product.id}>
                          <td>{product.product_id}</td>
                          <td>
                            <div className="product-info">
                              <h4>{product.name}</h4>
                            </div>
                          </td>
                          <td>
                            <span className="category-badge">{product.category}</span>
                          </td>
                          <td>{product.brand}</td>
                          <td className="price-cell">
                            ₱{product.price?.toLocaleString()}
                          </td>
                          <td>
                            <span className={`status-badge ${product.status?.toLowerCase()}`}>
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="edit-btn"
                                title="Edit Product"
                              >
                                <BsPencil />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination and Results Info */}
            <div className="table-footer">
              <div className="results-info">
                Showing {totalFilteredProducts > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, totalFilteredProducts)} of {totalFilteredProducts} Products
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  {/* ... (keep pagination buttons) ... */}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isAddMode ? 'Add Product' : 'Edit Product'}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="modal-body"> {/* CHANGED */}
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    {/* ... (Keep all form inputs) ... */}
                  </div>
                </div>
                {/* ... (Keep all form groups) ... */}
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (isAddMode ? 'Save Product' : 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;