// import React, { useState } from 'react';
// import { Form, Button, Table } from 'react-bootstrap';

// const BillForm = () => {
//     const [formData, setFormData] = useState([
//         { sn: '1', billSundary: 'Discount', narration: '', percentage: '', amount: '' },
//         { sn: '2', billSundary: 'Freight', narration: '', percentage: '', amount: '' },
//         { sn: '3', billSundary: 'IGST', narration: '', percentage: '', amount: '' },
//         { sn: '4', billSundary: 'SGST', narration: '', percentage: '', amount: '' },
//         { sn: '5', billSundary: 'CGST', narration: '', percentage: '', amount: '' }
//     ]);

//     const handleChange = (index, e) => {
//         const newFormData = [...formData];
//         newFormData[index][e.target.name] = e.target.value;
//         setFormData(newFormData);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData);
//     };

//     return (
//         <Form onSubmit={handleSubmit} className="p-3">
//             <Table bordered>
//                 <thead>
//                     <tr>
//                         <th>S.N.</th>
//                         <th>Bill Sundary</th>
//                         <th>Narration</th>
//                         <th>@ (%)</th>
//                         <th>Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {formData.map((row, index) => (
//                         <tr key={index}>
//                             <td>{row.sn}</td>
//                             <td>{row.billSundary}</td>
//                             <td>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter Narration"
//                                     name="narration"
//                                     value={row.narration}
//                                     onChange={(e) => handleChange(index, e)}
//                                 />
//                             </td>
//                             <td>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter %"
//                                     name="percentage"
//                                     value={row.percentage}
//                                     onChange={(e) => handleChange(index, e)}
//                                 />
//                             </td>
//                             <td>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter Amount"
//                                     name="amount"
//                                     value={row.amount}
//                                     onChange={(e) => handleChange(index, e)}
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Button type="submit">Submit</Button>
//         </Form>
//     );
// };

// export default BillForm;
import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const BillForm = () => {
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
                                type="text"
                                placeholder="Enter %"
                                value={percentageDiscount}
                                onChange={(e) => setPercentageDiscount(e.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                value={amountDiscount}
                                onChange={(e) => setAmountDiscount(e.target.value)}
                            />
                        </td>
                    </tr>
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
                                type="text"
                                placeholder="Enter %"
                                value={percentageFreight}
                                onChange={(e) => setPercentageFreight(e.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                value={amountFreight}
                                onChange={(e) => setAmountFreight(e.target.value)}
                            />
                        </td>
                    </tr>
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
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                value={amountIGST}
                                onChange={(e) => setAmountIGST(e.target.value)}
                            />
                        </td>
                    </tr>
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
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                value={amountSGST}
                                onChange={(e) => setAmountSGST(e.target.value)}
                            />
                        </td>
                    </tr>
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
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter Amount"
                                value={amountCGST}
                                onChange={(e) => setAmountCGST(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default BillForm;
