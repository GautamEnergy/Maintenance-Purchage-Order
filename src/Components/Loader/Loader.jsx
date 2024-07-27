// Spinner.js
import React from 'react';
import "../Table/table.css"
// import "./Components/Table/table.css";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Loader;
