import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import ChannelService from "../../services/ChannelService";
import MessageService from "../../services/MessageService";
import ChatBox from "../../components/ChatBox/ChatBox";
import ModalAddChannel from "../../components/AddChannelModal/AddChannelModal";

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
  const [directMessages, setDirectMessages] = useState([]);
  const [getDirectMessagesFlag, setDirectMessagesFlag] = useState(true);
  const [getDirectMessageUsers, setDirectMessageUsers] = useState([]);
  const [recClass, setRecClass] = useState();

  const [inputMessage, setInputMessage] = useState();

  useEffect(() => {
    //check if user accessed the page before logging in. If logged in, continue, if not, redirect to home
    if (!loggedin) {
      navigate("/");
    } else {
      // console.log("Start");
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

      fetchUserDmList();
    } //useEffect end
  }, [userList]);

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  function handleChangeChannel(id, recClass) {
    // const retVal = channelList.find((ret) => ret.id === id);
    // setHeaderName(retVal.name);
    setChatId(id);
    setRecClass(recClass);
    setGetMsgFlag(true);
  }

  async function sendMessage(id, recClass) {
    const request = {
      receiver_id: Number(id),
      receiver_class: recClass,
      body: inputMessage,
    };
    const sendMsg = await MessageService.sendMessage(
      user,
      id,
      recClass,
      request
    );
    setGetMsgFlag(true);
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
          <div className="app-title">SLACKERINO</div>
          
          <div className="channel-header">
            <span>Channels</span>
            <ModalAddChannel></ModalAddChannel>
          </div>
          {/* DISPLAY CHANNEL LIST */}
          <div className="channel-list">
            {channelList &&
              channelList.map((chnls) => {
                const { name, id } = chnls;
                return (
                  <div className="channel-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8px"
                      viewBox="0 0 384 512"
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                    <span
                      key={id}
                      onClick={() => handleChangeChannel(id, "Channel")}
                    >
                      {name}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10px"
                      viewBox="0 0 448 512"
                    >
                      <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                    </svg>
                  </div>
                );
              })}
            {!channelList && (
              <span style={{ cursor: "default" }}>No channels found</span>
            )}
          </div>
          <div className="direct-message-header">
          <span>Direct Messages</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
          </div>
          <div className="directmsg-list">
           
            {getDirectMessageUsers &&
              getDirectMessageUsers?.toSorted().map((ids) => {
                if (ids !== null && ids.recId !== user.id) {
                  return (
                    
                    <div className="direct-message-container">
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8px"
                      viewBox="0 0 384 512"
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                    <span
                      key={ids.recId}
                      onClick={() => handleChangeChannel(ids.recId, "User")}
                    >
                      {ids.recUid}
                    </span>
                    </div>
                  );
                }
              })}

            {/* {!getDirectMessageUsers && 
                <span style={{ cursor: "default" }}>No direct messages</span>
              } */}
          </div>
        </div>

        <div className="main-wrapper">
          <h1>{headerName}</h1>
          <div className="chat-box">
            <ChatBox
              user={user}
              chatId={chatId}
              recClass={recClass}
              getMsgFlag={getMsgFlag}
              setGetMsgFlag={setGetMsgFlag}
            />
            
          </div>
          <div className="message-box">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <input
              type="button"
              value="Send"
              onClick={() => sendMessage(chatId, recClass)}
            ></input>
          </div>
        </div>
       
      </div>
    );
  } else {
    navigate("/");
  }
}
export default Dashboard;
