import React from 'react'
import IItemData from '../types/item.type';

function Item({name, description, price}:IItemData) {
  return (
    <div>
      <h2>{name}</h2>
      <h2>{description}</h2>
      <h2>{price}</h2>
    </div>
  );
}

export default Item;
