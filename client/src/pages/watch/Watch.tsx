import { ArrowBackOutlined } from '@mui/icons-material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './watch.scss'

const Watch: React.FC = () => {
  const location = useLocation()
  const movie: any = location?.state
  
  return (
   
    <div className='watch'>
       <Link to={{pathname:"/"}}>
        <div className="back">
            <ArrowBackOutlined />
            Home
        </div>
        </Link>
        <video
        className="video"
        autoPlay={true}
        onProgress={() => {console.log("loading")} }
        controls
        src={movie.video}
      />
    </div>
  )
}

export default Watch