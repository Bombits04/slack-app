import ChannelService from "../../services/ChannelService";
import { useEffect, useState } from "react";

function ChatBox(props) {
  const { user, chatId, recClass, getMsgFlag, setGetMsgFlag } = props;

  const [channelMessages, setChannelMessages] = useState();

  useEffect(() => {
    async function fetchMessages() {
      await ChannelService.getMessage(
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
  },[chatId, recClass]);

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
