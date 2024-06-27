import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Purchage.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import NewParty from '../New Party/NewParty';
import { FaUser } from 'react-icons/fa';
import Billing from '../Billing/Billing';

const currentDate = new Date().toDateString();

const purchaseTypes = [
    { value: 'I/GST-5%', label: 'I/GST-5%' },
    { value: 'I/GST-12%', label: 'I/GST-12%' },
    { value: 'I/GST-18%', label: 'I/GST-18%' },
    { value: 'I/GST-28%', label: 'I/GST-28%' },
    { value: 'L/GST-5%', label: 'L/GST-5%' },
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
    const [series, setSeries] = useState('');
    const [vochNo, setVochNo] = useState('');
    const [purcType, setPurcType] = useState('');
    const [party, setParty] = useState('');
    const [matCent, setMatCent] = useState('');
    const [narration, setNarration] = useState('');
    const [showNewPartyModal, setShowNewPartyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handlePartyChange = (e) => setParty(e.target.value);
    const handleMatCentChange = (e) => setMatCent(e.target.value);
    const handleNarrationChange = (e) => setNarration(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            series,
            vochNo,
            purcType,
            party,
            matCent,
            narration,
        });

        // Reset form
        setSeries('');
        setVochNo('');
        setPurcType('');
        setParty('');
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

    return (
        <>
            <div className="mainCard">
                <div className="fullPage">
                    <form className="form-detail" onSubmit={handleSubmit}>
                        <h2>Purchase Order</h2>

                        <div className="subCard1">
                            <div className="row">
                                <input
                                    type="text"
                                    name="series"
                                    id="series"
                                    className="input-text"
                                    placeholder="Series"
                                    value="GST-2024-2025"
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    className="input-text"
                                    value={`${currentDate} `}
                                    readOnly
                                />
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="vochNo"
                                    id="vochNo"
                                    className="input-text"
                                    placeholder="Voch No."
                                    value="GST-2024-2025"
                                    readOnly
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="subCard2">
                            <div className="row">
                                <select
                                    style={{
                                        borderRadius: '33px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid #ccc'
                                    }}
                                    name="purcType"
                                    id="purcType"
                                    className="input-text"
                                    value={purcType}
                                    onChange={(e) => setPurcType(e.target.value)}
                                >
                                    <option value="">Select Purc Type</option>
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.value} >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="row" style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    name="party"
                                    id="party"
                                    className="input-text"
                                    list="partyOptions"
                                    placeholder="Party"
                                    value={party}
                                    onChange={handlePartyChange}
                                />
                                <button
                                    type="button"
                                    className="NewParty"
                                    onClick={() => setShowNewPartyModal(true)}
                                    style={{ position: 'absolute', top: 12, width: '30px', right: 10 }}
                                >
                                    <FaUser className="icon" />
                                </button>
                                <datalist id="partyOptions">
                                    {parties.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>

                            <div className="row">
                                <select
                                    style={{
                                        borderRadius: '33px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid #ccc'
                                    }}
                                    name="matCent"
                                    id="matCent"
                                    className="input-text"
                                    value={matCent}
                                    onChange={handleMatCentChange}
                                >
                                    <option value="">Select Mat Cent</option>
                                    {material.map((option, index) => (
                                        <option key={index} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="subCard3">
                            <div className="row">
                                <input
                                    type="text"
                                    name="narration"
                                    id="narration"
                                    className="input-text"
                                    placeholder="Narration"
                                    value={narration}
                                    onChange={handleNarrationChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {showNewPartyModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <NewParty />
                </div>
            )}

            <section>
                <ItemTable />
                <Billing />
                <OptionalField />
            </section>
        </>
    );
};

export default PurchageForm;
