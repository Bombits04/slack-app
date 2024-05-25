import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

function Dashboard(props){
    const {loggedin} = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedin){
            navigate("/")
        }
    })

    if (loggedin){
    return(
        <div className="dashboard-container">
        <div className="header-wrapper">
            <h1>HEADER</h1>
        </div>
        <div className="sbar-wrapper">
            <h2>My SLACKERINOS</h2>
            <ul>
                <li>Channels</li>
                <li>Direct Messages</li>
            </ul>
        </div>

        <div className="main-wrapper">
            <h1>MAIN WRAPPER</h1>
        </div>
        </div>
    )
}
}
export default Dashboard;