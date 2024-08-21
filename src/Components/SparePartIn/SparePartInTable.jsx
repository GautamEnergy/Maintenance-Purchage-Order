import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';
import Select from 'react-select';
import img1 from "../../Assets/Images/plus.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import "../Table/table.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {  Row, Col, Form,   Modal } from 'react-bootstrap';

import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';
const SparePartInTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [designation,setDesignation] = useState('');
    const [Machine, SetMachine] = useState([])
    const [MachineName, setMachineName] = useState(null);
    const [FromDate, setFromDate] = useState('');
    const [ToDate, setToDate] = useState('');
    const [errors,setErrors] = useState('')
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        const Designation = localStorage.getItem("Designation");
    
        if (Designation) {
          setDesignation(Designation);
        }
        

        fetchData(" ");
        getMachineListData();
    }, []);
    const fetchData = async (reqData) => {
      try {
          const { data } = await axios.post(`${url}/Maintenance/GetStockList`,{reqData});
          setData(data.data);
          setLoading(false);
      } catch (error) {
          setLoading(false);
          console.error("Error fetching data: ", error);
      }
  };

    const handleClick = () => {
        window.location.href = 'http://webmail.gautamsolar.com/?_task=mail&_action=compose&_id=27827033466a2336411526';
    };
    const handleMachineNameChange = (selectedMachine) => {
        console.log("Machine Name:", selectedMachine);
    
        if (selectedMachine) {
            setMachineName(selectedMachine);
    
            
         
         
    
            console.log(selectedMachine.label);
        }
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'FromDate') {
          setFromDate(value);
    
          // Ensure ToDate is filled and greater than FromDate
          if (ToDate && value > ToDate) {
            setFieldErrors(prevState => ({ ...prevState, ToDate: 'To Date must be greater than From Date' }));
          } else {
            setFieldErrors(prevState => ({ ...prevState, ToDate: '' }));
          }
        }
    
        if (name === 'ToDate') {
          setToDate(value);
    
          // Ensure FromDate is filled and less than ToDate
          if (FromDate && value < FromDate) {
            setFieldErrors(prevState => ({ ...prevState, ToDate: 'To Date must be greater than From Date' }));
          } else {
            setFieldErrors(prevState => ({ ...prevState, ToDate: '' }));
          }
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
    

 

    const handlePdfClick = (pdfUrl, voucherNumber) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Invoice-${voucherNumber}.pdf`;
        link.click();
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

    
        console.log("requestData",requestData); 
        // Replace this with actual backend call
      };
    const actionBodyTemplate = (rowData) => {
        console.log(rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    
                   { designation === "Super Admin"?<Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }}  />:""}
		   {rowData.Invoice_Pdf_URL != null && rowData.Invoice_Pdf_URL != "" ?
                    <Button 
		    
                    icon="pi pi-download" 
                    className="p-button-rounded" 
                    data-pr-tooltip="Download Invoice" 
                    style={{ marginRight: '5px' }} 
                    onClick={() => handlePdfClick(rowData.Invoice_Pdf_URL, rowData.Voucher_Number)} 
                />:""}
                {/* <Tooltip target=".p-button-rounded" /> */}
                   
                </div>
                <Tooltip target=".p-button-rounded" position="top" className="custom-tooltip" />
            </React.Fragment>

        );
    };
    const machineNamesTemplate = (rowData) => {
        return rowData.Machine_Names.join(",");
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
                        {designation === "Super Admin" ||designation === "Spare Part Store Manager"?<Link to="/sparein" className="plus mr-1" data-pr-tooltip="Spare Part In">
                            <Image src={img1} alt="plus" rounded />
                        </Link>:""}
                        <Tooltip target=".plus" content="Spare Part In" position="top" className="custom-tooltip" />
                        {designation === "Super Admin"?<Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} />:""}
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
        max={new Date().toISOString().split("T")[0]} // Disable future dates
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
        value={ToDate} 
        onChange={handleDateChange} 
        placeholder="To Date"
        max={new Date().toISOString().split("T")[0]} // Disable future dates
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
                     {fieldErrors.MachineName && (
                  <div style={{ fontSize: "13px" }} className="text-danger">
                    {fieldErrors.MachineName}
                  </div>
                )}
                  </Form.Group>
                </Col>


    </Row>
    <Row>
              <Col md={12} style={{ display: 'flex' }}>
                <Button type="button" className="register" onClick={handleSearch} style={{ width: '83px', height: '43px', background: '#0066ff', margin: '10px' }}>Search</Button>
               
              </Col>
            </Row>
        </AccordionDetails>
      </Accordion>
      
    </div>
                </div>
            </div>
        );
    };
   
    // const exportExcel = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(data);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Spare Part In");
    //     XLSX.writeFile(workbook, "SparePartIn.xlsx");
    // };
    const currencyBodyTemplate = (rowData) => {
      return (
        <span>
          <strong>{rowData.Currency}</strong> {rowData.Total_Cost}
        </span>
      );
    };
  const currencyBodyTemplate1 = (rowData) => {
    return (
      <span>
        <strong>{rowData.Currency}</strong> {rowData.Price}
      </span>
    );
  };
    const exportExcel = () => {
        // Process the data before exporting to Excel
        const processedData = data.map(item => ({
            Voucher_Number: item.Voucher_Number,
            PartyName: item.PartyName,
            SparePartName: item.SparePartName,
            SparePartModelNumber: item.SparePartModelNumber,
            Spare_Part_Brand_Name: item.Spare_Part_Brand_Name,
            Spare_Part_Specification: item.Spare_Part_Specification,
            Machine_Names: item.Machine_Names.join(', '), // Join machine names into a string
            Quantity_Purchase_Order: item.Quantity_Purchase_Order,
            Quantity_Recieved: item.Quantity_Recieved,
            Price: item.Price,
            Total_Cost: item.Total_Cost,
            Available_Stock: item.Available_Stock,
            Invoice_Number: item.Invoice_Number,
            Date: item.Date,
            Name: item.Name
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(processedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Spare Part In");
    
        XLSX.writeFile(workbook, "SparePartIn.xlsx");
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
                    <Column style={{ border: "0.5px dotted black" }} field="Voucher_Number" header="PO Number" filter filterPlaceholder="Search by PO Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="PartyName" header="Party Name" filter filterPlaceholder="Search by Party Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="SparePartName" header="Spare Part Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="SparePartModelNumber" header="Model Number" filter filterPlaceholder="Search by Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare_Part_Brand_Name" header="Brand Name" filter filterPlaceholder="Search by Brant Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare_Part_Specification" header="Specification" filter filterPlaceholder="Search by Specification" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Machine_Names" header="Machine Name" body={machineNamesTemplate} filter filterPlaceholder="Search by Machine Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Quantity_Purchase_Order" header="Quantity In PO" filter filterPlaceholder="Search by Quantity In PO" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Quantity_Recieved" header="Quantity Recieved"  filter filterPlaceholder="Search by Quantity Recieved" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Price" header="Price"  body={currencyBodyTemplate1} filter filterPlaceholder="Search by Price" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Total_Cost" header="Total Cost" body={currencyBodyTemplate} filter filterPlaceholder="Search by Total Cost" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Available_Stock" header="Available Stock"   filter filterPlaceholder="Search by Available Stock" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Invoice_Number" header="Invoice Number" filter filterPlaceholder="Search by Invoice Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Date" header="Received Date" filter filterPlaceholder="Search by Received Date" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Name" header="Received By" filter filterPlaceholder="Search by Name" sortable />
                    {designation === "Super Admin" || designation === "Spare Part Store Manager" ?<Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} />: ""}
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
        </div>
    );
};

export default SparePartInTable;
