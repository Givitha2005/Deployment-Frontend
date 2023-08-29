import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Employees.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const UpdateEmployees = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [employeesDetails, setEmployeesDetails] = useState({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      position: "",
      salary:""
    });

  useEffect(() => {
    const id = params.id;

    axios.get(`${process.env.REACT_APP_BASE_URL}/employee/${id}`).then((response) =>{
      setEmployeesDetails(response.data);
        console.log('Response: ', response.data);
    }).catch(error => {
        console.log('Error: ', error);
    })
}, [params.id])

const handleChange = (value) => {
    return setEmployeesDetails((employees) => {
      return { ...employees, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employees Details ", employeesDetails);
    try{
        const id = params.id;
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/${id}`, employeesDetails);
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
      console.log('Error while updating a employee: ', error);
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
        <h2>Update Employee Records</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" id="fname" placeholder="Enter First Name"
          value={employeesDetails.firstName}
          onChange={e => handleChange({ firstName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" id="lname" placeholder="Enter Last Name"
          value={employeesDetails.lastName}
          onChange={e => handleChange({ lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email"
          value={employeesDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number"
          value={employeesDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" id="position" placeholder="Enter position"
          value={employeesDetails.position}
          onChange={e => handleChange({ position: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="number" id="salary" placeholder="Enter salary"
          value={employeesDetails.salary}
          onChange={e => handleChange({ salary: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 col-md-4 my-2" >UPDATE EMPLOYEES</Button>

      </Form>
    </>
  )
}

export default UpdateEmployees;