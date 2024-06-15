import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Billing = () => {
    const [formEntries, setFormEntries] = useState([
        {
            billSundry: '',
            narration: '',
            value: '',
            percent: "",
            amount: ''
        }
    ]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Handle change in input fields
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newFormEntries = [...formEntries];
        newFormEntries[index][name] = value;

        // Calculate amount based on billSundry and value
        if (name === 'value' || name === 'billSundry') {
            let amount = 0;
            if (newFormEntries[index].billSundry === 'Discount') {
                // Calculate Discount
                amount = -((parseFloat(value) * totalAmount) / 100);
            } else {
                // Calculate other entries
                amount = (parseFloat(value) * parseFloat(newFormEntries[index].percent)) / 100;
            }
            newFormEntries[index].amount = isNaN(amount) ? 0 : amount;
        }

        setFormEntries(newFormEntries);
    };

    // Add new entry
    const addTable = () => {
        setFormEntries([
            ...formEntries,
            {
                billSundry: '',
                narration: '',
                value: '',
                percent: '',
                amount: 0
            }
        ]);
    };

    // Delete entry
    const deleteEntry = (index) => {
        const newFormEntries = formEntries.filter((_, i) => i !== index);
        setFormEntries(newFormEntries);
    };

    // Calculate total amount
    useEffect(() => {
        const subTotal = formEntries.reduce((acc, entry) => {
            if (entry.billSundry !== 'Discount') {
                return acc + entry.amount;
            }
            return acc;
        }, 0);

        const discount = formEntries.reduce((acc, entry) => {
            if (entry.billSundry === 'Discount') {
                return acc + entry.amount;
            }
            return acc;
        }, 0);

        setTotalAmount(subTotal + discount);
    }, [formEntries]);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h4>Billing Form</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">S.N.</th>
                                    <th scope="col">Bill Sundry</th>
                                    <th scope="col">Narration</th>
                                    <th scope="col">@ (%)</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formEntries.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <select className="form-control" name="billSundry" value={entry.billSundry} onChange={(e) => handleChange(index, e)}>
                                                <option value="">Select...</option>
                                                <option value="SGST">SGST</option>
                                                <option value="CGST">CGST</option>
                                                <option value="IGST">I/GST</option>
                                                <option value="IGST-item-wise">I/GST-Item Wise</option>
                                                <option value="LGST">L/GST</option>
                                                <option value="LGST-item-wise">L/GST-Item Wise</option>
                                                <option value="Discount">Discount</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" name="narration" value={entry.narration} onChange={(e) => handleChange(index, e)} />
                                        </td>
                                        <td>
                                            <input type="number" className="form-control" name="value" value={entry.value} onChange={(e) => handleChange(index, e)} />
                                        </td>
                                        <td>
                                            <input type="number" className="form-control" name="amount" value={entry.amount} readOnly />
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteEntry(index)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <h5>Total Amount: {totalAmount}</h5>
                </div>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-success" onClick={addTable}>Add Row</button>
            </div>
        </div>
    );
};

export default Billing;
