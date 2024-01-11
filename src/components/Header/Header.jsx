import React from 'react'
import {Container , Logo , LogoutBtn} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state)=> state.status)
  // console.log(authStatus);
  const navigate = useNavigate()
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active : true
    },
    {
      name: "Login",
      slug: "/login",
      active : !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active : !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active : authStatus
    },
    {
      name: "Add post",
      slug: "/add-post",
      active : authStatus
    },
  ]
  return (
    <header className='flex items-center justify-between p-6 bg-blue-500'>
    <Container>
      <nav className='flex items-center'>
        <div className='mr-4'>
          <Link to='/'>
            <Logo width='70px '   />

            </Link>
        </div>
        <ul className='flex text-white ml-auto'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
              onClick={() => navigate(item.slug)}
              className='inline-bock px-6 py-2 '
              >{item.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
      </Container>
  </header>
  )
}

export default Header
