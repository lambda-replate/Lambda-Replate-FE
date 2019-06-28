import React from "react";
import styled from "styled-components";
import axios from "axios";
import "antd/dist/antd.css";
import "../App.css";
import { Button, Icon } from "antd";

const FoodCardz = styled.div`
  width: 400px;
  max-width: 400px;
  max-height: 500px;
  border: 1px solid #00000019;
  border-radius: 100px 50px;
  margin: 10px 10px;
  padding: 40px;
  background-color: #ffffff;
  a {
    text-decoration: underline;
    text-emphasis: bold;
    color: black;
  }
`;

const ZButtonHolder = styled.div`
  display: flex;
  flex-flow: row-nowrap;
  justify-content: space-around;
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
    console.log('volunteer address: ', this.props.volunteerAddress)
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
        <h2>{this.props.food.name}</h2>
        {this.props.businessName ? (
          <h3>Provided By: {this.props.businessName}</h3>
        ) : null}
        <p>
          <h4>Pick-Up day:</h4> {this.props.food.pickup_date} at{" "}
          {this.getTime(this.props.food.time)}
        </p>
        {this.props.businessName ? (
          <a
            href={`https://www.google.com/maps/dir/${this.props.volunteerAddress}/${this.props.businessAddress}/`}
            target="_blank"
          >
            Click here for directions
          </a>
        ) : null}
        <p>
          Description: <br />
          {this.props.food.description}
        </p>
        {this.state.isBusiness && (
          <ZButtonHolder>
            <Button
              type="secondary"
              onClick={() => this.props.deleteFood(this.props.food.id)}
            >
              Delete Food <Icon type="delete" />
            </Button>
            <Button
              type="default"
              onClick={() => {
                this.props.showModal();
                this.props.updateFood(this.props.food, this.props.food.id);
              }}
            >
              Update Food <Icon type="edit" />
            </Button>
          </ZButtonHolder>
        )}
        {!this.state.isBusiness &&
          (!this.props.food.is_claimed ||
            this.props.food.volunteer_id === this.props.user_id) && (
            <Button
              type={this.props.food.is_claimed === 1 ? "secondary" : "primary"}
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
            </Button>
          )}
      </FoodCardz>
    );
  }
}

export default FoodCard;
