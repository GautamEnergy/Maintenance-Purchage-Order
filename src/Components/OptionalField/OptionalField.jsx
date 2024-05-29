import React from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const OptionalField = () => {
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Header as="h5">Optional Field </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formPaymentTerms" className="mb-3">
                                        <Form.Label>Payment Terms</Form.Label>
                                        <Form.Control type="text" placeholder="Enter payment terms" />
                                    </Form.Group>

                                    <Form.Group controlId="formDeliveryTerms" className="mb-3">
                                        <Form.Label>Delivery Terms</Form.Label>
                                        <Form.Control type="text" placeholder="Enter delivery terms" />
                                    </Form.Group>

                                    <Form.Group controlId="formContactPerson" className="mb-3">
                                        <Form.Label>Contact Person</Form.Label>
                                        <Form.Control type="text" placeholder="Enter contact person" />
                                    </Form.Group>

                                    <Form.Group controlId="formCellNo" className="mb-3">
                                        <Form.Label>Cell No.</Form.Label>
                                        <Form.Control type="number" placeholder="Enter cell number" />
                                    </Form.Group>

                                    <Form.Group controlId="formWarranty" className="mb-3">
                                        <Form.Label>Warranty</Form.Label>
                                        <Form.Control type="text" placeholder="Enter warranty details" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
                                        OK
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default OptionalField
