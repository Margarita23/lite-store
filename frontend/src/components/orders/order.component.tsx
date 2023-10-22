import React, { useState, useEffect } from 'react'
import IOrderData from '../../types/order.type';
import { Link } from "react-router-dom";
import OrdersDescriptionDataService from "../../services/orders-description.service";
import OrderDescriptions from './order-descriptions.component';
import IOrderDescriptionData from '../../types/orderDescription.type';

function Order({id, amount}:IOrderData) {
    const [orderDescriptions, setOrderDescriptions] = useState<IOrderDescriptionData[]>([]);

  useEffect(() => {
    OrdersDescriptionDataService.getAll(id)
      .then((response: any) => {
        setOrderDescriptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order descriptions:", error);
      });
  }, [id]);


  return (
    <div>
        <h4>Order</h4>
        <div>
            <label>
                <strong>№:</strong>
            </label>{" "}
            {id}
        </div>
        <div>
            <label>
                <strong>Amount:</strong>
            </label>{" "}
            {amount}
        </div>

        <Link
            to={"/orders/" + id}
            className="badge badge-warning btn btn-secondary"
        >
            Edit
        </Link>

        <OrderDescriptions orderDescriptions={orderDescriptions} />
    </div>
  );
}

export default Order;
