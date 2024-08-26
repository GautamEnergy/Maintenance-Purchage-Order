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

import "../Table/table.css";
import ExcelJS from 'exceljs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Row, Col, Form, Modal } from 'react-bootstrap';

import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';
import { styled } from '@mui/material';
const SparePartInTable = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [designation, setDesignation] = useState('');
  const [FromDate, setFromDate] = useState('');
  const [ToDate, setToDate] = useState('');
  const [errors, setErrors] = useState('')
  const [fieldErrors, setFieldErrors] = useState({});
  const [SparePartModelNo, setSparePartModelNo] = useState([]);
  const [SparePartName, setSparePartName] = useState('');
  const [SparePart, setSparePart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [freightAmount, setFreightAmount] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  useEffect(() => {
    const url = localStorage.getItem('url');
    setUrl(url)
    const Designation = localStorage.getItem("Designation");

    if (Designation) {
      setDesignation(Designation);
    }


    fetchData("", "", "")
    getSparePartModelListData();
  }, []);
  const fetchData = async (FromDate, ToDate, Spare) => {
    try {
      const url = localStorage.getItem('url');
      const { data } = await axios.post(`${url}/Maintenance/GetStockList`, {
        FromDate,
        ToDate,
        SparePartId: Spare.value
      });
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
  const handleSparePartModelChange = (selectedOption) => {
    console.log("Selected Spare Part Model:", selectedOption);

    // Update state and clear relevant fields
    setSparePartModelNo(selectedOption);

    // Find the selected spare part name based on selected model number
    const selectedSparePart = SparePart.find(part => part.value === selectedOption.value);
    if (selectedSparePart) {
      setSparePartName(selectedSparePart.SparePartName);
      setFieldErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors.SparePartName;

        return newErrors;
      });


    }

    // Use a callback to ensure we get the latest state values
    // setPONumber((prevPONumber) => {
    //   if (prevPONumber && prevPONumber.value) {
    //     bindInListData(selectedOption.value, prevPONumber.value);
    //   }
    //   return prevPONumber;
    // });
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

  const getSparePartModelListData = async () => {
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("Fetching spare part model list...");
    console.log(url);
    console.log(token);

    try {
      const response = await axios.post(`${url}/Maintenance/GetAutoData`, { required: "Spare Part Model No" }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        const sparePartModels = response.data.data.map(part => ({
          label: part.SparePartModelNumber,
          value: part.SparePartId,
          SparePartName: part.SparePartName,
        }));
        setSparePart(sparePartModels);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching spare part model list:', error.message);
      console.error(error); // Log the full error object
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




    fetchData(FromDate, ToDate, SparePartModelNo);
    setFromDate("");
    setToDate("");
    setSparePartModelNo("");



    // Replace this with actual backend call
  };
//   const handleButtonClick = (MachineId1) => {
//     console.log("MachineIdqqqq", MachineId1);
//    // setMachineID(MachineId1)
//     setShowModal(true);
// };

  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
      // Handle form submission
      console.log('Freight Amount:', freightAmount);
      console.log('Discount Amount:', discountAmount);
      // You can add further logic here to process the form data
      handleClose(); // Close the modal after submission
  };
  const actionBodyTemplate = (rowData) => {
    console.log(rowData)
    return (
      <React.Fragment>
        <div style={{ display: 'flex' }}>

        {designation === "Super Admin" && (
                <Button
                    icon="pi pi-plus"
                    className="p-button-rounded p-button-success"
                    style={{ marginRight: '5px', backgroundColor: '#cb34dc' }}
                    // onClick={()=>handleButtonClick(rowData.Machine_Maintenance_Id)}
                />
            )}

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="freightAmount">
                            <Form.Label>Freight Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={freightAmount}
                                onChange={(e) => setFreightAmount(e.target.value)}
                                placeholder="Enter Freight Amount"
                            />
                        </Form.Group>

                        <Form.Group controlId="discountAmount">
                            <Form.Label>Discount Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                placeholder="Enter Discount Amount"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleSubmit()}}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
          {rowData.Invoice_Pdf_URL != null && rowData.Invoice_Pdf_URL != "" ?
            <Button

              icon="pi pi-download"
              className="p-button-rounded"
              data-pr-tooltip="Download Invoice"
              style={{ marginRight: '5px' }}
              onClick={() => handlePdfClick(rowData.Invoice_Pdf_URL, rowData.Voucher_Number)}
            /> : ""}
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
            {designation === "Super Admin" || designation === "Spare Part Store Manager" ? <Link to="/sparein" className="plus mr-1" data-pr-tooltip="Spare Part In">
              <Image src={img1} alt="plus" rounded />
            </Link> : ""}
            <Tooltip target=".plus" content="Spare Part In" position="top" className="custom-tooltip" />
            {designation === "Super Admin" ? <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} /> : ""}
          </div>
         { designation=== "Super Admin"?<div>
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
                    <Form.Group controlId="partModelNo">
                      <Form.Label style={{ fontWeight: "bold" }}>Spare Part Model Number</Form.Label>
                      <Select

                        value={SparePartModelNo}

                        onChange={handleSparePartModelChange}
                        placeholder="Select Spare Part Model Number"
                        options={SparePart}
                      // styles={!fieldErrors.SparePartModelNo ? customSelectStyles : customSelectStyles1}
                      //   required

                      />
                      {fieldErrors.SparePartModelNo && <div style={{ fontSize: "13px" }} className="text-danger">{fieldErrors.SparePartModelNo}</div>}
                    </Form.Group>
                  </Col>

                </Row>
                <Row>
                  <Col md={12} style={{ display: 'flex', justifyContent: "end" }}>
                    <Button type="button" className="register" onClick={handleSearch} style={{ width: '83px', height: '43px', background: '#0066ff', margin: '10px' }}>Search</Button>

                  </Col>
                </Row>
              </AccordionDetails>
            </Accordion>

          </div>:""}
        </div>
      </div>
    );
  };

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

  //   // Process the data before exporting to Excel
  //   const processedData = data.map(item => ({
  //     Voucher_Number: item.Voucher_Number,
  //     PartyName: item.PartyName,
  //     SparePartName: item.SparePartName,
  //     SparePartModelNumber: item.SparePartModelNumber,
  //     Spare_Part_Brand_Name: item.Spare_Part_Brand_Name,
  //     Spare_Part_Specification: item.Spare_Part_Specification,
  //     Machine_Names: item.Machine_Names.join(', '), // Join machine names into a string
  //     Quantity_Purchase_Order: item.Quantity_Purchase_Order,
  //     Quantity_Recieved: item.Quantity_Recieved,
  //     Price: item.Price,
  //     Total_Cost: item.Total_Cost,
  //     Available_Stock: item.Available_Stock,
  //     Invoice_Number: item.Invoice_Number,
  //     Date: item.Date,
  //     Name: item.Name
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet([]);
  //   const headers = [
  //     ["Voucher Number", "Party Name", "Spare Part Name", "Spare Part Model Number",
  //       "Spare Part Brand Name", "Spare Part Specification", "Machine Names",
  //       "Quantity Purchase Order", "Quantity Received", "Price", "Total Cost",
  //       "Available Stock", "Invoice Number", "Date", "Name"]
  //   ];
  //   const headerCellStyle = {
  //     font: { bold: true, color: { rgb: 'FFFFFF' } }, // White text
  //     fill: { fgColor: { rgb: '4F81BD' } }, // Blue background
  //     alignment: { horizontal: 'center', vertical: 'center' }, // Center alignment
  //   };
  //   headers.forEach(header => {
  //     if (worksheet[header]) {
  //       worksheet[header].s = headerCellStyle;
  //     }
  //   });


  //   // Add headers with custom styles
  //   XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1', color: "red" });

  //   // Adding the data under the header
  //   XLSX.utils.sheet_add_json(worksheet, processedData, { origin: 'A2', skipHeader: true });

  //   // Set column widths
  //   const colWidths = [
  //     { wch: 20 },  // Voucher_Number
  //     { wch: 20 },  // PartyName
  //     { wch: 25 },  // SparePartName
  //     { wch: 25 },  // SparePartModelNumber
  //     { wch: 20 },  // Spare_Part_Brand_Name
  //     { wch: 30 },  // Spare_Part_Specification
  //     { wch: 40 },  // Machine_Names
  //     { wch: 25 },  // Quantity_Purchase_Order
  //     { wch: 25 },  // Quantity_Recieved
  //     { wch: 15 },  // Price
  //     { wch: 20 },  // Total_Cost
  //     { wch: 15 },  // Available_Stock
  //     { wch: 25 },  // Invoice_Number
  //     { wch: 20 },  // Date
  //     { wch: 20 }   // Name
  //   ];
  //   worksheet['!cols'] = colWidths;

  //   // Apply heading style (like bold text and background color)
  //   const range = XLSX.utils.decode_range(worksheet['!ref']);
  //   for (let C = range.s.c; C <= range.e.c; C++) {
  //     const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
  //     if (cell) {
  //       cell.s = {
  //         font: { bold: true, color: { rgb: "FFFFFF" } },  // White text color
  //         fill: { fgColor: { rgb: "4F81BD" } },  // Blue background color
  //         alignment: { horizontal: "center", vertical: "center" }  // Center alignment
  //       };
  //     }
  //   }

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Spare Part In");

  //   XLSX.writeFile(workbook, "SparePartIn.xlsx");
  // };
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Spare Part In');

    // Define columns
    worksheet.columns = [
        { header: 'Voucher Number', key: 'voucherNumber', width: 25 },
        { header: 'Party Name', key: 'partyName', width: 45 },
        { header: 'Spare Part Name', key: 'sparePartName', width: 25 },
        { header: 'Spare Part Model Number', key: 'sparePartModelNumber', width: 35 },
        { header: 'Spare Part Brand Name', key: 'sparePartBrandName', width: 35 },
        { header: 'Spare Part Specification', key: 'sparePartSpecification', width: 50 },
        { header: 'Machine Names', key: 'machineNames', width: 55 },
        { header: 'Quantity Purchase Order', key: 'quantityPurchaseOrder', width: 20 },
        { header: 'Quantity Received', key: 'quantityReceived', width: 20 },
        { header: 'Price', key: 'price', width: 15 },
        { header: 'Total Cost', key: 'totalCost', width: 25 },
        { header: 'Available Stock', key: 'availableStock', width: 25 },
        { header: 'Invoice Number', key: 'invoiceNumber', width: 35 },
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Recieved By', key: 'name', width: 25 },
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getRow(1).height = 35;

    // Add data
    const processedData = data.map(item => ({
        voucherNumber: item.Voucher_Number,
        partyName: item.PartyName,
        sparePartName: item.SparePartName,
        sparePartModelNumber: item.SparePartModelNumber,
        sparePartBrandName: item.Spare_Part_Brand_Name,
        sparePartSpecification: item.Spare_Part_Specification,
        machineNames: item.Machine_Names.join(', '),
        quantityPurchaseOrder: item.Quantity_Purchase_Order,
        quantityReceived: item.Quantity_Recieved,
        price: `${item.Currency} ${item.Price}`,
        totalCost: `${item.Currency} ${item.Total_Cost}`,
        availableStock: item.Available_Stock,
        invoiceNumber: item.Invoice_Number,
        date: item.Date,
        name: item.Name
    }));

    worksheet.addRows(processedData);

    // Apply styles to all cells
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
      let maxRowHeight = 0;
  
      row.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value ? cell.value.toString() : '';
          const colWidth = worksheet.getColumn(cell.col).width || 10; // Fallback to 10 if no width is set
  
          // Estimate the number of lines the text will occupy considering word-wrap
          const words = cellValue.split(' ');
          let currentLineLength = 0;
          let lineCount = 1;
  
          words.forEach(word => {
              const wordLength = word.length;
              if (currentLineLength + wordLength + 1 > colWidth) { // +1 for space
                  lineCount++;
                  currentLineLength = wordLength;
              } else {
                  currentLineLength += wordLength + 1;
              }
          });
  
          const baseLineHeight = 15; // Base height per line (adjust as needed)
          const padding = 4; // Padding inside the cell
  
          // Calculate the estimated height
          const estimatedRowHeight = (lineCount * baseLineHeight) + padding;
          maxRowHeight = Math.max(maxRowHeight, estimatedRowHeight);
      });
  
      // Apply the maximum height calculated for this row
      if (maxRowHeight > 0) {
          row.height = maxRowHeight;
      }
  });
  

    // Generate and save the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SparePartIn.xlsx';
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
          rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                     scrollable
                     scrollHeight="400px"
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
          <Column style={{ border: "0.5px dotted black" }} field="Quantity_Recieved" header="Quantity Recieved" filter filterPlaceholder="Search by Quantity Recieved" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Price" header="Price" body={currencyBodyTemplate1} filter filterPlaceholder="Search by Price" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Total_Cost" header="Total Cost" body={currencyBodyTemplate} filter filterPlaceholder="Search by Total Cost" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Available_Stock" header="Available Stock" filter filterPlaceholder="Search by Available Stock" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Invoice_Number" header="Invoice Number" filter filterPlaceholder="Search by Invoice Number" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Date" header="Received Date" filter filterPlaceholder="Search by Received Date" sortable />
          <Column style={{ border: "0.5px dotted black" }} field="Name" header="Received By" filter filterPlaceholder="Search by Name" sortable />
          {designation === "Super Admin" || designation === "Spare Part Store Manager" ? <Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} /> : ""}
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
