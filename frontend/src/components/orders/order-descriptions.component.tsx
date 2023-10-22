import React from 'react';
import IOrderDescriptionData from '../../types/orderDescription.type';

function OrderDescriptions({ orderDescriptions }: { orderDescriptions: IOrderDescriptionData[] }) {
  return (
    <div>
      <h4>Order Descriptions</h4>
      <ul>
        {orderDescriptions.map((orderDescription, index) => (
          <li key={index}>
            <p>Item Name: {orderDescription.item_id}</p>
            <p>Quantity: {orderDescription.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDescriptions;