import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './OptionalField.css';

const OptionalField = () => {
    return (
        <>
            <div className="First-Card">
                <h2>Optional Field</h2>
                <Form>
                    <div className="user-box">
                        <Form.Control type="text" placeholder="Enter payment terms" required />
                        <Form.Label>Payment Terms</Form.Label>
                    </div>

                    <div className="user-box">
                        <Form.Control type="text" placeholder="Enter delivery terms" required />
                        <Form.Label>Delivery Terms</Form.Label>
                    </div>

                    <div className="user-box">
                        <Form.Control type="text" placeholder="Enter contact person" required />
                        <Form.Label>Contact Person</Form.Label>
                    </div>

                    <div className="user-box">
                        <Form.Control type="number" placeholder="Enter cell number" required />
                        <Form.Label>Cell No.</Form.Label>
                    </div>

                    <div className="user-box">
                        <Form.Control type="text" placeholder="Enter warranty details" required />
                        <Form.Label>Warranty</Form.Label>
                    </div>

                    <Button variant="primary" type="submit" className="submit-button">
                        OK
                    </Button>

                </Form>
            </div>


        </>
    );
};

export default OptionalField;
