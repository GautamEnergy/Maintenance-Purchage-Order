// src/App.js
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import img1 from "../../Assets/Images/logogs.png";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // Optional for layout utility
import DataTableComponent from './DataTableComponent';
import img2 from "../../Assets/Images/back.png"
import { Link } from 'react-router-dom';
import StockChart from './StockChart';

const PurchaseOrderList = () => {


    return (
        <Container style={{ marginTop: "1%", width: "100%", marginBottom: "5%" }} className="fullPage py-5">
            <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Link to="/dashboard">
                    <Image src={img2} alt="" rounded style={{ width: '3%' }} />
                </Link>

                <Image src={img1} alt="" className="text-center" rounded style={{ width: '25%', marginLeft: "35%" }} />
                <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginTop: "12px", marginBottom: '12px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    Purchase Order List
                </h2>
                <div className="App">
                    <div className="card" style={{ width: "100%" }}>
                        <DataTableComponent />
                    </div>

                </div>
            </div>
        </Container>
    );
}

export default PurchaseOrderList;
