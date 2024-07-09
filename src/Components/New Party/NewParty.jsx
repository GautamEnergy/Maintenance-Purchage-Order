import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import img1 from "../../Assets/Images/LOGO.png"

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
    const inputStyle = {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px'
    };




    return (

        <Container style={{ marginTop: "12%" }} className="fullPage ">
            <div className="form-detail" style={{ backgroundColor: '#f8f8ff', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Image src={img1} alt="" className="text-center" rounded style={{ width: '15%', marginLeft: "43%" }} />
                <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    Add New Party
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="subCard1">
                        <Col md={4} className="form-group">
                            <Form.Label>Party Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="input-text"
                                name="partyName"
                                value={PartyName}
                                onChange={(e) => setPartyName(e.target.value)}
                                placeholder='Enter the New Party'
                                style={inputStyle}
                                required
                            />
                            {error && error.includes('Party name must be unique') && <small className="text-danger">{error}</small>}
                        </Col>
                        <Col md={4} className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Form.Control
                                    as="select"
                                    id="countryCode"
                                    className="input-text"
                                    style={{ width: '50px', padding: '8px', fontSize: '14px', marginTop: '23px', background: '#9AAFB1' }}
                                    value={CountryCode}
                                    onChange={handleCountryCodeChange}
                                >
                                    {countryCodes.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.code}
                                        </option>
                                    ))}
                                </Form.Control>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <Form.Label htmlFor="mobileNo">Mobile No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="mobileNo"
                                    className="input-text"
                                    // style={{ padding: '8px', fontSize: '14px' }}
                                    name="mobileNo"
                                    value={MobileNumber}
                                    placeholder="Enter the Mobile Number"
                                    onChange={handleMobileNumberChange}
                                    maxLength={10}
                                    style={inputStyle}

                                    required

                                />
                                {errorMessage && (
                                    <span style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</span>
                                )}
                            </div>
                        </Col>
                        <Col md={4} className="form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                className={`input-text ${isEmailValid ? '' : 'is-invalid'}`}
                                name="email"
                                placeholder='Enter the Email'
                                value={Email}
                                onChange={handleEmailChange}
                                style={inputStyle}
                                required
                            />
                            {!isEmailValid && <span className="error-message" style={{ color: 'red' }}>Please enter a valid email address</span>}
                        </Col>





                    </Row>
                    <Row>
                        <Col md={4} className="py-2 form-group">
                            <Form.Label>Country</Form.Label>
                            <Select
                                onChange={handleCountry}
                                options={countryOptions}
                                placeholder="Select Country"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        height: 40,
                                        minHeight: 23,
                                        // borderRadius: 33,
                                        backgroundColor: '#white',
                                        borderColor: '#black',
                                        borderWidth: '1px',
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
                        </Col>


                        <Col md={4} className="py-2 form-group">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                className="input-text"
                                name="address"
                                value={Address}
                                placeholder='Enter the Address'
                                onChange={(e) => setAddress(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </Col>
                        <Col md={4} className=" py-2 form-group">
                            <Form.Label>{!hideFields ? 'State' : 'Zip Code'}</Form.Label>
                            <Form.Control
                                type={!hideFields ? "text" : 'number'}
                                className="input-text"
                                name={!hideFields ? "state" : 'Zip Code'}
                                placeholder={!hideFields ? 'Enter State' : 'Enter Zip Code'}
                                value={!hideFields ? State : PinCode}
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
                                style={inputStyle}
                                required
                            />
                        </Col>


                    </Row>
                    <Row>
                        {Country !== "China" && (
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="input-text"
                                    name="PinCode"
                                    placeholder='Enter the Pin Code'
                                    value={PinCode}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,6}$/.test(value)) {
                                            setPinCode(value);
                                        }
                                    }}
                                    style={inputStyle}
                                    required
                                />
                            </Col>
                        )}


                        {!hideFields && (
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>GST No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="gstNo"
                                    value={GSTNumber}
                                    onChange={handleGSTChange}
                                    placeholder='Enter the GST Number'
                                    style={inputStyle}
                                    required
                                />
                                {error && !error.includes('Party name must be unique') && <small className="text-danger">{error}</small>}
                            </Col>
                        )}

                        {!hideFields && (
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>PAN No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="panNo"
                                    value={PANNumber}
                                    onChange={(e) => setPANNumber(e.target.value)}
                                    placeholder='Enter the PAN Number'
                                    style={inputStyle}
                                />
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</Button>
                            <Button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>


            <ToastContainer />

        </Container>
    );
};

export default NewParty;

