import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, logout } from '../../store/action/userAction.js';

class _SignUp extends Component {

    state = {
        msg: '',
        signupCred: {
            email: '',
            password: '',
            fullName: ''
        }
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

    doSignup = async ev => {
        ev.preventDefault();
        const { email, password, fullName} = this.state.signupCred;
        if (!email || !password || !fullName) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, fullName };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', fullName: ''} });
    };


    render() {
        let signupSection = (
            <form onSubmit={this.doSignup}>
                <input
                    className="input"
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    placeholder="Email"
                />
                <br />
                <input
                    className="input"
                    autoComplete="off"
                    type="text"
                    name="fullName"
                    value={this.state.signupCred.fullName}
                    onChange={this.signupHandleChange}
                    placeholder="Full Name"
                />
                  <br />
                <input
                    className="input"
                    autoComplete="off"
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                />

                <br />
                <button className="classic-btn">Signup</button>
            </form>
        );

        const { loggedInUser } = this.props;
        return (
            <div className="main-container tac">
                <h1>
                    SignUp Here!
                </h1>
                <h2>{this.state.msg}</h2>
                {loggedInUser && (
                    <div>
                        <h2>Welcome: {loggedInUser.fullName} </h2>
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                )}
                {!loggedInUser && signupSection}
                <hr />
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
    signup,
    logout
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);

