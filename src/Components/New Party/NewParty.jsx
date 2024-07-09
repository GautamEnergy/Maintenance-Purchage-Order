import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const NewParty = () => {
    const [PartyName, setPartyName] = useState('');
    const [GSTNumber, setGSTNumber] = useState('');
    const [PANNumber, setPANNumber] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Country, setCountry] = useState('');
    const [State, setState] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [CountryCode, setCountryCode] = useState('+91');
    const [Status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [maxLength, setMaxLength] = useState(10);
    const [personID, setPersonID] = useState('');
    const [hideFields, setHideFields] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    useEffect(() => {
        const personID = localStorage.getItem("CurrentUser");
        if (personID) {
            setPersonID(personID);
        }
    }, []);

    const countryOptions = [
        { value: 'India', label: 'India' },
        { value: 'China', label: 'China' },
    ];

    const notifySuccess = () => toast.success("New Party Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const handleGSTChange = (e) => {
        const gstValue = e.target.value.toUpperCase();
        setGSTNumber(gstValue);
        if (validateGST(gstValue)) {
            extractPANFromGST(gstValue);
            setError('');
        } else {
            setError('Invalid GST number format');
            setPANNumber('');
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

            if (response.status === 409) {
                notifyError(error.message || 'This party already exists.');
            } else if (response.ok) {
                notifySuccess();
                clearForm();
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new party');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            notifyError('Failed to add new party: ' + error.message);
        }
    };

    const clearForm = () => {
        setCountry('');
        setPartyName('');
        setGSTNumber('');
        setPANNumber('');
        setMobileNumber('');
        setEmail('');
        setAddress('');
        setState('');
        setPinCode('');
        setCountryCode('');
        setStatus('');
        setError('');
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            PartyName, GSTNumber, PANNumber, MobileNumber, Email,
            Address, Country, State, CountryCode, PinCode, Status
        });

        if (PartyName && GSTNumber && PANNumber && MobileNumber && Email && Address && Country && State && CountryCode && PinCode && Status) {
            const partyData = {
                PartyName,
                GSTNumber: Country === 'China' ? '' : GSTNumber,
                PANNumber: Country === 'China' ? '' : PANNumber,
                MobileNumber,
                Email,
                Address,
                Country,
                State: Country === 'China' ? '' : State,
                CountryCode,
                PinCode,
                Status,
                CurrentUser: personID,
            };


            addNewParty(partyData);

        } else if (PartyName && MobileNumber && Email && Address && Country && CountryCode && PinCode && Status) {
            const partyData = {
                PartyName,
                MobileNumber,
                Email,
                Address,
                Country,
                CountryCode,
                PinCode,
                Status,
                CurrentUser: personID,
            };
            addNewParty(partyData);
        }
        else {
            console.log('Else')
            notifyError('Please fill in all required fields.');
        }



    };

    const handleback = () => {
        navigate('/dashboard');
    };

    const handleMobileNumberChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= maxLength) {
            setMobileNumber(onlyNums);
        }
    };

    const handleCountryCodeChange = (e) => {
        const selectedCode = e.target.value;
        setCountryCode(selectedCode);

        if (selectedCode === '+91') {
            setMaxLength(10);
        } else if (selectedCode === '+86') {
            setMaxLength(11);
        }
    };

    const handleCountry = (selectedOption) => {
        console.log('Checked it');

        const selectedCountry = selectedOption.value;
        setCountry(selectedCountry);

        // console.log(selectedCountry)

        setHideFields(selectedCountry === 'China');
        if (selectedOption.value == 'China') {
            setState('');
            setPANNumber('');
            setGSTNumber('');
        }
    };

    const countryCodes = [
        { code: '+91' },
        { code: '+86' },
    ];

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Regex pattern for validating email
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        setIsEmailValid(emailPattern.test(emailValue));
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

                                <div className="system input-text" style={{ width: '410px' }}>
                                    <label className="file-label">Country</label>
                                    <Select
                                        onChange={handleCountry}
                                        options={countryOptions}
                                        placeholder="Select Country"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                height: 53,
                                                minHeight: 23,
                                                borderRadius: 33,
                                                backgroundColor: '#ccc',
                                                borderColor: '#6a6c6e',
                                                borderWidth: '2px',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    borderColor: '#6a6c6e',
                                                },
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: '#f0f0f0',
                                                color: 'black',
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                backgroundColor: '#f0f0f0',
                                            }),
                                        }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    {Country !== "China" ? <>
                                        <label>Pin Code</label>
                                        <input
                                            type="number"
                                            className="input-text"
                                            name="PinCode"
                                            placeholder={Country == "India" ? 'Enter the Pin Code' : 'Enter the Pin Code'}
                                            value={PinCode}
                                            // onChange={(e) => setPinCode(e.target.value)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d{0,6}$/.test(value)) {
                                                    setPinCode(value);
                                                }
                                            }}

                                            required
                                        />
                                    </> : ''}

                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <select
                                            id="countryCode"
                                            className="input-text"
                                            style={{ width: '70px', padding: '10px', fontSize: '14px', borderRadius: '23px', marginTop: '23px', background: '#9AAFB1', }}
                                            value={CountryCode}
                                            onChange={handleCountryCodeChange}
                                        >
                                            {countryCodes.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <label htmlFor="mobileNo">Mobile No.</label>
                                        <input
                                            type="text"
                                            id="mobileNo"
                                            className="input-text"
                                            style={{ padding: '10px', fontSize: '14px' }}
                                            name="mobileNo"
                                            value={MobileNumber}
                                            placeholder="Enter the Mobile Number"
                                            onChange={handleMobileNumberChange}
                                            maxLength={maxLength}
                                            required
                                        />
                                        {errorMessage && (
                                            <span style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</span>
                                        )}
                                    </div>
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
                                {!hideFields && (
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
                                )}
                            </div>
                            <div className="row">
                                {/* <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="input-text"
                                        name="email"
                                        placeholder='Enter the Email'
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        required
                                    />
                                </div> */}

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className={`input-text ${isEmailValid ? '' : 'is-invalid'}`}
                                        name="email"
                                        placeholder='Enter the Email'
                                        value={Email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                    {!isEmailValid && <span className="error-message" style={{ color: 'red' }}>Please enter a valid email address</span>}
                                </div>

                                <div className="form-group">
                                    <label>{!hideFields ? 'State' : 'Zip Code'}</label>
                                    <input
                                        type={!hideFields ? "text" : 'number'}
                                        className="input-text"
                                        name={!hideFields ? "state" : 'Zip Code'}
                                        placeholder={!hideFields ? 'Enter State' : 'Enter Zip Code'}
                                        value={!hideFields ? State : PinCode}
                                        // onChange={(e) => !hideFields ? setState(e.target.value) : setPinCode(e.target.value)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (!hideFields) {
                                                setState(value);
                                            } else {
                                                if (/^\d{0,6}$/.test(value)) {
                                                    setPinCode(value);
                                                }
                                            }
                                        }}
                                        required
                                    />
                                </div>



                                {!hideFields && (
                                    <div className="form-group">
                                        <label>PAN No.</label>
                                        <input
                                            type="text"
                                            className="input-text"
                                            name="panNo"
                                            value={PANNumber}
                                            onChange={(e) => setPANNumber(e.target.value)}
                                            placeholder='Enter the PAN Number'
                                        />
                                    </div>
                                )}
                            </div>

                            <div style={{ marginLeft: '510px' }}>
                                <button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</button>
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

