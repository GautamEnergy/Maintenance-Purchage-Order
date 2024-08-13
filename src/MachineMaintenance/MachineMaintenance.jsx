import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../Assets/Images/LOGO.png"
import { AppContext } from '../ContextAPI';
import "./Maintenance.css"
// import Loader from '../Loader/Loader';

const MachineMaintenance = () => {
  const { token, setToken } = useContext(AppContext)



  const [Status, setStatus] = useState('Active');

  const [image, setImage] = useState(undefined);

  const [error, setError] = useState('');
  const [personID, setPersonID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Machine, SetMachine] = useState([])




  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState();



  // New State
  const [MachineName, setMachineName] = useState(null);
  const [showLineOptions, setShowLineOptions] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [Issue, setIssue] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [TimeTaken, setTimeTaken] = useState('');
  const [SparePartModelNo, setSparePartModelNo] = useState(null);
  const [ModelNo, setModelNo] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Process, setProcess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [fileName, setFileName] = useState('');
  const [MachineNumber, setMachineNumber] = useState('');
  const [SparePartName, setSparePartName] = useState('');
  const [showLineModal, setShowLineModal] = useState(false);
  const [Stock, setStock] = useState('')
  const [selectedChambers, setSelectedChambers] = useState([]);
  const [showChamberModal, setShowChamberModal] = useState(false);
  const [remarks , setRemarks] = useState("");




  const fileInputRef = useRef(null);
  const LineOptions = [
    { value: 'LineA', label: 'Line A' },
    { value: 'LineB', label: 'Line B' },
    { value: 'None', label: 'None' }
  ]
  const ChamberOptions = [
    { value: 'Chamber1', label: 'Chamber 1' },
    { value: 'Chamber2', label: 'Chamber 2' },
    { value: 'Chamber3', label: 'Chamber 3' },
    { value: 'Chamber4', label: 'Chamber 4' }
  ];

  useEffect(() => {


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
  const getMachineListData = async () => {
    const url = localStorage.getItem('url');
    console.log("hmmmmmmmmmmm");
    console.log(url);
    console.log(token);
    // const url = `${url}/Maintenance/MachineDetailById`;
    try {
      const response = await axios.get(`${url}/Maintenance/MachineList`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        const machineBody = response.data.data;

        const machineData = machineBody.map(machine => ({
          MachineId: machine.MachineId,
          MachineName: machine.MachineName,
          MachineNumber: machine.MachineNumber
        }));

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

  useEffect(() => {
    const personID = localStorage.getItem("CurrentUser");
    setPersonID(personID)


    // const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    setUrl(url);

  }, []);

  
  const getSparePartModelListData = async (Machinename) => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching spare part model list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.post(`${url}/Maintenance/GetStockByMachine`, { MachineName: Machinename }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const sparePartModels = response.data.map(part => ({
          value: part.Spare_Part_Id,
          label: part.SpareNumber,
          SparePartName: part.SparePartName,
          Available_Stock: part.Available_Stock
        }));
        setModelNo(sparePartModels);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching spare part model list:', error.message);
      console.error(error); // Log the full error object
    }
  };
 

  const notifySuccess = () => toast.success("Spare Part In Added Successfully!", { autoClose: 5000 });
  const notifyError = (message) => toast.error(message, { autoClose: 5000 });


 
  const addSparePartIn = async (data) => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("jiiiii")
    try {
      // setLoading(true);
      const response = await axios.post(`${url}/Maintenance/SparePartOut`, data, {

        headers: {
          'Content-Type': 'application/json',
        },

      });
      console.log("responsebhanu", response.status)
      if (response.status === 200) {
        console.log("responsebhanusaif", response)
        const responseData = response.data.data[0];
        console.log("responseData", responseData)

        return responseData;

      } else {
        // setLoading(false);
        const errorData = await response.json();
        console.log(errorData)

      }
    } catch (error) {
      // setLoading(false);
      return error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personID) {
      setError('PersonID is required.');
      console.log("Errorrrrrrrs")
      return;
    }
    console.log("Errorrrrrrr")

    const newFieldErrors = {};
    if (!MachineName) newFieldErrors.MachineName = 'Machine Name is required';
    if (MachineNumber.length === 0) newFieldErrors.MachineNumber = 'Machine Number number is required';
    if (!Issue) newFieldErrors.Issue = 'Issue is required';
    if (!StartTime.length) newFieldErrors.StartTime = 'Start Time is required';
    if (!EndTime.length) newFieldErrors.EndTime = 'End Time is required';
    if (!TimeTaken) newFieldErrors.TimeTaken = 'Time Taken is required';
    if (!Process) newFieldErrors.Process = 'Process is required';
    setFieldErrors(newFieldErrors);


    if (Object.keys(newFieldErrors).length === 0) {
      setLoading(true)

      const data = {
        CreatedBy: personID,
        MachineName: MachineName.value?MachineName.value:"",
        Line: selectedLine?selectedLine:"", 
        Chamber: selectedChambers.map(chamber => ({
          Chamber1: chamber.chamberId,
          ChamberQuantity: chamber.chamberDetails 
        })),

        Issue: Issue,
        BreakDownStartTime: StartTime,
        BreakDownEndTime: EndTime,
        BreakDownTotalTime: TimeTaken,
        SparePartModelNumber: SparePartModelNo?.value??"", 

        Quantity: Quantity,
        SolutionProcess: Process,

        Status: "Active"
      };

      console.log("Inserting", data)
      console.log()
   
      try {
        let UUID = await addSparePartIn(data);
         console.log("uuid",UUID)
        let formData = new FormData()

        formData.append('MachineMaintenancePdf',image);
        formData.append('SparePartId', UUID.stockCheck)

        if ( (image && image.size > 0)) {
          let upload = await uploadPDF(formData);
          console.log("Upload response", upload);
        } else {
          notifyError('Error,Please Enter Valid Invoice PDF ')

          // notifySuccess();

        }
        console.log("spare response");

      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Validation errors:", newFieldErrors);
    }




  };
  const handleFieldChange = (field, value) => {
    const newFieldErrors = { ...fieldErrors };
    if (!value) {
      newFieldErrors[field] = `${field.replace('machine', '').replace(/([A-Z])/g, ' $1')} is required`;
    } else {
      delete newFieldErrors[field];
    }
    setFieldErrors(newFieldErrors);
    setError('');
  };

 
  const handleBack = (e) => {
    navigate('/');
  };

  const handleMachineNameChange = (selectedMachine) => {
    console.log("Machine Name....................?", selectedMachine);
    setMachineName(selectedMachine);
    if (selectedMachine && selectedMachine.label === 'Stringer(AMO50FS)-2'||
      selectedMachine && selectedMachine.label === 'Stringer(AMO50FS)-1'||
      selectedMachine && selectedMachine.label === 'Stringer(AMO50FS)-3'||
      selectedMachine && selectedMachine.label === 'Stringer(MS40K)-1'||
      selectedMachine && selectedMachine.label === 'Stringer(MS40K)-2'
    ) {
      setShowLineModal(true); 
    } else if (selectedMachine && selectedMachine.label === 'Laminator (Jinchen)'||
      selectedMachine && selectedMachine.label === 'Laminator (GMEE)') {
      setShowChamberModal(true); 
    } else {
      setSelectedLine(null); 
      setSelectedChambers([]); 
    }
    handleFieldChange("MachineName", MachineName)

    console.log(selectedMachine.label);

    const selectedMachineData = Machine.find(machine => machine.MachineId === selectedMachine.value);

    if (selectedMachineData) {
      setMachineNumber(selectedMachineData.MachineNumber);
      setFieldErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.MachineNumber;

        return newErrors;
      });
    }
 
    getSparePartModelListData(selectedMachine.label)
   
  };
  const handleLineChange = (selectedOption) => {
    setSelectedLine(selectedOption ? selectedOption.value : null);
  };
  const handleChamberChange = (e) => {
    const { value, checked } = e.target;
    setSelectedChambers(prev => {
        if (checked) {
            // Add selected chamber with empty details
            return [...prev, { chamberId: value, chamberDetails: '' }];
        } else {
            // Remove deselected chamber
            return prev.filter(chamber => chamber.chamberId !== value);
        }
    });
};





  const handleModalClose = () => {
    setShowLineModal(false);
    setShowChamberModal(false) // Close the modal without selecting a line
  };
  const handleOkClick = () => {
    if (!selectedLine) {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        selectedLine: 'Please select a line before proceeding.',
      }));
    } else {
      setFieldErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.selectedLine;
        return newErrors;
      });
      setShowLineModal(false); // Close the modal if validation passes
      console.log('Selected Line:', selectedLine);
    }
  };

  const handleChamberOkClick = () => {
    if (selectedChambers.length === 0) {
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            selectedChambers: 'Please select at least one chamber before proceeding.',
        }));
        return;
    }

    let incompleteDetails = false;

    const updatedChambers = selectedChambers.map(chamber => {
        const chamberDetailElement = document.getElementById(`${chamber.chamberId}Field`);
        const chamberDetails = chamberDetailElement ? chamberDetailElement.value.trim() : '';

        if (!chamberDetails) {
            incompleteDetails = true;
        }

        return {
            chamberId: chamber.chamberId,
            chamberDetails: chamberDetails,
        };
    });

    if (incompleteDetails) {
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            selectedChambers: 'Please fill out all details for the selected chambers.',
        }));
    } else {
        setSelectedChambers(updatedChambers);
        setFieldErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors.selectedChambers;
            return newErrors;
        });
        setShowChamberModal(false);
        console.log('Selected Chambers with details:', updatedChambers);
    }
};


  const handleSparePartModelChange = (selectedOption) => {
    console.log("Selected Spare Part Model:", selectedOption);

    // Update state and clear relevant fields
    setSparePartModelNo(selectedOption);
    const selectedSparePart = ModelNo.find(part => part.value === selectedOption.value);
    if (selectedSparePart) {
      setSparePartName(selectedSparePart.SparePartName);
      setStock(selectedSparePart.Available_Stock)
      setFieldErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.SparePartName;

        return newErrors;
      });



    }
  }

      const uploadPDF = async (formData) => {
        console.log("oyeyeyeyyeyeyey")
        console.log(formData);



        try {
          const response = await axios.post(`${url}/Maintenance/SparePartsImage`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status === 200) {
           // setIsLoading(false);

            notifySuccess();
            setTimeout(() => {
              setLoading(false);
              navigate('/spareinList');
            }, 1000);
            return response.data;
          } else {
            notifyError('Error, Error On Server')


            return response.data
          }

        } catch (err) {
          setIsLoading(false);
           notifyError('Error, While Sending File')
          console.error('Error', err);
          return err;
        }



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

      backgroundColor: 'white',
      borderColor: 'red',
      borderWidth: '1px',
      boxShadow: 'none',

    }),
  }
  const handleTimeChange = (e, fieldName) => {
    const value = e.target.value;
    const timeRegex = /^[0-2]\d:[0-5]\d$/;

    if (!timeRegex.test(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: 'Invalid time format (HH:MM)',
      }));
    } else {
      const [hours, minutes] = value.split(':').map(Number);
      if (hours < 0 || hours > 23) {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldName]: 'Hours must be between 00 and 23',
        }));
      } else if (minutes < 0 || minutes > 59) {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldName]: 'Minutes must be between 00 and 59',
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldName]: null,
        }));
      }
    }

    if (fieldName === 'StartTime') {
      setStartTime(value);
    } else if (fieldName === 'EndTime') {
      setEndTime(value);
    }
    if (fieldName === 'StartTime' && EndTime) {
      calculateTimeTaken(value, EndTime);
    } else if (fieldName === 'EndTime' && StartTime) {
      calculateTimeTaken(StartTime, value);
    }
  };
  const calculateTimeTaken = (start, end) => {
    if (start && end) {
      try {
        const startDateTime = new Date(`2024-01-01T${start}:00`);
        const endDateTime = new Date(`2024-01-01T${end}:00`);

        const difference = endDateTime - startDateTime;
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeTaken(`${hours} hours and ${minutes} minutes`);
        setFieldErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.TimeTaken;

          return newErrors;
        });
      } catch (error) {
        console.error('Invalid time format:', error);
        setTimeTaken('');
      }
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file)

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setFieldErrors((prev) => ({
          ...prev,
          fileInputRef: 'Only image files are allowed',
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          fileInputRef: null,
        }));
        setFileName(file.name);

      }
    }
  };

  return (

    <Container style={{ marginTop: "12%", maxWidth: "750px" }} className="fullPage ">
      <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {loading && (
          <div className="loader-overlay">
            {/* <Loader type="ThreeDots" color="#006bff" height={80} width={80} /> */}
          </div>
        )}
        <div className={`form-content ${loading ? 'blurred' : ''}`}>
          <Image src={img1} alt="" className="text-center" rounded style={{ width: '14%', marginLeft: "43%" }} />
          <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            Machine Maintenance
          </h2>
          <Form onSubmit={handleSubmit}>
            <div className="subCard2">
              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="MachineName">
                    <Form.Label style={{ fontWeight: "bold" }}>Machine Name</Form.Label>
                    <Select

                      value={MachineName}

                      onChange={handleMachineNameChange}
                      placeholder="Select Machine Name"
                      options={Machine.map(machine => ({
                        value: machine.MachineId,
                        label: machine.MachineName
                      }))}
                      styles={!fieldErrors.MachineName ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.MachineName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineName}</div>}
                  </Form.Group>
                </Col>
                <Modal show={showLineModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Select Line</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Select
                      value={LineOptions.find(option => option.value === selectedLine)}
                      onChange={handleLineChange}
                      options={LineOptions}
                      placeholder="Select Line"
                    />
                    {fieldErrors.selectedLine && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.selectedLine}</div>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleOkClick}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Modal For Chamber */}
                <Modal show={showChamberModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Select Chambers</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {ChamberOptions.map(chamber => (
                      <Row key={chamber.value} className="mb-2 align-items-center">
                        <Col xs={5}>
                          <Form.Check
                            type="checkbox"
                            id={chamber.value}
                            label={chamber.label}
                            value={chamber.value}
                            checked={selectedChambers.some(selected => selected.chamberId === chamber.value)}
                            onChange={handleChamberChange}
                          />
                        </Col>
                        <Col xs={7}>
                          {selectedChambers.some(selected => selected.chamberId === chamber.value) && (
                            <Form.Group controlId={`${chamber.value}Field`}>
                              <Form.Control
                                type="text"
                                placeholder={`Enter details for ${chamber.label}`}
                                value={selectedChambers.find(selected => selected.chamberId === chamber.value)?.chamberDetails || ''}
                                onChange={(e) => {
                                  const details = e.target.value;
                                  setSelectedChambers(prev => prev.map(ch =>
                                    ch.chamberId === chamber.value
                                      ? { ...ch, chamberDetails: details }
                                      : ch
                                  ));
                                }}
                              />
                            </Form.Group>
                          )}
                        </Col>
                      </Row>
                    ))}


                    {fieldErrors.selectedChambers && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.selectedChambers}</div>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleChamberOkClick}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Col md={4}>
                  <Form.Group controlId="MachineNumber">
                    <Form.Label style={{ fontWeight: "bold" }}>Machine Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="MachineNumber"
                      value={MachineNumber}
                      //   onChange={handleIssue}
                      placeholder="Machine Number"

                      // required
                      style={!fieldErrors.MachineNumber ? inputStyle : inputStyles}

                    />
                    {fieldErrors.MachineNumber && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineNumber}</div>}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="Issue">
                    <Form.Label style={{ fontWeight: "bold" }}>Issue</Form.Label>
                    <Form.Control
                      type="text"
                      name="Issue"
                      value={Issue}
                      onChange={(e) => {
                        setIssue(e.target.value)
                        handleFieldChange('Issue', e.target.value);
                      }}
                      placeholder="Issue"

                      // required
                      style={!fieldErrors.Issue ? inputStyle : inputStyles}

                    />
                    {fieldErrors.Issue && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Issue}</div>}
                  </Form.Group>
                </Col>

              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="StartTime">
                    <Form.Label style={{ fontWeight: "bold" }}>BreakDown Start Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="StartTime"
                      value={StartTime}
                      onChange={(e) => handleTimeChange(e, 'StartTime')}
                      placeholder="e.g., 18:05 (HH:MM)"

                      // required
                      style={!fieldErrors.StartTime ? inputStyle : inputStyles}

                    />
                    {fieldErrors.StartTime && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.StartTime}</div>}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="EndTime">
                    <Form.Label style={{ fontWeight: "bold" }}>BreakDown End Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="EndTime"
                      value={EndTime}
                      onChange={(e) => handleTimeChange(e, 'EndTime')}
                      placeholder="e.g., 18:05 (HH:MM)"
                      // required
                      style={!fieldErrors.EndTime ? inputStyle : inputStyles}

                    />
                    {fieldErrors.EndTime && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.EndTime}</div>}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="EndTime">
                    <Form.Label style={{ fontWeight: "bold" }}>Total BreakDown Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="timeTaken"
                      value={TimeTaken}
                      //   onChange={handleTimeTaken}
                      placeholder="Maintenance Time Taken"
                      readOnly="true"
                      // required
                      style={!fieldErrors.TimeTaken ? inputStyle : inputStyles}

                    />
                    {fieldErrors.TimeTaken && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.TimeTaken}</div>}
                  </Form.Group>
                </Col>



              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="partModelNo">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                    <Select

                      value={SparePartModelNo}
                      options={ModelNo}

                      onChange={handleSparePartModelChange}
                      placeholder="Select Spare Part Model Number"
                      //options={SparePart}
                      styles={!fieldErrors.SparePartModelNo ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="sparepartname">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="quantity"
                      value={SparePartName}
                      onChange={(e) => {
                        setSparePartName(e.target.value)
                        // handleFieldChange('Specification', e.target.value);
                      }}
                      placeholder="Spare Part Name"
                      readOnly="true"
                      //  required
                      style={!fieldErrors.SparePartName ? inputStyle : inputStyles}
                    />
                    {fieldErrors.SparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartName}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="databox">
                    <Form.Label style={{ fontWeight: "bold" }}> Available Stock</Form.Label>
                    <div
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: ".25rem",
                        padding: "0.375rem 0.75rem",
                        height: "calc(1.5em + .75rem + 2px)",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        lineHeight: "1.5",
                        color: "rgb(41 97 72)",
                        backgroundColor: "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
                      }}
                    >
                      {Stock}
                    </div>
                    {fieldErrors.Stock && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Stock}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="quantity">
                    <Form.Label style={{ fontWeight: "bold" }}>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={Quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setQuantity(value);
                
                        // Check if stock is available
                        if (SparePartModelNo) {
                          // Validate Quantity
                          if (value > Stock) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              Quantity: 'Quantity cannot exceed available stock.',
                            }));
                          } else if (value < 1) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              Quantity: 'Quantity must be at least 1.',
                            }));
                          } else {
                            setFieldErrors((prev) => ({
                              ...prev,
                              Quantity: "", // Clear any existing error
                            }));
                          }
                        } else {
                          // If no stock is available, clear any error messages related to Quantity
                          setFieldErrors((prev) => ({
                            ...prev,
                            Quantity: "",
                          }));
                        }
                      }}
                      placeholder="Quantity"

                      //  required
                      style={!fieldErrors.Quantity ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Quantity && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Quantity}</div>}
                  </Form.Group>
                </Col>


                <Col className='py-2' md={4}>
                  <Form.Group controlId="pcs">
                    <Form.Label style={{ fontWeight: "bold" }}>Solution Process</Form.Label>
                    <Form.Control
                      type="text"
                      name="Process"
                      value={Process}
                      onChange={(e) => {
                        setProcess(e.target.value)
                         handleFieldChange('Process', e.target.value);
                      }}
                      placeholder="Solution Process"
                      
                      //     required
                      style={!fieldErrors.Process ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Process && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Process}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="remarks">
                    <Form.Label style={{ fontWeight: "bold" }}>Remarks</Form.Label>
                    <Form.Control
                      type="text"
                      name="remarks"
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value)
                        // handleFieldChange('PCS', e.target.value);
                      }}
                      placeholder="Remarkss"
                      
                      //     required
                      style={!fieldErrors.Process ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Process && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Process}</div>}
                  </Form.Group>
                </Col>
                
                

              </Row>
              <Row>
              <Col className='py-2' md={4}>
                  <Form.Group controlId="UploadFile">
                    <Form.Label style={{ fontWeight: "bold" }}>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}  // Generic reference name
                      style={!fieldErrors.fileInputRef ? inputStyle : inputStyles}
                    />
                    {fieldErrors.fileInputRef && (
                      <div style={{ fontSize: "13px" }} className="text-danger">
                        {fieldErrors.fileInputRef}
                      </div>
                    )}
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

export default MachineMaintenance;