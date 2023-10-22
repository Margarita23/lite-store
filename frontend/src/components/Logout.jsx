import React, { Component } from 'react';
import UserDataService from '../services/user.service';

class Logout extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }
    handleLogout(e) {
        e.preventDefault();
        let that = this
        let email = this.props.currentUser.email;
        UserDataService.deleteUserSession()
        .then(function(response){
            that.props.changePage("login")
            that.props.updateCurrentUser(email);
            console.log(response);
        })
        .catch(function(error){
          console.log(error)
        })
      }
    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Sign Out</button>
            </div>
        );
      };
    }

    export default Logout;