import { AddCard, Movie, PersonOutline, List } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.scss"

const SideBar:React.FC = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <Link to="/" className='link'>
            <img
                 src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                  alt="" />
            </Link>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <li>
                        <Link to="/admin/users" className='link' >
                        <PersonOutline className='icon'/>
                        <span>Users</span>
                        </Link>
                </li>
                <li>    
                        <Link to="/admin/" className='link'>
                        <Movie className='icon' />
                        <span>Movies</span>
                        </Link>
                </li>
                <li>    
                        <Link to="/admin/lists" className='link'>
                        <List className='icon' />
                        <span>Lists</span>
                        </Link>
                </li>
                <li>    
                        <Link to = "/admin/movie/newmovie" className='link'>
                        <AddCard className='icon' />
                        <span>Add Movie</span>
                        </Link>
                </li>
                <li>    <Link to = "/admin/lists/newlist" className='link'>
                        <AddCard className='icon' />
                        <span>Add List</span>
                        </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar