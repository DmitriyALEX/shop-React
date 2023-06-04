import React from 'react';
import { selectCart } from '../Redux/Slices/cartSlice';
import { useSelector } from 'react-redux';

const LocalStorage = () => {
  const {items} = useSelector(selectCart)
  const isMounted = React.useRef(false)
    
  React.useEffect(() => {
    if(isMounted.current) {
      const json = JSON.stringify(items); 
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items])

  return (
    <></>
  )
}

export default LocalStorage
