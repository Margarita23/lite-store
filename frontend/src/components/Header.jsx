import React, { Component } from 'react';
import Signup from './Signup';
import Logout from './Logout';
import Login from './Login';

class Header extends React.Component {
    constructor(props){
        super(props);
        if (this.props.currentUser == null){
          this.state = {
            page:"login"
          }
        } else{
          this.state = {
            page: "delete"
          }
        }
        this.changePage = this.changePage.bind(this);
      }
    changePage(newPage) {
        this.setState({
          page: newPage
        })
      }
    render() {
        let a = null;
        switch(this.state.page) {
          case "signup":
            a = <Signup changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>; break;
          case "login":
            a = <Login changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>; break;
          case "delete":
            a = <Logout changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>; break;
        }

        return (
            <div>
                <strong>Current user:</strong>
                <p>{this.props.currentUser}</p>
                {a}
            </div>
        )
      }
    }

    export default Header;