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
import * as XLSX from 'xlsx';
import "../Table/table.css";

import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';


const SparePartTable = () => {
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
                const { data } = await axios.post(`${url}/Maintenance/GetAutoData`);
                console.log("Hellooooo", data);
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
    const handleEditClick = (SparPartId, Type) => {
        navigate("/spare", { state: { SparPartId, Type: Type } });
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
        console.log(rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" data-pr-tooltip="Edit Spare Part" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.SparPartId, "")} />

                    {/* <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add PO With Same Data" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleEditClick(rowData.Purchase_Order_Id, "Resend")} /> */}

                    {/* <Button icon="pi pi-download" className="p-button-rounded" data-pr-tooltip="Download PDF" style={{ marginRight: '5px' }} onClick={() => handlePdfClick(rowData.PdfURL, rowData.Voucher_Number)} />

                    <Button icon="pi pi-download" className="p-button-rounded" data-pr-tooltip="Download Image" style={{ marginRight: '5px' }} onClick={() => handlePdfClick(rowData.ImageURL, rowData.Voucher_Number)} /> */}

                    {/* <Button icon="pi pi-envelope" className="p-button-rounded" data-pr-tooltip="Send PO" style={{ backgroundColor: '#f27661' }} onClick={handleClick} /> */}

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
                        <Link to="/spare" className="plus mr-1" data-pr-tooltip="Add New Spare Part">
                            <Image src={img1} alt="plus" rounded />
                        </Link>
                        <Tooltip target=".plus" content="Purchase Order" position="top" className="custom-tooltip" />
                        <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} />
                    </div>
                </div>
            </div>
        );
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Spare Part List");
        XLSX.writeFile(workbook, "SparePart.xlsx");
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
                    <Column style={{ border: "0.5px dotted black" }} field="MasterSparePartName" header="Master Spare Part Name" filter filterPlaceholder="Search by Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="SparePartName" header="Spare Part Name" filter filterPlaceholder="Search by Item name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="SpareNumber" header="Model Number" filter filterPlaceholder="Search by Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BrandName" header="Brand Name" filter filterPlaceholder="Search by Brand Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Specification" header="Specification" filter filterPlaceholder="Search by Specification" sortable />
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

export default SparePartTable;
