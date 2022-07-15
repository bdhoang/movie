import { LogoutOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../context/admin/authContext/AuthActions'
import { AuthContext } from '../../../context/admin/authContext/AuthContext'
import "./adnav.scss"

const AdNav:React.FC = () => {
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = () => {
   dispatch(logout())
   navigate('/')
  }

const data: any = localStorage.getItem("user")
  return (
    <div className='adnav'>
        <LogoutOutlined onClick={handleClick} style={{cursor:"pointer"}} />
        <img src={JSON.parse(data).profilePic} alt="" />
    </div>
  )
}

export default AdNav