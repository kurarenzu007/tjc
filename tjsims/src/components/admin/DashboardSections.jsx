import React, { useState, useEffect } from 'react';
// REVISION: Import Link for the new button
import { Link } from 'react-router-dom'; 
import { dashboardAPI } from '../../utils/api'; // Kept this import
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper to format currency
const currency = (n) => `₱${Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Helper to format date for charts
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const DashboardSections = () => {
  const [lowStock, setLowStock] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [fastMoving, setFastMoving] = useState([]);
  const [slowMoving, setSlowMoving] = useState([]);
  const [stockTab, setStockTab] = useState('low'); 
  const [productTab, setProductTab] = useState('fast');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [lowStockRes, dailySalesRes, fastMovingRes, slowMovingRes] = await Promise.all([
          dashboardAPI.getLowStockItems(),
          dashboardAPI.getDailySales({ period: 'week' }),
          dashboardAPI.getFastMovingProducts(),
          dashboardAPI.getSlowMovingProducts()
        ]);

        if (lowStockRes.success) setLowStock(lowStockRes.data || []);
        if (dailySalesRes.success) setSalesData(dailySalesRes.data || []);
        if (fastMovingRes.success) setFastMoving(fastMovingRes.data || []);
        if (slowMovingRes.success) setSlowMoving(slowMovingRes.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard sections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const salesChartData = {
    labels: salesData.map(d => formatDate(d.date)),
    datasets: [
      {
        label: 'Total Sales (PHP)',
        data: salesData.map(d => d.total),
        backgroundColor: '#2478bd',
        borderRadius: 4,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Last 7 Days',
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="dashboard-card">Loading charts and tables...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Row 1: Sales Chart (Left) + Inventory Alerts (Right) */}
      <div className="dashboard-row">
        
        {/* Left Column: Sales Chart */}
        <div className="dashboard-col" style={{ flex: 2 }}>
          <div className="dashboard-card" style={{ height: '400px' }}>
            <Bar options={salesChartOptions} data={salesChartData} />
          </div>
        </div>

        {/* Right Column: Inventory Alerts */}
        <div className="dashboard-col" style={{ flex: 1 }}>
          <div className="dashboard-card">
            
            <div className="card-header-action">
              <h2>Inventory Alerts</h2>
              <Link to="/admin/inventory" className="btn btn-outline btn-small">
                Manage Inventory
              </Link>
            </div>

            <div className="card-tabs">
              <button
                className={`card-tab-btn ${stockTab === 'low' ? 'active' : ''}`}
                onClick={() => setStockTab('low')}
              >
                Low Stock ({lowStock.filter(item => item.remaining > 0).length})
              </button>
              <button
                className={`card-tab-btn ${stockTab === 'out' ? 'active' : ''}`}
                onClick={() => setStockTab('out')}
              >
                Out of Stock ({lowStock.filter(item => item.remaining === 0).length})
              </button>
            </div>

            {stockTab === 'low' ? (
              // Tab 1: Low Stock (stock > 0)
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.filter(item => item.remaining > 0).length > 0 ? (
                      lowStock.filter(item => item.remaining > 0).map(item => (
                        <tr key={item.product_id}>
                          <td>{item.name}</td>
                          <td style={{ color: '#fd7e14', fontWeight: 'bold' }}>{item.remaining}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="2" style={{ textAlign: 'center' }}>No items are low on stock.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              // Tab 2: Out of Stock (stock === 0)
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStock.filter(item => item.remaining === 0).length > 0 ? (
                      lowStock.filter(item => item.remaining === 0).map(item => (
                        <tr key={item.product_id}>
                          <td>{item.name}</td>
                          <td style={{ color: '#dc3545', fontWeight: 'bold' }}>0</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="2" style={{ textAlign: 'center' }}>All items are in stock.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Product Performance (Full Width) */}
      <div className="dashboard-row">
        <div className="dashboard-col" style={{ flex: 1 }}>
          <div className="dashboard-card">
            <h2>Product Performance (Last 30 Days)</h2>

            <div className="card-tabs">
              <button
                className={`card-tab-btn ${productTab === 'fast' ? 'active' : ''}`}
                onClick={() => setProductTab('fast')}
              >
                Top Sellers
              </button>
              <button
                className={`card-tab-btn ${productTab === 'slow' ? 'active' : ''}`}
                onClick={() => setProductTab('slow')}
              >
                Slow Movers
              </button>
            </div>

            {productTab === 'fast' ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Units Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fastMoving.length > 0 ? fastMoving.map(item => (
                      <tr key={item.product_id}>
                        <td>{item.name}</td>
                        <td style={{ fontWeight: 'bold' }}>{item.total_sold}</td>
                      </tr>
                    )) : <tr><td colSpan="2" style={{ textAlign: 'center' }}>No sales data yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Units Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slowMoving.length > 0 ? slowMoving.map(item => (
                      <tr key={item.product_id}>
                        <td>{item.name}</td>
                        <td style={{ fontWeight: 'bold' }}>{item.total_sold}</td>
                      </tr>
                    )) : <tr><td colSpan="2" style={{ textAlign: 'center' }}>No sales data for slow-moving items.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSections;