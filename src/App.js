// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AppContext } from './ContextAPI';
// import Login from './Components/Login/Login';
// import ItemMaster from './Components/Add Item Master/ItemMaster';
// import AddSpare from './Components/AddSpare/AddSpare';
// import AddMachine from './Components/AddMachine/AddMachine';
// import Billing from './Components/Billing/Billing';
// import Navbar from './Components/Navbar/Navbar';
// import NewParty from './Components/New Party/NewParty';
// import OptionalField from './Components/OptionalField/OptionalField';
// import PurchageForm from './Components/PurchageOrder/PurchageOrderAddEdit';
// import ItemTable from './Components/Table/table';
// import Dashboard from './Pages/Dashboard';
// import PurchaseOrderList from './Components/PurchageOrder/PurchaseOrderList';
// import Sidebar from './Sidebar';
// import AvailableStock from './Components/PurchageOrder/AvailableStock';
// import PartList from './Components/PartyList/PartyList';
// import MachineList from './Components/MachineList/MachineList';
// import SparePartList from './Components/AddSpare/SparePartList';
// import SparePartIn from './Components/SparePartIn/SparePartIn';
// import SparePartInListing from './Components/SparePartIn/SparePartInListing';
// import MachineMaintenance from './MachineMaintenance/MachineMaintenance';
// import MaintenaceList from './MachineMaintenance/MaintenanceList';


// const App = () => {
//   const { token } = useContext(AppContext);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token || localStorage.getItem('Token') ? <TempDash /> : <Login />} />
//         <Route path="/*" element={token || localStorage.getItem('Token') ? <AppWithNavbar /> : <Login />} />
//       </Routes>
//     </Router>
//   );
// };

// const TempDash = () => {
//   return (
//     <>
//       <Sidebar />
//       <Dashboard />
//     </>
//   );
// };

// const AppWithNavbar = () => (
//   <>
//     <Sidebar />
//     <Routes>

//       {/* <Route path="/nav" element={<Navbar />} /> */}
//       <Route path="/nav" element={<Sidebar />} />

//       <Route path="/machine" element={<AddMachine />} />
//       <Route path="/spare" element={<AddSpare />} />
//       <Route path="/sparepartlist" element={<SparePartList />} />
//       <Route path="/billing" element={<Billing />} />
//       <Route path="/newParty" element={<NewParty />} />
//       <Route path="/OptionalField" element={<OptionalField />} />
//       <Route path="/purchage" element={<PurchageForm />} />
//       <Route path="/itemTable" element={<ItemTable />} />
//       <Route path="/itemMAster" element={<ItemMaster />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/polist" element={<PurchaseOrderList />} />
//       <Route path="/partylist" element={<PartList />} />
//       <Route path="/machinelist" element={<MachineList />} />
//       <Route path="/availablestocklist" element={<AvailableStock />} />
//       <Route path="/sparein" element={<SparePartIn />} />
//       <Route path="/spareinList" element={<SparePartInListing />} />
//       <Route path="/machinemaintenace" element={<MachineMaintenance />} />
//       <Route path="/maintenaceList" element={<MaintenaceList />} />


//     </Routes>
//   </>
// );

// export default App;

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './ContextAPI';
import Login from './Components/Login/Login';
import ItemMaster from './Components/Add Item Master/ItemMaster';
import AddSpare from './Components/AddSpare/AddSpare';
import AddMachine from './Components/AddMachine/AddMachine';
import Billing from './Components/Billing/Billing';
import Navbar from './Components/Navbar/Navbar';
import NewParty from './Components/New Party/NewParty';
import OptionalField from './Components/OptionalField/OptionalField';
import PurchageForm from './Components/PurchageOrder/PurchageOrderAddEdit';
import ItemTable from './Components/Table/table';
import Dashboard from './Pages/Dashboard';
import PurchaseOrderList from './Components/PurchageOrder/PurchaseOrderList';
import Sidebar from './Sidebar';
import AvailableStock from './Components/PurchageOrder/AvailableStock';
import PartList from './Components/PartyList/PartyList';
import MachineList from './Components/MachineList/MachineList';
import SparePartList from './Components/AddSpare/SparePartList';
import SparePartIn from './Components/SparePartIn/SparePartIn';
import SparePartInListing from './Components/SparePartIn/SparePartInListing';
import MachineMaintenance from './MachineMaintenance/MachineMaintenance';
import MaintenaceList from './MachineMaintenance/MaintenanceList';


const App = () => {
  const { token } = useContext(AppContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token || localStorage.getItem('Token') ? <TempDash /> : <Login />} />
        <Route path="/*" element={token || localStorage.getItem('Token') ? <AppWithNavbar /> : <Login />} />
      </Routes>
    </Router>
  );
};

const TempDash = () => {
  return (
    <>
      <Sidebar />
      <Dashboard />
    </>
  );
};

const AppWithNavbar = () => (
  <>
    <Sidebar />
    <Routes>
      {/* <Route path="/nav" element={<Navbar />} /> */}

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/nav" element={<Sidebar />} />

      {/* <Route path="/purchage" element={<PurchageForm />} />
      <Route path="/polist" element={<PurchaseOrderList />} />

      <Route path="/newParty" element={<NewParty />} />
      <Route path="/partylist" element={<PartList />} />

      <Route path="/spare" element={<AddSpare />} />
      <Route path="/sparepartlist" element={<SparePartList />} />

      <Route path="/machine" element={<AddMachine />} />
      <Route path="/machinelist" element={<MachineList />} />

      <Route path="/sparein" element={<SparePartIn />} />
      <Route path="/spareinList" element={<SparePartInListing />} />

      <Route path="/machinemaintenace" element={<MachineMaintenance />} />
      <Route path="/maintenaceList" element={<MaintenaceList />} /> */}

      <Route path="/billing" element={<Billing />} />
      <Route path="/OptionalField" element={<OptionalField />} />
      <Route path="/itemTable" element={<ItemTable />} />
      <Route path="/itemMAster" element={<ItemMaster />} />
      <Route path="/availablestocklist" element={<AvailableStock />} />


    </Routes>
  </>
);

export default App;

