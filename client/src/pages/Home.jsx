import React,{useEffect} from 'react'
import { getCurrentUser } from '../backend/auth'
import { useDispatch, useSelector} from "react-redux"
import { setUserData} from "../redux/userSlice"

const Home = () => {
const {userData} = useSelector(state=> state.user)
const dispatch = useDispatch()
  const getUserData=async()=>
  
    {
      try{
        const userData=await getCurrentUser();
        console.log(userData)
        dispatch(setUserData(userData))
      }
      catch(error)
      {
        console.log("Error",error)
      }
    }

    useEffect(()=>{getUserData()},  [])
    if(!userData)
    {
      console.log("waiting for userdata...")
    }
  return <>
    <h1>Welcome, Home!</h1>
    <h3>{userData?.name}</h3>
  </>
}

export default Home