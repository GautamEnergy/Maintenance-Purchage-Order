import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button,Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import img1 from "../../Assets/Images/LOGO.png"

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
    const [isLoading, setIsLoading] = useState(false);
    const [Machine, SetMachine] = useState([])
    const [files, setFiles] = useState([]);
    const [EquivalentSpareParts, setEquivalentSpareParts] = useState([]);
    const [EquivalentSparePartsOptions, setEquivalentSparePartsOptions] = useState([]);
    const imageInputRef = useRef(null);
    const pdfInputRef = useRef(null);
    const navigate = useNavigate();

    let machineData = []

    const notifySuccess = () => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const fetchEquivalentSpareParts = async (sparePartName, selectedMachines) => {
        console.log('Fetching equivalent spare parts with parameters:', sparePartName, selectedMachines);
        try {
            const response = await axios.post('http://srv515471.hstgr.cloud:9090/Maintenance/Equ', {
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
        try {
            const response = await fetch('http://srv515471.hstgr.cloud:9090/Maintenance/AddSparePart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SpareData),
            });
            // console.log("jiiiiiaAppppppp");
            // console.log(response)
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
                MachineName: MachineNames.map((el) => { return el.value }),
                CycleTime,
                NumberOfPcs: PCS,
                Equivalent: EquivalentSparePartValues,
                SparePartModelNo,
                Status,
                CurrentUser: personID,
            };

            try {
                let UUID = await addNewSpare(SpareData);
                console.log(UUID)
                let formData = new FormData()
                files.forEach(file => formData.append('SparePartImage', file));

                formData.append('DrawingImage', pdf);
                formData.append('SparePartId', UUID.SparePartId)

                if ((files && files.length > 0) || (pdf && pdf.size > 0)) {
                    let upload = await uploadPDF(formData);
                }
                console.log("spare response")

                setFiles([]);
                setPdf(undefined);

                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
                if (pdfInputRef.current) {
                    pdfInputRef.current.value = '';
                }
                console.log('immage')
                notifySuccess();
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
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
        console.log(formData.SparePartImage);



        try {
            const response = await axios.post('http://srv515471.hstgr.cloud:9090/Maintenance/SparePartsImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setIsLoading(false);
                console.log(response.data)
                console.log('image respnse')
                // navigate('/dashboard');
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
    const inputStyle = {
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '5px'
      };
      const customSelectStyles = {
        control: (base, state) => ({
          ...base,
          height: 'auto',
          minHeight: '40px',
          //borderRadius: '5px',
          backgroundColor: 'white',
          borderColor: '#black',
          borderWidth: '1px',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#0C53F5',
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
        multiValue: (base) => ({
          ...base,
          backgroundColor: '#e0e0e0',
          color: 'black',
          borderRadius: '3px',
          padding: '1px',
          margin: '1px',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: 'black',
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: 'black',
          ':hover': {
            backgroundColor: '#d9534f',
            color: 'white',
          },
        }),
      };

    return (
     
        <Container style ={{marginTop:"12%"}}className="fullPage ">
      <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <Image src={img1} alt="" className="text-center" rounded style={{ width: '14%',marginLeft:"4%" }} />
        <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
  Add New Spare Part
</h2>
        <Form onSubmit={handleSubmit}>
          <div className="subCard2">
            <Row>
              <Col md={4}>
                <Form.Group controlId="MasterSparePartName">
                  <Form.Label  style={{fontWeight:"bold"}}> Master Spare Part Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="MasterSparePartName"
                    value={MasterSparePartName}
                    onChange={(e) => setMasterSparePartName(e.target.value)}
                    placeholder="Master Spare Part Name"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="SparePartName">
                  <Form.Label  style={{fontWeight:"bold"}}>Spare Part Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="SparePartName"
                    value={SparePartName}
                    onChange={handleSparePartNameChange}
                    placeholder="Spare Part Name"
                    required
                    style={inputStyle}
                    
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="SparePartModelNo">
                  <Form.Label  style={{fontWeight:"bold"}}>Spare Part Model Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="SparePartModelNo"
                    value={SparePartModelNo}
                    onChange={(e) => setSparePartModelNo(e.target.value)}
                    placeholder="Spare Part Model Number"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className='py-2' md={4}>
                <Form.Group controlId="Brand">
                  <Form.Label  style={{fontWeight:"bold"}}>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={Brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>

              <Col className='py-2' md={4}>
                <Form.Group controlId="Specification">
                  <Form.Label  style={{fontWeight:"bold"}}>Specification</Form.Label>
                  <Form.Control
                    type="text"
                    name="specification"
                    value={Specification}
                    onChange={(e) => setSpecification(e.target.value)}
                    placeholder="Specification"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>

              <Col className='py-2' md={4}>
                <Form.Group controlId="MachineNames">
                  <Form.Label  style={{fontWeight:"bold"}}>Machine Name</Form.Label>
                  <Select
                    isMulti
                    value={MachineNames}
                    onChange={handleMachineNameChange}
                    placeholder="Select Machine"
                    options={Machine}
                    styles={customSelectStyles}
                    required
                    
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className='py-2' md={4}>
                <Form.Group controlId="PCS">
                  <Form.Label style={{fontWeight:"bold"}}>No.Of pcs Uses In 1 Time</Form.Label>
                  <Form.Control
                    type="number"
                    name="Pieces"
                    value={PCS}
                    onChange={(e) => setPCS(e.target.value)}
                    placeholder="No. Of PCS use in 1 Time"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>

              <Col className='py-2' md={4}>
                <Form.Group controlId="CycleTime">
                  <Form.Label  style={{fontWeight:"bold"}}>Cycle Time in Days</Form.Label>
                  <Form.Control
                    type="number"
                    name="Cycle Time"
                    value={CycleTime}
                    onChange={(e) => setCycleTime(e.target.value)}
                    placeholder="Cycle Time"
                    required
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>

              <Col className='py-2' md={4}>
                <Form.Group controlId="EquivalentSpareParts">
                  <Form.Label  style={{fontWeight:"bold"}}>Equivalent Spare Part</Form.Label>
                  <Select
                    isMulti
                    options={EquivalentSparePartsOptions}
                    onMenuOpen={handleEquivalentSparePartsOpen}
                    value={EquivalentSpareParts}
                    onChange={(selectedOptions) => setEquivalentSpareParts(selectedOptions)}
                    styles={customSelectStyles}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className='py-2' md={4}>
                <Form.Group controlId="Image">
                  <Form.Label  style={{fontWeight:"bold"}}>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                    multiple
                    style={inputStyle}
                  />
                  <div>
                    {files.map((file, index) => (
                      <div key={index}>{/* Display file details or preview here */}</div>
                    ))}
                  </div>
                </Form.Group>
              </Col>

              <Col className='py-2' md={4}>
                <Form.Group controlId="PDF">
                  <Form.Label  style={{fontWeight:"bold"}}>PDF</Form.Label>
                  <Form.Control type="file" accept="application/pdf" onChange={handlePdfChange} ref={pdfInputRef} style={inputStyle} />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" onClick={handleBack} className="me-3">
              Back
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>

        {error && <p className="error">{error}</p>}
        <ToastContainer position='top-center' />
      </div>
    </Container>
    );
};

export default AddSpare;