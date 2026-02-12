import {useEffect} from 'react'
import { useSelector ,useDispatch} from "react-redux"
import {Navigate} from "react-router-dom"
import {getCurrentUser} from "../backend/auth"
import {setUserData} from "../redux/userSlice"

function ProtectedRoute({children}) {
  const { userData, loading } = useSelector((state)=>state.user);
  const dispatch= useDispatch();

  useEffect(()=>{

    const fetchUserData = async ()=>{
 
    try {
      if(loading) return null;
      if (!userData){
      const user=await getCurrentUser();
      if(user)
          {dispatch(setUserData(user))
            console.log("ProtectedRoute: UserData is set",userData)
          }
    } 
  }catch (error) {
      console.error("Error fetching user data:",error)
    }
  }
  
  fetchUserData();
  },[userData, dispatch])

      
return children;

}

export default ProtectedRoute