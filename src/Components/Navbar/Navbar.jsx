import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchageForm from '../PurchageOrder/PurchageOrderAddEdit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [profileImg, setProfileImg] = useState('');
    const [name, setName] = useState('');
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const profileImgUrl = localStorage.getItem("profilePic");
        const storedName = localStorage.getItem("Name");

        if (profileImgUrl) {
            setProfileImg(profileImgUrl);
        }

        if (storedName) {
            setName(storedName);
        }
    }, []);

    const cardRef = useRef(null);

    const toggleCard = () => {
        setShowCard(!showCard);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setShowCard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: '#F8F5F5', height: '62px', borderBottom: '1px solid #e0e0e0' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="./Assets/Logo/Logo.png" alt="logo" style={{ height: '42px', marginLeft: '15px' }} />
                    </a>
                    <div className="d-flex align-items-center">
                        {profileImg && (
                            <div ref={cardRef} style={{ position: 'relative' }}>
                                <img
                                    src={profileImg}
                                    alt="profile"
                                    style={{
                                        height: '42px',
                                        width: '42px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                        border: '2px solid #ccc',
                                    }}
                                    onClick={toggleCard}
                                />
                                {showCard && (
                                    <div className="card"
                                        style={{ position: 'absolute', backgroundColor: '#E4E5E3', top: '50px', right: '10px', width: '150px', padding: '10px', borderRadius: '10px' }}
                                    >
                                        <img
                                            src={profileImg}
                                            alt="profile"
                                            style={{
                                                height: '42px',
                                                width: '42px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '2px solid #ccc',
                                                margin: '10px auto',
                                                display: 'block',
                                            }}
                                        />
                                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>Hi, {name}</div>
                                        <button className="btn btn-outline-danger btn-sm" style={{ borderRadius: '5px', margin: '0 auto', display: 'block' }}>
                                            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <PurchageForm />
        </>
    );
};

export default Navbar;
