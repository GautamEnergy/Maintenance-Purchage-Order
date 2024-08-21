
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
import MachineList from '../Components/MachineList/MachineList';

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
            <div style={{ marginBottom: '82%' }}>

           { designation === "Maintenance Engineer" ? <MaintenaceList/>:<div className="container py-1" style={{ width: "auto", marginTop: '-2%' }}>

                <div style={{ width: "auto" }}>
                    <AvailableStock />
                </div>


                <div style={{ width: "auto", marginTop: '-8%' }}>
                    <MaintenanceStock />
                </div>

            </div>
}

                {/* Purchase Order List in Dashboard */}
                <div className="container" style={{ width: "auto", display: "flex", marginTop: "-8%", }}>
                    <div style={{ width: "auto" }}>
                        {designation === "Maintenance Engineer" ? "" : (designation === "Super Admin" ? <PurchaseOrderList /> : <SparePartInListing />)}
                    </div>

                </div>



                {designation === "Super Admin" || designation === "Maintenance Head" ? <div className="container " style={{ marginTop: "-11%", }}>


                    <div style={{ width: "auto" }}>
                        <SparePartInListing />
                    </div>



                    <div style={{ width: "auto", marginTop: '-4%' }}>
                        <MaintenaceList />


                    </div>

                </div> : ""}


            </div>




        </>

    );
}
export default Dashboard


