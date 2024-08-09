import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../Assets/Images/LOGO.png"
import { AppContext } from '../ContextAPI';
// import Loader from '../Loader/Loader';

const MachineMaintenance = () => {
  const { token, setToken } = useContext(AppContext)



  const [Status, setStatus] = useState('Active');

  const [image, setImage] = useState(undefined);
  const [pdf, setPdf] = useState(undefined);
  const [error, setError] = useState('');
  const [personID, setPersonID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Machine, SetMachine] = useState([])
 

 
  const pdfInputRef = useRef(null);

  const [pdfData, setpdfData] = useState([]);

  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState();



  // New State
  const [MachineName, setMachineName] = useState(null);
  const [Issue, setIssue] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [TimeTaken, setTimeTaken] = useState('');
  const [SparePartModelNo, setSparePartModelNo] = useState(null);
  const [Quantity, setQuantity] = useState('');
  const [Process, setProcess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
 
 



  



  // console.log(token);
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
          const  machineData = machineBody.map(machine => ({
              value: machine.MachineId,
              label: machine.MachineName
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
    



    // if (token) {
    //   setToken(token);
    // }
    // console.log('URL CHECK');
    //console.log("baaaaba", Purchase_Order_Id);
    // getPartyListData();
    // getSparePartModelListData();
    //getVoucherListData();
    // getCompanyName();



  }, []);

//   const getPartyListData = async () => {
//     const token = localStorage.getItem("token");
//     const url = localStorage.getItem('url');
//     console.log("Fetching party list...");
//     console.log(url);
//     console.log(token);

//     try {
//       const response = await axios.get(`${url}/Maintenance/GetParty`, {
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (response.status === 200 && Array.isArray(response.data)) {
//         const partyNames = response.data.map(party => ({
//           label: party.PartyName,
//           value: party.PartyNameId,
//         }));
//         setParty(partyNames);
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching party list:', error.message);
//       console.error(error); // Log the full error object
//     }
//   };
//   const getSparePartModelListData = async () => {
//     const token = localStorage.getItem("token");
//     const url = localStorage.getItem('url');
//     console.log("Fetching spare part model list...");
//     console.log(url);
//     console.log(token);

//     try {
//       const response = await axios.post(`${url}/Maintenance/GetAutoData`, { required: "Spare Part Model No" }, {
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (response.status === 200 && Array.isArray(response.data.data)) {
//         const sparePartModels = response.data.data.map(part => ({
//           label: part.SparePartModelNumber,
//           value: part.SparePartId,
//           SparePartName: part.SparePartName,
//         }));
//         setSparePart(sparePartModels);
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching spare part model list:', error.message);
//       console.error(error); // Log the full error object
//     }
//   };
//   const getVoucherListData = async () => {
//     const token = localStorage.getItem("token");
//     const url = localStorage.getItem('url');
//     console.log("Fetching voucher list...");
//     console.log(url);
//     console.log(token);

//     try {
//       const response = await axios.post(`${url}/Maintenance/GetVoucherList`, {
//         "SparePartId": SparePartModelNo.value,
//         "PartyId": PartyName.value,
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (response.status === 200 && Array.isArray(response.data)) {
//         const voucherList = response.data.map(voucher => ({
//           label: voucher.Voucher_Number,
//           value: voucher.Purchase_Order_Id,
//         }));
//         setPO(voucherList);
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching voucher list:', error.message);
//       console.error(error); // Log the full error object
//     }
//   };
//   console.log("Brand", Brand);
//   const bindInListData = async (SpId,PoId) => {
//     const token = localStorage.getItem("token");
//     const url = localStorage.getItem('url');
//     console.log("Fetching party list...");
//     console.log("SparePartId:", SpId, "PurchaseOrderId:", PoId);
//     console.log(url);
//     console.log(token);

//     try {
//       const response = await axios.post(`${url}/Maintenance/GetPO&SparePartDetail`, {
//         SparePartId: SpId,
//         PurchaseOrderId: PoId,
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//         },
//       });

//       if (response.status === 200) {
//         console.log("bhaaaaanu");

//         const data = response;
//         console.log("branddata", data.data.BrandName)// Assuming the first object contains the data you need

//         setBrand(data.data.BrandName);


//         setSpecification(data.data.Specification);
//         setMinimumQuantityRequired(data.data.MinimumQuantityRequired);
//         setMachineNames(data.data.Machine.map(machine => ({ label: machine, value: machine })));
//         setPCS(data.data.Quantity);
//         setPrice(data.data.Price);
//         setCurrency(data.data.Currency);
//         setUnits(data.data.Unit);

//         setFieldErrors(prevErrors => {
//           const newErrors = { ...prevErrors };
//           delete newErrors.Brand;
//           delete newErrors.Specification;
//           delete newErrors.MinimumQuantityRequired;
//           delete newErrors.MachineNames;
//           delete newErrors.PCS;
//           delete newErrors.Price;
//           delete newErrors.Currency;
//           delete newErrors.Units;
//           return newErrors;
//       });
        
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching party list:', error.message);
//       console.error(error); // Log the full error object
//     }
//   };



  //   let machineData = []

    // const notifySuccess = () => toast.success("Spare Part In Added Successfully!", { autoClose: 5000 });
    // const notifyError = (message) => toast.error(message, { autoClose: 5000 });


  //   const extractLast15Digits = (url) => {

  //     const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.pdf'));

  //     const last15Digits = fileName.slice(-15);

  //     return last15Digits;
  //   };

 
 




//     const addSparePartIn = async (data) => {
//       const token = localStorage.getItem("token");
//       const url = localStorage.getItem('url');
//       try {
//         // setLoading(true);
//         const response = await axios.post(`${url}/Maintenance/SparePartIn`,data, {
         
//           headers: {
//             'Content-Type': 'application/json',
//           },
         
//         });
//         console.log("responsebhanu",response.status)
//         if (response.status===200) {
//           console.log("responsebhanusaif",response)
//           const responseData = response.data[0];
        
//           return responseData;

//         } else {
//           // setLoading(false);
//           const errorData = await response.json();
//           console.log(errorData)
         
//         }
//       } catch (error) {
//         // setLoading(false);
//         return error
//       }
//     };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personID) {
      setError('PersonID is required.');
      console.log("Errorrrrrrrs")
      return;
    }
    console.log("Errorrrrrrr")

    // const newFieldErrors = {};
    // if (PartyName.length===0) newFieldErrors.PartyName = 'Party name is required';
    // if (SparePartModelNo.length===0) newFieldErrors.SparePartModelNo = 'Spare part model number is required';
    // if (!SparePartName) newFieldErrors.SparePartName = 'Spare part name is required';
    // if (PONumber.length===0) newFieldErrors.PONumber = 'P O Number is required';
    // if (MachineNames.length === 0) newFieldErrors.MachineNames = 'Machine name is required';
    // if (!Brand) newFieldErrors.Brand = 'Brand is required';
    // if (!Specification) newFieldErrors.Specification = 'Specification is required';
    // if (!PCS) newFieldErrors.PCS = 'PCS is required';
    // if (RPCS.length===0) newFieldErrors.RPCS = 'Recieved quantity in PCS is required';
    // if (RPCS>PCS || RPCS == 0) newFieldErrors.RPCS = 'Enter Valid Quantity';
    // if (!Units) newFieldErrors.Units = 'Units are required';
    // if (!Currency) newFieldErrors.Currency = 'Currency is required';
    // if (!Price) newFieldErrors.Price = 'Price is required';
    // if (TotalCost.length===0) newFieldErrors.TotalCost = 'Total Cost is required';
    // if (!Invoice) newFieldErrors.Invoice = 'Invoice number is required';
    // if (!pdf) newFieldErrors.pdfInputRef = 'Invoice PDF is required';
    // setFieldErrors(newFieldErrors);
  
     
    //   if (Object.keys(newFieldErrors).length === 0) {
    //     setLoading(true)
      
    //     var data = {
    //       CreatedBy: personID,
    //       PartyId: PartyName.value,
    //       SparePartId: SparePartModelNo.value,
    //       SparePartName: SparePartName,
    //       PurchaseOrderId:PONumber.value ,
    //       MachineNames:MachineNames.map(el => el.label),
    //       SparePartBrandName: Brand,
    //       Price: Price,
    //       SparePartSpecification: Specification,
    //       QuantityPurchaseOrder: PCS,
    //       Currency: Currency,
    //       Unit: Units,
    //       QuantityRecieved: RPCS,
    //       TotalCost: TotalCost,
    //       InvoiceNumber: Invoice,
    //       Status: "Active"
    //     };
    //     console.log("Inserting",data)
    //     console.log("pdfffff",pdf)
    //    // addSparePartIn(data);
    //     try {
    //       let UUID = await addSparePartIn(data);
    //       console.log("uuid",UUID)
    //       let formData = new FormData()
         
    //       formData.append('InvoicePdf', pdf);
    //       formData.append('SparePartId', UUID.SparePartInId)
    //       for (let [key, value] of formData.entries()) {
    //         console.log(`${key}:`, value);
    //       }
    
    //       console.log("Upload FormData", formData);
  
    //       if ( (pdf && pdf.size > 0)) {
    //         let upload = await uploadPDF(formData);
    //         console.log("Upload response", upload);
    //       } else {
    //         notifyError('Error,Please Enter Valid Invoice PDF ')

    //         // notifySuccess();
           
    //       }
    //       console.log("spare response");
  
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   } else {
    //     console.log("Validation errors:", newFieldErrors);
    //   }

    

   
  };
//   const apiCall = (selected) =>{
//     console.log("PONumber",PONumber.value)
//     bindInListData(selected,PONumber.value);

//   }

  // const handleFieldChange = (field, value) => {
  //   const newFieldErrors = { ...fieldErrors };
  //   if (field === 'RPCS') {
  //     if (Number(value) <= 0 || Number(value) > Number(PCS)) {
  //       newFieldErrors[field] = 'Please Enter Valid Quantity.';
  //     } else {
  //       delete newFieldErrors[field]; 
  //     }
  //   } else {
     
  //     if (!value || (Array.isArray(value) && value.length === 0)) {
  //       newFieldErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
  //     } else {
  //       delete newFieldErrors[field];
  //     }
  //   }
  
  //   setFieldErrors(newFieldErrors);
  // };
  
  //   const handleImageChange = (event) => {
  //     const selectedFiles = event.target.files;
  //     const filesArray = [];
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       filesArray.push(selectedFiles[i]);
  //     }
  //     setFiles(filesArray);
  //   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     console.log("Fileeeee",file);
    

//     if (file) {
//       setPdf(file);
//       setFileName(file.name);
//       handleFieldChange('pdfInputRef', file);
//     }
//   };
  const handleBack = (e) => {
    navigate('/spareinList');
  };

  const handleMachineNameChange = (selectedMachines) => {
    console.log("Machine Name....................?", selectedMachines);
    setMachineName(selectedMachines);
    // handleFieldChange('MachineNames', selectedMachines);
  };
//   const handlePartyNameChange = (selectedPartyName) => {
//     console.log("Party Name....................?", selectedPartyName.value);
//     setPartyName(selectedPartyName);
//     setSparePartModelNo([])
//     setPONumber([]);
//     setMachineNames([]);
//     setModelNo('');
//     setBrand('');
//     setSpecification('');
//     setPCS('');
//     setRPCS('');
//     setUnits('');
//     setCurrency('');
//     setPrice('');
//     setTotalCost([]);
//     setInvoice('');
//     setFileName('');
//     setSparePartName('');
//     setMinimumQuantityRequired('');
//     handleFieldChange('PartyName', selectedPartyName);
//     getVoucherListData();
    
//   };
//   const handleSparePartModelChange = (selectedOption) => {
//     console.log("Selected Spare Part Model:", selectedOption);

//     // Update state and clear relevant fields
//     setSparePartModelNo(selectedOption);
//     setPONumber([]);
//     setMachineNames([]);
//     setModelNo('');
//     setBrand('');
//     setSpecification('');
//     setPCS('');
//     setRPCS('');
//     setUnits('');
//     setCurrency('');
//     setPrice('');
//     setTotalCost([]);
//     setInvoice('');
//     setFileName('');
//     setSparePartName('');
//     setMinimumQuantityRequired('');
   
//     // Handle field change
//     handleFieldChange('SparePartModelNo', selectedOption);
   

//     // Find the selected spare part name based on selected model number
//     const selectedSparePart = SparePart.find(part => part.value === selectedOption.value);
//     if (selectedSparePart) {
//         setSparePartName(selectedSparePart.SparePartName);
//         setFieldErrors(prevErrors => {
//           const newErrors = { ...prevErrors };
//           delete newErrors.SparePartName;
          
//           return newErrors;
//       });
    
//         getVoucherListData();
//     }

//     // Use a callback to ensure we get the latest state values
//     setPONumber((prevPONumber) => {
//         if (prevPONumber && prevPONumber.value) {
//             bindInListData(selectedOption.value, prevPONumber.value);
//         }
//         return prevPONumber;
//     });
// };

//   console.log("brandss",Brand)
//   const handlePONumberChange = (selectedPoNumber) => {
//     console.log("Selected PO Number:", selectedPoNumber);
   

//     // Update state and clear relevant fields
//     setPONumber(selectedPoNumber);
//     setMachineNames([]);
//     setModelNo('');
//     setBrand('');
//     setSpecification('');
//     setPCS('');
//     setRPCS(''); 
//     setUnits('');
//     setCurrency('');
//     setPrice('');
//     setTotalCost([]);
//     setInvoice('');
//     setFileName('');

//     handleFieldChange('PONumber', selectedPoNumber);

//     setSparePartModelNo((prevSparePartModelNo) => {
//         if (prevSparePartModelNo && prevSparePartModelNo.value) {
//             bindInListData(prevSparePartModelNo.value, selectedPoNumber.value);
//         }
//         return prevSparePartModelNo;
//     });
// };



//   const handleSparePartNameChange = (e) => {
//     const { value } = e.target;
//     setSparePartName(value);
    
//     handleFieldChange('SparePartName', e.target.value);

//   };
//   const handleCurrencyChange = (e) => {
//     setCurrency(e.target.value);
//     // handleFieldChange('Currency', e.target.value);
//     // calculateTotalCost(e.target.value, Price); 
//   };

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value);
//     handleFieldChange('Price', e.target.value);
//     calculateTotalCost(RPCS, e.target.value);
//   };
//   const handleRecievedPcs = (e) => {
//     const newRPCS = e.target.value;
//     setRPCS(newRPCS);
//     if (Number(newRPCS) <= 0 || Number(newRPCS) > Number(PCS)) {
//       handleFieldChange('RPCS', newRPCS); 
//     } else {
//       setFieldErrors((prevErrors) => ({
//         ...prevErrors,
//         RPCS: '', 
//       }));
//     }
    
  
//     console.log('PCS:', PCS, 'newRPCS:', newRPCS, 'Errors:', fieldErrors.RPCS); 
//     handleFieldChange('RPCS', newRPCS); 
//     calculateTotalCost(Price, newRPCS);
//     setFieldErrors(prevErrors => {
//       const newErrors = { ...prevErrors };
//       delete newErrors.TotalCost;
      
//       return newErrors;
//   });
//   };
  
//   const calculateTotalCost = (RPCS, price) => {
//     const total = parseFloat((parseFloat(RPCS) * parseFloat(price)).toFixed(2));
//     if (!isNaN(total)) {
//       setTotalCost(total);
//     } else {
//       setTotalCost('');
    
  
//     }
//   };

 
//     const uploadPDF = async (formData) => {
//       console.log("oyeyeyeyyeyeyey")
//       console.log(formData);



//       try {
//         const response = await axios.post(`${url}/Maintenance/SparePartsImage`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response.status === 200) {
//          // setIsLoading(false);
          
//           notifySuccess();
//           setTimeout(() => {
//             setLoading(false);
//             navigate('/spareinList');
//           }, 1000);
//           return response.data;
//         } else {
//           notifyError('Error, Error On Server')
          

//           return response.data
//         }

//       } catch (err) {
//         setIsLoading(false);
//          notifyError('Error, While Sending File')
//         console.error('Error', err);
//         return err;
//       }


    
//     };
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
    if (StartTime && EndTime) {
      calculateTimeTaken(StartTime, EndTime);
    }
  };
  const calculateTimeTaken = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    let totalStartMinutes = startHours * 60 + startMinutes;
    let totalEndMinutes = endHours * 60 + endMinutes;

    // If the end time is earlier than the start time, add 24 hours to the end time
    if (totalEndMinutes < totalStartMinutes) {
        totalEndMinutes += 24 * 60;
    }

    const difference = totalEndMinutes - totalStartMinutes;
    const hoursTaken = Math.floor(difference / 60);
    const minutesTaken = difference % 60;

    // Format the time as "X hours Y mins"
    const formattedTime = `${hoursTaken} hour${hoursTaken !== 1 ? 's' : ''} ${minutesTaken} min${minutesTaken !== 1 ? 's' : ''}`;

    setTimeTaken(formattedTime);
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
                  <Form.Group controlId="PartyName">
                    <Form.Label style={{ fontWeight: "bold" }}>Machine Name</Form.Label>
                    <Select

                      value={MachineName}

                       onChange={handleMachineNameChange}
                      placeholder="Select Machine Name"
                      options={Machine}

                      styles={!fieldErrors.PartyName ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.PartyName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PartyName}</div>}
                  </Form.Group>
                </Col>
               
                <Col md={4}>
                  <Form.Group controlId="Issue">
                    <Form.Label style={{ fontWeight: "bold" }}>Issue</Form.Label>
                    <Form.Control
                      type="text"
                      name="Issue"
                      value={Issue}
                    //   onChange={handleIssue}
                      placeholder="Issue"
                      
                      // required
                      style={!fieldErrors.SparePartName ? inputStyle : inputStyles}

                    />
                    {fieldErrors.SparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartName}</div>}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="StartTime">
                    <Form.Label style={{ fontWeight: "bold" }}>Maintenance Start Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="StartTime"
                      value={StartTime}
                       onChange={(e)=>handleTimeChange(e, 'StartTime')}
                      placeholder="e.g., 18:05 (HH:MM)"
                     
                      // required
                      style={!fieldErrors.StartTime ? inputStyle : inputStyles}

                    />
                    {fieldErrors.StartTime && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.StartTime}</div>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
              <Col md={4}>
                  <Form.Group controlId="EndTime">
                    <Form.Label style={{ fontWeight: "bold" }}>Maintenance End Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="EndTime"
                      value={EndTime}
                      onChange={(e)=>handleTimeChange(e, 'EndTime')}
                      placeholder="e.g., 18:05 (HH:MM)"
                      // required
                      style={!fieldErrors.EndTime ? inputStyle : inputStyles}

                    />
                    {fieldErrors.EndTime && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.EndTime}</div>}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="EndTime">
                    <Form.Label style={{ fontWeight: "bold" }}>Maintenance Time Taken</Form.Label>
                    <Form.Control
                      type="text"
                      name="timeTaken"
                      value={TimeTaken}
                    //   onChange={handleTimeTaken}
                      placeholder="Maintenance Time Taken"
                      readOnly = "true"
                      // required
                      style={!fieldErrors.SparePartName ? inputStyle : inputStyles}

                    />
                    {fieldErrors.SparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartName}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="partModelNo">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                    <Select

                      value={SparePartModelNo}

                    //   onChange={handleSparePartModelChange}
                      placeholder="Select Spare Part Model Number"
