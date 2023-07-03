import validator from "validator";
import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ToastAddedItem from "./ToastAddedItem";
import AlertInvalidCredentials from "./AlertInvalidCredentials";

const Register = (props) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[companyName, setCompanyName] = useState("");



    const[isInvalid, setIsInvalid] = useState(false);
    const[postUserErrors, setPostUserErrors] = useState([]);
    const[isUserCreationFailed, setIsUserCreationFailed] = useState(false);
    const[userFailedCreationReason, setUserFailedCreationReason] = useState("");
    const[registerUserStatusCode, setRegisterUserStatusCode] = useState(400);
    const[isUserAdded, setIsUserAdded] = useState(false);
    const[toastNotification, setToastNotification] = useState("Hr User");

    const navigate = useNavigate()

    useEffect(() => {
        props.getUserRole().then(userRole => {
            if(userRole !== "Admin") navigate("/login");
        });
    }, []);

    useEffect(() => {
        if(registerUserStatusCode === 201) {
            setIsUserAdded(true);
            setTimeout(() => setIsUserAdded(false), 5000)

            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setCompanyName("");
            setIsInvalid(false)
        }

    }, [registerUserStatusCode]);

    const registerUser = () => {

        axios.post("http://localhost:7053/api/User/register",
            {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                companyName: companyName
            }, {withCredentials: true})
            .then(response => setRegisterUserStatusCode(response.status))
            .catch(error => {
                switch (error.response.status) {
                    case 400:
                        setPostUserErrors(error.response.data.errors);
                        setIsInvalid(true);
                        break;
                    case 409:
                    case 500:
                        setUserFailedCreationReason(error.response.data.message);
                        setIsUserCreationFailed(true);
                        setTimeout(() => setIsUserCreationFailed(false), 5000)
                        break;
                    default:
                        console.log(`Unhandled error code: ${error.response.status}`);
                        break;
                }
            })
    }

    return(
        <>
            <div className={"default-container"}>
                <Form validated={isInvalid}>
                    <Form.Group controlId="formEmail">
                        <Form.Label className={"signup-form-label"}>Hr Email</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="email"
                            placeholder="Please enter an Email"
                            required
                            value={email}
                            name={"email"}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {postUserErrors.Email !== undefined && postUserErrors.Email[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className={"signup-form-label"}>Hr Password</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="password"
                            placeholder="Please enter a Password"
                            required
                            value={password}
                            name={"password"}
                            onChange={(event) => setPassword(event.target.value)}
                            minLength={"15"}
                        />
                        <Form.Control.Feedback type="invalid">
                            {postUserErrors.Password !== undefined && postUserErrors.Password[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFirstName">
                        <Form.Label className={"signup-form-label"}>Hr First Name</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter a First Name"
                            required
                            value={firstName}
                            name={"firstName"}
                            onChange={(event) => setFirstName(event.target.value)}
                            pattern=".{1,30}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postUserErrors.FirstName !== undefined && postUserErrors.FirstName[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label className={"signup-form-label"}>Hr Last Name</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter a Last Name"
                            required
                            value={lastName}
                            name="lastName"
                            onChange={(event) => setLastName(event.target.value)}
                            pattern=".{1,60}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postUserErrors.LastName !== undefined && postUserErrors.LastName[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCompanyName">
                        <Form.Label className={"signup-form-label"}>Hr Company Name</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter a Hr Company Name"
                            required
                            value={companyName}
                            name="companyName"
                            onChange={(event) => setCompanyName(event.target.value)}
                            pattern=".{1,90}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postUserErrors.CompanyName !== undefined && postUserErrors.CompanyName[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"signup-apply-button-center"}>
                        <Button onClick={registerUser} className={"signup-button"}>
                            Create a Hr User
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            {isUserAdded && <ToastAddedItem toastNotification={toastNotification} className={"toast-margin-create-user"}/>}
            {isUserCreationFailed && <AlertInvalidCredentials invalidCredentials={userFailedCreationReason}/>}
        </>
    )
}

export default Register