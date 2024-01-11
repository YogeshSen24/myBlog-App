import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {login , logout} from './store/authSlice'
import {Outlet} from 'react-router-dom'
import { Header , Footer } from './components'

function App() {
// console.log(process.env.REACT_APP_APPWRITE_UTL); // this is how we access the enviornment variable in create react app
// console.log(import.meta.env.VITE_APPWRITE_URL); // this is how we access the enviornment variable in create vite

const [loading , setLoading] = useState(true)
const dispatch = useDispatch()
useEffect(()=>{
  try {
    authService.getCurrentUser()
  .then((data)=>{
    if(data){
      dispatch(login({data}))
    }
    else{
      dispatch(logout())
      // console.log("Logout");
    }
  })
  .finally(()=>{
    setLoading(false)
  })
    
  } catch (error) {
    console.log("error");
  }
  
} , [])


  return !loading ? (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      
    </>
  ) 
  : "loading..."
}

export default App
