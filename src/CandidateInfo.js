import {Button, Col, Form, Modal} from "react-bootstrap";
import axios from "axios";
import { saveAs } from "file-saver";
import {useState} from "react";
import SaveCandidateForm from "./SaveCandidateForm";

const CandidateInfo = (props) => {

    const[isCandidateAccepted, setIsCandidateAccepted] = useState(false)

    const handleLanguage = (language) => {
        switch (language) {
            case 1: return "English"
                break
            case 2: return "Polish"
                break
            case 3: return "German"
                break
            case 4: return "Spanish"
                break
            case 5: return "Italian"
                break
            case 6: return "French"
                break
            case 7: return "Chinese"
                break
        }
    }

    const downloadCv = () => {
        axios
            .get(`http://localhost:7053/api/Candidate/${props.candidate.id}/GetCandidateCv,` + props.userId,
                {withCredentials: true, responseType: 'blob'})
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                saveAs(blob, "CV " + props.candidate.firstName + " " + props.candidate.lastName);
            })
            .catch(error => console.log(error))
    }

    const deleteCandidate = () => {
        axios
            .delete("http://localhost:7053/api/Candidate/" + props.candidate.id + ", " + props.userId, {withCredentials: true})
            .then(() => props.getCandidates())
            .catch(error => console.log(error))

        props.setShow(false)
    }

  return(
      <Modal show={props.show} onHide={() => { props.setShow(false); setIsCandidateAccepted(false) }} style={{color: "white"}}>

          <Modal.Header className={"modal-dark-color"}>
              <Modal.Title>{props.candidate.firstName + " " + props.candidate.lastName}</Modal.Title>
          </Modal.Header>

          {isCandidateAccepted ?
              <Modal.Body className={"modal-dark-color"}>
                  <SaveCandidateForm candidate={props.candidate} deleteCandidate = {deleteCandidate}
                                     userId={props.userId} jobs={props.jobs} show={props.show} setShow={props.setShow} setIsCandidateAccepted={setIsCandidateAccepted}/>
              </Modal.Body>
              :
              <>
              <Modal.Body className={"modal-dark-color"}>
                  E-mail: {props.candidate.emailAddress} <br/>
                  Preferred Language: {handleLanguage(props.candidate.language)} <br/>
                  Phone Number: {props.candidate.phoneNumber} <br/>
              </Modal.Body>


              <Modal.Body className={"modal-dark-color"}>
              <Col className="accept-decline-buttons-container">
              <Button onClick={downloadCv}>Download CV</Button>
              <Button variant={"success"} onClick={() => setIsCandidateAccepted(true)} className={"accept-button"}>Accept</Button>
              <Button variant={"danger"} onClick={deleteCandidate} className={"decline-button"}>Decline</Button>
              </Col>
              </Modal.Body>
              </>
          }
      </Modal>
  )
}

export default CandidateInfo;