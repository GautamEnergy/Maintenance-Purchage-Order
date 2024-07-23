// src/DataTableComponent.js
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import img1 from "../../Assets/Images/plus.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get('http://srv515471.hstgr.cloud:8080/Maintenance/GetPurchaseOrderList');
            setData(data.data);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
        
        fetchData();
      }, []);
    

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div style={{display:'flex'}}>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" style={{marginRight:'5px'}}/>              
                <Button icon="pi pi-download" className="p-button-rounded" />
                </div>
               
            </React.Fragment>
        );
    }

    const renderHeader = () => {
        return (
          <div className="container">
      <div className="row align-items-center">
        <div className="col-md-9">
        <div>
              <span className="p-input-icon-left">
                <i className="pi pi-search  " style={{marginLeft:'170px'}}/>
                
                    <InputText style={{border:"1px solid black"}}  type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search...."  />
                    
                    
                </span>
              </div>
        </div>
        <div className="col-md-1 ml-auto mt-5 mt-md-0 d-flex justify-content-end">
          <Link to="/purchage">
            <Image src={img1} alt="" rounded style={{ width: '75%' }} />
          </Link>
        </div>
        <div className="col-md-2 ml-auto mt-5 mt-md-0 d-flex justify-content-end">
                    <Button label="Export" icon="pi pi-file-excel" className="p-button-success" onClick={exportExcel} />
                </div>
      </div>
    </div>
        );
    }
    const exportExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Orders");
      XLSX.writeFile(workbook, "PurchaseOrders.xlsx");
  };

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
                   
                    <Column style={{border:"0.5px dotted black"}} field="Voucher_Number" header="Voucher Number" filter filterPlaceholder="Search by Item Name" sortable />
                    <Column style={{border:"0.5px dotted black"}} field="PartyName" header="Party Name" filter filterPlaceholder="Search by Item Type" sortable />
                    <Column style={{border:"0.5px dotted black"}} field="CompanyName" header="Company Name" filter filterPlaceholder="Search by GST" sortable />
                    <Column style={{border:"0.5px dotted black"}} field="Purchase_Date" header="Purchase Date" filter filterPlaceholder="Search by Party" sortable />
                    <Column style={{border:"0.5px dotted black"}} field="Created_By" header="Created By" filter filterPlaceholder="Search by Date" sortable />
                    <Column
                    style={{border:"0.5px dotted black"}}
                        header="Actions"
                        body={actionBodyTemplate}
                    />
                </DataTable>
            </div>
        </div>
    );
}

export default DataTableComponent;
