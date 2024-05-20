// import React, { useState } from 'react';
// import { Form, Row, Col, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ItemTable from '../Table/table';


// const currentDate = new Date().toLocaleDateString();

// const options = [
//     { value: 'mat1', label: 'Material 1' },
//     { value: 'mat2', label: 'Material 2' },
//     { value: 'mat3', label: 'Material 3' },
// ];

// const PurchageForm = () => {
//     const [series, setSeries] = useState('');
//     const [vochNo, setVochNo] = useState('');
//     const [pattryName, setPattryName] = useState('');
//     const [matCent, setMatCent] = useState('');
//     const [narration, setNarration] = useState('');

//     const handleSeriesChange = (e) => setSeries(e.target.value);
//     const handleVochNoChange = (e) => setVochNo(e.target.value);
//     const handlePattryNameChange = (e) => setPattryName(e.target.value);
//     const handleMatCentChange = (e) => setMatCent(e.target.value);
//     const handleNarrationChange = (e) => setNarration(e.target.value);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({
//             series,
//             vochNo,
//             pattryName,
//             matCent,
//             narration,
//         });
//         // Reset form
//         setSeries('');
//         setVochNo('');
//         setPattryName('');
//         setMatCent('');
//         setNarration('');
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Start the Form </h2>
//             <Form onSubmit={handleSubmit}>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} controlId="series">
//                         <Form.Label>Series</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={series}
//                             onChange={handleSeriesChange}
//                             placeholder="Enter Series"
//                         />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="date">
//                         <Form.Label>Date</Form.Label>
//                         <Form.Control type="text" value={currentDate} readOnly />
//                     </Form.Group>
//                 </Row>
//                 <Row>
//                     <Form.Group as={Col} controlId="vochNo">
//                         <Form.Label>Voch No.</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={vochNo}
//                             onChange={handleVochNoChange}
//                             placeholder="Enter Voch No."
//                         />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="pattryName">
//                         <Form.Label>Pattry Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={pattryName}
//                             onChange={handlePattryNameChange}
//                             placeholder="Enter Pattry Name"
//                         />
//                     </Form.Group>
//                 </Row>
//                 <Row className="mb-3">

//                 </Row>



//                 <Row className="mb-3">


//                     <Form.Group as={Col} controlId="matCent">
//                         <Form.Label>Mat Cent</Form.Label>
//                         <Form.Select value={matCent} onChange={handleMatCentChange}>
//                             <option value="">Select Material Cent</option>
//                             {options.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} controlId="narration">
//                         <Form.Label>Narration</Form.Label>
//                         <Form.Control
//                             // as="textarea"
//                             rows={3}
//                             value={narration}
//                             onChange={handleNarrationChange}
//                             placeholder="Enter Narration"
//                         />
//                     </Form.Group>
//                 </Row>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>

//             </Form>

//             <ItemTable />
//         </div>
//     );
// };

// export default PurchageForm;
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemTable from '../Table/table';

const currentDate = new Date().toLocaleDateString();

const options = [
    { value: 'mat1', label: 'Material 1' },
    { value: 'mat2', label: 'Material 2' },
    { value: 'mat3', label: 'Material 3' },
];

const PurchageForm = () => {
    const [series, setSeries] = useState('');
    const [vochNo, setVochNo] = useState('');
    const [pattryName, setPattryName] = useState('');
    const [matCent, setMatCent] = useState('');
    const [narration, setNarration] = useState('');

    const handleSeriesChange = (e) => setSeries(e.target.value);
    const handleVochNoChange = (e) => setVochNo(e.target.value);
    const handlePattryNameChange = (e) => setPattryName(e.target.value);
    const handleMatCentChange = (e) => setMatCent(e.target.value);
    const handleNarrationChange = (e) => setNarration(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            series,
            vochNo,
            pattryName,
            matCent,
            narration,
        });
        // Reset form
        setSeries('');
        setVochNo('');
        setPattryName('');
        setMatCent('');
        setNarration('');
    };

    return (
        <div className="container mt-4">
            <h2>Start the Form</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} sm={6} controlId="series">
                        <Form.Label>Series</Form.Label>
                        <Form.Control
                            type="text"
                            value={series}
                            onChange={handleSeriesChange}
                            placeholder="Enter Series"
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={6} controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" value={currentDate} readOnly />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={12} sm={6} controlId="vochNo">
                        <Form.Label>Voch No.</Form.Label>
                        <Form.Control
                            type="text"
                            value={vochNo}
                            onChange={handleVochNoChange}
                            placeholder="Enter Voch No."
                        />
                    </Form.Group>

                    <Form.Group as={Col} xs={12} sm={6} controlId="pattryName">
                        <Form.Label>Pattry Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={pattryName}
                            onChange={handlePattryNameChange}
                            placeholder="Enter Pattry Name"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} sm={6} controlId="matCent">
                        <Form.Label>Mat Cent</Form.Label>
                        <Form.Select value={matCent} onChange={handleMatCentChange}>
                            <option value="">Select Material Cent</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} controlId="narration">
                        <Form.Label>Narration</Form.Label>
                        <Form.Control
                            // as="textarea"
                            rows={3}
                            value={narration}
                            onChange={handleNarrationChange}
                            placeholder="Enter Narration"
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <ItemTable />
        </div>
    );
};

export default PurchageForm;
