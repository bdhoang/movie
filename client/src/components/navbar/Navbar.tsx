import { ArrowDropDown, Notifications, Search } from '@mui/icons-material'
import React, { useState } from 'react'
import './navbar.scss'

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
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
                <span>Home</span>
                <span>TV Shows</span>
                <span>Movies</span>
                <span>New & Popular</span>
                <span>My list</span>
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
                <span>LogOut</span>
             </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar