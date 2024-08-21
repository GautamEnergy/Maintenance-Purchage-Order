
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
import {  Row, Col, Form,   Modal } from 'react-bootstrap';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { saveAs } from 'file-saver';
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
    console.log("PersomId",personID)

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
            const { data } = await axios.post(`${url}/Maintenance/GetMachineMaintenanceList`,{PersonId:personID,reqData});
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
                "Required" : "Bahan ki shadi",

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
          MachineId: MachineName?MachineName.value: " "
        };
        fetchData(requestData);
    
        console.log("requestData",requestData); // Replace this with actual backend call
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
        console.log("MachineId",MachineId)
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
                                
                                <Button label="No" icon="pi pi-times" onClick={handleCancel} className="p-button-text" style={{ backgroundColor: "red", color: "black",marginRight:"5px" }} />
                                <Button label="Yes" icon="pi pi-check-square" onClick={() => handleYes()} className="p-button-text" style={{ backgroundColor: "blue", color: "white" }} />
                                {/* <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add PO With Same Data" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleYes(rowData.Issue)} /> */}
                                {/* <Button label="Yes" icon="pi pi-check" onClick={handleConfirm(rowData.Machine_Maintenance_Id)}   /> */}
                            </div>
                        }
                        onHide={() => setShowDialog(false)}

                    >

                        <p>Are You Involved In This Machine Maintenace.. ?</p>
                    </Dialog>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" data-pr-tooltip="Edit Machine Maintenence" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.Machine_Maintenance_Id, "")} />
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
                <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Search Filter</Typography>
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
              <Col md={12} style={{ display: 'flex' }}>
                <Button type="button" className="register" onClick={()=>handleSearch()} style={{ width: '83px', height: '43px', background: '#0066ff', margin: '10px' }}>Search</Button>
               
              </Col>
            </Row>
        </AccordionDetails>
      </Accordion>
      
    </div>
            </div>
        );
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, " Machine Maintainance");
        XLSX.writeFile(workbook, "MachineMaintainance.xlsx");
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
                    rows={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    header={header}
                    globalFilter={globalFilter}
                    emptyMessage={loading ? null : "No items found."}
                >
                     <Column style={{ border: "0.5px dotted black" }} field="Machine Name" header="Machine Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                     <Column style={{ border: "0.5px dotted black" }} field="Machine Model Number" header="Model Number" filter filterPlaceholder="Search by Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Name" header="Spare Part Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Model Number" header="Spare Part Model Number" filter filterPlaceholder="Search by Spare Part Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Quantity" header="Quantity" filter filterPlaceholder="Search by Quantity" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Spare_Part_Brand_Name" header="Brand Name" filter filterPlaceholder="Search by Brant Name" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="Issue" header="Issue" filter filterPlaceholder="Search by Issue" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Machine_Names" header="Machine Name" body={machineNamesTemplate} filter filterPlaceholder="Search by Machine Name" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Start Time" header="BreakDown Start Time" filter filterPlaceholder="Search by Start Time" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown End Time" header="BreakDown End Time" filter filterPlaceholder="Search by End Time" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Total Time" header="BreakDown Total Time" filter filterPlaceholder="Search by Total Time" sortable />
                    
                    <Column style={{ border: "0.5px dotted black" }} field="Solution Process" header="Solution Process" filter filterPlaceholder="Search by Solution Process" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Line" header="Line" filter filterPlaceholder="Search by Line" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Remark" header="Remark" filter filterPlaceholder="Search by Remark" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Stock After Usage" header="Stock After Usage" filter filterPlaceholder="Search by Stock After Usage" sortable />
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

                    { designation != "Spare Part Store Manager" ? <Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} /> : ""}
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

