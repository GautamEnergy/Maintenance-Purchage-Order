import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Purchage.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';
import NewParty from '../New Party/NewParty';



// const currentDate = new Date().toLocaleDateString();
const currentDate = new Date().toDateString();
// const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

const purchaseTypes = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
];

const parties = [
    { value: 'party1', label: 'Party 1' },
    { value: 'party2', label: 'Party 2' },
];

const material = [
    { value: 'material1', label: 'Material 1' },
    { value: 'material2', label: 'Material 2' },
];

const PurchageForm = () => {
    const [series, setSeries] = useState('');
    const [vochNo, setVochNo] = useState('');
    const [purcType, setPurcType] = useState('');
    const [party, setParty] = useState('');
    const [matCent, setMatCent] = useState('');
    const [narration, setNarration] = useState('');
    const [showNewPartyModal, setShowNewPartyModal] = useState(false);

    const handleSeriesChange = (e) => setSeries(e.target.value);
    const handleVochNoChange = (e) => setVochNo(e.target.value);
    const handlePurcTypeChange = (e) => setPurcType(e.target.value);
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
            // Add event listener to close modal on outside click
            const handleClickOutside = (event) => {
                if (event.target.className.includes('modal')) {
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
                                    value={series}
                                    onChange={handleSeriesChange}

                                />
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    className="input-text"
                                    value={`${currentDate} `}
                                    // value={`${currentDate} (${currentDay})`}
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
                                    value={vochNo}
                                    onChange={handleVochNoChange}

                                />
                            </div>
                        </div>
                        <div className="subCard2">

                            <div className="row">
                                <input
                                    type="text"
                                    name="purcType"
                                    id="purcType"
                                    className="input-text"
                                    list="purcTypeOptions"
                                    placeholder="Purc Type"
                                    value={purcType}
                                    onChange={handlePurcTypeChange}

                                />
                                <datalist id="purcTypeOptions">
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="row">
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
                                <datalist id="partyOptions">
                                    {parties.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="matCent"
                                    id="matCent"
                                    className="input-text"
                                    list="MatCent"
                                    placeholder="Mat Cent"
                                    value={matCent}
                                    onChange={handleMatCentChange}

                                />
                                <datalist id="MatCent">
                                    {material.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
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
                    <button className="NewParty" onClick={() => setShowNewPartyModal(true)}>
                        {/* New Party */}
                        <img src='./Assets/Icons/add2.png' alt="Party" />
                    </button>
                </div>
            </div>
            {showNewPartyModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <NewParty />
                </div>

            )}

            <section>
                <section1>
                    <ItemTable />
                </section1>
                <OptionalField />
            </section>





        </>


    );
};

export default PurchageForm;
