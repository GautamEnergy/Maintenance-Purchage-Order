import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './ContextAPI';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import PurchageForm from './Components/PurchageOrder/PurchageOrderAddEdit';
import OptionalField from './Components/OptionalField/OptionalField';
import NewParty from './Components/New Party/NewParty';
import Billing from './Components/Billing/Billing';
import Dashboard from './Pages/Dashboard';
import AddMachine from './Components/AddMachine/AddMachine';
import AddSpare from './Components/AddSpare/AddSpare';

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
      <Navbar />
      <Dashboard />
    </>
  );
};

const AppWithNavbar = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/nav" element={<Navbar />} />
      <Route path="/purchage" element={<PurchageForm />} />
      <Route path="/OptionalField" element={<OptionalField />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/newParty" element={<NewParty />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/machine" element={<AddMachine />} />
      <Route path="/spare" element={<AddSpare />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  </>
);

export default App;

