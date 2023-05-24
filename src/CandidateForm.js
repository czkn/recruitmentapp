import React, {useState} from 'react';
import SignUpForm from "./SignUpForm"
import ThankYouPage from "./ThankYouPage"

const CandidateForm = (props) => {

    const[isCandidateSignedUp, setIsCandidateSingedUp] = useState(false)

    return (
        isCandidateSignedUp ? <ThankYouPage/> : <SignUpForm setIsCandidateSingedUp = {setIsCandidateSingedUp}/>
    );
}

export default CandidateForm;