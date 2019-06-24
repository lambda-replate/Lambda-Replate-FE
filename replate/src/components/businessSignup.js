import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';
import { Radio } from 'antd';


  class BusinessSignUp extends React.Component {
      state={
          newBusiness: {
              username: '',
              address: '',
              email: '',
              phone: '',
              password: '',
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
          this.props.signup(this.state.newBusiness, this.state.userType).then(res => {
            console.log(res);
            if (res) {
                this.props.history.push(`/${this.state.userType}-dashboard`)
            }
        })
      }

      render() {
          return(
              <div>
                <Radio.Group onChange={this.userChange} defaultValue="business">
                    <Radio value='business' defaultChecked>Business</Radio>
                    <Radio value='volunteer'>Volunteer</Radio>
                </Radio.Group>
                <form onSubmit={this.signUp}>
                    <input 
                    type='text' 
                    name='username'
                    placeholder='Company Name'
                    value={this.state.newBusiness.name}
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
                    <button type='submit'>Sign Us Up</button>
                </form>
              </div>
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