import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../../Assets/Images/LOGO.png"
import { AppContext } from '../../ContextAPI';
import Loader from '../Loader/Loader';

const AddSpare = () => {
  const { token, setToken } = useContext(AppContext)
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
  const [EquivalentSpareParts, setEquivalentSpareParts] = useState();
  const [EquivalentSparePartsOptions, setEquivalentSparePartsOptions] = useState([]);
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [pdfData, setpdfData] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [Code, setCode] = useState("");
  const [loading, setLoading] = useState();
  const [fileName, setFileName] = useState('');
  const [equivalentId, setEquivalentId] = useState('');
  const location = useLocation();
  const { SparPartId } = location.state || {};
  const [Quantity, setQuantity] = useState('');

  // console.log(token);
  useEffect(() => {

    console.log("Raaj,,,,,,,,", EquivalentSpareParts);
    const personID = localStorage.getItem("CurrentUser");
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("URL Kya hai.....?", url);
    setUrl(url);

    if (personID) {
      setPersonID(personID);
    }

    if (token) {
      setToken(token);
    }
    console.log('URL CHECK');
    console.log(url);
    getMachineListData();


  }, []);

  let machineData = []


  const notifySuccess = () => toast.success(SparPartId ? "Spare Part Update Successfully!" : "New Spare Part Added Successfully!", { autoClose: 5000 });

  const notifyError = (message) => toast.error(message, { autoClose: 5000 });

  const fetchEquivalentSpareParts = async (sparePartName, selectedMachines, EquivalentId) => {

    try {
      const url = localStorage.getItem('url');
      const response = await axios.post(`${url}/Maintenance/Equ`, {
        SparePartName: sparePartName,
        MachineName: selectedMachines.map(machine => machine.value)



      });
      const formattedSpareParts = response.data.map(part => ({
        value: part.SparePartId,
        label: part.Value
      }));
      setEquivalentSparePartsOptions(formattedSpareParts);
      if (SparPartId) {
        console.log("equivalentId......... bhanu", EquivalentId);
        const formatedEquivalentData = formattedSpareParts.filter(item => EquivalentId.includes(item.value));
        console.log("formatedEquivalentData Bhanu.......", formatedEquivalentData);
        setEquivalentSpareParts(formatedEquivalentData);
      }


    } catch (error) {
      console.error('Error fetching equivalent spare parts:', error);
    }
  };

  // Get Spare Part By Id

  const extractLast15Digits = (url) => {
    // Extract the file name part from the URL
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.pdf'));

    // Extract the last 15 characters
    const last15Digits = fileName.slice(-15);

    return last15Digits;
  };

  const getSparePartData = async () => {




    try {

      setLoading(true);
      const url = localStorage.getItem('url');
      const response = await axios.post(
        `${url}/Maintenance/GetSpecificSparePart`,
        { SparePartId: SparPartId }
      );


      const sparePartData = response.data.data[0];
      console.log('jjjjjjjjjjj', sparePartData);
      console.log('spare Part name', sparePartData.SparePartName);
      setMasterSparePartName(sparePartData.MasterSparePartName || '');
      setSparePartName(sparePartData.SparePartName || '');
      setSparePartModelNo(sparePartData.SpareNumber || '');
      setBrand(sparePartData.BrandName || '');
      setSpecification(sparePartData.Specification || '');
      setPCS(sparePartData.NumberOfPcs || '');
      setCycleTime(sparePartData.CycleTime || '');
      setCode(sparePartData.HSNCode || '');
      setQuantity(sparePartData.MinimumQuantityRequired || '');





      setEquivalentId(sparePartData.Equivalent);
      setpdfData(sparePartData.SparePartImageURL || [])

      // console.log('kkkkkkkkkkkkkkkkkkk')
      // console.log(sparePartData.SparePartImageURL);




      const machineIdsArray = sparePartData.MachineId.map(machine => machine.MachineId);
      const machineName = machineData.filter(item => machineIdsArray.includes(item.value));
      console.log('tttttttttt');


      setMachineNames(machineName);
      // console.log('uuuuuuuuuuuuuuuuuuuuu', sparePartData);

      const last15Digits = extractLast15Digits(sparePartData.SparePartDrawingImageURL);
      setFileName(last15Digits || '');
      console.log("Helllllllll", last15Digits);

      if (sparePartData.SparePartName && machineName.length > 0) {
        fetchEquivalentSpareParts(sparePartData.SparePartName, machineName, sparePartData.Equivalent);
      }


      setLoading(false);
    } catch (error) {
      console.error('Error fetching machine data:', error);
      setLoading(false);
    }
  };



  const addNewSpare = async (SpareData) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/Maintenance/AddSparePart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SpareData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSparePartName('');
        setSparePartModelNo('');
        setBrand('');
        setSpecification('');
        setMachineNames([]);
        setCycleTime('');
        setQuantity('');
        setPCS('');
        setStatus('Active');
        setMasterSparePartName('');
        setFiles([]);
        setPdf('');
        setError('');
        return responseData;

      } else {
        setLoading(false);
        const errorData = await response.json();
        console.log(errorData)
        if (errorData.msg = 'Duplicate Spare Model Number') {
          notifyError(errorData.message || 'This Spare Part Model Number already exists');
        } else {
          notifyError(errorData.message);
        }
      }
    } catch (error) {
      setLoading(false);
      return error
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personID) {
      setError('PersonID is required.');
      return;
    }
    const newFieldErrors = {};
    if (!MasterSparePartName) newFieldErrors.MasterSparePartName = 'Master spare part name is required';
    if (!SparePartName) newFieldErrors.SparePartName = 'Spare part name is required';
    if (!SparePartModelNo) newFieldErrors.SparePartModelNo = 'Model number is required';
    if (!Brand) newFieldErrors.Brand = 'Brand is required';
    if (!Specification) newFieldErrors.Specification = 'Specification is required';
    if (MachineNames.length === 0) newFieldErrors.MachineNames = 'Machine name is required';
    if (!CycleTime) newFieldErrors.CycleTime = 'Cycle time is required';
    if (!Quantity) newFieldErrors.Quantity = 'Quantity  is required';
    if (!PCS) newFieldErrors.PCS = 'PCS is required';

    setFieldErrors(newFieldErrors);
    // if (SparePartName && SparePartModelNo && Brand && Specification && MachineNames.length > 0 && Status) {
    if (Object.keys(newFieldErrors).length === 0) {
      // const EquivalentSparePartValues = EquivalentSpareParts.map(part => part.value);
      const machineNamesArray = Array.isArray(MachineNames) ? MachineNames : [];
      const EquivalentSparePartValues = Array.isArray(EquivalentSpareParts) ? EquivalentSpareParts.map(part => part.value) : [];

      const SpareData = {
        SparePartId: SparPartId ? SparPartId : "",
        MasterSparePartName: MasterSparePartName,
        SparePartName,
        SpareNumber: SparePartModelNo,
        BrandName: Brand,
        Specification,
        MachineName: MachineNames.map((el) => { return el.value }),
        CycleTime,
        Quantity: Quantity ? Quantity : "",
        NumberOfPcs: PCS,
        HSNCode: Code,
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
        console.log("FormData", FormData)

        if ((files && files.length > 0) || (pdf && pdf.size > 0)) {
          let upload = await uploadPDF(formData);
        } else {
          notifySuccess();
          setTimeout(() => {
            setLoading(false);
            navigate('/sparepartlist');
          }, 1000);
        }
        console.log("spare response")

        // setFiles([]);
        // setPdf(undefined);

        // if (imageInputRef.current) {
        //   imageInputRef.current.value = '';
        // }
        // if (pdfInputRef.current) {
        //   pdfInputRef.current.value = '';
        // }
        // console.log(SpareData)
        // notifySuccess();
        // setTimeout(() => {
        //   navigate('/dashboard');
        // }, 1000);
      } catch (err) {

        console.log(err)
      }
    } else {
      // setError('Please fill in all required fields.');
    }
  };

  const handleFieldChange = (field, value) => {
    const newFieldErrors = { ...fieldErrors };

    if (!value || (Array.isArray(value) && value.length === 0)) {
      newFieldErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    } else {
      delete newFieldErrors[field];
    }

    setFieldErrors(newFieldErrors);
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
    if (pdf) {
      setFileName(pdf.name);
    }
  };

  const handleBack = (e) => {
    navigate('/sparepartlist');
  };

  const handleMachineNameChange = (selectedMachines) => {
    // console.log("Machine Name....................?", selectedMachines);
    setMachineNames(selectedMachines);
    handleFieldChange('MachineNames', selectedMachines);
    console.log('ddddddddddddddddddddddd', selectedMachines);
  };

  const handleSparePartNameChange = (e) => {
    const { value } = e.target;
    setSparePartName(value);
    handleFieldChange('SparePartName', e.target.value);

  };

  const handleEquivalentSparePartsOpen = () => {
    if (SparePartName && MachineNames.length > 0) {
      fetchEquivalentSpareParts(SparePartName, MachineNames);
    }
  };


  const handleEquivalentChange = (selectedOptions) => {
    console.log("Equivalent Name....................?", selectedOptions);
    setEquivalentSpareParts(selectedOptions)

  };


  const getMachineListData = async () => {
    const url = localStorage.getItem('url');
    console.log("hmmmmmmmmmmm");
    console.log(url);
    console.log(token);
    // const url = `${url}/Maintenance/MachineDetailById`;
    try {
      const response = await axios.get(`${url}/Maintenance/MachineDetailById`, {
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
        console.log("MachData.......", machineData);
        SetMachine(machineData)

        if (SparPartId) {
          getSparePartData();
        }


        // const itemIds = [
        //   '143cd0ea-fa88-4164-9a04-eb1cf1b8d782',
        //   '2b6c90b8-9828-4b24-92da-e8290945fe94'
        // ]

        // setMachineNames(machineData.filter(item => itemIds.includes(item.value)));


        //  console.log("formated Data...ASAS..?", filteredData);


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
      const response = await axios.post(`${url}/Maintenance/SparePartsImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        console.log(response.data)
        console.log('image respnse')
        notifySuccess();
        setTimeout(() => {
          setLoading(false);
          navigate('/sparepartlist');
        }, 1000);
        return response.data;
      } else {
        setIsLoading(false);

        return response.data
      }

    } catch (err) {
      setIsLoading(false);
      notifyError('Error, While Sending File')
      setLoading(false)
      console.error('Error', err);
      return err;
    }


    console.log('upload pdf & image checking');
    console.log(formData);
  };
  const inputStyle = {
    borderColor: 'black',
    borderWidth: '1px',
    borderRadius: '5px',
    boxShadow: 'none'
  };
  const inputStyles = {
    borderColor: 'red',
    borderWidth: '1px',
    borderRadius: '5px',
    boxShadow: 'none'
  };
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      height: 'auto',
      minHeight: '40px',
      width: '100%',
      maxWidth: '300px',
      //borderRadius: '5px',
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: '1px',
      boxShadow: 'none',

    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'black',
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
      maxWidth: '100%',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'black',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'black',
      ':hover': {
        backgroundColor: 'black',
        color: 'black',
      },
    }),
  };
  const customSelectStyles1 = {
    control: (base, state) => ({
      ...base,
      height: 'auto',
      minHeight: '40px',
      //borderRadius: '5px',
      backgroundColor: 'white',
      borderColor: 'red',
      borderWidth: '1px',
      boxShadow: 'none',

    }),
  }

  return (

    <Container style={{ marginTop: "12%", maxWidth: "750px" }} className="fullPage ">
      <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {loading && (
          <div className="loader-overlay">
            <Loader type="ThreeDots" color="#006bff" height={80} width={80} />
          </div>
        )}
        <div className={`form-content ${loading ? 'blurred' : ''}`}>
          <Image src={img1} alt="" className="text-center" rounded style={{ width: '14%', marginLeft: "43%" }} />
          <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            {SparPartId ? "Edit Spare Part" : "Add New Spare Part"}
          </h2>
          <Form onSubmit={handleSubmit}>
            <div className="subCard2">
              <Row>
                <Col md={4}>
                  <Form.Group controlId="MasterSparePartName">
                    <Form.Label style={{ fontWeight: "bold" }}> Master Spare Part Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="MasterSparePartName"
                      value={MasterSparePartName}
                      onChange={(e) => {
                        setMasterSparePartName(e.target.value)
                        handleFieldChange('MasterSparePartName', e.target.value);
                      }}
                      placeholder="Master Spare Part Name"
                      // required
                      style={!fieldErrors.MasterSparePartName ? inputStyle : inputStyles}
                    />
                    {fieldErrors.MasterSparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MasterSparePartName}</div>}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="SparePartName">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="SparePartName"
                      value={SparePartName}
                      onChange={handleSparePartNameChange}
                      placeholder="Spare Part Name"
                      // required
                      style={!fieldErrors.SparePartName ? inputStyle : inputStyles}

                    />
                    {fieldErrors.SparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartName}</div>}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="SparePartModelNo">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="SparePartModelNo"
                      value={SparePartModelNo}
                      onChange={(e) => {
                        setSparePartModelNo(e.target.value)
                        handleFieldChange('SparePartModelNo', e.target.value);
                      }}
                      placeholder="Spare Part Model Number"
                      // required
                      style={!fieldErrors.SparePartModelNo ? inputStyle : inputStyles}
                    />
                    {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="Brand">
                    <Form.Label style={{ fontWeight: "bold" }}>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={Brand}
                      onChange={(e) => {
                        setBrand(e.target.value)
                        handleFieldChange('Brand', e.target.value);
                      }}
                      placeholder="Brand"
                      //  required
                      style={!fieldErrors.Brand ? inputStyle : inputStyles}

                    />
                    {fieldErrors.Brand && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Brand}</div>}

                  </Form.Group>
                </Col>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="Specification">
                    <Form.Label style={{ fontWeight: "bold" }}>Specification</Form.Label>
                    <Form.Control
                      type="text"
                      name="specification"
                      value={Specification}
                      onChange={(e) => {
                        setSpecification(e.target.value)
                        handleFieldChange('Specification', e.target.value);
                      }}
                      placeholder="Specification"
                      //  required
                      style={!fieldErrors.Specification ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Specification && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Specification}</div>}
                  </Form.Group>
                </Col>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="MachineNames">
                    <Form.Label style={{ fontWeight: "bold" }}>Machine Name</Form.Label>
                    <Select
                      isMulti
                      value={MachineNames}

                      onChange={handleMachineNameChange}
                      placeholder="Select Machine"
                      options={Machine}
                      styles={!fieldErrors.MachineNames ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.MachineNames && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineNames}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="PCS">
                    <Form.Label style={{ fontWeight: "bold" }}>No.Of pcs Uses In 1 Time</Form.Label>
                    <Form.Control
                      type="number"
                      name="Pieces"
                      value={PCS}
                      onChange={(e) => {
                        setPCS(e.target.value)
                        handleFieldChange('PCS', e.target.value);
                      }}
                      placeholder="No. Of PCS use in 1 Time"
                      //   required
                      style={!fieldErrors.PCS ? inputStyle : inputStyles}
                    />
                    {fieldErrors.PCS && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PCS}</div>}

                  </Form.Group>
                </Col>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="CycleTime">
                    <Form.Label style={{ fontWeight: "bold" }}>Cycle Time in Days</Form.Label>
                    <Form.Control
                      type="number"
                      name="Cycle Time"
                      value={CycleTime}
                      onChange={(e) => {
                        setCycleTime(e.target.value)
                        handleFieldChange('CycleTime', e.target.value);
                      }}
                      placeholder="Cycle Time"
                      //     required
                      style={!fieldErrors.CycleTime ? inputStyle : inputStyles}
                    />
                    {fieldErrors.CycleTime && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.CycleTime}</div>}
                  </Form.Group>
                </Col>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="EquivalentSpareParts">
                    <Form.Label style={{ fontWeight: "bold" }}>Equivalent Spare Part</Form.Label>
                    <Select
                      isMulti
                      options={EquivalentSparePartsOptions}
                      onMenuOpen={handleEquivalentSparePartsOpen}
                      value={EquivalentSpareParts}
                      onChange={handleEquivalentChange}
                      // onChange={(selectedOptions) => setEquivalentSpareParts(selectedOptions)}
                      styles={customSelectStyles}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className='py-2' md={6}>
                  <Form.Group controlId="Code">
                    <Form.Label style={{ fontWeight: "bold" }}>HSN/SAC Code</Form.Label>
                    <Form.Control
                      type="Text"
                      name="Pieces"
                      value={Code}
                      onChange={(e) => {
                        setCode(e.target.value)
                        handleFieldChange('Code', e.target.value);
                      }}
                      placeholder="Enter HSN/SAC Code"
                      //   required
                      style={inputStyle}
                    />


                  </Form.Group>
                </Col>


                <Col className='py-2' md={6}>
                  <Form.Group controlId="Quantity">
                    <Form.Label style={{ fontWeight: "bold" }}>Minimum Qunatity Required in Pcs</Form.Label>
                    <Form.Control
                      type="number"
                      name="Minimum Quantity"
                      value={Quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value)
                        handleFieldChange('Quantity', e.target.value);
                      }}
                      placeholder="Minimum Qunatity"
                      //     required
                      style={!fieldErrors.Quantity ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Quantity && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Quantity}</div>}
                  </Form.Group>
                </Col>



              </Row>

              <Row>
                <Col className='py-2' md={6}>
                  <Form.Group controlId="Image">
                    <Form.Label style={{ fontWeight: "bold" }}>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={imageInputRef}
                      multiple
                      style={{ border: '1px solid #ced4da', borderRadius: '.25rem', padding: '.375rem .75rem' }}
                    />
                    <div className="mt-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {pdfData?.map((file, index) => (
                        <img
                          key={index}
                          src={file}
                          alt={`preview-${index}`}
                          style={{ width: '30px', height: '30px', objectFit: 'cover' }} // Adjust dimensions as needed
                        />
                      ))}
                    </div>

                  </Form.Group>
                </Col>

                <Col className='py-2' md={6}>
                  <Form.Group controlId="PDF">
                    <Form.Label style={{ fontWeight: "bold" }}>PDF</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      ref={pdfInputRef}
                      style={inputStyle}
                    />
                    <div>{fileName}</div>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <Row>
              <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="button" className="register" onClick={handleBack} style={{ width: '83px', height: '43px', background: '#545454', margin: '10px' }}>Back</Button>
                <Button type="submit" className="register" style={{ width: '83px', height: '43px', background: '#006bff', margin: '10px' }}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </div>
        {/* {error && <p className="error">{error}</p>} */}
        <ToastContainer position='top-center' />
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

export default AddSpare;