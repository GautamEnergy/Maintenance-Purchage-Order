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
  const [SparePartModel, setSparePartModel] = useState(null);
  const [ModelNo, setModelNo] = useState([]);
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
  const [remarks, setRemarks] = useState("");
  const location = useLocation();
  const { MachineId, Type } = location.state || {};
  const [formData, setFormData] = useState([]);
  const [showLineField, setShowLineField] = useState(false);
  const [showChamberField, setShowChamberField] = useState(false);
  const [images, setImages] = useState('')
  const [MaintenanceType, setMaintenanceType] = useState('BreakDown');
  const [sparePartChange,setSparePartChange] = useState('Yes')





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
    console.log("hahahhahahmmmm")

    console.log(MachineId)

    if (MachineId) {



      const fetchData = async () => {
        const url = localStorage.getItem('url');
        const personID = localStorage.getItem("CurrentUser");
        try {
          const response = await axios.post(
            `${url}/Maintenance/GetMachineMaintenanceList`,
            { MachineMaintenanceId: MachineId, PersonId: personID, reqData: "" }
          );
          const maintenanceData = response.data.data[0];
          // setFormData(maintenanceData);
          setFormData(maintenanceData);

          if (maintenanceData.Image_URL) {
            try {
              const imageResponse = await axios.get(maintenanceData.Image_URL, {
                responseType: 'blob',
              });
              const imageBlob = new Blob([imageResponse.data], { type: imageResponse.data.type });
              const imageObjectUrl = URL.createObjectURL(imageBlob);
              setImages(imageObjectUrl);
            } catch (imageError) {
              console.error('Error fetching image:', imageError);

            }
          }
          // const selectedMachine = Machine.find(
          //   (machine) => machine.MachineName === maintenanceData["Machine Name"]
          // );

          // // Set the machine name in the state with both value and label
          // if (selectedMachine) {
          //   setMachineName({
          //     value: selectedMachine.MachineId,
          //     label: selectedMachine.MachineName
          //   });
          // }
          setMachineName(maintenanceData['Machine Name'] ?
            { value: maintenanceData['MachineId'], label: maintenanceData['Machine Name'] } : null);
          setMachineNumber(maintenanceData["Machine Model Number"] || '')
          setStartTime(maintenanceData["BreakDown Start Time"] || '');
          setEndTime(maintenanceData["BreakDown End Time"] || '');
          setTimeTaken(maintenanceData["BreakDown Total Time"] || '');
          setMaintenanceType(maintenanceData["Maintenance Type"] || '')
          setSparePartChange(maintenanceData["Is Spare Part Changed"] || '')
          setSparePartName(maintenanceData['Spare Part Name'] || '');
          setSparePartModelNo(maintenanceData['Spare Part Model Number'] ?
            { value: maintenanceData['SparePartId'], label: maintenanceData['Spare Part Model Number'] } : null);
          setSparePartModel(maintenanceData['Spare Part Model Number'] ?
            { value: maintenanceData['SparePartId'], label: maintenanceData['Spare Part Model Number'] } : null);
          // setMachineNumber(maintenanceData["Machine Number"] || '');
          setIssue(maintenanceData.Issue || '');
          setQuantity(maintenanceData.Quantity || '');
          setProcess(maintenanceData['Solution Process'] || '');
          setStock(maintenanceData['Stock After Usage'] || '');
          setRemarks(maintenanceData.Remark || '');
          // setSelectedChambers(maintenanceData.Chamber || []);
          setImage(maintenanceData.Image_URL || '');

          // If Line is present in the data, set it
          const machineName = maintenanceData['Machine Name'];
          const showLineMachines = [
            'Stringer Machine(AMO50FS)-1', 'Stringer Machine(AMO50FS)-2',
            'Stringer Machine(AMO50FS)-3', 'Stringer Machine(MS40K)-1',
            'Stringer Machine(MS40K)-2', 'gear5'
          ];
          const showChamberMachines = [
            'Laminator (Jinchen)', 'Laminator (GMEE)', 'gearj'
          ];

          if (showLineMachines.includes(machineName)) {
            // Show and bind the Line field if present
            if (maintenanceData.Line) {
              const lineValue = maintenanceData.Line.toLowerCase().replace(' ', '');
              const lineOption = LineOptions.find(option => option.value.toLowerCase() === lineValue);
              setSelectedLine(lineOption ? lineOption.value : null);
              setShowLineField(true);


              setShowLineField(true);
            } else {
              setShowLineField(false);
            }
            setShowChamberField(false);
          } else if (showChamberMachines.includes(machineName)) {
            // Show and bind the Chamber field if present
            if (maintenanceData.Chamber && Array.isArray(maintenanceData.Chamber)) {
              const chambers = maintenanceData.Chamber.filter(chamberData => {
                const chamberLabel = Object.keys(chamberData)[0];
                const chamberName = chamberData[chamberLabel];
                const chamberQuantity = chamberData['ChamberQuantity'];
                return chamberName.trim() !== '' || chamberQuantity.trim() !== '';
              }).map(chamberData => {
                const chamberLabel = Object.keys(chamberData)[0];
                const chamberName = chamberData[chamberLabel];
                const chamberQuantity = chamberData['ChamberQuantity'];
                return { chamberId: chamberLabel, chamberName, chamberDetails: Number(chamberQuantity) || '' };
              });

              setSelectedChambers(chambers);
              setShowChamberField(chambers.length > 0);
            } else {
              setShowChamberField(false);
            }
            setShowLineField(false);
          } else {
            // Hide both fields if the machine name doesn't match
            setShowLineField(false);
            setShowChamberField(false);
          }
          if (maintenanceData['Machine Name']) {
            await getSparePartModelListData(maintenanceData['Machine Name']);
          }
          console.log(response)
          console.log(formData)
        } catch (error) {
          console.error('Error fetching purchase order data:', error);
        }
      };
      fetchData();
    }
  }, [MachineId]);

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


  const notifySuccess = () => toast.success("Machine Maintainace Added Successfully!", { autoClose: 5000 });
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
    if (SparePartModelNo && !Quantity) {
      newFieldErrors.Quantity = 'Quantity is required';
    }
    if (!fileInputRef) newFieldErrors.fileInputRef = 'Image is required';
    if (showLineField && !selectedLine) {
      newFieldErrors.selectedLine = 'Line selection is required';
    }

    // Validate Chamber fields if applicable

    setFieldErrors(newFieldErrors);


    if (Object.keys(newFieldErrors).length === 0) {
      setLoading(true)

      const data = {
        CreatedBy: personID,
        MachineMaintenanceId: MachineId ? MachineId : "",
        MachineName: MachineName.value ? MachineName.value : "",
        Line: selectedLine ? selectedLine : "",
        Chamber: selectedChambers.map(chamber => ({
          Chamber1: chamber.chamberId,
          ChamberQuantity: chamber.chamberDetails
        })),

        Issue: Issue,
        BreakDownStartTime: StartTime,
        BreakDownEndTime: EndTime,
        BreakDownTotalTime: TimeTaken,
        SparePartModelNumber: SparePartModelNo?.value ?? "",
        isSparePartChanged:sparePartChange,
        maintenanceType:MaintenanceType,

        Quantity: Quantity,
        Remarks: remarks,
        SolutionProcess: Process,

        Status: "Active"
      };

      console.log("Inserting", data)
      console.log()

      try {
        let UUID = await addSparePartIn(data);
        console.log("uuid", UUID)
        let formData = new FormData()

        formData.append('MachineMaintenancePdf', image);
        formData.append('SparePartId', UUID.stockCheck)

        if ((image)) {
          console.log("imageeeeeee")
          let upload = await uploadPDF(formData);
          // console.log("Upload response", upload);
        } else {
          notifySuccess();
          setTimeout(() => {
            setLoading(false);
            navigate('/maintenaceList');
          }, 1000);

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
    navigate('/maintenaceList');
  };
  const handleMaintenanceTypeChange = (e) => {
    setMaintenanceType(e.target.value);
  };
  const handleSparePartChange = (e) => {
    setSparePartChange(e.target.value);
  };

  const handleMachineNameChange = (selectedMachine) => {
    console.log("Machine Name:", selectedMachine);

    if (selectedMachine) {
      setMachineName(selectedMachine);
      setSelectedLine(null);
      setSelectedChambers([]);

      // Determine field visibility based on machine selection
      if (['Stringer Machine(AMO50FS)-1', 'Stringer Machine(AMO50FS)-2', 'Stringer Machine(AMO50FS)-3', 'Stringer Machine(MS40K)-1', 'Stringer Machine(MS40K)-2', 'gear5'].includes(selectedMachine.label)) {
        setShowLineField(true);
        setShowChamberField(false);
      } else if (['Laminator (Jinchen)', 'Laminator (GMEE)', 'gearj'].includes(selectedMachine.label)) {
        setShowChamberField(true);
        setShowLineField(false);
      } else {
        setShowLineField(false);
        setShowChamberField(false);
        setSelectedLine(null);
        setSelectedChambers([]);
      }

      handleFieldChange("MachineName", selectedMachine.label);

      const selectedMachineData = Machine.find(machine => machine.MachineId === selectedMachine.value);

      if (selectedMachineData) {
        setMachineNumber(selectedMachineData.MachineNumber);
        setFieldErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.MachineNumber;
          return newErrors;
        });
      }

      getSparePartModelListData(selectedMachine.label);

      console.log(selectedMachine.label);
    }
  };


  const handleLineChange = (selectedOption) => {
    setSelectedLine(selectedOption ? selectedOption.value : null);
    setFieldErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors.selectedLine;
      return newErrors;
    });
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
          navigate('/maintenaceList');
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
      const fileURL = URL.createObjectURL(file);
      setImages(fileURL);  // Update the image state with the file URL
      // Update the fileName state if needed
    }



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

    <Container style={{ marginTop: "4%", width: "90%", paddingBottom: "4%", marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" }} className="fullPage ">
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
                      isDisabled={MachineId}
                    />
                    {fieldErrors.MachineName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineName}</div>}
                  </Form.Group>
                </Col>


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
                <Col md={4} className='py-2'>
                  <Form.Group controlId="MaintenanceType">
                    <Form.Label style={{ fontWeight: "bold" }}>Maintenance Type</Form.Label>
                    <div style={{display:"flex",gap:"5px"}}>
                      <Form.Check
                        type="radio"
                        label="BreakDown"
                        name="MaintenanceType"
                        value="BreakDown"
                        checked={MaintenanceType === "BreakDown"}
                        onChange={(e) => handleMaintenanceTypeChange(e)}
                      />
                      <Form.Check
                        type="radio"
                        label="Preventive"
                        name="MaintenanceType"
                        value="Preventive"
                        checked={MaintenanceType === "Preventive"}
                        onChange={(e) => handleMaintenanceTypeChange(e)}
                      />
                   
                    </div>
                  </Form.Group>
                </Col>

               
              </Row>
              <Row>
                {showLineField && (
                  <Col className='py-2' md={4}>
                    <Form.Group controlId="LineField">
                      <Form.Label style={{ fontWeight: "bold" }}>Select Line</Form.Label>
                      <Select
                        value={LineOptions.find(option => option.value === selectedLine)}
                        onChange={handleLineChange}
                        options={LineOptions}
                        placeholder="Select Line"
                        styles={!fieldErrors.selectedLine ? customSelectStyles : customSelectStyles1}

                      />
                      {fieldErrors.selectedLine && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.selectedLine}</div>}
                    </Form.Group>
                  </Col>
                )}

                {showChamberField && (
                  <Row >
                    <Form.Label style={{ fontWeight: "bold" }}>Select Chambers</Form.Label>
                    {ChamberOptions.map(chamber => (
                      <Col key={chamber.value} className="mb-2 align-items-center">
                        <Col xs={12}>
                          <Form.Check
                            type="checkbox"
                            id={chamber.value}
                            label={chamber.label}
                            value={chamber.value}
                            checked={selectedChambers.some(selected => selected.chamberId === chamber.value)}
                            onChange={handleChamberChange}

                          />
                        </Col>
                        <Col xs={12}>
                          {selectedChambers.some(selected => selected.chamberId === chamber.value) && (
                            <Form.Group controlId={`${chamber.value}Field`}>
                              <Form.Control
                                type="number"
                                placeholder={`Enter Quantity for ${chamber.label}`}
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
                      </Col>
                    ))}
                    {fieldErrors.selectedChambers && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.selectedChambers}</div>}
                  </Row>
                )}

              </Row>

              <Row>
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

              </Row>

              <Row>
                <Col md={4} className='py-2'>
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
                <Col md={4} className='py-2'>
                  <Form.Group controlId="sparePartChange">
                    <Form.Label style={{ fontWeight: "bold" }}> Is Spare Part Changed..?</Form.Label>
                    <div style={{display:"flex",gap:"10px"}}>
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="sparePartChange"
                        value="Yes"
                        checked={sparePartChange === "Yes"}
                        onChange={(e) => handleSparePartChange(e)}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="sparePartChange"
                        value="No"
                        checked={sparePartChange === "No"}
                        onChange={(e) => handleSparePartChange(e)}
                      />
                     
                    </div>
                  </Form.Group>
                </Col>
               { sparePartChange === "Yes" ? <Col className='py-2' md={4}>
                  <Form.Group controlId="partModelNo">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                    <Select
                      value={SparePartModelNo}
                      options={ModelNo}
                      onChange={handleSparePartModelChange}
                      placeholder="Select Spare Part Model Number"
                      //options={SparePart}
                      styles={!fieldErrors.SparePartModelNo ? customSelectStyles : customSelectStyles1}
                      isDisabled={MachineId && SparePartModel != null}
                    //   required

                    />
                    {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
                  </Form.Group>
                </Col> :""}
               
              </Row>

              <Row>
              {sparePartChange==="Yes"?<Col className='py-2' md={4}>
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
                </Col>:""}
               {sparePartChange === "Yes" ?<Col className='py-2' md={4}>
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
                </Col>:""}
               {sparePartChange === "Yes"? <Col className='py-2' md={4}>
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
                      disabled={!SparePartModelNo}

                      //  required
                      style={!fieldErrors.Quantity ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Quantity && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Quantity}</div>}
                  </Form.Group>
                </Col>:""}
               
              </Row>
              <Row>
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
                      placeholder="Remarks"

                      //     required
                      style={!fieldErrors.remarks ? inputStyle : inputStyles}
                    />
                    {/* {fieldErrors.Process && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Process}</div>} */}
                  </Form.Group>
                </Col>



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
                    <div style={{ display: "flex" }}>
                      {images ? (
                        <img src={images} alt="Maintenance Image" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
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