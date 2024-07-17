import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import Billing from '../Billing/Billing';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

// const companyName = [
//     {
//         gstin: '05AAFCG5884Q1ZU',
//         cin: 'U31900DL2014PTC266805',
//         name: 'Gautam Solar Private Limited UNIT II',
//         address: 'Plot No 67-70, Sec 8A,IIE Ranipur Sidcul Haridwar',
//         state: 'Uttarakhand',
//         pin: '249403',
//         email: 'sohan@gautamsolar.com' && 'sunil@gautamsolar.com',
//     },
//     {
//         gstin: '06AAFCG5884Q1ZS',
//         name: 'Gautam Solar Private Limited Bhiwani',
//         address: '7KM Milestone, Tosham Road,Dist.Bhiwani,Bawani Khera,Bhiwani',
//         state: 'Haryana',
//         pin: '127032',
//         email: 'sohan@gautamsolar.com' && 'purchase@gautamsolar.com',
//     },
//     {
//         gstin: '05AAFCG5884Q1ZU',
//         name: 'Gautam Solar Private Limited UNIT I',
//         address: 'Plot No 114,115 Sec 6A Sidcul Haridwar',
//         state: 'Uttarakhand',
//         pin: '249403',
//         email: 'purchase@gautamsolar.com' && 'sohan@gautamsolar.com' && 'purchase@gautamsolar.com ',
//     },
// ];


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

    const [CompanyName, setCompanyName] = useState([]);



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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        console.log(PurchaseData);

        // try {
        //     const response = await axios.post('YOUR_API_ENDPOINT', PurchaseData);
        //     console.log(response.data);
        //     clearForm();
        // } catch (error) {
        //     console.error('Error making API request:', error);
        // }
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

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3 mb-3">
                            <h4>Purchase Order</h4>
                            <div className="col-md-4">
                                <label htmlFor="series" className="form-label">Series</label>
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
                                <label htmlFor="date" className="form-label">Date</label>
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
                                <label htmlFor="vochNo" className="form-label">VochNo</label>
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
                                <label htmlFor="purcType" className="form-label">Purchase Type</label>
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
                                <label htmlFor="PartyName" className="form-label">Party Name</label>


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
                                <label htmlFor="company" className="form-label">Company Name</label>
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


                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-danger" onClick={handleBack}>Back</button>
                        </div>
                    </form>
                </div>
            </div>

            <section className="mt-5">
                <ItemTable setAmount={setTotalAmount} totalAmount={totalAmount} />
                <Billing GSTdata={purcType} totalAmount={totalAmount} />
                <OptionalField />
            </section>
        </div>
    );
};

export default PurchageForm;

