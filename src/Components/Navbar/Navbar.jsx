// import React, { useState, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const [profileImg, setProfileImg] = useState('');
//     const [name, setName] = useState('');
//     const [showCard, setShowCard] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const profileImgUrl = localStorage.getItem("profilePic");
//         const Name = localStorage.getItem("Name");

//         if (profileImgUrl) {
//             setProfileImg(profileImgUrl);
//         }

//         if (Name) {
//             setName(Name);
//         }

//     }, []);


//     // ---------------------------------   Hovering Notification ---------------------------------------
//     const toggleCard = () => {
//         setShowCard(!showCard);
//     };


//     const handlelogout = () => {
//         navigate("/");
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: '#F8F5F5', height: '62px', borderBottom: '1px solid #e0e0e0' }}>
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">
//                         <img src="./Assets/Logo/Logo.png" alt="logo" style={{ height: '42px', marginLeft: '15px' }} />
//                     </a>
//                     <div className="d-flex align-items-center">
//                         {profileImg && (
//                             <div style={{ position: 'relative' }}>
//                                 <OverlayTrigger
//                                     placement="bottom"
//                                     overlay={<Tooltip id="profile-tooltip">Hi, {name}</Tooltip>}
//                                 >
//                                     <img
//                                         src={profileImg}
//                                         alt="profile"
//                                         style={{
//                                             height: '42px',
//                                             width: '42px',
//                                             borderRadius: '50%',
//                                             objectFit: 'cover',
//                                             cursor: 'pointer',
//                                             marginRight: '10px',
//                                             border: '2px solid #ccc',
//                                         }}
//                                         onClick={toggleCard}
//                                     />
//                                 </OverlayTrigger>
//                                 {showCard && (
//                                     <div className="card"
//                                         style={{ position: 'absolute', backgroundColor: '#E4E5E3', top: '50px', right: '10px', width: '150px', padding: '10px', borderRadius: '10px' }}
//                                     >
//                                         <img
//                                             src={profileImg}
//                                             alt="profile"
//                                             style={{
//                                                 height: '62px',
//                                                 width: '62px',
//                                                 borderRadius: '50%',
//                                                 objectFit: 'cover',
//                                                 border: '2px solid #ccc',
//                                                 margin: '10px auto',
//                                                 display: 'block',
//                                             }}
//                                         />
//                                         <div style={{ textAlign: 'center', marginBottom: '10px' }}>Hi, {name}</div>
//                                         <button className="btn btn-outline-danger btn-sm" style={{ borderRadius: '5px', margin: '0 auto', display: 'block' }}>
//                                             <FontAwesomeIcon icon={faSignOutAlt} onClick={handlelogout} style={{ marginRight: '5px' }} /> Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </nav>

//         </>
//     );
// };

// export default Navbar;

import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../ContextAPI'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { setToken } = useContext(AppContext)
    const [profileImg, setProfileImg] = useState('');
    const [name, setName] = useState('');
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const profileImgUrl = localStorage.getItem("profilePic");
        const Name = localStorage.getItem("Name");

        if (profileImgUrl) {
            setProfileImg(profileImgUrl);
        }

        if (Name) {
            setName(Name);
        }

    }, []);



    const toggleCard = () => {
        setShowCard(!showCard);
    };

    const handleLogout = () => {
        // Clear local storage or perform logout action
        localStorage.removeItem("profilePic");
        localStorage.removeItem("Name");
        localStorage.removeItem('Token');
        setToken('');
        navigate("/");
    };

    const handleicon = () => {
        navigate('/dashboard');
    };
    return (
        <nav className="navbar navbar-expand-md navbar-light fixed-top" style={{ backgroundColor: '#F8F5F5', height: '62px', borderBottom: '1px solid #e0e0e0' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="./Assets/Logo/logo.png" onClick={handleicon} alt="logo" style={{ height: '42px', marginLeft: '15px' }} />

                </a>
                <div className="d-flex align-items-center">
                    {profileImg && (
                        <div style={{ position: 'relative' }}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="profile-tooltip">Hi, {name}</Tooltip>}
                            >
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
                            </OverlayTrigger>
                            {showCard && (
                                <div className="card"
                                    style={{ position: 'absolute', backgroundColor: '#E4E5E3', top: '50px', right: '10px', width: '150px', padding: '10px', borderRadius: '10px' }}
                                >
                                    <img
                                        src={profileImg}
                                        alt="profile"
                                        style={{
                                            height: '62px',
                                            width: '62px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid #ccc',
                                            margin: '10px auto',
                                            display: 'block',
                                        }}
                                    />
                                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>Hi, {name}</div>
                                    <button className="btn btn-outline-danger btn-sm" style={{ borderRadius: '5px', margin: '0 auto', display: 'block' }} onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

