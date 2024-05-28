import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import UserService from "../../services/UserService";
import ChannelService from "../../services/ChannelService"

function Dashboard(props){
    const {loggedin, setIsLoggedIn} = props;
    
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [channelList, setChannels] = useState([]);

    useEffect(() => {
        //check if user accessed the page before logging in. If logged in, continue, if not, redirect to home
        if (!loggedin){
            navigate("/")
        }

        //FETCH USER START
        async function fetchUsers(){
            const users = await UserService.getUsers(user);
            setUserList(users);
            
        }
        //do fetch users if userList is not yet populated
        if(userList.length === 0){
            fetchUsers();
        }
        //FETCH USER END


        //FETCH CHANNELS START
        async function fetchChannels(){
            await ChannelService.getChannels(user, setChannels);
        }
        if(channelList.length === 0){
            fetchChannels();
        }
        //FETCH CHANNELS END
    })

    function logout(){
        localStorage.clear();
        setIsLoggedIn(false);
    }

    if (loggedin){
        // console.log("chnl list: ")
    return(
        <div className="dashboard-container">
        <div className="header-wrapper">
            <span><h1>HEADER</h1></span>
            <span><h1 onClick={logout}>Logout!</h1></span>
        </div>
        <div className="sbar-wrapper">
            <h2>My SLACKERINOS</h2>
            <ul>
                <li>Channels</li>

                {/* DISPLAY CHANNEL LIST */}
                <div className="channel-list">
                    {channelList.map(chnls => {
                        const {name, id} = chnls;
                        return(
                            <span key={id}>{name}</span>
                        )
                    })
                    }
                </div>
                <li>Direct Messages</li>
            </ul>
        </div>

        <div className="main-wrapper">
            <h1>MAIN WRAPPER</h1>
            <div className="chat-box">
            {userList.map(user => {
                const {uid, id} = user;
                return(
                    <>
                    <p key={id}>{uid}</p>
                </>
                )
                
            })}
            </div>
            <div className="message-box">
                <textarea/>
            </div>
        </div>
        </div>
    )
}
}
export default Dashboard;