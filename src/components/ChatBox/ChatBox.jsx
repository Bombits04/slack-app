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
      console.log("message fetched")
    }
  },[chatId, recClass, getMsgFlag]);

  return (
    <div className="chatbox">
      {channelMessages?.map((msg) => {
        return (
          <div className="message-bubble" key={msg.id}>
            {msg.body}
          </div>
        );
      })}
    </div>
  );
}

export default ChatBox;
