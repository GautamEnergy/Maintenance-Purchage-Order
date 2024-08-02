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

const PartyListTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [error, setErrors] = useState('');

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url);
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/Maintenance/GetParty`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });

                if (response.status === 200 && Array.isArray(response.data)) {
                    console.log("Fetched data:", response.data); // Log the fetched data
                    setData(response.data);
                } else {
                    console.error('Unexpected response:', response);
                    setErrors('Failed to fetch party list. Unexpected response from server.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching party list:', error.message);
                setErrors('Failed to fetch party list. Please check the server configuration.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        window.location.href = 'http://webmail.gautamsolar.com/?_task=mail&_action=compose&_id=27827033466a2336411526';
    };

    const handleEditClick = (PartyNameId) => {
        navigate("/newParty", { state: { PartyNameId, Type: "" } });
    };

    const handlePdfClick = async (PdfURL) => {
        try {
            const response = await axios.get(PdfURL, {
                responseType: 'blob',
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, PdfURL);
        } catch (error) {
            console.error('Error downloading the PDF', error);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" data-pr-tooltip="Edit Party" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.PartyNameId)} />
                   
                </div>
                <Tooltip target=".p-button-rounded" position="top" />
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
                        <Tooltip target=".plus" content="Purchase Order" position="top" />
                        <Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} />
                    </div>
                </div>
            </div>
        );
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Orders");
        XLSX.writeFile(workbook, "PurchaseOrders.xlsx");
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
                    <Column style={{ border: "0.5px dotted black" }} field="PartyName" header="Party Name" filter filterPlaceholder="Search by Party Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Country" header="Country" filter filterPlaceholder="Country" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Email" header="Email" filter filterPlaceholder="Search by Email" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="MobileNumber" header="Mobile Number" filter filterPlaceholder="Search by Mobile Number" sortable />
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

export default PartyListTable;
