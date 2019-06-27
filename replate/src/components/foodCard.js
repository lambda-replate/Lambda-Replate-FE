import React from "react";
import styled from "styled-components";
import axios from "axios";
import "../App.css";

const FoodCardz = styled.div`
  width: 400px;
  height: auto;
  border: 1px solid black;
  border-radius: 100px 50px;
  margin: 10px 10px;
  padding: 20px;

  a {
    text-decoration: underline;
    text-emphasis: bold;
    color: black;
  }
`;

class FoodCard extends React.Component {
  state = {
    isBusiness: this.props.isBusiness,
    businessName: "",
    businesses: []
  };

  getBusinesses = () => {
    const token = localStorage.getItem("jwt");
    const requestConfig = {
      headers: {
        authorization: token
      }
    };
    axios
      .get(
        "https://bw-replate.herokuapp.com/api/users/businesses",
        requestConfig
      )
      .then(res => {
        this.setState({
          businesses: res.data,
          businessName: this.props.businessName
        });
      });
  };

  getTime = oldTime => {
    let timeArr = oldTime.split(":");
    let newTime = "";
    if (timeArr[0] > 12) {
      timeArr[0] -= 12;
      newTime = `${timeArr[0]}:${timeArr[1]} PM`;
    } else {
      newTime = `${timeArr[0]}:${timeArr[1]} AM`;
    }
    return newTime;
  };

  listState = () => {
    return console.log(this.state);
  };

  componentDidMount() {
    console.log(" businessName", this.props.businessName);
    this.getBusinesses();
    this.setState({
      businesses: localStorage.getItem("businesses")
    });
  }

  render() {
    return (
      <FoodCardz
        className={
          this.props.food.is_claimed
            ? this.props.food.volunteer_id === this.props.user_id
              ? "claimed-by-you"
              : "claimed"
            : "unclaimed"
        }
      >
        <h2>Food: {this.props.food.name}</h2>
        {this.props.businessName ? (
          <h3>Provided By: {this.props.businessName}</h3>
        ) : null}
        <p>
          <h4>Pick-Up day:</h4> {this.props.food.pickup_date} at{" "}
          {this.getTime(this.props.food.time)}
        </p>
        {this.props.businessName ? (
          <a
            href={`https://maps.google.com/?q=${this.props.businessAddress}`}
            target="_blank"
          >
            Click here for directions
          </a>
        ) : null}
        <p>
          What they said about the food: <br />
          {this.props.food.description}
        </p>
        {this.state.isBusiness && (
          <div>
            <button onClick={() => this.props.deleteFood(this.props.food.id)}>
              Delete Food
            </button>
            <button
              onClick={() =>
                this.props.updateFood(this.props.food, this.props.food.id)
              }
            >
              Update Food
            </button>
          </div>
        )}
        {!this.state.isBusiness &&
          (!this.props.food.is_claimed ||
            this.props.food.volunteer_id === this.props.user_id) && (
            <button
              onClick={() =>
                this.props.claimFood(
                  this.props.food.id,
                  this.props.food.is_claimed === 1
                    ? { is_claimed: 0 }
                    : { is_claimed: 1 }
                )
              }
            >
              {this.props.food.is_claimed === 1 ? "Unclaim food" : "Claim food"}
            </button>
          )}
      </FoodCardz>
    );
  }
}

export default FoodCard;
