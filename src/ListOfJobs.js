import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {FaMapMarkerAlt, FaSearch} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import "./ListOfJobs.css";
import parse from 'html-react-parser';
import JobToggleButton from "./JobToggleButton";
import SearchBar from "./SearchBar";
import NoItemsInfo from "./NoItemsInfo";

const ListOfJobs = (props) => {

    const[jobs,setJobs] = useState([])
    const[show, setShow] = useState(false)
    const[job, setJob] = useState({description: ""})
    const[userRole,setUserRole] = useState("")
    const[userId,setUserId] = useState("")
    const[radioValue,setRadioValue] = useState('1')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("Search by name, localization, skills, or work model");
    const [areJobsLoading, setAreJobsLoading] = useState(true);

    const radios = [
        { name: 'All Jobs', value: '1' },
        { name: 'My Jobs', value: '2' },
    ];

    const navigation = useNavigate()

    const getJobs = () => {
            axios
                .get("http://localhost:7053/api/Job/")
                .then(response => {setJobs(response.data); setAreJobsLoading(false);})
                .catch(error => console.log(error))
    }

    const getJobsCreatedByHr = () => {
        axios
            .get("http://localhost:7053/api/Job/" + userId, {withCredentials: true})
            .then(response => {setJobs(response.data); setAreJobsLoading(false);})
            .catch(error => console.log(error))
    }

    const handleGetJobs = () => {
      if(radioValue === '1') getJobs()
      if(radioValue === '2') getJobsCreatedByHr()
    }

    useEffect(() => {
        props.getUserRole().then(userRole => {
            setUserRole(userRole);
        });

        props.getUserId().then(hrId => {
            setUserId(hrId)
        });
    }, []);

    useEffect(() => {
        handleGetJobs();
    }, [radioValue])

    const handleWorkModel = (workModelNumber) => {
      switch (workModelNumber) {
          case 1: return "Remote"
          case 2: return "Stationary"
          case 3: return "Hybrid"
      }
    }

    const handleLanguage = (languageNumber) => {
        switch (languageNumber) {
            case 1: return "English"
            case 2: return "Polish"
            case 3: return "German"
            case 4: return "Spanish"
            case 5: return "Italian"
            case 6: return "French"
            case 7: return "Chinese"
        }
    }

    const deleteJob = () => {
        axios
            .delete("http://localhost:7053/api/Job/" + job.id + ", " + userId, {withCredentials: true})
            .then(() => {handleGetJobs()})
            .catch(error => console.log(error))

        setShow(false)
    }

    function filterJobsBySearchTerm(jobs, searchTerm) {
        return jobs.filter(job =>
            `${job.name} ${job.mandatorySkills} ${job.localization} ${handleLanguage(job.language)} ${handleWorkModel(job.workModel)} ${job.companyName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }

    const filteredJobs = filterJobsBySearchTerm(jobs, searchTerm);

    return (
        <div className={"jobs-container"}>

            {jobs.length !== 0 && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={searchBarPlaceholder}  className={"jobs-search-bar"}/>}

            {userRole === "Hr" && <JobToggleButton radios={radios} radioValue={radioValue} setRadioValue={setRadioValue} handleGetJobs={handleGetJobs}/>}

            {!areJobsLoading && jobs.length === 0 &&  <NoItemsInfo items={"Job Offers"}/>}

            <Container fluid>
                    {filteredJobs.map((job, index) => (
                        <Card key={index} onClick={() => { setShow(true); setJob(job) }} text="white" className={"card-content"}>
                            <Card.Body>
                                <Card.Title className="title">{job.companyName} is looking for: {job.name}
                                    <Row>
                                        <Col className="salary-container">
                                            <span className="salary-min">{job.salaryMin}</span>
                                            <span> - </span>
                                            <span className="salary-max">{job.salaryMax} PLN</span>
                                        </Col>
                                    </Row>
                                </Card.Title>

                                <FaMapMarkerAlt className={"localization-marker"}/> {job.localization} {handleWorkModel(job.workModel)} <br/>
                                <div className="mandatory-skills">
                                    <div className="mandatory-skills__background">{job.mandatorySkills}</div>
                                </div>

                            </Card.Body>
                        </Card>
                    ))}
            </Container>

            <Modal show={show} onHide={() => setShow(false)} style={{color: "white"}}>

                <Modal.Header className={"modal-dark-color"}>
                     <h1>{job.name}</h1> {userRole === "Hr" && <Button variant={"danger"} onClick={deleteJob}> Delete Job </Button>}
                </Modal.Header>

                <Modal.Body className={"modal-dark-color"}>
                    {parse(job.description)}
                </Modal.Body>

                <Modal.Body className={"modal-dark-color-center"}>
                    <Button onClick={() => navigation("/candidateForm", {state: job})}
                            className={"apply-for-job-button"}>
                        Apply for this job
                    </Button>
                </Modal.Body>

            </Modal>

        </div>
        );
}

export default ListOfJobs;