import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import ChannelService from "../../services/ChannelService";

import ChatBox from "../../components/ChatBox/ChatBox";

function Dashboard(props) {
  const { loggedin, setIsLoggedIn } = props;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [channelList, setChannels] = useState([]);
  const [headerName, setHeaderName] = useState();
  const [fetchChannelFlag, setFetchChannelFlag] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [getMsgFlag, setGetMsgFlag] = useState(true);
  localStorage.setItem("dmList", JSON.stringify([]));
  const [listOfUserDm, setListOfUserDm] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [getDirectMessagesFlag, setDirectMessagesFlag] = useState(true);
  const [getDirectMessageUsers, setDirectMessageUsers] = useState([]);
  const [recClass, setRecClass] = useState();
  

  useEffect(() => {
    //check if user accessed the page before logging in. If logged in, continue, if not, redirect to home
    if (!loggedin) {
      navigate("/");
    } else {
      console.log("Start");
      //FETCH USER START
      async function fetchUsers() {
        const users = await UserService.getUsers(user);
        setUserList(users);
      }
      //do fetch users if userList is not yet populated
      if (userList.length === 0) {
        fetchUsers();
      }
      //FETCH USER END

      //FETCH CHANNELS START
      async function fetchChannels() {
        await ChannelService.getChannels(
          user,
          setChannels,
          setHeaderName,
          setChatId,
          setFetchChannelFlag
        );
      }

      if (fetchChannelFlag) {
        fetchChannels();
      }
      //FETCH CHANNELS END

      async function fetchUserDmList() {
      //   setDirectMessages([]);
      // setDirectMessageUsers([]);
       const dirMsgs = await UserService.getDirectMessages(
          user,
          userList,
          setDirectMessages,
          setDirectMessagesFlag,
          setDirectMessageUsers
        );
      }

      // function removeDuplicateUserId (){
      //   let temp = []
      //   let isDup = []
      //   directMessages.map((userDm)=>{
      //   isDup = temp.filter((id) => id === userDm.receiver.id)
      //   if (isDup == 0){
      //     // temp.push(userDm.receiver.id)
      //     setDmUsers((old) => [...old, temp]);
      //     console.log(temp)
      //   }
      //   })
        
      // }
      fetchUserDmList();
      if (getDirectMessageUsers.length < 0) {
        
        // setDirectMessagesFlag(false)
      }
      // if (!getDirectMessagesFlag){
      //   removeDuplicateUserId();
      // }

    } //useEffect end
  }, [loggedin, userList]);
  // loggedin, userList, getDirectMessagesFlag
  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  function handleChangeChannel(id, recClass) {
    // const retVal = channelList.find((ret) => ret.id === id);
    // setHeaderName(retVal.name);
    setChatId(id);
    setRecClass(recClass)
  }

  if (loggedin) {
    return (
      <div className="dashboard-container">
        <div className="header-wrapper">
          <span>
            <h1>HEADER</h1>
          </span>
          <span>
            <h1 onClick={logout}>Logout!</h1>
          </span>
        </div>
        <div className="sbar-wrapper">
          <h2>My Dashboard</h2>
          <ul>
            <li>Channels</li>

            {/* DISPLAY CHANNEL LIST */}
            <div className="channel-list">
              {console.log(directMessages)}
              {channelList &&
                channelList.map((chnls) => {
                  const { name, id } = chnls;
                  return (
                    <span key={id} onClick={() => handleChangeChannel(id, "Channel")}>
                      {name}
                    </span>
                  );
                })}
              {!channelList && (
                <span style={{ cursor: "default" }}>No channels found</span>
              )}
            </div>
            <li>Direct Messages</li>
            <div className="directmsg-list">
              { getDirectMessageUsers &&
                getDirectMessageUsers?.toSorted().map((ids) => {
                  if (ids !== null){
                 return <span key={ids.recId} onClick={() => handleChangeChannel(ids.recId, "User")}> {ids.recUid}</span>
                }
                }) }
            
              {/* {!getDirectMessageUsers && 
                <span style={{ cursor: "default" }}>No direct messages</span>
              } */}
            </div>
          </ul>
        </div>

        <div className="main-wrapper">
          <h1>{headerName}</h1>
          <div className="chat-box">
            <ChatBox
              user={user}
              chatId={chatId}
              recClass={recClass}
              getMsgFlag={() => setGetMsgFlag(true)}
              setGetMsgFlag={setGetMsgFlag}
            />
          </div>
          <div className="message-box">
            <textarea />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
