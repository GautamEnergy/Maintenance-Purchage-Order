
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../Assets/Images/LOGO.png"
import './Dashboard.css'
import img2 from "../Assets/Images/order-now.png"
import img5 from "../Assets/Images/user.png";
import img4 from "../Assets/Images/automation.png";
import img3 from "../Assets/Images/engineering.png"
import AvailableStock from '../Components/PurchageOrder/AvailableStock';
import PurchaseOrderList from '../Components/PurchageOrder/PurchaseOrderList';
import "../Components/Table/table.css"
import StockLess from '../Components/PurchageOrder/StockLess';
import SparePartInListing from '../Components/SparePartIn/SparePartInListing';
import MaintenanceStock from '../MachineMaintenance/MaintenanceStock';
import MaintenaceList from '../MachineMaintenance/MaintenanceList';

const Dashboard = () => {
    const [designation, setDesignation] = useState('');

    useEffect(() => {

        const Designation = localStorage.getItem("Designation");

        if (Designation) {
            setDesignation(Designation);
        }
    }, []);

    return (
        <>
            <div style={{ marginBottom: '82%', marginLeft: '125px' }}>
                <div className="container py-1" style={{ display: "flex" }}>
                    <div style={{ width: "45%" }}>
                        <AvailableStock />
                    </div>

                    <div style={{ width: "45%" }}>
                        <MaintenanceStock />
                    </div>

                </div>

                <div className="container" style={{ display: "flex", marginTop: "-8%", }}>
                    <div style={{ width: "90%", marginLeft: '-6px' }}>
                        {designation === "Maintenance Head" ? "" : (designation === "Super Admin" ? <PurchaseOrderList /> : <SparePartInListing />)}
                    </div>

                </div>
                {designation === "Super Admin" || designation === "Maintenance Head" ? <div className="container " style={{ display: "flex", marginTop: "-110px", marginLeft: '-30px' }}>
                    <div style={{ width: "50%", marginRight: '-34px' }}>
                        <SparePartInListing />


                    </div>
                    <div style={{ width: "50%", marginTop: '29px', marginLeft: '-20px' }}>
                        <MaintenaceList />


                    </div>

                </div> : ""}


            </div>




        </>

    );
}
export default Dashboard


