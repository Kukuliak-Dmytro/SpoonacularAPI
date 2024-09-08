import { useEffect, useState } from 'react'

import './App.css'

function App() {
  useEffect(  ()=>{
    const apiURL = encodeURIComponent('https://api.spoonacular.com/recipes/complexSearch?query=pasta&minProtein=10&number=3&maxFat=30&minSodium=1&offset=10');
    
    fetch(`http://localhost:5000?path=${apiURL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
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
