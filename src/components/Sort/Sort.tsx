import React from 'react';
import { setSort, selectSort, SortPropsEnum } from '../../Redux/Slices/filterSlice';

import { useSelector, useDispatch } from 'react-redux';

import './Sort.css';

type SortItem = {
  name: string;
  sortProps: SortPropsEnum;
}

export const menuItem: SortItem[]  = [
  {name: 'Popular 🔺', sortProps: SortPropsEnum.RATING_DESC },
  {name: 'Popular 🔻', sortProps:  SortPropsEnum.RATING_ASC },
  {name: 'Price 🔺', sortProps:  SortPropsEnum.PRICE_DESC },
  {name: 'Price 🔻', sortProps:  SortPropsEnum.PRICE_ASC },
  {name: 'Alphabet 🔺', sortProps:  SortPropsEnum.TITLE_DESC },
  {name: 'Alphabet 🔻', sortProps:  SortPropsEnum.TITLE_ASC },
];

export default function SortPopUp() {
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const onClickListItem = (obj:  SortItem) => {
    dispatch(setSort(obj));
    setIsOpen(false); 
  };

  React.useEffect(() => {
    const handleClickOutside =  (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpen(false); 
      }
    };
     document.body.addEventListener("click", handleClickOutside);

     return  () => document.body.removeEventListener("click", handleClickOutside)  
  }, []);

  return (
    <div  ref={sortRef} className="sort">
      <div  className="sort_item">
        <span className="sort_title">
          <b>Sort:</b>
        </span>
         <div className="sort_value" onClick={() => setIsOpen(!isOpen)}> 
          <span 
            className="sort_value_title"
            >{sort.name}
          </span>
         </div>
      </div>
        <div className="menu_popup">
          {isOpen && (
            <ul>
              {
                menuItem.map((obj, index) => (
                  <li
                    key={index}
                    onClick={() => onClickListItem(obj)}
                    className={sort.sortProps === obj.sortProps ? 'active_sort_item' : ''}
                    >{obj.name}   
                  </li>
                ))
              }
            </ul>
          )} 
        </div>  
    </div>
  )
}
 