import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../AddMachine/AddMachine.css';

const AddMachine = () => {
    const [MachineName, setMachineName] = useState('');
    const [MachineModelNo, setMachineModelNo] = useState('');
    const [MachineNo, setMachineNo] = useState('');
    const [MachineBrandName, setMachineBrandName] = useState('');
    const [Status, setStatus] = useState('Active');
    const [error, setError] = useState('');

    const notifySuccess = () => toast.success("New Machine Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });
    const addNewMachine = async (machineData) => {
        try {
            const response = await fetch('http://srv515471.hstgr.cloud:8080/Maintenance/AddMachine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData),
            });
            if (response.ok) {
                notifySuccess();
                setMachineName('');
                setMachineModelNo('');
                setMachineNo('');
                setMachineBrandName('')
                setStatus('Active');
                setError('');
            } else {
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new machine');
            }
        } catch (error) {
            notifyError('Failed to add new machine: ' + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (MachineName && MachineModelNo && MachineNo && MachineBrandName && Status) {
            const machineData = {
                MachineName,
                MachineModelNo,
                MachineNo,
                MachineBrandName,
                Status,

            };
            console.log('Form data submitted:', machineData);
            addNewMachine(machineData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleClose = () => {
        console.log('Close button clicked');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="Section1">
                <div className="header">
                    <h4 className="text-center">
                        <b>Add New Machine</b></h4>
                    {/* <FaTimes className="close-icon" onClick={handleClose} /> */}
                </div>
                <div className="form-group">
                    <label>Machine Name</label>
                    <input type="text" className="form-text" name="MachineName"
                        value={MachineName}
                        onChange={(e) => setMachineName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label>Machine Model Number</label>
                    <input
                        type="text"
                        className="form-text"
                        name="gstNo"
                        value={MachineModelNo}
                        onChange={(e) => setMachineModelNo(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">
                    <label>Machine Number.</label>
                    <input
                        type="text"
                        className="form-text"
                        name="machinenumber"
                        value={MachineNo}
                        onChange={(e) => { setMachineNo(e.target.value) }}


                        required
                    />
                </div>
                <div className="form-group">
                    <label>Machine Brand Name </label>
                    <input
                        type="brand"
                        className="form-text"
                        name="brand"
                        value={MachineBrandName}
                        onChange={(e) => setMachineBrandName(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default AddMachine;
