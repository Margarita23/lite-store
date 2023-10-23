import React, { Component } from 'react';
import UserDataService from "../services/user.service";

export default class Signup extends Component {
    constructor(props){
      super(props);
      this.handleSignup = this.handleSignup.bind(this);
    }
  handleSignup(e) {
        e.preventDefault();
        let that = this;

        UserDataService.create({
            user: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                password_confirmation: document.getElementById("password_confirmation").value
            }
        })
        .then(function(response){
            that.props.changePage("delete");
            that.props.updateCurrentUser(response.data);
        })
        .catch(function(error){
            console.log(error)
        })
  }
  render() {
    return (
        <div>
          <h2>Signup</h2>
          <form>
            <input id="email" placeholder="email"/>
            <input id="password" placeholder="password"/>
            <input id="password_confirmation" placeholder="retype password"/>
            <button onClick={this.handleSignup}>Submit</button>
          </form>
          <button onClick={() => this.props.changePage("login")}>Back to Login</button>
        </div>
      );
    };
  };