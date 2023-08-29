import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InsertEmployees from "./Components/EmployeesRecords/InsertEmployees";
import EmployeesRecords from "./Components/EmployeesRecords/EmployeesRecords";
import UpdateEmployees from "./Components/EmployeesRecords/UpdateEmployees";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<EmployeesRecords />} />
          <Route exact path="/create-employees" element={<InsertEmployees />} />
          <Route exact path="/employee/:id/update-employees" element={<UpdateEmployees />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
