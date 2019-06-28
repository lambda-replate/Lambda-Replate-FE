import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addFood, deleteFood, updateFood } from "../actions";
import FoodCard from "./foodCard";
import styled from "styled-components";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import "../App.css";

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
let min = yesterday.toISOString().split("T")[0];

const FoodSection = styled.div`
  width: 70%;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 0 auto;
`;

class BusinessDashboard extends React.Component {
  state = {
    user: "",
    foods: [],
    newFood: {
      name: "",
      pickup_date: "",
      time: "",
      description: "",
      is_claimed: 0,
      volunteer_id: null
    },
    visible: false,
    id: ""
  };

  // Modal Functions
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      newFood: {
        name: "",
        pickup_date: "",
        time: "",
        description: "",
        is_claimed: 0,
        volunteer_id: null
      },
      id: ""
    });
  };

  getFood = () => {
    const token = localStorage.getItem("jwt");
    const requestConfig = {
      headers: {
        authorization: token
      }
    };
    axios
      .get("https://bw-replate.herokuapp.com/api/food/business", requestConfig)
      .then(res => {
        this.setState({
          foods: res.data
        });
      });
  };

  componentDidMount() {
    console.log(this.props.foods);
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(this.props.user));
      localStorage.setItem("business", this.props.user.organization_name);
    } else {
    }
    this.getFood();
    this.setState({
      user: JSON.parse(localStorage.getItem("user"))
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
  };

  addFood = e => {
    e.preventDefault();
    this.props.addFood(this.state.newFood, this.getFood).then(res => {
      // if (res) {
      //     this.props.history.push(`/${this.state.userType}-dashboard`)
      // }
    });
    this.setState({
      newFood: {
        name: "",
        pickup_date: "",
        time: "",
        description: "",
        is_claimed: 0,
        volunteer_id: null
      },
      id: ""
    });
    this.getFood();
  };

  deleteFood = id => {
    console.log(id);
    this.props.deleteFood(id, this.getFood);
  };

  updateFood = (food, id) => {
    if (!this.state.newFood.name) {
      this.setState({
        newFood: {
          ...food
        },
        id: id
      });
    } else {
      this.props.updateFood(this.state.newFood, this.state.id, this.getFood);
      this.setState({
        newFood: {
          name: "",
          pickup_date: "",
          time: "",
          description: "",
          is_claimed: 0,
          volunteer_id: null
        },
        id: ""
      });
    }
  };

  render() {
    return (
      <div className="business-dash-container">
        <h1>
          Welcome to your Business Dashboard,{" "}
          {this.state.user.organization_name}!
        </h1>
        <div className="dashboard-top" />
        <div className="business-location">
          <div className="business-dash-columns">
            <div className="column-left">
              <div className="business-card">
                <h3>My Location</h3>
                <div className="business-photo" />
                <div className="business-card-description">
                  <h3>{this.state.user.organization_name}</h3>
                  <h4>{this.state.user.address}</h4>
                </div>
              </div>
              <Button type="primary" onClick={this.showModal}>
                + Add Food Request
              </Button>
            </div>
            <FoodSection>
              {this.state.foods
                .filter(food => food.pickup_date > min)
                .sort((a, b) => a.pickup_date < b.pickup_date)
                .map(food => {
                  return (
                    <FoodCard
                      food={food}
                      deleteFood={this.deleteFood}
                      updateFood={this.updateFood}
                      isBusiness={true}
                      showModal={this.showModal}
                    />
                  );
                })}
            </FoodSection>

            <div className="column-right">
              <div className="food-pickup-form">
                <div className="food-pickup-form-header" />
              </div>
            </div>
          </div>
        </div>
        <Modal
          title={this.state.id ? "Update Pickup" : "Schedule a Pickup"}
          visible={this.state.visible}
          onOk={() => {
            this.handleOk();
            this.addFood();
          }}
          onCancel={this.handleCancel}
        >
          <div className="form-wrapper">
            <form onSubmit={this.addFood}>
              <div className="pickup-name-input">
                <label>Pickup Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Pickup Name"
                  value={this.state.newFood.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="pickup-date-input">
                <label>Pickup Date</label>
                <input
                  type="date"
                  name="pickup_date"
                  placeholder="Pickup Date"
                  value={this.state.newFood.pickup_date}
                  onChange={this.handleChange}
                  min={min}
                />
              </div>
              <div className="pickup-time-input">
                <label>Pickup Time</label>
                <input
                  type="time"
                  name="time"
                  placeholder="Pickup Time"
                  value={this.state.newFood.time}
                  onChange={this.handleChange}
                />
              </div>
              <div className="pickup-description-input">
                <label>Pickup Description</label>
                <input
                  type="textarea"
                  name="description"
                  placeholder="Pickup Description"
                  value={this.state.newFood.description}
                  onChange={this.handleChange}
                />
              </div>
              {!this.state.id && (
                <button
                  className="pickup-button"
                  type="submit"
                  onClick={this.handleOk}
                >
                  + Schedule a Pickup
                </button>
              )}
            </form>
            {this.state.id && (
              <button
                className="pickup-button"
                onClick={() => {
                  this.handleOk();
                  this.updateFood();
                }}
              >
                + Update Pickup
              </button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    foods: state.foods
  };
};

export default connect(
  mapStateToProps,
  { addFood, deleteFood, updateFood }
)(BusinessDashboard);
