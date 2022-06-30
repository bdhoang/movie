import { AddCard, Movie, PersonOutline, List } from '@mui/icons-material'
import React from 'react'
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
                        <PersonOutline className='icon'/>
                        <span>Users</span>
                </li>
                <li>
                        <Movie className='icon' />
                        <span>Movies</span>
                </li>
                <li>
                        <List className='icon' />
                        <span>Lists</span>
                </li>
                <li>
                        <AddCard className='icon' />
                        <span>Add Movie</span>
                </li>
                <li>
                        <AddCard className='icon' />
                        <span>Add List</span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar