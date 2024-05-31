import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
  getChannels: async function (user, setChannels, setChannelName, setChatId, setFetchChannelFlag) {
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };

      const res = await axios.get(`${API_URL}/channels`, { headers });
      const { data } = res;

      if (data) {
        // setChannels(data.data);
        console.log("tae" + data.errors);
        //SET INITIAL VALUE TO THE FIRST ITEM IN ARRAY
        if(data){
          setChannels(data.data);
          if(data.data){
            setChannelName(data.data[0].name);
            setChatId(data.data[0].id);
          }
        }
      }
    } catch (error) {
      return alert(error.res.data.errors);
    }

    setFetchChannelFlag(true);
  },

  getMessage: async function (user, channelId, recClass, setChannelMessages) {
    //FOR DEBUGGING
    console.log(user);
    console.log(channelId);
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
};

export default ChannelService;
