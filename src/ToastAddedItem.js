import {Toast, ToastContainer} from "react-bootstrap";
import "./ToastAddedItem.css"

const ToastAddedItem = (props) => {

    return(
        <ToastContainer className="p-3" className={props.className}>
            <Toast>
                <Toast.Header closeButton={false}>

                    <strong className="me-auto">New {props.toastNotification} Added!</strong>
                </Toast.Header>
                <Toast.Body>You have just added a new {props.toastNotification}.</Toast.Body>
            </Toast>
        </ToastContainer>
        )

}

export default ToastAddedItem;