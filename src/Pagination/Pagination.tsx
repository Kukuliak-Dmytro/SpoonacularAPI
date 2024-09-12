interface PaginateBarProps {
    offset:number;
    number:number;
    totalResults:number;
    setPagination: (pageNumber: number) => void
}
 
const PaginateBar: React.FC<PaginateBarProps> = ({offset,number,totalResults, setPagination}) => {
    const pageNumbers=[];
    
    for(let i=1;i<Math.min(901, totalResults/number);i++){
        pageNumbers.push(i);
    }
    return ( 
        <div className="paginateContainer">
           { pageNumbers.map((number)=>(
            <button key={number} onClick={()=>setPagination(number)}>{number}</button>
           ))}
        </div>
    );
}
 
export default PaginateBar;