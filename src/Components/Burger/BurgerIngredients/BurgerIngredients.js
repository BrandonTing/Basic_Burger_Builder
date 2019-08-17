import React, { Component } from 'react';
import PropsTypes from 'prop-types'

import burgerIngredientsStyle from './BurgerIngredients.module.css'

class BurgerIngredients extends Component {
    render () {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className = {burgerIngredientsStyle.BreadBottom} ></div>;
                break;
            case ('bread-top'):
                ingredient = ( 
                    <div className = {burgerIngredientsStyle.BreadTop}>
                        <div className = {burgerIngredientsStyle.Seeds1} />
                        <div className = {burgerIngredientsStyle.Seeds2} />                                        
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className = {burgerIngredientsStyle.Meat} />;
                break;
            case ('cheese'):
                ingredient = <div className = {burgerIngredientsStyle.Cheese} />;
                break;
            case ('salad'):
                ingredient = <div className = {burgerIngredientsStyle.Salad} />
                break;
            case ('bacon'):
                ingredient = <div className = {burgerIngredientsStyle.Bacon} />
                break;     
            default: 
                ingredient = null;
        }        
        return ingredient;
    }
}

BurgerIngredients.propsTypes = {
    type: PropsTypes.string.isRequired
}

export default BurgerIngredients;