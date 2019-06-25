import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';


  class VolunteerSignUp extends React.Component {
      state={
          newBusiness: {
              name: '',
              phone: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreeToTerms: false,
          }
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

      

      VolunteerSignUp = e => {
          e.preventDefault();
          /* FINISHSIGN UP FUNCTIONS AFTER TALKING WITH JOSH */
      }

      render() {
          return(
              <div>
                <form>
                    <input 
                    type='text' 
                    name='name'
                    placeholder='Company Name'
                    value={this.state.newBusiness.name}
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
                    type='text' 
                    name='email'
                    placeholder='email'
                    value={this.state.newBusiness.email}
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
                    <input 
                    type='password' 
                    name='confirmPassword'
                    placeholder='confirm password'
                    value={this.state.newBusiness.confirmPassword}
                    onChange={this.handleChange}
                    required='fill this out'
                    />
                </form>
              </div>
          )
      }
  };

  export default VolunteerSignUp;