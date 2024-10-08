import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import img1 from "../Assets/Images/plus.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import "../Components/Table/table.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Row, Col, Form, Modal } from 'react-bootstrap';
import ExcelJS from 'exceljs';

// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Tooltip } from 'primereact/tooltip';
// import { color } from 'html2canvas/dist/types/css/types/color';
const MaintenaceListTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [designation, setDesignation] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [personID, setPersonID] = useState('');
    const [machineID, setMachineID] = useState('')
    const [name, setName] = useState('')
    const [Machine, SetMachine] = useState([])
    const [MachineName, setMachineName] = useState(null);
    const [FromDate, setFromDate] = useState('');
    const [ToDate, setToDate] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    console.log("PersomId", personID)

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        const personID = localStorage.getItem("CurrentUser");
        setPersonID(personID)
        const Name = localStorage.getItem("Name");
        setName(Name)
        const Designation = localStorage.getItem("Designation");

        if (Designation) {
            setDesignation(Designation);
        }


        fetchData(" ");
        getMachineListData()
    }, []);
    const notifySuccess = () => toast.success("You Are Added Successfully!", { autoClose: 5000 });
    const fetchData = async (reqData) => {
        const url = localStorage.getItem('url');
        const personID = localStorage.getItem("CurrentUser");
        try {
            const { data } = await axios.post(`${url}/Maintenance/GetMachineMaintenanceList`, { PersonId: personID, reqData });
            setData(data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data: ", error);
        }
    };
    const getMachineListData = async () => {
        const url = localStorage.getItem('url');
        console.log("hmmmmmmmmmmm");
        console.log(url);
        // console.log(token);
        // const url = `${url}/Maintenance/MachineDetailById`;
        try {
            const response = await axios.get(`${url}/Maintenance/MachineList`, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (response.status === 200 && Array.isArray(response.data.data)) {
                const machineBody = response.data.data;

                const machineData = machineBody.map(machine => ({
                    MachineId: machine.MachineId,
                    MachineName: machine.MachineName,
                    MachineNumber: machine.MachineNumber
                }));

                SetMachine(machineData)


            } else {
                console.error('Unexpected response:', response);
                // setError('Failed to fetch machine list. Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching machine list:', error.message);
            console.error(error); // Log the full error object
            // setError('Failed to fetch machine list. Please check the server configuration.');
        }
    };


    const handleClick = () => {
        window.location.href = 'http://webmail.gautamsolar.com/?_task=mail&_action=compose&_id=27827033466a2336411526';
    };
    const handleButtonClick = (MachineId1) => {
        console.log("MachineIdqqqq", MachineId1);
        setMachineID(MachineId1)
        setShowDialog(true);
    };

    const handleYes = async () => {
        console.log("MachineIdqqqq");

        try {
            console.log("data", data)

            // Replace with your API endpoint
            const response = await axios.post(`${url}/Maintenance/SparePartOut`, {
                MachineMaintenanceId: machineID,
                CreatedBy: personID,
                "Required": "Bahan ki shadi",

                headers: {
                    'Content-Type': 'application/json',
                },
                // Replace with your data
            });

            if (response.status === 200) {
                console.log("responsebhanusaif", response)

                const responseData = response.data[0];
                notifySuccess();
                fetchData();

                return responseData;

            } else {
                // setLoading(false);
                const errorData = await response.json();
                console.log(errorData)

            }
        } catch (error) {
            // setLoading(false);
            return error
        } finally {
            setShowDialog(false);
        }
    };
    const handleCancel = () => {
        console.log("Sanjuuuuu")
        // Handle the "No" action here
        setShowDialog(false);
    };
    const handleMachineNameChange = (selectedMachine) => {
        console.log("Machine Name:", selectedMachine);

        if (selectedMachine) {
            setMachineName(selectedMachine);





            console.log(selectedMachine.label);
        }
    };
    const handleSearch = () => {
        const newFieldErrors = {};

        if (FromDate || ToDate) {
            if (!FromDate) {
                newFieldErrors.FromDate = 'From Date is required';
            }
            if (!ToDate) {
                newFieldErrors.ToDate = 'To Date is required';
            }
            if (FromDate && ToDate && new Date(ToDate) < new Date(FromDate)) {
                newFieldErrors.ToDate = 'To Date must be greater than From Date';
            }
        }
        // if (!MachineName) newFieldErrors.MachineName = 'Machine Name is required';

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            return;
        }

        // Clear errors
        setFieldErrors({});

        // Send data to backend
        const requestData = {
            FromDate,
            ToDate,
            MachineId: MachineName ? MachineName.value : ""
        };
        fetchData(requestData);
        setFromDate("");
        setToDate("")
        setMachineName("")
        console.log("requestData", requestData); // Replace this with actual backend call
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;

        if (name === 'FromDate') {
            setFromDate(value);
        } else if (name === 'ToDate') {
            setToDate(value);
        }
    };


    const handlePdfClick = (pdfUrl, Machine_Names) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Image-${Machine_Names}.jpg`;
        link.click();
    };
    const handleEditClick = (MachineId, Type) => {
        console.log("MachineId", MachineId)
        navigate("/machinemaintenace", { state: { MachineId, Type: Type } });
    };
    const actionBodyTemplate = (rowData) => {
        const isNameInMaintenancedBy = Array.isArray(rowData["Maintenanced by"])
            ? rowData["Maintenanced by"].includes(name)
            : false;
        console.log("rowDataaaa", rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>

                    {designation != "Spare Part Store Manager" && designation != "Super Admin" && !isNameInMaintenancedBy ? <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add Yourself For this Maintenence" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleButtonClick(rowData.Machine_Maintenance_Id)} /> : ""}
                    <Dialog
                        header="Machine Maintenence"
                        visible={showDialog}
                        style={{ width: '300px' }}
                        modal
                        footer={
                            <div>

                                <Button label="No" icon="pi pi-times" onClick={handleCancel} className="p-button-text" style={{ backgroundColor: "red", color: "black", marginRight: "5px" }} />
                                <Button label="Yes" icon="pi pi-check-square" onClick={() => handleYes()} className="p-button-text" style={{ backgroundColor: "blue", color: "white" }} />
                                {/* <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add PO With Same Data" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleYes(rowData.Issue)} /> */}
                                {/* <Button label="Yes" icon="pi pi-check" onClick={handleConfirm(rowData.Machine_Maintenance_Id)}   /> */}
                            </div>
                        }
                        onHide={() => setShowDialog(false)}

                    >

                        <p>Are You Involved In This Machine Maintenace.. ?</p>
                    </Dialog>
                    {designation ==="Super Admin"|| isNameInMaintenancedBy ?<Button icon="pi pi-pencil" className="p-button-rounded p-button-success" data-pr-tooltip="Edit Machine Maintenence" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.Machine_Maintenance_Id, "")} />:""}
                    {rowData.Image_URL != null && rowData.Image_URL != "" ?
                        <Button

                            icon="pi pi-download"
                            className="p-button-rounded"
                            data-pr-tooltip="Download Image"
                            style={{ marginRight: '5px' }}
                            onClick={() => handlePdfClick(rowData.Image_URL, rowData.Machine_Names)}
                        /> : ""}
                    {/* <Tooltip target=".p-button-rounded" /> */}

                </div>
                <Tooltip target=".p-button-rounded" position="top" className="custom-tooltip" />
            </React.Fragment>

        );
    };
    const machineNamesTemplate = (rowData) => {
        return Array.isArray(rowData["Maintenanced by"])
            ? rowData["Maintenanced by"].join(", ")
            : "";
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };
    const formatDate1 = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const renderHeader = () => {
        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <div>
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" style={{ marginLeft: '170px' }} />
                                <InputText style={{ border: "1px solid black" }} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search...." />
                            </span>
                        </div>
                    </div>

                    <div className="col-md-5 d-flex justify-content-end align-items-center">
                        {designation != "Spare Part Store Manager" ? <Link to="/machinemaintenace" className="plus mr-1" data-pr-tooltip="Machine Maintainace">
                            <Image src={img1} alt="plus" rounded />
                        </Link> : ""}
                        <Tooltip target=".plus" content="Machine Maintaince" position="top" className="custom-tooltip" />
                        {designation === "Super Admin" ? <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} /> : ""}
                    </div>
                </div>
                {designation === "Super Admin"?<div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography>Master Search Filter</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Row>
                                <Col md={4}>
                                    <Form.Group controlId="FromDate">
                                        <Form.Label style={{ fontWeight: "bold" }}>From Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="FromDate"
                                            value={FromDate} // Bind the value to your state
                                            onChange={handleDateChange} // Handle the change
                                            placeholder="From Date"
                                            max={new Date().toISOString().split("T")[0]}
                                        // required // Add if required
                                        // style={!fieldErrors.FromDate ? inputStyle : inputStyles} // Handle styles
                                        />
                                        {fieldErrors.FromDate && (
                                            <div style={{ fontSize: "13px" }} className="text-danger">
                                                {fieldErrors.FromDate}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="ToDate">
                                        <Form.Label style={{ fontWeight: "bold" }}>To Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="ToDate"
                                            value={ToDate} // Bind the value to your state
                                            onChange={handleDateChange} // Handle the change
                                            placeholder="To Date"
                                            max={new Date().toISOString().split("T")[0]}
                                        // required // Add if required
                                        // style={!fieldErrors.ToDate ? inputStyle : inputStyles} // Handle styles
                                        />
                                        {fieldErrors.ToDate && (
                                            <div style={{ fontSize: "13px" }} className="text-danger">
                                                {fieldErrors.ToDate}
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col className='py-2' md={4}>
                                    <Form.Group controlId="MachineName">
                                        <Form.Label style={{ fontWeight: "bold" }}>Machine Name</Form.Label>
                                        <Select

                                            value={MachineName}

                                            onChange={handleMachineNameChange}
                                            placeholder="Select Machine Name"
                                            options={Machine.map(machine => ({
                                                value: machine.MachineId,
                                                label: machine.MachineName
                                            }))}
                                        //   styles={!fieldErrors.MachineName ? customSelectStyles : customSelectStyles1}
                                        //   required

                                        />
                                        {/* {fieldErrors.MachineName && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.MachineName}</div>} */}
                                    </Form.Group>
                                </Col>


                            </Row>
                            <Row>
                                <Col md={12} style={{ display: 'flex', justifyContent: "end" }}>
                                    <Button type="button" className="register" onClick={() => handleSearch()} style={{ width: '83px', height: '43px', background: '#0066ff', margin: '10px' }}>Search</Button>

                                </Col>
                            </Row>
                        </AccordionDetails>
                    </Accordion>

                </div>:""}
            </div>
        );
    };

    // const exportExcel = () => {
    //     // Process the data before exporting to Excel
    //     const processedData = data.map(item => ({
    //         Machine_Name: item["Machine Name"],
    //         Model_Number: item["Machine Model Number"],
    //         Spare_Part_Name: item["Spare Part Name"],
    //         Spare_Part_Model_Number: item["Spare Part Model Number"],
    //         Quantity: item.Quantity,
    //         Stock_After_Usage: item["Stock After Usage"],
    //         Issue: item.Issue,
    //         BreakDown_Start_Time: item["BreakDown Start Time"],
    //         BreakDown_End_Time: item["BreakDown End Time"],
    //         BreakDown_Total_Time: item["BreakDown Total Time"],
    //         Solution_Process: item["Solution Process"],
    //         Line: item.Line,
    //         Remark: item.Remark,
           
    //         Maintenanced_by: item["Maintenanced by"].join(', '), // Join the array into a string
    //         Maintenance_Date: formatDate1(item["Maintenance Date"]),
    //     }));

    //     const worksheet = XLSX.utils.json_to_sheet([]);
    //     const headers = [
    //         ["Machine Name", "Model Number", "Spare Part Name", "Spare Part Model Number",
    //             "Quantity", "Available Stock", "Issue", "BreakDown Start Time", "BreakDown End Time",
    //             "BreakDown Total Time", "Solution Process", "Line", "Remark",
    //             "Maintenanced by", "Maintenance Date"]
    //     ];
        

    //     // Add headers with custom styles
    //     XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' });

    //     // Adding the data under the header
    //     XLSX.utils.sheet_add_json(worksheet, processedData, { origin: 'A2', skipHeader: true });

    //     // Set column widths
    //     const colWidths = [
    //         { wch: 30 },  // Machine Name
    //         { wch: 25 },  // Model Number
    //         { wch: 25 },  // Spare Part Name
    //         { wch: 35 },  // Spare Part Model Number
    //         { wch: 10 },  // Quantity
    //         { wch: 15 },  // Available Stock
    //         { wch: 25 },  // Issue
    //         { wch: 20 },  // BreakDown Start Time
    //         { wch: 20 },  // BreakDown End Time
    //         { wch: 20 },  // BreakDown Total Time
    //         { wch: 20 },  // Solution Process
    //         { wch: 10 },  // Line
    //         { wch: 20 },  // Remark
    //         { wch: 25 },  // Maintenanced by
    //         { wch: 20 }   // Maintenance Date
    //     ];
    //     worksheet['!cols'] = colWidths;

    //     // Set row height for the header row
    //     worksheet['!rows'] = [{ hpx: 30 }]; // Adjust height in pixels (hpx)

    //     // Apply heading style (like bold text, background color, and font size) specifically for the header row
    //     const range = XLSX.utils.decode_range(worksheet['!ref']);
    //     for (let C = range.s.c; C <= range.e.c; C++) {
    //         const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    //         const cell = worksheet[cellAddress];
    //         if (cell) {
    //             cell.s = {
    //                 font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },  // White text color, font size 16
    //                 fill: { fgColor: { rgb: "4F81BD" } },  // Blue background color
    //                 alignment: { horizontal: "center", vertical: "center" },  // Center alignment
    //                 border: {
    //                     top: { style: "thin", color: { rgb: "000000" } },
    //                     bottom: { style: "thin", color: { rgb: "000000" } },
    //                     left: { style: "thin", color: { rgb: "000000" } },
    //                     right: { style: "thin", color: { rgb: "000000" } },
    //                 }
    //             };
    //         }
    //     }
    
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Machine Maintenance");

    //     XLSX.writeFile(workbook, "MachineMaintenance.xlsx");
    // };
    const exportExcel = async () => {
        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Machine Maintenance');
    
        // Define columns
        worksheet.columns = [
            { header: 'Maintenance Date', key: 'maintenanceDate', width: 25 },
            { header: 'Machine Name', key: 'machineName', width: 35 },
            { header: 'Model Number', key: 'modelNumber', width: 35 },
            { header: 'Spare Part Name', key: 'sparePartName', width: 30 },
            { header: 'Spare Part Model Number', key: 'sparePartModelNumber', width: 35 },
            { header: 'Quantity', key: 'quantity', width: 15 },
            { header: 'Available Stock', key: 'availableStock', width: 25 },
            { header: 'Issue', key: 'issue', width: 45 },
            { header: 'BreakDown Start Time', key: 'breakDownStartTime', width: 35 },
            { header: 'BreakDown End Time', key: 'breakDownEndTime', width: 35 },
            { header: 'BreakDown Total Time', key: 'breakDownTotalTime', width: 35 },
            { header: 'Solution Process', key: 'solutionProcess', width: 40 },
            { header: 'Line', key: 'line', width: 15 },
            { header: 'Remark', key: 'remark', width: 40 },
            { header: 'Maintenanced by', key: 'maintenancedBy', width: 35 },
           
        ];
    
        // Style the header row
        worksheet.getRow(1).font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
        worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(1).height = 25;
    
        // Add data
        const processedData = data.map(item => ({
            maintenanceDate: formatDate1(item["Maintenance Date"]),
            machineName: item["Machine Name"],
            modelNumber: item["Machine Model Number"],
            sparePartName: item["Spare Part Name"],
            sparePartModelNumber: item["Spare Part Model Number"],
            quantity: item.Quantity,
            availableStock: item["Stock After Usage"],
            issue: item.Issue,
            breakDownStartTime: item["BreakDown Start Time"],
            breakDownEndTime: item["BreakDown End Time"],
            breakDownTotalTime: item["BreakDown Total Time"],
            solutionProcess: item["Solution Process"],
            line: item.Line,
            remark: item.Remark,
            maintenancedBy: item["Maintenanced by"].join(', '),
           
        }));
    
        worksheet.addRows(processedData);
    
        // Apply border to all cells
        // worksheet.eachRow((row, rowNumber) => {
        //     row.eachCell((cell) => {
        //         cell.border = {
        //             top: { style: 'thin' },
        //             left: { style: 'thin' },
        //             bottom: { style: 'thin' },
        //             right: { style: 'thin' }
        //         };
        //     });
        // });
        const totalRows = worksheet.rowCount;
        const totalCols = worksheet.columnCount;
    
        for (let row = 1; row <= totalRows; row++) {
            for (let col = 1; col <= totalCols; col++) {
                const cell = worksheet.getCell(row, col);
    
                // Apply border to all cells
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
    
                // Apply additional styles to data cells
                if (row > 1) {
                    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                    cell.font = { size: 12 };
                }
            }
        }
    
        // Auto-fit row heights
        worksheet.eachRow({ includeEmpty: true }, (row) => {
            row.eachCell({ includeEmpty: true }, (cell) => {
                const cellLength = cell.value ? cell.value.toString().length : 10;
                const colWidth = worksheet.getColumn(cell.col).width;
                if (colWidth) {
                    const basePadding = 6; // Adjust this value as needed
                    const estimatedRowHeight = Math.ceil((cellLength / colWidth) * 15) + basePadding;
                    row.height = Math.max(row.height || 0, estimatedRowHeight);
                }
            });
        });
    
        // Generate and save the file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'MachineMaintenance.xlsx';
        link.click();
        URL.revokeObjectURL(link.href);
    };


    const header = renderHeader();

    const renderSkeletonRows = () => {
        return Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
                <td><Skeleton width="100%" height="4em" /></td>
                <td><Skeleton width="100%" height="4em" /></td>
                <td><Skeleton width="100%" height="4em" /></td>
                <td><Skeleton width="100%" height="4em" /></td>
                <td><Skeleton width="100%" height="4em" /></td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Skeleton width="30%" height="4em" />
                        <Skeleton width="30%" height="4em" />
                        <Skeleton width="30%" height="4em" />
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable
                    value={loading ? [] : data}
                    paginator
                   
                    header={header}
                    globalFilter={globalFilter}
                    emptyMessage={loading ? null : "No items found."}
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                     scrollable
                     scrollHeight="400px"
                >
                    <Column style={{ border: "0.5px dotted black" }} field="Machine Name" header="Machine Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Machine Model Number" header="Model Number" filter filterPlaceholder="Search by Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Name" header="Spare Part Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Model Number" header="Spare Part Model Number" filter filterPlaceholder="Search by Spare Part Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Quantity" header="Quantity" filter filterPlaceholder="Search by Quantity" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Stock After Usage" header="Available Stock" filter filterPlaceholder="Search by Stock After Usage" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Issue" header="Issue" filter filterPlaceholder="Search by Issue" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Machine_Names" header="Machine Name" body={machineNamesTemplate} filter filterPlaceholder="Search by Machine Name" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Start Time" header="BreakDown Start Time" filter filterPlaceholder="Search by Start Time" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown End Time" header="BreakDown End Time" filter filterPlaceholder="Search by End Time" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Total Time" header="BreakDown Total Time" filter filterPlaceholder="Search by Total Time" sortable />

                    <Column style={{ border: "0.5px dotted black" }} field="Solution Process" header="Solution Process" filter filterPlaceholder="Search by Solution Process" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Line" header="Line" filter filterPlaceholder="Search by Line" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Remark" header="Remark" filter filterPlaceholder="Search by Remark" sortable />

                    <Column style={{ border: "0.5px dotted black" }} field="Maintenanced by" header="Maintenanced by" body={machineNamesTemplate} filter filterPlaceholder="Search by Received Date" sortable />
                    <Column
                        style={{ border: "0.5px dotted black" }}
                        field="Maintenance Date"
                        header="Maintenance Date"
                        filter
                        filterPlaceholder="Search by Date"
                        sortable
                        body={(rowData) => formatDate(rowData["Maintenance Date"])}
                    />

                    {designation != "Spare Part Store Manager" ? <Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} /> : ""}
                </DataTable>
                {loading && (
                    <div className="p-p-3">
                        <table className="p-datatable-table">
                            <tbody>
                                {renderSkeletonRows()}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ToastContainer position='top-center' />
        </div>
    );
};

export default MaintenaceListTable;

