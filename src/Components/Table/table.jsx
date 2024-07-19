import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import ItemMaster from '../Add Item Master/ItemMaster';
import axios from 'axios';
import './table.css';
import { AppContext } from '../../ContextAPI';
import Select from 'react-select';


const ItemTable = ({setAmount,totalAmount,showItemMaster,
    modelNoList,
    setModelNoList,
    setErrors, items, setItems,errors}) => {
  

    useEffect(() => {
        getSpareModelNo();
    }, []);
    console.log(errors);
    console.log("Errors Prop in ItemTable:", errors);
    
    

    const getSpareModelNo = async () => {
        const token = localStorage.getItem("token");
        console.log("Fetching modelNo list...");
        console.log(token);

        try {
            const response = await axios.post(
                'http://srv515471.hstgr.cloud:8080/Maintenance/GetAutoData',
                { required: "Spare Part Model No" },
                { headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}` } }
            );

            console.log('API Response:', response);

            if (response.status === 200 && Array.isArray(response.data.data)) {
                const SparePartId = response.data.data;
                console.log('Fetched Spare Part Model Numbers:', SparePartId);

                setModelNoList(SparePartId);
            } else {
                console.error('Unexpected response:', response);
                setErrors('Failed to fetch Model No. list. Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching Model No. list:', error.message);
            setErrors('Failed to fetch Model No. list. Please check the server configuration.');
        }
    };

    // const handleSearchChange = (e) => {
    //     const query = e.target.value;
    //     setSearchQuery(query);
    //     if (query) {
    //         setFilteredModelNoList(
    //             modelNoList.filter(model =>
    //                 model.SparePartModelNumber.toLowerCase().includes(query.toLowerCase())
    //             )
    //         );
    //     } else {
    //         setFilteredModelNoList(modelNoList); // Show all if query is empty
    //     }
    // };

    const handleChangeModelNumber = async (selectedOption, id) => {
        console.log(selectedOption);
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, modelNumber: selectedOption.value || '' } : item
        );

        let { data } = await axios.post(`http://srv515471.hstgr.cloud:8080/Maintenance/GetAutoData`, {
            "required": "Spare Part Name",
            "SparePartId": selectedOption.value
        })

        let item = items.map((item) => {
            return {
                id: item.id,
                spareName: item.id == id ? item.spareName = data.data[0]['SparePartName'] : item.spareName,
                modelNumber: item.id == id ? item.modelNumber = selectedOption.label : item.modelNumber,
                qty: item.qty,
                unit: item.unit,
                price: item.price,
                SparePartId: item.id == id ? item.SparePartId = selectedOption.value:item.SparePartId
            }
        });
        const updatedErrors = { ...errors };
    if (updatedErrors[id] && updatedErrors[id].modelNumber) {
        delete updatedErrors[id].modelNumber;
        if (Object.keys(updatedErrors[id]).length === 0) {
            delete updatedErrors[id];
        }
    }

    setItems(item);
    setErrors(updatedErrors);
    };

    const handleAddRow = () => {
        const newItem = { id: Date.now(), spareName: '', modelNumber: '', qty: '', unit: '', price: '' };
        setItems([...items, newItem]);
    };

    const handleItemChange = (e, id) => {
        const { name, value } = e.target;
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        );
        const updatedErrors = { ...errors };
        if (updatedErrors[id] && updatedErrors[id][name]) {
            delete updatedErrors[id][name];
            if (Object.keys(updatedErrors[id]).length === 0) {
                delete updatedErrors[id];
            }
        }
    
        setItems(updatedItems);
        setErrors(updatedErrors);
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
            setAmount(total);
        };

        calculateTotalAmount();
    }, [items, setAmount]);

    // const handleSubmit = () => {
    //     const itemsWithAmount = items.map(item => ({
    //         ...item,
    //         amount: item.qty * item.price
    //     }));

    //     console.log("Items:", itemsWithAmount);
    //     console.log("Total Amount:", totalAmount);
    //     // You can perform further actions here, like submitting the data to a server
    // };

    const handleDeleteRow = id => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    return (
        <>
            <Container className="my-4">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>S.No.*</th>
                            <th>Spare Part Model Number*</th>
                            <th>Spare Part Name</th>
                            <th>Qty*</th>
                            <th>Unit*</th>
                            <th>Price Rs*</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Select
                                        className="form"
                                        value={(item.SparePartModelNumber)}
                                        onChange={(selectedOption) => handleChangeModelNumber(selectedOption, item.id)}
                                        options={modelNoList.map(model => ({ value: model.SparePartId, label: model.SparePartModelNumber }))}
                                        
                                    />
                                    {errors?.[item.id]?.modelNumber && (
                            <div className="invalid-feedback">{errors[item.id].modelNumber}</div>
                        )}
                                    
                                    
                                   
                                </td>
                                <td>
                                    <input
                                        type="text"
                                       // className="form-control input-field"
                                        className={`form-control input-field ${errors[item.id]?.spareName ? 'is-invalid' : ''}`}
                                        name="spareName"

                                        value={item.spareName}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        readOnly = "true"
                                    />
                                      {errors[item.id]?.spareName && (
                            <div className="invalid-feedback">{errors[item.id].spareName}</div>
                        )}
                        
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="qty"
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                     {errors[item.id]?.qty && (
                            <div className="invalid-feedback">{errors[item.id].qty}</div>
                        )}
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="unit"
                                        value={item.unit}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                     {errors[item.id]?.unit && (
                            <div className="invalid-feedback">{errors[item.id].unit}</div>
                        )}
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />
                                    {errors[item.id]?.price && (
                            <div className="invalid-feedback">{errors[item.id].price}</div>
                        )}
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
                            <td colSpan="6" className="text-right"><strong>Total Amount</strong></td>
                            <td><strong>{totalAmount}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </Table>
                <button className="btn btn-primary" onClick={handleAddRow}>
                    Add Row
                </button>
                {/* <button className="btn btn-secondary ml-2" onClick={handleSubmit}>
                    Submit
                </button> */}
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
