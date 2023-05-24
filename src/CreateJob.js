import {Button, Form} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import axios from "axios";
import ToastAddedItem from "./ToastAddedItem";
import {useNavigate} from "react-router-dom";

const CreateJob = (props) => {

    const[name, setName] = useState("");
    const[programmingLanguage, setProgramingLanguage] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState(1);
    const [workModel, setWorkModel] = useState(1);
    const [localization, setLocalization] = useState("");
    const [minimumSalary, setMinimumSalary] = useState(3600);
    const [maximumSalary, setMaximumSalary] = useState(3700);
    const [workingTimeInHours, setWorkingTimeInHours] = useState(8);
    const [mandatorySkills, setMandatorySkills] = useState("");
    const [appreciatedSkills, setAppreciatedSkills] = useState("");
    const [userId, setUserId] = useState("");
    const [postJobStatusCode, setPostJobStatusCode] = useState(400);
    const [postJobErrors, setPostJobErrors] = useState([]);

    const navigate = useNavigate()

    const[isInvalid, setIsInvalid] = useState(false);
    const[isJobAdded, setIsJobAdded] = useState(false);
    const[toastNotification, setToastNotification] = useState("Job");

    useEffect(() => {
        props.getUserRole().then(userRole => {
            if(userRole !== "Hr") navigate("/login");
        });

        props.getUserId().then(userId => {
            setUserId(userId)
        });
    }, []);

    useEffect(() => {
        if(postJobStatusCode === 201) {
            setName("")
            setProgramingLanguage("")
            setDescription("")
            setLanguage(1)
            setWorkModel(1)
            setLocalization("")
            setMinimumSalary(3600)
            setMaximumSalary(3700)
            setWorkingTimeInHours(8)
            setMandatorySkills("")
            setAppreciatedSkills("")

            setIsJobAdded(true);

            setTimeout(() => setIsJobAdded(false), 5000)
            setIsInvalid(false)
        }
    }, [postJobStatusCode])

    const workingTimeInHoursOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

    const postJob = () => {

        axios
            .post("http://localhost:7053/api/Job/" + userId, {
            name: name,
            description: description,
            programmingLanguage: programmingLanguage,
            language: parseInt(language),
            localization: localization,
            workModel: parseInt(workModel),
            salaryMin: parseInt(minimumSalary),
            salaryMax: parseInt(maximumSalary),
            workingHours: workingTimeInHours,
            mandatorySkills: mandatorySkills,
            appreciatedSkills: appreciatedSkills}, {withCredentials: true})
            .then(response => setPostJobStatusCode(response.status))
            .catch(error => {
                setPostJobErrors(error.response.data.errors);
                setIsInvalid(true)
            })
    }


    return(
        <>
            <div className={"default-container"}>
                <Form validated={isInvalid}>
                    <Form.Group controlId="formName">
                        <Form.Label className={"signup-form-label"}>Job Name</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter Job's name"
                            required
                            value={name}
                            name={"name"}
                            onChange={(event) => setName(event.target.value)}
                            pattern=".{5,40}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.Name !== undefined && postJobErrors.Name[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label className={"signup-form-label"}>Description</Form.Label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            className={"signup-input-dark"}
                        />
                        <div style={{color: "red", fontSize: 14}}>
                            {postJobErrors.Description !== undefined && postJobErrors.Description[0]}
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formProgrammingLanguage">
                        <Form.Label className={"signup-form-label"}>Programming Language</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter Job's programming language"
                            required
                            value={programmingLanguage}
                            name={"programmingLanguage"}
                            onChange={(event) => setProgramingLanguage(event.target.value)}
                            pattern=".{1,30}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.ProgrammingLanguage !== undefined && postJobErrors.ProgrammingLanguage[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLanguage">
                        <Form.Label className={"signup-form-label"}>Language</Form.Label>
                        <Form.Select
                            className={"signup-input-dark"}
                            name="language"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value) }
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
                    <Form.Group controlId="formLocalization">
                        <Form.Label className={"signup-form-label"}>Localization</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter Job's Localization"
                            required
                            value={localization}
                            name={"localization"}
                            onChange={(event) => setLocalization(event.target.value)}
                            pattern=".{1,60}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.Localization !== undefined && postJobErrors.Localization[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formWorkModel">
                        <Form.Label className={"signup-form-label"}>Work Model</Form.Label>
                        <Form.Select
                            className={"signup-input-dark"}
                            name="workModel"
                            value={workModel}
                            onChange={(event) => setWorkModel(event.target.value) }
                        >
                            <option value={1}>Remote</option>
                            <option value={2}>Stationary</option>
                            <option value={3}>Hybrid</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formSalaryMin">
                        <Form.Label className={"signup-form-label"}>Minimum Salary (PLN)</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="number"
                            min={"3600"}
                            max={"99999999999"}
                            required
                            name="minimumSalary"
                            value={minimumSalary}
                            onChange={(event) => setMinimumSalary(event.target.value) }
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.SalaryMin}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formSalaryMax">
                        <Form.Label className={"signup-form-label"}>Maximum Salary (PLN)</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="number"
                            min={minimumSalary + 1}
                            max={"99999999999"}
                            required
                            name="maximumSalary"
                            value={maximumSalary}
                            onChange={(event) => setMaximumSalary(event.target.value) }
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.SalaryMax}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formWorkingTimeInHours">
                        <Form.Label className={"signup-form-label"}>Amount of working hours a day</Form.Label>
                        <Form.Select
                            className={"signup-input-dark"}
                            name="workingTimeInHours"
                            value={workingTimeInHours}
                            onChange={(event) => setWorkingTimeInHours(event.target.value) }
                        >

                            {workingTimeInHoursOptions.map((option) =>
                                <option value={option}>{option}</option>
                            )}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formMandatorySkills">
                        <Form.Label className={"signup-form-label"}>Mandatory Skills</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter Job's Mandatory Skills"
                            required
                            value={mandatorySkills}
                            name={"mandatorySkills"}
                            onChange={(event) => setMandatorySkills(event.target.value)}
                            pattern=".{1,80}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.MandatorySkills !== undefined && postJobErrors.MandatorySkills[0]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formAppreciatedSkills">
                        <Form.Label className={"signup-form-label"}>Appreciated Skills</Form.Label>
                        <Form.Control
                            className={"signup-input-dark"}
                            type="text"
                            placeholder="Please enter Job's Appreciated Skills"
                            required
                            value={appreciatedSkills}
                            name={"appreciatedSkills"}
                            onChange={(event) => setAppreciatedSkills(event.target.value)}
                            pattern=".{1,80}"
                        />
                        <Form.Control.Feedback type="invalid">
                            {postJobErrors.AppreciatedSkills}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"signup-apply-button-center"}>
                        <Button onClick={postJob} className={"signup-button"}>
                            Create
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            {isJobAdded ? <ToastAddedItem toastNotification={toastNotification} className={"toast-margin-create-job"}/> : ""}
        </>
    )
}

export default CreateJob;