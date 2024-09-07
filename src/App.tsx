import { useEffect, useState } from 'react'

import './App.css'

function App() {
  useEffect(  ()=>{
     fetch('http://localhost:5000?path=recipes/complexSearch?titleMatch=beef&number=1', {
      method: 'GET',
      headers: {
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });

  },[])
    
  
  return (
    <>
    <div className="container">
      <h1>Search recipes by using the Spoonacular API</h1>
      <form action="">
        <input type="text" name="" id="" placeholder='Search'/>
        <input type="submit" value="Search API" />
      </form>
    </div>
    </>
  )
}

export default App
