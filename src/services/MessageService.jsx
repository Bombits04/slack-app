import { API_URL } from "../constants/Constants";
import axios from "axios";

const MessageService = {

getMessage: async function (user, channelId, recClass, setChannelMessages, setMessage) {
    //FOR DEBUGGING
    // console.log(user);
    // console.log(channelId);
    // console.log(recClass);
    
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };
      const params = `?receiver_id=${channelId}&receiver_class=${recClass}`;
      const res = await axios.get(`${API_URL}/messages${params}`, { headers });
      const { data } = res;

      if (data) {
        setChannelMessages(data.data);
      }
    } catch (error) {
      return alert(error.res.data.errors);
    }
  },

  sendMessage: async function(user, userId, recClass, request){
    try{
    const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };

      const res = await axios.post(`${API_URL}/messages`, request, { headers });
      const { data } = res;

      if (data) {
       console.log(data.data);
      }
        
     }catch (error) {
        return alert(error.res.data.errors);
      }
},
}

export default MessageService;