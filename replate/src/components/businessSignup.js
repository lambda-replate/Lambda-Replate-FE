import React from 'react';
import { connect } from 'react-redux';
import { bizSignup } from '../actions';
import Loader from 'react-loader-spinner';


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

      

      businessSignUp = () => {
          this.props.bizSignup(this.state.newBusiness).then(res => {
            console.log(res);
            if (res) {
                this.props.history.push("/")
            }
        })
      }

      render() {
          return(
              <div>
                <form>
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
                </form>
                <button onClick={() => this.businessSignUp()}>Sign Us Up</button>
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

export default connect( mapStateToProps, { bizSignup } )(BusinessSignUp);