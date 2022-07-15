import { ArrowDropDown, Notifications, Search } from '@mui/icons-material'
import { Input } from '@mui/material';
import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "../../context/admin/authContext/AuthActions";
import { AuthContext } from '../../context/admin/authContext/AuthContext';
import './navbar.scss'

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [query,setQuery] = useState<string>("")
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()
    window.onscroll =() => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }
 const data:any = localStorage.getItem("user")  
 const handleLogOut = () => {
    dispatch(logout())
    navigate("/")
 }
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="container">
            <div className="left">
                <img
                 src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="" />
                <Link to="/" className='link'>
                <span>Home</span>
                </Link>
                <Link to="/series" className='link'>
                <span>Series</span>
                </Link>
                <Link to="/movies" className='link'>
                <span >Movies</span>
                </Link>
                <span >New & Popular</span>
                <span >My list</span>
                {
                    JSON.parse(data).isAdmin && <Link to="/admin" className='link'>
                    <span >Admin</span>
                    </Link>
                }
            </div>
            <div className="right">
                <Link to={{pathname:query !== "" ? ("/search?query=" + query) : ""}}>
                <Search className='icon' />
                </Link>
                <Input placeholder="Search" style={{backgroundColor:"var(--main-color)",color:"white"}} onChange={(e:any)=> setQuery(e.target.value)}/> 
                <Notifications className='icon'/>
            <img
             src={JSON.parse(data).profilePic}
             alt=''/>
             <div className="profile">
             <ArrowDropDown className='icon'/>
             <div className="options">
                <Link className='link' to="/profile">
                <span>Settings</span>
                </Link>
                <span onClick={handleLogOut}>LogOut</span>
             </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar