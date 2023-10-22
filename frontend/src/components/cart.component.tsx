import React, { Component } from "react";
import ICartItemData from "../types/cartItem.type";

interface CartProps {
    cartItems: ICartItemData[],
    addToCart: (cartItem: ICartItemData) => void
    onRemoveFromCart: (cartItem: ICartItemData) => void;
    onUpdateCartItem: (cartItem: ICartItemData) => void;
    completeOrder: (cartItems: ICartItemData[]) => void;
  }
  
  interface CartState {
    cartItems: ICartItemData[];
  }

class Cart extends React.Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = {
        cartItems: [],
        };
    }

    removeItemFromCart = (cartItem: ICartItemData) => {
        if (cartItem.count === 1) {
        this.props.onRemoveFromCart(cartItem);
        } else {
        this.props.onUpdateCartItem(cartItem);
        }
    };

    calculateTotalPrice = () => {
        const { cartItems } = this.props;
        const totalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.item.price*cartItem.count), 0);
        return totalPrice;
    };

    completeOrder = () => {
        this.props.completeOrder(this.state.cartItems);
    };

  render() {
    const { cartItems } = this.props;

    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.item.id}>
              {cartItem.item.name} - {cartItem.item.price}$ ({cartItem.count})
              <button className="btn btn-sm btn-danger" onClick={() => this.removeItemFromCart(cartItem)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
            <p><strong>Total: </strong>{this.calculateTotalPrice()} $</p>
        </div>

        <div>
        <button className="btn btn-sm btn-success btn-effect-success" onClick={() => this.completeOrder()}>Complete the order</button>
        </div>
      </div>
    );
  }
}

export default Cart;