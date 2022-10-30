import axios from 'axios';

const API_URL = 'http://localhost:8080/user/';

class UserService {
    // DO AUTH
    getHistory(params){
        return axios.post(API_URL + 'history', params, {withCredentials: true})
        .then(
            response=>{return response.data}
        )
        .catch(err=>{throw err})
    }

    enroll(params) {
        // DO AUTH
        return axios.post(API_URL + 'enroll', params, {withCredentials: true})
        .then(
            response=>{return response.data}
        )
        .catch(err=>{throw err})
    }

    cancel(params) {
        // DO AUTH
        return axios.post(API_URL + 'cancel', params, {withCredentials: true})
        .then(
            response=>{return response.data}
        )
        .catch(err=>{throw err})
    }
}

export default new UserService();