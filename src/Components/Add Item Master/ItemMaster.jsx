import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ItemMaster = () => {
    const [itemName, setItemName] = useState('');
    const [itemGroup, setItemGroup] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');
    const [line4, setLine4] = useState('');
    const [line5, setLine5] = useState('');
    const [line6, setLine6] = useState('');
    const [line7, setLine7] = useState('');
    const [line8, setLine8] = useState('');
    const [line9, setLine9] = useState('');
    const [line10, setLine10] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formVisible, setFormVisible] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (itemName && itemGroup && itemUnit) {
            const itemData = {
                itemName,
                itemGroup,
                itemUnit,
                line1,
                line2,
                line3,
                line4,
                line5,
                line6,
                line7,
                line8,
                line9,
                line10
            };
            console.log('Form data submitted:', itemData);

            setItemName('');
            setItemGroup('');
            setItemUnit('');
            setLine1('');
            setLine2('');
            setLine3('');
            setLine4('');
            setLine5('');
            setLine6('');
            setLine7('');
            setLine8('');
            setLine9('');
            setLine10('');

            setError('');
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleback = (e) => {
        // navigate('/dashboard');
        // setItemMasterVisible(false);
        setFormVisible(false);
    }

    if (!formVisible) {
        return
    }


    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>

                                <Row className="mt-4">
                                    <Col className="d-flex justify-content-between">
                                        <Button variant="secondary" type="button" className="register" onClick={handleback} >Back</Button>
                                        <Button type="submit"  >Submit</Button>
                                    </Col>
                                </Row>
                                <Card.Title className="text-center mb-4" >Add Item Master</Card.Title>
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Row  >
                                    <Col md={4} >
                                        <Form.Group className="mb-3" >
                                            <Form.Label >Name <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={itemName}
                                                onChange={(e) => setItemName(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Group <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={itemGroup}
                                                onChange={(e) => setItemGroup(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Unit <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={itemUnit}
                                                onChange={(e) => setItemUnit(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <h5 className="text-center mb-4" >Item Add Field / Description</h5>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 1</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line1}
                                                onChange={(e) => setLine1(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 2</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line2}
                                                onChange={(e) => setLine2(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 3</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line3}
                                                onChange={(e) => setLine3(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 4</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line4}
                                                onChange={(e) => setLine4(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 5</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line5}
                                                onChange={(e) => setLine5(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 6</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line6}
                                                onChange={(e) => setLine6(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 7</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line7}
                                                onChange={(e) => setLine7(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 8</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line8}
                                                onChange={(e) => setLine8(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 9</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line9}
                                                onChange={(e) => setLine9(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Line 10</Form.Label>
                                            <Form.Control
                                                style={{ border: '2px solid green' }}
                                                type="text"
                                                value={line10}
                                                onChange={(e) => setLine10(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>



                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ItemMaster;

