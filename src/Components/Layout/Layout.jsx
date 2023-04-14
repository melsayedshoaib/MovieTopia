import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import React from 'react'

export default function Layout({ userData, setUserData }) {
  function logOut() {
    localStorage.removeItem("user-token");
    setUserData(null);
  }
  return (
    <div>
      <Navbar userData={ userData} logOut={logOut} />
      <Outlet/>
    </div>
  )
}
