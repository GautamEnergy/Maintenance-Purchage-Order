import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';
import img1 from "../Assets/Images/plus.png";
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import "../Components/Table/table.css";

import { saveAs } from 'file-saver';
import { Tooltip } from 'primereact/tooltip';
// import { color } from 'html2canvas/dist/types/css/types/color';
const MaintenaceListTable = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [designation,setDesignation] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [personID, setPersonID] = useState('');
    const [machineID,setMachineID] = useState('')
    const [name ,setName] = useState('')

    useEffect(() => {
        const url = localStorage.getItem('url');
        setUrl(url)
        const personID = localStorage.getItem("CurrentUser");
    setPersonID(personID)
    const Name = localStorage.getItem("Name");
    setName(Name)
        const Designation = localStorage.getItem("Designation");
    
        if (Designation) {
          setDesignation(Designation);
        }
      

        fetchData();
    }, []);
    const fetchData = async () => {
          const url = localStorage.getItem('url');
        try {
            const { data } = await axios.get(`${url}/Maintenance/GetMachineMaintenanceList`);
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
    const handleButtonClick = (MachineId1) => {
        console.log("MachineIdqqqq",MachineId1);
        setMachineID(MachineId1)
        setShowDialog(true);
    };
    

    // const handleConfirm = async (MachineId) => {
    //     console.log("MachineId",MachineId);
        
    //     try {
    //         console.log("data",data)
    //         console.log(data[0].Machine_Maintenance_Id)
    //         // Replace with your API endpoint
    //         const response = await axios.post(`${url}/Maintenance/SparePartOut`, {
    //             MachineMaintenanceId:data[0].Machine_Maintenance_Id,
    //             CreatedBy:personID,
               
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             // Replace with your data
    //         });

    //         if (response.status === 200) {
    //             console.log("responsebhanusaif", response)
    //             const responseData = response.data[0];
    //             fetchData();
        
    //             return responseData;
        
    //           } else {
    //             // setLoading(false);
    //             const errorData = await response.json();
    //             console.log(errorData)
        
    //           }
    //         } catch (error) {
    //           // setLoading(false);
    //           return error
    //         } finally {
    //         setShowDialog(false);
    //     }
    // };
    const handleYes = async () => {
        console.log("MachineIdqqqq");
        
        try {
            console.log("data",data)
          
            // Replace with your API endpoint
            const response = await axios.post(`${url}/Maintenance/SparePartOut`, {
                MachineMaintenanceId:machineID,
                CreatedBy:personID,
               
                headers: {
                    'Content-Type': 'application/json',
                },
                // Replace with your data
            });

            if (response.status === 200) {
                console.log("responsebhanusaif", response)
                const responseData = response.data[0];
                 fetchData();
        
                return responseData;
        
              } else {
                // setLoading(false);
                const errorData = await response.json();
                console.log(errorData)
        
              }
            } catch (error) {
              // setLoading(false);
              return error
            } finally {
            setShowDialog(false);
        }
    };
    const handleCancel = () => {
        console.log("Sanjuuuuu")
        // Handle the "No" action here
        setShowDialog(false);
    };
 

    const handlePdfClick = (pdfUrl, Machine_Names) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `Image-${Machine_Names}.jpg`;
        link.click();
    };
    const actionBodyTemplate = (rowData) => {
        const isNameInMaintenancedBy = Array.isArray(rowData["Maintenanced by"]) 
        ? rowData["Maintenanced by"].includes(name) 
        : false;
        console.log("rowDataaaa",rowData)
        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    
                   { designation === "Super Admin" && !isNameInMaintenancedBy  ?<Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleButtonClick(rowData.Machine_Maintenance_Id)}  />:""}
                   <Dialog
                header="Machine Maintenence"
                visible={showDialog}
                style={{ width: '300px' }}
                modal
                footer={
                    <div>
                        <Button label="No" icon="pi pi-times" onClick={handleCancel} className="p-button-text" style={{backgroundColor:"red",color:"black"}} />
                        <Button label="Yes" icon="pi pi-times"  onClick={() => handleYes()} className="p-button-text"  />
                        {/* <Button icon="pi pi-plus" className="p-button-rounded p-button-success" data-pr-tooltip="Add PO With Same Data" style={{ marginRight: '5px', backgroundColor: '#cb34dc' }} onClick={() => handleYes(rowData.Issue)} /> */}
                        {/* <Button label="Yes" icon="pi pi-check" onClick={handleConfirm(rowData.Machine_Maintenance_Id)}   /> */}
                    </div>
                }
                onHide={() => setShowDialog(false)}

            >   
            
                <p>Are You Involved In This Machine Maintenace.. ?</p>
            </Dialog>
		   {rowData.Image_URL != null && rowData.Image_URL != "" ?
                    <Button 
		    
                    icon="pi pi-download" 
                    className="p-button-rounded" 
                    data-pr-tooltip="Download Invoice" 
                    style={{ marginRight: '5px' }} 
                    onClick={() => handlePdfClick(rowData.Image_URL, rowData.Machine_Names)} 
                />:""}
                {/* <Tooltip target=".p-button-rounded" /> */}
                   
                </div>
                <Tooltip target=".p-button-rounded" position="top" className="custom-tooltip" />
            </React.Fragment>

        );
    };
    const machineNamesTemplate = (rowData) => {
        return Array.isArray(rowData["Maintenanced by"]) 
            ? rowData["Maintenanced by"].join(", ") 
            : "";
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
                        {designation === "Super Admin" ||designation === "Spare Part Store Manager"?<Link to="/machinemaintenace" className="plus mr-1" data-pr-tooltip="Machine Maintainace">
                            <Image src={img1} alt="plus" rounded />
                        </Link>:""}
                        <Tooltip target=".plus" content="Spare Part In" position="top" className="custom-tooltip" />
                        {designation === "Super Admin"?<Button label="Export" icon="pi pi-file-excel" className="p-button-success export-button" onClick={exportExcel} />:""}
                    </div>
                </div>
            </div>
        );
    };
   
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, " MAchine Maintainance");
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
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Name" header="Spare Part Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Spare Part Model Number" header="Spare Part Model Number" filter filterPlaceholder="Search by Spare Part Model Number" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Machine Name" header="Machine Name" filter filterPlaceholder="Search by Spare Part Name" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Machine Model Number" header="Model Number" filter filterPlaceholder="Search by Model Number" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Spare_Part_Brand_Name" header="Brand Name" filter filterPlaceholder="Search by Brant Name" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="Issue" header="Issue" filter filterPlaceholder="Search by Issue" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Machine_Names" header="Machine Name" body={machineNamesTemplate} filter filterPlaceholder="Search by Machine Name" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Start Time" header="BreakDown Start Time" filter filterPlaceholder="Search by Quantity In PO" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown End Time" header="BreakDown End Time" filter filterPlaceholder="Search by Quantity Recieved" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="BreakDown Total Time" header="BreakDown Total Time" filter filterPlaceholder="Search by Price" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Quantity" header="Quantity" filter filterPlaceholder="Search by Quantity" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Solution Process" header="Solution Process" filter filterPlaceholder="Search by Solution Process" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Line" header="Line" filter filterPlaceholder="Search by Invoice Number" sortable />
                    {/* <Column style={{ border: "0.5px dotted black" }} field="Chamber" header="Chamber" filter filterPlaceholder="Search by Received Date" sortable /> */}
                    <Column style={{ border: "0.5px dotted black" }} field="Stock After Usage" header="Stock After Usage" filter filterPlaceholder="Search by Received Date" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Maintenanced by" header="Maintenanced by" body={machineNamesTemplate} filter filterPlaceholder="Search by Received Date" sortable />
                    <Column style={{ border: "0.5px dotted black" }} field="Maintenance Date" header="Maintenance Date" filter filterPlaceholder="Search by Name" sortable />
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

export default MaintenaceListTable;
