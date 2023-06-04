import React from 'react';
import debounce from 'lodash.debounce';
import search_icon from '../../assets/img/search_icon.svg';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../Redux/Slices/filterSlice';

import './Search.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [valueItem, setValueItem] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValueItem('')
    inputRef.current?.focus()
  }

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 500),
    []
  )

  const onChangeInput =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueItem(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className="input_search">
      <input 
        ref={inputRef}
        className="input" 
        value={valueItem}
        onChange={onChangeInput}
        placeholder='search'
      />
      
      {valueItem && (
        <button className="search_button" 
          onClick={onClickClear}
          >     
          <img 
            src={search_icon} 
            className="search_icon"
            alt="search_icon" 
          />
          <span className="search_button_text">clear</span>
        </button>
      )}    
      
      
    </div>
  )
}

export default Search