//options={SparePart}
                      styles={!fieldErrors.SparePartModelNo ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
                  </Form.Group>
                </Col>


              </Row>

              <Row>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="quantity">
                    <Form.Label style={{ fontWeight: "bold" }}>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="quantity"
                      value={Quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value)
                        // handleFieldChange('Specification', e.target.value);
                      }}
                      placeholder="Specification"
                      readOnly = "true"
                      //  required
                      style={!fieldErrors.Specification ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Specification && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Specification}</div>}
                  </Form.Group>
                </Col>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="pcs">
                    <Form.Label style={{ fontWeight: "bold" }}>Solution Process</Form.Label>
                    <Form.Control
                      type="text"
                      name="pcs"
                      value={Process}
                      onChange={(e) => {
                        setProcess(e.target.value)
                        // handleFieldChange('PCS', e.target.value);
                      }}
                      placeholder="Solution Process"
                      readOnly = "true"
                      //     required
                      style={!fieldErrors.PCS ? inputStyle : inputStyles}
                    />
                    {fieldErrors.PCS && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PCS}</div>}
                  </Form.Group>
                </Col>
                {/* <Col className='py-2' md={4}>
                  <Form.Group controlId="rpcs">
                    <Form.Label style={{ fontWeight: "bold" }}>Quantity in PCS(Recieved)</Form.Label>
                    <Form.Control
                      type="number"
                      name="rpcs"
                      value={RPCS}
                      onChange=  {handleRecievedPcs}
                      placeholder="RPCS"
                      //     required
                      style={!fieldErrors.RPCS ? inputStyle : inputStyles}
                    />
                    {fieldErrors.RPCS && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.RPCS}</div>}
                  </Form.Group>
                </Col> */}



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