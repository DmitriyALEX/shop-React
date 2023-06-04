import React from 'react'
import { Link } from 'react-router-dom'
import './cartEmpty.css'

const CartEmpty: React.FC = () => {

  return (
    <div className="cart_empty"> 
      <p className="cart_empty_text">Cart is empty</p>
      <p className="cart_empty_icon"><span>😕</span></p>
      <span > 
        <Link 
          className="to_main_page"
          to='/'>➡️ Main page
        </Link>
      </span> 
    </div>
  )
}

export default CartEmpty