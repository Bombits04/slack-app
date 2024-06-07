import MessageService from "../../services/MessageService";
import { useEffect, useState } from "react";

function ChatBox(props) {
  const { user, chatId, recClass, getMsgFlag, setGetMsgFlag } = props;

  const [channelMessages, setChannelMessages] = useState();

  useEffect(() => {
    async function fetchMessages() {
      await MessageService.getMessage(
        user,
        chatId,
        recClass,
        setChannelMessages
      );
    }

    if (getMsgFlag) {
      fetchMessages();
      setGetMsgFlag(false);
    }
  }, [chatId, recClass, getMsgFlag]);

  return (
    <div className="chatbox">
      {channelMessages?.map((msg) => {
        if (user.id === msg.sender.id) {
          return (
            <div className="sender" key={msg.id}>
              <div className="chat-bubble">
                {msg.sender.email}: {msg.body}
              </div>
            </div>
          );
        } else {
          return (
            <div className="receiver" key={msg.id}>
              <div className="chat-bubble">
               {msg.sender.email}: {msg.body}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ChatBox;
