import axios, {get} from "axios";
import {useEffect, useState} from "react";
import {Card, Container} from "react-bootstrap";
import "./ListOfCandidates.css"
import "./AppRouter"
import CandidateInfo from "./CandidateInfo";
import {useNavigate} from "react-router-dom";
import SearchBar from "./SearchBar";
import NoItemsInfo from "./NoItemsInfo";

const ListOfCandidates = (props) => {

    const[candidates,setCandidates] = useState([])
    const[jobs,setJobs] = useState([])
    const[show, setShow] = useState(false)
    const[candidate, setCandidate] = useState({})
    const[userId, setUserId] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("Search by first name, last name, jobs name, email, language or phone number");
    const [areCandidatesLoading, setAreCandidatesLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        props.getUserRole().then(userRole => {
            if(userRole !== "Hr") navigate("/login");
        });
        props.getUserId().then(hrId => {
            setUserId(hrId)
        });
        getJobs()
    }, [])

    useEffect(() => {
        if(userId !== "") getCandidates()
    }, [userId])


    const getCandidates = () => {
        axios
            .get("http://localhost:7053/api/Candidate/" + userId, {withCredentials: true})
            .then(response => { setCandidates(response.data); setAreCandidatesLoading(false); })
            .catch(error => console.log(error))
    }

    const getJobs = () => {
        axios
            .get("http://localhost:7053/api/Job")
            .then(response => setJobs(response.data))
            .catch(error => console.log(error))
    }

    const handleJobName = (candidate) => {
        if(jobs.length !== 0) {
            const validJobs = jobs.filter((job) => job.id === candidate.jobId)
            const job = validJobs[0]
            return job.name
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

    const filterCandidatesBySearchTerm = (candidates, searchTerm) =>
        candidates.filter(
            candidate =>
                `${candidate.firstName} ${candidate.lastName} ${candidate.emailAddress} ${handleLanguage(candidate.language)} ${candidate.phoneNumber} ${handleJobName(candidate)}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

    const filteredCandidates = filterCandidatesBySearchTerm(candidates, searchTerm);

    return(
        <div className={"default-container"}>

            {candidates.length !== 0 && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                                  placeholder={searchBarPlaceholder} className={"candidates-search-bar"}/>}

            {!areCandidatesLoading && candidates.length === 0 &&  <NoItemsInfo items={"Candidates applying for your Job Offers"}/>}

            <Container fluid>
                {filteredCandidates.map((candidate, index) => (
                    <Card key={index} onClick={() => { setShow(true); setCandidate(candidate); }} className={"card-dark"}>
                        <Card.Body>
                            <Card.Title className="title">
                                {candidate.firstName + " " + candidate.lastName} is applying for: {handleJobName(candidate)}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </Container>

            <CandidateInfo candidate={candidate} show={show} setShow={setShow} getCandidates={getCandidates} jobs={jobs} show={show} setShow={setShow} userId={userId}/>

        </div>
    )

}

export default ListOfCandidates;