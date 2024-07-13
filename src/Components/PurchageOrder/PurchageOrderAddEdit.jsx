import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import NewParty from '../New Party/NewParty';
import { FaUser } from 'react-icons/fa';
import Billing from '../Billing/Billing';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const currentDate = new Date().toDateString();
// const selectedPurcType = purchaseTypes.find(type => type.value === purcType);
// console.log('Purchase Type', selectedPurcType);

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


const parties = [
    { value: 'party1', label: 'Party 1' },
    { value: 'party2', label: 'Party 2' },
];

const material = [
    {
        gstin: '05AAFCG5884Q1ZU',
        cin: 'U31900DL2014PTC266805',
        name: 'Gautam Solar Private Limited UNIT II',
        address: 'Plot No 67-70, Sec 8A,IIE Ranipur Sidcul Haridwar',
        state: 'Uttarakhand',
        pin: '249403',
        email: 'sohan@gautamsolar.com' && 'sunil@gautamsolar.com',
    },
    {
        gstin: '06AAFCG5884Q1ZS',
        name: 'Gautam Solar Private Limited Bhiwani',
        address: '7KM Milestone, Tosham Road,Dist.Bhiwani,Bawani Khera,Bhiwani',
        state: 'Haryana',
        pin: '127032',
        email: 'sohan@gautamsolar.com' && 'purchase@gautamsolar.com',
    },
    {
        gstin: '05AAFCG5884Q1ZU',
        name: 'Gautam Solar Private Limited UNIT I',
        address: 'Plot No 114,115 Sec 6A Sidcul Haridwar',
        state: 'Uttarakhand',
        pin: '249403',
        email: 'purchase@gautamsolar.com' && 'sohan@gautamsolar.com' && 'purchase@gautamsolar.com ',
    },
];

const PurchageForm = () => {
    const [series, setSeries] = useState('GST-2024-2025');
    const [vochNo, setVochNo] = useState('GST-2024-2025');
    const [purcType, setPurcType] = useState('');
    const [PartyName, setPartyName] = useState('');
    const [matCent, setMatCent] = useState('');
    const [narration, setNarration] = useState('');
    const [showNewPartyModal, setShowNewPartyModal] = useState(false);

    const [totalAmount, setTotalAmount] = useState('');

    const navigate = useNavigate();


    console.log(setTotalAmount)


    const totalPurchage = async (PurchaseData) => {
        try {
            const response = await axios.post('YOUR_API_ENDPOINT', PurchaseData);
            console.log(response.data);
            clearForm();
        } catch (error) {
            console.error('Error making API request:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('fsdjifhsdfhsdfhsyuf');
        console.log(totalAmount);

        console.log({
            series,
            vochNo,
            purcType,
            PartyName,
            matCent,
            narration,
            currentDate,
        });

        console.log('Test Value');

        // const selectedPurcType = purchaseTypes.find(type => type.value === purcType);
        // console.log('Purchase Type', selectedPurcType);

        // console.log(purcType);

        if (series && vochNo && purcType && PartyName && matCent && narration && currentDate) {
            const PurchaseData = {
                series,
                vochNo,
                purcType,
                PartyName,
                matCent,
                narration,
                currentDate,
            }
            totalPurchage(PurchaseData);
        }
    };

    const clearForm = () => {
        // Reset form
        setSeries('');
        setVochNo('');
        setPurcType('');
        setPartyName('');
        setMatCent('');
        setNarration('');
    };


    useEffect(() => {
        if (showNewPartyModal) {
            const handleClickOutside = (event) => {
                const className = event.target.className;
                if (typeof className === 'string' && className.includes('modal')) {
                    setShowNewPartyModal(false);
                }
            };

            window.addEventListener('click', handleClickOutside);

            return () => {
                window.removeEventListener('click', handleClickOutside);
            };
        }
    }, [showNewPartyModal]);

    const handleBack = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card" style={{ marginTop: '123px' }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-4">Purchase Order</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="series"
                                    id="series"
                                    className="form-control"
                                    placeholder="Series"
                                    value={series}
                                    disabled
                                    readOnly
                                    style={{ border: '1px solid black' }}

                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    className="form-control"
                                    value={currentDate}
                                    readOnly
                                    style={{ border: '1px solid black' }}

                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="vochNo"
                                    id="vochNo"
                                    className="form-control"
                                    placeholder="Voch No."
                                    value={vochNo}
                                    readOnly
                                    disabled
                                    style={{ border: '1px solid black' }}

                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    style={{ border: '1px solid black' }}
                                    name="purcType"
                                    id="purcType"
                                    className="form-select"
                                    value={purcType}
                                    onChange={(e) => setPurcType(e.target.value)}
                                >
                                    <option value="">Select Purc Type</option>
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 position-relative">
                                <input
                                    type="text"
                                    name="PartyName"
                                    id="PartyName"
                                    className="form-control"
                                    list="partyOptions"
                                    placeholder="Party"
                                    value={PartyName}
                                    onChange={(e) => setPartyName(e.target.value)}
                                    style={{ border: '1px solid black' }}

                                />
                                <button
                                    type="button"
                                    className="btn btn-link position-absolute top-0 end-0"
                                    onClick={() => setShowNewPartyModal(true)}
                                >
                                    <FaUser className="icon" />
                                </button>
                                <datalist id="partyOptions">
                                    {parties.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="mb-3">
                                <select
                                    name="matCent"
                                    id="matCent"
                                    className="form-select"
                                    value={matCent}
                                    onChange={(e) => setMatCent(e.target.value)}
                                    style={{ border: '1px solid black' }}


                                >
                                    <option value="">Select Mat Cent</option>
                                    {material.map((option, index) => (
                                        <option key={index} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="narration"
                                    id="narration"
                                    className="form-control"
                                    placeholder="Narration"
                                    value={narration}
                                    style={{ border: '1px solid black' }}
                                    onChange={(e) => setNarration(e.target.value)}

                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" className="btn btn-danger" onClick={handleBack}>Back</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            {showNewPartyModal && (
                <div className="modal fade show d-block">
                    <div className="modal-dialog" >
                        <div className="modal-content" style={{ width: '700px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">New Party</h5>
                                <button type="button" className="btn-close" onClick={() => setShowNewPartyModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ marginBottom: '87px' }}>
                                <NewParty />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="mt-5">
                <ItemTable setAmount={setTotalAmount} totalAmount={totalAmount} />
                <Billing GSTdata={purcType} totalAmount={totalAmount} />
                <OptionalField />
            </section>
        </>
    );
};

export default PurchageForm;
