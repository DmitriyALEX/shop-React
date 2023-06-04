import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ItemCard.css';

const ItemCard: React.FC = () => {
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>()
  const {id} = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchItem() {
    try {
        const { data } = await axios.get('https://64465a990431e885f00fab2d.mockapi.io/data/'+id);
        setItem(data)
    } catch (error) {
        alert('error')
        navigate('/')
    }
    }

  fetchItem()
    }, []);

    if (!item) {
      return <>'is loading...'</>;
    }

  return (
    <div className="itemcard">
      <div className="itemcard_content"> 
      <div>
        <img className="item_card_img" 
        src={item.imageUrl} 
        alt="product"/>
      </div>
      <div className="item_card_text">
        <p className="cardItem_title"><b>{item.title}</b></p>
        <div className="cartItem_discription">
          <p>Superpremium Complete Food for Dogs. Hypoallergenic Grain-Free Formula rich in Insect for adult dogs of all breeds with sensitive, demanding skin and hair.</p>
        </div>
        <p className="cardItem_price">Price:<b>{item.price}</b> ₴</p>
        <button className="item_card_btn"> 
        Add Item
        </button> 
      </div>
      </div>
    </div> 
  )
}

export default ItemCard
