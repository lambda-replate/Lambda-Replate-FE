import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FoodCardz = styled.div`
width: 300px;
height: 300px;
border: 1px solid black;
margin: 10px 10px;
`;


class FoodCard  extends React.Component  {
    state={
        isBusiness: this.props.isBusiness,
        businessName: '',
        businesses: [],
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
                businesses: res.data,
                businessName: this.props.businessName
            })
        })
    }


    listState = () => {
        return console.log(this.state);
    }
 

   componentDidMount(){
    console.log(' businessName', this.props.businessName);
    this.getBusinesses();
    this.setState({
        businesses: localStorage.getItem('businesses'),
    });
   }
    

    render() {
        return(
        <FoodCardz>
            <h2>{this.props.food.name}</h2>
            <h4>{this.props.food.pickup_date}</h4>
            <h6>{this.props.food.time}</h6>
            <p>{this.props.food.description}</p>
            {this.state.isBusiness && 
            <div>
                <button onClick={ () => this.props.deleteFood(this.props.food.id)}>Delete Food</button>
                <button onClick={ () => this.props.updateFood(this.props.food, this.props.food.id)}>Update Food</button>
            </div>}
            {!this.state.isBusiness && (!this.props.food.is_claimed || this.props.food.volunteer_id === this.props.user_id) &&
                <button onClick={() => this.props.claimFood(this.props.food.id, this.props.food.is_claimed === 1 ? {is_claimed: 0} : {is_claimed: 1} )}>
                {this.props.food.is_claimed=== 1 ? 'Unclaim food' : 'Claim food'}
            </button>
            }
            <span>{this.props.businessName}</span>
        </FoodCardz>
        )
    }
    
};


export default FoodCard;