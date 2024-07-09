import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import img1 from "../../Assets/Images/LOGO.png"


const AddMachine = () => {
    const [machineName, setMachineName] = useState('');
    const [machineModelNo, setMachineModelNo] = useState('');
    const [machineNo, setMachineNo] = useState('');
    const [machineBrandName, setMachineBrandName] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const [personID, setPersonID] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const personID = localStorage.getItem("CurrentUser");
        if (personID) {
            setPersonID(personID);
        }
    }, []);

    const notifySuccess = () => toast.success("Machine added successfully !", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const addNewMachine = async (machineData) => {
        try {
            const res = await fetch('http://srv515471.hstgr.cloud:9090/Maintenance/AddMachine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData),
            });
            let response = await res.json();
            if (res.ok) {

                setMachineName('');
                setMachineModelNo('');
                setMachineNo('');
                setMachineBrandName('');
                setPersonID('');
                setError('');
                notifySuccess();
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                if (res.status == 409) {
                    response.msg == 'Duplicate Machine Name' ? notifyError('This machine name is already exists') :
                        notifyError('This machine model number is already exists');

                } else {
                    notifyError('Something Went Wrong');
                }
            }
        } catch (error) {

            notifyError('Failed to add new machine: ' + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!personID) {
            setError('Already Exist');
            return;
        }

        if (machineName && machineModelNo && machineNo && machineBrandName && status) {
            const machineData = {
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

    const handleback = (e) => {
        navigate('/dashboard');
    }
    const inputStyle = {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px'
    };



    return (
        <Container style={{ marginTop: "12%" }} className="fullPage ">
            <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Image src={img1} alt="" className="text-center" rounded style={{ width: '15%', marginLeft: "43%" }} />
                <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    Add New Machine
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
                                onChange={(e) => setMachineName(e.target.value)}

                                placeholder="Enter Machine Name"
                                style={inputStyle}
                                required
                            />

                        </Col>

                        <Col md={4} className="py-2 form-group">
                            <Form.Label>Machine Model Number</Form.Label>
                            <Form.Control
                                type="text"
                                className="input-text"
                                name="MachineModelNo"
                                value={machineModelNo}
                                onChange={(e) => setMachineModelNo(e.target.value)}
                                placeholder="Enter Machine Model Number"
                                style={inputStyle}
                                required
                            />
                        </Col>

                        <Col md={4} className="py-2 form-group">
                            <Form.Label>Machine Number</Form.Label>
                            <Form.Control
                                type="text"
                                className="input-text"
                                name="MachineNo"
                                value={machineNo}
                                onChange={(el) => {
                                    setMachineNo(el.target.value);
                                    setError('');
                                }}
                                placeholder="Enter Machine Number"
                                style={inputStyle}
                                required
                            />
                        </Col>

                        <Col md={4} className="py-2 form-group">
                            <Form.Label>Machine Brand Name</Form.Label>
                            <Form.Control
                                type="text"
                                className="input-text"
                                name="MachineBrandName"
                                value={machineBrandName}
                                onChange={(e) => setMachineBrandName(e.target.value)}
                                placeholder="Enter Machine Brand Name"
                                style={inputStyle}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="button" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</Button>
                            <Button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#006bff', margin: '24px' }}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <ToastContainer position="top-center" autoClose={2000} />
        </Container>
    );
};

export default AddMachine;
