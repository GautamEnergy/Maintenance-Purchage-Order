// src/App.js
import React, { useEffect, useState, useContext } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import img1 from "../../Assets/Images/logogs.png";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // Optional for layout utility
import DataTableComponent from './DataTableComponent';
import img2 from "../../Assets/Images/back.png"
import { Link } from 'react-router-dom';
import StockChart from './StockChart';
import { AppContext } from '../../ContextAPI'

const AvailableStock = () => {
  const [MachineName, setMachineName] = useState({value: '1b5eb3c4-d04f-4769-836d-46bf58ace7f5', label: 'Automatic Dispenser (JB fixing)'});
  const [fieldErrors, setFieldErrors] = useState({});
  const [url, setUrl] = useState("");
  const [personID, setPersonID] = useState('');
  const [error, setError] = useState('');
  const { token, setToken } = useContext(AppContext)
  const [Machine, SetMachine] = useState([])

  // Sample data for Machine options
  // const Machine = [
  //   { MachineId: 1, MachineName: 'Machine A' },
  //   { MachineId: 2, MachineName: 'Machine B' },
  //   { MachineId: 3, MachineName: 'Machine C' },
  // ];
  useEffect(() => {


    const personID = localStorage.getItem("CurrentUser");
    const token = localStorage.getItem("token");
    const url = localStorage.getItem('url');
    console.log("URL Kya hai.....?", url);
    setUrl(url);

    if (personID) {
      setPersonID(personID);
    }

    if (token) {
      setToken(token);
    }
    console.log('URL CHECK');
    console.log(url);
    getMachineListData();


  }, []);
  const getMachineListData = async () => {
    const url = localStorage.getItem('url');
    console.log("hmmmmmmmmmmm");
    console.log(url);
    console.log(token);
    // const url = `${url}/Maintenance/MachineDetailById`;
    try {
      const response = await axios.get(`${url}/Maintenance/MachineList`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        const machineBody = response.data.data;

        const machineData = machineBody.map(machine => ({
          MachineId: machine.MachineId,
          MachineName: machine.MachineName,
          MachineNumber: machine.MachineNumber
        }));

        SetMachine(machineData)


      } else {
        console.error('Unexpected response:', response);
        setError('Failed to fetch machine list. Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error fetching machine list:', error.message);
      console.error(error); // Log the full error object
      setError('Failed to fetch machine list. Please check the server configuration.');
    }
  };

  const handleMachineNameChange = selectedOption => {
    setMachineName(selectedOption);
    console.log("MachineId", selectedOption)
    // Add any additional logic you need when machine name changes
  };


  return (
    <Container style={{ width: "100%" }} className="fullPage py-5">
      <div className="form-detail" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Link to="/dashboard">

        </Link>

        <Image src={img1} alt="" className="text-center" rounded style={{ width: '15%', marginLeft: "35%" }} />
        <div style={{ textAlign: 'center', marginTop: "12px", marginBottom: '12px' }}>
          <h2 style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '24px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
            Available Stock By Machine
          </h2>
          <div style={{ marginTop: '10px', marginBottom: '10px', width: "50%", marginLeft: "225px" }}>
            <Select
              value={MachineName}
              onChange={handleMachineNameChange}
              placeholder="Select Machine Name"
              options={Machine.map(machine => ({
                value: machine.MachineId,
                label: machine.MachineName,
              }))}
            //   styles={!fieldErrors.MachineName ? customSelectStyles : customSelectStyles1}
            />
          </div>
          {fieldErrors.MachineName && (
            <div style={{ fontSize: '13px', color: 'red', marginTop: '5px' }}>
              {fieldErrors.MachineName}
            </div>
          )}
        </div>

        <div className="App">
          <div className="card" style={{ width: "100%" }}>
            <StockChart machineName={MachineName} />
          </div>

        </div>
      </div>
    </Container>
  );
}

export default AvailableStock;
