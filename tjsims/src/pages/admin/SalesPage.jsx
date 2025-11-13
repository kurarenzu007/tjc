import React, { useState, useEffect } from 'react';
import { BsCartPlus, BsTrash, BsSearch } from 'react-icons/bs';
import Navbar from '../../components/admin/Navbar';
import '../../styles/SalesPage.css';
import { salesAPI, inventoryAPI } from '../../utils/api';
import { serialNumberAPI } from '../../utils/serialNumberApi';
import { generateSaleReceipt } from '../../utils/pdfGenerator';

const SalesPage = () => {
  // ... (Keep all existing state and functions from line 9 to 326)

  return (
    <div className="admin-layout"> {/* CHANGED */}
      <Navbar />
      <main className="admin-main"> {/* CHANGED */}
        <div className="admin-container"> {/* CHANGED */}
          <div className="page-header"> {/* CHANGED */}
            <h1 className="page-title">Sales Transaction</h1> {/* CHANGED */}
            <p className="page-subtitle">Process customer purchases and manage inventory</p> {/* CHANGED */}
          </div>

          {error && (
            <div className="error-state"> {/* CHANGED */}
              <p>{error}</p>
              <button onClick={fetchProductsAndInventory} className="btn btn-danger"> {/* CHANGED */}
                Retry
              </button>
            </div>
          )}

          <div className="sales-content">
            {/* Products Section */}
            <div className="products-section">
              <div className="products-header">
                <h2>Product List</h2>
                <div className="search-box">
                  <BsSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="products-table-container">
                {loading ? (
                  <div className="loading-state">
                    <p>Loading products...</p>
                  </div>
                ) : (
                  <table className="products-table"> {/* Use a light-weight table style */}
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Quantity</th>
                        <th>Serial</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* ... (Keep table body content) ... */}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Right Panel - Shopping Cart & Forms */}
            <div className="right-panel">
              <div className="sale-section">
                {/* ... (Keep sale section content) ... */}
              </div>

              {/* Customer Information Section */}
              <div className="customer-section">
                {/* ... (Keep customer section content) ... */}
              </div>

              {/* Payment and Shipping Section */}
              <div className="payment-shipping-section">
                {/* ... (Keep payment section content) ... */}
              </div>
              
              {/* Action Buttons - Right Side */}
              <div className="action-buttons-right">
                <button
                  onClick={confirmSale}
                  disabled={submitting || saleItems.length === 0 || !paymentOption || Number.isNaN(parseFloat(tenderedAmount)) || parseFloat(tenderedAmount) < getSaleTotal()}
                  className="btn btn-primary" /* CHANGED */
                >
                  {submitting ? 'Processing...' : 'Confirm Sale'}
                </button>
                <button onClick={clearSale} className="btn btn-secondary"> {/* CHANGED */}
                  Clear Sale
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ... (Keep Serial Number Modal) ... */}
      </main>
    </div>
  );
};

export default SalesPage;