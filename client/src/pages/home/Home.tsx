import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from 'axios';

interface Props{
  type: string
}
const Home: React.FC <Props>= ({type}) => {
  const [lists,setLists] = useState<object[]>([])
  const [genre, setGenre] = useState<string | null>(null)
  console.log(type)
  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,{
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjQyNTQ0NTAwYTFlYWQyZDI4MmYwNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA1ODk4MCwiZXhwIjoxNjU2NDkwOTgwfQ.Jr_MDAwcfgwg6EWuqgYq6nWRMKf6y3ZSvhGUJPhV9IY",
            }
          })
          setLists(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getRandomLists()
  },[type, genre])
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type}/>
      {
        lists.map((list:any,index) =>(
          <List list={list} key={index}/>
        ))
      }
    </div>
  )
}

export default Home