import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
  getUsers: async function (user) {
    try {
      // console.log("i am in getUsers");
      const headers = {
        "access-token": user.accessToken,
        expire: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      const res = await axios.get(`${API_URL}/users`, { headers });
      const users = res.data.data;

      return users.filter((user) => user.id >= 4980);
    } catch (error) {
      if (error.res.data.errors) {
        alert(error.res.data.errors);
      }
    }
  },

  getDirectMessages: async function (
    user,
    userList,
    setDirectMessages,
    setDirectMessagesFlag,
    setDirectMessageUsers
  ) {
  async function getData(){

  }

    try {
      // console.log("test2")
      setDirectMessages([])
      setDirectMessageUsers([])
      const headers = {
        "access-token": user.accessToken,
        expire: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      
      userList.map(async (user) => {
        
        const params = `?receiver_id=${user.id}&receiver_class=User`;
        const res = await axios.get(`${API_URL}/messages${params}`, {
          headers,
        });
        const { data } = res;
        var temp = [];
        var recIdTemp = [];
        if (data) {
         
          var count = 0;
          await data.data?.map(async (usrid) => {
            
            //check for duplicate message ids
            // const isFound = temp.find((id1) => id1 === usrid.id);
              // setDirectMessages((oldLis) => [...oldLis, oldLis.some((data) => JSON.stringify(data) === JSON.stringify(usrid))? null : usrid]);
              const messangerDetails = {
                recId: usrid.receiver.id,
                recUid: usrid.receiver.uid
              }
              // oldList.some((id) => JSON.stringify(id) === JSON.stringify(messangerDetails))? null : messangerDetails]
              // let temp = [messangerDetails]
              setDirectMessageUsers((oldList) => [...oldList, oldList.some((id) => JSON.stringify(id) === JSON.stringify(messangerDetails))? null : messangerDetails])
              // console.log(temp)
              // console.log(temp.some((id) => id == messangerDetails));
          });
        }
      });
      //
      setDirectMessagesFlag(false)
    } catch (err) {
      alert(err);
    }
   },
};

export default UserService;
