import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';
import img1 from "../../Assets/Images/plus.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import ExcelJS from 'exceljs';

import "../Table/table.css";

import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';
const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${url}/Maintenance/GetPurchaseOrderList`);
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
    const handleEditClick = (Purchase_Order_Id, Type) => {
        navigate("/purchage", { state: { Purchase_Order_Id, Type: Type } });
    };

    const handlePdfClick = async (PdfURL, customFileName) => {
        try {
            const response = await axios.get(PdfURL, {
                responseType: 'blob',
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, "PurchaseOrder" + "-" + customFileName);
        } catch (error) {
            console.error('Error downloading the PDF', error);
        }
    };
    const actionBodyTemplate = (rowData) => {
        console.log("Row Datattata",rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" data-pr-tooltip="Edit Purchase Order" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.Purchase_Order_Id, "")} />
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add PO With Same Data" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleEditClick(rowData.Purchase_Order_Id, "Resend")} />
                    <Button icon="pi pi-download" className="p-button-rounded" data-pr-tooltip="Download PO" style={{ marginRight: '5px' }} onClick={() => handlePdfClick(rowData.PdfURL, rowData.Voucher_Number)} />
                    <Button icon="pi pi-envelope" className="p-button-rounded" data-pr-tooltip="Send PO" style={{ backgroundColor: '#f27661' }} onClick={handleClick} />
                </div>
                <Tooltip target=".p-button-rounded" position="top" className="custom-tooltip" />
            </React.Fragment>

        );
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
                        <Link to="/purchage" className="plus mr-1" data-pr-tooltip="Add Purchase Order">
                            <Image src={img1} alt="plus" rounded />
                        </Link>
                        <Tooltip target=".plus" content="Purchase Order" position="top" className="custom-tooltip" />
                        <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} />
                    </div>
                </div>
            </div>
        );
    };

    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Purchase Orders');
    
        // Define columns based on your table fields
        worksheet.columns = [
            { header: 'Voucher Number', key: 'voucherNumber', width: 25 },
            { header: 'Party Name', key: 'partyName', width: 45 },
            { header: 'Company Name', key: 'companyName', width: 35 },
            { header: 'Purchase Date', key: 'purchaseDate', width: 20 },
            { header: 'Created By', key: 'createdBy', width: 25 },
        ];
    
        // Style the header row
        worksheet.getRow(1).font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
        worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F81BD' } };
        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getRow(1).height = 35;
    
        // Add data (assuming `data` is your source data)
        const processedData = data.map(item => ({
            voucherNumber: item.Voucher_Number,
            partyName: item.PartyName,
            companyName: item.CompanyName,
            purchaseDate: item.Purchase_Date,
            createdBy: item.Created_By,
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
    
        // Auto-fit row heights based on content
        worksheet.eachRow({ includeEmpty: true }, (row) => {
            let maxRowHeight = 0;
    
            row.eachCell({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : '';
                const colWidth = worksheet.getColumn(cell.col).width || 10;
    
                const words = cellValue.split(' ');
                let currentLineLength = 0;
                let lineCount = 1;
    
                words.forEach(word => {
                    const wordLength = word.length;
                    if (currentLineLength + wordLength + 1 > colWidth) {
                        lineCount++;
                        currentLineLength = wordLength;
                    } else {
                        currentLineLength += wordLength + 1;
                    }
                });
    
                const baseLineHeight = 15;
                const padding = 4;
    
                const estimatedRowHeight = (lineCount * baseLineHeight) + padding;
                maxRowHeight = Math.max(maxRowHeight, estimatedRowHeight);
            });
    
            if (maxRowHeight > 0) {
                row.height = maxRowHeight;
            }
        });
    
        // Generate and save the file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'PurchaseOrders.xlsx';
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
                    <Column style={{ border: "0.5px dotted black" }} field="Voucher_Number" header="Voucher Number" filter filterPlaceholder="Search by Item Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="PartyName" header="Party Name" filter filterPlaceholder="Search by Item Type" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="CompanyName" header="Company Name" filter filterPlaceholder="Search by GST" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Purchase_Date" header="Purchase Date" filter filterPlaceholder="Search by Party" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Created_By" header="Created By" filter filterPlaceholder="Search by Date" sortable />
                    <Column style={{ border: "0.5px dotted black" }} header="Actions" body={actionBodyTemplate} />
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

export default DataTableComponent;
