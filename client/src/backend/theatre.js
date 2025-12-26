import axios from 'axios'
import {API_BASE_URL} from "./config"

const api= axios.create({baseURL: API_BASE_URL,
    withCredentials: true
});

export const getAllTheatres= async()=>
{
    try {
        const response= await api.get("/api/theatre/all")
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("theatre.js>getAllTheatres error",error)
    }
}

export const addTheatre= async(values)=>
{
    try {
        const response= await api.post("/api/theatre/add",values)
        return response.data;
    } catch (error) {
        console.log("Error occured while adding Theatre",error)
    }
}

export const updateTheatre= async(values)=>
{
    try {
        const response=api.put("/api/theatre/update",values)
        return response.data;
    } catch (error) {
        console.log("Error occured while updating Theatre",error)
    }
    
}

export const deleteTheatre= async(obj)=>
{
    try {
        const response=api.delete(`/api/theatre/delete/${obj._id}`)
        return response.data;
    } catch (error) {
        console.log("Error occured while deleting theatre",error)
    }
    
} 