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
      <Route path="/nav" element={<Sidebar />} />
      
      <Route path="/machine" element={<AddMachine />} />
      <Route path="/spare" element={<AddSpare />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/newParty" element={<NewParty />} />
      <Route path="/OptionalField" element={<OptionalField />} />
      <Route path="/purchage" element={<PurchageForm />} />
      <Route path="/itemTable" element={<ItemTable />} />
      <Route path="/itemMAster" element={<ItemMaster />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/polist" element={<PurchaseOrderList />} />

    </Routes>
  </>
);

export default App;

