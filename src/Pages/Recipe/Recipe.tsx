import { useParams } from "react-router";

interface RecipeProps {
    
}
 
const Recipe: React.FC<RecipeProps> = () => {
    const {id}=useParams()
    return ( <>
    <h2>Recipe id:{id}</h2>
    </> );
}
 
export default Recipe;