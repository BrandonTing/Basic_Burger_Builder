import React from 'react';
import BuildControlsStyle from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className = {BuildControlsStyle.BuildControls}>
        <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                type = {ctrl.type}
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                 />
        ))}
        <button 
            className = {BuildControlsStyle.OrderButton}
            disabled = {!props.purchasable}
            onClick = {props.order}>ORDER NOW</button>
    </div>
);


export default buildControls;
