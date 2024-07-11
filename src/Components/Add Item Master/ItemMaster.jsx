// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import 'react-toastify/dist/ReactToastify.css';
// import './ItemMaster.css';

// const ItemMaster = () => {
//     const [itemName, setItemName] = useState('');
//     const [itemGroup, setItemGroup] = useState('');
//     const [itemUnit, setItemUnit] = useState('');
//     const [error, setError] = useState('');
//     const [line1, setLine1] = useState('');
//     const [line2, setLine2] = useState('');
//     const [line3, setLine3] = useState('');
//     const [line4, setLine4] = useState('');
//     const [line5, setLine5] = useState('');
//     const [line6, setLine6] = useState('');
//     const [line7, setLine7] = useState('');
//     const [line8, setLine8] = useState('');
//     const [line9, setLine9] = useState('');
//     const [line10, setLine10] = useState('');


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (itemName && itemGroup && itemUnit && line1 && line2 && line3 && line4 && line5 && line6 && line7 && line8 && line9 && line10) {
//             const itemData = {
//                 itemName,
//                 itemGroup,
//                 itemUnit,
//                 line1, line2, line3, line4, line5, line6, line7, line8, line9, line10
//             };
//             console.log('Form data submitted:', itemData);

//             // Add your API key here

//             setItemName('');
//             setItemGroup('');
//             setItemUnit('');
//             setError('');
//             setLine1('');
//             setLine2('');
//             setLine3('');
//             setLine4('');
//             setLine5('');
//             setLine6('');
//             setLine7('');
//             setLine8('');
//             setLine8('');
//             setLine10('');

//         } else {
//             setError('Please fill in all required fields.');
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit} className="form-container">
//                 <div className="form-header">
//                     <FaTimes className="close-icon" onClick={onClose} />
//                     <h4 className="form-title">Add Item Master</h4>
//                 </div>
//                 <div className="form-group">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="itemName"
//                         value={itemName}
//                         onChange={(e) => setItemName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Group</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="itemGroup"
//                         value={itemGroup}
//                         onChange={(e) => setItemGroup(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Unit</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="itemUnit"
//                         value={itemUnit}
//                         onChange={(e) => setItemUnit(e.target.value)}
//                         required
//                     />
//                 </div>


//                 <div className="form-container">
//                     <h4 className="form-title">Item Add Field / Description</h4>
//                 </div>
//                 <div className="form-group">
//                     <label>Line1</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line1"
//                         value={line1}
//                         onChange={(e) => setLine1(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line2</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line2"
//                         value={line2}
//                         onChange={(e) => setLine2(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line3</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line3"
//                         value={line3}
//                         onChange={(e) => setLine3(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line4</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line4"
//                         value={line4}
//                         onChange={(e) => setLine4(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line5</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line5"
//                         value={line5}
//                         onChange={(e) => setLine5(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line6</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line6"
//                         value={line6}
//                         onChange={(e) => setLine6(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line7</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line7"
//                         value={line7}
//                         onChange={(e) => setLine7(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line8</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line8"
//                         value={line8}
//                         onChange={(e) => setLine8(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Line9</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line9"
//                         value={line9}
//                         onChange={(e) => setLine9(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group" style={{ marginBottom: '23px' }}>
//                     <label>Line10</label>
//                     <input
//                         type="text"
//                         className="form-text"
//                         name="Line10"
//                         value={line10}
//                         onChange={(e) => setLine10(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <button type="submit" className="btn btn-primary" >Submit</button>

//             </form>
//         </>
//     );
// };

// export default ItemMaster;
import React, { useState } from 'react';

const ItemMaster = () => {
    const [itemName, setItemName] = useState('');
    const [itemGroup, setItemGroup] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [line3, setLine3] = useState('');
    const [line4, setLine4] = useState('');
    const [line5, setLine5] = useState('');
    const [line6, setLine6] = useState('');
    const [line7, setLine7] = useState('');
    const [line8, setLine8] = useState('');
    const [line9, setLine9] = useState('');
    const [line10, setLine10] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (itemName && itemGroup && itemUnit) {
            const itemData = {
                itemName,
                itemGroup,
                itemUnit,
                line1,
                line2,
                line3,
                line4,
                line5,
                line6,
                line7,
                line8,
                line9,
                line10
            };
            console.log('Form data submitted:', itemData);

            // Add your API key here

            setItemName('');
            setItemGroup('');
            setItemUnit('');
            setLine1('');
            setLine2('');
            setLine3('');
            setLine4('');
            setLine5('');
            setLine6('');
            setLine7('');
            setLine8('');
            setLine9('');
            setLine10('');

            setError('');
        } else {
            setError('Please fill in all required fields.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Add Item Master</h4>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="itemName">Name  <span style={{ color: 'red' }}> *</span> </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemName"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    {/* <label htmlFor="itemGroup">Group *</label> */}
                                    <span style={{ color: 'black' }}>Group</span>
                                    <span style={{ color: 'red' }}> *</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemGroup"
                                        value={itemGroup}
                                        onChange={(e) => setItemGroup(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="itemUnit">Unit  <span style={{ color: 'red' }}> *</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="itemUnit"
                                        value={itemUnit}
                                        onChange={(e) => setItemUnit(e.target.value)}
                                        required
                                    />
                                </div>

                                <h4 className="mb-4">Item Add Field / Description</h4>

                                {[...Array(10)].map((_, index) => (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={`line${index + 1}`}>{`Line${index + 1}`}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`line${index + 1}`}
                                            value={eval(`line${index + 1}`)}
                                            onChange={(e) => eval(`setLine${index + 1}`)(e.target.value)}
                                        />
                                    </div>
                                ))}

                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemMaster;
