import React from 'react'
import { useSelector } from 'react-redux';

import { selectCart } from '../../Redux/Slices/cartSlice';
import { Link, useLocation } from 'react-router-dom';

import Hryvnia_symbol from '../../assets/img/Hryvnia_symbol.png';
import cart_icon from '../../assets/img/cart_icon.svg';
import './cartButton.css'

const CartButton = () => {
  const {items, totalPrice } = useSelector(selectCart);
  const totalCountItem = items.reduce((sum: number, item: any) => sum + item.count, 0)
  const location = useLocation()
 
  return  (
    <div className="summery_items">
      <div className="summery">
        {location.pathname !== '/cart' && (  
          <Link className="cart_link" to='/cart'>
            <span className="summery_items_cart_price">
              <img 
              className="cart_icon"
              src={cart_icon} 
              alt="cart_icon" />
              {totalCountItem}  
            </span>
            <span className="separator">|</span>
            <span className="summery_price">
              <img 
                className="hryvnia_icon"
                src={Hryvnia_symbol} 
                alt="Hryvnia_symbol" />
              {totalPrice}
            </span>
          </Link>
          )   
        }   
      </div>
    </div>
  )
}

export default CartButton
