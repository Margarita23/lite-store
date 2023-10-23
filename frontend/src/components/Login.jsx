import React from 'react';
import UserDataService from '../services/user.service';

class Login extends React.Component {
    constructor(props){
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.state = {
        email: "",
        password: ""
      }
    }

    handleLogin(e) {
        e.preventDefault();
        let that = this
        let { email, password } = this.state;

        UserDataService.newUserSession({ email, password })
        .then((response) => {
            that.props.changePage("delete");
            that.props.updateCurrentUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
  };

  render() {
    const {email, password} = this.state;
    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
            <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => this.setState({
                email: e.target.value
              })}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => this.setState({
                password: e.target.value
              })}
            />
            <button type="submit">Login</button>
        </form>
        <button onClick={() => this.props.changePage("signup")}>Back to Sign up</button>
        </div>
    );
  }
}

export default Login;
