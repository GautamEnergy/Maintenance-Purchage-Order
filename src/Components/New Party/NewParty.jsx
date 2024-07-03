// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const NewParty = () => {
//     const [PartyName, setPartyName] = useState('');
//     const [GSTNumber, setGSTNumber] = useState('');
//     const [PANNumber, setPANNumber] = useState('');
//     const [MobileNumber, setMobileNumber] = useState('');
//     const [Email, setEmail] = useState('');
//     const [Address, setAddress] = useState('');
//     const [Country, setCountry] = useState('');
//     const [State, setState] = useState('');
//     const [Status, setStatus] = useState('Active');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const [personID, setPersonID] = useState('');

//     useEffect(() => {
//         const personID = localStorage.getItem("CurrentUser");
//         if (personID) {
//             setPersonID(personID);
//         }
//     }, []);

//     const notifySuccess = () => toast.success("New Party Added Successfully!", { autoClose: 5000 });
//     const notifyError = (message) => toast.error(message, { autoClose: 5000 });

//     const handleGSTChange = (e) => {
//         const gstValue = e.target.value.toUpperCase();
//         setGSTNumber(gstValue);
//         if (validateGST(gstValue)) {
//             extractPANFromGST(gstValue);
//             setError('');
//         } else {
//             setPANNumber('');
//             setError('Invalid GST number');
//         }
//     };

//     const extractPANFromGST = (gstNumber) => {
//         const panNumber = gstNumber.substring(2, 12);
//         setPANNumber(panNumber);
//     };

//     const validateGST = (gstNumber) => {
//         const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
//         return gstPattern.test(gstNumber);
//     };

//     const addNewParty = async (partyData) => {
//         try {
//             const response = await fetch('http://srv515471.hstgr.cloud:8080/Maintenance/AddParty', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(partyData),
//             });
//             if (response.ok) {
//                 notifySuccess();
//                 clearForm();
//             } else {
//                 const errorData = await response.json();
//                 if (errorData.message && errorData.message.includes('Party name already exists')) {
//                     setError('Party name must be unique. This party name already exists.');
//                 } else {
//                     notifyError(errorData.message || 'Failed to add new party');
//                 }
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//             notifyError('Failed to add new party: ' + error.message);
//         }
//     };

