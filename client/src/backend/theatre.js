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
     return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    }
    }
}

export const addTheatres= async(values)=>
{
    try {
        const response= await api.post("/api/theatre/add",values)
        return response.data;
    } catch (error) {
        return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    }
}
}

export const updateTheatre= async(values)=>
{
    try {
        const response=await api.put("/api/theatre/update",values)
        return response.data;
    } catch (error) {
        console.log("Error occured while updating Theatre",error)
     return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    }

    }
    
}

export const deleteTheatre= async(obj)=>
{
    try {
        const response=api.delete(`/api/theatre/delete/${obj._id}`)
        return response.data;
    } catch (error) {
        console.log("Error occured while deleting theatre",error)
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    }

    }  
} 

//get all theatres for the owner method

export const getAllTheatresByOwner=async(payload)=>
    {
        try
        {
        const response=await api.post("/api/theatre/get-all-theatres-by-owners", payload)
        return response.data
        } 
        catch (error) {
        console.log("Fetch thetares error",error)
        return({
            success:false,
            message: error.response?.data?.message||error.message||"Something went wrong"
        })
    }
}

//get all theatres for admin

export const getAllTheatresForAdmin= async()=>
{
    try {
        const response= await api.get("/api/theatre/all")
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("theatre.js>getAllTheatres error",error)
     return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    }
    }
}