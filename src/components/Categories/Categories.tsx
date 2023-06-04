import React from 'react'
import './Categories.css'

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
} 

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
 
  const categories = ['All Items', 'Dry Food', 'Wet Food']

  return (
    <div className="categories">
      <ul className="categories_list">
        {
          categories?.map((categoryName, index) => (
          <li key={index}
            onClick={() => onClickCategory(index) } 
            className={value === index ? 'active' : ''}>{categoryName}
          </li>
          ))
        }
      </ul> 
    </div>
  )
}

export default Categories
