import { AddCard, Movie, PersonOutline, List } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.scss"

const SideBar:React.FC = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <span className="logo">NetFlix Admin</span>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <li>
                        <Link to="/admin/user" >
                        <PersonOutline className='icon'/>
                        <span>Users</span>
                        </Link>
                </li>
                <li>    
                        <Link to="/admin/">
                        <Movie className='icon' />
                        <span>Movies</span>
                        </Link>
                </li>
                <li>    
                        <Link to="/admin/lists">
                        <List className='icon' />
                        <span>Lists</span>
                        </Link>
                </li>
                <li>    
                        <Link to = "/admin/movie/newmovie">
                        <AddCard className='icon' />
                        <span>Add Movie</span>
                        </Link>
                </li>
                <li>    <Link to = "/admin/lists/newlist">
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