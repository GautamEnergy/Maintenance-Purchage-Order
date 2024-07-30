
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

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://srv515471.hstgr.cloud:8080/Maintenance/GetPurchaseOrderList');
                setData(data.data);
                 setTimeout(() => {
                    setLoading(false);
                 }, 1000);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        
        fetchData();
    }, []);

    const handleClick = () => {
        window.location.href = 'http://webmail.gautamsolar.com/?_task=mail&_action=compose&_id=27827033466a2336411526';
    };
    const handleEditClick = (Purchase_Order_Id) => {
        navigate("/purchage", { state:{Purchase_Order_Id,Type:""}});
    };

    const actionBodyTemplate = (rowData) => {
        console.log(rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" style={{ marginRight: '5px' }} onClick={() => handleEditClick(rowData.Purchase_Order_Id)} />
                    <Button icon="pi pi-download" className="p-button-rounded" style={{ marginRight: '5px' }} />
                    <Button icon="pi pi-envelope" className="p-button-rounded" onClick={handleClick} />
                </div>
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
                        <Link to="/purchage" className="plus mr-1">
                            <Image src={img1} alt="plus" rounded />
                        </Link>
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
