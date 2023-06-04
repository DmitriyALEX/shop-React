import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import CartButton from '../cart/cartButton';
import Search from '../Search/Search';

import LocalStorage from '../../LocalStorage/LocalStorage';

import styles from "./Header.scss";

export default function Header() {
  const location = useLocation() 

  return (
    <div className={styles.root}>
      <div className="header">  
        <Link to='/'>
          <img src={logo} alt="logo" className="logo"/>
        </Link>  
        <div className="header_search">   
          {
            location.pathname === '/' && < Search/> 
          }
        </div> 
        <Link to='/cart'
        className="header_cart_button">
          <CartButton/>
        </Link> 
      </div> 
      <div>
        <LocalStorage/> 
      </div>
    </div>
  )
}

