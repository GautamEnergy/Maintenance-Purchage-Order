import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


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
                notifySuccess();
                setMachineName('');
                setMachineModelNo('');
                setMachineNo('');
                setMachineBrandName('');
                setPersonID('');
                setError('');
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

    return (
        <div className="mainCard">
            <div className="fullPage">
                <div className="form-detail">
                    <h2>Add New Machine</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="subCard1">
                        <div className="row">
                            <label>Machine Name</label>
                            <input
                                type="text"
                                className="input-text"
                                name="MachineName"
                                value={machineName}
                                onChange={(e) => setMachineName(e.target.value)}
                                placeholder="Enter Machine Name"
                                required
                            />
                        </div>
                        <div className="row">
                            <label>Machine Model Number</label>
                            <input
                                type="text"
                                className="input-text"
                                name="MachineModelNo"
                                value={machineModelNo}
                                onChange={(e) => setMachineModelNo(e.target.value)}
                                placeholder="Enter Machine Model Number"
                                required
                            />
                        </div>
                        <div className="row">
                            <label>Machine Number</label>
                            <input
                                type="text"
                                className="input-text"
                                name="MachineNo"
                                value={machineNo}
                                onChange={((el) => {
                                    setMachineNo(el.target.value)
                                    setError('')
                                })}
                                placeholder="Enter Machine Number"
                                required
                            />
                        </div>
                        <div className="row">
                            <label>Machine Brand Name</label>
                            <input
                                type="text"
                                className="input-text"
                                name="MachineBrandName"
                                value={machineBrandName}
                                onChange={(e) => setMachineBrandName(e.target.value)}
                                placeholder="Enter Machine Brand Name"
                                required
                            />
                        </div>
                    </div>
                    <div style={{ marginLeft: '510px' }}>
                        <button type="back" className="register" onClick={handleback} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</button>
                        <button type="submit" className="register" onClick={handleSubmit} style={{ width: '83px', height: '43px', background: '#0C53F5' }}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default AddMachine;
