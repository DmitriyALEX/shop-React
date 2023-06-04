import React from 'react';
import './Pagination.css';

type PaginationProps = {
  value: number; 
  onClickPage: (i: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({value, onClickPage}) => {

  const Pages = [1, 2, 3] 

  return (
    <div className="pagination">
      <div className="pagination_items">
        {
          Pages?.map((page, i) => (
            <li key={page}
            onClick={() =>onClickPage(i + 1)}
            className={value === page ? 'active_page' : ''}
            >
            {page}</li>
          ))
        }
      </div>
    </div>
  )
}

export default Pagination
