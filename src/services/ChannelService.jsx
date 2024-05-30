import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
  getChannels: async function (user, setChannels, setChannelName) {
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
        setChannels(data.data);
        setChannelName(data.data[0].name)
      }
    } catch (error) {
      return alert(error.res.data.errors);
    }
  },
};

export default ChannelService;
