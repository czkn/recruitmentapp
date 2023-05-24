import {Form} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css"

const SearchBar = (props) => {

    return(
        <Form.Group>
            <div className={"search-bar-container"}>
                <Form.Control
                    className={props.className}
                    type="text"
                    placeholder={props.placeholder}
                    required
                    value={props.searchTerm}
                    name={"searchTerm"}
                    onChange={(event) => props.setSearchTerm(event.target.value)}
                />
                <FaSearch className={"search-icon"}/>
            </div>
        </Form.Group>
    )
}

export default SearchBar