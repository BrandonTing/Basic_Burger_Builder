import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const IngredientsPrice = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data})
            })
            .catch(error => {this.setState({error: true})});
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for ( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };

        let orderSummary = null;
        let burger = this.state.error?<p>Sorry, ingredients can't be loaded now.</p>:<Spinner />

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
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
            orderSummary = <OrderSummary
                ingredients = {this.state.ingredients}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                price = {this.state.totalPrice} />
        }
        if (this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <React.Fragment>
                <Modal 
                    show = {this.state.purchasing}
                    modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);