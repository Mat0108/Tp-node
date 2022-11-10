import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';

const Nav = () =>{
  
  const [userset, setUserset] = useRecoilState(UserState);
  const onClick =  (event) =>{
    setUserset({isAdmin:false,isConnected:false,token:""}); 
  }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <label class="navbar-brand ">E-commerce</label>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <Link class="nav-link textcolor" to="/">Home </Link>
              </li>
              <li class="nav-item dropdown Cdropdown">
                <a class="nav-link dropdown-toggle textcolor" href="/Login" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Connection
                </a>
                <ul class="dropdown-menu Cdropdownmenu" aria-labelledby="navbarDropdown">
                    <li><Link class="dropdown-item Cdropdown" to="/Login">Login </Link></li>
                    <li><Link class="dropdown-item Cdropdown" to="/Register">Register </Link></li>
                </ul>
              </li>
              {userset.isConnected && <li class="nav-item">
                <Link class="nav-link textcolor" to="/" onClick={onClick}>Deconnection </Link>
              </li>}
     


              

            </ul>
                      </div>
        </div>
      </nav>
    /*
    <div class="topnav">
        <h5> E-commerce</h5>
        <Link to="/Login">Login </Link>
        <Link to="/Register">Register </Link>
       
    </div>
    */
    )
}
export default Nav