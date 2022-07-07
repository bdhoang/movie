import { LogoutOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import { logout } from '../../../context/admin/authContext/AuthActions'
import { AuthContext } from '../../../context/admin/authContext/AuthContext'
import "./adnav.scss"

const AdNav:React.FC = () => {
  const {dispatch} = useContext(AuthContext)
  return (
    <div className='adnav'>
        <LogoutOutlined onClick={() => dispatch(logout())} style={{cursor:"pointer"}} />
        <img src="https://menback.com/wp-content/uploads/2021/09/Peaky-Blinders.jpg" alt="" />
    </div>
  )
}

export default AdNav