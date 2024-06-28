import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './AddSpare.css';

const AddSpare = () => {
    const [MasterSpare, setMasterSpare] = useState('');
    const [SparePartName, setSparePartName] = useState('');
    const [SparePartModelNo, setSparePartModelNo] = useState('');
    const [Brand, setBrand] = useState('');
    const [Specification, setSpecification] = useState('');
    const [MacineName, setMacineName] = useState('');
    const [MachineModelNo, setMachineModelNo] = useState('');
    const [Status, setStatus] = useState('Active');
    const [error, setError] = useState('');

    const notifySuccess = () => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const addNewSpare = async (SpareData) => {
        try {
            const response = await fetch('http://srv515471.hstgr.cloud:8080/Maintenance/AddSpare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SpareData),
            });
            if (response.ok) {
                notifySuccess();
                setMasterSpare('');
                setSparePartName('');
                setSparePartModelNo('');
                setBrand('');
                setSpecification('');
                setMacineName('');
                setMachineModelNo('');
                setStatus('Active');
                setError('');
            } else {
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new Spare');
            }
        } catch (error) {
            notifyError('Failed to add new Spare: ' + error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (MasterSpare && SparePartName && SparePartModelNo && Brand && Specification && MacineName && Status) {
            const SpareData = {
                MasterSpare,
                Brand,
                Specification,
                MacineName,
                SparePartModelNo,
                SparePartName,
                Status,
            };
            console.log('Form data submitted:', SpareData);
            addNewSpare(SpareData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleClose = () => {
        console.log('Close button clicked');
    };

    return (
        <div className="Section1">
            <div className="form-header">
                <h2 className="form-title">Add New Spare</h2>
                {/* <FaTimes className="close-icon" onClick={handleClose} /> */}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="system">
                    <input
                        type="text"
                        name="MasterSpare"
                        value={MasterSpare}
                        onChange={(e) => setMasterSpare(e.target.value)}
                        required
                    />
                    <label>Master Spare Name</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="SparePart"
                        value={SparePartName}
                        onChange={(e) => setSparePartName(e.target.value)}
                        required
                    />
                    <label>Spare Name</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="SparePartModelNo"
                        value={SparePartModelNo}
                        onChange={(e) => setSparePartModelNo(e.target.value)}
                        required
                    />
                    <label>Spare Part Model Name</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="brand"
                        value={Brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                    <label>Brand</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="specification"
                        value={Specification}
                        onChange={(e) => setSpecification(e.target.value)}
                        required
                    />
                    <label>Specification</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="macineName"
                        value={MacineName}
                        onChange={(e) => setMacineName(e.target.value)}
                        required
                    />
                    <label>Machine Name</label>
                </div>
                <div className="system">
                    <input
                        type="text"
                        name="machineModelNo"
                        value={MachineModelNo}
                        onChange={(e) => setMachineModelNo(e.target.value)}
                        required
                    />
                    <label>Machine Model Number</label>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default AddSpare;
