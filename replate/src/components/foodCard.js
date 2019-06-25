import React from 'react';
import styled from 'styled-components';

const FoodCardz = styled.div`
width: 300px;
height: 300px;
border: 1px solid black;
margin: 10px 10px;
`;


const FoodCard = props => {
    const isBusiness = props.isBusiness;

    const foodClaim = () => {
        console.log(props.food.volunteer_id, props.food.is_claimed)
    }

    return(
        <FoodCardz>
            <h2>{props.food.name}</h2>
            <h4>{props.food.pickup_date}</h4>
            <h6>{props.food.time}</h6>
            <p>{props.food.description}</p>
            <span>{props.food.id}</span>
            {isBusiness && 
            <div>
                <button onClick={ () => props.deleteFood(props.food.id)}>Delete Food</button>
                <button onClick={ () => props.updateFood(props.food, props.food.id)}>Update Food</button>
            </div>}
            {!isBusiness && (!props.food.is_claimed || props.food.volunteer_id === props.user_id) &&
                <button onClick={() => props.claimFood(props.food.id, props.food.is_claimed === 1 ? {is_claimed: 0} : {is_claimed: 1} )}>
                {props.food.is_claimed=== 1 ? 'Unclaim food' : 'Claim food'}
            </button>
            }
            
            <span>{props.food.volunteer_id}</span>
            
        </FoodCardz>
    )
};


export default FoodCard;