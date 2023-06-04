import React from 'react';
import styles from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>⚠️</span>
      <br />
        <p>This page doesn't exist</p>
        <span > 
        <Link 
          className="to_main_page"
          to='/'>➡️ Main page
        </Link>
      </span>
    </h1>
  )
}

export default PageNotFound
