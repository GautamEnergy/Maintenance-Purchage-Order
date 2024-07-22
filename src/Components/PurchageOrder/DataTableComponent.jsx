// src/DataTableComponent.js
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        setData([
            { PurchageOrderId: 1, ItemName: 'Mango', ItemType: 'Test', GST: 560, Party: "Minar Enterprises", Date: "22-07-2024" },
            { PurchageOrderId: 2, ItemName: 'Apple', ItemType: 'Test', GST: 560, Party: "Ashoka Co." , Date: "20-07-2024"},
            { PurchageOrderId: 3, ItemName: 'Banana', ItemType: 'Test', GST: 560, Party: "Gautam Solar" , Date: "18-06-2024"},
            { PurchageOrderId: 4, ItemName: 'Grapes', ItemType: 'Test', GST: 560, Party: "Ami Entersep." , Date: "14-07-2024"}
        ]);
    }, []);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" />              
                          <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
            </React.Fragment>
        );
    }

    const renderHeader = () => {
        return (
            <div className="table-header">
                <h5 className="mx-0 my-1">Manage PO</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </span>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="datatable-filter-demo">
            <div className="card">
            <DataTable
                    value={data}
                    paginator
                    rows={2}
                    rowsPerPageOptions={[2, 5, 10, 20]}
                    header={header}
                    globalFilter={globalFilter}
                    emptyMessage="No items found."
                >
                    <Column field="PurchageOrderId" header="Purchage Order Id" filter filterPlaceholder="Search by PO Id" sortable />
                    <Column field="ItemName" header="Item Name" filter filterPlaceholder="Search by Item Name" sortable />
                    <Column field="ItemType" header="Item Type" filter filterPlaceholder="Search by Item Type" sortable />
                    <Column field="GST" header="GST" filter filterPlaceholder="Search by GST" sortable />
                    <Column field="Party" header="Party" filter filterPlaceholder="Search by Party" sortable />
                    <Column field="Date" header="Date" filter filterPlaceholder="Search by Date" sortable />
                    <Column
                        header="Actions"
                        body={actionBodyTemplate}
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableComponent;
