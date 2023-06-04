import React from 'react'
import { useDispatch } from 'react-redux'
import {  CartItem, addItems, minusItems, removeItems } from '../../Redux/Slices/cartSlice';

import './cartItem.css'

type CartItemsProps = {
  id: string, 
  imageUrl: string,
  title: string, 
  type: string, 
  size: number, 
  count: number, 
  price: number,
}

const CartItemBlock: React.FC<CartItemsProps> = ({id, imageUrl, title, type, size, count, price }) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addItems({
      id,
    } as CartItem)
    )
  }
  
  const onClickMinus = () => {
    dispatch(minusItems(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove ITEM?'))
    dispatch(removeItems(id))
  }

  return (
    <div className="cartItem">
      <div className="cartItem_info"> 
        <img src={imageUrl} alt="img" className="cartItem_img"/>
          <div className="cartItem_text">
              <div className="cartItem_title_and_button_remove"> 
                <span><p className="cartItem_title"><b>{title}</b></p></span>
                <div className="cartItem_button_remove">
                  <button 
                    onClick={onClickRemove}
                    className="button_remove"
                    >❌
                  </button> 
                </div>
              </div> 
            <p className="cartItem_type"><b>Type: </b>{type}</p>

            <div className="count">
              <div className="count_items">
                <button 
                onClick={onClickPlus}
                className="cartItem_button_plus" 
                >+
                </button> 
                <span className="cartItem_count">{count}</span> 
                <button 
                disabled={count === 1}
                onClick={onClickMinus}
                className="cartItem_button_minus"  
                >-
                </button>
              </div>
            </div>
            <p className="cartItem_price">Price: {price * count} ₴</p> 
        </div>
      </div>   
    </div>
  )
}

export default CartItemBlock
