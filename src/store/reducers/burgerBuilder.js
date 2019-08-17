import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const IngredientsPrice = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const addIngredient = (state, action) => {
    const addededIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const addededIngredients = updateObject(state.ingredients, addededIngredient)
    const addedState =  {
        ingredients: addededIngredients, 
        totalPrice: state.totalPrice + IngredientsPrice[action.ingredientName],
    }
    return updateObject(state, addedState)
}

const removeIngredient = (state, action) => {
    const removedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const removedIngredients = updateObject(state.ingredients, removedIngredient)
    const removedState =  {
        ingredients: removedIngredients, 
        totalPrice: state.totalPrice + IngredientsPrice[action.ingredientName],
    }
    return updateObject(state, removedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients : {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat, 
                },
                totalPrice: 4.0,
                error: false,
            }) 
        case actionTypes.FETCH_ING_FAILED:
            return updateObject(state, {
                error: true,
            })     
        default: 
            return state;
    }
};

export default reducer;