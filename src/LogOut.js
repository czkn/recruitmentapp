import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LogOut = (props) => {

    const navigate = useNavigate()

    useEffect(()=> {
        props.getUserRole().then(userRole => {
            if(userRole === "Hr" || userRole === "Admin") props.setUserRole(userRole)
        });
    }, [])

    axios
        .post("http://localhost:7053/api/User/logout", {}, {withCredentials: true})
        .then(navigate("/login"))
        .catch(error => console.log(error));
}

export default LogOut