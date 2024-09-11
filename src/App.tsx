import { Routes,Route } from "react-router";
import Search from "./Pages/Search/Search";
import Recipe from "./Pages/Recipe/Recipe";
function App() {
    return (
        <> 
        <Routes>
            <Route path='/' element={<Search/>}/>
            <Route path='/:id' element={<Recipe/>}/>
        </Routes>
        
        </>

    )
}
export default App;