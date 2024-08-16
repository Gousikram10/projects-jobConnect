import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../../Asserts/promotion.png'
export const Navbar = () => {
  const [menu,setMenu]=useState("");
const navigate=useNavigate('');
  return (
    <div className='navbar'>
        <div className='nav-img'>
          <div>
        <img src={logo}></img>
          </div>
        <div className='nav-title'>
        <p  className='tit'>JobConnect</p>
        </div>
        </div>
       
        <ul className='nav-menu'>
          <Link to="/" style={{textDecoration:'none',color:'black'}}>
          <li onClick={(e)=>setMenu('home')}>Home
          {menu=='home'?<hr></hr>:<></>}
          </li>
          </Link>
          <li onClick={(e)=>{setMenu('about');
            navigate('/about');
            }}>About Us
          {menu=='about'?<hr></hr>:<></>}
          </li>
          <li onClick={(e)=>{setMenu('chatai');
            navigate('/chatai');
            }}>Chat Box
          {menu=='chatai'?<hr></hr>:<></>}
          </li>
          <a href='https://roadmap.sh/' target='/blank' style={{color:'black',textDecoration:'none'}}>
          <li  onClick={(e)=>{setMenu('roadmap');
            }}>RoadMap
          {menu=='roadmap'?<hr></hr>:<></>}
          </li>
            </a>
        </ul>
      
        <div className='nav-end'>
          <Link to="/login" style={{textDecoration:'none',color:'black'}}>
          <div>Login</div>
          </Link>
          <Link to="/reg" style={{textDecoration:'none',color:'black'}}>
          <div>SignUp</div>
          </Link>
        </div>
    </div>
  )
}
