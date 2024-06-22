import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './ItemMaster.css';

const ItemMaster = ({ onClose }) => {
    const [itemName, setItemName] = useState('');
    const [itemGroup, setItemGroup] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName && itemGroup && itemUnit) {
            const itemData = {
                itemName,
                itemGroup,
                itemUnit,
            };
            console.log('Form data submitted:', itemData);

            // Add your API key here

            setItemName('');
            setItemGroup('');
            setItemUnit('');
            setError('');
        } else {
            setError('Please fill in all required fields.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-header">
                    <FaTimes className="close-icon" onClick={onClose} />
                    <h4 className="form-title">Add Item Master</h4>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-text"
                        name="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Group</label>
                    <input
                        type="text"
                        className="form-text"
                        name="itemGroup"
                        value={itemGroup}
                        onChange={(e) => setItemGroup(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Unit</label>
                    <input
                        type="text"
                        className="form-text"
                        name="itemUnit"
                        value={itemUnit}
                        onChange={(e) => setItemUnit(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </>
    );
};

export default ItemMaster;
