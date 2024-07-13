import React, { useState, useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import ItemMaster from '../Add Item Master/ItemMaster';
import './table.css';
import BillForm from '../Billing/Billing';


const ItemTable = () => {
    const [items, setItems] = useState([
        { id: 1, item: '', qty: '', unit: '', price: '', amount: 0 }
    ]);
    const [showItemMaster, setShowItemMaster] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);



    const handleAddRow = () => {
        const newItem = { id: Date.now(), item: '', qty: '', unit: '', price: '', amount: 0 };
        setItems([...items, newItem]);
    };

    const handleItemChange = (e, id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [e.target.name]: e.target.value } : item
        );
        setItems(updatedItems);
    };

    const handleDeleteRow = id => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    useEffect(() => {
        if (showItemMaster) {
            const handleClickOutside = (event) => {
                const className = event.target.className;
                if (typeof className === 'string' && className.includes('modal')) {
                    setShowItemMaster(false);
                } else if (className.baseVal) {
                    // If className is an SVGAnimatedString (for SVG elements), check baseVal
                    if (className.baseVal.includes('modal')) {
                        setShowItemMaster(false);
                    }
                }
            };

            window.addEventListener('click', handleClickOutside);

            return () => {
                window.removeEventListener('click', handleClickOutside);
            };
        }
    }, [showItemMaster]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [items]);

    const handleSubmit = () => {
        console.log("Items:", items);
        console.log("Total Amount:", totalAmount);
    };

    return (
        <>
            <Container className="my-4">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>S.N. no.</th>
                            <th>
                                <div className="item-wrapper">
                                    <span className="item-text">Item</span>
                                    <button className="btn btn-link" onClick={() => setShowItemMaster(true)}>
                                        <IoIosAddCircleOutline />
                                    </button>
                                </div>
                            </th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Price Rs</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-field"
                                        name="item"
                                        value={item.item}
                                        onChange={e => handleItemChange(e, item.id)}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="qty"
                                        value={item.qty}
                                        onChange={e => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="unit"
                                        value={item.unit}
                                        onChange={e => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={item.price}
                                        onChange={e => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                </td>
                                <td>{item.qty * item.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteRow(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-right"><strong>Total Amount</strong></td>
                            <td><strong>{totalAmount}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </Table>
                <button className="btn btn-primary" onClick={handleAddRow}>
                    Add Row
                </button>
                <button className="btn btn-secondary ml-2" onClick={handleSubmit}>
                    Submit
                </button>
                {/* <BillForm totalAmount={totalAmount} /> */}
            </Container>

            {showItemMaster && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <ItemMaster />

                </div>
            )}
        </>
    );
};

export default ItemTable;
