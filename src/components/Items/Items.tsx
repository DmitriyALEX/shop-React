import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CartItem, addItems, selectCartitemById} from '../../Redux/Slices/cartSlice' 
import './Items.css'
import { Link } from 'react-router-dom'

const ageValue = ['Young', 'Adult']

type ItemsProps = {
  id: string,
  title: string, 
  price: number, 
  imageUrl: string,
  size: number[], 
  amount: number[], 
  types: number[],
}

const Items: React.FC<ItemsProps> = ({
  id, 
  title, 
  price,
  imageUrl, 
  size, 
  amount,
  types,
  }) => {
 
  const [ageActive, setageActive] = React.useState(0)
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartitemById(id))
  const addedCount = cartItem ? cartItem.count : 0;
 
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price, 
      imageUrl,
      type: ageValue[ageActive],
      count: 0, 
    };
    dispatch(addItems(item))  
  }

  return (
     <div className="Items">
       
      <div className="card">
         <div className="card_header">
         <Link  to={`/itemcard/${id}`}>
          <img src={imageUrl} className="card_image" alt="imageItem" />
         </Link>
        </div> 
        <div className="card_title">
          <Link className="card_title" to={`/itemcard/${id}`}>
            <b >{title}</b>
          </Link>
        </div>
        <div className="types">
          <ul>
              {
                types?.map((val, typeId) => (
                <li key={val}
                onClick={()=>setageActive(typeId)}
                className={ ageActive === typeId ? 'active_types' : ''
                  }>{ageValue[val]}</li>))
              }
          </ul>
        </div>
             <div className="sizes"> 
              </div> 
          <p className="card_price">Price: {price} ₴</p> 
        <button className="button" onClick={onClickAdd}>
          <span>Add</span>
          <span>
            {
              addedCount>0 && <i>{addedCount}</i>
            }
          </span>
          </button>
      </div>
    </div> 
  )
 
}

export default Items