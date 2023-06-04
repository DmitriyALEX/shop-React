import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './cart.css'
import { clearItems, selectCart } from '../../Redux/Slices/cartSlice';

import CartItemBlock from './cartItem';
import CartEmpty from './cartEmpty';

const BasketCart: React.FC = () => { 

  const [open, setOpen] = React.useState(false)

  const dispatch = useDispatch()
  const {totalPrice, items} = useSelector(selectCart)
  const totalCountItem = items.reduce((sum: number, item: any) => sum + item.count, 0)
  const onClickClear = () => {
    if (window.confirm('remove all items?'))
    dispatch(clearItems())
  }

  if(!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className="cart_main">
      <div className="link_to_main_page">
        <Link to='/' className="link_to_main_page_text">
          ➡️Main page⬅️</Link>
      </div>
      <div className="nav_total_and_clear">  
        <ul className="total_count">
          <li>TOTAL PRICE: <b>{totalPrice}</b></li>
          <li>TOTAL ITEMS: <b>{totalCountItem}</b></li>
        </ul>
        <ul className="clear"
          onClick={() => setOpen(!open)}> 
            {
              open 
              ? (<span className="clear_all_items" onClick={onClickClear}>Clear all items?</span>)
              : (<ul className="clear_all_items_img">
                  <li  className="clear_all_items_img_point"></li>
                  <li  className="clear_all_items_img_point"></li> 
                  <li  className="clear_all_items_img_point"></li>
                </ul>
              )  
            }
        </ul>
      </div> 
      <div className='cart_content'>
        <div className="cart_content_items">
          {
            items?.map((item: any) => 
            <CartItemBlock key={items} {...item}  />)
          }
        </div>
      </div>  
    </div>
  )
}

export default BasketCart
