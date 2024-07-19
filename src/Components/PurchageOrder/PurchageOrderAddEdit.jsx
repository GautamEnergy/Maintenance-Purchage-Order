import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import Billing from '../Billing/Billing';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

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
];




const PurchageForm = () => {
    const [series, setSeries] = useState('GST-2024-2025');
    const [vochNo, setVochNo] = useState('GST-2024-2025');
    const [purcType, setPurcType] = useState('');
    const [PartyName, setPartyName] = useState('');
    const [company, setMatCompany] = useState('');
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
  
    /** 
     * ! Item Table States
     */
    const [showItemMaster, setShowItemMaster] = useState(false);
    const [modelNoList, setModelNoList] = useState([]);
    const [SparePartModelNumber, setSparePartModelNumber] = useState('');
    const [filteredModelNoList, setFilteredModelNoList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [SparePartName, setSparePartName] = useState('');
    const [items, setItems] = useState([{ id: 1, modelNumber: '', spareName: '', qty: '', unit: '', price: '', SparePartId:'' }]);
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
        console.log(url);
        getPartyListData();
        getCompanyName();

    }, []);

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
        if (!series) newErrors.series = 'Series is required.';
        if (!purcType) newErrors.purcType = 'Purchase Type is required.';
        if (!PartyName) newErrors.PartyName = 'Party Name is required.';
        if (!company) newErrors.company = 'Company is required.';
        if (!paymentTerm) newErrors.paymentTerm = 'Payment Term  is required.';
        if (!deleveryTerm) newErrors.deleveryTerm = 'Delivery Term  is required.';
        if (!contactPer) newErrors.contactPer = 'Contact Person  is required.';
        if (!cellNo) newErrors.cellNo = 'Cell No  is required.';
        const itemErrors = items.reduce((acc, item) => {
            const itemError = {};
            if (!item.spareName) itemError.spareName = 'Spare Name is required';
            if (!item.qty) itemError.qty = 'Quantity is required';
            if (!item.unit) itemError.unit = 'Unit is required';
            if (!item.price) itemError.price = 'Price is required';
    
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
    

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log(e)
        if (!validateForm()) {
            return;
        }

        const PurchaseData = {
            series,
            vochNo,
            purcType,
            PartyName,
            company,
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

        const BilingData = {
            /**Freight & Discount */
            narrationDiscount,
            percentageDiscount,
            remainingAmountAfterDiscount,
            narrationFreight, 
            percentageFreight, 
            amountFreight,
            
            /**IGST */
            narrationIGST, 
            percentageIGST, 
            amountIGST, 

           /**SGST */
            narrationSGST, 
            percentageSGST, 
            amountSGST,
    
            /**CGST */
            narrationCGST, 
            percentageCGST, 
            amountCGST, 

            finalAmout
        }

        const reqData = {
            PurchaseData,
            BilingData,
            tableData,
            optionalData
        }
        console.log(reqData)
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
        setPartyName(e.target.value);

    };

    const handleChangeCompany = (e) => {
        console.log(e.target.value)
        setMatCompany(e.target.value);
        if (errors.company) {
            setErrors((prevErrors) => ({ ...prevErrors, company: '' }));
        }
    };

    return (
        <div className="container mt-5">

            <div className="card" style={{borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',borderBottom:'0px'}}>
                <div className="card-body">
                    <form >
                        <div className="row g-3 mb-3">
                            <h4>Purchase Order</h4>
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
                                <label htmlFor="purcType" className="form-label">Purchase Type*</label>
                                <select
                                    style={{ border: errors.purcType ? '2px solid red' : '2px solid green' }}
                                    id="purcType"
                                    className="form-select"
                                    value={purcType}
                                    onChange={handleChangePurcType}
                                >
                                    <option value="">Select Purchase Type</option>
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.purcType && <div className="text-danger">{errors.purcType}</div>}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="PartyName" className="form-label">Party Name*</label>


                                <select
                                    style={{ border: errors.partyName ? '2px solid red' : '2px solid green' }}
                                    id="partyName"
                                    className="form-select"
                                    value={PartyName}
                                    onChange={handleChangePartyName}
                                >
                                    <option value="">Select Party Name</option>
                                    {PartyList.map((party, index) => (
                                        <option key={index} value={party.PartyNameId}>
                                            {party.PartyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.PartyName && <div className="text-danger">{errors.PartyName}</div>}
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="company" className="form-label">Company Name*</label>
                                <select
                                    style={{ border: errors.company ? '2px solid red' : '2px solid green' }}
                                    id="company"
                                    className="form-select"
                                    value={company}
                                    onChange={handleChangeCompany}
                                >
                                    <option value="">Select Company</option>
                                    {CompanyName.map((option, index) => (
                                        <option key={index} value={option.CompanyName}>
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
                                      setPaymentTerm(e.target.value)
                                 }}required style={{border:"1px,black,solid"}} />
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
                                     setDeleveryTerm(e.target.value)
                                }}
                                style={{border:"1px,black,solid"}}/>
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
                                      setcontactPer(e.target.value)
                                 }} required  style={{border:"1px,black,solid"}}/>
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
                                      setcellNo(e.target.value)
                                 }}
                                 required style={{border:"1px,black,solid"}} />
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
                                      setwarranty(e.target.value)
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
                items={items} setItems={setItems}/>
                <Billing formData={formData}/>
                <Button onClick={handleSubmit} type="submit">Submit</Button>
            </section>

        </div>
    );
};

export default PurchageForm;

