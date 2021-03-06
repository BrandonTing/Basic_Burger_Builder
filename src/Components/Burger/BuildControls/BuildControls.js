import React from 'react';

import BuildControlsStyle from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
    { label: 'Salad', type: 'salad'},
];

const buildControls = (props) => (
    <div className = {BuildControlsStyle.BuildControls}>
        <p>Current Price: $<strong>{props.price.toFixed(1)}</strong></p>
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
            onClick = {props.order}>{props.isAuth? 'ORDER NOW':'SIGN UP TO ORDER'}</button>
    </div>
);


export default buildControls;
