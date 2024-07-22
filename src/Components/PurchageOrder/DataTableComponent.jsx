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
            <div className="table-header" style={{display:"flex"}}>
                
              <div>
              <span className="p-input-icon-left">
                <i className="pi pi-search  " style={{marginLeft:'170px'}}/>
                
                    <InputText style={{border:"1px solid black"}}  type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search...."  />
                    
                    
                </span>
              </div>
              <div style={{marginLeft:"700px"}}>
              <Link to="/purchage">
          <Image src={img1} alt="" rounded style={{ width: '90%' }} />
        </Link>
              </div>
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
