import { useState, useRef, useEffect } from 'react'
import './App.css'
import Recipes from './Cards/Recipes';

function App() {
  interface dataProps{
    results:Array<{
      id:number;
      image:string;
      imageType:string;
      title:string
    }>;
    offset:number;
    number:number
    totalResults:number;
  }
  // Declare state variables inside the component
  const searchQuery = useRef<HTMLInputElement>(null);
  const [pageNumber] = useState(0);
  const numberOfResults = 5;
  const [someData, setSomeData] = useState<dataProps>({results:[],offset:0,number:0,totalResults:0}); 
  const [loading, setLoading]=useState(true);
  useEffect(()=>{fetchData();},[])

  // Fetch data from the API
  function fetchData() {
    const query = searchQuery.current?.value;
    console.log(query);
    // const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&minProtein=10&number=3&maxFat=30&minSodium=1&offset=10`);
    const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfResults}&offset=${pageNumber * numberOfResults}`);


   fetch(`http://localhost:5000?path=${apiURL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSomeData(data);
        setLoading(false);
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
          }}>

          <input type="text" placeholder='Search' ref={searchQuery} />
          <input type="submit" value="Search API" />
        </form>
        <Recipes loading={loading} recipes={someData!.results}></Recipes>
        {/* <div className="paginateContainer">
          {Array.from({ length: Math.ceil(someData!.totalResults / numberOfResults) }).map((_, i) => (
            <button key={i}>{i + 1}</button>  // Button for each page, starting from 1
          ))}
        </div> */}


      </div>
    </>
  )
}

export default App;
