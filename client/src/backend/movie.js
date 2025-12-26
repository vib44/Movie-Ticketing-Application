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
        return response.data;
    } catch (error) {
        console.log("movie.js>getAllMovies error",error)
    }
}

export const addMovie= async(values)=>
{
    try {
        const response= await api.post("/api/movie/add",values)
        return response.data;
    } catch (error) {
        console.log("Error occured while adding movie",error)
    }
}

export const updateMovie= async(values)=>
{
    try {
        const response=api.put("/api/movie/update",values)
        return response.data;
    } catch (error) {
        console.log("Error occured while updating movie",error)
    }
    
}

export const deleteMovie= async(obj)=>
{
    try {
        const response=api.delete(`/api/movie/delete/${obj._id}`)
        return response.data;
    } catch (error) {
        console.log("Error occured while deleting movie",error)
    }
    
} 