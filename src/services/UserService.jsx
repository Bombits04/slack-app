import { API_URL } from '../constants/Constants';
import axios from 'axios';

const UserService = {

    getUsers: async function(user){
        try{
            console.log("i am in getUsers")
            const headers = {
                "access-token": user.accessToken,
                expire: user.expiry,
                client: user.client,
                uid: user.uid
            }
            const res = await axios.get(`${API_URL}/users`, {headers});
            const users = res.data.data;

            return users.filter((user) => user.id >= 4980);
        }catch(error){
            if (error.res.data.errors){
                alert (error.res.data.errors)
            }

        }
    }

}

export default UserService;