import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
  getChannels: async function (
    user,
    setChannels,
    setHeaderName,
    setChatId,
    setFetchChannelFlag,
    isReloadChannelList,
    setAddNewChannelFlag,
    setIsChannel
  ) {
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
        //SET INITIAL VALUE TO THE FIRST ITEM IN ARRAY
        if (data) {
          setChannels(data.data);
          // setAddNewChannelFlag(false);
          if (!isReloadChannelList) {
            if (data.data) {
              setHeaderName(data.data[0].name);
              setChatId(data.data[0].id);
              setIsChannel(true)
            }
          }
          setAddNewChannelFlag(false);
        }
      }
    } catch (error) {
      return alert(error);
    }

    setFetchChannelFlag(true);
  },

  addChannel: async function (
    user,
    setAddNewChannelFlag,
    newChannelName,
    memberIds
  ) {
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };
      
      const params = {
        name: newChannelName,
        user_ids: [memberIds],
      };

      const res = await axios.post(`${API_URL}/channels`, params, { headers });
      const { data } = res;
      
      if (res.status === 200 || res.status === 201) {
        if (data.errors) {
          alert(data.errors);
        } else {
          alert("Channel created successfully!");
        }
      } else {
        alert("Errors were encountered :(");
      }
    } catch (error) {
      alert(error.message);
    }
    setAddNewChannelFlag(true)
  },




  addUsers: async function (
    user,
    selectedList,
    channelId
  ) {
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };
      
      const params = {
        id: channelId,
        member_id: selectedList
      };

      const res = await axios.post(`${API_URL}/channel/add_member`, params, { headers });
      const { data } = res;
      
      if (res.status === 200 || res.status === 201) {
        if (data.errors) {
          alert(data.errors);
        } else {
          alert("added user to channel");
        }
      } else {
        alert("Errors were encountered :(");
      }
    } catch (error) {
      alert(error.message);
    }
  },

};

export default ChannelService;
