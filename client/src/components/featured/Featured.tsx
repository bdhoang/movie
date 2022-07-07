import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './featured.scss'

interface Props {
    type: string,
    setGen: any
}
const value: any = localStorage.getItem("user")
const Featured: React.FC<Props> = ({type,setGen}) => {
    const [content, setContent] = useState<any>({})

    useEffect(() => {
      const getRandomContent = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
                headers: {
                  token: "Bearer "+JSON.parse(value).accessToken,
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
      src={content?.img}
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