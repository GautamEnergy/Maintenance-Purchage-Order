import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Form, Col } from 'react-bootstrap';
import ItemMaster from '../Add Item Master/ItemMaster';
import axios from 'axios';
import './table.css';
import { AppContext } from '../../ContextAPI';
import Select from 'react-select';


const ItemTable = ({setAmount,totalAmount,showItemMaster,
    modelNoList,
    setModelNoList,
    purchType,
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
                gst : item.gst,
                SparePartId: item.id == id ? item.SparePartId = selectedOption.value:item.SparePartId
            }
        });
     

    setItems(item);
   
    };

    const handleAddRow = () => {
        const newItem = { id: Date.now(), spareName: '', modelNumber: '', qty: '', unit: '', price: '',gst:'' };
        setItems([...items, newItem]);
    };

    const handleItemChange = (e, id) => {
        const { name, value } = e.target;
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        );
        setItems(updatedItems);
        

       
    
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            console.log(items)
            console.log('kkkkkkk')
            let total = 0;
            let size = items.length
             for(let i = 0; i<size; i++){
                if(items[i].gst){
                    total = total + ((items[i].qty * items[i].price)*(items[i].gst/100))+(items[i].qty * items[i].price)
                    
                }else{
                   
                   total = total+ items[i].qty* items[i].price
                }
             }
            console.log(total)
            setAmount(total);
        };

        calculateTotalAmount();
    }, [items, setAmount]);

     

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
                            <th>S.No.</th>
                            <th>Spare Part Model Number*</th>
                            <th>Spare Part Name</th>
                            <th>Qty*</th>
                            <th>Unit*</th>
                            <th>Price Rs*</th>
                            {purchType == 'I/GST-item wise'? <th>GST</th>:<th></th>}
                           
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
                                <td>
                                    {purchType == 'I/GST-item wise'?<Form.Control
                                        type="number"
                                        name="gst"
                                        value={item.gst}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        className="input-field"
                                    />:''}
                                    
                                   
                       
                                </td>
                                <td>{!item.gst?item.qty * item.price:((item.qty * item.price)*(item.gst/100))+(item.qty * item.price)}</td>
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
                            <td colSpan="7" className="text-right"><strong>Total Amount</strong></td>
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
