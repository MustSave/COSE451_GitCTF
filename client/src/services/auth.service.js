import axios from "axios"

const API_URL = "./auth/";

class AuthService {
    login(id, pw, datas={}) {
        return axios.post(API_URL + "signin", { id, pw, ...datas }, {withCredentials: true})
        .then(response => {return response.data;})
        .catch(err=>{throw err})
    }

    logout() {
        return axios.get(API_URL + "logout", {withCredentials: true})
        .then(response=>{return response.data})
        .catch(err=>{throw err})
    }
}

export default new AuthService();