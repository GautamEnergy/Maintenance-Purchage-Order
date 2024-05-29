import React, { useState } from 'react';
import { Form, Row, Col, Button, Navbar, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';

const currentDate = new Date().toLocaleDateString();
const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

const options = [
    { value: 'mat1', label: 'Material 1' },
    { value: 'mat2', label: 'Material 2' },
    { value: 'mat3', label: 'Material 3' },
];

const purchaseTypes = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
];

const parties = [
    { value: 'party1', label: 'Party 1' },
    { value: 'party2', label: 'Party 2' },
];

const material = [
    { value: 'material1', label: 'material 1' },
    { value: 'material2', label: 'material 2' },
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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '44px' }}>
            <Container className="mt-4" style={{ flex: 1 }}>
                <Card>
                    <Card.Header>
                        <h4 style={{ color: '#7199DA' }}>Add Purchage Order</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={4} controlId="series">
                                    <Form.Label>Series</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={series}
                                        onChange={handleSeriesChange}

                                    />
                                </Form.Group>

                                <Form.Group as={Col} xs={12} sm={4} controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="text" value={`${currentDate} (${currentDay})`} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} xs={12} sm={4} controlId="vochNo">
                                    <Form.Label>Voch No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={vochNo}
                                        onChange={handleVochNoChange}

                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={4} controlId="purcType">
                                    <Form.Label>Purc Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        list="purcTypeOptions"
                                        value={purcType}
                                        onChange={handlePurcTypeChange}

                                    />
                                    <datalist id="purcTypeOptions">
                                        {purchaseTypes.map((option) => (
                                            <option key={option.value} value={option.label} />
                                        ))}
                                    </datalist>
                                </Form.Group>

                                <Form.Group as={Col} xs={12} sm={4} controlId="party">
                                    <Form.Label>Party</Form.Label>
                                    <Form.Control
                                        type="text"
                                        list="partyOptions"
                                        value={party}
                                        onChange={handlePartyChange}

                                    />
                                    <datalist id="partyOptions">
                                        {parties.map((option) => (
                                            <option key={option.value} value={option.label} />
                                        ))}
                                    </datalist>
                                </Form.Group>

                                <Form.Group as={Col} xs={12} sm={4} controlId="matCent">
                                    <Form.Label>Mat Cent</Form.Label>
                                    <Form.Control
                                        type="text"
                                        list="MatCent"
                                        value={matCent}
                                        onChange={handleMatCentChange}

                                    />
                                    <datalist id="MatCent">
                                        {material.map((option) => (
                                            <option key={option.value} value={option.label} />
                                        ))}
                                    </datalist>
                                </Form.Group>



                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} xs={12} sm={6} controlId="narration">
                                    <Form.Label>Narration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={narration}
                                        onChange={handleNarrationChange}

                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <Container style={{ flex: 1 }}>
                <ItemTable />
            </Container>


        </div>
    );
};

export default PurchageForm;
