import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchageForm from '../PurchageOrder/PurchageOrderAddEdit';

const Navbar = () => {

    const [ProfileImg, setProfileImg] = useState('');

    useEffect(() => {
        const ProfileImgUrl = localStorage.getItem("profilePic");
        if (ProfileImgUrl) {
            setProfileImg(ProfileImgUrl);
        }
    }, []);



    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: '#F8F5F5', height: '62px' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="./Assets/Logo/Logo.png" alt="logo" style={{ height: '42px', marginLeft: '15px' }} />
                    </a>
                    {ProfileImg && (
                        <img
                            src={ProfileImg}
                            alt="profile"
                            style={{
                                height: '42px',
                                width: '42px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginLeft: 'auto',
                            }}
                        />
                    )}

                    <button className="btn btn-outline-danger ml-auto mr-3" style={{ marginLeft: '35px', height: '42px', borderRadius: '5px' }}>Logout</button>
                </div>

            </nav>
            <PurchageForm /></>


    );
}

export default Navbar;
