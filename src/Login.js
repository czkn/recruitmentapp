import {Button, Form} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AlertInvalidCredentials from "./AlertInvalidCredentials";

const Login = (props) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const[isInvalid, setIsInvalid] = useState(false);
    const[loginUserStatusCode, setLoginUserStatusCode] = useState(400);
    const[loginUserErrors, setLoginUserErrors] = useState([]);
    const[invalidEmailOrPassword, setInvalidEmailOrPassword] = useState("");
    const[isEmailOrPasswordInvalid, setIsEmailOrPasswordInvalid] = useState(false);

    const navigate = useNavigate()

    useEffect(()=> {
        props.getUserRole().then(userRole => {
            if(userRole === "Hr" || userRole === "Admin") navigate("/listOfJobs")

            if(loginUserStatusCode === 200) {
                props.setUserRole(userRole)
                navigate("/listOfJobs")
            }
        });
    }, [loginUserStatusCode])

    const loginUser = () => {

        axios.post("http://localhost:7053/api/User/login", {
            email: email,
            password: password }, {withCredentials: true})
            .then(response => setLoginUserStatusCode(response.status))
            .catch(error => {
                switch (error.response.status) {
                    case 400:
                        setLoginUserErrors(error.response.data.errors);
                        setIsInvalid(true);
                        break;
                    case 401:
                        setInvalidEmailOrPassword(error.response.data.message);
                        setIsEmailOrPasswordInvalid(true)
                        setTimeout(() => setIsEmailOrPasswordInvalid(false), 5000)
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
                        <Form.Label className={"signup-form-label"}>Email</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter your Email"
                            required
                            value={email}
                            name={"email"}
                            onChange={(event) => setEmail(event.target.value)}
                            pattern = "[a-zA-Z0-9._%+-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+@[a-zA-Z0-9.-]+\.(com|pl)$"
                        />
                        <Form.Control.Feedback type="invalid">
                            {loginUserErrors.Email !== undefined && loginUserErrors.Email[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label className={"signup-form-label"}>Password</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="password"
                            placeholder="Please enter your Password"
                            required
                            value={password}
                            name={"password"}
                            onChange={(event) => setPassword(event.target.value)}
                            minLength={"8"}
                        />
                        <Form.Control.Feedback type="invalid">
                            {loginUserErrors.Password !== undefined && loginUserErrors.Password[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"signup-apply-button-center"}>
                        <Button onClick={loginUser} className={"signup-button"}>
                            Log in
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            {isEmailOrPasswordInvalid && <AlertInvalidCredentials invalidCredentials={invalidEmailOrPassword}/>}
        </>
    )
}

export default Login;