import {Button, Form} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import "./SignUpForm.css"
import {useLocation, useNavigate} from "react-router-dom";

const SignUpForm = (props) => {

    const[candidateFirstName, setCandidateFirstName] = useState("");
    const[candidateLastName, setCandidateLastName] = useState("");
    const[candidateEmail, setCandidateEmail] = useState("");
    const[candidateLanguage, setCandidateLanguage] = useState(1);
    const[candidatePhoneNumber, setCandidatePhoneNumber] = useState("");
    const[candidateCv, setCandidateCv] = useState(null);
    const[postCandidateStatusCode, setPostCandidateStatusCode] = useState(400);
    const[postCandidateErrors, setPostCandidateErrors] = useState([]);

    const[isInvalid, setIsInvalid] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(postCandidateStatusCode === 201) {
            props.setIsCandidateSingedUp(true);
        }
    }, [postCandidateStatusCode])

    useEffect(() => {
        if(location.state === null) {
            navigate("/listOfJobs")
        }
    }, [])

    const postCandidate = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("FirstName", candidateFirstName);
        formData.append("LastName", candidateLastName);
        formData.append("EmailAddress", candidateEmail);
        formData.append("Language", candidateLanguage);
        formData.append("PhoneNumber", candidatePhoneNumber);
        formData.append("JobId", location.state.id);
        formData.append("File", candidateCv);

        axios.post("http://localhost:7053/api/Candidate", formData)
            .then(response => setPostCandidateStatusCode(response.status))
            .catch(error => {
                setPostCandidateErrors(error.response.data.errors);
                setIsInvalid(true)
            })
    }
    
    const handleFileSelect = (event) => {
      setCandidateCv(event.target.files[0])
    }

    return(
        <div className={"signup-container"}>
            <Form validated={isInvalid}>
                <Form.Group controlId="formFirstName">
                    <Form.Label className={"signup-form-label"}>First Name</Form.Label>
                    <Form.Control
                        className={"signup-input-dark"}
                        type={"text"}
                        placeholder="Please enter your First Name"
                        required
                        value={candidateFirstName}
                        name={"firstName"}
                        onChange={(event) => setCandidateFirstName(event.target.value)}
                        pattern=".{2,50}"
                    />
                    <Form.Control.Feedback type="invalid">
                        {postCandidateErrors.FirstName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label className={"signup-form-label"}>Last Name</Form.Label>
                    <Form.Control
                        className={"signup-input-dark"}
                        type="text"
                        placeholder="Please enter your Last Name"
                        required
                        value={candidateLastName}
                        name="lastName"
                        onChange={(event) => setCandidateLastName(event.target.value)}
                        pattern=".{2,60}"
                    />
                    <Form.Control.Feedback type="invalid">
                        {postCandidateErrors.LastName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label className={"signup-form-label"}>E-mail</Form.Label>
                    <Form.Control
                        className={"signup-input-dark"}
                        type="email"
                        placeholder="Please enter your E-mail"
                        required
                        name="email"
                        value={candidateEmail}
                        onChange={(event) => setCandidateEmail(event.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {postCandidateErrors.EmailAddress}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formLanguage">
                    <Form.Label className={"signup-form-label"}>Language</Form.Label>
                    <Form.Select
                        className={"signup-input-dark"}
                        name="language"
                        value={candidateLanguage}
                        onChange={(event) => setCandidateLanguage(event.target.value) }
                    >
                        <option value={1}>English</option>
                        <option value={2}>Polish</option>
                        <option value={3}>German</option>
                        <option value={4}>Spanish</option>
                        <option value={5}>Italian</option>
                        <option value={6}>French</option>
                        <option value={7}>Chinese</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label className={"signup-form-label"}>Phone Number</Form.Label>
                    <Form.Control
                        className={"signup-input-dark"}
                        type={"number"}
                        min={"100000000"}
                        max={"999999999999"}
                        placeholder="Please enter your Phone Number"
                        required
                        name="phoneNumber"
                        value={candidatePhoneNumber}
                        onChange={(event) => setCandidatePhoneNumber(event.target.value) }
                    />
                    <Form.Control.Feedback type="invalid">
                        {postCandidateErrors.PhoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCv">
                    <Form.Label className={"signup-form-label"}> CV (PDF file) </Form.Label>
                    <Form.Control
                        style={{display: "grid"}}
                        className={"signup-input-dark"}
                        type="file"
                        name="cv"
                        required
                        accept="application/pdf"
                        onChange={handleFileSelect}
                    />
                </Form.Group>
                <Form.Group className={"signup-apply-button-center"}>
                    <Button onClick={postCandidate} className={"signup-button"}>
                        Apply
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SignUpForm;