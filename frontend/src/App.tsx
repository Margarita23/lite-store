import React, { Component } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Items from './components/items.component';
import AddItem from './components/add-item.component';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/items"} className="navbar-brand">
            Items
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* <Route path='/items' element={<Item name="Alice" description="Description my" price={29} />} /> */}
            <Route path='/items' element={<Items/>} />
            <Route path="/add" element={<AddItem/>} />
            {/* <Route path="/tutorials/:id" element={Item} /> */}
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

