import React from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { login } from "../actions";
// import styled from 'styled-components';

import "../App.css";

// const login = styled.div`

// `

class Login extends React.Component {
  state = {
    creds: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    let place = e.target.value;
    e.preventDefault();
    this.props.login(place, this.state.creds).then(res => {
      console.log(res);
      if (res) {
        this.props.history.push(`/${place}-dashboard`);
      }
    });
  };

  render() {
    return (
      <div className="login-page-container">
        <div className="login-container">
          <div className="login-header">
            <h1>Log In</h1>
          </div>
          <div className="form-container">
            <form>
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  required="fill this out"
                  onChange={this.handleChange}
                  value={this.state.creds.username}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required="fill this out"
                  onChange={this.handleChange}
                  value={this.state.creds.password}
                />
              </div>
            </form>
            <div className="login-button-holder">
              <button
                className="business-button"
                value="business"
                onClick={this.login}
              >
                Business Log in
              </button>
              <button
                className="volunteer-button"
                value="volunteer"
                onClick={this.login}
              >
                Volunteer Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    error: state.error,
    loggingIn: state.loggingIn
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
