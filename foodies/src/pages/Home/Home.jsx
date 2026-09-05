// import React from 'react'
import { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import Header from '../../components/Header/Header.jsx'

const Home = () => {

  const [category,setCategory] = useState('All');



  return (
    <div className="container">
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} searchText={''}/>
    </div>
  )
}

export default Home
