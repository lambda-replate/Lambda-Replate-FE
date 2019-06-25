import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addFood } from '../actions';


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

    addFood = e => {
        e.preventDefault();
          this.props.addFood(this.state.newFood).then(res => {
            // if (res) {
            //     this.props.history.push(`/${this.state.userType}-dashboard`)
            // }
        })
        this.getFood();
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
                {this.state.foods.map(food => {
                   return <h3>{food.name}</h3>
                })}

                
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

export default connect( mapStateToProps, { addFood } )(BusinessDashboard);