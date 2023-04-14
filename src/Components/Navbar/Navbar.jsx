import React, { Fragment } from 'react'

import { Link } from "react-router-dom";
import image from '../../assets/imgs/sitelogo.png'

export default function Navbar({ userData, logOut}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home"><img className="w-25" src={ image } alt="logo"></img> <span className="fs-6">WatchTopia</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { userData !== null ?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="tvshow">Tvshow</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="people">People</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="regions">Regions</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="providers">Providers</Link>
          </li>
        </ul> : null}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData === null ?  <Fragment>
                <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
              </li>
              </Fragment> : <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={logOut}>Logout</Link>
          </li>}
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}
