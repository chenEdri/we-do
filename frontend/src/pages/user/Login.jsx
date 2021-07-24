import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Select, MenuItem } from '@material-ui/core';
import {
  loadUsers,
  removeUser,
  login,
  logout,
} from '../../store/action/userAction.js';

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      email: '',
      password: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  // removeUser = userId => {
  //   this.props.removeUser(userId);
  // };

  render() {
    let loginSection = (
      <form className="main-container" onSubmit={this.doLogin}>
        <div className="login tac">
          <input className="input"
            type="text"
            name="email"
            autoComplete="off"
            value={this.state.loginCred.email || ''}
            onChange={this.loginHandleChange}
            placeholder="Email"
        />
        <br />
          <input className="input"
            type="password"
            name="password"
            autoComplete="off"
            value={this.state.loginCred.password || ''}
            onChange={this.loginHandleChange}
            placeholder="Password"
          />
          <br />
          <button className="light-btn">Login</button>
        </div>
      </form>
    );

    const { loggedInUser } = this.props;
    return (
      <div className="main-container">
        <div>
          {(!loggedInUser)?<h1 className="tac">
            Login
        </h1>:''}
        </div>
        <h2>{this.state.msg}</h2>
        {loggedInUser && (
          <div>
            <h2>Welcome: {loggedInUser.fullName} </h2>
            <div><button className="warning-btn" onClick={this.props.logout}>Logout</button></div>
          </div>
        )}
        {!loggedInUser && loginSection}
        <hr />
        {/* <button onClick={this.props.loadUsers}>Get All Users</button> */}
        {this.props.isLoading && 'Loading...'}
        {this.props.users && <ul>
          {this.props.users.map(user => (
            <li key={user._id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <button
                onClick={() => {
                  this.removeUser(user._id);
                }}
              >
                Remove {user.fullName}
              </button>
            </li>
          ))}
        </ul>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    loggedInUser: state.userReducer.loggedInUser,
    isLoading: state.systemReducer.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  removeUser,
  loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
