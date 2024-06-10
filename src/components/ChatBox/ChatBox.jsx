import MessageService from "../../services/MessageService";
import { useEffect, useState } from "react";
import ReactionEmojis from "../ReactionEmoji/ReactionEmoji";
import "./ChatBox.css";

function ChatBox(props) {
  const { user, chatId, recClass, getMsgFlag, setGetMsgFlag } = props;

  const [channelMessages, setChannelMessages] = useState([]);

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

  const handleReaction = (msgId, emoji) => {
    setChannelMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === msgId) {
          // Chinicheck kung parehas na emoji yung naclick
          if (msg.reaction === emoji) {
            //kung parehas, aalisin yung reaction
            return { ...msg, reaction: null };
          } else {
            // Otherwise, iuupdate lang yung bagong click na emoji
            return { ...msg, reaction: emoji };
          }
        } else {
          return msg;
        }
      })
    );
  };

  return (
    <div className="chatbox">
      {channelMessages.map((msg) => (
        <div className={user.id === msg.sender.id ? "sender" : "receiver"} key={msg.id}>
          <div className="chat-bubble">
            <i>{msg.sender.email}</i>: {msg.body}
            <ReactionEmojis onReact={(emoji) => handleReaction(msg.id, emoji)} />
            {msg.reaction && <span className="reaction"><p>Reacted {msg.reaction} to your message</p></span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
