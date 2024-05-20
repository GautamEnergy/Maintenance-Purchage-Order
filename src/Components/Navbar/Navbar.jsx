import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchageForm from '../PurchageOrder/PurchageOrderAddEdit';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: '#ffffff', height: '62px' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="./Assets/Logo/Logo.png" alt="logo" style={{ height: '42px', marginLeft: '15px' }} />
                </a>
                <button className="btn btn-outline-danger ml-auto mr-3" style={{ height: '42px', borderRadius: '5px' }}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
