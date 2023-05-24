import {Alert} from "react-bootstrap";
import "./AlertInvalidCredentials.css"

const AlertInvalidCredentials = (props) => {

    return(
        <div className={"alert-container"}>
            <Alert variant="danger" className={"alert-content"}>
                <strong>{props.invalidCredentials}</strong>
            </Alert>
        </div>
    )

}

export default AlertInvalidCredentials;