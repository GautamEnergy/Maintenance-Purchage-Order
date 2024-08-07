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

const SparePartIn = () => {
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
  const [PartyName, setPartyName] = useState([]);
  const [SparePartModelNo, setSparePartModelNo] = useState([]);
  const [SparePartName, setSparePartName] = useState('');
  const [PONumber, setPONumber] = useState([]);
  const [MachineNames, setMachineNames] = useState([]);
  const [ModelNo, setModelNo] = useState('');
  const [Brand, setBrand] = useState('');
  const [Specification, setSpecification] = useState('');
  const [PCS, setPCS] = useState('');
  const [Units, setUnits] = useState('');
  const [Currency, setCurrency] = useState('');
  const [Price, setPrice] = useState('');
  const [TotalCost, setTotalCost] = useState([]);
  const [Invoice, setInvoice] = useState('');
  const [fileName, setFileName] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [party, setParty] = useState([]);
  const [SparePart, setSparePart] = useState([]);
  const [PO, setPO] = useState([]);
  const [RPCS, setRPCS] = useState([]);
  const [MinimumQuantityRequired, setMinimumQuantityRequired] = useState([]);



  const clearAllStates = () => {
    
    if(PONumber){
      setMachineNames([]);
      setModelNo('');
      setBrand('');
      setSpecification('');
      setPCS('');
      setUnits('');
      setCurrency('');
      setPrice('');
      setTotalCost([]);
      setInvoice('');
      setFileName('');
      setFieldErrors({});
      setParty([]);
      setSparePart([]);
      setPO([]);
      setRPCS([]);
      setMinimumQuantityRequired([]);

    }
    if(SparePartModelNo){
      setSparePartName('');
      setPONumber([]);
      setMachineNames([]);
      setModelNo('');
      setBrand('');
      setSpecification('');
      setPCS('');
      setUnits('');
      setCurrency('');
      setPrice('');
      setTotalCost([]);
      setInvoice('');
      setFileName('');
      setRPCS([]);

    }
    
};





  // console.log(token);
  //   useEffect(() => {

  //     console.log("Raaj,,,,,,,,", EquivalentSpareParts);
  //     const personID = localStorage.getItem("CurrentUser");
  //     const token = localStorage.getItem("token");
  //     const url = localStorage.getItem('url');
  //     console.log("URL Kya hai.....?", url);
  //     setUrl(url);

  //     if (personID) {
  //       setPersonID(personID);
  //     }

  //     if (token) {
  //       setToken(token);
  //     }
  //     console.log('URL CHECK');
  //     console.log(url);
  //     getMachineListData();


  //   }, []);
   
  useEffect(() => {
    const personID = localStorage.getItem("CurrentUser");
    setPersonID(personID)
    
    
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    setUrl(url);
    



    if (token) {
      setToken(token);
    }
    // console.log('URL CHECK');
    //console.log("baaaaba", Purchase_Order_Id);
    getPartyListData();
    getSparePartModelListData();
    //getVoucherListData();
    // getCompanyName();



  }, []);

  const getPartyListData = async () => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching party list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.get(`${url}/Maintenance/GetParty`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const partyNames = response.data.map(party => ({
          label: party.PartyName,
          value: party.PartyNameId,
        }));
        setParty(partyNames);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching party list:', error.message);
      console.error(error); // Log the full error object
    }
  };
  const getSparePartModelListData = async () => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching spare part model list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.post(`${url}/Maintenance/GetAutoData`, { required: "Spare Part Model No" }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        const sparePartModels = response.data.data.map(part => ({
          label: part.SparePartModelNumber,
          value: part.SparePartId,
          SparePartName: part.SparePartName,
        }));
        setSparePart(sparePartModels);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching spare part model list:', error.message);
      console.error(error); // Log the full error object
    }
  };
  const getVoucherListData = async () => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching voucher list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.post(`${url}/Maintenance/GetVoucherList`, {
        "SparePartId": SparePartModelNo.value,
        "PartyId": PartyName.value,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const voucherList = response.data.map(voucher => ({
          label: voucher.Voucher_Number,
          value: voucher.Purchase_Order_Id,
        }));
        setPO(voucherList);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching voucher list:', error.message);
      console.error(error); // Log the full error object
    }
  };
  console.log("Brand", Brand);
  const bindInListData = async (SpId,PoId) => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching party list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.post(`${url}/Maintenance/GetPO&SparePartDetail`, {
        SparePartId: SpId,
        PurchaseOrderId: PoId,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200) {
        console.log("bhaaaaanu");

        const data = response;
        console.log("branddata", data.data.BrandName)// Assuming the first object contains the data you need

        setBrand(data.data.BrandName);


        setSpecification(data.data.Specification);
        setMinimumQuantityRequired(data.data.MinimumQuantityRequired);
        setMachineNames(data.data.Machine.map(machine => ({ label: machine, value: machine })));
        setPCS(data.data.Quantity);
        setPrice(data.data.Price);
        setCurrency(data.data.Currency);
        setUnits(data.data.Unit);
        
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching party list:', error.message);
      console.error(error); // Log the full error object
    }
  };



  //   let machineData = []

  //   const notifySuccess = () => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
  //   const notifyError = (message) => toast.error(message, { autoClose: 5000 });

  //   const fetchEquivalentSpareParts = async (sparePartName, selectedMachines, EquivalentId) => {

  //     try {
  //       const url = localStorage.getItem('url');
  //       const response = await axios.post(`${url}/Maintenance/Equ`, {
  //         SparePartName: sparePartName,
  //         MachineName: selectedMachines.map(machine => machine.value)

  //       });
  //       const formattedSpareParts = response.data.map(part => ({
  //         value: part.SparePartId,
  //         label: part.Value
  //       }));
  //       setEquivalentSparePartsOptions(formattedSpareParts);
  //       if (SparPartId) {
  //         console.log("equivalentId......... bhanu", EquivalentId);
  //         const formatedEquivalentData = formattedSpareParts.filter(item => EquivalentId.includes(item.value));
  //         console.log("formatedEquivalentData Bhanu.......", formatedEquivalentData);
  //         setEquivalentSpareParts(formatedEquivalentData);
  //       }


  //     } catch (error) {
  //       console.error('Error fetching equivalent spare parts:', error);
  //     }
  //   };



  //   const extractLast15Digits = (url) => {

  //     const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.pdf'));

  //     const last15Digits = fileName.slice(-15);

  //     return last15Digits;
  //   };

  //   const getSparePartData = async () => {




  //     try {

  //       setLoading(true);
  //       const url = localStorage.getItem('url');
  //       const response = await axios.post(
  //         `${url}/Maintenance/GetSpecificSparePart`,
  //         { SparePartId: SparPartId }
  //       );



  //       const sparePartData = response.data.data[0];
  //       setMasterSparePartName(sparePartData.MasterSparePartName || '');
  //       setSparePartName(sparePartData.SparePartName || '');
  //       setSparePartModelNo(sparePartData.SpareNumber || '');
  //       setBrand(sparePartData.BrandName || '');
  //       setSpecification(sparePartData.Specification || '');
  //       setPCS(sparePartData.NumberOfPcs || '');
  //       setCycleTime(sparePartData.CycleTime || '');
  //       setCode(sparePartData.HSNCode || '');




  //       const last15Digits = extractLast15Digits(sparePartData.SparePartDrawingImageURL);
  //       console.log("Helllllllll", last15Digits)

  //       setFileName(last15Digits || '')
  //       setEquivalentId(sparePartData.Equivalent);
  //       setpdfData(sparePartData.SparePartImageURL || [])


  //       console.log('kkkkkkkkkkkkkkkkkkk')
  //       console.log(sparePartData.SparePartImageURL);





  //       const machineIdsArray = sparePartData.MachineId.map(machine => machine.MachineId);
  //       const machineName = machineData.filter(item => machineIdsArray.includes(item.value))
  //       setMachineNames(machineName);

  //       if (sparePartData.SparePartName && machineName.length > 0) {
  //         fetchEquivalentSpareParts(sparePartData.SparePartName, machineName, sparePartData.Equivalent);
  //       }








  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching machine data:', error);
  //       setLoading(false);
  //     }
  //   };





    const addSparePartIn = async (data) => {
      const token = localStorage.getItem("token");
      const url = localStorage.getItem('url');
      try {
        setLoading(true);
        const response = await axios.post(`${url}/Maintenance/SparePartIn`,data, {
         
          headers: {
            'Content-Type': 'application/json',
          },
         
        });
        console.log("responsebhanu",response.status)
        if (response.status===200) {
          console.log("responsebhanusaif",response)
          const responseData = response.data[0];
        
          return responseData;

        } else {
          setLoading(false);
          const errorData = await response.json();
          console.log(errorData)
         
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
      console.log("Errorrrrrrrs")
      return;
    }
    console.log("Errorrrrrrr")

    const newFieldErrors = {};
    if (PartyName.length===0) newFieldErrors.PartyName = 'Party name is required';
    if (SparePartModelNo.length===0) newFieldErrors.SparePartModelNo = 'Spare part model number is required';
    if (!SparePartName) newFieldErrors.SparePartName = 'Spare part name is required';
    if (PONumber.length===0) newFieldErrors.PONumber = 'P O Number is required';
    if (MachineNames.length === 0) newFieldErrors.MachineNames = 'Machine name is required';
    if (!Brand) newFieldErrors.Brand = 'Brand is required';
    if (!Specification) newFieldErrors.Specification = 'Specification is required';
    if (!PCS) newFieldErrors.PCS = 'PCS is required';
    if (!RPCS) newFieldErrors.RPCS = 'Recieved quantity in PCS is required';
    if (!Units) newFieldErrors.Units = 'Units are required';
    if (!Currency) newFieldErrors.Currency = 'Currency is required';
    if (!Price) newFieldErrors.Price = 'Price is required';
    if (!Invoice) newFieldErrors.Invoice = 'Invoice number is required';
    if (!pdf) newFieldErrors.pdfInputRef = 'Invoice PDF is required';
    setFieldErrors(newFieldErrors);

    if (Object.keys(newFieldErrors).length === 0) {
      
      var data = {
        CreatedBy: personID,
        PartyId: PartyName.value,
        SparePartId: SparePartModelNo.value,
        SparePartName: SparePartName,
        PurchaseOrderId:PONumber.value ,
        MachineNames:MachineNames.map(el => el.label),
        SparePartBrandName: Brand,
        Price: Price,
        SparePartSpecification: Specification,
        QuantityPurchaseOrder: PCS,
        Currency: Currency,
        Unit: Units,
        QuantityRecieved: RPCS,
        TotalCost: TotalCost,
        InvoiceNumber: Invoice,
        Status: "Active"
      };
      console.log("Inserting",data)
      console.log("pdfffff",pdf)
     // addSparePartIn(data);
      try {
        let UUID = await addSparePartIn(data);
        console.log("uuid",UUID)
        let formData = new FormData()
       
        formData.append('InvoicePdf', pdf);
        formData.append('SparePartId', UUID.SparePartInId)
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
  
        console.log("Upload FormData", formData);

        if ( (pdf && pdf.size > 0)) {
          let upload = await uploadPDF(formData);
          console.log("Upload response", upload);
        } else {
          // notifySuccess();
          setTimeout(() => {
            setLoading(false);
            navigate('/sparepartlist');
          }, 1000);
        }
        console.log("spare response");

      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Validation errors:", newFieldErrors);
    }
  };
  const apiCall = (selected) =>{
    console.log("PONumber",PONumber.value)
    bindInListData(selected,PONumber.value);

  }

  const handleFieldChange = (field, value) => {
    const newFieldErrors = { ...fieldErrors };

    if (!value || (Array.isArray(value) && value.length === 0)) {
      newFieldErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
    } else {
      delete newFieldErrors[field];
    }

    setFieldErrors(newFieldErrors);
  };
  //   const handleImageChange = (event) => {
  //     const selectedFiles = event.target.files;
  //     const filesArray = [];
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       filesArray.push(selectedFiles[i]);
  //     }
  //     setFiles(filesArray);
  //   };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    console.log("Fileeeee",file);
    

    if (file) {
      setPdf(file);
      setFileName(file.name);
      handleFieldChange('pdfInputRef', file);
    }
  };
  const handleBack = (e) => {
    navigate('/sparepartlist');
  };

  const handleMachineNameChange = (selectedMachines) => {
    console.log("Machine Name....................?", selectedMachines);
    setMachineNames(selectedMachines);
    handleFieldChange('MachineNames', selectedMachines);
  };
  const handlePartyNameChange = (selectedPartyName) => {
    console.log("Party Name....................?", selectedPartyName.value);
    setPartyName(selectedPartyName);
    handleFieldChange('PartyName', selectedPartyName);
    getVoucherListData();
    
  };
  const handleSparePartModelChange = (selectedOption) => {
    console.log("PONUMmmmmmm");
    setPONumber(["Bhanu"])
    console.log("PONUM");
    setSparePartModelNo(selectedOption);
    handleFieldChange('SparePartModelNo', selectedOption);
    console.log("humm",selectedOption.value)
   


    // Find the selected spare part name based on selected model number
    const selectedSparePart = SparePart.find(part => part.value === selectedOption.value);
    if (selectedSparePart) {
      setSparePartName(selectedSparePart.SparePartName);
      getVoucherListData();

    }
    
    setPONumber(["Bhanu"]);
    setMachineNames([]);
    setModelNo('');
    setBrand('');
    console.log("brands",Brand)
    setSpecification('');
    setPCS('');
    setUnits('');
    setCurrency('');
    setPrice('');
    setTotalCost([]);
    setInvoice('');
    setFileName('');
    console.log("datatatattatat",selectedOption.value,PONumber.value)
    // bindInListData(selectedOption.value,PONumber.value);
    apiCall(selectedOption.value)
   
   
    

  };
  console.log("brandss",Brand)
  const handlePONumberChange = (selectedPoNumber) => {
    console.log("Party Name....................?", selectedPoNumber.value);
    setPONumber(selectedPoNumber);
    handleFieldChange('Party Name', selectedPoNumber);
    setMachineNames([]);
      setModelNo('');
      setBrand('');
      
      setSpecification('');
      setPCS('');
      setUnits('');
      setCurrency('');
      setPrice('');
      setTotalCost([]);
      setInvoice('');
      setFileName('');
    // clearAllStates()
    bindInListData(SparePartModelNo.value,selectedPoNumber.value);
    

  };


  const handleSparePartNameChange = (e) => {
    const { value } = e.target;
    setSparePartName(value);
    handleFieldChange('SparePartName', e.target.value);

  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    handleFieldChange('Currency', e.target.value);
    // calculateTotalCost(e.target.value, Price);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    handleFieldChange('Price', e.target.value);
    calculateTotalCost(RPCS, e.target.value);
  };
  const handleRecievedPcs  = (e) => {
    setRPCS(e.target.value)
    handleFieldChange('RPCS', RPCS);
    calculateTotalCost(Price, e.target.value);
  }
  const calculateTotalCost = (RPCS, price) => {
    const total = parseFloat((parseFloat(RPCS) * parseFloat(price)).toFixed(2));
    if (!isNaN(total)) {
      setTotalCost(total);
    } else {
      setTotalCost('');
    }
  };

  //   const handleEquivalentSparePartsOpen = () => {
  //     if (SparePartName && MachineNames.length > 0) {
  //       fetchEquivalentSpareParts(SparePartName, MachineNames);
  //     }
  //   };


  //   const handleEquivalentChange = (selectedOptions) => {
  //     console.log("Equivalent Name....................?", selectedOptions);
  //     setEquivalentSpareParts(selectedOptions)

  //   };


  //   const getMachineListData = async () => {
  //     const url = localStorage.getItem('url');
  //     console.log("hmmmmmmmmmmm");
  //     console.log(url);
  //     console.log(token);
  //     // const url = `${url}/Maintenance/MachineDetailById`;
  //     try {
  //       const response = await axios.get(`${url}/Maintenance/MachineDetailById`, {
  //         headers: {
  //           'Content-Type': 'application/json; charset=UTF-8',
  //         },
  //       });

  //       if (response.status === 200 && Array.isArray(response.data)) {
  //         const machineBody = response.data;

  //         machineData = machineBody.map(machine => ({
  //           value: machine.MachineId,
  //           label: machine.MachineName
  //         }));
  //         console.log("MachData.......", machineData);
  //         SetMachine(machineData)

  //         if (SparPartId) {
  //           getSparePartData();
  //         }



  //       } else {
  //         console.error('Unexpected response:', response);
  //         setError('Failed to fetch machine list. Unexpected response from server.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching machine list:', error.message);
  //       console.error(error); 
  //       setError('Failed to fetch machine list. Please check the server configuration.');
  //     }
  //   };

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
          setIsLoading(false);
          console.log(response.data)
          console.log('image respnse')
          // notifySuccess();
          setTimeout(() => {
            setLoading(false);
            // navigate('/sparepartlist');
          }, 1000);
          return response.data;
        } else {
          setIsLoading(false);

          return response.data
        }

      } catch (err) {
        setIsLoading(false);
        // notifyError('Error, While Sending File')
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
            Spare Part In
          </h2>
          <Form onSubmit={handleSubmit}>
            <div className="subCard2">
              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="PartyName">
                    <Form.Label style={{ fontWeight: "bold" }}>Party Name</Form.Label>
                    <Select

                      value={PartyName}

                      onChange={handlePartyNameChange}
                      placeholder="Select Party Name"
                      options={party}

                      styles={!fieldErrors.PartyName ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.PartyName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PartyName}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="partModelNo">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                    <Select

                      value={SparePartModelNo}

                      onChange={handleSparePartModelChange}
                      placeholder="Select Spare Part Model Number"
                      options={SparePart}
                      styles={!fieldErrors.SparePartModelNo ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
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
                      readOnly = "true"
                      // required
                      style={!fieldErrors.SparePartName ? inputStyle : inputStyles}

                    />
                    {fieldErrors.SparePartName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartName}</div>}
                  </Form.Group>
                </Col>


              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="PoNumber">
                    <Form.Label style={{ fontWeight: "bold" }}>P O Number</Form.Label>
                    <Select

                      value={PONumber}

                      onChange={handlePONumberChange}
                      placeholder="Select P O Number"
                      options={PO}
                      styles={!fieldErrors.PONumber ? customSelectStyles : customSelectStyles1}
                    //   required

                    />
                    {fieldErrors.PONumber && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PONumber}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="machineName">
                    <Form.Label style={{ fontWeight: "bold" }}>Machine Name</Form.Label>
                    <Select

                      value={MachineNames}
                      isMulti

                      onChange={handleMachineNameChange}
                      placeholder="Select Machine Name"
                      options={Machine}
                      styles={!fieldErrors.MachineNames ? customSelectStyles : customSelectStyles1}
                      readOnly
                      isDisabled={true} 
                    //   required

                    />
                    {fieldErrors.MachineNames && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineNames}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="brand">
                    <Form.Label style={{ fontWeight: "bold" }}>Spare Part Brand Name</Form.Label>
                    <Form.Control
                      type="Text"
                      name="brand"
                      value={Brand}
                      onChange={(e) => {
                        setBrand(e.target.value)
                        handleFieldChange('Brand', e.target.value);
                      }}
                      placeholder="Spare Part Brand Name"
                      //   required
                      style={!fieldErrors.Brand ? inputStyle : inputStyles}
                      readOnly = "true"
                    />
                    {fieldErrors.Brand && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Brand}</div>}

                  </Form.Group>
                </Col>


              </Row>

              <Row>

                <Col className='py-2' md={4}>
                  <Form.Group controlId="Specification">
                    <Form.Label style={{ fontWeight: "bold" }}>Specification</Form.Label>
                    <Form.Control
                      type="text"
                      name="Specification"
                      value={Specification}
                      onChange={(e) => {
                        setSpecification(e.target.value)
                        handleFieldChange('Specification', e.target.value);
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
                    <Form.Label style={{ fontWeight: "bold" }}>Quantity in PCS(In PO)</Form.Label>
                    <Form.Control
                      type="number"
                      name="pcs"
                      value={PCS}
                      onChange={(e) => {
                        setPCS(e.target.value)
                        handleFieldChange('PCS', e.target.value);
                      }}
                      placeholder="PCS"
                      readOnly = "true"
                      //     required
                      style={!fieldErrors.PCS ? inputStyle : inputStyles}
                    />
                    {fieldErrors.PCS && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.PCS}</div>}
                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
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
                </Col>



              </Row>

              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="units">
                    <Form.Label style={{ fontWeight: "bold" }}>Units</Form.Label>
                    <Form.Control
                      type="Text"
                      name="Pieces"
                      value={Units}
                      onChange={(e) => {
                        setUnits(e.target.value)
                        handleFieldChange('Units', e.target.value);
                      }}
                      placeholder="Enter Units"
                      readOnly = "true"
                      //   required
                      style={!fieldErrors.Units ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Units && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Units}</div>}


                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="currency">
                    <Form.Label style={{ fontWeight: "bold" }}>Currency</Form.Label>
                    <Form.Control
                      type="Text"
                      name="currency"
                      value={Currency}
                      onChange={handleCurrencyChange}
                      placeholder="Enter Currency"
                      readOnly = "true"
                      //   required
                      style={!fieldErrors.Currency ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Currency && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Currency}</div>}


                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="Price">
                    <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                    <Form.Control
                      type="Text"
                      name="currency"
                      value={Price}
                      onChange={handlePriceChange}
                      placeholder="Enter Price"
                      readOnly = "true"
                      //   required
                      style={!fieldErrors.Price ? inputStyle : inputStyles}
                    />
                    {fieldErrors.Price && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Price}</div>}


                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="totalCost">
                    <Form.Label style={{ fontWeight: "bold" }}>Total Cost</Form.Label>
                    <Form.Control
                      type="text"
                      name="totalCost"
                      value={TotalCost}
                      placeholder="Total Cost"
                      readOnly
                      style={!fieldErrors.TotalCost ? inputStyle : inputStyles}
                    />
                    {fieldErrors.TotalCost && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.TotalCost}</div>}

                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="Invoice Number">
                    <Form.Label style={{ fontWeight: "bold" }}>Invoice Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="invoice No"
                      value={Invoice}
                      onChange={(e) => {
                        setInvoice(e.target.value)
                        handleFieldChange('Invoice', e.target.value);
                      }}
                      placeholder="Invoice"
                      //  required
                      style={!fieldErrors.Invoice ? inputStyle : inputStyles}

                    />
                    {fieldErrors.Invoice && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.Invoice}</div>}

                  </Form.Group>
                </Col>
                <Col className='py-2' md={4}>
                  <Form.Group controlId="Upload Invoice PDF">
                    <Form.Label style={{ fontWeight: "bold" }}>Upload Invoice PDF</Form.Label>
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      ref={pdfInputRef}
                      style={!fieldErrors.pdfInputRef ? inputStyle : inputStyles}

                      />
                      {fieldErrors.pdfInputRef && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.pdfInputRef}</div>}
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

export default SparePartIn;