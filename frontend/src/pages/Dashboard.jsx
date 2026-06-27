import { useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";

import {getDashboardStats} from "../services/dashboardApi";

import {getInventoryAnalysis} from "../services/analyticsApi";

import {categoryChartUrl} from "../services/analyticsApi";

import "../styles/dashboard.css";

function Dashboard() {

  const [stats,setStats] = useState({

    total_products: 0,
    total_stock: 0,
    total_categories: 0,
    low_stock: 0
  });

  const [analytics,setAnalytics] = useState({ 
    average_stock: 0,   
    average_price: 0,    
    highest_stock: 0,  
    lowest_stock: 0 
  });

  useEffect(() => {loadStats(); loadAnalytics();}, []);

  const loadStats = async () => {

    try {
      const response = await getDashboardStats();

      setStats(
        response.data
      );

    }

    catch (error) {
      console.log(error);
    }
  };

  const loadAnalytics = async () => {
  try {
    const response =
    await getInventoryAnalysis();
    setAnalytics(
      response.data
    );
  }

  catch(error) {

    console.log(error);

  }

 };

  return (

    <MainLayout>

      <h1
        className="dashboard-title"
      >
        Dashboard
      </h1>

      <div
        className="stats-grid"
      >

        <div
          className="stat-card"
        >
          <h3>
            Total Products
          </h3>

          <div
            className="stat-number"
          >
            {
              stats.total_products
            }
          </div>
        </div>

        <div
          className="stat-card"
        >
          <h3>
            Total Stock
          </h3>

          <div
            className="stat-number"
          >
            {
              stats.total_stock
            }
          </div>
        </div>

        <div
          className="stat-card"
        >
          <h3>
            Categories
          </h3>

          <div
            className="stat-number"
          >
            {
              stats.total_categories
            }
          </div>
        </div>

        <div className={
          stats.low_stock > 0 ? "stat-card low-stock-card": 
          "stat-card"}>
            <h3>
              Low Stock
            </h3>
            <div className="stat-number">
              {stats.low_stock}
            </div>
          </div>
          

      </div>
      <h2 style={{ 
        marginTop:"50px", 
        marginBottom:"30px",
        fontSize:"30px"
       }}>
        Inventory Analytics
      </h2>

<div
  className="stats-grid"
>

  <div className="stat-card">

    <h3>
      Average Stock
    </h3>

    <div className="stat-number">
      {analytics.average_stock}
    </div>

  </div>

  <div className="stat-card">

    <h3>
      Average Price
    </h3>

    <div className="stat-number">
      ₹ {analytics.average_price}
    </div>

  </div>

  <div className="stat-card">

    <h3>
      Highest Stock
    </h3>

    <div className="stat-number">
      {analytics.highest_stock}
    </div>

  </div>

  <div className="stat-card">

    <h3>
      Lowest Stock
    </h3>

    <div className="stat-number">
      {analytics.lowest_stock}
    </div>

  </div>

  

</div>
<h2
  style={{
    marginTop:"50px"
  }}
>
  Category Analytics
</h2>

<div
  className="chart-card"
>

  <img
    src={categoryChartUrl}
    alt="Category Chart"
    className="dashboard-chart"
  />

</div>
    </MainLayout>

  );
}

export default Dashboard;