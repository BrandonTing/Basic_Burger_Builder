import React from 'react';
import OrderStyle from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName, 
            amount: props.ingredients[ingredientName]})
    }
    let ingredientsList = ingredients.map(ingredient => (
            <span 
                style = {{
                    textTransform: 'Capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                 }}
                key = {ingredient.name}>{ingredient.name} ({ingredient.amount}) </span>
        ))

    return (
        <div className={OrderStyle.Order}>
            <p>Ingredients: {ingredientsList}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};


export default order;