import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./AppRouter";
import { Nav, Navbar} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

    const[userRole,setUserRole] = useState("")

    const getUserRole = () => {
        return axios.get("http://localhost:7053/api/User/getUserRole", {withCredentials: true})
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {return null;});
    };

    const getUserId = () => {
        return axios.get("http://localhost:7053/api/User/getUserId", {withCredentials: true})
            .then(response => {
                if(response.status === 200) {
                    return response.data;
                }})
            .catch(error => {return null;});
    };

    useEffect(() => {
        getUserRole().then(userRole => {
            setUserRole(userRole)
        });
    }, []);

    const isHr = userRole === "Hr";
    const isAdmin = userRole === "Admin";
    const isHrOrAdmin = userRole === "Hr" || userRole === "Admin";

    return (
        <div className={"app-container"}>
            <Navbar variant="dark" className="main-navbar justify-content-between">

                <Navbar.Brand className={"recruitment-app-title"}>Recruitment App</Navbar.Brand>
                <Nav className="me-auto">
                      <Nav.Link href="http://localhost:3000/listOfJobs">List of Jobs</Nav.Link>
                      { isHr && <Nav.Link href="http://localhost:3000/listOfCandidates">List of Candidates</Nav.Link> }
                      { isHr && <Nav.Link href="http://localhost:3000/createJob">Create a Job</Nav.Link> }
                      { isAdmin && <Nav.Link href="http://localhost:3000/register">Create Hr User</Nav.Link> }
                      { isAdmin && <Nav.Link href="http://localhost:3000/listOfUsers">List of Users</Nav.Link> }
                </Nav>
                 <Nav className="login-nav">
                     { isHrOrAdmin && <Nav.Link href="http://localhost:3000/logout">Logout</Nav.Link> }
                     { !isHrOrAdmin &&<Nav.Link href="http://localhost:3000/login">Login</Nav.Link> }
                 </Nav>

            </Navbar>

          <AppRouter getUserRole={getUserRole} getUserId={getUserId} setUserRole={setUserRole}/>

        </div>
    );
}

export default App;
