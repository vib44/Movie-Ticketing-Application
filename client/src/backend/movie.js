import axios from 'axios'
import {API_BASE_URL} from "./config"

const api= axios.create({baseURL: API_BASE_URL,
    withCredentials: true
});

export const getAllMovies= async()=>
{
    try {
        const response= await api.get("/api/movie/all")
        console.log(response);
    } catch (error) {
        
    }
}