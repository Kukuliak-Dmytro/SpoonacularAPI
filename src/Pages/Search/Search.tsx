import { useState, useRef, useEffect } from 'react'
import './Search.css'
import Recipes from '../../Cards/Recipes';
import { useSearchParams } from 'react-router-dom';
import PaginateBar from '../../Pagination/Pagination';

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
  const searchQuery = searchParams.get("query") || ""; 
  // the API allows only 900 pages, no more 
  const [currentPageNumber,setcurrentPageNumber] = useState(0);
  const numberOfResults = 5;
  const [someData, setSomeData] = useState<dataProps>({ results: [], offset: 0, number: 0, totalResults: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch data based on search query
  useEffect(() => {
    fetchData();
  }, [searchParams, currentPageNumber]);  // Re-fetch data when the search params change

  async function fetchData() {
    const apiURL = encodeURIComponent(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=${numberOfResults}&offset=${currentPageNumber*numberOfResults}`);

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
  function setPagination(number:number){setcurrentPageNumber(number)}
  return (
    <>
      <div className="container">
        <h1>Search recipes using the Spoonacular API</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setcurrentPageNumber(0);
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
        <PaginateBar number={someData.number} currentPageNumber={currentPageNumber} totalResults={someData.totalResults} setPagination={setPagination}></PaginateBar>
      </div>
    </>
  );
}

export default Search;
