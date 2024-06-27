import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../AddSpare/AddSpare.css';

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

    // const handleGSTChange = (e) => {
    //     const gstValue = e.target.value.toUpperCase();
    //     setGSTNumber(gstValue);
    //     if (validateGST(gstValue)) {
    //         extractPANFromGST(gstValue);
    //         setError('');
    //     } else {
    //         setPANNumber('');
    //         setError('Invalid GST number');
    //     }
    // };

   
   
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
        if (MasterSpare && GSTNumber && PANNumber && SparePartName && SparePartModelNo && Brand && Specification && MacineName && Status) {
            const SpareData = {
                MasterSpare,
                GSTNumber,
                PANNumber,
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
        <>
            <form onSubmit={handleSubmit} className="first-mainCard mt-5">
                <div className="header">
                    <h4 className="text-center">
                        <b>Add New Spare</b></h4>  <FaTimes className="close-icon" onClick={handleClose} />
                </div>
                <div className="form-group">
                    <label> Master Spare Name</label>
                    <input type="text" className="form-text" name="MasterSpare"
                        value={MasterSpare}
                        onChange={(e) => setMasterSpare(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label>Spare Name</label>
                    <input type="text" className="form-text" name="SparePart"
                        value={SparePartName}
                        onChange={(e) => setSparePartName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label>Spare Part Model Name</label>
                    <input type="text" className="form-text" name="SparePartmodel"
                        value={SparePartModelNo}
                        onChange={(e) => setSparePartModelNo(e.target.value)}
                        required />
                </div>
                
                
                <div className="form-group">
                    <label>SparePartModelNo </label>
                    <input
                        type="sparepartmodelno"
                        className="form-text"
                        name="sparepartmodelno"
                        value={SparePartModelNo}
                        onChange={(e) => setSparePartModelNo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input
                        type="text"
                        className="form-text"
                        name="brand"
                        value={Brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Specification</label>
                    <input
                        type="text"
                        className="form-text"
                        name="specification"
                        value={Specification}
                        onChange={(e) => setSpecification(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>MacineName</label>
                    <input
                        type="text"
                        className="form-text"
                        name="macinename"
                        value={MacineName}
                        onChange={(e) => setMacineName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Machine Model Number</label>
                    <input
                        type="text"
                        className="form-text"
                        name="macinemodel"
                        value={MachineModelNo}
                        onChange={(e) => setMachineModelNo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default AddSpare;
