import './Resipes.css'
interface RecipesProps {

    recipes: Array<{
        id: number;
        image: string;
        imageType: string;
        title: string
    }>;
    loading: boolean;

}

const Recipes: React.FC<RecipesProps> = ({ recipes, loading }) => {
    if (loading) { return <h2>Loading...</h2> }
    return (
    <ul>
        {recipes.map(data => (
            <li key={data.id} className="recipe">
               <img src={data.image} alt="" /> 
                <span>
                    <h3>{data.title}</h3>
                    <p>ID:{data.id}</p>
                </span>
            </li>
            ))}
    </ul>

    );
}

export default Recipes;