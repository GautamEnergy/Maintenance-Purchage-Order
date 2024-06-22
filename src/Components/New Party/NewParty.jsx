import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../New Party/new.css';

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
            setError('Invalid GST number');
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
            const response = await fetch('http://srv515471.hstgr.cloud:8080/Maintenance/AddParty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partyData),
            });
            if (response.ok) {
                notifySuccess();
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
            } else {
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new party');
            }
        } catch (error) {
            notifyError('Failed to add new party: ' + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (PartyName && GSTNumber && PANNumber && MobileNumber && Email && Address && Country && State && Status) {
            const partyData = {
                PartyName,
                GSTNumber,
                PANNumber,
                Address,
                Country,
                State,
                Email,
                MobileNumber,
                Status,

            };
            console.log('Form data submitted:', partyData);
            addNewParty(partyData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleClose = () => {
        console.log('Close button clicked');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="first-mainCard mt-5">
                <div className="header">
                    <h4 className="text-center">
                        <b>Add New Party</b></h4>  <FaTimes className="close-icon" onClick={handleClose} />
                </div>
                <div className="form-group">
                    <label>Party Name</label>
                    <input type="text" className="form-text" name="partyName"
                        value={PartyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label>GST No.</label>
                    <input
                        type="text"
                        className="form-text"
                        name="gstNo"
                        value={GSTNumber}
                        onChange={handleGSTChange}
                        required
                    />
                    {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="form-group">
                    <label>PAN No.</label>
                    <input type="text" className="form-text" name="panNo" value={PANNumber} readOnly />
                </div>
                <div className="form-group">
                    <label>Mobile No.</label>
                    <input
                        type="text"
                        className="form-text"
                        name="mobileNo"
                        value={MobileNumber}
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
                    <label>Email </label>
                    <input
                        type="email"
                        className="form-text"
                        name="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-text"
                        name="address"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        className="form-text"
                        name="country"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        className="form-text"
                        name="state"
                        value={State}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default NewParty;
