import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const Protected = ({ children, role = "buyer" }) => {

    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const loading = useSelector((state) => state.auth.loading)
    console.log(loading)

    if (loading) {
        return <div>Loading...</div>
    }

    if(!user){
        return  <Navigate to='/login'/>
    }

    if(user.role != role){
        return <Navigate to='/login'/>
    }
    
  return children
}

export default Protected