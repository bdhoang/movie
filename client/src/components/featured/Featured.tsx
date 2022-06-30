import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './featured.scss'

interface Props {
    type: string
}

const Featured: React.FC<Props> = ({type}) => {
    const [content, setContent] = useState<any>({})

    useEffect(() => {
      const getRandomContent = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
                headers: {
                  token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjQyNTQ0NTAwYTFlYWQyZDI4MmYwNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA1ODk4MCwiZXhwIjoxNjU2NDkwOTgwfQ.Jr_MDAwcfgwg6EWuqgYq6nWRMKf6y3ZSvhGUJPhV9IY",
                },
              })
            setContent(res.data[0])
        }catch(err){
            console.log(err);      
        }
   
    }
        getRandomContent()
    
      }, [type])
    console.log(content);
    
  return (
    <div className='featured'>
        {type && (
            <div className="category">
                <span>
                    {type ==="movie" ? "Movies" : "TV Shows"}
                </span>
                <select name='genre' id='genre'>
                    <option >Genre</option>
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
      src={content.img}
      alt="" />
        <div className="info">
            <img 
            src={content.imgTitle}
            alt="" />
            <span className='desc'>
                {content.desc}
            </span>
            <div className="buttons">
                <button className='play'>
                    <PlayArrow /> 
                    <span>Play</span>
                </button>
                <button className='moreInfo'>
                    <InfoOutlined />
                    <span>More Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured