import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Declare state variables inside the component
  const searchQuery = useRef<HTMLInputElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const numberOfPages = 5;
  const [someData, setSomeData] = useState<any[]>([]); // Use state to store fetched data

  // Fetch data from the API
  function fetchData() {
    const query = searchQuery.current?.textContent;
    // const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&minProtein=10&number=3&maxFat=30&minSodium=1&offset=10`);
    const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfPages}&offSet=${pageNumber * numberOfPages}`);


    fetch(`http://localhost:5000?path=${apiURL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSomeData(data.results); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className="container">
        <h1>Search recipes using the Spoonacular API</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
        >
          <input type="text" placeholder='Search' ref={searchQuery} />
          <input type="submit" value="Search API" />
        </form>


        {someData.map((data) => (
          <h2 key={data.id}>{data.id}</h2> // Key prop added for each element
        ))}
        
      
      </div>
    </>
  )
}

export default App;
