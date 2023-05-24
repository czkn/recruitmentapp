import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import {useNavigate} from "react-router-dom";


const ListOfUsers = (props) => {

    const[users,setUsers] = useState([])
    const[show, setShow] = useState(false)
    const[user, setUser] = useState({})
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("Search by first name, last name or email");

    const navigate = useNavigate()

    const getUsers = () => {
        axios
            .get("http://localhost:7053/api/User", {withCredentials: true})
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        props.getUserRole().then(userRole => {
            if (userRole !== "Admin") navigate("/login");
        });
    }, []);

    const deleteUser = () => {
        axios
            .delete("http://localhost:7053/api/User/" + user.email, {withCredentials: true})
            .then(() => getUsers())
            .catch(error => console.log(error))

        setShow(false)
    }

    const filterUsersBySearchTerm = (users, searchTerm) =>
        users.filter(
            user =>
                `${user.firstName} ${user.lastName} ${user.email}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

    const filteredUsers = filterUsersBySearchTerm(users, searchTerm);

    return(
        <div className={"default-container"}>

            {users.length !== 0 && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                              placeholder={searchBarPlaceholder} className={"users-search-bar"}/>}

            <Container fluid>
                {filteredUsers.map((user, index) => (
                    <Card key={index} onClick={() => { setShow(true); setUser(user) }} text="white" className={"card-content"}>
                        <Card.Title className="title">{user.email}</Card.Title>
                    </Card>
                ))}
            </Container>

            <Modal show={show} onHide={() => setShow(false)} style={{color: "white"}}>

                <Modal.Header className={"modal-dark-color"}>
                    <h2>{user.firstName + " " + user.lastName}</h2> <Button variant={"danger"} onClick={deleteUser}> Delete User </Button>
                </Modal.Header>
            </Modal>

            </div>
    )
}

export default ListOfUsers