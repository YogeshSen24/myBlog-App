import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children , authentication}) {
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const authStatus = useSelector(state=>state.status)

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
            console.log("login faild");

        }else if(!authentication && authStatus!==authentication){
            navigate("/")
            console.log("login sucess");

        }else{
            setLoader(false)
        }
    },[authStatus,navigate,authentication])
  return loader ? <h1>loading...</h1> :<>{children} </>
}

