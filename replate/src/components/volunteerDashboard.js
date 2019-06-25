import React from 'react';
import axios from 'axios';
import FoodCard from './foodCard';
import { connect } from 'react-redux';
import {claimFood} from '../actions';
import styled from 'styled-components';

const FoodSection = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-evenly;
`


class VolunteerDashboard extends React.Component {
    state={
        user: '',
        foods: [],
        businesses: []
    };

    componentDidMount(){
        console.log(this.props.foods);
        if(!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(this.props.user));
            localStorage.setItem('business', this.props.user.organization_name);
        } else {
        }
        this.getFood();
        this.getBusinesses();
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
        });
    }

    getFood = () => {
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
            authorization: token
            }
        }
        axios
        .get('https://bw-replate.herokuapp.com/api/food', requestConfig)
        .then(res => {
            this.setState({
                foods: res.data
            })
        })
    }

    getBusinesses = () => {
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
            authorization: token
            }
        }
        axios
        .get('https://bw-replate.herokuapp.com/api/users/businesses', requestConfig)
        .then(res => {
            this.setState({
                businesses: res.data
            })
        })
    }

    claimFood = (foodID, claimStatus) => {
        this.props.claimFood(foodID, claimStatus);
        console.log(claimStatus)
        this.getFood();
    }

    render(){
        return(
            <div>
                <FoodSection>
                    {this.state.foods.map(food => {
                        return <FoodCard isBusiness={false} food={food} claimFood={this.claimFood} user_id={this.state.user.id}/>
                    })}
                    
                </FoodSection>
                {this.state.businesses.map(business => {
                        return <h3>{business.organization_name}</h3>
                    })}
            </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        user: state.user,
        foods: state.foods
    }
}

export default connect( mapStateToProps, { claimFood } )(VolunteerDashboard);