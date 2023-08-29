import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Employees.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const EmployeesRecords = () => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/employee`);
      if (response) {
        setEmployeesList(response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let confirm = window.confirm(
        "Do you really want to delete?"
      );
      if (confirm) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/employee/${id}`);
      if (response) {
        getEmployees();
      }}
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="fs-2">Employees</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/create-employees" className="fs-5">
                Insert Emplooyee Records
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h3>View Emplooyee Records</h3>
      </div>
      <Table striped bordered hover responsive="sm" className="container">
        <thead className="text-center">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-Mail</th>
            <th>Mobile Number</th>
            <th>Position</th>
            <th>Salary</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {employeesList.map((employees, index) => (
            <tr key={index}>
              <td>{employees.firstName}</td>
              <td>{employees.lastName}</td>
              <td>{employees.email}</td>
              <td>{employees.mobileNumber}</td>
              <td>{employees.position}</td>
              <td>{employees.salary}</td>           
              <td>
                <Link className=" btn btn-warning" to={`/employee/${employees._id}/update-employees`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
              </td>
              <td>
                <Button variant="danger"
                  onClick={() => handleDelete(employees._id)}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EmployeesRecords;
