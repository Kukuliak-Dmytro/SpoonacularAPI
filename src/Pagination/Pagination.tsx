import  './Pagination.css'
interface PaginateBarProps {
    currentPageNumber:number;
    number:number;
    totalResults:number;
    setPagination: (currentPageNumber: number) => void
}
 
const PaginateBar: React.FC<PaginateBarProps> = ({currentPageNumber,number,totalResults, setPagination}) => {
    const PageNumbers=[];
    
    for(let i=0;i<=Math.min(totalResults/number, 180);i++){
        PageNumbers.push(i);
    }

    return ( 
        <div className="paginateContainer">
           { PageNumbers.map((pageNumber)=>(
            <button key={pageNumber}className={`${pageNumber===(currentPageNumber)? 'activePage':''}`} onClick={()=>setPagination(pageNumber)}>{pageNumber+1}</button>
           ))}
        </div>
    );
}
 
export default PaginateBar;