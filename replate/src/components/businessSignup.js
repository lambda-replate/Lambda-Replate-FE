import React from "react";
import { connect } from "react-redux";
import { signup } from "../actions";
import { Radio } from "antd";
import styled from "styled-components";
import "../App.css";

const SignUpForm = styled.div`
  width: 550px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  text-align: left;
  form {
    width: 70%;
    margin: 0 0 40px 10px;
  }
  form input {
    display: block;
    width: 100%;
    margin: 5px auto 20px auto;
    border-radius: 8px 8px 0 8px;
    background: none;
    background-color: #f6f6f6;
    border: 1px solid #dedede65;
    height: 45px;
    padding-left: 20px;
  }
  label {
    text-align: left;
    margin: 10px;
  }
  h1 {
    color: #272d2d;
    padding: 20px 0;
    font-size: 2rem;
    text-align: left;
    font-weight: normal;
    margin: 0;
  }
  .ant-radio-group {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }
`;

const SignUpButton = styled.div`
  button {
    background: none;
    border: none;
    background-color: #4cb050;
    border-radius: 8px 8px 0 8px;
    width: 100%;
    color: white;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 30px;
    padding: 10px 20px;
    box-shadow: 0 5px 10px 2px #00000015;
    cursor: pointer;
    &:hover {
      background-color: #3d8d40;
    }
  }
`;

class BusinessSignUp extends React.Component {
  state = {
    newBusiness: {
      username: "",
      password: "",
      organization_name: "",
      address: "",
      email: "",
      phone: ""
    },
    confirmPassword: "",
    userType: "business"
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      newBusiness: {
        ...this.state.newBusiness,
        [e.target.name]: e.target.value
      }
    });
  };

  userChange = e => {
    this.setState({
      ...this.state,
      userType: e.target.value
    });
    console.log(this.state.userType);
  };

  signUp = e => {
    e.preventDefault();
    if (
      !this.state.newBusiness.username ||
      !this.state.newBusiness.password ||
      !this.state.newBusiness.organization_name ||
      !this.state.newBusiness.address ||
      !this.state.newBusiness.email ||
      !this.state.newBusiness.phone
    ) {
      return alert("You must fill out all fields to sign up");
    } else {
      this.props
        .signup(this.state.newBusiness, this.state.userType)
        .then(res => {
          console.log(res);
          if (res) {
            this.props.history.push(`/${this.state.userType}-dashboard`);
          }
        });
    }
  };

  render() {
    return (
      <div className="sign-up-wrapper">
        <div className="sign-up-left">
          <h1>Sign Up</h1>
          <h4>Choose Your Account Type</h4>
          <Radio.Group onChange={this.userChange} defaultValue="business">
            <div className="radio-div">
              <div>
                {" "}
                <Radio value="business" defaultChecked />
              </div>
              <div>
                <i class="fas fa-building" />
              </div>
              <div>
                <h2>I'm a Business</h2>
                <h3>(I want to donate food)</h3>
              </div>
            </div>
            <div className="radio-wrapper">
              <div className="radio-div">
                <Radio value="volunteer" />
                <div />
                <div>
                  <i class="fas fa-user-astronaut" />
                </div>
                <div>
                  <h2>I'm a Volunteer</h2>
                  <h3>(I want to receive food)</h3>
                </div>
              </div>
            </div>
          </Radio.Group>
        </div>
        <div className="sign-up-middle-line"> </div>
        <div className="sign-up-right">
          <SignUpForm>
            <h1>Create an Account</h1>

            <form onSubmit={this.signUp}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.newBusiness.name}
                onChange={this.handleChange}
                required="fill this out"
              />
              <label>Organization Name</label>
              <input
                type="text"
                name="organization_name"
                placeholder="Organization Name"
                value={this.state.newBusiness.organization_name}
                onChange={this.handleChange}
                required="fill this out"
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street, City, State, ZIP"
                value={this.state.newBusiness.address}
                onChange={this.handleChange}
                required="fill this out"
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.newBusiness.email}
                onChange={this.handleChange}
                required="fill this out"
              />
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="(123)-456-7890"
                value={this.state.newBusiness.phone}
                onChange={this.handleChange}
                required="fill this out"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.newBusiness.password}
                onChange={this.handleChange}
                required="fill this out"
              />
              <SignUpButton>
                <button type="submit" onClick={this.signUp}>
                  Sign Me Up
                </button>
              </SignUpButton>
            </form>
          </SignUpForm>
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
  { signup }
)(BusinessSignUp);
