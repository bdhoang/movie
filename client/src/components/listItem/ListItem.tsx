import { Add, KeyboardArrowDown, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import React, { useState,useEffect } from 'react'
import './listItem.scss'
import axios from "axios";
import { Link } from 'react-router-dom';
import CustomizedDialogs from '../dialog/Dialog';

interface Props {
  index: number,
   item: {}
}
const value: any = localStorage.getItem("user")
const ListItem: React.FC <Props>= ({index,item}) => {
  const [movie,setMovie] = useState<any>()
  const [isHovered,setIsHovered] = useState<boolean>(false)
 
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
  ;
  
  return (
     
    <div className='listItem'
    style={{left: isHovered ? index * 225 - 50 + index * 2.5 : ""}}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
        <img 
        src={movie?.img}
        alt="" />
        {isHovered === true && (
          <>
           <Link to={{pathname:`/watch/${movie?._id}`}} state={movie}>
           <video src={movie?.trailer} autoPlay={true} loop /></Link>
        <div className="itemInfo">
          <div className="icons">
          <Link to={{pathname:`/watch/${movie?._id}`}} state={movie}>
            <PlayArrow className='icon'/>
            </Link>
            <Add  className='icon'/>
            <ThumbUpAltOutlined  className='icon'/>
            <ThumbDownOutlined  className='icon'/>
            <CustomizedDialogs id = {movie?._id}/>
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
   
  )
}

export default ListItem