//     const clearForm = () => {
//         setPartyName('');
//         setGSTNumber('');
//         setPANNumber('');
//         setMobileNumber('');
//         setEmail('');
//         setAddress('');
//         setCountry('');
//         setState('');
//         setStatus('Active');
//         setError('');
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (PartyName && GSTNumber && PANNumber && MobileNumber && Email && Address && Country && State && Status) {
//             const partyData = {
//                 PartyName,
//                 GSTNumber,
//                 PANNumber,
//                 MobileNumber,
//                 Email,
//                 Address,
//                 Country,
//                 State,
//                 Status,
//                 CurrentUser: personID,
//             };
//             addNewParty(partyData);
//         } else {
//             setError('Please fill in all required fields.');
//         }
//     };

//     const handleback = () => {
//         navigate('/dashboard');
//     };

//     return (
//         <div className="mainCard">
//             <div className="fullPage">
//                 <div className="form-detail">
//                     <h2>Add New Party</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="subCard1">
//                             <div className="row">
//                                 <div className="form-group">
//                                     <label>Party Name</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="partyName"
//                                         value={PartyName}
//                                         onChange={(e) => setPartyName(e.target.value)}
//                                         placeholder='Enter the New Party'
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>GST No.</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="gstNo"
//                                         value={GSTNumber}
//                                         onChange={handleGSTChange}
//                                         placeholder='Enter the GST Number'
//                                         required
//                                     />
//                                     {error && <small className="text-danger">{error}</small>}
//                                 </div>
//                                 <div className="form-group">
//                                     <label>PAN No.</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="panNo"
//                                         value={PANNumber}
//                                         placeholder='Enter the PAN Number'
//                                         readOnly
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="form-group">
//                                     <label>Mobile No.</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="mobileNo"
//                                         value={MobileNumber}
//                                         placeholder='Enter the Mobile Number'
//                                         onChange={(e) => {
//                                             const onlyNums = e.target.value.replace(/[^0-9]/g, '');
//                                             if (onlyNums.length <= 12) {
//                                                 setMobileNumber(onlyNums);
//                                             }
//                                         }}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Email</label>
//                                     <input
//                                         type="email"
//                                         className="input-text"
//                                         name="email"
//                                         placeholder='Enter the Email '
//                                         value={Email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Address</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="address"
//                                         value={Address}
//                                         placeholder='Enter the Address'
//                                         onChange={(e) => setAddress(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="form-group">
//                                     <label>Country</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="country"
//                                         value={Country}
//                                         placeholder='Enter the Country'
//                                         onChange={(e) => setCountry(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group" style={{ marginBottom: '92px' }}>
//                                     <label>State</label>
//                                     <input
//                                         type="text"
//                                         className="input-text"
//                                         name="state"
//                                         placeholder='Enter the State'
//                                         value={State}
//                                         onChange={(e) => setState(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#a20000', margin: '24px' }}>Back</button>
//                             <button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#A4E292' }}>Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer position="top-center" autoClose={2000} />
//         </div>
//     );
// };

// export default NewParty;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const NewParty = () => {
    const [PartyName, setPartyName] = useState('');
    const [GSTNumber, setGSTNumber] = useState('');
    const [PANNumber, setPANNumber] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Country, setCountry] = useState('');
    const [State, setState] = useState('');
    const [Status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [personID, setPersonID] = useState('');

    useEffect(() => {
        const personID = localStorage.getItem("CurrentUser");
        if (personID) {
            setPersonID(personID);
        }
    }, []);

    const notifySuccess = () => toast.success("New Party Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const handleGSTChange = (e) => {
        const gstValue = e.target.value.toUpperCase();
        setGSTNumber(gstValue);

        if (validateGST(gstValue)) {
            extractPANFromGST(gstValue);
            setError('');
        } else {
            setPANNumber('');
            // setError('Invalid GST number');
        }
    };

    const extractPANFromGST = (gstNumber) => {
        const panNumber = gstNumber.substring(2, 12);
        setPANNumber(panNumber);
    };

    const validateGST = (gstNumber) => {
        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstPattern.test(gstNumber);
    };

    const addNewParty = async (partyData) => {
        try {
            const response = await fetch('http://srv515471.hstgr.cloud:9090/Maintenance/AddParty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partyData),
            });
            console.log('fdsfjksdhfjshfjksh')
            console.log(response)

            if (response.status == 409) {
                notifyError(error.message || 'This party is already exist.')
            } else if (response.ok) {
                notifySuccess('Party Added Successfully!');
                clearForm();

            }

            // else {
            //     const errorData = await response.json();
            //     if (errorData.message && errorData.message.includes('Party name already exists')) {
            //         setError('Party name must be unique. This party name already exists.');
            //     } else {
            //         notifyError(errorData.message || 'Failed to add new party');
            //     }
            // }
        } catch (error) {
            console.error('Fetch error:', error);
            notifyError('Failed to add new party: ' + error.message);
        }
    };

    const clearForm = () => {
        setPartyName('');
        setGSTNumber('');
        setPANNumber('');
        setMobileNumber('');
        setEmail('');
        setAddress('');
        setCountry('');
        setState('');
        setStatus('Active');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (PartyName && GSTNumber && PANNumber && MobileNumber && Email && Address && Country && State && Status) {
            const partyData = {
                PartyName,
                GSTNumber,
                PANNumber,
                MobileNumber,
                Email,
                Address,
                Country,
                State,
                Status,
                CurrentUser: personID,
            };
            addNewParty(partyData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleback = () => {
        navigate('/dashboard')
    };

    return (
        <div className="mainCard">
            <div className="fullPage">
                <div className="form-detail">
                    <h2>Add New Party</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="subCard1">
                            <div className="row">
                                <div className="form-group">
                                    <label>Party Name</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="partyName"
                                        value={PartyName}
                                        onChange={(e) => setPartyName(e.target.value)}
                                        placeholder='Enter the New Party'
                                        required
                                    />
                                    {error && error.includes('Party name must be unique') && <small className="text-danger">{error}</small>}
                                </div>
                                <div className="form-group">
                                    <label>GST No.</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="gstNo"
                                        value={GSTNumber}
                                        onChange={handleGSTChange}
                                        placeholder='Enter the GST Number'
                                        required
                                    />
                                    {error && !error.includes('Party name must be unique') && <small className="text-danger">{error}</small>}
                                </div>
                                <div className="form-group">
                                    <label>PAN No.</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="panNo"
                                        value={PANNumber}
                                        onChange={(e) => setPANNumber(e.target.value)}
                                        placeholder='Enter the PAN Number'
                                    // readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label>Mobile No.</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="mobileNo"
                                        value={MobileNumber}
                                        placeholder='Enter the Mobile Number'
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                            if (onlyNums.length <= 12) {
                                                setMobileNumber(onlyNums);
                                            }
                                        }}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="input-text"
                                        name="email"
                                        placeholder='Enter the Email '
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="address"
                                        value={Address}
                                        placeholder='Enter the Address'
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="country"
                                        value={Country}
                                        placeholder='Enter the Country'
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '92px' }}>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        name="state"
                                        placeholder='Enter the State'
                                        value={State}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* <button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#a20000', margin: '24px' }}>Back</button>
                            <button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#A4E292' }}>Submit</button>
                             */}
                            <div style={{ marginLeft: '510px' }}>
                                <button type="back" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</button>
                                <button type="submit" className="register" onClick={handleSubmit} style={{ width: '83px', height: '43px', background: '#0C53F5' }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default NewParty;



