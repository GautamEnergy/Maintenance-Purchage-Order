import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const BillForm = () => {
    const [formData, setFormData] = useState({
        sn: '',
        billSundary: '',
        narration: '',
        percentage: '',
        amount: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <Table bordered>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Bill Sundary</th>
                        <th>Narration</th>
                        <th>@ (%)</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter S.N."
                                name="sn"
                                value={formData.sn}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Control
                                as="select"
                                name="billSundary"
                                value={formData.billSundary}
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                <option value="Discount">Discount</option>
                                <option value="Freight">Freight</option>
                                <option value="IGST">IGST</option>
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Narration"
                                name="narration"
                                value={formData.narration}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter %"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BillForm;
