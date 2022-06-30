import { Settings } from '@mui/icons-material'
import React from 'react'
import "./adnav.scss"

const AdNav:React.FC = () => {
  return (
    <div className='adnav'>
        <Settings />
        <img src="https://menback.com/wp-content/uploads/2021/09/Peaky-Blinders.jpg" alt="" />
    </div>
  )
}

export default AdNav