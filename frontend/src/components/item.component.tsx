import React from 'react'
import IItemData from '../types/item.type';

function Item({name, description, price, addToCart}:IItemData & { addToCart: (item: IItemData) => void }) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{description}</h2>
      <h2>{price}</h2>
      <button onClick={() => addToCart({ name, description, price })}>Add to Cart</button>
    </div>
  );
}

export default Item;
