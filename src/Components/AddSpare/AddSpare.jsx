import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import './AddSpare.css';

const AddSpare = () => {
    const [SparePartName, setSparePartName] = useState('');
    const [SparePartModelNo, setSparePartModelNo] = useState('');
    const [Brand, setBrand] = useState('');
    const [Specification, setSpecification] = useState('');
    const [MachineNames, setMachineNames] = useState([]);
    const [MachineModelNo, setMachineModelNo] = useState('');
    const [Status, setStatus] = useState('Active');
    const [MasterSparePartName, setMasterSparePartName] = useState('');

    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState('');

    const notifySuccess = () => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const machineOptions = [
        { value: 'Machine1', label: 'Machine 1' },
        { value: 'Machine2', label: 'Machine 2' },
        { value: 'Machine3', label: 'Machine 3' },
    ];

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const buffer = reader.result;
                const bytes = new Uint8Array(buffer);
                const base64String = btoa(String.fromCharCode(...bytes));
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

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
                setSparePartName('');
                setSparePartModelNo('');
                setBrand('');
                setSpecification('');
                setMachineNames([]);
                setMachineModelNo('');
                setStatus('Active');
                setMasterSparePartName('');
                setImage(null);
                setPdf(null);
                setError('');
            } else {
                const errorData = await response.json();
                notifyError(errorData.message || 'Failed to add new Spare');
            }
        } catch (error) {
            notifyError('Failed to add new Spare: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (SparePartName && SparePartModelNo && Brand && Specification && MachineNames.length > 0 && Status) {
            const formData = new FormData();
            const SpareData = {
                MasterSpare: MasterSparePartName,
                SparePartName,
                Brand,
                Specification,
                MachineNames: MachineNames.map(m => m.value),
                SparePartModelNo,
                Status,
                Image: image ? await convertToBase64(image) : null,
                PDF: pdf ? await convertToBase64(pdf) : null

            };

            console.log('Form data submitted:', SpareData);
            addNewSpare(SpareData);
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePdfChange = (e) => {
        setPdf(e.target.files[0]);
    };

    return (
        <div className="fullPage">
            <div className="form-detail">
                <h2>Add New Spare</h2>
                <form onSubmit={handleSubmit}>
                    <div className="subCard2">
                        <div className="system input-text">
                            <label className="file-label">Master Spare Part Name</label>
                            <input
                                type="text"
                                name="MasterSparePartName"
                                value={MasterSparePartName}
                                onChange={(e) => setMasterSparePartName(e.target.value)}
                                placeholder="Master Spare Part Name"
                                required
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Spare Part Name</label>
                            <input
                                type="text"
                                name="SparePartName"
                                value={SparePartName}
                                onChange={(e) => setSparePartName(e.target.value)}
                                placeholder="Spare Part Name"
                                required
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Spare Part Model Number</label>
                            <input
                                type="text"
                                name="SparePartModelNo"
                                value={SparePartModelNo}
                                onChange={(e) => setSparePartModelNo(e.target.value)}
                                placeholder="Spare Part Model Number"
                                required
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={Brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Brand"
                                required
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Specification</label>
                            <input
                                type="text"
                                name="specification"
                                value={Specification}
                                onChange={(e) => setSpecification(e.target.value)}
                                placeholder="Specification"
                                required
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Machine Name</label>
                            <Select
                                isMulti
                                name="MachineNames"
                                options={machineOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={MachineNames}
                                onChange={setMachineNames}
                                placeholder="Machine Name"
                                required
                            />
                        </div>
                        <div className="system input-file full-width">
                            <label className="file-label">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input"
                            />
                        </div>
                        <div className="system input-file full-width">
                            <label className="file-label">Upload PDF</label>
                            <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                onChange={handlePdfChange}
                                className="file-input"
                            />
                        </div>
                    </div>
                    <button type="submit" className="register">Submit</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default AddSpare;
