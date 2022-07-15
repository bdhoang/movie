import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ListItem from '../../components/listItem/ListItem'
import Navbar from '../../components/navbar/Navbar'
import Home from '../home/Home'
import "./searchpage.scss"

const value: any = localStorage.getItem("user")

const SearchPage:React.FC = () => {
    const [listMovie,setListMovie] = useState<string[]> ([])
    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
     const query = useQuery()
     const name = query.get("query")
     console.log("name",name);
     useEffect(() => {
        const findMovie = async () => {
          try{
            const res = await axios.get(
              `http://localhost:8800/api/movies/find?name=${name}`,{
                headers: {
                  token: "Bearer "+JSON.parse(value).accessToken,
                }
              })
              setListMovie(res.data)
              console.log(res.data);
              
          }catch(err){
            console.log(err)
          }
        }
        findMovie()
      },[name])
  return (
    <div className='searchpage'>
      <Navbar />
      <div className="content">
        <h2>Result</h2>
       <div className='movies'>
       {listMovie.map((item:any,index) => (
       <ListItem item ={item._id} index={index}/>
              ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage