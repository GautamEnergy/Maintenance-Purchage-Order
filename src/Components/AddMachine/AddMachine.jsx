import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../../Assets/Images/LOGO.png";
import { AppContext } from '../../ContextAPI';
import Loader from '../Loader/Loader';
import axios from 'axios';

const AddMachine = () => {
    const { token, setToken } = useContext(AppContext);
    const [machineName, setMachineName] = useState('');
    const [machineModelNo, setMachineModelNo] = useState('');
    const [machineNo, setMachineNo] = useState('');
    const [machineBrandName, setMachineBrandName] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const [personID, setPersonID] = useState('');
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [FormData, setFormData] = useState([]);
    const location = useLocation();
    const { MachineId } = location.state || {};

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
    }, [setToken]);

    useEffect(() => {
        if (MachineId) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const url = localStorage.getItem('url');
                    const response = await axios.post(
                        `${url}/Maintenance/MachineListById`,
                        { MachineId }
                    );

                    console.log(' data', response.data.data);

                    const machineData = response.data.data[0];
                    setFormData(machineData);
                    setMachineName(machineData.MachineName || '');
                    setMachineModelNo(machineData.MachineModelNumber || '');
                    setMachineNo(machineData.MachineNumber || '');
                    setMachineBrandName(machineData.MachineBrandName || '');
                    setStatus(machineData.status || 'Active');
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching machine data:', error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [MachineId]);

    const addNewMachine = async (machineData) => {
        try {
            setLoading(true);
            const res = await fetch(`${url}/Maintenance/AddMachine`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData),
            });
            let response = await res.json();
            if (res.ok) {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/machinelist');
                }, 1000);
                setMachineName('');
                setMachineModelNo('');
                setMachineNo('');
                setMachineBrandName('');
                setPersonID('');
                setError('');
                notifySuccess();
            } else {
                setLoading(false);
                if (res.status === 409) {
                    response.msg === 'Duplicate Machine Name'
                        ? notifyError('This machine name already exists')
                        : notifyError('This machine model number already exists');
                } else {
                    notifyError('Something went wrong');
                }
            }
        } catch (error) {
            setLoading(false);
            notifyError('Failed to add new machine: ' + error.message);
        }
    };


    const notifySuccess = () => toast.success(MachineId ? "Machine Update successfully!" : "Machine added successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!personID) {
            setError('Already Exist');
            return;
        }
        const newFieldErrors = {};
        if (!machineName) newFieldErrors.machineName = 'Machine name is required';
        if (!machineModelNo) newFieldErrors.machineModelNo = 'Model number is required';
        if (!machineNo) newFieldErrors.machineNo = 'Machine serial number is required';
        if (!machineBrandName) newFieldErrors.machineBrandName = 'Machine brand name is required';

        setFieldErrors(newFieldErrors);

        if (Object.keys(newFieldErrors).length === 0) {
            const machineData = {
                MachineId: MachineId ? MachineId : "",
                MachineName: machineName,
                MachineBrandName: machineBrandName,
                MachineModelNumber: machineModelNo,
                MachineNumber: machineNo,
                CurrentUser: personID,
                Status: status,
            };
            addNewMachine(machineData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleFieldChange = (field, value) => {
        const newFieldErrors = { ...fieldErrors };
        if (!value) {
            newFieldErrors[field] = `${field.replace('machine', '').replace(/([A-Z])/g, ' $1')} is required`;
        } else {
            delete newFieldErrors[field];
        }
        setFieldErrors(newFieldErrors);
        setError('');
    };

    const handleBack = () => {
        navigate('/machinelist');
    };

    const inputStyle = {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px',
        boxShadow: 'none',
    };

    const inputStyles = {
        borderColor: 'red',
        borderWidth: '1px',
        borderRadius: '5px',
    };

    return (
        <Container  style={{ marginTop: "3%", width: "100%", maxWidth: "1200px", padding: "0 20px", boxSizing: "border-box" }} className="fullPage">
            <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                {loading && (
                    <div className="loader-overlay">
                        <Loader type="ThreeDots" color="#006bff" height={80} width={80} />
                    </div>
                )}
                <div className={`form-content ${loading ? 'blurred' : ''}`}>
                    <Image src={img1} alt="" className="text-center" rounded style={{ width: '15%', marginLeft: "43%" }} />
                    {/* <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                        Add New Machine
                    </h2> */}

                    <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                        {MachineId ? "Edit Machine" : "Add New Machine"}
                    </h2>

                    <Form onSubmit={handleSubmit}>
                        <Row className="subCard1">
                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Machine Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="MachineName"
                                    value={machineName}
                                    onChange={(e) => {
                                        setMachineName(e.target.value);
                                        handleFieldChange('machineName', e.target.value);
                                    }}
                                    placeholder="Enter Machine Name"
                                    style={!fieldErrors.machineName ? inputStyle : inputStyles}
                                />
                                {fieldErrors.machineName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.machineName}</div>}
                            </Col>

                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Machine Model Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    value={machineModelNo}
                                    onChange={(e) => {
                                        setMachineModelNo(e.target.value);
                                        handleFieldChange('machineModelNo', e.target.value);
                                    }}
                                    placeholder="Enter Machine Model Number"
                                    style={!fieldErrors.machineModelNo ? inputStyle : inputStyles}
                                />
                                {fieldErrors.machineModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.machineModelNo}</div>}
                            </Col>

                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Machine Serial Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="MachineNo"
                                    value={machineNo}
                                    onChange={(el) => {
                                        setMachineNo(el.target.value);
                                        handleFieldChange('machineNo', el.target.value);
                                    }}
                                    placeholder="Enter Machine Serial Number"
                                    style={!fieldErrors.machineNo ? inputStyle : inputStyles}
                                />
                                {fieldErrors.machineNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.machineNo}</div>}
                            </Col>

                            <Col md={4} className="py-2 form-group">
                                <Form.Label>Machine Brand Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="input-text"
                                    name="MachineBrandName"
                                    value={machineBrandName}
                                    onChange={(e) => {
                                        setMachineBrandName(e.target.value);
                                        handleFieldChange('machineBrandName', e.target.value);
                                    }}
                                    placeholder="Enter Machine Brand Name"
                                    style={!fieldErrors.machineBrandName ? inputStyle : inputStyles}
                                />
                                {fieldErrors.machineBrandName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.machineBrandName}</div>}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="button" className="register" onClick={handleBack} style={{ width: '83px', height: '43px', background: '#545454', margin: '10px' }}>Back</Button>
                                <Button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#006bff', margin: '10px' }}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <ToastContainer position="top-center" autoClose={2000} />
            </div>

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

export default AddMachine;
