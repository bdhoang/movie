import React from 'react'
import './home.scss'
import Navbar from '../components/navbar/Navbar';
import Featured from '../components/featured/Featured';
import List from '../components/list/List';
const Home: React.FC = () => {
  return (
    <div className='home'>
      <Navbar />
      <Featured type=''/>
      <List />
      <List />
    </div>
  )
}

export default Home