import { ArrowDropDown, Notifications, Search } from '@mui/icons-material'
import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { logout } from "../../context/admin/authContext/AuthActions";
import { AuthContext } from '../../context/admin/authContext/AuthContext';
import './navbar.scss'

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const {dispatch} = useContext(AuthContext)
    window.onscroll =() => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
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
            </div>
            <div className="right">
                <Search className='icon' />
                <Notifications className='icon'/>
            <img
             src='https://vcdn-giaitri.vnecdn.net/2022/04/28/Avatar-2-James-Cameron-5081-1651112580.jpg'
             alt=''/>
             <div className="profile">
             <ArrowDropDown className='icon'/>
             <div className="options">
                <span>Settings</span>
                <span onClick={() => dispatch(logout())}>LogOut</span>
             </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar