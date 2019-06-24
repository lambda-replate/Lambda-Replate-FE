import React from 'react'
import { connect } from 'react-redux'


class BusinessDashboard extends React.Component {
    state={
        user: this.props.user
    };

    componentDidMount(){
        this.setState({
            user: this.props.user
        });
        console.log(this.props.user);
    }

    render(){
        return(
            <div>
                <h2>{this.state.user.phone}</h2>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps, {  } )(BusinessDashboard);