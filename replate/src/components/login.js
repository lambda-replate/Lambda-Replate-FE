import React from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { login } from '../actions'

class Login extends React.Component {
    state = {
        creds: {
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            creds: {
                ...this.state.creds,
                [e.target.name]: e.target.value
            }
        })
        
    }


    login = e => {
        let place = e.target.value
        e.preventDefault();
        this.props.login(place, this.state.creds).then(res => {
            console.log(res);
            if (res) {
                this.props.history.push(`/${place}-dashboard`)
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Hey</h1>
                <form>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        value={this.state.creds.username} 
                        onChange={this.handleChange}
                        required='fill this out'
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.creds.password} 
                        onChange={this.handleChange}
                        required='fill this out'
                    />
                    {/* {error && <div>Oops!</div>} */}
                </form>
                <button value='business' onClick={this.login}>Business Log in</button>
                    <button value='volunteer' onClick={this.login}>Volunteer Log in</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {    
       error: state.error,
    loggingIn: state.loggingIn 
    }
    
}

export default connect( mapStateToProps, { login } )(Login);