import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import Billing from '../Billing/Billing';
import { useNavigate } from 'react-router-dom';
import img1 from "../../Assets/Images/logogs.png";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import Loader from '../Loader/Loader';

const currentDate = new Date().toDateString();

const purchaseTypes = [
    { value: 'I/GST-05%', label: 'I/GST-05%' },
    { value: 'I/GST-12%', label: 'I/GST-12%' },
    { value: 'I/GST-18%', label: 'I/GST-18%' },
    { value: 'I/GST-28%', label: 'I/GST-28%' },
    { value: 'L/GST-05%', label: 'L/GST-05%' },
    { value: 'L/GST-12%', label: 'L/GST-12%' },
    { value: 'L/GST-18%', label: 'L/GST-18%' },
    { value: 'L/GST-28%', label: 'L/GST-28%' },
    { value: 'I/GST-item wise', label: 'I/GST-item wise' },
];




const PurchageForm = () => {
    const [series, setSeries] = useState('GST-2024-2025');
    const [vochNo, setVochNo] = useState('GST-2024-2025');
    const [selectedPartyCountry, setSelectedPartyCountry] = useState("");
    const [purcType, setPurcType] = useState('');
    const [PartyName, setPartyName] = useState('');
    const [company, setMatCompany] = useState('');
    const [companyId, setCompanyId] = useState("");
    const [narration, setNarration] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [Party, setParty] = useState('');
    const [errors, setErrors] = useState({});
    const [PartyList, setPartyList] = useState([])
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [token, setToken] = useState("");
    const [paymentTerm, setPaymentTerm] = useState("");
    const [deleveryTerm, setDeleveryTerm] = useState("");
    const [contactPer, setcontactPer] = useState("");
    const [cellNo, setcellNo] = useState("");
    const [warranty, setwarranty] = useState("");
    const [CompanyName, setCompanyName] = useState([]);
    const [loading, setLoading] = useState();
    
    /** 
     * ! Item Table States
     * 
     */
    const [GST,SetGST] = useState('');
    const [showItemMaster, setShowItemMaster] = useState(false);
    const [modelNoList, setModelNoList] = useState([]);
    const [SparePartModelNumber, setSparePartModelNumber] = useState('');
    const [filteredModelNoList, setFilteredModelNoList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [SparePartName, setSparePartName] = useState('');
    const [items, setItems] = useState([{ id: 1, modelNumber: '', spareName: '', qty: '', unit: '', price: '',gst: '', SparePartId:'',amount:'' }]);
    /**
     * ! Item Table States
     */

    /**
     *  ? States of Biling Component
     */
    
    const [narrationDiscount, setNarrationDiscount] = useState('');
    const [percentageDiscount, setPercentageDiscount] = useState('');
    const [remainingAmountAfterDiscount, setRemainingAmountAfterDiscount] = useState();
    const [discountAmmount, setDiscountAmmount] = useState(0);
    const [narrationFreight, setNarrationFreight] = useState('');
    const [percentageFreight, setPercentageFreight] = useState('');
    const [amountFreight, setAmountFreight] = useState(0);
    const [narrationIGST, setNarrationIGST] = useState('');
    const [percentageIGST, setPercentageIGST] = useState('');
    const [amountIGST, setAmountIGST] = useState('');
    const [narrationSGST, setNarrationSGST] = useState('');
    const [percentageSGST, setPercentageSGST] = useState('');
    const [amountSGST, setAmountSGST] = useState('');
    const [narrationCGST, setNarrationCGST] = useState('');
    const [percentageCGST, setPercentageCGST] = useState('');
    const [amountCGST, setAmountCGST] = useState('');
    const [finalAmout, setFinalAmount] = useState('');
    const [data, setData] = useState(true);
    const [transportAmmount, settransportAmmount] = useState('')
    console.log(transportAmmount)

    const formData = {
        GSTdata:purcType, totalAmount, narrationDiscount, setNarrationDiscount,
        percentageDiscount, setPercentageDiscount,
        remainingAmountAfterDiscount, setRemainingAmountAfterDiscount,
        discountAmmount, setDiscountAmmount,
        narrationFreight, setNarrationFreight,
        percentageFreight, setPercentageFreight,
        amountFreight, setAmountFreight,
        transportAmmount, settransportAmmount,

        narrationIGST, setNarrationIGST,
        percentageIGST, setPercentageIGST,
        amountIGST, setAmountIGST,

        narrationSGST, setNarrationSGST,
        percentageSGST, setPercentageSGST,
        amountSGST, setAmountSGST,

        narrationCGST, setNarrationCGST,
        percentageCGST, setPercentageCGST,
        amountCGST, setAmountCGST,
        finalAmout, setFinalAmount,
        data 
      }


    /**
     *  ? States of Biling Component
     */
    

    useEffect(() => {
        const personID = localStorage.getItem("CurrentUser");
        const token = localStorage.getItem("token");
        // const url = localStorage.getItem('url');
        // setUrl(url);



        if (token) {
            setToken(token);
        }
        // console.log('URL CHECK');
        console.log(personID);
        getPartyListData();
        getCompanyName();
        fetchVoucherNumber();

    }, []);
    const notifySuccess = (msg) => toast.success("New Spare Part Added Successfully!", { autoClose: 5000 });
    const notifySuccess1 = (msg) => toast.success(msg, { autoClose: 3000 })
    const fetchVoucherNumber = async () => {
        try {
            const token = localStorage.getItem("token"); // If you need to pass a token
            const response = await axios.get('http://srv515471.hstgr.cloud:8080/Maintenance/GetVoucherNumber', {
                headers: {
                    'Authorization': `Bearer ${token}` // If you need to pass a token
                }
            });
            const voucherNumber = response.data.VoucherNumber;
            const formattedVoucherNumber = voucherNumber < 10 ? `0${voucherNumber}` : voucherNumber;
            setVochNo(prevVochNo => {
                // If the previous value already contains a voucher number, remove it before appending the new one
                const baseVochNo = 'GST-24-25';
                return `${baseVochNo}-${formattedVoucherNumber}`;
            });
        } catch (error) {
            console.error('Error fetching voucher number:', error);
        }
    };

    const getPartyListData = async () => {
        const token = localStorage.getItem("token");
        const url = localStorage.getItem('url');
        console.log("Fetching party list...");
        console.log(url);
        console.log(token);

        try {
            const response = await axios.get('http://srv515471.hstgr.cloud:8080/Maintenance/GetParty', {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (response.status === 200 && Array.isArray(response.data)) {
                const partyNames = response.data;

                setPartyList(partyNames);
            } else {
                console.error('Unexpected response:', response);
                setErrors('Failed to fetch party list. Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching party list:', error.message);
            console.error(error); // Log the full error object
            setErrors('Failed to fetch party list. Please check the server configuration.');
        }
    };


    const getCompanyName = async () => {
        const token = localStorage.getItem("token");
        console.log("Fetching modelNo list...");
        console.log(token);

        try {
            const response = await axios.post(
                'http://srv515471.hstgr.cloud:8080/Maintenance/GetAutoData',
                { required: "Company Name" },
                { headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}` } }
            );

            console.log('API Response:', response);

            if (response.status === 200 && Array.isArray(response.data.data)) {
                const SparePartId = response.data.data;
                console.log('Fetched Spare Part Model Numbers:', SparePartId);

                setCompanyName(SparePartId);
            } else {
                console.error('Unexpected response:', response);
                setErrors('Failed to fetch Model No. list. Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching Model No. list:', error.message);
            setErrors('Failed to fetch Model No. list. Please check the server configuration.');
        }
    };
   


    const validateForm = () => {
        const newErrors = {};
        if (!companyId) {
            newErrors.company = 'Company is required';
        }
        if (!series) newErrors.series = 'Series is required.';
        if (selectedPartyCountry === "India" && !purcType) {
        newErrors.purcType = 'Purchase Type is required.';
        }

       // if (!purcType) newErrors.purcType = 'Purchase Type is required.';
        if (!PartyName) newErrors.PartyName = 'Party Name is required.';
        //if (!company) newErrors.company = 'Company is required.';
        if (!paymentTerm) newErrors.paymentTerm = 'Payment Term  is required.';
        if (!deleveryTerm) newErrors.deleveryTerm = 'Delivery Term  is required.';
        if (!contactPer) newErrors.contactPer = 'Contact Person  is required.';
        if (!cellNo) newErrors.cellNo = 'Cell No  is required.';
        const itemErrors = items.reduce((acc, item) => {
            const itemError = {};
            if(!item.modelNumber) itemError.modelNumber = 'Spare Model No is required'
            if (!item.spareName) itemError.spareName = 'Spare Name is required';
            if (!item.qty) itemError.qty = 'Quantity is required';
            if (!item.unit) itemError.unit = 'Unit is required';
            if (!item.price) itemError.price = 'Price is required';
            if (purcType === "I/GST-item wise" && !item.gst) {
                itemError.gst = 'GST is required';
            }
    
            if (Object.keys(itemError).length > 0) {
                acc[item.id] = itemError;
            }
            return acc;
        }, {});
    
        if (Object.keys(itemErrors).length > 0) {
            newErrors.items = itemErrors;
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleCancel = (e) => {
        navigate('/polist');
    }
    

    
    useEffect((e) => {         
            if(items?.[0]?.modelNumber || items?.[0]?.qty || items?.[0]?.price){
                validateForm();  
            }     
    }, [items]);
    

    const handleSubmit = async (e) => {
        const personID = localStorage.getItem("CurrentUser");
        console.log("lalalallalallala");
        
        e.preventDefault();
        console.log(e)
        if (!validateForm()) {
            console.log("lalalallalallalam");
            return;
        }
        console.log("lalalallalallalan");

        const PurchaseData = {
            currentUser: personID,
            series,
            vochNo,
            purcType,
            PartyName,
            company:companyId,
            narration,
            currentDate,
        };

        const optionalData = {
            paymentTerm,
            deleveryTerm,
            contactPer,
            cellNo,
            warranty
        }

        const tableData = {
            items,
            totalAmount
        }
         
        
        const BilingData = [
            {
              "Bill_Sundry":"Discount",
              "Narration":narrationDiscount,
              "Percentage":percentageDiscount,
               "Amount":remainingAmountAfterDiscount,
               "Total_Amount":finalAmout
            },
            {
                "Bill_Sundry":"Freight",
                "Narration":narrationFreight,
                "Percentage":percentageFreight,
                 "Amount":amountFreight,
                 "Total_Amount":finalAmout
              },
              {
                "Bill_Sundry":"IGST",
                "Narration":narrationIGST,
                "Percentage":percentageIGST,
                 "Amount":amountIGST,
                 "Total_Amount":finalAmout
              },
              {
                "Bill_Sundry":"SGST",
                "Narration":narrationSGST,
                "Percentage":percentageSGST,
                 "Amount":amountSGST,
                 "Total_Amount":finalAmout
              },
              {
                "Bill_Sundry":"CGST",
                "Narration":narrationCGST,
                "Percentage":percentageCGST,
                 "Amount":amountCGST,
                 "Total_Amount":finalAmout
              }
        ]

        const reqData = {
            PurchaseData,
            BilingData,
            tableData,
            optionalData
        }
        setLoading(true);
        console.log(reqData)
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                'http://srv515471.hstgr.cloud:8080/Maintenance/AddPurchaseOrder',
                reqData,
                { headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}` } }
            );

            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data);
                notifySuccess1('Order Placed Succesfully!🎉');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/polist');
                  }, 1000);
            } else {
                setLoading(false);
                console.error('Unexpected response:', response);
                setErrors(prevErrors => ({ ...prevErrors, form: 'Failed to submit form. Unexpected response from server.' }));
            }
        } catch (error) {
            setLoading(false);
            console.error('Error submitting form:', error.message);
            setErrors(prevErrors => ({ ...prevErrors, form: 'Failed to submit form. Please check the server configuration.' }));
        }
    };

 
    const clearForm = () => {
        setSeries('');
        setVochNo('');
        setPurcType('');
        setPartyName('');
        setMatCompany('');
        setNarration('');
        setErrors({});
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleChangePurcType = (e) => {
        setPurcType(e.target.value);
        if (errors.purcType) {
            setErrors((prevErrors) => ({ ...prevErrors, purcType: '' }));
        }

    };

    const handleChangePartyName = (e) => {
        const selectedPartyId = e.target.value;
        setPartyName(selectedPartyId);

        const selectedParty = PartyList.find(party => party.PartyNameId === selectedPartyId);
        if (selectedParty) {
            setSelectedPartyCountry(selectedParty.Country);
        } else {
            setSelectedPartyCountry("");
        }
        if (errors.PartyName) {
            setErrors((prevErrors) => ({ ...prevErrors, PartyName: '' }));
        }

    };

    const handleChangeCompany = (e) => {
        setCompanyId(e.target.value);
        if (errors.company) {
            setErrors((prevErrors) => ({ ...prevErrors, company: '' }));
        }
    };
    return (
        <Container style={{ marginTop: "6%", width: "75%" }} className="fullPage py-5">
             <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
             {loading && (
                <div className="loader-overlay">
                    <Loader type="ThreeDots" color="#006bff" height={80} width={80} />
                </div>
            )}
            <div className={`form-content ${loading ? 'blurred' : ''}`}>
            <Image src={img1} alt="" className="text-center" rounded style={{ width: '25%', marginLeft: "36%" }} />
            <h2 className="text-center" style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', marginTop: "12px", marginBottom: '12px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    Purchase Order
                </h2>
        <div className="container mt-5">

            <div className="card" style={{borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',borderBottom:'0px'}}>
                <div className="card-body">
                    <form >
                        <div className="row g-3 mb-3">
                            
                            <div className="col-md-4">
                                <label htmlFor="series" className="form-label">Series*</label>
                                <input
                                    style={{ border: errors.series ? '2px solid red' : '2px solid green' }}
                                    type="text"
                                    id="series"
                                    className="form-control"
                                    value={series}
                                    disabled
                                    readOnly
                                />
                                {errors.series && <div className="text-danger">{errors.series}</div>}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="date" className="form-label">Date*</label>
                                <input
                                    style={{ border: '2px solid green' }}
                                    type="text"
                                    id="date"
                                    className="form-control"
                                    value={currentDate}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="vochNo" className="form-label">VochNo*</label>
                                <input
                                    style={{ border: '2px solid green' }}
                                    type="text"
                                    id="vochNo"
                                    className="form-control"
                                    value={vochNo}
                                    readOnly
                                />
                            </div>
                        </div>
                        

                        <div className="row g-3 mb-3">
                        <div className="col-md-4">
                                <label htmlFor="PartyName" className="form-label">Party Name*</label>


                                <select
                                    style={{ border: errors.PartyNameId ? '2px solid red' : '2px solid green' }}
                                    id="partyName"
                                    className="form-select"
                                    value={PartyName}
                                    onChange={handleChangePartyName}
                                >
                                    <option value=""disabled>Select Party Name</option>
                                    {PartyList.map((party, index) => (
                                        <option key={index} value={party.PartyNameId}>
                                            {party.PartyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.PartyName && <div className="text-danger">{errors.PartyName}</div>}
                            </div>
                            {selectedPartyCountry === "India"?<div className="col-md-4">
                                <label htmlFor="purcType" className="form-label">Purchase Type*</label>
                                <select
                                    style={{ border: errors.purcType ? '2px solid red' : '2px solid green' }}
                                    id="purcType"
                                    className="form-select"
                                    placeholder ="Select Purchase Type"
                                    value={purcType}
                                    onChange={handleChangePurcType}
                                    disabled={selectedPartyCountry !== "India"}
                                >
                                    <option value=""disabled>Select Purchase Type</option>
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.purcType && <div className="text-danger">{errors.purcType}</div>}
                            </div>:""}
                            
                          
                            <div className="col-md-4">
                                <label htmlFor="company" className="form-label">Company Name*</label>
                                <select
                                    style={{ border: errors.company ? '2px solid red' : '2px solid green' }}
                                    id="company"
                                    className="form-select"
                                    value={companyId}
                                    onChange={handleChangeCompany}
                                >
                                    <option value="" disabled>Select a Company</option>
                                    {CompanyName.map((option, index) => (
                                        <option key={index} value={option.CompanyID}>
                                            {option.CompanyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.company && <div className="text-danger">{errors.company}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="narration" className="form-label">Narration</label>
                                <input
                                    style={{ border: errors.narration ? '2px solid red' : '2px solid green' }}
                                    type="text"
                                    id="narration"
                                    className="form-control"
                                    value={narration}
                                    onChange={(e) => setNarration(e.target.value)}
                                />
                            </div>
                        </div>


                        {/* <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div> */}
                    </form>
                </div>
            </div>
            <section>
            <div className="First-Card">
          
            <Container style={{ backgroundColor: 'white', padding: '20px',
                 borderBottomLeftRadius:'8px',
                 borderBottomRightRadius:'8px',
                 borderTop:'0px' }}>
                <Form>
                    <Row>
                    <h2>Optional Field</h2>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="formPaymentTerms">
                                <Form.Label>Payment Terms*</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder='Enter Payment Term'
                                 value={paymentTerm} 
                                 onChange={(e)=>{
                                    const value = e.target.value
                                      setPaymentTerm(value)
                                      if (value.trim() === '') {
                                        setErrors((prevErrors) => ({ ...prevErrors, paymentTerm: 'Payment term is Required' }))
                                    }
                                    else {
                                        setErrors((prevErrors) => ({ ...prevErrors, paymentTerm: '' }));

                                    }
                                 }}required    style={{ border: errors.paymentTerm ? '2px solid red' : '2px solid black' }} />
                                 {errors.paymentTerm && <div className="text-danger">{errors.paymentTerm}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="formDeliveryTerms">
                                <Form.Label>Delivery Terms*</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder='Enter Delivery Term'
                                value={deleveryTerm} 
                                onChange={(e)=>{
                                    const value = e.target.value
                                     setDeleveryTerm(value)
                                     if (value.trim() === '') {
                                        setErrors((prevErrors) => ({ ...prevErrors, deleveryTerm: 'Delivery term is Required' }))
                                    }
                                    else {
                                        setErrors((prevErrors) => ({ ...prevErrors, deleveryTerm: '' }));

                                    }
                                }}
                                style={{ border: errors.deleveryTerm ? '2px solid red' : '2px solid black' }}/>
                                 {errors.deleveryTerm && <div  className="text-danger"> {errors.deleveryTerm}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="formContactPerson">
                                <Form.Label>Contact Person*</Form.Label>
                                <Form.Control 
                                type="text"
                                 placeholder='Enter Contact Person'
                                 value={contactPer} 
                                 onChange={(e)=>{
                                    const value = e.target.value
                                      setcontactPer(value)
                                      if (value.trim() === '') {
                                        setErrors((prevErrors) => ({ ...prevErrors, contactPer: 'Cell No is Required' }))
                                    }
                                    else {
                                        setErrors((prevErrors) => ({ ...prevErrors, contactPer: '' }));

                                    }
                                 }} required     style={{ border: errors.contactPer ? '2px solid red' : '2px solid black' }}/>
                                 {errors.contactPer && <div className="text-danger">{errors.contactPer}</div>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="formCellNo">
                                <Form.Label>Cell No.*</Form.Label>
                                <Form.Control
                                 type="text"
                                 placeholder='Enter Cell No'
                                 value={cellNo} 
                                 onChange={(e)=>{
                                      const value = e.target.value
                                      setcellNo(value)
                                      if (value.trim() === '') {
                                        setErrors((prevErrors) => ({ ...prevErrors, cellNo: 'Cell No is Required' }))
                                    }
                                    else {
                                        setErrors((prevErrors) => ({ ...prevErrors, cellNo: '' }));

                                    }
                                 }}
                                 required    style={{ border: errors.cellNo ? '2px solid red' : '2px solid black' }} />
                                   {errors.cellNo && <div className="text-danger">{errors.cellNo}</div>}
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId="formWarranty">
                                <Form.Label>Warranty</Form.Label>
                                <Form.Control 
                                type="text"
                                placeholder='Enter Warranty'
                                value={warranty} 
                                 onChange={(e)=>{
                                   const value = e.target.value
                                      setwarranty(value)
                                      
                                    
                                 }}  style={{border:"1px,black,solid"}}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* Uncomment the button if you need it */}
                    {/* <Button variant="primary" type="submit" className="submit-button">
                        OK
                    </Button> */}
                </Form>
            </Container>
        </div>

            </section>

            <section className="mt-5">
                <ItemTable  setAmount={setTotalAmount} totalAmount={totalAmount} showItemMaster={showItemMaster} 
                modelNoList={modelNoList} setModelNoList={setModelNoList} setErrors={setErrors} errors={errors.items || {}}
                items={items} setItems={setItems}
                purchType={purcType}
                />
                <Billing formData={formData}/>
               
                <Row>
                        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="button" className="register" onClick={handleCancel} style={{ width: '150px', height: '43px', background: '#545454', margin: '10px' }}>Cancel</Button>
                            <Button type="submit" className="register" onClick={handleSubmit} style={{ width: '150px', height: '43px', background: '#006bff', margin: '10px' }}>Submit</Button>
                        </Col>
                    </Row>
            </section>

        </div>
        </div>
        </div>
        <ToastContainer  position='top-center'/>
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

export default PurchageForm;

