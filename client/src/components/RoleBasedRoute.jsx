import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from "../backend/auth"
import { setUserData, setLoading, fetchCurrentUser } from "../redux/userSlice"

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
    const { userData, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()

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
  },[])


    if (!userData && !loading) {
        console.log("UserData is null")
        return <Navigate to="/login" />
    }

    else if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {

        console.log("Inside else if")
        if (userData.role === "admin")
            return <Navigate to="/admin" />
        else if (userData.role === "partner")
            return <Navigate to="/theatre" />

    }
    return children;
}

export default RoleBasedRoute