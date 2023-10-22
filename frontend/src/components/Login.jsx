import React, { Component } from 'react';
import UserDataService from '../services/user.service';

class Login extends React.Component {
    constructor(props){
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(e) {
        e.preventDefault();
        let that = this
        let email = this.props.currentUser;

        UserDataService.newUserSession(
            {
                user: {
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                }
            }
        )
        .then(function(response){
            that.props.changePage("delete");
            that.props.updateCurrentUser(response.data);
            // console.log(response.data.user);
            console.log('1234567891234567890');
            console.log(response.data);
            // that.props.setEmail(response.data.user?.email);
            // that.props.setJson(response.data.json);
        })
        .catch(function(error){
            console.log(error);
        })
  }
  render() {
    return (
        <div>
          <h2>Login</h2>
          <form>
            <input id="email" placeholder="email"/>
            <input id="password" placeholder="password"/>
            <button onClick={this.handleLogin}>Submit</button>
          </form>
          <button onClick={() => this.props.changePage("signup")}>Back to Sign Up</button>
        </div>
      );
    };
  };

export default Login;  

// import React, { Component } from 'react';
// import UserDataService from '../services/user.service';

// const Login: React.FC = function() {
    
//     handleLogin(e: any) {
//         e.preventDefault();
//         let that = this
//         let email = this.props.currentUser;

//         UserDataService.newUserSession(
//             {
//                 user: {
//                     email: document.getElementById("email").value,
//                     password: document.getElementById("password").value,
//                 }
//             }
//         )
//         .then(function(response){
//             that.props.changePage("delete");
//             that.props.updateCurrentUser(response.data);
//             // console.log(response.data.user);
//             console.log('1234567891234567890');
//             console.log(response.data);
//             setEmail(data.user?.email);
//             setJson(data.json);
//         })
//         .catch(function(error){
//             console.log(error);
//         })
//     }
//     this.handleLogin = this.handleLogin.bind(this);

//     return (
//         <div>
//           <h2>Login</h2>
//           <form>
//             <input id="email" placeholder="email"/>
//             <input id="password" placeholder="password"/>
//             <button onClick={this.handleLogin}>Submit</button>
//           </form>
//           <button onClick={() => this.props.changePage("signup")}>Back to Sign Up</button>
//         </div>
//     );
// };

// export default Login;  