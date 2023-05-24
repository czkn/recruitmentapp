import {Route, Routes} from "react-router-dom";
import CandidateForm from "./CandidateForm";
import ListOfJobs from "./ListOfJobs";
import ListOfCandidates from "./ListOfCandidates";
import CreateJob from "./CreateJob";
import Login from "./Login"
import LogOut from "./LogOut"
import Register from "./Register";
import ListOfUsers from "./ListOfUsers";

function AppRouter(props) {

    return (
        <Routes>
            <Route path={"/candidateForm"} element={<CandidateForm />} />
            <Route path={"/listOfJobs"} element={<ListOfJobs getUserRole={props.getUserRole} getUserId={props.getUserId} />} />
            <Route path={"/listOfCandidates"} element={<ListOfCandidates getUserRole={props.getUserRole} getUserId={props.getUserId}/>} />
            <Route path={"/createJob"} element={<CreateJob getUserRole={props.getUserRole} getUserId={props.getUserId} />} />
            <Route path={"/login"} element={<Login getUserRole={props.getUserRole} setUserRole={props.setUserRole}/>} />
            <Route path={"/logout"} element={<LogOut getUserRole={props.getUserRole} setUserRole={props.setUserRole}  />} />
            <Route path={"/register"} element={<Register getUserRole={props.getUserRole} />} />
            <Route path={"/listOfUsers"} element={<ListOfUsers getUserRole={props.getUserRole} />} />
        </Routes>
    );
}

export default AppRouter;
