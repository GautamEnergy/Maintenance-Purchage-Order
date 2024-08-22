import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Col } from 'react-bootstrap';
import ItemMaster from '../Add Item Master/ItemMaster';
import axios from 'axios';
import './table.css';
import Select from 'react-select';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';


const ItemTable = ({ setAmount, totalAmount, showItemMaster,
    modelNoList,
    setModelNoList,
    purchType,
    setErrors, items, setItems, errors }) => {
    const [url, setUrl] = useState("");


    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        console.log("hiiiiiii", items)
        console.log("namamamm", url);

        getSpareModelNo();
    }, []);
    console.log(errors);
    console.log("Errors Prop in ItemTable:", errors);
    useEffect(() => {
        const resetGstValues = () => {
            const updatedItems = items.map(item => ({
                ...item,
                gst: ''
            }));
            setItems(updatedItems);
        };

        resetGstValues();
    }, [purchType]);

    const colSpanValue = purchType === 'I/GST-item wise' ? 7 : 6;

    const getSpareModelNo = async () => {

        const token = localStorage.getItem("token");
        const url = localStorage.getItem('url');

        console.log("Fetching modelNo list...");
        console.log(token);

        try {
            const response = await axios.post(
                `${url}/Maintenance/GetAutoData`,
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

    const getPartyName = async (selectedOption, id) => {
        const url = localStorage.getItem('url');
        try {
            const { data } = await axios.post(`${url}/Maintenance/GetAutoData`, {
                required: "Spare Part Name",
                SparePartId: selectedOption.value
            });

            const updatedItems = items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        modelNumber: selectedOption.label,
                        spareName: data.data[0].SparePartName,
                        SparePartId: selectedOption.value
                    }
                    : item
            );

            setItems(updatedItems);
            validateField(id, 'modelNumber', selectedOption.label);

            // Debugging: Log the updated state
            console.log('Updated Items:', updatedItems);
        } catch (error) {
            console.error('Error fetching auto data:', error);
        }

    }

    const handleChangeModelNumber = async (selectedOption, id) => {
        getPartyName(selectedOption, id);

    };


    const handleAddRow = () => {
        const newItem = { id: Date.now(), spareName: '', modelNumber: '', qty: '', unit: '', price: '', gst: '' };
        setItems([...items, newItem]);
    };

    const handleItemChange = (e, id) => {
        const { name, value } = e.target;
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        );
        setItems(updatedItems);
        console.log(name)
        validateField(items, name, value);




    };
    const validateField = (items, name, value) => {
        let errors = { ...items.errors };

        switch (name) {
            case 'modelNumber':
            case 'name':
            case 'unit':
            case 'gstNumber':
                if (!value.trim()) {
                    errors[name] = 'This field is required';
                } else {
                    delete errors[name];
                }
                if (name === 'gstNumber' && value.trim()) {
                    const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
                    if (!gstPattern.test(value)) {
                        errors[name] = 'Invalid GST Number';
                    } else {
                        delete errors[name];
                    }
                }
                break;
            case 'qty':
            case 'price':
                if (!value || isNaN(value) || value <= 0) {
                    errors[name] = 'Must be a positive number';
                } else {
                    delete errors[name];
                }
                break;
            default:
                break;
        }

        return errors;
    };


    useEffect(() => {
        const calculateTotalAmount = () => {
            console.log(items)
            console.log('kkkkkkk')
            let total = 0;
            let size = items.length
            for (let i = 0; i < size; i++) {
                if (items[i].gst) {
                    total = total + ((items[i].qty * items[i].price) * (items[i].gst / 100)) + (items[i].qty * items[i].price)

                } else {

                    total = total + items[i].qty * items[i].price
                }
            }

            items.forEach((item) => {
                item.amount = item.qty && item.price ? item.gst ? ((item.qty * item.price) * (item.gst / 100)) + (item.qty * item.price) :
                    item.qty * item.price : '';
            });
            console.log(total)
            setAmount(total);
        };

        calculateTotalAmount();
    }, [items, setAmount]);



    const handleDeleteRow = id => {
        const updatedItems = items.filter((item, index) => index === 0 || item.id !== id);
        setItems(updatedItems);
    };


    return (
        <>
            <Container className="my-9">
                <Table striped bordered hover className="table ">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Spare Part Model Number*</th>
                            <th>Spare Part Name</th>
                            <th>Qty*</th>
                            <th>Unit*</th>
                            <th>Price Rs*</th>
                            {purchType == 'I/GST-item wise' ? <th>GST</th> : ""}
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>

                                <td style={{ width: '222px' }} >
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{item.modelNumber || 'Empty Spare Part Model Number'}</Tooltip>}
                                    >
                                        <Select
                                            className="form"
                                            value={modelNoList.find(model => model.SparePartId === item.SparePartId) ? { value: item.SparePartId, label: item.modelNumber } : ''}
                                            onChange={(selectedOption) => handleChangeModelNumber(selectedOption, item.id)}
                                            options={modelNoList.map(model => ({ value: model.SparePartId, label: model.SparePartModelNumber }))}
                                        />
                                    </OverlayTrigger>
                                    {errors?.[item.id]?.modelNumber && (
                                        <div className="invalid-feedback">{errors[item.id].modelNumber}</div>
                                    )}
                                </td>

                                <td style={{ width: '150px' }}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{item.spareName || 'Empty Spare Part Name	'}</Tooltip>}
                                    >
                                        <input
                                            type="text"
                                            className="form-control input-field"
                                            name="spareName"
                                            value={item.spareName}
                                            onChange={(e) => handleItemChange(e, item.id)}
                                            readOnly="true"
                                        />
                                    </OverlayTrigger>
                                    {errors[item.id]?.spareName && (
                                        <div className="invalid-feedback">{errors[item.id].spareName}</div>
                                    )}

                                </td>

                                <td style={{ width: '100px' }}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{item.qty || 'Empty Qty'}</Tooltip>}
                                    >
                                        <Form.Control
                                            type="number"
                                            name="qty"
                                            value={item.qty}
                                            onChange={(e) => handleItemChange(e, item.id)}
                                            className="input-field"
                                        />
                                    </OverlayTrigger>
                                    {errors[item.id]?.qty && (
                                        <div className="invalid-feedback">{errors[item.id].qty}</div>
                                    )}
                                </td>

                                <td style={{ width: '80px' }}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{item.unit || 'Empty Unit'}</Tooltip>}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="unit"
                                            value={item.unit}
                                            onChange={(e) => handleItemChange(e, item.id)}
                                            className="input-field"
                                        />
                                    </OverlayTrigger>
                                    {errors[item.id]?.unit && (
                                        <div className="invalid-feedback">{errors[item.id].unit}</div>
                                    )}
                                </td>

                                <td style={{ width: '150px' }}>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{item.price || 'Empty Price Rs'}</Tooltip>}
                                    >
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={item.price}
                                            maxLength="8"
                                            onChange={(e) => handleItemChange(e, item.id)}
                                            onInput={(e) => {
                                                if (e.target.value.length > 8) {
                                                    e.target.value = e.target.value.slice(0, 8);
                                                }
                                            }}
                                            className="input-field"
                                        />
                                    </OverlayTrigger>
                                    {errors[item.id]?.price && (
                                        <div className="invalid-feedback">{errors[item.id].price}</div>
                                    )}
                                </td>

                                {purchType == 'I/GST-item wise' ? (
                                    <td style={{ width: '80px' }}>
                                        <Form.Control
                                            type="number"
                                            name="gst"
                                            value={item.gst}
                                            onChange={(e) => handleItemChange(e, item.id)}
                                            className="input-field"
                                            maxLength="2"
                                            onInput={(e) => {
                                                if (e.target.value.length > 2) {
                                                    e.target.value = e.target.value.slice(0, 2);
                                                }
                                            }}
                                        />

                                        {errors[item.id]?.gst && (
                                            <div className="invalid-feedback">{errors[item.id].gst}</div>
                                        )}
                                    </td>) : null}
                                <td>{!item.gst ? item.qty * item.price : ((item.qty * item.price) * (item.gst / 100)) + (item.qty * item.price)}</td>

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
                            {/* <td colSpan="6" className="text-right"><strong>Total Amount</strong></td>
                            <td><strong>{totalAmount}</strong></td> */}
                            <td colSpan={colSpanValue} className="text-right">
                                <strong>Total Amount</strong>
                            </td>
                            <td><strong>{totalAmount}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>

                </Table>

                <Col md={12} style={{ display: 'flex', justifyContent: 'right' }}>
                    <button className="btn btn-primary" onClick={handleAddRow}>
                        Add Row
                    </button>
                </Col>

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
