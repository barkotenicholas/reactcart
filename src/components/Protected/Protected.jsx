import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
  const user = useSelector((state)=>state.login.user)
  console.info(user)
  if(!user){
    return <Navigate to='/'/>
  }
  return children
}

export default Protected