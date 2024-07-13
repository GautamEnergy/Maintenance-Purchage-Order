import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const BillForm = ({ GSTdata, totalAmount }) => {

    const [narrationDiscount, setNarrationDiscount] = useState('');
    const [percentageDiscount, setPercentageDiscount] = useState('');
    const [amountDiscount, setAmountDiscount] = useState('');

    const [narrationFreight, setNarrationFreight] = useState('');
    const [percentageFreight, setPercentageFreight] = useState('');
    const [amountFreight, setAmountFreight] = useState('');

    const [narrationIGST, setNarrationIGST] = useState('');
    const [percentageIGST, setPercentageIGST] = useState('');
    const [amountIGST, setAmountIGST] = useState('');

    const [narrationSGST, setNarrationSGST] = useState('');
    const [percentageSGST, setPercentageSGST] = useState('');
    const [amountSGST, setAmountSGST] = useState('');

    const [narrationCGST, setNarrationCGST] = useState('');
    const [percentageCGST, setPercentageCGST] = useState('');
    const [amountCGST, setAmountCGST] = useState('');

    const [data, setData] = useState(true);
    // const [totalAmount, setTotalAmount] = useState('');



    useEffect(() => {
        const extractInteger = (str) => {
            if (!str) return ''; // Check if str is undefined or null
            const match = str.match(/\d+/);
            return match ? parseInt(match[0], 10) : '';
        };

        const gstValue = extractInteger(GSTdata);
        const gstPercentage = gstValue / 2;

        if (GSTdata && GSTdata.includes('L/GST')) {
            setPercentageIGST("");
            setPercentageSGST(gstPercentage);
            setPercentageCGST(gstPercentage);
            setAmountSGST(((totalAmount * gstPercentage) / 100).toFixed(2));
            setAmountCGST(((totalAmount * gstPercentage) / 100).toFixed(2));
        } else {
            setPercentageSGST("");
            setPercentageCGST("");
            setPercentageIGST(gstValue);
            setAmountIGST(((totalAmount * gstValue) / 100).toFixed(2));
        }

        console.log('selected  GST Data:', GSTdata);
        console.log('selected  GST Value:', gstValue);
    }, [GSTdata, totalAmount]);

    const handlePercentageChange = (type, value) => {
        if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
            let discount = (totalAmount * Number(value)) / 100;
            discount = discount.toFixed(2);
            switch (type) {
                case 'discount':
                    setPercentageDiscount(value);
                    setAmountDiscount(discount);
                    break;
                case 'freight':
                    setPercentageFreight(value);
                    setAmountFreight('');
                    break;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            discount: { narration: narrationDiscount, percentage: percentageDiscount, amount: amountDiscount },
            freight: { narration: narrationFreight, percentage: percentageFreight, amount: amountFreight },
            igst: { narration: narrationIGST, percentage: percentageIGST, amount: amountIGST },
            sgst: { narration: narrationSGST, percentage: percentageSGST, amount: amountSGST },
            cgst: { narration: narrationCGST, percentage: percentageCGST, amount: amountCGST },
        };
        console.log(formData);

        console.log(narrationDiscount);
        console.log(percentageDiscount);
        console.log(amountDiscount);
    };


    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <Table bordered>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Bill Sundry</th>
                        <th>Narration</th>
                        <th>@ (%)</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {data == true &&
                        <tr>
                            <td>1</td>
                            <td>Discount</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationDiscount}
                                    onChange={(e) => setNarrationDiscount(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageDiscount}
                                    // onChange={(e) => setPercentageDiscount(e.target.value)}
                                    onChange={(e) => handlePercentageChange('discount', e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Total Amount"
                                    value={amountDiscount ? totalAmount - amountDiscount : ''}
                                    // onChange={(e) => setAmountDiscount(e.target.value)}
                                    readOnly
                                />
                            </td>
                        </tr>
                    }

                    {data == true &&
                        <tr>
                            <td>2</td>
                            <td>Freight</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationFreight}
                                    onChange={(e) => setNarrationFreight(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter %"
                                    value={percentageFreight}
                                    onChange={(event) => {
                                        let value = event.target.value;
                                        let perValue = (value / 100) * totalAmount
                                        console.log(perValue)
                                        setAmountFreight(perValue)
                                        setPercentageFreight(value)
                                    }}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Total Amount"
                                    value={amountFreight ? amountFreight + totalAmount : ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                    }

                    {percentageIGST
                        &&
                        <tr>
                            <td>3</td>
                            <td>IGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationIGST}
                                    onChange={(e) => setNarrationIGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter %"
                                    value={percentageIGST}
                                    onChange={(e) => setPercentageIGST(e.target.value)}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Amount"
                                    value={Number(amountIGST) + Number(totalAmount)}
                                    onChange={(e) => setAmountIGST(e.target.value)}
                                />
                            </td>
                        </tr>

                    }
                    {percentageSGST &&
                        <tr>
                            <td>4</td>
                            <td>SGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationSGST}
                                    onChange={(e) => setNarrationSGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter %"
                                    value={percentageSGST}
                                    onChange={(e) => setPercentageSGST(e.target.value)}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Amount"
                                    value={Number(amountSGST) + Number(totalAmount)}
                                    onChange={(e) => setAmountSGST(e.target.value)}
                                />
                            </td>
                        </tr>
                    }
                    {percentageCGST &&
                        <tr>
                            <td>5</td>
                            <td>CGST</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Narration"
                                    value={narrationCGST}
                                    onChange={(e) => setNarrationCGST(e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter %"
                                    value={percentageCGST}
                                    onChange={(e) => setPercentageCGST(e.target.value)}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Amount"
                                    value={Number(amountCGST) + Number(totalAmount)}
                                    onChange={(e) => setAmountCGST(e.target.value)}
                                />
                            </td>
                        </tr>
                    }

                </tbody>
            </Table>
            <Button type="submit">Submit</Button>
        </Form >
    );
};

export default BillForm;
