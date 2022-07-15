import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from 'axios';

interface Props{
  type: string,
}
const value:any = localStorage.getItem("user")
const Home: React.FC <Props>= ({type}) => {

  const [lists,setLists] = useState<object[]>([])
  const [genre, setGenre] = useState<string | null>(null)
  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,{
            headers: {
              token: "Bearer "+JSON.parse(value).accessToken,
            }
          })
          setLists(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getRandomLists()
  },[type, genre])
  console.log(lists);
  
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGen={setGenre}/>
      {
        lists.map((list:any,index) =>(
          <List list={list} key={index}/>
        ))
      }
    </div>
  )
}

export default Home