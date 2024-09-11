import { useState, useRef, useEffect } from 'react'
import './Search.css'
import Recipes from '../../Cards/Recipes';
import { useSearchParams } from 'react-router-dom';

function Search() {
  interface dataProps {
    results: Array<{
      id: number;
      image: string;
      imageType: string;
      title: string;
    }>;
    offset: number;
    number: number;
    totalResults: number;
  }

  // Declare state variables
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";  // Get query from URL
  const [pageNumber] = useState(2);
  const numberOfResults = 5;
  const [someData, setSomeData] = useState<dataProps>({ results: [], offset: 0, number: 0, totalResults: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch data based on search query
  useEffect(() => {
    fetchData();
  }, [searchParams]);  // Re-fetch data when the search params change

  async function fetchData() {
    const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=${numberOfResults}&offset=${pageNumber * numberOfResults}`);

    try {
      const response = await fetch(`http://localhost:5000?path=${apiURL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setSomeData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Search recipes using the Spoonacular API</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const query = (e.target as HTMLFormElement).querySelector('input')?.value;
            if (query) {
              setSearchParams({ query }); 
            }
          }}
        >
          <input type="text" placeholder="Search" defaultValue={searchQuery} />
          <input type="submit" value="Search API" />
        </form>
        <Recipes loading={loading} recipes={someData!.results}></Recipes>
      </div>
    </>
  );
}

export default Search;
