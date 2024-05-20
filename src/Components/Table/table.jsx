import React, { useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';

const ItemTable = () => {
    const [items, setItems] = useState([
        { id: 1, item: '', qty: 0, price: 0, amount: 0 }
    ]);

    const handleAddRow = () => {
        const newItem = { id: Date.now(), item: '', qty: 0, price: 0, amount: 0 };
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

    return (
        <Container className="my-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N. no.</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price Rs</th>
                        <th>Amount Rs</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Form.Control
                                    as="select"
                                    name="item"
                                    value={item.item}
                                    onChange={e => handleItemChange(e, item.id)}
                                >
                                    <option>Select an item</option>
                                    <option>Item A</option>
                                    <option>Item B</option>
                                    <option>Item C</option>
                                    {/* Add more items as needed */}
                                </Form.Control>
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="qty"
                                    value={item.qty}
                                    onChange={e => handleItemChange(e, item.id)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={item.price}
                                    onChange={e => handleItemChange(e, item.id)}
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
            </Table>
            <button className="btn btn-primary" onClick={handleAddRow}>
                Add Row
            </button>
        </Container>
    );
};

export default ItemTable;
