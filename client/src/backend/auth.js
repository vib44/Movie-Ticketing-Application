import axios from 'axios'
import {API_BASE_URL} from "./config"

const api= axios.create({baseURL: API_BASE_URL,
    withCredentials: true
});

export const register= async(values)=>
{
    try {
        const response =await api.post('api/auth/register',values);

        return (response.data);
    } catch (error) {
        console.log("Error: ",error)
    }
}


export const login= async(values)=>
{
    try {
        const response =await api.post('api/auth/login',values);

        return (response.data);
    } catch (error) {
        console.log("Error: ",error)
    }
}

export const getCurrentUser=async()=>
{
    try {
        const response=await api.get("/api/auth/current-user", {
         withCredentials: true
        });
        //Ensure consistent user data
        if(response.data && typeof response.data==="object")
        {
            return{
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            }
        }
        
        return response.data;
    } 
    catch (error) {
        console.log("Get current user error",error)
    }
}

export const logout=async()=>{
    try {
        const response= await api.post("/api/auth/logout",{
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log("Error logging out", error.response?.data||error.message)
        return { success: false, message: "Logout failed"}
    }
}
