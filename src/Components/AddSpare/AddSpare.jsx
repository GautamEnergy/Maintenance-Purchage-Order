import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddSpare = () => {
    const [SparePartName, setSparePartName] = useState('');
    const [SparePartModelNo, setSparePartModelNo] = useState('');
    const [Brand, setBrand] = useState('');
    const [Specification, setSpecification] = useState('');
    const [MachineNames, setMachineNames] = useState([]);
    const [Status, setStatus] = useState('Active');
    const [MasterSparePartName, setMasterSparePartName] = useState('');
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState('');
    const [personID, setPersonID] = useState('');
    const [machineList, setMachineList] = useState([]);
    const [option, setOption] = useState([]);
    const [sparePartId, setSparePartId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageBytes, setImageBytes] = useState(null);
    const [drawingPdfFileBytes, setDrawingPdfFileBytes] = useState(null);
    const [imageController, setImageController] = useState('');
    const [drawingPdfController, setDrawingPdfController] = useState('');
    const [Machine, SetMachine] = useState([])
    let machineData = []

    const navigate = useNavigate();

    const notifySuccess = () => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });


    // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    // console.log(Machine)
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

    useEffect(() => {
        const personID = localStorage.getItem("CurrentUser");
        if (personID) {
            setPersonID(personID);
        }
        getMachineListData();
    }, []);

    const addNewSpare = async (SpareData) => {

        // console.log(SpareData);
        try {
            const response = await fetch('http://srv515471.hstgr.cloud:9090/Maintenance/AddSparePart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SpareData),
            });
            console.log("jiiiiiaAppppppp");
            console.log(response.data)
            console.log(response)
            if (response.ok) {
                const responseData = await response.json();
                notifySuccess();
                setSparePartName('');
                setSparePartModelNo('');
                setBrand('');
                setSpecification('');
                setMachineNames([]);
                setStatus('Active');
                setMasterSparePartName('');
                setImage(null);
                setPdf(null);
                setError('');
                return responseData;
            } else {
                const errorData = await response.json();
                console.log(errorData)
                if (errorData.msg = 'Duplicate Spare Model Number') {
                    notifyError(errorData.message || 'This Spare Part Model Number already exists');
                }

            }
        } catch (error) {
            notifyError('Failed to add new Spare: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!personID) {
            setError('PersonID is required.');
            return;
        }
        if (SparePartName && SparePartModelNo && Brand && Specification && MachineNames.length > 0 && Status) {
            const SpareData = {
                MasterSparePartName: MasterSparePartName,
                SparePartName,
                SpareNumber: SparePartModelNo,
                BrandName: Brand,
                Specification,
                MachineName: MachineNames.map((el) => {
                    return el.value
                }),
                SparePartModelNo,
                Status,
                CurrentUser: personID,
                // Image: image ? await convertToBase64(image) : null,
                // PDF: pdf ? await convertToBase64(pdf) : null
            };

            try {
                let UUID = await addNewSpare(SpareData);
                console.log(UUID)
                let formData = new FormData()
                formData.append('SparePartImage', image);
                formData.append('DrawingImage', pdf);
                formData.append('SparePartId', UUID.SparePartId)
                console.log('ggggggggggggggggggg');


                if (image.size || pdf.size) {
                    let upload = await uploadPDF(formData);
                    console.log(upload)

                }


            } catch (err) {
                console.log(err)
            }
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

    const handleBack = (e) => {
        navigate('/dashboard');
    };

    const getMachineListData = async () => {
        // console.log("hmmmmmmmmmmm");
        // console.log(JSON.parse(localStorage.getItem('MachineId')));
        const url = `http://srv515471.hstgr.cloud:9090/Maintenance/MachineDetailById`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            // console.log('Response:', response); 
            if (response.status === 200 && Array.isArray(response.data)) {
                const machineBody = response.data;
                // machineList(machineBody);
                //setMachineList(machineBody);
                machineData = machineBody.map(machine => ({
                    value: machine.MachineId,
                    label: machine.MachineName
                }));
                console.log(machineData);
                SetMachine(machineData)


            } else {
                console.error('Unexpected response:', response);
                setError('Failed to fetch machine list. Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching machine list:', error.message);
            console.error(error); // Log the full error object
            setError('Failed to fetch machine list. Please check the server configuration.');
        }
    };

    const uploadPDF = async (formData) => {
        console.log("oyeyeyeyyeyeyey")
        // console.log(formData.DrawingImage);



        try {
            const response = await axios.post('http://srv515471.hstgr.cloud:9090/Maintenance/SparePartsImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setIsLoading(false);
                toast.success('Spare Part Added Successfully.', { position: 'top-center' });
                console.log(response.data)
                return response.data;
            } else {
                setIsLoading(false);
                toast.error('Error In Server', { position: 'top-center' });
                return response.data
            }
        } catch (err) {
            setIsLoading(false);
            console.error('Error', err);
            return err;
        }


        console.log('upload pdf & image checking');
        console.log(formData);
    };
    // console.log("arararararra");
    // console.log(MachineNames);
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
                        <div className="system input-text" style={{ width: '400px' }}>
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
                        <div className="system input-text" style={{ width: '400px' }}>
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
                        <div className="system input-text" style={{ width: '410px' }} >
                            <label className="file-label" >Machine Name</label>
                            <Select style={{ color: 'red' }}
                                isMulti
                                value={MachineNames}
                                onChange={(selectedOptions) => setMachineNames(selectedOptions)}
                                placeholder="Select Machine Name"
                                options={Machine}
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

                        <div className="system input-text" >
                            <label className="file-label">Image</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="system input-text" style={{ width: '360px', marginRight: '76vh' }}>
                            <label className="file-label">PDF</label>
                            <input type="file" accept="application/pdf" onChange={handlePdfChange} />
                        </div>
                    </div>
                    <div style={{ marginLeft: '510px' }}>
                        <button type="button" className="btn" onClick={handleBack} style={{ width: '83px', height: '43px', background: '#545454', margin: '24px' }}>Back</button>
                        <button type="submit" className="btn" style={{ width: '83px', height: '43px', background: '#0C53F5', color: 'white' }}>Submit</button>
                    </div>
                </form>

                {error && <p className="error">{error}</p>}
                <ToastContainer position='top-center' />
            </div >
        </div >
    );
};

export default AddSpare;
