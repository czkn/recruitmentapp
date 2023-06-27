import {Button, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import "./SaveCandidateForm.css"

const SaveCandidateForm = (props) => {

    const[employeeWorkingTimeInHours, setEmployeeWorkingTimeInHours] = useState(1);
    const[employeeWorkingHours, setEmployeeWorkingHours] = useState("");
    const[postEmployeeStatusCode, setPostEmployeeStatusCode] = useState(400);
    const[postEmployeeErrors, setPostEmployeeErrors] = useState([]);

    const[isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        if(postEmployeeStatusCode === 201) {
            props.deleteCandidate()
            props.setShow(false)
            props.setIsCandidateAccepted(false)
        }
    }, [postEmployeeStatusCode])

    const postEmployee = () => {
        axios.post("http://localhost:7053/api/Employee/" + props.candidate.jobId + ", " + props.candidate.id, {
            firstName: props.candidate.firstName,
            lastName: props.candidate.lastName,
            emailAddress: props.candidate.emailAddress,
            language: props.candidate.language,
            localization: handleJob(props.candidate).localization,
            workModel: handleJob(props.candidate).workModel,
            phoneNumber: props.candidate.phoneNumber,
            workingTimeInHours: parseInt(employeeWorkingTimeInHours),
            WorkingHours: employeeWorkingHours, }, {withCredentials: true})
            .then(response => setPostEmployeeStatusCode(response.status))
            .catch(error => {
                setPostEmployeeErrors(error.response.data.errors);
                setIsInvalid(true)
            })
    }

    const acceptEmployee = (event) => {
        event.preventDefault();

        postEmployee();
    }

    const handleJob= (candidate) => {
        const validJobs = props.jobs.filter( (job)=> job.id === candidate.jobId )

        const job = validJobs[0]

        return job
    }
    
    const workingTimeInHoursOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

    return(
        <Form validated={isInvalid}>
            <Form.Group controlId="formWorkingTimeInHours">
                <Form.Label className={"signup-form-label"}>Amount of working hours a day</Form.Label>
                <Form.Select
                    className={"signup-input-dark"}
                    name="language"
                    value={employeeWorkingTimeInHours}
                    onChange={(event) => setEmployeeWorkingTimeInHours(event.target.value) }
                >

                    {workingTimeInHoursOptions.map((option) =>
                        <option value={option}>{option}</option>
                    )}

                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formWorkingHours">
                <Form.Label className={"signup-form-label"}>Standard working hours </Form.Label>
                <Form.Control
                    className={"signup-input-dark"}
                    type="text"
                    placeholder="Please enter Employee's standard working hours"
                    required
                    value={employeeWorkingHours}
                    name={"workingHours"}
                    onChange={(event) => setEmployeeWorkingHours(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {postEmployeeErrors.WorkingHours}
                </Form.Control.Feedback>
                <div className={"save-button-center"}>
                <Button variant={"success"} onClick={acceptEmployee} className={"save-button"}>
                    Save
                </Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default SaveCandidateForm;