import React, { Component } from 'react';
import UserDataService from '../services/user.service';

export default  class Logout extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout(e) {
        e.preventDefault();
        let that = this
        UserDataService.deleteUserSession()
        .then(function(response){
            that.props.updateCurrentUser(null);
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
