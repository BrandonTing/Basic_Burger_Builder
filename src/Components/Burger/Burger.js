import React from 'react';
import burgerStyle from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <BurgerIngredient key = {igkey + i} type={igkey} />
        })
    }).reduce((arr, el) => {
        // concat：將多個陣列的元素合併
        return arr.concat(el);
    }, []);
    if (transformIngredients.length === 0) {
        transformIngredients = <p>Please start adding ingredients.</p>
    };
    return(
        <div className={burgerStyle.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;