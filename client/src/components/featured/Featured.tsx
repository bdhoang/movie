import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomizedDialogsF from '../dialogfeature/DialogF'
import './featured.scss'

interface Props {
    type: string,
    setGen: any
}
const value: any = localStorage.getItem("user")
const Featured: React.FC<Props> = ({type,setGen}) => {
    const [movie, setMovie] = useState<any>({})
    useEffect(() => {
      const getRandomContent = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
                headers: {
                  token: "Bearer "+JSON.parse(value).accessToken,
                },
              })
            setMovie(res.data[0])
            
        }catch(err){
            console.log(err);      
        }
   
    }
        getRandomContent()
    
      }, [type])
    
    
  return (
    <div className='featured'>
        {type && (
            <div className="category">
                <span>
                    {type ==="movie" ? "Movies" : "Series"}
                </span>
                <select name='genre' id='genre' onChange={(e:any)=>setGen(e.target.value)}>
                    <option  >Genre</option>
                    <option value="action">Action</option>
                    <option value="anime">Anime</option>
                    <option value="asian">Asian</option>
                    <option value="award-winning">Award-Winning</option>
                    <option value="celebrate pride">Celebrate Pride</option>
                    <option value="crime">Crime</option>
                    <option value="dramas">Dramas</option>
                    <option value="fantasy">Fantasy</option>
                </select>
            </div>
        )}
        <img 
      src={movie?.img}
      alt="" />
        <div className="info">
            <img 
            src={movie?.imgTitle}
            alt="" />
            <span className='desc'>
                {movie?.desc}
            </span>
            <div className="buttons">
                <button className='play'>
                   <Link className='link' to={`/watch/${movie._id}`} state={movie}>
                   <PlayArrow /> 
                    <span>Play</span></Link>
                </button>
                <CustomizedDialogsF id = {movie?._id} />
            </div>
        </div>
    </div>
  )
}

export default Featured