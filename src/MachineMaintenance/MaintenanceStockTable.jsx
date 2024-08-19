import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';
import "../Components/Table/table.css";
import { Tooltip } from 'primereact/tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MaintenanceStockTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [designation, setDesignation] = useState('');

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        const Designation = localStorage.getItem("Designation");

        if (Designation) {
            setDesignation(Designation);
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${url}/Maintenance/SparePartStockList`);
                setData(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        window.location.href = 'http://webmail.gautamsolar.com/?_task=mail&_action=compose&_id=27827033466a2336411526';
    };


    const handlePdfClick = (pdfUrl, voucherNumber) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Invoice-${voucherNumber}.pdf`;
        link.click();
    };
    const actionBodyTemplate = (rowData) => {
        console.log(rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>

                    {designation === "Super Admin" ? <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} /> : ""}
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
                        {/* {designation === "Super Admin" ||designation === "Spare Part Store Manager"?<Link to="/sparein" className="plus mr-1" data-pr-tooltip="Spare Part In">
                            <Image src={img1} alt="plus" rounded />
                        </Link>:""} */}
                        <Tooltip target=".plus" content="Spare Part In" position="top" className="custom-tooltip" />
                        {designation === "Super Admin" ? <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} /> : ""}
                    </div>
                </div>
            </div>
        );
    };

    const exportExcel = () => {
        // Create a new PDF document with custom dimensions
        const doc = new jsPDF({
            orientation: 'landscape', // Use 'landscape' to increase width
            unit: 'mm',
            format: [200, 270] // Custom size, e.g., A3 (420mm x 297mm)
        });

        // Define the columns and rows from your data
        const columns = [
            "Spare Part Name", "Spare Model Number", "Available Stock", "Machine Name"
        ]; // Customize the headers as needed

        const rows = data.map(item => [
            item.SparePartName, item.Spare_Model_Number, item.Available_Stock,
            item.Machine_Names
        ]);

        // Add title
        doc.text("Available Stock", 14, 20);

        // Create the table
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 30,
            startX: 14,
            tableWidth: 'auto', // Adjusts the table width automatically
            margin: { left: 14, right: 14 }, // Set margins
            headStyles: { halign: 'center' },
            columnStyles: {
                3: { cellWidth: 130 },
                // Decrease the width of the "Machine Name" column (index 3)
            },
            styles: {
                lineWidth: 0.5, // Border thickness
                lineColor: [0, 0, 0], // Border color
            },
            tableLineWidth: 0.5, // Line width for the table borders
            tableLineColor: [0, 0, 0],  // Center align the column headers
        });

        // Save the PDF
        doc.save('AvailableStock.pdf');
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
                    rows={2}
                    rowsPerPageOptions={[2, 5, 10, 20]}
                    header={header}
                    globalFilter={globalFilter}
                    emptyMessage={loading ? null : "No items found."}
                >
                    <Column style={{ border: "0.5px dotted black" }} field="SparePartName" header="Spare Part Name" filter filterPlaceholder="Search by PO Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare_Model_Number" header="Spare Model Number" filter filterPlaceholder="Search by Party Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Available_Stock" header="Available Stock" filter filterPlaceholder="Search by Spare Part Name" sortable />

                    <Column style={{ border: "0.5px dotted black" }} field="Machine_Names" header="Machine Name" body={machineNamesTemplate} filter filterPlaceholder="Search by Machine Name" sortable />



                    {/* <Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} /> */}
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

export default MaintenanceStockTable;
