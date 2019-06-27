import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';
import { Radio } from 'antd';
import styled from 'styled-components';

const SignUpForm = styled.div`
width: 550px;
height: 650px;
background-color: white;
border-radius: 15px;
margin: 50px auto;
overflow: hidden;
box-shadow: 0 0 37px 5px #00000025;
    form input{
        display: block;
        width: 80%;
        margin: 15px auto;
        border-radius: 8px 8px 0 8px;
        background: none;
        background-color: #f6f6f6;
        border: 1px solid #dedede65;
        height: 45px;
        padding-left: 20px;
    }
    h1{
        background-color: #4cb050;
        color: white;
        padding: 30px 0;
        font-size: 2.6rem;
        margin-top: 0px;
    }
`

const SignUpButton = styled.div`
    background: none;
    border: none;
    background-color: #4CB050;
    border-radius: 8px 8px 0 8px;
    width: 90%;
    color: white;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 30px;
    padding: 10px 20px;
    box-shadow: 0 0 5px 2px #00000018;
    cursor: pointer;
    &:hover{
        background-color: #2CB050;
    }
`


  class BusinessSignUp extends React.Component {
      state={
          newBusiness: {
              username: '',
              password: '',
              "organization_name": '',
              address: '',
              email: '',
              phone: '',
          },
          confirmPassword: '',
          userType: 'business',
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
        })
        console.log(this.state.userType);
    };

      signUp = e => {
          e.preventDefault();
          if(!this.state.newBusiness.username || !this.state.newBusiness.password || !this.state.newBusiness.organization_name || !this.state.newBusiness.address || !this.state.newBusiness.email || !this.state.newBusiness.phone){
              return alert('You must fill out all fields to sign up');
          } else{
            this.props.signup(this.state.newBusiness, this.state.userType).then(res => {
                console.log(res);
                if (res) {
                    this.props.history.push(`/${this.state.userType}-dashboard`)
                }
            })
          }
      }

      render() {
          return(
              <SignUpForm>
                  <h1>Sign Up here!</h1>
                <Radio.Group onChange={this.userChange} defaultValue="business">
                    <Radio value='business' defaultChecked>Business</Radio>
                    <Radio value='volunteer'>Volunteer</Radio>
                </Radio.Group>
                <form onSubmit={this.signUp}>
                    <input 
                    type='text' 
                    name='username'
                    placeholder='username'
                    value={this.state.newBusiness.name}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <input 
                    type='text' 
                    name='organization_name'
                    placeholder='Organization Name'
                    value={this.state.newBusiness.organization_name}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <input 
                    type='text' 
                    name='address'
                    placeholder='company address'
                    value={this.state.newBusiness.address}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <input 
                    type='text' 
                    name='email'
                    placeholder='email'
                    value={this.state.newBusiness.email}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <input 
                    type='number' 
                    name='phone'
                    placeholder='(123)-456-7890'
                    value={this.state.newBusiness.phone}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <input 
                    type='password' 
                    name='password'
                    placeholder='password'
                    value={this.state.newBusiness.password}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                    <SignUpButton type='submit' onClick={this.signUp}>Sign Us Up</SignUpButton>
                </form>
              </SignUpForm>
          )
      }
  };

  const mapStateToProps = state => {
    console.log(state);
    return {
       error: state.error,
        loggingIn: state.loggingIn 
    }
    
}

export default connect( mapStateToProps, { signup } )(BusinessSignUp);