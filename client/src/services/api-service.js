import axios from "axios"

const API_URL = "./data/";

class ApiService {
    getColList(year, term){
        return axios.post(API_URL + "cols", {year, term}, {withCredentials: true})
            .then(
                response=>{return response.data}
            )
            .catch(err=>{throw err})
    }

    getDeptList(year, term, col_cd){
        return axios.post(API_URL + "depts", {year, term, col_cd}, {withCredentials: true})
            .then(
                response=>{
                    return response.data;
                }
            )
            .catch(err=>{throw err})
    }

    getLecList(params){
        return axios.post(API_URL + "lecs", params, {withCredentials: true})
            .then(response=>{return response.data})
            .catch(err=>{throw err})
    }
}

export default new ApiService();