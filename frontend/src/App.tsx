import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Items from './components/items.component';
import Orders from './components/orders/orders.component';
import AddItem from './components/add-item.component';
import Header from './components/Header';
import UserDataService from './services/user.service';
import OrderDataService from './services/order.service';
import IUserData from './types/user.type';
import { useLocalStorage } from './useLocalStorage';
import ShoppingCart from './shopping-cart.svg';
import Cart from './components/cart.component';
import ICartItemData from './types/cartItem.type';

interface IResponseData {
  user: IUserData | null;
  json: string
}

const App: React.FC = function() {
  const [email, setEmail] = useLocalStorage("email", "");
  const [json, setJson] = useLocalStorage("json", "");
  const [cartItems, setCartItems] = useState<ICartItemData[]>([]);

  function updateCurrentUser(data: IResponseData) {
    console.log(data);
    console.log('********************');


    setEmail(data.user?.email);
    setJson(data.json);
  }

  function addToCart(cartItem: ICartItemData) {
    const existingCartItemIndex = cartItems.findIndex((item) => item.item.id === cartItem.item.id);

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].count += cartItem.count;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...cartItem, count: cartItem.count }]);
    }
  }

  function completeOrder() {
    OrderDataService.create(cartItems);
    setCartItems([]);
  }

  function removeItemFromCart(cartItem: ICartItemData) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.item.id !== cartItem.item.id)
    );
  }

  function updateCartItem(updatedCartItem: ICartItemData) {
    const existingCartItemIndex = cartItems.findIndex((item) => item.item.id === updatedCartItem.item.id);

    const updatedCartItems = [...cartItems];
    updatedCartItems[existingCartItemIndex].count -= 1;
    setCartItems(updatedCartItems);
  }

  // useEffect(() => {
  //   UserDataService.currentUser(localStorage.getItem('json') as string)
  //     .then(function(response) {
  //       console.log('Here is a user ->');
  //       console.log(response.data);
  //       console.log(response);
  //       if(response.data){
  //         console.log('-----------------4');
  //         // updateCurrentUser(response)
  //         // that.setState({
  //         //   currentUser: response.data.user
  //         // })
  //       } else {
  //         console.log('-----------------6');
  //         // that.setState({
  //         //   currentUser: null
  //         // })
  //       }
  //     })
  //     .catch(function(error){
  //       console.log('-----------------!!!');
  //       console.log(error);
  //     })
  // });


  return (
    <div>
        <strong>Current:</strong>
        <p>{localStorage.getItem('email')}</p>
        <strong>Token:</strong>
        <p>{localStorage.getItem('json')}</p>
        <div>
          <Header updateCurrentUser={updateCurrentUser} setEmail={setEmail} setJson={setJson}/>
        </div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/items"} className="navbar-brand">
            Items
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders history
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cart"} className="nav-link">
                <img src={ShoppingCart} alt="Cart" />
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path='/items' element={<Items addToCart={addToCart}/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/add" element={<AddItem/>} />
            <Route path="/cart" element={<Cart cartItems={cartItems} addToCart={addToCart} onRemoveFromCart={removeItemFromCart} onUpdateCartItem={updateCartItem} completeOrder={completeOrder}/>} />
          </Routes>
        </div>
      </div>
  );
};

export default App;

