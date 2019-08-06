import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const IngredientsPrice = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3,
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0 );
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const newPrice = this.state.totalPrice + IngredientsPrice[type];
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type] - 1;
        if (updateCount < 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const newPrice = this.state.totalPrice - IngredientsPrice[type];
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You Continue!')
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for ( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <React.Fragment>
                <Modal 
                    show = {this.state.purchasing}
                    modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients = {this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice} />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                   ingredientAdded = {this.addIngredientHandler}
                   ingredientRemoved = {this.removeIngredientHandler}                
                   disabled = {disableInfo}
                   purchasable = {this.state.purchasable}
                   price = {this.state.totalPrice}
                   order = {this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;