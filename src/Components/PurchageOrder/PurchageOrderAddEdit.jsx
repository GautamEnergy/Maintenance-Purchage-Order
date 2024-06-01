import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Purchage.css';
import ItemTable from '../Table/table';
import OptionalField from '../OptionalField/OptionalField';

const currentDate = new Date().toLocaleDateString();
const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

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

    return (
        <>
            <div className="mainCard">
                <div className="fullPage">
                    <form className="form-detail" onSubmit={handleSubmit}>
                        <h2>Purchase Order</h2>
                        <div className="subCard">
                            <div className="row">
                                <input
                                    type="text"
                                    name="series"
                                    id="series"
                                    className="input-text"
                                    placeholder="Series"
                                    value={series}
                                    onChange={handleSeriesChange}
                                    required
                                />
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="date"
                                    id="date"
                                    className="input-text"
                                    value={`${currentDate} (${currentDay})`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="subCard">
                            <div className="row">
                                <input
                                    type="text"
                                    name="vochNo"
                                    id="vochNo"
                                    className="input-text"
                                    placeholder="Voch No."
                                    value={vochNo}
                                    onChange={handleVochNoChange}
                                    required
                                />
                            </div>
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
                                    required
                                />
                                <datalist id="purcTypeOptions">
                                    {purchaseTypes.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                        <div className="subCard">
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
                                    required
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
                                    required
                                />
                                <datalist id="MatCent">
                                    {material.map((option) => (
                                        <option key={option.value} value={option.label} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                name="narration"
                                id="narration"
                                className="input-text"
                                placeholder="Narration"
                                value={narration}
                                onChange={handleNarrationChange}
                                required
                            />
                        </div>
                        {/* <div className="row-last">
                            <input
                                type="submit"
                                name="register"
                                className="register"
                                value="Save"
                            />
                        </div> */}
                    </form>

                </div>
            </div>
            <section1>
                <ItemTable />
            </section1>

            <section2>
                <OptionalField />
            </section2>


        </>


    );
};

export default PurchageForm;
