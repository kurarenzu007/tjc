import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../../utils/api';
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
  const [recentSales, setRecentSales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [fastMoving, setFastMoving] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [salesRes, lowStockRes, dailySalesRes, fastMovingRes] = await Promise.all([
          dashboardAPI.getRecentSales(),
          dashboardAPI.getLowStockItems(),
          dashboardAPI.getDailySales({ period: 'week' }),
          dashboardAPI.getFastMovingProducts()
        ]);

        if (salesRes.success) setRecentSales(salesRes.data || []);
        if (lowStockRes.success) setLowStock(lowStockRes.data || []);
        if (dailySalesRes.success) setSalesData(dailySalesRes.data || []);
        if (fastMovingRes.success) setFastMoving(fastMovingRes.data || []);
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
    <div className="dashboard-row">
      {/* Left Column: Chart + Recent Sales */}
      <div className="dashboard-col" style={{ flex: 2 }}>
        {/* Sales Chart */}
        <div className="dashboard-card" style={{ height: '400px' }}>
          <Bar options={salesChartOptions} data={salesChartData} />
        </div>

        {/* Recent Sales Table */}
        <div className="dashboard-card">
          <h2>Recent Sales</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.length > 0 ? recentSales.map(sale => (
                  <tr key={sale.id}>
                    <td>{sale.sale_number}</td>
                    <td>{sale.customer_name}</td>
                    <td className="price-cell">{currency(sale.total)}</td>
                    <td>{sale.products}</td>
                  </tr>
                )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No recent sales.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Lists */}
      <div className="dashboard-col" style={{ flex: 1 }}>
        {/* Low Stock Items */}
        <div className="dashboard-card">
          <h2>Low Stock Items</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.length > 0 ? lowStock.map(item => (
                  <tr key={item.product_id}>
                    <td>{item.name}</td>
                    <td style={{ color: '#dc3545', fontWeight: 'bold' }}>{item.remaining}</td>
                  </tr>
                )) : <tr><td colSpan="2" style={{ textAlign: 'center' }}>All items are in stock.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fast Moving Items */}
        <div className="dashboard-card">
          <h2>Fast Moving (Last 30 Days)</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
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
        </div>
      </div>
    </div>
  );
};

export default DashboardSections;