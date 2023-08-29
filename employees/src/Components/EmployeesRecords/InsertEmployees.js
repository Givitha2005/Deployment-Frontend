import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Employees.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const InsertEmployees = () => {
  const navigate = useNavigate();
  const [employeesDetails, setEmployeesDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    position: "",
    salary:""
  });

  const handleChange = (value) => {
    return setEmployeesDetails((employees) => {
      return { ...employees, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employees Details ", employeesDetails);
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee`, employeesDetails);
      if(response){
        setEmployeesDetails({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          position: "",
          salary:""
          });

          navigate('/');
      }
  }catch(error){
      console.log('Error while creating a new employee: ', error);
  }
}

  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="fs-2">Employees</Navbar.Brand>
            <Nav className="me-auto">
              </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Insert Employee Records</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" id="fname" placeholder="Enter First Name" required
          value={employeesDetails.firstName}
          onChange={e => handleChange({ firstName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" id="lname" placeholder="Enter Last Name" required
          value={employeesDetails.lastName}
          onChange={e => handleChange({ lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" required
          value={employeesDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number" required
          value={employeesDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" id="position" placeholder="Enter position" required
          value={employeesDetails.position}
          onChange={e => handleChange({ position: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="number" id="salary" placeholder="Enter salary" required
          value={employeesDetails.salary}
          onChange={e => handleChange({ salary: e.target.value })}
          />
        </Form.Group>


        <Button variant="primary" type="submit" className="mb-3 col-md-4 my-2" >INSERT RECORD</Button>

      </Form>
    </>
  );
};

export default InsertEmployees;
