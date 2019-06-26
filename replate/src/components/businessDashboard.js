import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addFood, deleteFood, updateFood } from '../actions';
import FoodCard from './foodCard';
import styled from 'styled-components';

const FoodSection = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-evenly;
`


class BusinessDashboard extends React.Component {
    state={
        user: '',
        foods: [],
        newFood: {
            name: '',
            pickup_date: '',
            time: '',
            description: '',
            is_claimed: 0,
            volunteer_id: null,
        }
    };

    getFood = () => {
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
            authorization: token
            }
        }
        axios
        .get('https://bw-replate.herokuapp.com/api/food/business', requestConfig)
        .then(res => {
            this.setState({
                foods: res.data
            })
        })
    }

    componentDidMount(){
        console.log(this.props.foods);
        if(!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(this.props.user));
            localStorage.setItem('business', this.props.user.organization_name);
        } else {
        }
        this.getFood();
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
        });
    }

    handleChange = e => {
        e.preventDefault();
          this.setState({
            newFood: {
                  ...this.state.newFood,
                  [e.target.name]: e.target.value
              }
          });
    }

    addFood = e  => {
        e.preventDefault();
          this.props.addFood(this.state.newFood, this.getFood).then(res => {
            // if (res) {
            //     this.props.history.push(`/${this.state.userType}-dashboard`)
            // }
        })
        this.getFood();
    }

    deleteFood = id => {
        console.log(id)
        this.props.deleteFood(id, this.getFood);  
    }

    updateFood = (food, id) => {
        if(!this.state.newFood.name){
            this.setState({
                newFood:{
                    ...food
                }
            })
        } else{
            this.props.updateFood(this.state.newFood, id, this.getFood);
            this.setState({
                newFood:{
                    name: '',
                    pickup_date: '',
                    time: '',
                    description: '',
                    is_claimed: 0,
                    volunteer_id: null,
                }
            })
        }
    }

    

    render(){
       return(
            <div>
                <h2>{this.state.user.phone}</h2>
                <form onSubmit={this.addFood}>
                    <input type="text" name="name" placeholder="Pickup Name" value={this.state.newFood.name} onChange={this.handleChange} />
                    <input type="date" name="pickup_date" placeholder="Pickup Date" value={this.state.newFood.pickup_date} onChange={this.handleChange} />
                    <input type="number" name="time" placeholder="Pickup Time" value={this.state.newFood.time} onChange={this.handleChange} />
                    <input type="text" name="description" placeholder="Pickup Description" value={this.state.newFood.description} onChange={this.handleChange} />
                    <button type="submit">Schedule a Pickup</button>
                </form>
                <FoodSection>
                    {this.state.foods.map(food => {
                    return <FoodCard food={food} deleteFood={this.deleteFood} updateFood={this.updateFood} isBusiness ={true}/>
                    })}
                </FoodSection>
                

                
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        user: state.user,
        foods: state.foods
    }
}

export default connect( mapStateToProps, { addFood, deleteFood, updateFood } )(BusinessDashboard);