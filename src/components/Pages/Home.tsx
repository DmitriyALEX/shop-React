import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import { menuItem } from '../Sort/Sort'
import Items from '../Items/Items';
import ItemsLoader from '../Items/ItemsLoader';
import Pagination from '../Pagination/Pagination';
import ButtonToElem from '../BtnToElem/BtnToElem';
import Maps from '../ContactMap/Map';

import { setCategoryId, setCurrentPage, setFilters, selectFilter } from '../../Redux/Slices/filterSlice';
import { SearchProductParams, fetchProduct, selectProductItems } from '../../Redux/Slices/productSlice';
import { useAppDispatch } from '../../Redux/Store';

import PageNotFound from '../PageNotFound/Index';

import './Home.css';
import CartButton from '../cart/cartButton';

const Home: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const {categoryId, sort, currentPage, searchValue }  = useSelector(selectFilter);
  const {items, status}  = useSelector(selectProductItems);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onClickPage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getProduct = async () => {
    const order = sort.sortProps.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProps.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    // Url - search
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
        fetchProduct({
          search,
          order,
          sortBy,
          category,
          currentPage: Number(currentPage),
        }))
    window.scrollTo(0, 0);
  }

    // Если был первый рендер isMounted.current тогда 
    // Если изменили параметры и был  первый рендер
  React.useEffect(() => {
    if (isMounted.current) { 
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProps: sort.sortProps,
        currentPage,
      }
    const queryString = qs.stringify(
      params, {skipNulls: true}
    ); 
    navigate(`?${queryString}`);
  }
  }, [categoryId, sort.sortProps, currentPage, navigate])


// Если был первый рендер то запрашиваем items
  React.useEffect(() => {
    getProduct();
  }, [categoryId, sort.sortProps, currentPage])

// ВСЕ КОММЕНТ Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) 
      {
        const params = qs.parse(window.location.search.substring(1)) as unknown as SearchProductParams;
        const sort = menuItem.find(obj => obj.sortProps === params.sortBy)    
        dispatch(setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || menuItem[0],
        }));
        isMounted.current = true;
      }
  }, [])

  const itemLoader = [...new Array(6)].map((_, i) => <ItemsLoader key={i}/>);
  const itemContent = items
// метод .filter це функція пошуку товарів на сторінці, але шукає тільки по тим данним які прийшли з get-запиту. А з get-запиту приходить тільки посторінково.
  .filter((obj: any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  })
  .map((obj: any) =>
    <Items key={obj.id} {...obj} /> 
  );

  const contactSection = React.useRef<HTMLHeadingElement>(null);
  const goToContact = () => window.scrollTo(
    {
      top: contactSection.current?.offsetTop,
      behavior: "smooth"
    }
  )

  return (
    <div className="container">
      <div className="categories_sort">
        <div className="cartBtn_amedia_visible">
          <CartButton/>
        </div>
        <Categories value={categoryId} onClickCategory={onClickCategory}/>
        <Sort />
        <button className="btn_to_contact" 
        onClick={goToContact}>Contact</button>
      </div>
      <div>
        {
          status === 'error' 
          ? (
            <h1>
              <PageNotFound/>
            </h1>  
            ) 
          : (<div className="content_items"> {status === 'loading'  ? itemLoader : itemContent} </div>)
        }
      </div> 
      <Pagination 
      value={currentPage} 
       onClickPage={onClickPage}
      />
      <p ref={contactSection}></p>
      <div className="contacts_item" >
        <div className="contacts_item_discription">
          <div className="contacts_item_text">
            <p className="contacts_text_title"><b>Contacts:</b></p>
            <hr className="contacts_text_title_line"></hr>
            <p className="contacts_text_address"> 📍 Butyshiv Ln, 12, Kyiv, 02000</p>
            <a 
              className="contacts_text_telephone"
              href="tel:+380956300846"> 📞 +38 (095) 6300846</a>
          </div>
        </div>
        <div className="contacts_maps">
          <Maps/>
        </div>
      </div>
      <ButtonToElem/> 
    </div>
  )
  }

export default Home