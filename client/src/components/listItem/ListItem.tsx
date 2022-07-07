import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import React, { useState,useEffect } from 'react'
import './listItem.scss'
import axios from "axios";
import { Link } from 'react-router-dom';

interface Props {
  index: number,
   item: {}
}
const value: any = localStorage.getItem("user")
const ListItem: React.FC <Props>= ({index,item}) => {
  const [movie,setMovie] = useState<any>()
  const [isHovered,setIsHovered] = useState<boolean>(false)
  const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/movies/find/" + item, {
          headers: {
            token: "Bearer "+JSON.parse(value).accessToken ,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
 
  
  return (
     <Link to={{pathname:"/watch"}} state={movie}>
    <div className='listItem'
    style={{left: isHovered ? index * 225 - 50 + index * 2.5 : 0}}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <img 
        src={movie?.img}
        alt="" />
        {isHovered === true && (
          <>
           <video src={trailer} autoPlay={true} loop />
        <div className="itemInfo">
          <div className="icons">
            <PlayArrow className='icon'/>
            <Add  className='icon'/>
            <ThumbUpAltOutlined  className='icon'/>
            <ThumbDownOutlined  className='icon'/>
          </div>
          <div className="itemInfoTop">
            <span>{movie?.duration}</span>
            <span className='limit'>{movie?.limit}</span>
            <span>{movie?.year}</span>
          </div>
          <div className="desc">
            {movie?.desc}
          </div>
          <div className="genre">{movie?.genre}</div>
        </div>
        </>
        )}
    </div>
     </Link>
  )
}

export default ListItem