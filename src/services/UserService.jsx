import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
  getUsers: async function (user) {
    try {
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

  getDirectMessages: async function (user, userList, setDirectMessageUsers) {
    let temp = [];
    try {
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
        if (data.data.length !== 0) {
          temp = [
            ...temp,
            temp.find((chk) => chk === user.id) ? null : user.id,
          ];
          setDirectMessageUsers(temp.filter((id) => id !== null));
        }
      });
    } catch (err) {
      alert(err);
    }
  },
};

export default UserService;
