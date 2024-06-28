import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashbord">
      <div className="dashbordrow">
        <div className="dashbord-card">
          <div className="wrap">
            <Link to="/purchage" className="card-link">
              <span className="card">Purchase Order</span>
            </Link>
          </div>
        </div>
        <div className="dashbord-card">
          <div className="wrap">
            <Link to="/spare" className="card-link">
              <span className="card">Add New Spare Part</span>
            </Link>
          </div>
        </div>
        <div className="dashbord-card">
          <div className="wrap">
            <Link to="/machine" className="card-link">
              <span className="card">Add New Machine</span>
            </Link>
          </div>
        </div>
        <div className="dashbord-card">
          <div className="wrap">
            <Link to="/newParty" className="card-link">
              <span className="card">Add New Party</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
