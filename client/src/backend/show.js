import axios from 'axios'
import {API_BASE_URL} from "./config"

const api= axios.create({baseURL: API_BASE_URL,
    withCredentials: true
});

//add a show

export const addShows= async(payload)=>
{
    try {
        const response= await api.post("/api/show/add",payload)
        return response.data
    } catch (error) {
        return error.message   
    }

}

//get shows

export const getShows= async(payload)=>
{
    try {
        const response= await api.post("/api/show/get-all-shows",payload)
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("getShows error show.js",error)
        return error.message      
    }
}