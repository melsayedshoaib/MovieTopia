import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from './Components/About/About'
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Movies from './Components/Movies/Movies'
import Notfound from './Components/Notfound/Notfound'
import People from './Components/People/People'
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Providers from "./Components/Providers/Providers";
import Regions from "./Components/Regions/Regions";
import Register from './Components/Register/Register'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Tvshow from './Components/Tvshow/Tvshow'
import jwtDecode from "jwt-decode";

export default function App() {
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("user-token");
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem("user-token") !== null) {
      saveUserData();
    }
  }, [])
  const routers = createBrowserRouter([
  {
    path: '', element: <Layout userData={userData} setUserData={setUserData} />, children: [
      {path: '', element:<ProtectedRoute><Home/></ProtectedRoute>},
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "movies", element: <ProtectedRoute><Movies /></ProtectedRoute> },
      { path: "tvshow", element: <ProtectedRoute><Tvshow /></ProtectedRoute> },
      { path: "people", element: <ProtectedRoute><People /></ProtectedRoute> },
      { path: "regions", element: <ProtectedRoute><Regions /></ProtectedRoute> },
      { path: "providers", element: <ProtectedRoute><Providers /></ProtectedRoute> },
      { path: "about/:id/:media_type", element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      {path:"login", element: <Login saveUserData={saveUserData} /> },
      {path:"forgetpassword", element: <ForgetPassword /> },
      {path:"resetpassword", element: < ResetPassword/> },
      { path: "*", element: <Notfound /> }
  ]}
]);
  return <div>
    <RouterProvider router={routers}></RouterProvider>
  </div>
}
