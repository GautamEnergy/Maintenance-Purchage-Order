import React, { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import img1 from "../../Assets/Images/LOGO.png";
import { AppContext } from '../../ContextAPI';
import Loader from '../Loader/Loader';
import axios from 'axios';


const NewParty = () => {
    const { token, setToken } = useContext(AppContext);
    const [PartyName, setPartyName] = useState('');
    const [GSTNumber, setGSTNumber] = useState('');
    const [PANNumber, setPANNumber] = useState('');
    const [MobileNumber, setMobileNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Country, setCountry] = useState({ value: 'India', label: 'India' });
    const [State, setState] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [CountryCode, setCountryCode] = useState('+91');
    const [Status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [maxLength, setMaxLength] = useState(10);
    const [personID, setPersonID] = useState('');
    const [hideFields, setHideFields] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState();
    const location = useLocation();
    const { PartyNameId } = location.state || {};
    const [FormData, setFormData] = useState([]);
    console.log("Country",Country)


    useEffect(() => {
        const token = localStorage.getItem("token");
        const personID = localStorage.getItem("CurrentUser");
        const url = localStorage.getItem('url');
        setUrl(url);
        if (personID) {
            setPersonID(personID);
        }
        if (token) {
            setToken(token);
        }
        console.log(personID)
        console.log(url);
    }, []);
    const countrtrySelect = Country.value;

    const countryOptions = [
        { value: 'India', label: 'India' },
        { value: 'China', label: 'China' },
    ];
    // get Party List by id
    useEffect(() => {
        console.log("hahahhahahmmmm")

        console.log(PartyNameId)

        if (PartyNameId) {



            const fetchData = async () => {
                const url = localStorage.getItem('url');
                try {
                    const response = await axios.post(
                        `${url}/Maintenance/getPartyListById`,
                        { PartyNameId: PartyNameId }
                    );
                    const partyData = response.data.data[0];
                    setFormData(partyData);
                    console.log("partyData", partyData)
                    // bindData(purchaseData)
                    console.log("Response", response)
                    setPartyName(partyData.PartyName || '');
                    setGSTNumber(partyData.GSTNumber || '');
                    setPANNumber(partyData.PANNumber || '');
                    setAddress(partyData.Address || '');
                    const country = partyData.Country || 'India';
                    setCountry({ value: country, label: country });
                    console.log("Setting Country to:", { value: partyData.Country || 'India', label: partyData.Country || 'India' });

                    setState(partyData.State || '');
                    setEmail(partyData.Email || '');
                    setMobileNumber(partyData.MobileNumber.slice(4) || '');
                    const CountryCode = partyData.MobileNumber.slice(0,3);
                    console.log("CountryCode",CountryCode);
                    setCountryCode(CountryCode);
                    setStatus(partyData.Status || 'Active');
                    setPinCode(partyData.PinCode || '');
                    setLoading(false);
                    console.log(FormData)
                } catch (error) {
                    console.error('Error fetching purchase order data:', error);
                }
            };
            fetchData();
        }
    }, [PartyNameId]);

    const notifySuccess = () => toast.success("New Party Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const handleGSTChange = (e) => {
        const gstValue = e.target.value.toUpperCase();
        setGSTNumber(gstValue);

        if (gstValue.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, GSTNumber: 'GST number is required' }));
            setPANNumber('');
            setError('');
        } else if (!validateGST(gstValue)) {
            setErrors((prevErrors) => ({ ...prevErrors, GSTNumber: 'GST number is invalid' }));
            setPANNumber('');
            setError('Invalid GST number format');
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, GSTNumber: '' }));
            extractPANFromGST(gstValue);
            setError('');
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
            setLoading(true);
            console.log(url)
            const response = await fetch(`${url}/Maintenance/AddParty`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partyData),
            });

            if (response.status === 409) {
                notifyError(error.message || 'This party already exists.');
                setLoading(false);
            } else if (response.ok) {
                console.log(response.data);

                notifySuccess();
                clearForm();
                setTimeout(() => {
                    setLoading(false);
                    navigate('/partylist');
                }, 1000);
            } else {
                setLoading(false);
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new party');
            }
        } catch (error) {
            setLoading(false);
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
    const isEmailValids = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const state = { PartyName, MobileNumber, Email, Address, countrtrySelect, PinCode, GSTNumber, PANNumber, State };

        const requiredFields = {
            PartyName: 'Party name is required',
            MobileNumber: 'Mobile number is required',
            Email: 'Email is required',
            Address: 'Address is required',
            countrtrySelect: 'Country is required',
            ...(state.countrtrySelect !== 'China' && {
                PinCode: 'Pin code is required',
                GSTNumber: 'GST number is required',
                PANNumber: 'PAN number is required',
                State: 'State is required'
            }),
            ...(state.countrtrySelect === 'China' && { PinCode: 'Zip code is required' }),
        };

        Object.keys(requiredFields).forEach(field => {
            if (!state[field] || (field === 'Email' && !isEmailValids(state.Email))) {
                newErrors[field] = requiredFields[field];
                isValid = false;
            }
        });

        if (state.countrtrySelect === 'China' && (!state.PinCode || state.PinCode.length !== 6)) {
            newErrors.PinCode = 'Zip Code is required';
            isValid = false;
        } else if (state.countrtrySelect !== 'China' && (!state.PinCode || state.PinCode.length !== 6)) {
            newErrors.PinCode = 'Pin Code is invalid';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!isEmailValid) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         Email: 'Email is invalid'
        //     }));
        //     return;
        // }




        // if (PartyName && GSTNumber && PANNumber && MobileNumber && Email && Address && countrtrySelect && State && CountryCode && PinCode && Status) {
        if (validateForm()) {
            const partyData = {
                PartyNameId : PartyNameId?PartyNameId:"",
                PartyName,
                GSTNumber: countrtrySelect == 'China' ? '' : GSTNumber,
                PANNumber: countrtrySelect == 'China' ? '' : PANNumber,
                MobileNumber,
                Email,
                Address,
                Country: countrtrySelect,
                State: countrtrySelect == 'China' ? '' : State,
                CountryCode,
                PinCode,
                Status,
                CurrentUser: personID,
            };


            addNewParty(partyData);

        }
        // else if (PartyName && MobileNumber && Email && Address && countrtrySelect && CountryCode && PinCode && Status) {
        //     const partyData = {
        //         PartyName,
        //         MobileNumber,
        //         Email,
        //         Address,
        //         countrtrySelect,
        //         CountryCode,
        //         PinCode,
        //         Status,
        //         CurrentUser: personID,
        //     };
        //     addNewParty(partyData);
        // }
        else {
            console.log('Else')
            // notifyError('Please fill in all required fields.');
        }



    };

    const handleback = () => {
        navigate('/partylist');
    };

    const handleMobileNumberChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setMobileNumber(onlyNums);
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors, MobileNumber: '' };
            if (CountryCode === '+91' && onlyNums.length !== 10 && onlyNums.length !== 0) {
                updatedErrors.MobileNumber = 'Mobile number is invalid';
            } else if (CountryCode === '+86' && onlyNums.length !== 11 && onlyNums.length !== 0) {
                updatedErrors.MobileNumber = 'Mobile number is invalid';
            } else if (onlyNums.length === 0) {
                updatedErrors.MobileNumber = 'Mobile number is required';
            }
            return updatedErrors;
        });
    };

    const handleCountryCodeChange = (e) => {
        setMobileNumber("");
        const selectedCode = e.target.value;
        setCountryCode(selectedCode);



        if (selectedCode == '+91') {
            setMaxLength(10);

        } else if (selectedCode == '+86') {
            setMaxLength(11);
        }

    };

    const handleCountry = (selectedOption) => {
        console.log('Checked it');
        console.log(selectedOption);

        const selectedCountry = selectedOption;
        setCountry(selectedCountry);

        // console.log(selectedCountry)

  
        if (selectedOption.value == 'China') {
            setState('');
            setPANNumber('');
            setGSTNumber('');
        }
        setErrors((prevErrors) => ({ ...prevErrors, countrtrySelect: '' }))
    };
    useEffect(() => {
        if (Country.value === 'China') {
            setHideFields(true);
            // Clear specific fields if needed
            setState('');
            setPANNumber('');
            setGSTNumber('');
        } else {
            setHideFields(false);
        }
    }, [Country]);

    const countryCodes = [
        { code: '+91' },
        { code: '+86' },
    ];

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Regex pattern for validating email
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        const isValid = emailPattern.test(emailValue);
        setIsEmailValid(isValid);

        // Set error based on email validity
        if (emailValue.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Email: 'Email is required'
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                Email: isValid ? '' : 'Email is invalid'
            }));
        }
    };
    const inputStyle = {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px',
        boxShadow: 'none'
    };
    const inputStyles = {
        borderColor: 'red',
        borderWidth: '1px',
        borderRadius: '5px',
        boxShadow: 'none'
    };




    return (

        <Container style={{ marginTop: "12%" }} className="fullPage ">
            <div className="form-detail" style={{ backgroundColor: '#f8f8ff', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {loading && (
                    <div className="loader-overlay">
                        <Loader type="ThreeDots" color="#006bff" height={80} width={80} />
                    </div>
                )}
                <div className={`form-content ${loading ? 'blurred' : ''}`}>
                    <Image src={img1} alt="" className="text-center" rounded style={{ width: '15%', marginLeft: "43%" }} />
                    <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                       {PartyNameId? "Edit Party":"Add New Party"}
                    </h2>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="subCard1">
                            <Col md={4} className="form-group">
                                <Form.Label>Party Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="partyName"
                                    value={PartyName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setPartyName(value);
                                        if (value.trim() === '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, PartyName: 'Party name is required' }));
                                        } else {
                                            setErrors((prevErrors) => ({ ...prevErrors, PartyName: '' }));
                                        }
                                    }}
                                    placeholder='Enter the New Party'

                                    // required
                                    isInvalid={!!errors.PartyName}
                                    style={!errors.PartyName ? inputStyle : inputStyles}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.PartyName}
                                </Form.Control.Feedback>
                            </Col>
                            <Col md={4} className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Control
                                        as="select"
                                        id="countryCode"
                                        className="input-text"
                                        style={{ width: '45px', height: '38px', padding: '10px', fontSize: '14px', marginTop: '25px', background: 'White', border: "1px black solid", boxShadow: "none" }}
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
                                        maxLength={CountryCode == '+91' ? 10 : 11}


                                        // required

                                        isInvalid={!!errors.MobileNumber}
                                        style={!errors.MobileNumber ? inputStyle : inputStyles}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.MobileNumber}
                                    </Form.Control.Feedback>
                                </div>
                            </Col>
                            <Col md={4} className="form-group">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    className="input-text"
                                    name="email"
                                    placeholder='Enter the Email'
                                    value={Email}
                                    onChange={handleEmailChange}

                                    isInvalid={!!errors.Email}
                                    style={!errors.Email ? inputStyle : inputStyles}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.Email}
                                </Form.Control.Feedback>
                            </Col>





                        </Row>
                        <Row>
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Country</Form.Label>
                                <Select
                                    onChange={handleCountry}
                                    // value={countrtrySelect}
                                    defaultValue={Country}
                                    value={Country}
                                    options={countryOptions}
                                    placeholder="Select country"
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
                                    //  required
                                    isInvalid={!!errors.countrtrySelect}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.countrtrySelect}
                                </Form.Control.Feedback>
                            </Col>


                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="address"
                                    value={Address}
                                    placeholder='Enter the Address'
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setAddress(value);
                                        if (value.trim() === '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, Address: 'Address is requird' }))
                                        }
                                        else {
                                            setErrors((prevErrors) => ({ ...prevErrors, Address: '' }));

                                        }

                                    }}


                                    isInvalid={!!errors.Address}
                                    style={!errors.Address ? inputStyle : inputStyles}
                                //  required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.Address}
                                </Form.Control.Feedback>
                            </Col>
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>{!hideFields ? 'State' : 'Zip Code'}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name={!hideFields ? "state" : 'Zip Code'}
                                    placeholder={!hideFields ? 'Enter State' : 'Enter Zip Code'}
                                    value={!hideFields ? State : PinCode}
                                    maxLength={hideFields ? 6 : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!hideFields) {
                                            setState(value);
                                            setErrors((prevErrors) => ({
                                                ...prevErrors,
                                                State: value ? '' : 'State is required',
                                            }));
                                        } else {
                                            if (/^\d*$/.test(value)) {
                                                setPinCode(value);
                                                setErrors((prevErrors) => ({
                                                    ...prevErrors,
                                                    PinCode: value ? '' : 'Zip Code is required',
                                                    InvalidZip: value.length === 6 || value.length === 0 ? '' : 'Zip Code is invalid',
                                                }));
                                            } else {
                                                setErrors((prevErrors) => ({
                                                    ...prevErrors,
                                                    InvalidZip: 'Zip Code is invalid',
                                                }));
                                            }
                                        }
                                    }}
                                    isInvalid={!hideFields ? !!errors.State : !!errors.PinCode || !!errors.InvalidZip}
                                    style={!hideFields ? (!errors.State ? inputStyle : inputStyles) : (!errors.PinCode && !errors.InvalidZip ? inputStyle : inputStyles)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {!hideFields ? errors.State : errors.PinCode || errors.InvalidZip}
                                </Form.Control.Feedback>
                            </Col>


                        </Row>
                        <Row>
                            {countrtrySelect !== "China" && (
                                <Col md={4} className="py-2 form-group">
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="input-text"
                                        name="PinCode"
                                        placeholder="Enter the Pin Code"
                                        value={PinCode}
                                        maxLength={6}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,6}$/.test(value)) {
                                                setPinCode(value);

                                                if (value.trim() === '') {
                                                    setErrors((prevErrors) => ({
                                                        ...prevErrors,
                                                        PinCode: 'Pin code is required',
                                                    }));
                                                } else if (value.length !== 6) {
                                                    setErrors((prevErrors) => ({
                                                        ...prevErrors,
                                                        PinCode: 'Pin code is invalid',
                                                    }));
                                                } else {
                                                    setErrors((prevErrors) => ({
                                                        ...prevErrors,
                                                        PinCode: '',
                                                    }));
                                                }
                                            }
                                        }}
                                        isInvalid={!!errors.PinCode}
                                        style={!errors.PinCode ? inputStyle : inputStyles}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.PinCode}
                                    </Form.Control.Feedback>
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

                                        //  required
                                        isInvalid={!!errors.GSTNumber}
                                        style={!errors.GSTNumber ? inputStyle : inputStyles}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.GSTNumber}
                                    </Form.Control.Feedback>
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
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setPANNumber(value)
                                            if (PANNumber.trim() === '') {
                                                setErrors((prevErrors) => ({ ...prevErrors, PANNumber: 'PAN number is required' }));

                                            }
                                            else {
                                                setErrors((prevErrors) => ({ ...prevErrors, PANNumber: '' }));

                                            }


                                        }}
                                        placeholder='Enter the PAN Number'
                                        isInvalid={!!errors.PANNumber}

                                        style={!errors.PANNumber ? inputStyle : inputStyles}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.PANNumber}
                                    </Form.Control.Feedback>
                                </Col>
                            )}
                        </Row>
                        <Row>
                            <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '10px' }}>Back</Button>
                                <Button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#006bff', margin: '10px' }}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

            <ToastContainer position='top-center' />
            <style jsx>{`
            .loader-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(255, 255, 255, 0.7);
                z-index: 999;
            }
            .blurred {
                filter: blur(5px);
                pointer-events: none;
            }
        `}</style>
        </Container>
    );
};

export default NewParty;

