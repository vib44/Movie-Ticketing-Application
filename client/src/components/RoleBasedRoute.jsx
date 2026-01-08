import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({children, allowedRoles=[]}) => {
    const {userData}= useSelector((state)=>state.user)

    if(!userData)
        return <Navigate to="/login"/>
    
    if(allowedRoles.length>0 && !allowedRoles.includes(userData.role))
    {
        if(userData.role==="admin")
            return <Navigate to ="/admin"/>
        else if ( userData.role==="partner")
            return <Navigate to="/theatre"/>
        else
            return <Navigate to="/home"/>    
    }

    return children;
}

export default RoleBasedRoute