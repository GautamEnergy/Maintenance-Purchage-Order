import React, { useState } from 'react';
import './Navbar.css';
import PurchageForm from '../PurchageOrder/PurchageOrderAddEdit';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <div className="menu">
                <div className="logo">
                    <img className='logo-navbar' src="./Assets/Logo/logo.png" alt="logo" />
                </div>
                <ul>
                    {/* <li><a href="#"><i className="fas fa-qrcode"></i>Dashboard</a></li> */}
                    <li><a href="#"><img src="./Assets/Icons/switch.png" alt="logout" /></a></li>
                </ul>
            </div>
            <PurchageForm />
        </nav>

    );

};

export default Sidebar;


