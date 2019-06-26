import React from 'react';
import axios from 'axios';
import FoodCard from './foodCard';
import { connect } from 'react-redux';
import {claimFood} from '../actions';
import styled from 'styled-components';
import SearchBar from './searchBar'

const FoodSection = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-evenly;
`


class VolunteerDashboard extends React.Component {
    state={
        user: '',
        foods: [],
        businesses: [],
        filteredFoods: [],
        searchDate: '',
        searchCompany: '',
    };
    

    componentDidMount(){
        if(!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(this.props.user));
            localStorage.setItem('business', this.props.user.organization_name);
        } else {
        }
        this.getBusinesses();
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
        });
    }

    searchInput = e => {
        let filterTerm = e.target.value;
        this.setState({
            [e.target.name]: e.target.value,
        });
        this.filterFoods(e.target.value);
    };

    filterFoods = filterTerm => {
        console.log('asll the foods: ',this.state.foods);
        let newFilteredFoods = this.state.foods.filter(food => {
            return food.pickup_date.includes(filterTerm) || food.business_name.toLowerCase().includes(filterTerm);
        })
        this.setState({
            filteredFoods: newFilteredFoods,
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
            res.data.map(data => {
                data.business_name = this.callBusiness(data.business_id)
            });
            this.setState({
                ...this.state,
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
                ...this.state,
                businesses: res.data
            })
            this.getFood();
        })
    }

    claimFood = (foodID, claimStatus) => {
        this.props.claimFood(foodID, claimStatus, this.getFood);
    }

    // searchFilter = e => {
    //     const filteredFoods = this.state.foods.filter(
    //       food =>
    //         food.pickup_date.includes(e.target.value) 
    //     );
    //     this.setState({
    //       filteredFoods: filteredFoods,
    //       [e.target.name]: e.target.value
    //     });
    //   };

      callBusiness = (foodID) => {

        for(let i = 0; i < this.state.businesses.length; i++) {
            if(this.state.businesses[i].id === foodID) {
                
                return this.state.businesses[i].organization_name;
            }
        }
    };

    render(){
        return(
            <div>
                <SearchBar inputChange={this.searchInput}  searchDate={this.state.searchDate} searchCompany={this.state.searchCompany}/>
                <FoodSection>
                    {this.state.filteredFoods.length === 0 ? 
                        this.state.foods.map(food => {
                        return <FoodCard isBusiness={false} food={food} claimFood={this.claimFood} user_id={this.state.user.id} 
                        businessName={food.business_name}/>
                    }) :
                    this.state.filteredFoods.map(food => {
                        return <FoodCard isBusiness={false} food={food} claimFood={this.claimFood} user_id={this.state.user.id} 
                        businessName={food.business_name}/>
                    })
                    }

{/* 
                    {this.state.filteredFoods.map(food => {
                        return <FoodCard isBusiness={false} food={food} claimFood={this.claimFood} user_id={this.state.user.id} 
                        businessName={food.business_name}/>
                    })} */}
                    
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