import React, { useState, useEffect, useRef } from 'react';
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
    const [CycleTime, setCycleTime] = useState('');
    const [PCS, setPCS] = useState('');
    const [MachineNames, setMachineNames] = useState([]);
    const [Status, setStatus] = useState('Active');
    const [MasterSparePartName, setMasterSparePartName] = useState('');
    const [image, setImage] = useState(undefined);
    const [pdf, setPdf] = useState(undefined);
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
    const [files, setFiles] = useState([]);
    const [EquivalentSpareParts, setEquivalentSpareParts] = useState([]);
    const [EquivalentSparePartsOptions, setEquivalentSparePartsOptions] = useState([]);
    const imageInputRef = useRef(null);
    const pdfInputRef = useRef(null);

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
    const fetchEquivalentSpareParts = async (sparePartName, selectedMachines) => {
        console.log('Fetching equivalent spare parts with parameters:', sparePartName, selectedMachines);
        try {
            const response = await axios.post('http://srv515471.hstgr.cloud:8080/Maintenance/Equ', {

                SparePartName: sparePartName,
                MachineName: selectedMachines.map(machine => machine.value)

            });
            const formattedSpareParts = response.data.map(part => ({
                value: part.SparePartId,
                label: part.Value
            }));
            setEquivalentSparePartsOptions(formattedSpareParts);
        } catch (error) {
            console.error('Error fetching equivalent spare parts:', error);
        }
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
            const response = await fetch('http://srv515471.hstgr.cloud:8080/Maintenance/AddSparePart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SpareData),
            });
            console.log("jiiiiiaAppppppp");

            console.log(response)
            if (response.ok) {
                const responseData = await response.json();

                setSparePartName('');
                setSparePartModelNo('');
                setBrand('');
                setSpecification('');
                setMachineNames([]);
                setCycleTime('');
                setPCS('');
                setStatus('Active');
                setMasterSparePartName('');
                setFiles([]);
                setPdf('');
                setError('');
                return responseData;
            } else {
                const errorData = await response.json();
                console.log(errorData)
                if (errorData.msg = 'Duplicate Spare Model Number') {
                    notifyError(errorData.message || 'This Spare Part Model Number already exists');
                } else {
                    notifyError(errorData.message);
                }

            }
        } catch (error) {
            return error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!personID) {
            setError('PersonID is required.');
            return;
        }
        if (SparePartName && SparePartModelNo && Brand && Specification && MachineNames.length > 0 && Status) {
            const EquivalentSparePartValues = EquivalentSpareParts.map(part => part.value);
            console.log("jajajjajaj");
            console.log(EquivalentSparePartValues);
            const SpareData = {
                MasterSparePartName: MasterSparePartName,
                SparePartName,
                SpareNumber: SparePartModelNo,
                BrandName: Brand,
                Specification,
                MachineName: MachineNames.map((el) => {
                    return el.value
                }),
                CycleTime,
                NumberOfPcs: PCS,

                Equivalent: EquivalentSparePartValues,
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
                files.forEach(file => formData.append('SparePartImage', file));
                formData.append('DrawingImage', pdf);
                formData.append('SparePartId', UUID.SparePartId)
                console.log('ggggggggggggggggggg');

                // if (files && pdf && files.size > 0 && pdf.size > 0) {
                //     let upload = await uploadPDF(formData)

                // } else if (files && files.size > 0) {
                //     let upload = await uploadPDF(formData)

                // } else if (pdf && pdf.size > 0) {
                //     let upload = await uploadPDF(formData)
                // }
                if ((files && files.length > 0) || (pdf && pdf.size > 0)) {
                    let upload = await uploadPDF(formData);
                }
                setFiles([]);
                setPdf(undefined);

                // Manually clear file input fields
                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
                if (pdfInputRef.current) {
                    pdfInputRef.current.value = '';
                }
                console.log('immage')
                notifySuccess('Spare Part Added Succesfully')
            } catch (err) {

                console.log(err)
            }
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleImageChange = (event) => {
        const selectedFiles = event.target.files;
        const filesArray = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            filesArray.push(selectedFiles[i]);
        }

        setFiles(filesArray);
    };

    const handlePdfChange = (e) => {
        setPdf(e.target.files[0]);

    };

    const handleBack = (e) => {
        navigate('/dashboard');
    };
    // const handleMachineNameChange = (selectedOptions) => {
    //     setMachineNames(selectedOptions);
    //     if (SparePartName && selectedOptions.length > 0) {
    //         fetchEquivalentSpareParts(SparePartName, selectedOptions);
    //     } else {
    //         setEquivalentSpareParts([]);
    //     }
    // };

    // const handleSparePartNameChange = (e) => {
    //     const { value } = e.target;
    //     setSparePartName(value);
    //     if (value && MachineNames.length > 0) {
    //         fetchEquivalentSpareParts(value, MachineNames);
    //     } else {
    //         setEquivalentSpareParts([]);
    //     }
    // };
    const handleMachineNameChange = (selectedOptions) => {
        setMachineNames(selectedOptions);
    };

    const handleSparePartNameChange = (e) => {
        const { value } = e.target;
        setSparePartName(value);
    };

    const handleEquivalentSparePartsOpen = () => {
        if (SparePartName && MachineNames.length > 0) {
            fetchEquivalentSpareParts(SparePartName, MachineNames);
        }
    };

    const getMachineListData = async () => {
        // console.log("hmmmmmmmmmmm");
        // console.log(JSON.parse(localStorage.getItem('MachineId')));
        const url = `http://srv515471.hstgr.cloud:8080/Maintenance/MachineDetailById`;
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
        console.log(formData.SparePartImage);



        try {
            const response = await axios.post('http://srv515471.hstgr.cloud:8080/Maintenance/SparePartsImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setIsLoading(false);
                console.log(response.data)
                return response.data;
            } else {
                setIsLoading(false);

                return response.data
            }
        } catch (err) {
            setIsLoading(false);
            notifyError('Error, While Sending File')
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
                <h2>Add New Spare Part</h2>
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
                        {/* <div className="system input-text">
                            <label className="file-label">Spare Part Name</label>
                            <input
                                type="text"
                                name="SparePartName"
                                value={SparePartName}
                                onChange={(e) => setSparePartName(e.target.value)}
                                placeholder="Spare Part Name"
                                required
                            /> */}
                        {/* </div> */}
                        <div className="system input-text">
                            <label className="file-label">Spare Part Name</label>
                            <input
                                type="text"
                                name="SparePartName"
                                value={SparePartName}
                                onChange={handleSparePartNameChange}
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
                                //onChange={(selectedOptions) => setMachineNames(selectedOptions)}
                                onChange={handleMachineNameChange}
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
                        <div className="system input-text" style={{ width: '400px' }}>
                            <label className="file-label">No. Of PCS Uses In One Time</label>
                            <input
                                type="number"
                                name="Pieces"
                                value={PCS}
                                onChange={(e) => setPCS(e.target.value)}
                                placeholder="No. Of PCS use in 1 Time"
                                required
                            />
                        </div>
                        <div className="system input-text" style={{ width: '400px' }}>
                            <label className="file-label">Cycle Time in Days</label>
                            <input
                                type="number"
                                name="Cycle Time"
                                value={CycleTime}
                                onChange={(e) => setCycleTime(e.target.value)}
                                placeholder="Cycle Time"
                                required
                            />
                        </div>
                        <div className="system input-text" style={{ width: '410px' }}>
                            <label className="file-label">Equivalent SparePart</label>
                            <Select
                                isMulti
                                options={EquivalentSparePartsOptions}
                                onMenuOpen={handleEquivalentSparePartsOpen}
                                value={EquivalentSpareParts}
                                onChange={(selectedOptions) => setEquivalentSpareParts(selectedOptions)}
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
                            />
                        </div>
                        <div className="system input-text">
                            <label className="file-label">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={imageInputRef}
                                multiple
                            />
                            <div>
                                {files.map((file, index) => (
                                    <div key={index}>


                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="system input-text" style={{ width: '360px', marginRight: '76vh' }}>
                            <label className="file-label">PDF</label>
                            <input type="file" accept="application/pdf" onChange={handlePdfChange} ref={pdfInputRef} />
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